"use client";

import { motion } from "framer-motion";
import { protectBrand } from "@/lib/protectBrand";
import type { FeatureCardProps } from "@/types";

const FeatureCard = ({ feature, index }: FeatureCardProps) => {
	return (
		<motion.div
			key={feature.title}
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.4, delay: index * 0.1 }}
			whileHover={{ y: -4 }}
			className="card-base group relative p-6 transition-shadow duration-300 hover:shadow-lg dark:hover:shadow-white/5 font-michroma"
		>
			<h3 className="mb-2.5 text-base sm:text-lg font-bold text-black dark:text-white">
				{protectBrand(feature.title)}
			</h3>
			<p className="text-xs sm:text-sm leading-relaxed text-black/80 dark:text-white/80">
				{protectBrand(feature.description)}
			</p>
		</motion.div>
	);
};

export default FeatureCard;
