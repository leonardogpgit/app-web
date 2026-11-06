"use client";

import { motion } from "framer-motion";
import { memo, useState } from "react";
import { protectBrand } from "@/lib/protectBrand";
import type { ModeItem } from "@/types";

interface ModesProps {
	items: ModeItem[];
}

const Modes = ({ items }: ModesProps) => {
	const [activeTab, setActiveTab] = useState<string>(items[0]?.id ?? "answer-to-unlock");

	return (
		<div>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.4 }}
				className="mb-12 flex flex-col items-center text-center"
			>
				<h2 className="section-heading max-w-3xl">
					The Two Pillars of Animus.{" "}
					<span className="accent">Answer to unlock and give to ask.</span>
				</h2>
			</motion.div>

			{/* Mode Cards Grid */}
			<div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
				{items.map((item, index) => {
					const isSelected = activeTab === item.id;

					return (
						<motion.div
							key={item.id}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.4, delay: index * 0.12 }}
							onClick={() => setActiveTab(item.id)}
							className={`card-base group relative flex cursor-pointer flex-col p-7 transition-all duration-300 hover:shadow-xl font-sans ${
								isSelected
									? "border-black dark:border-white shadow-lg ring-1 ring-black/20 dark:ring-white/20"
									: "hover:border-slate-400 dark:hover:border-white/20"
							}`}
						>
							<h3 translate="no" className="text-xl sm:text-2xl font-bold text-black dark:text-white mb-3 notranslate">
								{item.name}
							</h3>
							<p className="text-sm sm:text-base leading-relaxed text-black/80 dark:text-white/80">
								{protectBrand(item.description)}
							</p>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
};

export default memo(Modes);
