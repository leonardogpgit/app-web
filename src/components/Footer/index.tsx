"use client";

import { motion } from "framer-motion";
import SocialLinks from "@/components/SocialLinks";
import { site } from "@/config";
import type { FooterProps } from "@/types";
import { fade, LEGAL_LINKS } from "./links";

const Footer = (_props: FooterProps) => (
	<footer className="relative px-3 pb-4 pt-6 md:px-6 md:pb-5 md:pt-8">
		<div className="mb-4 h-px bg-slate-300 dark:bg-white/8 md:mb-5" />

		{/* Social Icons (dedicated line above legal) */}
		<motion.div {...fade(0)} className="mb-3 flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:mb-4">
			<SocialLinks items={site.social} />
		</motion.div>

		{/* Legal Links */}
		<motion.div {...fade(0.1)} className="flex items-center justify-center gap-6">
			{LEGAL_LINKS.map(({ label, href }) => (
				<a
					key={label}
					href={href}
					className="text-sm text-black transition-colors hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
				>
					{label}
				</a>
			))}
		</motion.div>

		<div className="mt-4 flex items-center justify-center border-t border-slate-300 pt-4 text-center dark:border-white/10 md:mt-5 md:pt-5">
			<p className="text-center text-sm text-black dark:text-white">
				© {new Date().getFullYear()} Animus Project. All rights reserved.
			</p>
		</div>
	</footer>
);

export default Footer;
