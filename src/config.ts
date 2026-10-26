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
	{ href: "/faq", label: "FAQ" },
	{ href: "https://animusproject.org", label: "The Project" },
] as const;

export const site = {
	name: "Animus Project",
	url: "https://app.animusproject.org",
	description:
		"The real-time pulse of human thought. Answer questions to see honest consensus without crowd bias, and discover what people truly think.",
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
		{ url: "https://github.com/animusproject", icon: "RiGithubFill", label: "GitHub" },
		{ url: "https://discord.gg/animusproject", icon: "RiDiscordFill", label: "Discord" },
		{ url: "https://t.me/animusproject", icon: "RiTelegram2Fill", label: "Telegram" },
		{ url: "https://linkedin.com/company/animusproject", icon: "RiLinkedinFill", label: "LinkedIn" },
		{ url: "https://instagram.com/animusproject", icon: "RiInstagramFill", label: "Instagram" },
		{ url: "https://youtube.com/@animusproject", icon: "RiYoutubeFill", label: "YouTube" },
		{ url: "https://facebook.com/animusproject", icon: "RiFacebookFill", label: "Facebook" },
		{ url: "https://reddit.com/r/animusproject", icon: "RiRedditFill", label: "Reddit" },
		{ url: "https://tiktok.com/@animusproject", icon: "RiTiktokFill", label: "TikTok" },
	] as SocialLink[],
} as const;

export const features: Feature[] = [
	{
		title: "Answer Before You See",
		description:
			"To see how people voted, you must answer first. No herd mentality, no bandwagon effect—just honest, uninfluenced answers.",
		icon: "FiEye",
	},
	{
		title: "Give to Ask",
		description:
			"A fair reciprocity system. Answer community questions to earn credits, ask your own questions, and reach a wider audience.",
		icon: "FiZap",
	},
	{
		title: "Anonymous by Design",
		description:
			"No names, no tracking, and no ad profiling. We only use broad demographic brackets (age, gender, general region) to show genuine patterns across groups.",
		icon: "FiLock",
	},
	{
		title: "Quick and Simple",
		description:
			"Multiple choice and rating scales built for speed. Answer dozens of interesting questions in a few minutes every day.",
		icon: "FiStar",
	},
	{
		title: "Clear Demographic Patterns",
		description:
			"See how different generations, regions, and backgrounds answer the same question, with zero noise or toxic comment threads.",
		icon: "FiBarChart2",
	},
	{
		title: "Fast and Lightweight",
		description:
			"Built natively with Kotlin Multiplatform for instant response times, minimal data usage, and long battery life.",
		icon: "FiSliders",
	},
	{
		title: "Feed Your Living Replica (Optional)",
		description:
			"If you use Animus Replica, you can link your account so your answers teach Replica how you think and decide—with zero extra effort.",
		icon: "FiCpu",
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
		description: "100% free forever. Share your perspective and see honest human consensus.",
		features: [
			"Full access to daily community questions",
			"Instant demographic results upon answering",
			"Zero personal tracking or paywalls",
			"Earn credits with every answer",
			"Optional link to Animus Replica",
			"Available on Android and iOS",
		],
		cta: "Download Free",
		ctaHref: "#download",
	},
	{
		name: "Ask & Boost",
		price: "Credits",
		period: "earned by answering",
		description: "Turn your answers into reach. Ask questions to the community and explore what people think.",
		features: [
			"Ask your own targeted questions",
			"Duplicate questions automatically merged",
			"Boost questions across local & global feeds",
			"Climb community reputation boards",
			"Zero paywalls—earn everything by answering",
		],
		cta: "Earn Credits",
		ctaHref: "#download",
		highlighted: true,
		badge: "Core Engine",
	},
	{
		name: "Communities & Teams",
		price: "Open",
		period: "for groups",
		description: "Ask focused questions for your classroom, workplace, community, or audience.",
		features: [
			"Direct question links for fast sharing",
			"Clean aggregated results with zero survey fatigue",
			"Explore demographic patterns instantly",
			"Pure signal with no toxic comments",
			"Open access for all participants",
		],
		cta: "Explore the Project",
		ctaHref: "https://animusproject.org",
	},
];

export const reviews: Review[] = [
	{
		author: "Carlos M., 44 · Systems Architect",
		rating: 5,
		text: "I love the reciprocity rule: you answer before you ask, and you don't see results until you commit your answer. Pure signal, zero noise.",
	},
	{
		author: "Dr. Julian V. · Sociologist & Researcher",
		rating: 5,
		text: "Finally, a platform that captures authentic human sentiment without comment wars. The demographic breakdown is uniquely valuable.",
	},
	{
		author: "Patricia L., 39 · Educator",
		rating: 5,
		text: "It replaced my mindless scrolling. I answer 15 to 20 questions with my morning coffee. Quick, thought-provoking, and completely private.",
	},
	{
		author: "Elena R. · Community Coordinator",
		rating: 5,
		text: "We shared questions with our community. People loved how quick it was without boring forms, and seeing the group breakdown immediately.",
	},
];

export const faqs: FAQItem[] = [
	{
		question: "What is the Animus Project?",
		answer:
			"Animus is an open platform that captures what people actually think in real time. Instead of social media algorithms designed for outrage and clicks, Animus gathers honest, uninfluenced opinions and organizes them into a clear picture of human thought.",
	},
	{
		question: "Is Animus free?",
		answer:
			"Yes, 100% free. There are no fees or subscriptions. You participate by answering questions and seeing real-time community results.",
	},
	{
		question: "Why do I have to answer before seeing the results?",
		answer:
			"To prevent herd mentality. When people see what everyone else voted first, their answers change. Committing your answer first keeps results honest and accurate.",
	},
	{
		question: "How does the credit system work?",
		answer:
			"Animus uses a simple principle: Give to Ask. You earn credits by answering questions. You then use those credits to post your own questions and boost them to more people.",
	},
	{
		question: "What personal data do you collect?",
		answer:
			"None that identifies you. No names, no email address display, no phone contacts, and no ad tracking. We only ask for broad demographic categories (age range, gender, general region) so everyone can see patterns across groups.",
	},
	{
		question: "What happens if someone asks a question that already exists?",
		answer:
			"Animus automatically merges identical questions into a single question. This keeps all the answers together and provides much larger, more reliable sample sizes.",
	},
	{
		question: "How is Animus different from social networks?",
		answer:
			"No follower counts, no algorithmic outrage feeds, and no comment wars. Just clear questions, instant honest results, and demographic patterns.",
	},
	{
		question: "Can my answers help teach my personal Replica?",
		answer:
			"Yes, if you choose to connect them. By default, Animus is completely anonymous. If you link your account to Animus Replica, the real-world dilemmas you answer on Animus automatically teach your Replica how you think and make decisions.",
	},
	{
		question: "Who can see and use this data?",
		answer:
			"Everyone. Teachers, researchers, journalists, and everyday people can see genuine public opinion without the distortion of click-driven social media.",
	},
];
