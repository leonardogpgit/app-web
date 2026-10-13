import type { IconType } from "react-icons";
import {
	FiBarChart2,
	FiBox,
	FiCloud,
	FiEye,
	FiGlobe,
	FiHeart,
	FiLock,
	FiShield,
	FiSliders,
	FiStar,
	FiTrendingUp,
	FiZap,
} from "react-icons/fi";
import {
	RiDiscordFill,
	RiFacebookFill,
	RiGithubFill,
	RiInstagramFill,
	RiLinkedinFill,
	RiRedditFill,
	RiTelegram2Fill,
	RiTiktokFill,
	RiTwitterXFill,
	RiYoutubeFill,
} from "react-icons/ri";

const iconMap: Record<string, IconType> = {
	FiStar,
	FiZap,
	FiBox,
	FiHeart,
	FiTrendingUp,
	FiShield,
	FiCloud,
	FiSliders,
	FiEye,
	FiLock,
	FiBarChart2,
	FiGlobe,
	RiInstagramFill,
	RiTelegram2Fill,
	RiTwitterXFill,
	RiFacebookFill,
	RiLinkedinFill,
	RiYoutubeFill,
	RiGithubFill,
	RiDiscordFill,
	RiRedditFill,
	RiTiktokFill,
};

export const getIcon = (name: string): IconType | null => iconMap[name] ?? null;
