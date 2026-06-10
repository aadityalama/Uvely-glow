import { getMarketplaceSnapshot } from "@/lib/services/enterprise";

export default async function MarketplacePage() {
  const marketplace = await getMarketplaceSnapshot();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-background">Marketplace foundation</h1>
        <p className="mt-2 text-sm text-background/70">
          Multi-brand vendor architecture, onboarding steps, commission setup, and governance.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Metric label="Active vendors" value={String(marketplace.activeVendors)} />
        <Metric label="In onboarding" value={String(marketplace.onboardingVendors)} />
        <Metric label="Avg commission" value={`${marketplace.averageCommissionRate}%`} />
      </div>
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="font-display text-xl">Vendor onboarding framework</h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-4">
          {marketplace.vendorSteps.map((step, index) => (
            <li key={step} className="rounded-xl border border-white/10 p-4 text-sm">
              <span className="text-xs uppercase tracking-widest text-accent-soft">
                Step {index + 1}
              </span>
              <p className="mt-2">{step}</p>
            </li>
          ))}
        </ol>
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
