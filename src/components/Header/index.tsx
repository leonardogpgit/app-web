"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { navLinks, site } from "@/config";

const menuIcon = (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
		<path d="M4 6h16M4 12h16M4 18h16" />
	</svg>
);

const closeIcon = (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
		<path d="M6 18L18 6M6 6l12 12" />
	</svg>
);

export default function Header() {
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-[#09090b]/80">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<Link href="/" className="flex items-center gap-3" aria-label="Go to home" onClick={() => setMobileOpen(false)}>
						<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white shadow-sm shadow-indigo-500/30">
							A
						</div>
						<span className="font-descscor text-xl font-bold tracking-tight text-black dark:text-white">
							{site.name}
						</span>
					</Link>

					<nav className="hidden items-center gap-7 md:flex">
						{navLinks.map(({ label, href }) => (
							<Link
								key={label}
								href={href}
								className="text-sm font-medium text-black transition-colors hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
							>
								{label}
							</Link>
						))}
					</nav>

					<div className="hidden items-center gap-3 md:flex">
						<ThemeToggle />
					</div>

					<div className="flex items-center gap-2 md:hidden">
						<ThemeToggle />
						<button
							type="button"
							aria-label="Toggle menu"
							aria-expanded={mobileOpen}
							className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-black transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
							onClick={() => setMobileOpen((open) => !open)}
						>
							{mobileOpen ? closeIcon : menuIcon}
						</button>
					</div>
				</div>

				{mobileOpen && (
					<div className="border-t border-slate-200 bg-white/95 pb-4 pt-3 dark:border-slate-800 dark:bg-[#09090b]/95 md:hidden">
						<nav className="flex flex-col gap-1">
							{navLinks.map(({ label, href }) => (
								<Link
									key={label}
									href={href}
									className="rounded-lg px-3 py-2.5 text-base font-medium text-black transition-colors hover:bg-slate-100 hover:text-indigo-600 dark:text-white dark:hover:bg-slate-800 dark:hover:text-indigo-400"
									onClick={() => setMobileOpen(false)}
								>
									{label}
								</Link>
							))}
						</nav>
					</div>
				)}
			</div>
		</header>
	);
}
