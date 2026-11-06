"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import { getIcon } from "@/getIcon";
import type { SocialLinksProps } from "@/types";

const SocialLinks = ({ items }: SocialLinksProps) => (
	<>
		{items.map((item, index) => {
			const Icon = getIcon(item.icon);
			return (
				<motion.a
					key={item.label}
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.3, delay: index * 0.03 }}
					whileHover={{ scale: 1.1, rotate: 5 }}
					whileTap={{ scale: 0.95 }}
					href={item.url}
					target="_blank"
					rel="noopener noreferrer"
					className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-slate-300 dark:border-white/10 bg-[#f4f7fb] dark:bg-white/5 text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-white/10 transition-colors shadow-xs"
					aria-label={item.label}
					title={item.label}
				>
					{Icon && <Icon className="h-4 w-4" />}
				</motion.a>
			);
		})}
	</>
);

export default memo(SocialLinks);
