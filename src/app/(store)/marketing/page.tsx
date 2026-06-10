import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { NewsletterCapture } from "@/components/marketing/newsletter-capture";

export const metadata: Metadata = {
  title: "Offers & Newsletter",
  description:
    "Join Uvely Glow marketing campaigns for Korean beauty offers, coupons, newsletters, referrals, and product drops.",
};

export default function MarketingPage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="grid gap-8 lg:grid-cols-[1fr_24rem]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Marketing engine
          </p>
          <h1 className="mt-3 font-display text-5xl text-deep">
            Offers, coupons, and skincare drops
          </h1>
          <p className="mt-4 text-muted">
            Phase 4 supports newsletter capture, popups, discount coupons,
            referral attribution, affiliate partners, and influencer campaigns.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Offer code="GLOW10" label="10% off first routine" />
            <Offer code="FREESHIPNP" label="Free Nepal delivery threshold" />
          </div>
        </div>
        <NewsletterCapture compact />
      </div>
    </Container>
  );
}

function Offer({ code, label }: { code: string; label: string }) {
  return (
    <div className="rounded-2xl border border-line bg-card p-6">
      <p className="font-mono text-sm text-accent">{code}</p>
      <h2 className="mt-2 font-display text-2xl text-deep">{label}</h2>
      <p className="mt-2 text-sm text-muted">
        Coupon rules are stored in Supabase for activation windows, minimum
        order value, usage limits, and campaign reporting.
      </p>
    </div>
  );
}
