import type { Metadata } from "next";
import { DarkMarketingPageShell } from "@/components/marketing/dark-marketing-page-shell";
import {
  LightGlassCard,
  LightGlassCardMuted,
  LightGlassCardSubheading,
} from "@/components/marketing/light-glass-card";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Privacy overview for the Uvely Glow demo—data categories, usage, cookies, and retention at a high level.",
};

export default function PrivacyPage() {
  return (
    <DarkMarketingPageShell
      eyebrow="Transparency"
      title="Privacy policy"
      description="High-level summary for this demo storefront. Replace with counsel-reviewed legal text before production."
    >
      <LightGlassCard eyebrow="Overview" title="What this site processes">
        <p>
          Authentication, cart persistence, wishlists, and optional newsletter
          capture may rely on Supabase and similar services when configured. No
          financial PAN or full card data should ever be stored in demo tables.
        </p>
        <LightGlassCardSubheading>Identifiers</LightGlassCardSubheading>
        <p>
          Email addresses and opaque user IDs are the primary stable identifiers
          in authenticated flows. Guest carts can use signed cookies or
          anonymous session keys depending on deployment.
        </p>
      </LightGlassCard>

      <LightGlassCard eyebrow="Use" title="How we use information">
        <ul className="list-inside list-disc space-y-2">
          <li>Fulfillment, fraud checks, and customer support threading.</li>
          <li>Product recommendations and A/B tests when analytics is enabled.</li>
          <li>Compliance with tax, export, and accounting obligations.</li>
        </ul>
      </LightGlassCard>

      <LightGlassCard eyebrow="Cookies" title="Cookies & similar tech">
        <p>
          Session cookies keep you signed in; preference cookies remember
          locale or currency when you add localization. Marketing pixels remain
          off until you explicitly integrate them.
        </p>
        <LightGlassCardMuted>
          Last updated {new Date().getFullYear()} · demo placeholder policy.
        </LightGlassCardMuted>
      </LightGlassCard>

      <LightGlassCard eyebrow="Your choices" title="Access & deletion">
        <p>
          Production deployments should expose self-service profile export,
          marketing opt-down, and account deletion where regulations require it.
          Wire these flows to your auth provider’s APIs.
        </p>
      </LightGlassCard>
    </DarkMarketingPageShell>
  );
}
