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
		<div className="flex items-center gap-3">
			<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-slate-300 bg-slate-200 text-[11px] font-bold tabular-nums text-black font-michroma dark:border-white/10 dark:bg-white/10 dark:text-white">
				{String(index + 1).padStart(2, "0")}
			</span>
			<h3 className="text-sm font-semibold font-michroma text-black dark:text-white md:text-base">
				{protectBrand(item.question)}
			</h3>
		</div>
		<p className="font-tektur text-black dark:text-white text-sm leading-relaxed md:text-base">
			{protectBrand(item.answer)}
		</p>
	</motion.div>
);

export default FAQCard;
