"use client";

import { motion } from "framer-motion";
import SocialLinks from "@/components/SocialLinks";
import { site } from "@/config";
import { fade, LEGAL_LINKS, NAV_LINKS } from "./links";

const navLink = (label: string, href: string) => (
	<a
		key={label}
		href={href}
		className="group flex items-center gap-2 text-sm text-black dark:text-white transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
	>
		<span className="h-px w-0 bg-indigo-500 transition-all duration-300 group-hover:w-3" />
		{label}
	</a>
);

const FooterDesktop = () => (
	<div className="hidden md:grid md:grid-cols-[1fr_1fr_auto] md:gap-8 lg:gap-12">
		<motion.div {...fade(0.1)} className="flex flex-col gap-4">
			<nav className="flex flex-col gap-3">
				{NAV_LINKS.map(({ label, href }) => navLink(label, href))}
			</nav>
		</motion.div>

		<motion.div {...fade(0.15)} className="flex flex-col gap-4">
			<nav className="flex flex-col gap-3">
				{LEGAL_LINKS.map(({ label, href }) => navLink(label, href))}
			</nav>
		</motion.div>

		<motion.div {...fade(0.2)} className="flex flex-col items-end gap-4">
			<div className="flex flex-wrap justify-end gap-2">
				<SocialLinks items={site.social} />
			</div>
		</motion.div>
	</div>
);

export default FooterDesktop;
