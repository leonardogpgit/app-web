"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { navLinks, site } from "@/config";

export default function Header() {
	return (
		<header className="sticky top-0 z-50 border-b border-slate-300 bg-[#dfe6ee]/90 backdrop-blur-xl dark:border-slate-800 dark:bg-[#09090b]/80">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-14 items-center justify-between md:h-16">
					<Link href="/" className="flex items-center gap-3" aria-label="Go to home">
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

					<div className="flex items-center gap-3">
						<ThemeToggle />
					</div>
				</div>

				<nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 border-t border-slate-300/80 py-2.5 dark:border-slate-800/70 md:hidden">
					{navLinks.map(({ label, href }) => (
						<Link
							key={label}
							href={href}
							className="text-xs sm:text-sm font-medium text-black transition-colors hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
						>
							{label}
						</Link>
					))}
				</nav>
			</div>
		</header>
	);
}
