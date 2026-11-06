"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FiCheckCircle, FiLock, FiLogOut } from "react-icons/fi";

export default function LoginPage() {
	const router = useRouter();
	const { user, loading, logout } = useAuth();

	useEffect(() => {
		if (!loading && !user) {
			window.location.href =
				"https://animusproject.org/login?redirect=https://animus.animusproject.org/app/graph";
		}
	}, [loading, user]);

	if (loading) {
		return (
			<section className="py-20 md:py-28 flex items-center justify-center px-4">
				<div className="flex flex-col items-center gap-3">
					<div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-400 border-t-black dark:border-white/20 dark:border-t-white" />
					<p className="font-michroma text-xs text-black/60 dark:text-white/60">
						Verifying session...
					</p>
				</div>
			</section>
		);
	}

	if (user) {
		return (
			<section className="py-20 md:py-28 flex items-center justify-center px-4">
				<div className="card-base w-full max-w-md p-8 text-center space-y-6">
					<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-black/5 dark:bg-white/10 text-xl font-bold font-michroma">
						{user.displayName
							? user.displayName.charAt(0).toUpperCase()
							: user.email
								? user.email.charAt(0).toUpperCase()
								: "A"}
					</div>
					<div>
						<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-michroma font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-2">
							<FiCheckCircle className="h-3.5 w-3.5" />
							<span>Session Active</span>
						</div>
						<h1 className="text-2xl font-bold font-michroma text-black dark:text-white">
							{user.displayName || "Animus Member"}
						</h1>
						<p className="mt-1 text-sm text-black/70 dark:text-white/70 font-sans">
							{user.email || user.uid}
						</p>
					</div>

					<div className="flex flex-col gap-3 pt-2">
						<button
							type="button"
							onClick={() => router.push("/app/graph")}
							className="w-full rounded-xl bg-black px-4 py-3 text-sm font-medium font-michroma text-white hover:opacity-90 dark:bg-white dark:text-black transition-opacity"
						>
							Open Consensus Graph
						</button>
						<button
							type="button"
							onClick={() => logout()}
							className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-white/10 bg-[#f4f7fb] dark:bg-white/5 px-4 py-3 text-sm font-medium font-michroma text-black dark:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors"
						>
							<FiLogOut className="h-4 w-4" />
							<span>Sign Out</span>
						</button>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="py-20 md:py-28 flex items-center justify-center px-4">
			<div className="card-base w-full max-w-md p-8 text-center space-y-4">
				<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-black dark:bg-white text-white dark:text-black">
					<FiLock className="h-5 w-5" />
				</div>
				<h2 className="text-xl font-bold font-michroma text-black dark:text-white">
					Redirecting to Unified Access...
				</h2>
				<p className="text-xs text-black/60 dark:text-white/60 font-sans">
					All authentication across the Animus ecosystem is handled centrally.
				</p>
				<a
					href="https://animusproject.org/login?redirect=https://animus.animusproject.org/app/graph"
					className="inline-block mt-2 px-5 py-2.5 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold font-michroma"
				>
					Click here if not redirected
				</a>
			</div>
		</section>
	);
}
