import type { Metadata } from "next";
import AppHero from "@/components/AppHero";
import Modes from "@/components/Modes";
import Features from "@/components/Features";
import FAQ from "@/components/FAQ";
import {
	faqs,
	features,
	modes,
	site,
} from "@/config";
import { fetchStoreData } from "@/fetchStoreData";

export const metadata: Metadata = {
	title: "Animus",
};

export default async function HomePage() {
	const storeData = await fetchStoreData();

	const app = {
		name: storeData.name ?? site.name,
		description: storeData.description ?? site.description,
		logo: storeData.logo ?? site.logo,
		storeLinks: storeData.storeLinks ?? site.storeLinks,
		rating: storeData.rating ?? site.rating,
		ageRating: storeData.ageRating ?? site.ageRating,
		version: storeData.version ?? site.version,
		minimumOS: storeData.minimumOS ?? site.minimumOS,
		releaseDate: storeData.releaseDate ?? site.releaseDate,
	};

	return (
		<main className="container mx-auto px-3 md:px-6">
			<AppHero
				title={app.name}
				description={app.description}
				logo={app.logo}
				storeLinks={app.storeLinks}
				rating={app.rating}
				ageRating={app.ageRating}
				version={app.version}
				minimumOS={app.minimumOS}
				releaseDate={app.releaseDate}
			/>

			{/* The Two Pillars: Answer to Unlock & Give to Ask */}
			<section id="modes" className="mb-16 scroll-mt-28 md:scroll-mt-20 md:mb-24">
				<Modes items={modes} />
			</section>

			{/* Core Features */}
			<section id="features" className="mb-16 scroll-mt-28 md:scroll-mt-20 md:mb-24">
				<Features items={features.slice(0, 3)} />
			</section>

			{/* Common Questions */}
			<section id="faq" className="mb-16 scroll-mt-28 md:scroll-mt-20 md:mb-24">
				<FAQ items={faqs.slice(0, 6)} />
			</section>
		</main>
	);
}
