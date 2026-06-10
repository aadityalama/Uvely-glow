import { getMarketingOpsSnapshot } from "@/lib/services/enterprise";
import { formatKRW } from "@/lib/utils";

export default async function AdminMarketingPage() {
  const marketing = await getMarketingOpsSnapshot();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-background">Marketing operations</h1>
        <p className="mt-2 text-sm text-background/70">
          Influencer dashboard, affiliate commission tracking, and campaign management.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <Metric label="Campaigns" value={String(marketing.activeCampaigns)} />
        <Metric label="Influencers" value={String(marketing.influencerPartners)} />
        <Metric label="Affiliate revenue" value={formatKRW(marketing.affiliateRevenueKrw)} />
        <Metric label="Pending commission" value={formatKRW(marketing.pendingCommissionsKrw)} />
      </div>
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="font-display text-xl">Channels</h2>
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {marketing.channels.map((channel) => (
            <span key={channel} className="rounded-full border border-white/10 px-3 py-1">
              {channel}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-background/60">{label}</p>
      <p className="mt-2 font-display text-2xl">{value}</p>
    </div>
  );
}
