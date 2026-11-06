"use client";

import { motion } from "framer-motion";
import SocialLinks from "@/components/SocialLinks";
import { site } from "@/config";

const fade = (delay = 0) => ({
	initial: { opacity: 0, y: 10 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.4, delay },
});

export const FOOTER_APP_LINKS = [
	{ label: "Animus™", href: "https://animus.animusproject.org" },
	{ label: "Resonance™", href: "https://resonance.animusproject.org" },
	{ label: "Remnant™", href: "https://remnant.animusproject.org" },
];

export default function Footer(_props?: any) {
	return (
		<footer className="metal-slab-bar w-full border-t border-white/10 dark:border-black/10 transition-colors">
			<div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center font-michroma">
				{/* Unified centered links row */}
				<motion.div
					{...fade(0)}
					className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-2 text-xs font-michroma"
				>
					{FOOTER_APP_LINKS.map(({ label, href }) => (
						<span key={label} className="inline-flex items-center gap-x-3 sm:gap-x-4">
							<a
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								className="text-white/90 hover:text-white dark:text-black/90 dark:hover:text-black transition-colors"
							>
								<span translate="no" className="notranslate">
									{label}
								</span>
							</a>
							<span className="text-white/40 dark:text-black/30">·</span>
						</span>
					))}
					<a
						href="/privacy"
						className="text-white/90 hover:text-white dark:text-black/90 dark:hover:text-black underline-offset-4 hover:underline transition-colors"
					>
						Privacy Policy
					</a>
					<span className="text-white/40 dark:text-black/30">·</span>
					<a
						href="/terms"
						className="text-white/90 hover:text-white dark:text-black/90 dark:hover:text-black underline-offset-4 hover:underline transition-colors"
					>
						Terms of Service
					</a>
				</motion.div>

				{/* Centered social links row with Coming Soon */}
				<motion.div
					{...fade(0.05)}
					className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-michroma"
				>
					<span className="text-white/60 dark:text-black/60 uppercase tracking-wider text-xs">
						Coming Soon:
					</span>
					<div className="flex flex-wrap items-center justify-center gap-2">
						<SocialLinks items={site.social} />
					</div>
				</motion.div>

				{/* Centered copyright line */}
				<motion.div
					{...fade(0.1)}
					className="mt-6 pt-5 border-t border-white/10 dark:border-black/10 w-full flex items-center justify-center text-xs font-michroma text-white/90 dark:text-black/90"
				>
					<p className="text-center">
						© {new Date().getFullYear()} <span translate="no" className="notranslate">Animus Project LLC</span>. All rights reserved.
					</p>
				</motion.div>
			</div>
		</footer>
	);
}
