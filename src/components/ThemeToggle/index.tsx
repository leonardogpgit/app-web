"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import type { ThemeMode } from "@/types";
import { applyTheme, getInitialTheme, saveTheme } from "./theme";

const ThemeToggle = () => {
	const [theme, setTheme] = useState<ThemeMode>("light");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		const initial = getInitialTheme();
		setTheme(initial);
		applyTheme(initial, false);

		// Synchronize if changed in another tab or subdomain
		const syncTheme = () => {
			const current = getInitialTheme();
			setTheme((prev) => {
				if (prev !== current) {
					applyTheme(current, true);
					return current;
				}
				return prev;
			});
		};

		window.addEventListener("focus", syncTheme);
		window.addEventListener("storage", syncTheme);
		return () => {
			window.removeEventListener("focus", syncTheme);
			window.removeEventListener("storage", syncTheme);
		};
	}, []);

	const select = useCallback((t: ThemeMode) => {
		setTheme(t);
		saveTheme(t);
		applyTheme(t, true);
	}, []);

	const isDark = mounted && theme === "dark";

	return (
		<button
			type="button"
			aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
			className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-black/40 text-white shadow-xs transition-colors hover:bg-black/60 dark:border-black/20 dark:bg-white/40 dark:text-black dark:hover:bg-white/60"
			onClick={() => select(isDark ? "light" : "dark")}
		>
			{isDark ? (
				<FiSun className="h-4 w-4" />
			) : (
				<FiMoon className="h-4 w-4" />
			)}
		</button>
	);
};

export default memo(ThemeToggle);
