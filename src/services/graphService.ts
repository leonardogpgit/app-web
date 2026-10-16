export interface GraphNode {
	id: string;
	label: string;
	type:
		| "user"
		| "dilemma"
		| "option"
		| "consensus"
		| "topic"
		| "reciprocity"
		| "cluster"
		| string;
	name: string;
	properties: Record<string, unknown>;
	x?: number;
	y?: number;
	vx?: number;
	vy?: number;
}

export interface GraphLink {
	source: string | GraphNode;
	target: string | GraphNode;
	type: string;
	properties?: Record<string, unknown>;
}

export interface GraphDataPayload {
	success: boolean;
	source: "neo4j" | "backend";
	userId: string;
	nodes: GraphNode[];
	links: GraphLink[];
	summary?: {
		totalNodes: number;
		totalLinks: number;
	};
}

/**
 * Fetches user consensus graph data from the live backend/database.
 * Does not synthesize or invent any mock nodes; returns an empty shell if no data is found.
 */
export async function fetchUserGraph(
	userId: string,
	_userEmail?: string,
	token?: string | null,
): Promise<GraphDataPayload> {
	const backendUrl =
		process.env.NEXT_PUBLIC_ANIMUS_BACKEND_URL || "http://localhost:3001";

	if (token) {
		try {
			const res = await fetch(`${backendUrl}/graph`, {
				headers: {
					Authorization: `Bearer ${token}`,
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
			console.info("Direct Animus backend connection unavailable:", err);
		}
	}

	// Empty logical shell: awaits real nodes from database
	return {
		success: true,
		source: "backend",
		userId,
		nodes: [],
		links: [],
		summary: {
			totalNodes: 0,
			totalLinks: 0,
		},
	};
}
