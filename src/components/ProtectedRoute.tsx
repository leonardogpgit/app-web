"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
	const { user, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading && !user) {
			router.push("/login");
		}
	}, [user, loading, router]);

	if (loading) {
		return (
			<div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
				<div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-400 border-t-black dark:border-white/20 dark:border-t-white" />
				<p className="font-michroma text-xs tracking-wider text-black/60 dark:text-white/60">
					Verifying mind node identity...
				</p>
			</div>
		);
	}

	if (!user) {
		return (
			<div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
				<div className="card-base max-w-sm p-6 text-center space-y-4">
					<h2 className="font-michroma text-lg font-bold text-black dark:text-white">
						Authentication Required
					</h2>
					<p className="text-xs text-black/70 dark:text-white/70">
						You must be signed in to access your consensus graph.
					</p>
					<Link
						href="/login"
						className="inline-block w-full rounded-xl bg-black px-4 py-2.5 font-michroma text-xs text-white hover:opacity-90 dark:bg-white dark:text-black transition-opacity"
					>
						Sign In
					</Link>
				</div>
			</div>
		);
	}

	return <>{children}</>;
}
