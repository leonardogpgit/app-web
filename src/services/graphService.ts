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
		| "cluster";
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
	source: "neo4j" | "backend" | "synthesized";
	userId: string;
	nodes: GraphNode[];
	links: GraphLink[];
	summary?: {
		totalNodes: number;
		totalLinks: number;
	};
}

export function generateSynthesizedGraph(
	userId: string,
	userEmail?: string,
): { nodes: GraphNode[]; links: GraphLink[] } {
	const userNodeId = `user_${userId}`;
	const dilemma1Id = `dilemma_ethics_01`;
	const dilemma2Id = `dilemma_ai_sync_02`;
	const option1AId = `opt_choice_1a`;
	const option1BId = `opt_choice_1b`;
	const option2AId = `opt_choice_2a`;
	const option2BId = `opt_choice_2b`;
	const topicEthicsId = `topic_ethics`;
	const topicAiId = `topic_technology`;
	const consensus1Id = `consensus_global_01`;
	const consensus2Id = `consensus_demographic_02`;
	const reciprocityNodeId = `reciprocity_${userId}`;
	const cohortNodeId = `cohort_human_verified`;

	const nodes: GraphNode[] = [
		{
			id: userNodeId,
			label: "User Mind",
			type: "user",
			name: userEmail?.split("@")[0] || "Participant Mind",
			properties: {
				userId,
				email: userEmail || "anonymous@animusproject.org",
				anonymityLevel: "High (Zero PII)",
				reputationIndex: 98.2,
				participationsCount: 47,
				biasNeutralityScore: "99.1%",
			},
		},
		{
			id: dilemma1Id,
			label: "Active Dilemma",
			type: "dilemma",
			name: "AI Autonomous Agency",
			properties: {
				dilemmaId: "dilemma_01",
				prompt: "Should autonomous AI agents possess independent moral responsibility in high-stakes decisions?",
				totalResponses: 14208,
				category: "Ethics & Technology",
				status: "consensus_reached",
			},
		},
		{
			id: dilemma2Id,
			label: "Active Dilemma",
			type: "dilemma",
			name: "Digital Identity Reciprocity",
			properties: {
				dilemmaId: "dilemma_02",
				prompt: "Is algorithmic feed optimization inherently incompatible with authentic human consensus?",
				totalResponses: 9540,
				category: "Philosophy",
				status: "active",
			},
		},
		{
			id: option1AId,
			label: "Option Choice",
			type: "option",
			name: "A: Strict Human Accountability",
			properties: {
				optionId: "opt_1a",
				votesPercentage: "68.4%",
				totalVotes: 9718,
				status: "majority",
			},
		},
		{
			id: option1BId,
			label: "Option Choice",
			type: "option",
			name: "B: Shared System Liability",
			properties: {
				optionId: "opt_1b",
				votesPercentage: "31.6%",
				totalVotes: 4490,
				status: "minority",
			},
		},
		{
			id: option2AId,
			label: "Option Choice",
			type: "option",
			name: "A: Incompatible (Feed distorts)",
			properties: {
				optionId: "opt_2a",
				votesPercentage: "81.2%",
				totalVotes: 7746,
				status: "majority",
			},
		},
		{
			id: option2BId,
			label: "Option Choice",
			type: "option",
			name: "B: Compatible with Guardrails",
			properties: {
				optionId: "opt_2b",
				votesPercentage: "18.8%",
				totalVotes: 1794,
				status: "minority",
			},
		},
		{
			id: topicEthicsId,
			label: "Knowledge Topic",
			type: "topic",
			name: "Ethics & Moral Graph",
			properties: {
				slug: "ethics",
				activeDilemmas: 84,
				aggregateConsensusAccuracy: "96.4%",
			},
		},
		{
			id: topicAiId,
			label: "Knowledge Topic",
			type: "topic",
			name: "Artificial Intelligence",
			properties: {
				slug: "technology",
				activeDilemmas: 112,
				aggregateConsensusAccuracy: "97.8%",
			},
		},
		{
			id: consensus1Id,
			label: "Demographic Consensus",
			type: "consensus",
			name: "Global Consensus: 68.4%",
			properties: {
				consensusId: "cons_01",
				confidenceInterval: "99.5%",
				biasRemoved: true,
				anonymityVerified: true,
			},
		},
		{
			id: consensus2Id,
			label: "Demographic Consensus",
			type: "consensus",
			name: "Global Consensus: 81.2%",
			properties: {
				consensusId: "cons_02",
				confidenceInterval: "99.8%",
				biasRemoved: true,
				anonymityVerified: true,
			},
		},
		{
			id: reciprocityNodeId,
			label: "Reciprocity Hub",
			type: "reciprocity",
			name: "Participation Credits",
			properties: {
				creditsEarned: 124,
				answerToAskRatio: "1.8x",
				tier: "Free Forever Verified",
				dailyParticipationStreak: 12,
			},
		},
		{
			id: cohortNodeId,
			label: "Demographic Cohort",
			type: "cluster",
			name: "Verified Human Node",
			properties: {
				sybilResistant: true,
				graphClusteringCoeff: 0.82,
				anonymizedRegion: "Global Subnetwork",
			},
		},
	];

	const links: GraphLink[] = [
		{ source: userNodeId, target: dilemma1Id, type: "ANSWERED" },
		{ source: userNodeId, target: dilemma2Id, type: "ANSWERED" },
		{ source: userNodeId, target: option1AId, type: "CHOSE" },
		{ source: userNodeId, target: option2AId, type: "CHOSE" },
		{ source: userNodeId, target: reciprocityNodeId, type: "PARTICIPATION_CREDIT" },
		{ source: userNodeId, target: cohortNodeId, type: "MEMBER_OF" },
		{ source: dilemma1Id, target: option1AId, type: "HAS_OPTION" },
		{ source: dilemma1Id, target: option1BId, type: "HAS_OPTION" },
		{ source: dilemma2Id, target: option2AId, type: "HAS_OPTION" },
		{ source: dilemma2Id, target: option2BId, type: "HAS_OPTION" },
		{ source: dilemma1Id, target: topicEthicsId, type: "TAGGED_WITH" },
		{ source: dilemma2Id, target: topicAiId, type: "TAGGED_WITH" },
		{ source: dilemma1Id, target: consensus1Id, type: "REVEALED" },
		{ source: dilemma2Id, target: consensus2Id, type: "REVEALED" },
		{ source: consensus1Id, target: cohortNodeId, type: "AGGREGATED_FROM" },
		{ source: consensus2Id, target: cohortNodeId, type: "AGGREGATED_FROM" },
	];

	return { nodes, links };
}

export async function fetchUserGraph(
	userId: string,
	userEmail?: string,
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
			console.info("Direct Animus backend connection unavailable, using schema view:", err);
		}
	}

	const fallback = generateSynthesizedGraph(userId, userEmail);
	return {
		success: true,
		source: "synthesized",
		userId,
		nodes: fallback.nodes,
		links: fallback.links,
		summary: {
			totalNodes: fallback.nodes.length,
			totalLinks: fallback.links.length,
		},
	};
}
