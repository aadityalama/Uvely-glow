import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { STORE_LOCALE_COOKIE } from "@/lib/i18n/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://uvely-glow.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Uvely Glow · Luxury Korean beauty",
    template: "%s · Uvely Glow",
  },
  description:
    "Premium K-beauty skincare and cosmetics—Seoul-curated rituals, rose-gold textures, and clinically inspired glow.",
  openGraph: {
    title: "Uvely Glow",
    description: "Luxury Korean beauty. Ritual-grade radiance.",
    type: "website",
    locale: "en_US",
    siteName: "Uvely Glow",
    images: [
      {
        url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=85",
        width: 1200,
        height: 630,
        alt: "Uvely Glow luxury Korean beauty",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Uvely Glow",
    description: "Luxury Korean beauty. Ritual-grade radiance.",
    images: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = (await cookies()).get(STORE_LOCALE_COOKIE)?.value;
  const htmlLang = locale === "ko" ? "ko" : "en";
  const htmlClass =
    `${inter.variable} ${playfair.variable}`.trim() + (locale === "ko" ? " locale-ko" : "");

  return (
    <html lang={htmlLang} className={htmlClass}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
