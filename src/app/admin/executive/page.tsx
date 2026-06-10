import { getEnterpriseDashboard } from "@/lib/services/enterprise";
import { formatKRW } from "@/lib/utils";

export default async function ExecutiveDashboardPage() {
  const dashboard = await getEnterpriseDashboard();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-background">Executive dashboard</h1>
        <p className="mt-2 text-sm text-background/70">
          Revenue forecasting, cohort analytics, customer lifetime value, and enterprise KPIs.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <Metric label="Revenue" value={formatKRW(dashboard.revenueKrw)} />
        <Metric label="Forecast" value={formatKRW(dashboard.forecastRevenueKrw)} />
        <Metric label="CLV" value={formatKRW(dashboard.estimatedClvKrw)} />
        <Metric label="Repeat cohort" value={`${dashboard.cohortRepeatRate}%`} />
      </div>
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
