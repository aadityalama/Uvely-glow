import type { Metadata } from "next";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Referral Program",
  description:
    "Invite friends to Uvely Glow and earn Korean beauty rewards through the referral program.",
};

export default function ReferralsPage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          Growth engine
        </p>
        <h1 className="mt-3 font-display text-5xl text-deep">Referral program</h1>
        <p className="mt-4 text-muted">
          Phase 4 adds the referrals table, reward coupon links, conversion
          tracking, and a customer-facing referral surface.
        </p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {["Share your code", "Friend shops", "Both earn glow rewards"].map((item, index) => (
          <div key={item} className="rounded-2xl border border-line bg-card p-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              Step {index + 1}
            </span>
            <h2 className="mt-3 font-display text-2xl text-deep">{item}</h2>
            <p className="mt-2 text-sm text-muted">
              Referral attribution is stored for coupon and order conversion reporting.
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}
