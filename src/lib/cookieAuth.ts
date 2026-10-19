export interface SharedSessionData {
	uid: string;
	email: string | null;
	displayName: string | null;
	photoURL: string | null;
	token: string;
	updatedAt: number;
}

const COOKIE_NAME = "animus_session";

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
	if (typeof document === "undefined") return;
	try {
		const jsonStr = JSON.stringify(data);
		const encoded = encodeURIComponent(jsonStr);
		const domainPart = getCookieDomain();
		// 7 days expiration in seconds
		const maxAge = 60 * 60 * 24 * 7;
		document.cookie = `${COOKIE_NAME}=${encoded}; path=/; max-age=${maxAge}; SameSite=Lax; Secure${domainPart}`;
	} catch (err) {
		console.error("Failed to set shared session cookie:", err);
	}
}

export function getSharedSession(): SharedSessionData | null {
	if (typeof document === "undefined") return null;
	try {
		const cookies = document.cookie.split(";");
		for (const cookie of cookies) {
			const [name, ...rest] = cookie.trim().split("=");
			if (name === COOKIE_NAME) {
				const value = rest.join("=");
				if (!value) return null;
				const decoded = decodeURIComponent(value);
				const parsed = JSON.parse(decoded) as SharedSessionData;
				if (parsed && typeof parsed.uid === "string") {
					return parsed;
				}
			}
		}
	} catch (err) {
		console.error("Failed to read shared session cookie:", err);
	}
	return null;
}

export function clearSharedSession(): void {
	if (typeof document === "undefined") return;
	const domainPart = getCookieDomain();
	document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax; Secure${domainPart}`;
	document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax; Secure`;
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
