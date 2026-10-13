"use client";

import { motion } from "framer-motion";
import SocialLinks from "@/components/SocialLinks";
import { site } from "@/config";
import { fade, LEGAL_LINKS } from "./links";

const FooterMobile = () => (
	<motion.div {...fade(0)} className="flex flex-col gap-6 md:hidden">
		<div className="flex flex-wrap items-center justify-between gap-4">
			<div className="flex flex-wrap gap-6">
				{LEGAL_LINKS.map(({ label, href }) => (
					<a
						key={label}
						href={href}
						className="text-sm text-black dark:text-white transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
					>
						{label}
					</a>
				))}
			</div>
			<div className="flex gap-2">
				<SocialLinks items={site.social} />
			</div>
		</div>
	</motion.div>
);

export default FooterMobile;
