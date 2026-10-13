"use client";

import type { FooterProps } from "@/types";
import FooterDesktop from "./FooterDesktop";
import FooterMobile from "./FooterMobile";

const Footer = ({ name, logo }: FooterProps) => (
	<footer className="relative px-3 pb-8 pt-12 md:px-6 md:pt-16">
		<div className="mb-10 h-px bg-gray-200 dark:bg-white/8" />
		<FooterDesktop name={name} logo={logo} />
		<FooterMobile name={name} logo={logo} />
		<div className="mt-10 flex items-center justify-center border-t border-gray-200 pt-8 text-center dark:border-white/10">
			<p className="text-center text-sm text-black dark:text-white">
				© {new Date().getFullYear()} {name}. All rights reserved.
			</p>
		</div>
	</footer>
);

export default Footer;
