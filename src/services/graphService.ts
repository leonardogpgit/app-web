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
		process.env.NEXT_PUBLIC_ANIMUS_BACKEND_URL || "https://jarvisback.animusproject.org";

	if (token) {
		const lang =
			typeof navigator !== "undefined" &&
			navigator.language?.toLowerCase().startsWith("es")
				? "es"
				: "en";

		const defaultHeaders = {
			Authorization: `Bearer ${token}`,
			"x-replica-language": lang,
			Accept: "application/json",
		};

		try {
			const res = await fetch(`${backendUrl}/graph`, {
				headers: defaultHeaders,
			});

			if (res.ok) {
				const json = await res.json();
				if (json?.nodes && Array.isArray(json.nodes)) {
					if (json.nodes.length === 0) {
						// Attempt auto-bootstrap in case session was not initialized yet
						try {
							await fetch(`${backendUrl}/session/login-active`, {
								method: "POST",
								headers: {
									...defaultHeaders,
									"Content-Type": "application/json",
								},
								body: JSON.stringify({ initialAppLocale: lang }),
							});
							const retryRes = await fetch(`${backendUrl}/graph`, {
								headers: defaultHeaders,
							});
							if (retryRes.ok) {
								const retryJson = await retryRes.json();
								if (
									retryJson?.nodes &&
									Array.isArray(retryJson.nodes) &&
									retryJson.nodes.length > 0
								) {
									return {
										success: true,
										source: "neo4j",
										userId,
										nodes: retryJson.nodes,
										links: retryJson.links || [],
										summary: {
											totalNodes: retryJson.nodes.length,
											totalLinks: (retryJson.links || []).length,
										},
									};
								}
							}
						} catch (bootErr) {
							console.info("Auto-bootstrap attempt completed:", bootErr);
						}
					}

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
