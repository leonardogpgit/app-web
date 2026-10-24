export interface GraphNode {
	id: string;
	label: string;
	labels?: string[];
	name?: string;
	properties: Record<string, unknown>;
	x?: number;
	y?: number;
	vx?: number;
	vy?: number;
	[key: string]: unknown;
}

export interface GraphLink {
	source: string | GraphNode;
	target: string | GraphNode;
	type: string;
	properties?: Record<string, unknown>;
}

export interface GraphDataPayload {
	success: boolean;
	source: "neo4j" | "backend" | "standby";
	userId: string;
	nodes: GraphNode[];
	links: GraphLink[];
	summary?: {
		totalNodes: number;
		totalLinks: number;
	};
}

/**
 * Fetches user consensus graph data for Animus.
 * Note: Animus Consensus Graph is completely distinct from Animus Replica's persona/memory graph.
 * Animus operates in standalone standby mode without connecting to the Replica backend.
 */
export async function fetchUserGraph(
	userId: string,
	_userEmail?: string,
	_token?: string | null,
): Promise<GraphDataPayload> {
	const backendUrl = process.env.NEXT_PUBLIC_ANIMUS_BACKEND_URL;

	// Only attempt fetch if a dedicated, non-replica Animus backend URL is explicitly configured
	if (
		backendUrl &&
		!backendUrl.includes("jarvisback") &&
		!backendUrl.includes("replica") &&
		_token
	) {
		try {
			const res = await fetch(`${backendUrl}/consensus/graph`, {
				headers: {
					Authorization: `Bearer ${_token}`,
					Accept: "application/json",
				},
			});

			if (res.ok) {
				const json = await res.json();
				if (json?.nodes && Array.isArray(json.nodes)) {
					return {
						success: true,
						source: "neo4j",
						userId,
						nodes: json.nodes,
						links: json.links || [],
						summary: {
							totalNodes: json.nodes.length,
							totalLinks: (json.links || []).length,
						},
					};
				}
			}
		} catch (err) {
			console.info("Animus consensus backend unavailable:", err);
		}
	}

	// Standby mode: Independent consensus network without active backend connection
	return {
		success: true,
		source: "standby",
		userId,
		nodes: [],
		links: [],
		summary: {
			totalNodes: 0,
			totalLinks: 0,
		},
	};
}
