export interface SharedSessionData {
	uid: string;
	email: string | null;
	displayName: string | null;
	photoURL: string | null;
	token: string;
	updatedAt: number;
}

const STORAGE_KEY = "animus_session";
const LOGGED_OUT_KEY = "animus_logged_out";

export function getCookieDomains(): string[] {
	if (typeof window === "undefined") return [];
	const hostname = window.location.hostname;
	if (hostname === "localhost" || hostname === "127.0.0.1") {
		return [""];
	}
	if (hostname.endsWith("animusproject.org")) {
		return ["; domain=animusproject.org", "; domain=.animusproject.org"];
	}
	return [""];
}

export function isLoggedOut(): boolean {
	if (typeof window === "undefined") return false;
	try {
		const cookies = document.cookie.split(";");
		for (const cookie of cookies) {
			const [name, value] = cookie.trim().split("=");
			if (name === LOGGED_OUT_KEY && value === "1") {
				return true;
			}
		}
	} catch {}
	return false;
}

export function setSharedSession(data: SharedSessionData): void {
	if (typeof window === "undefined") return;
	try {
		const jsonStr = JSON.stringify(data);
		try {
			localStorage.setItem(STORAGE_KEY, jsonStr);
		} catch {}

		const encoded = encodeURIComponent(jsonStr);
		const maxAge = 60 * 60 * 24 * 7; // 7 days
		const expires = new Date(Date.now() + maxAge * 1000).toUTCString();
		const domains = getCookieDomains();

		for (const d of domains) {
			document.cookie = `${STORAGE_KEY}=${encoded}; path=/; max-age=${maxAge}; expires=${expires}; SameSite=Lax; Secure${d}`;
			document.cookie = `${LOGGED_OUT_KEY}=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; Secure${d}`;
		}
		document.cookie = `${LOGGED_OUT_KEY}=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; Secure`;
	} catch (err) {
		console.error("Failed to set shared session:", err);
	}
}

export function getSharedSession(): SharedSessionData | null {
	if (typeof window === "undefined") return null;
	if (isLoggedOut()) return null;

	try {
		// 1. Check URL hash for relayed session (#session=...)
		if (window.location.hash && window.location.hash.includes("session=")) {
			const hashStr = window.location.hash.replace(/^#/, "");
			const hashParams = new URLSearchParams(hashStr);
			const sessionParam = hashParams.get("session");
			if (sessionParam) {
				try {
					const parsed = JSON.parse(decodeURIComponent(sessionParam)) as SharedSessionData;
					if (parsed && typeof parsed.uid === "string") {
						const cleanUrl = window.location.pathname + window.location.search;
						window.history.replaceState(null, "", cleanUrl);
						setSharedSession(parsed);
						return parsed;
					}
				} catch (e) {
					console.error("Failed to parse hash session:", e);
				}
			}
		}

		// 2. Check document.cookie
		const cookies = document.cookie.split(";");
		for (const cookie of cookies) {
			const [name, ...rest] = cookie.trim().split("=");
			if (name === STORAGE_KEY) {
				const value = rest.join("=");
				if (!value) continue;
				const decoded = decodeURIComponent(value);
				const parsed = JSON.parse(decoded) as SharedSessionData;
				if (parsed && typeof parsed.uid === "string") {
					try {
						localStorage.setItem(STORAGE_KEY, decoded);
					} catch {}
					return parsed;
				}
			}
		}

		// 3. Check localStorage
		try {
			const localStr = localStorage.getItem(STORAGE_KEY);
			if (localStr) {
				const parsed = JSON.parse(localStr) as SharedSessionData;
				if (parsed && typeof parsed.uid === "string") {
					return parsed;
				}
			}
		} catch {}
	} catch (err) {
		console.error("Failed to read shared session:", err);
	}
	return null;
}

export function clearSharedSession(): void {
	if (typeof window === "undefined") return;
	try {
		localStorage.removeItem(STORAGE_KEY);
		sessionStorage.removeItem("auth_redirect_attempted");

		const domains = getCookieDomains();
		for (const d of domains) {
			document.cookie = `${STORAGE_KEY}=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; Secure${d}`;
			document.cookie = `${LOGGED_OUT_KEY}=1; path=/; max-age=604800; SameSite=Lax; Secure${d}`;
		}
		document.cookie = `${STORAGE_KEY}=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; Secure`;
		document.cookie = `${LOGGED_OUT_KEY}=1; path=/; max-age=604800; SameSite=Lax; Secure`;
	} catch {}
}

export function getSafeRedirectUrl(url: string | null): string | null {
	if (!url) return null;
	try {
		const parsed = new URL(url, window.location.origin);
		if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
		if (
			parsed.hostname === "animusproject.org" ||
			parsed.hostname.endsWith(".animusproject.org") ||
			parsed.hostname === "localhost" ||
			parsed.hostname === "127.0.0.1"
		) {
			return parsed.toString();
		}
	} catch {
		return null;
	}
	return null;
}

export function buildRedirectWithSession(targetUrl: string, session: SharedSessionData): string {
	try {
		const url = new URL(targetUrl);
		const sessionParam = encodeURIComponent(JSON.stringify(session));
		url.hash = `session=${sessionParam}`;
		return url.toString();
	} catch {
		return targetUrl;
	}
}
