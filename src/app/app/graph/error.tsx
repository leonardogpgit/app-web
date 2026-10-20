"use client";

import { useEffect } from "react";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

export default function GraphError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error("Graph Error:", error);
	}, [error]);

	return (
		<div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
			<div className="max-w-md rounded-2xl border border-red-500/20 bg-red-500/5 p-6 backdrop-blur-md">
				<FiAlertTriangle className="mx-auto h-8 w-8 text-red-500 mb-3" />
				<h2 className="font-michroma text-base font-bold text-black dark:text-white mb-2">
					Graph Canvas Notice
				</h2>
				<p className="text-xs text-black/70 dark:text-white/70 mb-5 leading-relaxed">
					{error.message || "An error occurred while displaying the graph canvas."}
				</p>
				<button
					type="button"
					onClick={() => reset()}
					className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 font-michroma text-xs text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90 transition-colors cursor-pointer"
				>
					<FiRefreshCw className="h-3.5 w-3.5" />
					<span>Retry Canvas</span>
				</button>
			</div>
		</div>
	);
}
