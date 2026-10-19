"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
	const router = useRouter();
	const { user, logout } = useAuth();
	const [attempted, setAttempted] = useState(false);

	useEffect(() => {
		if (!user) {
			const hasAttempted = sessionStorage.getItem("auth_redirect_attempted");
			if (!hasAttempted) {
				sessionStorage.setItem("auth_redirect_attempted", "true");
				const target = encodeURIComponent("https://app.animusproject.org/app/graph");
				window.location.href = `https://animusproject.org/login?redirect=${target}`;
			} else {
				setAttempted(true);
			}
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
							className="w-full rounded-xl bg-black px-4 py-3 text-sm font-medium font-michroma text-white hover:opacity-90 dark:bg-white dark:text-black transition-opacity cursor-pointer"
						>
							Open Graph
						</button>
						<button
							type="button"
							onClick={() => logout()}
							className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-[#f4f7fb] dark:bg-white/5 px-4 py-3 text-sm font-medium font-michroma text-black dark:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors cursor-pointer"
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
				<h1 className="text-xl font-bold font-michroma text-black dark:text-white">
					Authentication Required
				</h1>
				<p className="mt-2 text-xs text-black/60 dark:text-white/60">
					Sign in through the central Animus Project portal to access your consensus graph.
				</p>
				<button
					type="button"
					onClick={() => {
						if (typeof window !== "undefined") {
							sessionStorage.removeItem("auth_redirect_attempted");
							const target = encodeURIComponent("https://app.animusproject.org/app/graph");
							window.location.href = `https://animusproject.org/login?redirect=${target}`;
						}
					}}
					className="inline-block w-full rounded-xl bg-black px-4 py-3 text-xs font-medium font-michroma text-white hover:opacity-90 dark:bg-white dark:text-black transition-opacity cursor-pointer"
				>
					Sign In with Animus
				</button>
			</div>
		</section>
	);
}
