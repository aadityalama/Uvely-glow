import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { formatKRW } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Affiliate Dashboard",
  description:
    "Affiliate dashboard framework for Korean beauty creators and Uvely Glow partners.",
};

const demo = {
  clicks: 1240,
  conversions: 86,
  revenueKrw: 4280000,
  commissionRate: 10,
};

export default function AffiliatePage() {
  const commission = Math.round((demo.revenueKrw * demo.commissionRate) / 100);

  return (
    <Container className="py-12 sm:py-16">
      <h1 className="font-display text-5xl text-deep">Affiliate dashboard</h1>
      <p className="mt-4 max-w-2xl text-muted">
        Creator commerce dashboard framework for link clicks, attributed orders,
        payout email, conversion revenue, and commission rates.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-4">
        <Metric label="Clicks" value={demo.clicks.toLocaleString()} />
        <Metric label="Conversions" value={demo.conversions.toLocaleString()} />
        <Metric label="Revenue" value={formatKRW(demo.revenueKrw)} />
        <Metric label="Estimated commission" value={formatKRW(commission)} />
      </div>
      <div className="mt-8 rounded-2xl border border-line bg-card p-6">
        <h2 className="font-display text-2xl text-deep">Partner link</h2>
        <p className="mt-3 rounded-xl bg-background p-4 font-mono text-sm">
          https://uvely-glow.example?ref=creator-glow
        </p>
      </div>
    </Container>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-card p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">{label}</p>
      <p className="mt-2 font-display text-2xl text-deep">{value}</p>
    </div>
  );
}
