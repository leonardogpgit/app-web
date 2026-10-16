import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { site } from "@/config";
import "./globals.css";

const tektur = localFont({
	src: "./fonts/Tektur-VariableFont_wdth,wght.ttf",
	variable: "--font-tektur",
	display: "swap",
});

const michroma = localFont({
	src: "./fonts/Michroma-Regular.ttf",
	variable: "--font-michroma",
	display: "swap",
});

const orbitron = localFont({
	src: "./fonts/Orbitron-VariableFont_wght.ttf",
	variable: "--font-orbitron",
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL(site.url),
	title: {
		default: site.name,
		template: `%s — ${site.name}`,
	},
	description: site.description,
	keywords: [...site.keywords],
	alternates: {
		canonical: "/",
	},
	openGraph: {
		type: "website",
		url: site.url,
		siteName: site.name,
		title: site.name,
		description: site.description,
		images: [{ url: "/og.png", width: 1200, height: 630 }],
	},
	twitter: {
		card: "summary_large_image",
		title: site.name,
		description: site.description,
		images: ["/og.png"],
	},
	icons: {
		icon: { url: "/favicon.svg", type: "image/svg+xml" },
		apple: "/favicon.svg",
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#e6ecf2" },
		{ media: "(prefers-color-scheme: dark)", color: "#060606" },
	],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${tektur.variable} ${michroma.variable} ${orbitron.variable} flex min-h-screen flex-col bg-[#e6ecf2] text-black transition-colors duration-300 dark:bg-[#09090b] dark:text-white`}
			>
				<Header />
				<main className="mx-auto w-full max-w-375 flex-grow">
					{children}
				</main>
				<Footer name={site.name} logo={site.logo} />
				<BackToTop />
			</body>
		</html>
	);
}
