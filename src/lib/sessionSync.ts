const SESSION_UID_COOKIE = "animus_session_uid";
const SESSION_USER_COOKIE = "animus_session_user";
const SESSION_TOKEN_COOKIE = "animus_session_token";
const LOGGED_OUT_COOKIE = "animus_logged_out_at";

export interface SyncedUserPayload {
	uid: string;
	email: string | null;
	displayName: string | null;
	photoURL: string | null;
}

function getCookieDomain(): string {
	if (typeof window === "undefined") return "";
	const hostname = window.location.hostname;
	if (hostname.endsWith("animusproject.org")) {
		return ".animusproject.org";
	}
	return "";
}

function getCookie(name: string): string | null {
	if (typeof document === "undefined") return null;
	const cookies = document.cookie.split(";");
	for (const cookie of cookies) {
		const [k, ...v] = cookie.trim().split("=");
		if (k === name) {
			return decodeURIComponent(v.join("="));
		}
	}
	return null;
}

export function notifyGlobalLogin(
	user: {
		uid: string;
		email?: string | null;
		displayName?: string | null;
		photoURL?: string | null;
	},
	token?: string | null,
): void {
	if (typeof document === "undefined") return;
	const domain = getCookieDomain();
	const domainAttr = domain ? `; domain=${domain}` : "";
	const secureAttr = window.location.protocol === "https:" ? "; Secure" : "";

	// Clear any logout tombstone
	document.cookie = `${LOGGED_OUT_COOKIE}=; path=/; max-age=0; SameSite=Lax${secureAttr}`;
	if (domain) {
		document.cookie = `${LOGGED_OUT_COOKIE}=; path=/; domain=${domain}; max-age=0; SameSite=Lax${secureAttr}`;
	}

	// 30 days session
	const maxAge = 60 * 60 * 24 * 30;

	// Set active session UID
	document.cookie = `${SESSION_UID_COOKIE}=${encodeURIComponent(user.uid)}; path=/${domainAttr}; max-age=${maxAge}; SameSite=Lax${secureAttr}`;

	// Set active session User Profile JSON
	const profileData: SyncedUserPayload = {
		uid: user.uid,
		email: user.email || null,
		displayName: user.displayName || null,
		photoURL: user.photoURL || null,
	};
	document.cookie = `${SESSION_USER_COOKIE}=${encodeURIComponent(JSON.stringify(profileData))}; path=/${domainAttr}; max-age=${maxAge}; SameSite=Lax${secureAttr}`;

	// Set active session ID Token (24h)
	if (token) {
		document.cookie = `${SESSION_TOKEN_COOKIE}=${encodeURIComponent(token)}; path=/${domainAttr}; max-age=${60 * 60 * 24}; SameSite=Lax${secureAttr}`;
	}
}

export function notifyGlobalLogout(): void {
	if (typeof document === "undefined") return;
	const domain = getCookieDomain();
	const domainAttr = domain ? `; domain=${domain}` : "";
	const secureAttr = window.location.protocol === "https:" ? "; Secure" : "";

	// Clear session cookies
	const clearCookie = (name: string) => {
		document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax${secureAttr}`;
		if (domain) {
			document.cookie = `${name}=; path=/; domain=${domain}; max-age=0; SameSite=Lax${secureAttr}`;
		}
	};

	clearCookie(SESSION_UID_COOKIE);
	clearCookie(SESSION_USER_COOKIE);
	clearCookie(SESSION_TOKEN_COOKIE);

	// Set logout marker timestamp (24 hours)
	const now = Date.now().toString();
	const maxAge = 60 * 60 * 24;
	document.cookie = `${LOGGED_OUT_COOKIE}=${now}; path=/${domainAttr}; max-age=${maxAge}; SameSite=Lax${secureAttr}`;
}

export function getSyncedUser(): SyncedUserPayload | null {
	if (typeof document === "undefined") return null;
	const userJson = getCookie(SESSION_USER_COOKIE);
	if (userJson) {
		try {
			const parsed = JSON.parse(userJson);
			if (parsed && typeof parsed.uid === "string") {
				return parsed as SyncedUserPayload;
			}
		} catch {
			// ignore parse error
		}
	}
	const uid = getCookie(SESSION_UID_COOKIE);
	if (uid) {
		return {
			uid,
			email: null,
			displayName: null,
			photoURL: null,
		};
	}
	return null;
}

export function getSyncedToken(): string | null {
	return getCookie(SESSION_TOKEN_COOKIE);
}

export function isGloballyLoggedOut(currentUid?: string | null): boolean {
	if (typeof document === "undefined") return false;

	// If a global logout tombstone cookie is present, user was logged out
	const loggedOutAt = getCookie(LOGGED_OUT_COOKIE);
	if (loggedOutAt) {
		return true;
	}

	// If another user logged in with a different UID, the old user session is invalidated
	const sessionUid = getCookie(SESSION_UID_COOKIE);
	if (currentUid && sessionUid && sessionUid !== currentUid) {
		return true;
	}

	return false;
}
