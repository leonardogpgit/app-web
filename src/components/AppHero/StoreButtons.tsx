"use client";

import { FaApple, FaGooglePlay } from "react-icons/fa";
import type { StoreButtonsProps } from "@/types";

const StoreButtons = ({ storeLinks }: StoreButtonsProps) => (
	<div className="mb-8 flex w-full flex-col items-center gap-3 xs:w-auto xs:flex-row xs:justify-center sm:mb-12">
		<a
			href={storeLinks.apple}
			download
			className="flex w-full min-w-[180px] max-w-[240px] items-center justify-center gap-3 rounded-xl bg-gray-900 px-6 py-3.5 font-semibold text-white shadow-lg shadow-black/25 transition-all duration-200 hover:scale-[1.02] hover:opacity-90 active:scale-[0.98] dark:bg-white dark:text-black xs:w-auto"
		>
			<FaApple className="h-5 w-5 shrink-0" />
			<span className="text-left">
				<span className="block text-[10px] font-normal leading-tight opacity-60">
					Download on the
				</span>
				<span className="block text-sm font-bold leading-tight">App Store</span>
			</span>
		</a>
		<a
			href={storeLinks.google}
			download
			className="flex w-full min-w-[180px] max-w-[240px] items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-6 py-3.5 font-semibold text-gray-900 shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-gray-50 active:scale-[0.98] dark:border-white/15 dark:bg-white/8 dark:text-white dark:hover:bg-white/12 xs:w-auto"
		>
			<FaGooglePlay className="h-5 w-5 shrink-0" />
			<span className="text-left">
				<span className="block text-[10px] font-normal leading-tight text-gray-500 dark:text-white/50">
					Get it on
				</span>
				<span className="block text-sm font-bold leading-tight">
					Google Play
				</span>
			</span>
		</a>
	</div>
);

export default StoreButtons;
