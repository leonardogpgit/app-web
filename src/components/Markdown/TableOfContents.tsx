"use client";

import { memo, useEffect, useState } from "react";

const headingRegex = /^(#{2,3})\s+(.+)$/;

const toId = (text: string) =>
	text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");

const extractHeadings = (content: string) =>
	content
		.split("\n")
		.reduce<{ id: string; text: string; level: number }[]>((acc, line) => {
			const match = line.match(headingRegex);
			if (!match) return acc;
			const level = match[1].length;
			const text = match[2].trim().replace(/\*\*?(.+?)\*\*?/g, "$1");
			acc.push({ id: toId(text), text, level });
			return acc;
		}, []);

const TableOfContents = ({ content }: { content: string }) => {
	const [headings, setHeadings] = useState<
		{ id: string; text: string; level: number }[]
	>([]);
	const [activeId, setActiveId] = useState("");

	useEffect(() => {
		setHeadings(extractHeadings(content));
	}, [content]);

	useEffect(() => {
		if (!headings.length) return;
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries.filter((e) => e.isIntersecting);
				if (!visible.length) return;
				const sorted = visible.sort(
					(a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
				);
				setActiveId(sorted[0].target.id);
			},
			{ rootMargin: "-80px 0px -40%" },
		);
		for (const { id } of headings) {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		}
		return () => observer.disconnect();
	}, [headings]);

	if (!headings.length) return null;

	return (
		<nav className="sticky top-24 hidden xl:block">
			<p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-white/30">
				On This Page
			</p>
			<ul className="space-y-1 border-l-2 border-slate-300 dark:border-white/8">
				{headings.map(({ id, text, level }) => (
					<li key={id}>
						<a
							href={`#${id}`}
							onClick={(e) => {
								e.preventDefault();
								document
									.getElementById(id)
									?.scrollIntoView({ behavior: "smooth" });
							}}
							className={`block border-l-2 -ml-0.5 py-1.5 text-sm transition-all duration-150 ${
								level === 3 ? "pl-6" : "pl-4"
							} ${
								activeId === id
									? "border-black dark:border-white text-black dark:text-white font-semibold"
									: "border-transparent text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:border-gray-300 dark:hover:border-white/20"
							}`}
						>
							{text}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default memo(TableOfContents);
