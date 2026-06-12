import type { Metadata } from "next";
import { DarkMarketingPageShell } from "@/components/marketing/dark-marketing-page-shell";
import {
  LightGlassCard,
  LightGlassCardMuted,
} from "@/components/marketing/light-glass-card";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the Uvely Glow team for partnerships, press, and support—demo contact channels and response expectations.",
};

export default function ContactPage() {
  return (
    <DarkMarketingPageShell
      eyebrow="We’re here"
      title="Contact Uvely Glow"
      description="Demo storefront—use these channels for integration questions, merchant console feedback, or partnership conversations."
    >
      <LightGlassCard eyebrow="Primary" title="Customer care">
        <p>
          For order issues in a live deployment, you would route tickets through
          your helpdesk. In this demo, reference the support area in the
          storefront navigation for UX patterns.
        </p>
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-[#475569]">
              Email
            </dt>
            <dd className="mt-1">
              <a
                className="text-accent underline-offset-4 hover:underline"
                href="mailto:hello@uvely-glow.example"
              >
                hello@uvely-glow.example
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-[#475569]">
              Hours
            </dt>
            <dd className="mt-1 text-[#334155]">Sun–Thu · 10:00–18:00 NPT</dd>
          </div>
        </dl>
      </LightGlassCard>

      <LightGlassCard eyebrow="Partners" title="Wholesale & creators">
        <p>
          Influencer workflows, affiliate attribution, and referral surfaces are
          scaffolded in the app shell—wire your CRM or partner portal when you go
          live.
        </p>
        <LightGlassCardMuted>
          Include your company name, VAT or PAN where applicable, and expected
          monthly volume when you reach out.
        </LightGlassCardMuted>
      </LightGlassCard>

      <LightGlassCard eyebrow="Visit" title="Studio & returns desk">
        <p className="text-[#334155]">
          Demo address for UI copy only—replace with your registered business
          location before launch.
        </p>
        <address className="not-italic text-[#334155]">
          Thamel Marg · Kathmandu 44600 · Nepal
        </address>
      </LightGlassCard>
    </DarkMarketingPageShell>
  );
}
