import { getRevenueSummary, getTopSellingProducts } from "@/lib/services/analytics";
import { isSupabaseConfigured } from "@/lib/env";
import { formatNPR } from "@/lib/utils";

export default async function AdminAnalyticsPage() {
  if (!isSupabaseConfigured()) {
    return (
      <p className="text-sm text-background/70">
        Set NEXT_PUBLIC_SUPABASE_URL and anon key to load analytics.
      </p>
    );
  }

  const [summary, topProducts] = await Promise.all([
    getRevenueSummary(),
    getTopSellingProducts(10),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-background">Sales dashboard</h1>
        <p className="mt-2 text-sm text-background/70">
          Revenue, top products, and order statistics for Nepal commerce.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-background/60">Gross revenue</p>
          <p className="mt-2 font-display text-2xl">
            {formatNPR(summary.grossRevenueKrw)}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-background/60">Paid revenue</p>
          <p className="mt-2 font-display text-2xl">
            {formatNPR(summary.paidRevenueKrw)}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-background/60">Orders</p>
          <p className="mt-2 font-display text-2xl">{summary.orderCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-background/60">AOV</p>
          <p className="mt-2 font-display text-2xl">
            {formatNPR(summary.averageOrderValueKrw)}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="font-display text-xl">Top selling products</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {topProducts.map((product) => (
              <li
                key={product.productId ?? product.name}
                className="flex justify-between gap-4 border-b border-white/5 pb-3 last:border-0"
              >
                <span>{product.name}</span>
                <span className="text-background/70">
                  {product.quantity} sold · {formatNPR(product.revenueKrw)}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="font-display text-xl">Order statistics</h2>
          <div className="mt-4 grid gap-2 text-sm">
            {Object.entries(summary.statusCounts).map(([status, count]) => (
              <div
                key={status}
                className="flex justify-between rounded-lg border border-white/10 px-3 py-2"
              >
                <span className="capitalize text-background/70">{status}</span>
                <span>{count}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
