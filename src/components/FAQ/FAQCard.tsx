"use client";

import { motion } from "framer-motion";
import { protectBrand } from "@/lib/protectBrand";
import type { FAQCardProps } from "@/types";

const FAQCard = ({ item, index }: FAQCardProps) => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		whileInView={{ opacity: 1, y: 0 }}
		viewport={{ once: true }}
		transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
		className="card-base flex flex-col gap-3 p-6"
	>
		<h3 className="text-base sm:text-lg font-bold text-black dark:text-white text-center font-michroma">
			{protectBrand(item.question)}
		</h3>
		<p className="text-sm sm:text-base leading-relaxed text-black/80 dark:text-white/80 font-sans">
			{protectBrand(item.answer)}
		</p>
	</motion.div>
);

export default FAQCard;
