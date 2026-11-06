"use client";

import { FaApple, FaGooglePlay } from "react-icons/fa";
import type { StoreButtonsProps } from "@/types";

const StoreButtons = ({ storeLinks }: StoreButtonsProps) => (
	<div className="flex w-full flex-col items-center">
		{/* Coming Soon Indicator */}
		<p className="mb-4 font-michroma text-xs font-semibold uppercase tracking-widest text-black/60 dark:text-white/60">
			Coming Soon....
		</p>

		{/* Disabled Store Buttons */}
		<div className="flex w-full flex-col items-center justify-center gap-3 xs:w-auto xs:flex-row">
			<div
				aria-disabled="true"
				role="button"
				tabIndex={-1}
				className="flex w-full min-w-[190px] max-w-[240px] cursor-not-allowed select-none items-center justify-center gap-3 rounded-xl bg-gray-900/60 px-6 py-3.5 font-semibold text-white/75 shadow-sm dark:bg-white/15 dark:text-white/70 xs:w-auto"
				title="Coming Soon on App Store"
			>
				<FaApple className="h-5 w-5 shrink-0 opacity-60" />
				<span className="text-left">
					<span className="block text-[10px] font-normal leading-tight opacity-60">
						Coming soon to
					</span>
					<span translate="no" className="block text-sm font-bold leading-tight notranslate">
						App Store
					</span>
				</span>
			</div>

			<div
				aria-disabled="true"
				role="button"
				tabIndex={-1}
				className="flex w-full min-w-[190px] max-w-[240px] cursor-not-allowed select-none items-center justify-center gap-3 rounded-xl border border-gray-300/60 bg-gray-100/70 px-6 py-3.5 font-semibold text-gray-600 shadow-sm dark:border-white/10 dark:bg-white/8 dark:text-white/70 xs:w-auto"
				title="Coming Soon on Google Play"
			>
				<FaGooglePlay className="h-5 w-5 shrink-0 opacity-60" />
				<span className="text-left">
					<span className="block text-[10px] font-normal leading-tight text-gray-500 dark:text-white/50">
						Coming soon to
					</span>
					<span translate="no" className="block text-sm font-bold leading-tight notranslate">
						Google Play
					</span>
				</span>
			</div>
		</div>

		{/* Platforms Available */}
		<p className="mt-5 text-center text-xs font-michroma text-black/60 dark:text-white/60">
			Available for <span className="font-semibold text-black dark:text-white">Android · iOS · macOS · Windows · Linux</span>
		</p>
	</div>
);

export default StoreButtons;
