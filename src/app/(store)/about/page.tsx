import type { Metadata } from "next";
import { DarkMarketingPageShell } from "@/components/marketing/dark-marketing-page-shell";
import {
  LightGlassCard,
  LightGlassCardMuted,
  LightGlassCardSubheading,
} from "@/components/marketing/light-glass-card";

export const metadata: Metadata = {
  title: "About",
  description:
    "How Uvely Glow curates Korean beauty—our story, sourcing standards, and the ritual-first experience we build for Nepal and beyond.",
};

export default function AboutPage() {
  return (
    <DarkMarketingPageShell
      eyebrow="Our story"
      title="Ritual-first Korean beauty"
      description="We obsess over texture, honest formulas, and calm shopping—so your shelf feels as considered as a Seoul vanity."
    >
      <LightGlassCard id="our-story" className="scroll-mt-28" eyebrow="Who we are" title="Curated, never crowded">
        <p>
          Uvely Glow is a demo luxury K-beauty storefront focused on editorial
          presentation, mobile-first checkout, and trustworthy product detail—
          built as a reference implementation for modern ecommerce.
        </p>
        <LightGlassCardSubheading>What guides us</LightGlassCardSubheading>
        <ul className="list-inside list-disc space-y-2">
          <li>Texture you can trust—serums and creams chosen for skin feel.</li>
          <li>Barrier-friendly routines with SPF and seasonal hydration notes.</li>
          <li>Quiet luxury visuals that keep attention on the products.</li>
        </ul>
      </LightGlassCard>

      <LightGlassCard eyebrow="Standards" title="Sourcing & authenticity">
        <p>
          Catalog content blends realistic merchandising fields (ingredients,
          claims, imagery) with demo-safe placeholders. In production, every
          batch line would trace to authorized distributors and COA-friendly
          documentation.
        </p>
        <LightGlassCardMuted>
          This environment is for design and engineering evaluation—not medical
          or dermatological advice.
        </LightGlassCardMuted>
      </LightGlassCard>

      <LightGlassCard eyebrow="Nepal lens" title="Climate-aware routines">
        <p>
          Kathmandu summers call for breathable SPF and watery layers; dry
          seasons reward ceramide-forward creams and gentler exfoliation. Our
          editorial notes aim to translate Seoul-grade formulas into practical
          daily rituals.
        </p>
      </LightGlassCard>
    </DarkMarketingPageShell>
  );
}
