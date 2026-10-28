"use client";

import { FaApple, FaGooglePlay } from "react-icons/fa";
import type { StoreButtonsProps } from "@/types";

const StoreButtons = ({ storeLinks }: StoreButtonsProps) => (
	<div className="mb-8 flex w-full flex-col items-center sm:mb-12">
		{/* Coming Soon Pill */}
		<div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-3.5 py-1 text-xs font-semibold font-michroma uppercase tracking-wider text-black/70 dark:border-white/15 dark:bg-white/10 dark:text-white/70">
			<span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
			<span>Coming Soon</span>
		</div>

		{/* Disabled Store Buttons */}
		<div className="flex w-full flex-col items-center justify-center gap-3 xs:w-auto xs:flex-row">
			<div
				aria-disabled="true"
				role="button"
				tabIndex={-1}
				className="flex w-full min-w-[180px] max-w-[240px] cursor-not-allowed select-none items-center justify-center gap-3 rounded-xl bg-gray-900/60 px-6 py-3.5 font-semibold text-white/75 shadow-sm dark:bg-white/15 dark:text-white/70 xs:w-auto"
				title="Coming Soon on App Store"
			>
				<FaApple className="h-5 w-5 shrink-0 opacity-60" />
				<span className="text-left">
					<span className="block text-[10px] font-normal leading-tight opacity-60">
						Coming soon to
					</span>
					<span translate="no" className="block text-sm font-bold leading-tight notranslate">App Store</span>
				</span>
			</div>
			<div
				aria-disabled="true"
				role="button"
				tabIndex={-1}
				className="flex w-full min-w-[180px] max-w-[240px] cursor-not-allowed select-none items-center justify-center gap-3 rounded-xl border border-gray-300/60 bg-gray-100/70 px-6 py-3.5 font-semibold text-gray-600 shadow-sm dark:border-white/10 dark:bg-white/8 dark:text-white/70 xs:w-auto"
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

		{/* For your consideration link */}
		<p className="mt-4 text-center text-xs sm:text-sm text-black/70 dark:text-white/70 font-tektur">
			For your consideration:{" "}
			<a
				href={storeLinks.apk ?? "#"}
				onClick={(e) => {
					if (!storeLinks.apk || storeLinks.apk === "#") {
						e.preventDefault();
					}
				}}
				download={storeLinks.apk && storeLinks.apk !== "#" ? true : undefined}
				className="font-semibold text-black dark:text-white underline underline-offset-4 hover:opacity-80 transition-opacity"
				title="Download APK for consideration"
			>
				Download <span translate="no" className="notranslate">APK</span>
			</a>
		</p>
	</div>
);

export default StoreButtons;
