export interface SharedSessionData {
	uid: string;
	email: string | null;
	displayName: string | null;
	photoURL: string | null;
	token: string;
	updatedAt: number;
}

const STORAGE_KEY = "animus_session";

export function getCookieDomain(): string {
	if (typeof window === "undefined") return "";
	const hostname = window.location.hostname;
	if (hostname === "localhost" || hostname === "127.0.0.1") {
		return "";
	}
	if (hostname.endsWith("animusproject.org")) {
		return "; domain=.animusproject.org";
	}
	return "";
}

export function setSharedSession(data: SharedSessionData): void {
	if (typeof window === "undefined") return;
	try {
		const jsonStr = JSON.stringify(data);
		// 1. Scoped localStorage fallback (guaranteed to work across tabs even if third-party cookies partitioned)
		try {
			localStorage.setItem(STORAGE_KEY, jsonStr);
		} catch {}

		// 2. Cross-subdomain cookie on .animusproject.org
		const encoded = encodeURIComponent(jsonStr);
		const domainPart = getCookieDomain();
		const maxAge = 60 * 60 * 24 * 7; // 7 days
		document.cookie = `${STORAGE_KEY}=${encoded}; path=/; max-age=${maxAge}; SameSite=Lax; Secure${domainPart}`;
	} catch (err) {
		console.error("Failed to set shared session:", err);
	}
}

export function getSharedSession(): SharedSessionData | null {
	if (typeof window === "undefined") return null;
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
						// Clean URL hash without reloading
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

		// 2. Check localStorage
		try {
			const localStr = localStorage.getItem(STORAGE_KEY);
			if (localStr) {
				const parsed = JSON.parse(localStr) as SharedSessionData;
				if (parsed && typeof parsed.uid === "string") {
					return parsed;
				}
			}
		} catch {}

		// 3. Check document.cookie
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
		const domainPart = getCookieDomain();
		document.cookie = `${STORAGE_KEY}=; path=/; max-age=0; SameSite=Lax; Secure${domainPart}`;
		document.cookie = `${STORAGE_KEY}=; path=/; max-age=0; SameSite=Lax; Secure`;
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
