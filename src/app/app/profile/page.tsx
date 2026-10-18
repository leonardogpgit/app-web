"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
	FiUser,
	FiMail,
	FiKey,
	FiCopy,
	FiCheck,
	FiShield,
	FiCalendar,
	FiClock,
	FiLogOut,
	FiShare2,
} from "react-icons/fi";

export default function ProfilePage() {
	const { user, logout } = useAuth();
	const [copied, setCopied] = useState(false);

	if (!user) return null;

	const handleCopyUid = () => {
		if (!user?.uid) return;
		navigator.clipboard.writeText(user.uid);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const authProvider = user.providerData?.[0]?.providerId || "password";
	const creationDate = user.metadata?.creationTime
		? new Date(user.metadata.creationTime).toLocaleDateString(undefined, {
				year: "numeric",
				month: "long",
				day: "numeric",
			})
		: "Unknown";

	const lastLogin = user.metadata?.lastSignInTime
		? new Date(user.metadata.lastSignInTime).toLocaleString(undefined, {
				dateStyle: "medium",
				timeStyle: "short",
			})
		: "Current session";

	return (
		<div className="flex-1 w-full bg-[#f4f7fb] dark:bg-[#09090b] px-4 py-8 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-4xl space-y-6">
				{/* Header Section */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-300 dark:border-white/10 pb-6">
					<div>
						<h1 className="font-michroma text-2xl sm:text-3xl font-bold text-black dark:text-white">
							User Profile
						</h1>
					</div>
					<div className="flex items-center gap-2">
						<Link
							href="/app/graph"
							className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-white/5 px-4 py-2 text-xs font-michroma text-black dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors shadow-xs"
						>
							<FiShare2 className="h-3.5 w-3.5" />
							<span>Open Graph</span>
						</Link>
					</div>
				</div>

				{/* Identity Card */}
				<div className="rounded-2xl border border-slate-300 dark:border-white/10 bg-[#f4f7fb]/90 dark:bg-[#111116]/90 p-6 sm:p-8 backdrop-blur-md shadow-xs space-y-6">
					<div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
						<div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-black dark:bg-white text-3xl font-bold font-michroma text-white dark:text-black shadow-md">
							{user.photoURL ? (
								// eslint-disable-next-line @next/next/no-img-element
								<img
									src={user.photoURL}
									alt={user.displayName || "User Avatar"}
									className="h-full w-full rounded-2xl object-cover"
									referrerPolicy="no-referrer"
								/>
							) : user.displayName ? (
								user.displayName.charAt(0).toUpperCase()
							) : user.email ? (
								user.email.charAt(0).toUpperCase()
							) : (
								<FiUser className="h-8 w-8" />
							)}
						</div>
						<div className="min-w-0 flex-1 space-y-1">
							<div className="flex flex-wrap items-center gap-3">
								<h2 className="font-michroma text-xl font-bold text-black dark:text-white truncate">
									{user.displayName || user.email?.split("@")[0] || "User"}
								</h2>
								<span className="rounded-md bg-black/5 dark:bg-white/10 px-2 py-0.5 text-[10px] font-mono uppercase text-black/60 dark:text-white/60">
									{authProvider}
								</span>
								<button
									type="button"
									onClick={() => logout()}
									title="Sign out"
									className="inline-flex items-center gap-1.5 rounded-lg border border-red-300 dark:border-red-900/40 bg-red-500/5 px-2.5 py-1 text-xs font-michroma text-red-700 dark:text-red-400 hover:bg-red-500/10 transition-colors shadow-xs"
								>
									<FiLogOut className="h-3 w-3" />
									<span>Sign out</span>
								</button>
							</div>
							<p className="text-sm text-black/60 dark:text-white/60 truncate flex items-center gap-2">
								<FiMail className="h-3.5 w-3.5 shrink-0" />
								<span>{user.email}</span>
								{user.emailVerified && (
									<span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
										Verified
									</span>
								)}
							</p>
						</div>
					</div>

					{/* Universal UID Section */}
					<div className="rounded-xl border border-slate-300/80 dark:border-white/10 bg-black/2 dark:bg-white/2 p-4 space-y-2">
						<div className="flex items-center justify-between">
							<span className="flex items-center gap-1.5 font-michroma text-xs font-bold text-black/70 dark:text-white/70">
								<FiKey className="h-3.5 w-3.5" />
								<span>Universal Ecosystem UID</span>
							</span>
							<button
								type="button"
								onClick={handleCopyUid}
								className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-white/15 bg-white dark:bg-white/5 px-2.5 py-1 text-[11px] font-mono text-black dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
							>
								{copied ? (
									<>
										<FiCheck className="h-3 w-3 text-emerald-500" />
										<span className="text-emerald-500">Copied</span>
									</>
								) : (
									<>
										<FiCopy className="h-3 w-3" />
										<span>Copy UID</span>
									</>
								)}
							</button>
						</div>
						<div className="font-mono text-xs sm:text-sm text-black dark:text-white bg-white/70 dark:bg-black/30 p-2.5 rounded-lg border border-slate-200 dark:border-white/5 break-all select-all">
							{user.uid}
						</div>
						<p className="text-[11px] text-black/50 dark:text-white/50 leading-relaxed">
							This identifier links your consensus responses and graph across all applications in the Animus & Imago ecosystem under project <code className="font-mono text-black/70 dark:text-white/70">jarvis-animus</code>.
						</p>
					</div>

					{/* Metadata Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
						<div className="rounded-xl border border-slate-200 dark:border-white/5 bg-[#f4f7fb] dark:bg-white/2 p-4 space-y-1">
							<div className="flex items-center gap-2 text-xs text-black/50 dark:text-white/50">
								<FiCalendar className="h-3.5 w-3.5" />
								<span>Member Since</span>
							</div>
							<div className="font-michroma text-sm font-semibold text-black dark:text-white">
								{creationDate}
							</div>
						</div>

						<div className="rounded-xl border border-slate-200 dark:border-white/5 bg-[#f4f7fb] dark:bg-white/2 p-4 space-y-1">
							<div className="flex items-center gap-2 text-xs text-black/50 dark:text-white/50">
								<FiClock className="h-3.5 w-3.5" />
								<span>Last Session</span>
							</div>
							<div className="font-michroma text-sm font-semibold text-black dark:text-white">
								{lastLogin}
							</div>
						</div>

						<div className="rounded-xl border border-slate-200 dark:border-white/5 bg-[#f4f7fb] dark:bg-white/2 p-4 space-y-1">
							<div className="flex items-center gap-2 text-xs text-black/50 dark:text-white/50">
								<FiShield className="h-3.5 w-3.5" />
								<span>Auth Domain</span>
							</div>
							<div className="font-mono text-xs text-black/80 dark:text-white/80">
								jarvis-animus.firebaseapp.com
							</div>
						</div>

						<div className="rounded-xl border border-slate-200 dark:border-white/5 bg-[#f4f7fb] dark:bg-white/2 p-4 space-y-1">
							<div className="flex items-center gap-2 text-xs text-black/50 dark:text-white/50">
								<FiShare2 className="h-3.5 w-3.5" />
								<span>Consensus Topology</span>
							</div>
							<div className="font-michroma text-xs text-black/80 dark:text-white/80">
								Participant Node Verified
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
