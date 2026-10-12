export const NAV_LINKS = [
	{ label: "Features", href: "#features" },
	{ label: "Screenshots", href: "#screenshots" },
	{ label: "How It Works", href: "#pricing" },
	{ label: "Voices", href: "#reviews" },
	{ label: "FAQ", href: "#faq" },
];

export const LEGAL_LINKS = [
	{ label: "Privacy Policy", href: "/privacy-policy" },
	{ label: "Terms of Service", href: "/terms-of-service" },
	{ label: "The Project", href: "https://animusproject.org" },
];

export const fade = (delay = 0) => ({
	initial: { opacity: 0, y: 16 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.5, delay },
});
