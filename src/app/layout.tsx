import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/app-providers";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://uvely-glow.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Uvely Glow · Korean beauty ecommerce",
    template: "%s · Uvely Glow",
  },
  description:
    "Luxury Korean beauty—toners, serums, creams, and SPF with premium textures and mobile-first shopping.",
  openGraph: {
    title: "Uvely Glow",
    description: "Curated K-beauty with a Seoul glow.",
    type: "website",
    locale: "ko_KR",
    siteName: "Uvely Glow",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uvely Glow",
    description: "Curated K-beauty with a Seoul glow.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${dmSans.variable} ${cormorant.variable} antialiased`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
