"use client";

import ForceGraph from "force-graph";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
	FiActivity,
	FiFilter,
	FiLayers,
	FiMaximize2,
	FiRotateCcw,
	FiSearch,
	FiX,
} from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import {
	fetchUserGraph,
	type GraphDataPayload,
	type GraphLink as LinkData,
	type GraphNode as NodeData,
} from "@/services/graphService";

export type { GraphDataPayload, LinkData, NodeData };

interface GraphViewerProps {
	userId: string;
	userEmail?: string;
}

/**
 * Deterministically derives a distinguishable HSL color for any arbitrary Neo4j label.
 * No hardcoded categories or predefined dictionaries needed.
 */
function getLabelColor(label: string, isDark: boolean): string {
	if (!label) return isDark ? "#94a3b8" : "#475569";
	let hash = 0;
	for (let i = 0; i < label.length; i++) {
		hash = label.charCodeAt(i) + ((hash << 5) - hash);
	}
	const hue = Math.abs(hash) % 360;
	return isDark ? `hsl(${hue}, 65%, 65%)` : `hsl(${hue}, 65%, 38%)`;
}

export default function GraphViewer({ userId, userEmail }: GraphViewerProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const fgInstanceRef = useRef<any>(null);

	const [rawGraphData, setRawGraphData] = useState<GraphDataPayload | null>(
		null,
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [searchQuery, setSearchQuery] = useState("");
	const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [isDark, setIsDark] = useState(false);
	const { getIdToken } = useAuth();

	// Sync dark mode state reactively
	useEffect(() => {
		const checkDark = () => document.documentElement.classList.contains("dark");
		setIsDark(checkDark());

		const observer = new MutationObserver(() => {
			setIsDark(checkDark());
		});
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});
		return () => observer.disconnect();
	}, []);

	// Fetch graph from API
	const fetchGraph = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			const token = await getIdToken();
			const data = await fetchUserGraph(userId, userEmail, token);
			setRawGraphData(data);
		} catch (err) {
			console.error("Error fetching graph data:", err);
			setError(err instanceof Error ? err.message : "Error loading graph");
		} finally {
			setLoading(false);
		}
	}, [userId, userEmail, getIdToken]);

	useEffect(() => {
		fetchGraph();
	}, [fetchGraph]);

	// Extract unique labels dynamically from real Neo4j nodes
	const availableLabels = useMemo(() => {
		if (!rawGraphData?.nodes) return [];
		const labels = new Set<string>();
		for (const node of rawGraphData.nodes) {
			labels.add(node.label || "Node");
		}
		return Array.from(labels).sort();
	}, [rawGraphData]);

	// Dynamic label visibility filter
	const [activeLabels, setActiveLabels] = useState<Record<string, boolean>>({});

	useEffect(() => {
		if (availableLabels.length > 0) {
			setActiveLabels((prev) => {
				const next = { ...prev };
				for (const label of availableLabels) {
					if (next[label] === undefined) {
						next[label] = true;
					}
				}
				return next;
			});
		}
	}, [availableLabels]);

	// Filter nodes and links by active Neo4j labels
	const filteredData = useMemo(() => {
		if (!rawGraphData) return { nodes: [], links: [] };

		const allowedNodes = rawGraphData.nodes.filter(
			(n) => activeLabels[n.label || "Node"] ?? true,
		);
		const allowedNodeIds = new Set(allowedNodes.map((n) => n.id));

		const allowedLinks = rawGraphData.links.filter((l) => {
			const sourceId =
				typeof l.source === "object" ? (l.source as NodeData).id : l.source;
			const targetId =
				typeof l.target === "object" ? (l.target as NodeData).id : l.target;
			return allowedNodeIds.has(sourceId) && allowedNodeIds.has(targetId);
		});

		return {
			nodes: allowedNodes,
			links: allowedLinks,
		};
	}, [rawGraphData, activeLabels]);

	// Handle container resize
	useEffect(() => {
		if (!containerRef.current) return;
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const { width, height } = entry.contentRect;
				if (fgInstanceRef.current && width > 0 && height > 0) {
					fgInstanceRef.current.width(width).height(height);
				}
			}
		});
		resizeObserver.observe(containerRef.current);
		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	// Clean up ForceGraph on unmount
	useEffect(() => {
		return () => {
			if (fgInstanceRef.current) {
				try {
					fgInstanceRef.current._destructor?.();
				} catch (e) {
					// ignore destructor cleanup errors
				}
				fgInstanceRef.current = null;
			}
		};
	}, []);

	// Initialize and update ForceGraph
	useEffect(() => {
		if (!containerRef.current) return;

		try {
			const width = containerRef.current.clientWidth || 800;
			const height = containerRef.current.clientHeight || 600;

			if (!fgInstanceRef.current) {
				const fg = new ForceGraph(containerRef.current)
					.width(width)
					.height(height)
					.backgroundColor(isDark ? "#09090b" : "#e6ecf2")
					.nodeId("id")
					.nodeLabel(
						(node: any) =>
							`<div style="background: rgba(0,0,0,0.85); color: #fff; padding: 4px 8px; border-radius: 6px; font-size: 11px; font-family: monospace;">${node.label || "Node"}: ${node.name || node.id}</div>`,
					)
					.linkSource("source")
					.linkTarget("target")
					.linkLabel((link: any) => link.type || "RELATED")
					.linkDirectionalParticles(2)
					.linkDirectionalParticleSpeed(0.006)
					.linkDirectionalParticleWidth(2)
					.linkDirectionalParticleColor(() =>
						typeof document !== "undefined" &&
						document.documentElement.classList.contains("dark")
							? "#ffffff"
							: "#000000",
					)
					.linkColor(() =>
						typeof document !== "undefined" &&
						document.documentElement.classList.contains("dark")
							? "rgba(255, 255, 255, 0.25)"
							: "rgba(0, 0, 0, 0.18)",
					)
					.linkWidth(1.5)
					.linkDirectionalArrowLength(5)
					.linkDirectionalArrowRelPos(0.95)
					.nodeCanvasObject((node: any, ctx, globalScale) => {
						if (typeof node.x !== "number" || typeof node.y !== "number") return;
						const isCurrentDark =
							typeof document !== "undefined"
								? document.documentElement.classList.contains("dark")
								: isDark;
						const radius = 16;
						const color = getLabelColor(node.label || "Node", isCurrentDark);
						const isSelected = selectedNode?.id === node.id;

						// Outer halo for selection
						ctx.beginPath();
						ctx.arc(
							node.x,
							node.y,
							radius + (isSelected ? 6 : 3),
							0,
							2 * Math.PI,
						);
						ctx.fillStyle = isSelected
							? isCurrentDark
								? "rgba(255, 255, 255, 0.4)"
								: "rgba(0, 0, 0, 0.35)"
							: isCurrentDark
								? "rgba(255, 255, 255, 0.08)"
								: "rgba(0, 0, 0, 0.08)";
						ctx.fill();

						// Inner solid circle
						ctx.beginPath();
						ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
						ctx.fillStyle = isCurrentDark ? "#111116" : "#f4f7fb";
						ctx.fill();
						ctx.lineWidth = isSelected ? 3 : 1.5;
						ctx.strokeStyle = color;
						ctx.stroke();

						// Accent center dot
						ctx.beginPath();
						ctx.arc(node.x, node.y, 4, 0, 2 * Math.PI);
						ctx.fillStyle = color;
						ctx.fill();

						// Node Label (Visible when zoomed in or selected)
						if (globalScale > 0.6 || isSelected) {
							const label =
								node.name ||
								node.properties?.name ||
								node.properties?.title ||
								node.properties?.displayName ||
								node.label ||
								node.id;
							const fontSize = Math.max(10 / globalScale, 9);
							ctx.font = `600 ${fontSize}px Michroma, sans-serif`;
							ctx.textAlign = "center";
							ctx.textBaseline = "middle";
							ctx.fillStyle = isCurrentDark ? "#ffffff" : "#000000";
							ctx.fillText(String(label), node.x, node.y + radius + 11);
						}
					})
					.onNodeClick((node: any) => {
						setSelectedNode(node);
						fgInstanceRef.current?.centerAt(node.x, node.y, 600);
						fgInstanceRef.current?.zoom(1.8, 600);
					})
					.onBackgroundClick(() => {
						setSelectedNode(null);
					});

				fgInstanceRef.current = fg;
			}

			// Update graph styling on theme change
			const activeDark =
				typeof document !== "undefined"
					? document.documentElement.classList.contains("dark")
					: isDark;
			fgInstanceRef.current.backgroundColor(activeDark ? "#09090b" : "#e6ecf2");
			fgInstanceRef.current.graphData(filteredData);
		} catch (err) {
			console.error("ForceGraph error:", err);
		}
	}, [filteredData, selectedNode, isDark]);

	// Recenter handler
	const handleRecenter = () => {
		if (fgInstanceRef.current) {
			fgInstanceRef.current.zoomToFit(600, 50);
		}
	};

	// Search handler
	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (!searchQuery.trim() || !fgInstanceRef.current) return;

		const q = searchQuery.toLowerCase();
		const match = filteredData.nodes.find(
			(n) =>
				n.name?.toLowerCase().includes(q) ||
				n.label?.toLowerCase().includes(q) ||
				n.id.toLowerCase().includes(q),
		);

		if (match) {
			setSelectedNode(match);
			if (match.x !== undefined && match.y !== undefined) {
				fgInstanceRef.current.centerAt(match.x, match.y, 600);
				fgInstanceRef.current.zoom(2.0, 600);
			}
		}
	};

	// Toggle filter label
	const toggleLabel = (label: string) => {
		setActiveLabels((prev) => ({
			...prev,
			[label]: !prev[label],
		}));
	};

	// Find connected links for the selected node
	const selectedNodeConnections = useMemo(() => {
		if (!selectedNode || !rawGraphData) return [];
		return rawGraphData.links
			.filter((l) => {
				const sId =
					typeof l.source === "object" ? (l.source as NodeData).id : l.source;
				const tId =
					typeof l.target === "object" ? (l.target as NodeData).id : l.target;
				return sId === selectedNode.id || tId === selectedNode.id;
			})
			.map((l) => {
				const sId =
					typeof l.source === "object" ? (l.source as NodeData).id : l.source;
				const tId =
					typeof l.target === "object" ? (l.target as NodeData).id : l.target;
				const isSource = sId === selectedNode.id;
				const targetId = isSource ? tId : sId;
				const neighborNode = rawGraphData.nodes.find((n) => n.id === targetId);
				return {
					relationship: l.type,
					direction: isSource ? "outgoing" : "incoming",
					neighbor: neighborNode,
				};
			});
	}, [selectedNode, rawGraphData]);

	return (
		<div className="relative flex flex-1 flex-col h-[calc(100vh-12rem)] min-h-[550px] w-full overflow-hidden select-none">
			{/* Floating Top Control Toolbar */}
			<div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
				{/* Search & Actions */}
				<div className="flex flex-wrap items-center gap-2 pointer-events-auto">
					<form onSubmit={handleSearch} className="relative flex items-center">
						<input
							type="text"
							placeholder="Search node..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="h-9 w-48 sm:w-64 rounded-xl border border-slate-300 bg-[#f4f7fb]/90 pl-9 pr-3 text-xs text-black outline-none backdrop-blur-md transition-all placeholder:text-neutral-500 focus:w-72 focus:border-black dark:border-white/15 dark:bg-[#111116]/90 dark:text-white dark:focus:border-white"
						/>
						<FiSearch className="absolute left-3 h-3.5 w-3.5 text-black/50 dark:text-white/50" />
					</form>

					<button
						type="button"
						onClick={handleRecenter}
						title="Fit and Recenter Graph"
						className="flex h-9 items-center gap-1.5 rounded-xl border border-slate-300 bg-[#f4f7fb]/90 px-3 text-xs font-michroma text-black backdrop-blur-md hover:bg-slate-200/70 dark:border-white/15 dark:bg-[#111116]/90 dark:text-white dark:hover:bg-white/10 transition-colors shadow-xs"
					>
						<FiMaximize2 className="h-3.5 w-3.5" />
						<span className="hidden sm:inline">Recenter</span>
					</button>

					<button
						type="button"
						onClick={fetchGraph}
						title="Refresh Graph Data"
						className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 bg-[#f4f7fb]/90 text-black backdrop-blur-md hover:bg-slate-200/70 dark:border-white/15 dark:bg-[#111116]/90 dark:text-white dark:hover:bg-white/10 transition-colors shadow-xs"
					>
						<FiRotateCcw className="h-3.5 w-3.5" />
					</button>

					<button
						type="button"
						onClick={() => setIsFilterOpen(!isFilterOpen)}
						className={`flex h-9 items-center gap-1.5 rounded-xl border px-3 text-xs font-michroma backdrop-blur-md transition-colors shadow-xs ${
							isFilterOpen
								? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
								: "border-slate-300 bg-[#f4f7fb]/90 text-black hover:bg-slate-200/70 dark:border-white/15 dark:bg-[#111116]/90 dark:text-white dark:hover:bg-white/10"
						}`}
					>
						<FiFilter className="h-3.5 w-3.5" />
						<span>Labels ({availableLabels.length})</span>
					</button>
				</div>

				{/* Metadata Stats Pill */}
				{rawGraphData && (
					<div className="hidden md:flex items-center gap-2 rounded-xl border border-slate-300 bg-[#f4f7fb]/90 px-3 py-1.5 text-[11px] font-mono text-black/70 backdrop-blur-md dark:border-white/15 dark:bg-[#111116]/90 dark:text-white/70 shadow-xs pointer-events-auto">
						<span className={`flex h-2 w-2 rounded-full ${rawGraphData.source === "neo4j" ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
						<span>{rawGraphData.source.toUpperCase()}</span>
						<span>•</span>
						<span>{filteredData.nodes.length} Nodes</span>
						<span>•</span>
						<span>{filteredData.links.length} Links</span>
					</div>
				)}
			</div>

			{/* Filter Popover Panel - Pure Dynamic Neo4j Labels */}
			{isFilterOpen && (
				<div className="absolute top-16 left-4 z-20 w-64 rounded-2xl border border-slate-300 bg-[#f4f7fb]/95 p-4 shadow-xl backdrop-blur-md dark:border-white/15 dark:bg-[#111116]/95">
					<div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-300 dark:border-white/10">
						<span className="font-michroma text-xs font-bold text-black dark:text-white uppercase tracking-wider">
							Neo4j Labels
						</span>
						<button
							type="button"
							onClick={() => setIsFilterOpen(false)}
							className="text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white"
						>
							<FiX className="h-3.5 w-3.5" />
						</button>
					</div>
					<div className="space-y-2 max-h-60 overflow-y-auto">
						{availableLabels.length === 0 ? (
							<p className="text-xs text-black/50 dark:text-white/50 italic py-2">
								No labels found in graph
							</p>
						) : (
							availableLabels.map((label) => (
								<label
									key={label}
									className="flex items-center justify-between gap-2 text-xs text-black/80 dark:text-white/80 cursor-pointer hover:opacity-80"
								>
									<div className="flex items-center gap-2">
										<span
											className="h-2.5 w-2.5 rounded-full"
											style={{ backgroundColor: getLabelColor(label, isDark) }}
										/>
										<span className="font-mono">{label}</span>
									</div>
									<input
										type="checkbox"
										checked={activeLabels[label] ?? true}
										onChange={() => toggleLabel(label)}
										className="rounded border-slate-300 text-black focus:ring-black dark:border-white/20 dark:bg-white/10"
									/>
								</label>
							))
						)}
					</div>
				</div>
			)}

			{/* Main Canvas Area */}
			<div
				ref={containerRef}
				className="w-full h-full flex-1 cursor-grab active:cursor-grabbing"
			/>

			{/* Loading Overlay */}
			{loading && (
				<div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-[#e6ecf2]/60 dark:bg-[#09090b]/60 backdrop-blur-xs">
					<div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-400 border-t-black dark:border-white/20 dark:border-t-white" />
					<p className="font-michroma text-xs text-black/70 dark:text-white/70">
						Loading Neo4j Graph...
					</p>
				</div>
			)}

			{/* Empty State Overlay */}
			{!loading && filteredData.nodes.length === 0 && (
				<div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none p-6 text-center">
					<div className="max-w-md rounded-2xl border border-slate-300/80 bg-[#f4f7fb]/85 p-6 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-[#111116]/85">
						<FiLayers className="mx-auto h-7 w-7 text-black/40 dark:text-white/40 mb-3" />
						<h3 className="font-michroma text-sm font-bold text-black dark:text-white mb-2">
							Animus Consensus Graph
						</h3>
						<p className="text-xs text-black/60 dark:text-white/60 leading-relaxed mb-4">
							Red de consenso en pausa. La red pública de Animus opera de forma independiente al grafo privado de Replica y se encuentra temporalmente en espera.
						</p>
						<div className="inline-flex items-center gap-2 rounded-lg bg-black/5 dark:bg-white/5 px-3 py-1.5 text-[11px] font-mono text-black/60 dark:text-white/60">
							<span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
							<span>Sin conexión activa</span>
						</div>
						<div className="mt-4 pt-3 border-t border-slate-300/60 dark:border-white/10 text-[11px] text-black/70 dark:text-white/70 font-tektur text-center leading-relaxed">
							<span className="font-semibold text-black dark:text-white">Conexión con Replica:</span> Si lo decides, tus respuestas en Animus pueden enseñar a tu <strong className="font-michroma">Replica</strong> cómo piensas, sin esfuerzo adicional.
						</div>
					</div>
				</div>
			)}

			{/* Error Banner */}
			{error && (
				<div className="absolute bottom-6 left-6 z-30 max-w-md rounded-xl border border-slate-300 bg-[#f4f7fb] p-4 text-xs text-black shadow-lg dark:border-white/15 dark:bg-[#111116] dark:text-white">
					<p className="font-bold font-michroma mb-1">
						Graph Connection Notice
					</p>
					<p className="opacity-80">{error}</p>
				</div>
			)}

			{/* Right-Hand Node Inspector Sidebar */}
			{selectedNode && (
				<aside className="absolute top-4 right-4 bottom-4 z-20 w-80 sm:w-96 rounded-2xl border border-slate-300 bg-[#f4f7fb]/95 p-5 shadow-2xl backdrop-blur-md dark:border-white/15 dark:bg-[#111116]/95 overflow-y-auto flex flex-col">
					{/* Header */}
					<div className="flex items-start justify-between pb-4 border-b border-slate-300 dark:border-white/10">
						<div>
							<span className="inline-block rounded-md bg-black/5 dark:bg-white/10 px-2 py-0.5 text-[10px] font-mono uppercase text-black/70 dark:text-white/70">
								{selectedNode.label || "Node"}
							</span>
							<h3 className="mt-1 text-lg font-bold font-michroma text-black dark:text-white break-words">
								{String(
									selectedNode.name ||
										selectedNode.properties?.name ||
										selectedNode.properties?.title ||
										selectedNode.properties?.displayName ||
										selectedNode.id,
								)}
							</h3>
						</div>
						<button
							type="button"
							onClick={() => setSelectedNode(null)}
							className="rounded-lg p-1 text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
						>
							<FiX className="h-4 w-4" />
						</button>
					</div>

					{/* Properties Section */}
					<div className="py-4 space-y-3 flex-1">
						<div className="flex items-center gap-1.5 text-xs font-bold font-michroma text-black/70 dark:text-white/70">
							<FiLayers className="h-3.5 w-3.5" />
							<span>Node Properties</span>
						</div>

						<div className="rounded-xl border border-slate-300 dark:border-white/10 bg-black/2 dark:bg-white/2 p-3 font-mono text-[11px] space-y-2 max-h-56 overflow-y-auto">
							<div className="flex justify-between border-b border-slate-200 dark:border-white/5 pb-1">
								<span className="text-black/50 dark:text-white/50">id</span>
								<span className="text-black dark:text-white break-all text-right max-w-[180px]">
									{selectedNode.id}
								</span>
							</div>
							<div className="flex justify-between border-b border-slate-200 dark:border-white/5 pb-1">
								<span className="text-black/50 dark:text-white/50">label</span>
								<span className="text-black dark:text-white break-all text-right max-w-[180px]">
									{selectedNode.label || "Node"}
								</span>
							</div>
							{Object.entries(selectedNode.properties || {}).map(
								([key, value]) => (
									<div
										key={key}
										className="flex justify-between border-b border-slate-200 dark:border-white/5 pb-1 last:border-0"
									>
										<span className="text-black/50 dark:text-white/50">
											{key}
										</span>
										<span className="text-black dark:text-white break-all text-right max-w-[180px]">
											{typeof value === "object"
												? JSON.stringify(value)
												: String(value)}
										</span>
									</div>
								),
							)}
						</div>

						{/* Topology Connections */}
						<div className="pt-2">
							<div className="flex items-center gap-1.5 text-xs font-bold font-michroma text-black/70 dark:text-white/70 mb-2">
								<FiActivity className="h-3.5 w-3.5" />
								<span>
									Connected Topology ({selectedNodeConnections.length})
								</span>
							</div>

							<div className="space-y-1.5 max-h-48 overflow-y-auto">
								{selectedNodeConnections.length === 0 ? (
									<p className="text-xs text-black/40 dark:text-white/40 italic">
										No direct links found.
									</p>
								) : (
									selectedNodeConnections.map((conn, idx) => (
										<button
											type="button"
											key={`${conn.neighbor?.id || idx}-${conn.relationship}-${conn.direction}`}
											onClick={() => {
												if (conn.neighbor) {
													setSelectedNode(conn.neighbor);
													if (
														conn.neighbor.x !== undefined &&
														conn.neighbor.y !== undefined
													) {
														fgInstanceRef.current?.centerAt(
															conn.neighbor.x,
															conn.neighbor.y,
															600,
														);
													}
												}
											}}
											className="flex w-full items-center justify-between gap-2 rounded-xl border border-slate-200 dark:border-white/5 bg-[#f4f7fb] dark:bg-white/5 p-2 text-left text-xs transition-colors hover:bg-slate-200/50 dark:hover:bg-white/10"
										>
											<div className="min-w-0">
												<div className="font-michroma text-[11px] text-black dark:text-white truncate">
													{String(
														conn.neighbor?.name ||
															conn.neighbor?.properties?.name ||
															conn.neighbor?.id ||
															"Unknown",
													)}
												</div>
												<div className="text-[10px] text-black/50 dark:text-white/50">
													{conn.direction === "outgoing" ? "→" : "←"}{" "}
													{conn.relationship}
												</div>
											</div>
											<span className="rounded bg-black/5 dark:bg-white/10 px-1.5 py-0.5 text-[9px] font-mono uppercase text-black/60 dark:text-white/60">
												{conn.neighbor?.label || "Node"}
											</span>
										</button>
									))
								)}
							</div>
						</div>
					</div>

					{/* Footer Details */}
					<div className="pt-3 border-t border-slate-300 dark:border-white/10 flex justify-between items-center text-[10px] font-mono text-black/40 dark:text-white/40">
						<span>Animus Graph</span>
						<span>Neo4j Cypher Synced</span>
					</div>
				</aside>
			)}
		</div>
	);
}
