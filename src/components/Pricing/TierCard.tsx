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
		className={`relative flex flex-col rounded-2xl border p-7 transition-shadow duration-300 ${
			tier.highlighted
				? "border-indigo-400/60 bg-white shadow-[0_0_0_1px_rgba(99,102,241,0.15),0_8px_32px_rgba(99,102,241,0.12)] dark:border-indigo-500/50 dark:bg-indigo-500/5 dark:shadow-[0_0_0_1px_rgba(99,102,241,0.2),0_8px_32px_rgba(99,102,241,0.15)]"
				: "border-gray-200 bg-white shadow-sm dark:border-white/8 dark:bg-white/4"
		}`}
	>
		<div className="mb-6">
			<p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-600 dark:text-white/45">
				{tier.name}
			</p>
			<div className="mb-3 flex items-end gap-1">
				<span className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
					{tier.price}
				</span>
				{tier.period && (
					<span className="mb-1 text-sm text-gray-600 dark:text-white/45">
						{tier.period}
					</span>
				)}
			</div>
			<p className="text-sm leading-relaxed text-body">{tier.description}</p>
		</div>

		<ul className="mb-8 flex-1 space-y-3">
			{tier.features.map((feature) => (
				<li key={feature} className="flex items-center gap-3 text-sm">
					<span
						className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
							tier.highlighted
								? "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400"
								: "bg-gray-100 text-gray-600 dark:bg-white/8 dark:text-white/60"
						}`}
					>
						<FiCheck className="h-3 w-3 stroke-[2.5]" />
					</span>
					<span className="text-gray-700 dark:text-white/70">{feature}</span>
				</li>
			))}
		</ul>

		<a
			href={tier.ctaHref}
			className={`w-full rounded-xl px-5 py-3 text-center text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
				tier.highlighted
					? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-500"
					: "border border-gray-800 bg-gray-900 text-white hover:bg-gray-800 dark:border-white/10 dark:bg-white/8 dark:hover:bg-white/14"
			}`}
		>
			{tier.cta}
		</a>
	</motion.div>
);

export default TierCard;
