import { FiMoon, FiSun } from "react-icons/fi";
import type { ThemeMode } from "@/types";

export const THEMES: {
	key: ThemeMode;
	Icon: React.ComponentType<{ className?: string }>;
	label: string;
}[] = [
	{ key: "light", Icon: FiSun, label: "Light" },
	{ key: "dark", Icon: FiMoon, label: "Dark" },
];

export const THEME_COOKIE_NAME = "animus_theme";
export const THEME_STORAGE_KEY = "theme";

export const isTheme = (v: string | null): v is ThemeMode =>
	v === "light" || v === "dark";

export const resolveTheme = (t: ThemeMode): "light" | "dark" => t;

export function getThemeCookieDomain(): string {
	if (typeof window === "undefined") return "";
	const hostname = window.location.hostname;
	if (hostname === "localhost" || hostname === "127.0.0.1" || hostname.includes(":")) {
		return "";
	}
	if (hostname.endsWith("animusproject.org")) {
		return ".animusproject.org";
	}
	const parts = hostname.split(".");
	if (parts.length >= 2) {
		return "." + parts.slice(-2).join(".");
	}
	return "";
}

export function getThemeFromCookie(): ThemeMode | null {
	if (typeof document === "undefined") return null;
	const match = document.cookie.match(/(?:^|;\s*)animus_theme=([^;]+)/);
	if (match && isTheme(match[1])) {
		return match[1];
	}
	return null;
}

export function getInitialTheme(): ThemeMode {
	if (typeof window === "undefined") return "light";
	// 1. Shared cookie across subdomains takes precedence
	const cookieTheme = getThemeFromCookie();
	if (cookieTheme) return cookieTheme;

	// 2. Check localStorage
	try {
		const saved = localStorage.getItem(THEME_STORAGE_KEY);
		if (isTheme(saved)) return saved;
	} catch {}

	// 3. Fallback to DOM class if set by head anti-flash script
	if (document.documentElement.classList.contains("dark")) {
		return "dark";
	}

	return "light";
}

export function saveTheme(t: ThemeMode): void {
	if (typeof document === "undefined") return;

	// 1. Save in localStorage
	try {
		localStorage.setItem(THEME_STORAGE_KEY, t);
	} catch {}

	// 2. Save in cross-subdomain cookie
	const domain = getThemeCookieDomain();
	const domainAttr = domain ? `; domain=${domain}` : "";
	const secureAttr = window.location.protocol === "https:" ? "; Secure" : "";
	const maxAge = 60 * 60 * 24 * 365; // 1 year

	document.cookie = `${THEME_COOKIE_NAME}=${t}; path=/${domainAttr}; max-age=${maxAge}; SameSite=Lax${secureAttr}`;

	if (domain) {
		document.cookie = `${THEME_COOKIE_NAME}=${t}; path=/; max-age=${maxAge}; SameSite=Lax${secureAttr}`;
	}
}

export const applyTheme = (t: ThemeMode, withTransition = true) => {
	if (typeof document === "undefined") return;
	const root = document.documentElement;
	if (withTransition) {
		root.classList.add("theme-switching");
	}
	root.classList.remove("light", "dark");
	root.classList.add(resolveTheme(t));
	if (withTransition) {
		setTimeout(() => root.classList.remove("theme-switching"), 150);
	}
};
