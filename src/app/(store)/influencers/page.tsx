import type { Metadata } from "next";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Influencer Partnerships",
  description:
    "Influencer partnership program for K-beauty creators, campaign briefs, and collaboration tracking.",
};

export default function InfluencersPage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          Partnerships
        </p>
        <h1 className="mt-3 font-display text-5xl text-deep">
          Influencer partnership system
        </h1>
        <p className="mt-4 text-muted">
          Manage creator prospects, active campaigns, platforms, audience size,
          notes, and partnership status through the Phase 4 database model.
        </p>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {["Discovery", "Campaign brief", "Performance review"].map((stage) => (
          <div key={stage} className="rounded-2xl border border-line bg-card p-6">
            <h2 className="font-display text-2xl text-deep">{stage}</h2>
            <p className="mt-2 text-sm text-muted">
              Track campaign status, platform, audience size, and notes from
              first contact through completion.
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}
