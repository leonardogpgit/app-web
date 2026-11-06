"use client";

import { motion } from "framer-motion";
import type { AppHeroProps } from "@/types";
import { protectBrand } from "@/lib/protectBrand";
import StoreButtons from "./StoreButtons";

const up = (delay = 0) => ({
	initial: { opacity: 0, y: 28 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.65, delay, ease: [0.22, 0.61, 0.36, 1] as const },
});

const AppHero = ({
	title,
	description,
	storeLinks,
}: AppHeroProps) => (
	<section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 text-center">
		<div className="relative z-10 flex w-full max-w-4xl flex-1 flex-col items-center justify-center py-14 sm:py-20">
			<motion.h1
				{...up(0.1)}
				translate="no"
				className="main-title font-descscor mb-4 text-4xl font-black tracking-tight text-gray-900 sm:mb-6 sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6.5rem] dark:text-white notranslate"
				style={{ fontFamily: "var(--font-descscor)" }}
			>
				{title}
			</motion.h1>

			<motion.p
				{...up(0.15)}
				className="mx-auto mb-7 max-w-xl text-base leading-relaxed text-gray-700 sm:mb-10 sm:text-lg dark:text-white/70"
			>
				{protectBrand(description)}
			</motion.p>

			<motion.div {...up(0.2)} id="download" className="scroll-mt-24">
				<StoreButtons storeLinks={storeLinks} />
			</motion.div>
		</div>
	</section>
);

export default AppHero;
