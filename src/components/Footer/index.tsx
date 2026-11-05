"use client";

import { motion } from "framer-motion";
import SocialLinks from "@/components/SocialLinks";
import { site } from "@/config";
import type { FooterProps } from "@/types";
import { fade, SUITE_LINKS } from "./links";

const Footer = (_props?: FooterProps) => (
	<footer className="metal-slab-bar w-full border-t border-white/10 dark:border-black/10 transition-colors">
		<div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
			{/* Ecosystem Suite Links */}
			<motion.div
				{...fade(0)}
				className="mb-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-michroma"
			>
				<span className="text-[11px] font-mono uppercase tracking-wider text-white/60 dark:text-black/60">
					Ecosystem Suite:
				</span>
				{SUITE_LINKS.map(({ label, href }) => (
					<a
						key={label}
						href={href}
						target="_blank"
						rel="noopener noreferrer"
						className="font-bold text-white hover:text-white/80 dark:text-black dark:hover:text-black/80 transition-opacity"
					>
						{label} ↗
					</a>
				))}
			</motion.div>

			{/* Social Icons */}
			<motion.div {...fade(0.05)} className="mb-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
				<SocialLinks items={site.social} />
			</motion.div>

			{/* Single-line institutional legal footer */}
			<motion.div
				{...fade(0.1)}
				className="pt-4 border-t border-white/10 dark:border-black/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-tektur"
			>
				<div className="flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1 text-center md:text-left text-white/80 dark:text-black/80">
					<span>© {new Date().getFullYear()} <span translate="no" className="notranslate font-semibold">Animus Project LLC</span>. All rights reserved.</span>
					<span className="hidden sm:inline text-white/40 dark:text-black/40">|</span>
					<span className="text-[11px] text-white/60 dark:text-black/60 font-mono">
						<span translate="no" className="notranslate">ANIMUS™</span>, <span translate="no" className="notranslate">RESONANCE™</span>, <span translate="no" className="notranslate">REMNANT™</span>, <span translate="no" className="notranslate">REPLICA™</span>
					</span>
				</div>

				<div className="flex items-center gap-4 font-michroma text-xs shrink-0">
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
				</div>
			</motion.div>
		</div>
	</footer>
);

export default Footer;
