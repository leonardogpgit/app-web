"use client";

import { motion } from "framer-motion";
import { getIcon } from "@/getIcon";
import type { FeatureCardProps } from "@/types";

const FeatureCard = ({ feature, index }: FeatureCardProps) => {
	const Icon = getIcon(feature.icon);
	return (
		<motion.div
			key={feature.title}
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.4, delay: index * 0.1 }}
			whileHover={{ y: -4 }}
			className="card-base group relative p-6 transition-shadow duration-300 hover:shadow-lg dark:hover:shadow-white/5"
		>
			<div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-300 bg-slate-200 dark:border-white/10 dark:bg-white/10">
				{Icon && (
					<Icon className="h-6 w-6 text-black dark:text-white" />
				)}
			</div>
			<h3 className="mb-2.5 text-lg font-bold font-michroma text-black dark:text-white">
				{feature.title}
			</h3>
			<p className="text-base leading-relaxed font-tektur text-black dark:text-white">
				{feature.description}
			</p>
		</motion.div>
	);
};

export default FeatureCard;
