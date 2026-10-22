import type { AppLogo, StoreLinks } from "./types";

export const appInfo = {
	title: "Info Haji",
	description:
		"Aplikasi cek nomor porsi, estimasi tahun berangkat, kuota provinsi, dan status pembayaran.",
	logo: {
		type: "image" as AppLogo["type"],
		src: "/infohaji-icon.webp",
	},
	storeLinks: {
		apple: "#",
		google: "https://play.google.com/store/apps/details?id=com.naandalist.info_haji",
	} as StoreLinks,
};
