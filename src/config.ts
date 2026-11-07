import type {
	FAQItem,
	Feature,
	ModeItem,
	PricingTier,
	Review,
	SocialLink,
} from "@/types";

export const storeConfig = {
	fetchRealData: false,
	appStoreAppId: 686449807,
} as const;

export const navLinks = [
	{ href: "https://animus.animusproject.org", label: "Animus" },
	{ href: "https://resonance.animusproject.org", label: "Resonance" },
	{ href: "https://remnant.animusproject.org", label: "Remnant" },
	{ href: "https://animusproject.org", label: "The Project" },
] as const;

export const modes: ModeItem[] = [];

export const site = {
	name: "Animus",
	url: "https://animus.animusproject.org",
	description:
		"A new way to see the world is coming. Discover what humanity truly thinks—without noise, manipulation, or bias. Under wraps until launch.",
	logo: "/favicon.svg",
	keywords: [
		"animus",
		"animus project",
		"privacy",
		"sovereign technology",
	],
	storeLinks: {
		apple: "#",
		google: "#",
		apk: "#",
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
		{ url: "https://discord.gg/animusproject", icon: "RiDiscordFill", label: "Discord" },
		{ url: "https://instagram.com/animusproject", icon: "RiInstagramFill", label: "Instagram" },
		{ url: "https://facebook.com/animusproject", icon: "RiFacebookFill", label: "Facebook" },
		{ url: "https://reddit.com/r/animusproject", icon: "RiRedditFill", label: "Reddit" },
		{ url: "https://tiktok.com/@animusproject", icon: "RiTiktokFill", label: "TikTok" },
	] as SocialLink[],
} as const;

export const features: Feature[] = [
	{
		title: "New Perspective",
		description:
			"A new way to perceive global thought and reality, free from algorithmic distortion.",
		icon: "FiEye",
	},
	{
		title: "Pure Signal",
		description:
			"No social media theatrics, no popularity contests, and no toxic noise.",
		icon: "FiZap",
	},
	{
		title: "Radical Privacy",
		description:
			"Anonymous by design with zero spyware, zero tracking, and auditable network security.",
		icon: "FiLock",
	},
];

export const screenshots: string[] = [];

export const pricingTiers: PricingTier[] = [];

export const reviews: Review[] = [];

export const faqs: FAQItem[] = [
	{
		question: "What is Animus?",
		answer:
			"A new way to see the world and understand what humanity truly thinks—free from social media manipulation and bias.",
	},
	{
		question: "How does it work?",
		answer:
			"Architectural and operational details remain confidential until our official public launch.",
	},
	{
		question: "How is my privacy protected?",
		answer:
			"Animus is built with radical anonymity, zero spyware, zero tracking SDKs, and permanent cryptographic deletion on demand.",
	},
];
