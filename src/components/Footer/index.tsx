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
		<footer className="w-full border-t border-slate-300/80 bg-[#e6ecf2] dark:border-white/10 dark:bg-[#09090b] transition-colors">
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
								className="text-black/75 hover:text-black dark:text-white/75 dark:hover:text-white transition-colors"
							>
								<span translate="no" className="notranslate">
									{label}
								</span>
							</a>
							<span className="text-black/30 dark:text-white/30">·</span>
						</span>
					))}
					<a
						href="/privacy"
						className="text-black/75 hover:text-black dark:text-white/75 dark:hover:text-white transition-colors"
					>
						Privacy Policy
					</a>
					<span className="text-black/30 dark:text-white/30">·</span>
					<a
						href="/terms"
						className="text-black/75 hover:text-black dark:text-white/75 dark:hover:text-white transition-colors"
					>
						Terms of Service
					</a>
				</motion.div>

				{/* Centered social links row with Coming Soon */}
				<motion.div
					{...fade(0.05)}
					className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-michroma"
				>
					<span className="text-black/60 dark:text-white/60 uppercase tracking-wider text-xs">
						Coming Soon:
					</span>
					<div className="flex flex-wrap items-center justify-center gap-2">
						<SocialLinks items={site.social} />
					</div>
				</motion.div>

				{/* Centered copyright line */}
				<motion.div
					{...fade(0.1)}
					className="mt-6 pt-5 border-t border-slate-300/60 dark:border-white/10 w-full flex items-center justify-center text-xs font-michroma text-black/60 dark:text-white/60"
				>
					<p className="text-center">
						© {new Date().getFullYear()} <span translate="no" className="notranslate">Animus Project LLC</span>. All rights reserved.
					</p>
				</motion.div>
			</div>
		</footer>
	);
}
