import type {
	FAQItem,
	Feature,
	PricingTier,
	Review,
	SocialLink,
} from "@/types";

export const storeConfig = {
	/** Set to true to pull live metadata from the App Store at build time */
	fetchRealData: false,
	/** Numeric App Store app ID (without the "id" prefix) */
	appStoreAppId: 686449807,
} as const;

export const navLinks = [
	{ href: "/#features", label: "How It Works" },
	{ href: "/#pricing", label: "Participation" },
	{ href: "/faq", label: "FAQ" },
	{ href: "https://animusproject.org", label: "The Project" },
] as const;

export const site = {
	name: "Animus",
	url: "https://app.animusproject.org",
	description:
		"The collective mind of humanity in your pocket. Give your opinion, reveal real human consensus without bias, and discover what the world truly thinks in real time.",
	logo: "/favicon.svg",
	keywords: [
		"animus",
		"human consensus",
		"collective mind",
		"opinion",
		"social thought",
		"real-time pulse",
		"anonymous opinion",
		"demographics",
	],
	storeLinks: {
		apple: "#",
		google: "#",
	},
	rating: {
		score: 4.9,
		count: "Community",
	},
	ageRating: "16+",
	version: "1.0.0 (Beta)",
	minimumOS: "Android & iOS",
	releaseDate: "2026",
	social: [
		{ url: "https://x.com/animusproject", icon: "RiTwitterXFill", label: "X (Twitter)" },
	] as SocialLink[],
} as const;

export const features: Feature[] = [
	{
		title: "Zero Bias, Pure Consensus",
		description:
			"To see how the world thinks, you must answer first. No pre-conditioned opinions, algorithms, or echo chambers—only honest, raw perspectives.",
		icon: "FiEye",
	},
	{
		title: "Give to Ask",
		description:
			"An honest reciprocity engine. Answer community questions to earn participation credits, unlock the right to ask your own, and boost their reach.",
		icon: "FiZap",
	},
	{
		title: "Radical Privacy",
		description:
			"Your personal identity does not interest us. No names, no tracking, no surveillance. Only age bracket, gender, and general location to map genuine societal patterns.",
		icon: "FiLock",
	},
	{
		title: "One-Tap Simplicity",
		description:
			"Multiple choice and numerical answers designed for rapid input. Build a healthy daily habit of answering dozens of interesting questions in minutes.",
		icon: "FiStar",
	},
	{
		title: "Cross-Demographic Breakdown",
		description:
			"Dive into rich cross-sectional patterns. See how different generations, regions, and viewpoints contrast on real issues with total clarity.",
		icon: "FiBarChart2",
	},
	{
		title: "Ultra-Lightweight & Fast",
		description:
			"Engineered with Kotlin Multiplatform for blazing-fast navigation, minimal data transfer, low battery consumption, and zero clutter.",
		icon: "FiSliders",
	},
];

export const screenshots: string[] = [
	"/assets/screenshots/1.png",
	"/assets/screenshots/1.png",
	"/assets/screenshots/1.png",
	"/assets/screenshots/1.png",
	"/assets/screenshots/1.png",
	"/assets/screenshots/1.png",
	"/assets/screenshots/1.png",
	"/assets/screenshots/1.png",
];

export const pricingTiers: PricingTier[] = [
	{
		name: "Everyday Voice",
		price: "Free",
		description: "100% free forever for all participants. Built for open, authentic human expression.",
		features: [
			"Full access to daily questions",
			"Zero personal tracking or paywalls",
			"Instant demographic insights upon answering",
			"Earn participation credits with every answer",
			"Available on Android & iOS",
		],
		cta: "Download Free",
		ctaHref: "#download",
	},
	{
		name: "Ask & Boost",
		price: "Credits",
		period: "earned by answering",
		description: "Turn your answers into reach. Elevate your questions to the wider world.",
		features: [
			"Ask your own targeted questions",
			"Duplicate questions merged into single nodes",
			"Boost questions across local & global feeds",
			"Climb community reputation boards",
			"Tradable participation currency in the future",
		],
		cta: "Earn Credits",
		ctaHref: "#download",
		highlighted: true,
		badge: "Core Engine",
	},
	{
		name: "Custom Groups",
		price: "Open",
		period: "for communities",
		description: "Create focused questions for your university, group, organization, or followers.",
		features: [
			"Instant direct question links",
			"Invite members to download and answer with zero fatigue",
			"Clean, aggregated group breakdown",
			"Participants discover the wider Animus network",
			"Pure signal, zero comment toxicity",
		],
		cta: "Explore the Project",
		ctaHref: "https://animusproject.org",
	},
];

export const reviews: Review[] = [
	{
		author: "Carlos M., 44 · Systems Architect",
		rating: 5,
		text: "I love the reciprocity rule. You have to contribute before you can ask, and you don't see results until you commit your answer. Pure signal, zero noise.",
	},
	{
		author: "Dr. Julian V. · Sociologist & Researcher",
		rating: 5,
		text: "Finally, a platform that captures authentic human sentiment without the toxicity of comment threads. The demographic breakdown is uniquely valuable.",
	},
	{
		author: "Patricia L., 39 · Educator",
		rating: 5,
		text: "It replaced my mindless scrolling habit. I answer 15 to 20 questions with my morning coffee. Quick, thought-provoking, and completely respectful of privacy.",
	},
	{
		author: "Elena R. · Community Coordinator",
		rating: 5,
		text: "We shared a set of questions with our community. People loved how quick it was to answer without filling out long, boring forms, and immediately seeing the group breakdown.",
	},
];

export const faqs: FAQItem[] = [
	{
		question: "What is the Animus Project?",
		answer:
			"Animus is an open initiative to map the collective mind and opinions of humanity in real time. We capture authentic human perspectives without algorithms or noise, organizing them into a living, interconnected graph database.",
	},
	{
		question: "Is Animus completely free?",
		answer:
			"Yes. Animus is 100% free to download and participate in. There are no fees or subscriptions to answer questions and explore real-time community statistics.",
	},
	{
		question: "Why do I have to answer a question before seeing the results?",
		answer:
			"To ensure completely unbiased results. Seeing the consensus beforehand inherently skews human answers. Committing your own opinion first preserves authentic, uninfluenced truth.",
	},
	{
		question: "How does the credit and question system work?",
		answer:
			"Animus operates on reciprocity ('Give to Ask'). To prevent question spam and ensure rich statistical sample sizes, you earn credits by answering questions. Those credits give you the right to post your own questions and boost them across local and global feeds.",
	},
	{
		question: "What personal data does Animus collect?",
		answer:
			"We deliberately do not want your personal identity. No real names, no phone books, no surveillance tracking. We only request non-identifiable demographic markers (age bracket, gender, and general country/city) to enable cross-sectional analysis.",
	},
	{
		question: "Can multiple people ask the same question?",
		answer:
			"If your question has already been asked by someone else, Animus intelligently merges identical questions into a single knowledge node. This consolidates data volume and gives you much deeper statistics rather than fragmenting votes.",
	},
	{
		question: "Why is Animus different from traditional social media?",
		answer:
			"No vanity follower counts, no endless algorithm rabbit holes, no toxic comment warfare. Just concise, thought-provoking questions and real human consensus in a clean, lightweight mobile app.",
	},
	{
		question: "Who benefits from this data?",
		answer:
			"Humanity. Sociologists, behavioral scientists, educators, and the general public gain access to an authentic mirror of what people actually think and worry about, rather than what ad-driven algorithms amplify.",
	},
];
