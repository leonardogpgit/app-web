export const SUITE_LINKS = [
	{ label: "Animus (Hub)", href: "https://animusproject.org" },
	{ label: "Animus Replica", href: "https://replica.animusproject.org" },
	{ label: "Animus Resonance", href: "https://resonance.animusproject.org" },
];

export const LEGAL_LINKS = [
	{ label: "Manifesto", href: "/manifesto" },
	{ label: "Legal & Privacy", href: "/legal" },
];

export const fade = (delay = 0) => ({
	initial: { opacity: 0, y: 16 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.5, delay },
});
