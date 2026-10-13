"use client";

import { motion } from "framer-motion";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import SocialLinks from "@/components/SocialLinks";
import { site } from "@/config";
import type { FooterProps } from "@/types";
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

const FooterDesktop = ({ name, logo }: FooterProps) => (
	<div className="hidden md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:gap-8 lg:gap-12">
		<motion.div {...fade(0)} className="flex flex-col gap-5">
			<a href="/" className="flex items-center gap-3">
				<img
					src={logo}
					alt={`${name} logo`}
					className="h-10 w-10 rounded-xl border border-gray-200/60 object-cover dark:border-white/10"
				/>
				<span className="text-sm font-bold tracking-tight text-black dark:text-white">
					{name}
				</span>
			</a>
			<div className="flex flex-wrap gap-2">
				<a
					href={site.storeLinks.apple}
					download
					className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white px-4 py-2.5 transition-all duration-200 hover:bg-gray-50 dark:border-white/12 dark:bg-white/6 dark:hover:bg-white/10"
				>
					<FaApple className="h-4 w-4 shrink-0 text-black dark:text-white" />
					<span className="text-left">
						<span className="block text-sm font-bold leading-tight text-black dark:text-white">
							App Store
						</span>
					</span>
				</a>
				<a
					href={site.storeLinks.google}
					download
					className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white px-4 py-2.5 transition-all duration-200 hover:bg-gray-50 dark:border-white/12 dark:bg-white/6 dark:hover:bg-white/10"
				>
					<FaGooglePlay className="h-4 w-4 shrink-0 text-black dark:text-white" />
					<span className="text-left">
						<span className="block text-sm font-bold leading-tight text-black dark:text-white">
							Google Play
						</span>
					</span>
				</a>
			</div>
		</motion.div>

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
