"use client";

import { motion } from "framer-motion";
import SocialLinks from "@/components/SocialLinks";
import { site } from "@/config";
import { fade, LEGAL_LINKS } from "./links";

const navLink = (label: string, href: string) => (
	<a
		key={label}
		href={href}
		className="text-sm text-black dark:text-white transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
	>
		{label}
	</a>
);

const FooterDesktop = () => (
	<div className="hidden md:flex md:items-center md:justify-center md:gap-6">
		<motion.div {...fade(0.1)} className="flex items-center justify-center gap-6">
			{LEGAL_LINKS.map(({ label, href }) => navLink(label, href))}
		</motion.div>

		<motion.div {...fade(0.2)} className="flex items-center justify-center gap-2">
			<SocialLinks items={site.social} />
		</motion.div>
	</div>
);

export default FooterDesktop;
