import type { Metadata } from "next";
import { LuxuryHome } from "@/components/home/luxury/luxury-home";
import { getStoreMessages } from "@/lib/i18n/store-messages";
import { getStoreLocale } from "@/lib/i18n/get-store-locale";
import { listProducts } from "@/lib/services/catalog";

export const metadata: Metadata = {
  title: "Luxury Korean beauty",
  description:
    "Uvely Glow — full-screen editorial K-beauty. Bestsellers, Seoul rituals, and rose-gold textures with authenticated sourcing.",
};

export default async function HomePage() {
  const products = await listProducts({ activeOnly: true });
  const locale = await getStoreLocale();
  const messages = getStoreMessages(locale);

  return <LuxuryHome products={products} messages={messages} />;
}
