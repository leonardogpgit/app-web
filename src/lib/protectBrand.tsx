import React from "react";

// Brand names, technologies, and terms that should never be translated by browser auto-translate
const BRAND_NAMES = [
	"Animus Project",
	"Animus Replica",
	"Animus",
	"Replica",
	"Jarvis",
	"Jor-El",
	"Neo4j",
	"Kotlin Multiplatform",
	"Kotlin",
	"APK",
];

const BRAND_REGEX = new RegExp(`\\b(${BRAND_NAMES.join("|")})\\b`, "g");

/**
 * Protects brand names and key terms from browser auto-translate (Google Chrome, Safari, Edge)
 * by wrapping matches with <span translate="no" className="notranslate">.
 */
export function protectBrand(text: string): React.ReactNode {
	if (!text || typeof text !== "string") return text;

	const parts = text.split(BRAND_REGEX);
	if (parts.length <= 1) return text;

	return parts.map((part, index) => {
		if (BRAND_NAMES.includes(part)) {
			return (
				<span key={index} translate="no" className="notranslate">
					{part}
				</span>
			);
		}
		return part;
	});
}
