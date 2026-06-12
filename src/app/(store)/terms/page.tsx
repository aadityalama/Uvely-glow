import type { Metadata } from "next";
import { DarkMarketingPageShell } from "@/components/marketing/dark-marketing-page-shell";
import {
  LightGlassCard,
  LightGlassCardMuted,
  LightGlassCardSubheading,
} from "@/components/marketing/light-glass-card";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Terms of use for the Uvely Glow demo storefront—acceptable use, liability limits, and governing law placeholders.",
};

export default function TermsPage() {
  return (
    <DarkMarketingPageShell
      eyebrow="Agreement"
      title="Terms of service"
      description="Demo legal scaffolding. Replace with jurisdiction-specific counsel review prior to accepting real customers."
    >
      <LightGlassCard eyebrow="Using the site" title="Acceptable use">
        <p>
          You agree not to probe, disrupt, or reverse engineer the demo beyond
          reasonable security research coordinated with the owner. Automated
          scraping that degrades shared infrastructure may be rate-limited.
        </p>
        <LightGlassCardSubheading>Accounts</LightGlassCardSubheading>
        <p>
          You are responsible for safeguarding credentials and for all activity
          under your account. Notify support promptly if you suspect unauthorized
          access.
        </p>
      </LightGlassCard>

      <LightGlassCard eyebrow="Commerce" title="Orders, pricing, taxes">
        <p>
          Prices, inventory, and promotions in this repository are illustrative.
          Checkout integrations (e.g., Khalti, eSewa) should be validated in
          sandbox environments before capturing live funds.
        </p>
        <LightGlassCardMuted>
          Import duties, local VAT, and courier delays are communicated at
          checkout in a full production build.
        </LightGlassCardMuted>
      </LightGlassCard>

      <LightGlassCard eyebrow="Liability" title="Disclaimer of warranties">
        <p>
          The storefront is provided “as is” without warranties of any kind,
          whether express or implied, including merchantability or fitness for a
          particular purpose, to the maximum extent permitted by law.
        </p>
      </LightGlassCard>

      <LightGlassCard eyebrow="Disputes" title="Governing law">
        <p>
          For this demo, specify your operating company’s seat and arbitration or
          court venue in the final legal pack. Until then, treat all clauses as
          non-binding placeholders.
        </p>
      </LightGlassCard>
    </DarkMarketingPageShell>
  );
}
