import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import MarkdownLayout from "@/components/Markdown";
import { parseMarkdown } from "@/components/Markdown/parseMarkdown";

export const metadata: Metadata = {
	title: "Terms of Service — Animus Ecosystem",
	description:
		"Canonical Terms of Service for the Animus Ecosystem: Animus Project, Animus, Animus Remnant, and Animus Resonance.",
};

export default async function TermsPage() {
	const raw = fs.readFileSync(
		path.join(process.cwd(), "src/app/terms/terms.md"),
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
					title="Terms of Service — Animus Ecosystem"
					lastUpdated="November 2026"
				/>
			</div>
		</main>
	);
}
