export const LEGAL_LINKS = [
	{ label: "Manifesto", href: "/manifesto" },
	{ label: "Legal", href: "/legal" },
];

export const fade = (delay = 0) => ({
	initial: { opacity: 0, y: 16 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.5, delay },
});
