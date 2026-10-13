import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import MarkdownLayout from "@/components/Markdown";
import { parseMarkdown } from "@/components/Markdown/parseMarkdown";

export const metadata: Metadata = {
	title: "Legal — Privacy Policy & Terms of Service",
	description:
		"Privacy Policy and Terms of Service for the Animus Project and mobile application.",
};

export default async function LegalPage() {
	const raw = fs.readFileSync(
		path.join(process.cwd(), "src/app/legal/legal.md"),
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
					title="Legal — Privacy Policy & Terms"
					lastUpdated="October 2026"
				/>
			</div>
		</main>
	);
}
