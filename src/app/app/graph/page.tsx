"use client";

import dynamic from "next/dynamic";
import { useAuth } from "@/context/AuthContext";

// Dynamic import with SSR disabled to ensure pure browser canvas execution
const GraphViewer = dynamic(() => import("@/components/GraphViewer"), {
	ssr: false,
	loading: () => (
		<div className="flex flex-1 items-center justify-center p-12">
			<div className="flex flex-col items-center gap-3 text-center">
				<div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-400 border-t-black dark:border-white/20 dark:border-t-white" />
				<span className="font-michroma text-xs text-black/60 dark:text-white/60">
					Initializing Consensus Graph Canvas...
				</span>
			</div>
		</div>
	),
});

export default function GraphViewerPage() {
	const { user } = useAuth();

	if (!user) {
		return null;
	}

	return (
		<div className="flex flex-1 flex-col h-full w-full">
			<GraphViewer userId={user.uid} userEmail={user.email || undefined} />
		</div>
	);
}
