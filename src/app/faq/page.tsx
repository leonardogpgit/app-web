import type { Metadata } from "next";
import FAQ from "@/components/FAQ";
import { faqs } from "@/config";

export const metadata: Metadata = {
	title: "FAQ",
	description: "Frequently asked questions about the Animus Project and mobile application.",
};

export default function FAQPage() {
	return (
		<main className="container mx-auto px-3 py-12 md:px-6 md:py-20">
			<FAQ items={faqs} />
		</main>
	);
}
