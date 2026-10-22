import { FiFileText, FiZap, FiRss } from "react-icons/fi";
import type { Feature } from "./types";

export const features: Feature[] = [
    {
        title: "Informasi Lengkap",
        description: "Cek nomor porsi haji, estimasi tahun keberangkatan (Masehi & Hijriah), posisi antrean, kuota, dan status pembayaran dalam satu aplikasi.",
        icon: FiFileText,
    },
    {
        title: "Akses Cepat & Mudah",
        description: "Pantau informasi haji Anda kapan saja dengan antarmuka yang sederhana dan cepat.",
        icon: FiZap,
    },
    {
        title: "Berita Haji Terkurasi",
        description: "Dapatkan update berita haji terkini dari berbagai sumber terpercaya untuk persiapan ibadah Anda.",
        icon: FiRss,
    },
];