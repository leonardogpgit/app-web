"use client";

import { motion } from "framer-motion";
import type { ReviewCardProps } from "@/types";

const ReviewCard = ({ review, index }: ReviewCardProps) => (
	<motion.div
		key={review.author}
		initial={{ opacity: 0, y: 24 }}
		whileInView={{ opacity: 1, y: 0 }}
		viewport={{ once: true }}
		transition={{ duration: 0.4, delay: index * 0.08 }}
		whileHover={{ y: -4 }}
		className="card-base group relative p-6 transition-shadow duration-300 hover:shadow-lg dark:hover:shadow-indigo-500/5"
	>
		<p className="mb-5 text-base leading-relaxed text-body">{review.text}</p>
		<div className="flex items-center gap-3">
			<div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-slate-200/80 text-sm font-bold text-slate-800 dark:border-transparent dark:bg-white/8 dark:text-white/70">
				{review.author[0]}
			</div>
			<p className="text-sm font-semibold text-gray-900 dark:text-white">
				{review.author}
			</p>
		</div>
	</motion.div>
);

export default ReviewCard;
