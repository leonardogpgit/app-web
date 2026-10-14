"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiChevronUp } from "react-icons/fi";

const BackToTop = () => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const onScroll = () => {
			setVisible(window.scrollY > 300);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<AnimatePresence>
			{visible && (
				<motion.button
					type="button"
					initial={{ opacity: 0, scale: 0.85 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.85 }}
					transition={{ duration: 0.2 }}
					whileHover={{ scale: 1.06 }}
					whileTap={{ scale: 0.95 }}
					onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
					className="fixed bottom-5 right-5 z-40 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-[#f4f7fb]/95 text-black shadow-lg backdrop-blur-md transition-colors duration-200 hover:border-black dark:border-slate-700 dark:bg-slate-900/90 dark:text-white dark:hover:border-white md:bottom-8 md:right-8 md:h-11 md:w-11"
					aria-label="Back to top"
				>
					<FiChevronUp size={20} />
				</motion.button>
			)}
		</AnimatePresence>
	);
};

export default BackToTop;
