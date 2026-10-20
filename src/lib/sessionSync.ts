const SESSION_UID_COOKIE = "animus_session_uid";
const LOGGED_OUT_COOKIE = "animus_logged_out_at";

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

export function notifyGlobalLogin(uid: string): void {
	if (typeof document === "undefined") return;
	const domain = getCookieDomain();
	const domainAttr = domain ? `; domain=${domain}` : "";
	const secureAttr = window.location.protocol === "https:" ? "; Secure" : "";

	// Clear any logout tombstone
	document.cookie = `${LOGGED_OUT_COOKIE}=; path=/; max-age=0; SameSite=Lax${secureAttr}`;
	if (domain) {
		document.cookie = `${LOGGED_OUT_COOKIE}=; path=/; domain=${domain}; max-age=0; SameSite=Lax${secureAttr}`;
	}

	// Set active session UID (30 days)
	const maxAge = 60 * 60 * 24 * 30;
	document.cookie = `${SESSION_UID_COOKIE}=${encodeURIComponent(uid)}; path=/${domainAttr}; max-age=${maxAge}; SameSite=Lax${secureAttr}`;
}

export function notifyGlobalLogout(): void {
	if (typeof document === "undefined") return;
	const domain = getCookieDomain();
	const domainAttr = domain ? `; domain=${domain}` : "";
	const secureAttr = window.location.protocol === "https:" ? "; Secure" : "";

	// Clear session UID cookie
	document.cookie = `${SESSION_UID_COOKIE}=; path=/; max-age=0; SameSite=Lax${secureAttr}`;
	if (domain) {
		document.cookie = `${SESSION_UID_COOKIE}=; path=/; domain=${domain}; max-age=0; SameSite=Lax${secureAttr}`;
	}

	// Set logout marker timestamp (24 hours)
	const now = Date.now().toString();
	const maxAge = 60 * 60 * 24;
	document.cookie = `${LOGGED_OUT_COOKIE}=${now}; path=/${domainAttr}; max-age=${maxAge}; SameSite=Lax${secureAttr}`;
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
