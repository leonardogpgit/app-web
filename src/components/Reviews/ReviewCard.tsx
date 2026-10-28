"use client";

import { motion } from "framer-motion";
import { protectBrand } from "@/lib/protectBrand";
import type { ReviewCardProps } from "@/types";

const ReviewCard = ({ review, index }: ReviewCardProps) => (
	<motion.div
		key={review.author}
		initial={{ opacity: 0, y: 24 }}
		whileInView={{ opacity: 1, y: 0 }}
		viewport={{ once: true }}
		transition={{ duration: 0.4, delay: index * 0.08 }}
		whileHover={{ y: -4 }}
		className="card-base group relative p-6 transition-shadow duration-300 hover:shadow-lg dark:hover:shadow-white/5"
	>
		<p className="mb-5 text-base leading-relaxed text-black dark:text-white font-tektur">{protectBrand(review.text)}</p>
		<div className="flex items-center gap-3">
			<div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-slate-200/80 text-sm font-bold text-black font-michroma dark:border-transparent dark:bg-white/10 dark:text-white">
				{review.author[0]}
			</div>
			<p className="text-sm font-semibold text-black dark:text-white font-michroma">
				{review.author}
			</p>
		</div>
	</motion.div>
);

export default ReviewCard;
