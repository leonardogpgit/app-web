"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<ProtectedRoute>
			<div className="flex flex-col min-h-[calc(100vh-8rem)]">
				<div className="flex-1 flex flex-col">{children}</div>
			</div>
		</ProtectedRoute>
	);
}
