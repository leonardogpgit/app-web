"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
	const router = useRouter();
	const { user, logout } = useAuth();

	useEffect(() => {
		if (!user) {
			const target = encodeURIComponent("https://app.animusproject.org/app/graph");
			window.location.href = `https://animusproject.org/login?redirect=${target}`;
		}
	}, [user]);

	if (user) {
		return (
			<section className="py-20 md:py-28 flex items-center justify-center px-4">
				<div className="card-base w-full max-w-md p-8 text-center space-y-6">
					<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-black/5 dark:bg-white/10 text-xl font-bold font-michroma">
						{user.displayName ? user.displayName.charAt(0).toUpperCase() : "U"}
					</div>
					<div>
						<h1 className="text-2xl font-bold font-michroma text-black dark:text-white">
							Session Active
						</h1>
						<p className="mt-2 text-sm text-black/70 dark:text-white/70">
							{user.email || user.displayName || user.uid}
						</p>
						<p className="mt-1 font-mono text-xs text-black/40 dark:text-white/40 break-all">
							UID: {user.uid}
						</p>
					</div>

					<div className="flex flex-col gap-3 pt-2">
						<button
							type="button"
							onClick={() => router.push("/app/graph")}
							className="w-full rounded-xl bg-black px-4 py-3 text-sm font-medium font-michroma text-white hover:opacity-90 dark:bg-white dark:text-black transition-opacity"
						>
							Open Graph
						</button>
						<button
							type="button"
							onClick={() => logout()}
							className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-[#f4f7fb] dark:bg-white/5 px-4 py-3 text-sm font-medium font-michroma text-black dark:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors"
						>
							Sign Out
						</button>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="py-20 md:py-28 flex items-center justify-center px-4">
			<div className="card-base w-full max-w-md p-8 text-center space-y-6">
				<div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-slate-400 border-t-black dark:border-white/20 dark:border-t-white" />
				<div>
					<h1 className="text-xl font-bold font-michroma text-black dark:text-white">
						Redirecting to Animus Login...
					</h1>
					<p className="mt-2 text-xs text-black/60 dark:text-white/60">
						Transferring to central ecosystem authentication.
					</p>
				</div>
				<a
					href="https://animusproject.org/login?redirect=https%3A%2F%2Fapp.animusproject.org%2Fapp%2Fgraph"
					className="inline-block w-full rounded-xl bg-black px-4 py-3 text-xs font-medium font-michroma text-white hover:opacity-90 dark:bg-white dark:text-black transition-opacity"
				>
					Continue to Login
				</a>
			</div>
		</section>
	);
}
