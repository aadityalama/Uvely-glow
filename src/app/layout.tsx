import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

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
    locale: "en_US",
    siteName: "Uvely Glow",
    images: [
      {
        url: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Uvely Glow Korean beauty marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Uvely Glow",
    description: "Curated K-beauty with a Seoul glow.",
    images: [
      "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${cormorant.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
