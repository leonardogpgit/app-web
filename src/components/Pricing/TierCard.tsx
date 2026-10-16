"use client";

import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import type { TierCardProps } from "@/types";

const TierCard = ({ tier, index }: TierCardProps) => (
	<motion.div
		initial={{ opacity: 0, y: 24 }}
		whileInView={{ opacity: 1, y: 0 }}
		viewport={{ once: true }}
		transition={{ duration: 0.4, delay: index * 0.1 }}
		whileHover={{ y: -4 }}
		className="relative flex flex-col rounded-2xl border border-slate-300 bg-[#f4f7fb] shadow-md shadow-slate-900/5 dark:border-white/8 dark:bg-white/4 p-7 transition-shadow duration-300"
	>
		<div className="mb-6">
			<p className="mb-3 text-sm font-semibold uppercase tracking-widest text-black/80 dark:text-white/80 font-michroma">
				{tier.name}
			</p>
			<div className="mb-3 flex items-end gap-1">
				<span className="text-4xl font-black tracking-tight text-black dark:text-white font-michroma">
					{tier.price}
				</span>
				{tier.period && (
					<span className="mb-1 text-sm text-black/80 dark:text-white/80 font-tektur">
						{tier.period}
					</span>
				)}
			</div>
			<p className="text-sm leading-relaxed text-black dark:text-white font-tektur">{tier.description}</p>
		</div>

		<ul className="mb-8 flex-1 space-y-3 font-tektur">
			{tier.features.map((feature) => (
				<li key={feature} className="flex items-center gap-3 text-sm">
					<span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-200 text-black dark:bg-white/10 dark:text-white">
						<FiCheck className="h-3 w-3 stroke-[2.5]" />
					</span>
					<span className="text-black dark:text-white">{feature}</span>
				</li>
			))}
		</ul>

		<a
			href={tier.ctaHref}
			className="w-full rounded-xl px-5 py-3 text-center text-sm font-semibold font-michroma transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] border border-black/10 dark:border-white/10 bg-black dark:bg-white text-white dark:text-black hover:bg-black/85 dark:hover:bg-white/85 shadow-sm"
		>
			{tier.cta}
		</a>
	</motion.div>
);

export default TierCard;
