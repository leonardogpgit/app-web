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
					className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-slate-100 text-black shadow-xs transition-colors hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
					aria-label={item.label}
					title={item.label}
				>
					{Icon && (
						<Icon className="h-4 w-4" />
					)}
				</motion.a>
			);
		})}
	</>
);

export default memo(SocialLinks);
