"use client";

import { motion } from "framer-motion";
import SocialLinks from "@/components/SocialLinks";
import { site } from "@/config";
import { fade, LEGAL_LINKS } from "./links";

const FooterMobile = () => (
	<motion.div {...fade(0)} className="flex flex-col items-center gap-6 md:hidden">
		<div className="flex flex-wrap items-center justify-center gap-6">
			<div className="flex flex-wrap items-center justify-center gap-6">
				{LEGAL_LINKS.map(({ label, href }) => (
					<a
						key={label}
						href={href}
						className="text-sm text-black dark:text-white font-michroma transition-opacity hover:opacity-75"
					>
						{label}
					</a>
				))}
			</div>
			<div className="flex items-center justify-center gap-2">
				<SocialLinks items={site.social} />
			</div>
		</div>
	</motion.div>
);

export default FooterMobile;
