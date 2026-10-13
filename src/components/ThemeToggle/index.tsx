"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import type { ThemeMode } from "@/types";
import { applyTheme, isTheme } from "./theme";

const ThemeToggle = () => {
	const [theme, setTheme] = useState<ThemeMode>("light");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		const saved = localStorage.getItem("theme");
		const initial = isTheme(saved) ? saved : "light";
		setTheme(initial);
		applyTheme(initial);
	}, []);

	const select = useCallback((t: ThemeMode) => {
		setTheme(t);
		localStorage.setItem("theme", t);
		applyTheme(t);
	}, []);

	const isDark = mounted && theme === "dark";

	return (
		<button
			type="button"
			aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
			className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-black transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
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
