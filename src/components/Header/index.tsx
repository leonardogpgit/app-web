"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { navLinks, site } from "@/config";
import { useAuth } from "@/context/AuthContext";
import { FiUser } from "react-icons/fi";

export default function Header() {
	const { user } = useAuth();

	return (
		<header className="metal-slab-bar sticky top-0 z-50 w-full transition-colors">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-14 items-center justify-between md:h-16">
					<a href="https://animusproject.org" className="flex items-center gap-3" aria-label="Animus Project">
						<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black border border-white/20 text-lg font-bold text-white shadow-xs dark:bg-white dark:text-black dark:border-black/20">
							A
						</div>
						<span translate="no" className="font-descscor text-xl font-bold tracking-tight text-white dark:text-black notranslate">
							{site.name}
						</span>
					</a>

					<nav className="hidden items-center gap-7 md:flex">
						{navLinks.map(({ label, href }) => (
							<Link
								key={label}
								href={href}
								className="text-sm font-bold font-michroma text-white/90 transition-opacity hover:opacity-100 dark:text-black/90 dark:hover:opacity-100"
							>
								{label}
							</Link>
						))}
						{user && (
							<Link
								href="/app/graph"
								className="text-sm font-bold font-michroma text-white underline underline-offset-4 dark:text-black hover:opacity-80 transition-opacity"
							>
								Graph
							</Link>
						)}
					</nav>

					<div className="flex items-center gap-3">
						{user ? (
							<Link
								href="/app/profile"
								className="flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden border border-white/30 dark:border-black/30 hover:opacity-80 transition-opacity bg-white/20 dark:bg-black/20"
								title={user.displayName || user.email || "User Profile"}
							>
								{user.photoURL ? (
									<img
										src={user.photoURL}
										alt={user.displayName || "User"}
										className="h-full w-full object-cover"
										referrerPolicy="no-referrer"
									/>
								) : (
									<FiUser className="h-4 w-4 text-white dark:text-black" />
								)}
							</Link>
						) : (
							<Link
								href="/login"
								className="px-3 py-1.5 rounded-xl border border-white/25 dark:border-black/20 bg-white/10 dark:bg-black/10 text-xs font-michroma text-white dark:text-black hover:bg-white/20 dark:hover:bg-black/20 transition-colors"
							>
								Login
							</Link>
						)}
						<ThemeToggle />
					</div>
				</div>

				<nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 border-t border-white/15 py-2.5 dark:border-black/15 md:hidden">
					{navLinks.map(({ label, href }) => (
						<Link
							key={label}
							href={href}
							className="text-xs sm:text-sm font-bold font-michroma text-white/90 transition-opacity hover:opacity-100 dark:text-black/90 dark:hover:opacity-100"
						>
							{label}
						</Link>
					))}
					{user ? (
						<Link
							href="/app/graph"
							className="text-xs sm:text-sm font-bold font-michroma text-white underline underline-offset-4 dark:text-black hover:opacity-80 transition-opacity"
						>
							Graph
						</Link>
					) : (
						<Link
							href="/login"
							className="text-xs sm:text-sm font-bold font-michroma text-white dark:text-black underline underline-offset-4 transition-opacity hover:opacity-80"
						>
							Login
						</Link>
					)}
				</nav>
			</div>
		</header>
	);
}
