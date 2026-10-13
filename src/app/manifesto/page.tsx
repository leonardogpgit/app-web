import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import MarkdownLayout from "@/components/Markdown";
import { parseMarkdown } from "@/components/Markdown/parseMarkdown";

export const metadata: Metadata = {
	title: "Manifesto — Brand Foundation & Principles",
	description:
		"The Animus Manifesto: philosophy, architecture, reciprocal participation, and the collective mind of humanity.",
};

export default async function ManifestoPage() {
	const raw = fs.readFileSync(
		path.join(process.cwd(), "src/app/manifesto/manifesto.md"),
		"utf-8",
	);
	const body = raw.replace(/^#[^\n]+\n+\*\*[^\n]+\n+/, "");
	const html = String(await parseMarkdown(body));

	return (
		<main className="px-4 pb-8 pt-8 md:px-6 md:pt-12">
			<div className="mx-auto max-w-375">
				<MarkdownLayout
					htmlContent={html}
					rawContent={body}
					title="Animus — Manifesto & Brand Foundation"
					lastUpdated="October 2026"
				/>
			</div>
		</main>
	);
}
