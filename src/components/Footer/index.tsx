"use client";

import { motion } from "framer-motion";
import SocialLinks from "@/components/SocialLinks";
import { site } from "@/config";
import type { FooterProps } from "@/types";
import { fade, LEGAL_LINKS, SUITE_LINKS } from "./links";

const Footer = (_props: FooterProps) => (
	<footer className="metal-slab-bar w-full transition-colors">
		<div className="mx-auto max-w-6xl px-4 pt-8 pb-5 sm:px-6 md:pt-10 md:pb-6 lg:px-8">
			{/* Ecosystem Suite Links */}
			<motion.div
				{...fade(0)}
				className="mb-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2"
			>
				<span className="text-xs font-mono font-bold tracking-wider uppercase text-white/60 dark:text-black/60">
					Ecosystem Suite:
				</span>
				{SUITE_LINKS.map(({ label, href }) => (
					<a
						key={label}
						href={href}
						target="_blank"
						rel="noopener noreferrer"
						className="text-sm font-bold font-michroma text-white hover:text-white/80 dark:text-black dark:hover:text-black/80 transition-opacity"
					>
						{label} ↗
					</a>
				))}
			</motion.div>

			{/* Social Icons */}
			<motion.div {...fade(0.1)} className="mb-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
				<SocialLinks items={site.social} />
			</motion.div>

			{/* Legal Links */}
			<motion.div {...fade(0.2)} className="flex flex-wrap items-center justify-center gap-6">
				{LEGAL_LINKS.map(({ label, href }) => (
					<a
						key={label}
						href={href}
						className="text-sm font-medium text-white/90 transition-opacity hover:opacity-100 dark:text-black/90 dark:hover:opacity-100"
					>
						{label}
					</a>
				))}
			</motion.div>
		</div>

		{/* Full-width divider & All rights reserved */}
		<div className="w-full border-t border-white/15 dark:border-black/15 bg-black/10 dark:bg-black/5 py-4 md:py-5">
			<div className="mx-auto flex max-w-6xl items-center justify-center px-4 text-center sm:px-6 lg:px-8">
				<p className="text-center text-sm font-medium text-white/90 dark:text-black/90">
					© {new Date().getFullYear()} <span translate="no" className="notranslate">Animus Project LLC</span>. All rights reserved.
				</p>
			</div>
		</div>
	</footer>
);

export default Footer;
