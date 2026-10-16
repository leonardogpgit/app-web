"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { FiLogOut, FiShare2, FiUser } from "react-icons/fi";

const internalTabs = [
	{
		label: "Consensus Graph",
		href: "/app/graph",
		icon: FiShare2,
	},
	{
		label: "Participant Profile",
		href: "/app/profile",
		icon: FiUser,
	},
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const { user, logout } = useAuth();

	return (
		<ProtectedRoute>
			<div className="flex flex-col min-h-[calc(100vh-8rem)]">
				{/* Internal Sub-navigation Bar */}
				<section className="border-b border-slate-300 dark:border-white/10 bg-[#e6ecf2]/80 dark:bg-[#09090b]/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3">
					<div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3">
						<div className="flex items-center gap-3">
							<span className="font-michroma text-xs font-bold uppercase tracking-wider text-black/60 dark:text-white/60">
								Network
							</span>
							<div className="h-4 w-px bg-slate-300 dark:bg-white/20" />
							<nav className="flex items-center gap-2">
								{internalTabs.map((tab) => {
									const isActive = pathname.startsWith(tab.href);
									const Icon = tab.icon;
									return (
										<Link
											key={tab.href}
											href={tab.href}
											className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium font-michroma transition-all ${
												isActive
													? "bg-black text-white dark:bg-white dark:text-black shadow-xs"
													: "text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10"
											}`}
										>
											<Icon className="h-3.5 w-3.5" />
											<span>{tab.label}</span>
										</Link>
									);
								})}
							</nav>
						</div>

						{user && (
							<div className="flex items-center gap-3">
								<Link
									href="/app/profile"
									className="hidden sm:flex flex-col text-right hover:opacity-80 transition-opacity"
									title="View Profile"
								>
									<span className="text-xs font-medium text-black dark:text-white line-clamp-1 max-w-[200px]">
										{user.displayName || user.email}
									</span>
									<span className="font-mono text-[10px] text-black/40 dark:text-white/40">
										UID: {user.uid.slice(0, 8)}...
									</span>
								</Link>
								<button
									type="button"
									onClick={() => logout()}
									title="Sign out"
									className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-300 dark:border-white/10 bg-[#f4f7fb] dark:bg-white/5 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors"
								>
									<FiLogOut className="h-3.5 w-3.5" />
								</button>
							</div>
						)}
					</div>
				</section>

				{/* Page Content */}
				<div className="flex-1 flex flex-col">{children}</div>
			</div>
		</ProtectedRoute>
	);
}
