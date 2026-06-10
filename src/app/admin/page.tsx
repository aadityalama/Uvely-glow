import Link from "next/link";
import {
  getAdminOrderCount,
  getAdminOrderTotalsKrw,
} from "@/lib/services/orders";
import { getRevenueSummary, getTopSellingProducts } from "@/lib/services/analytics";
import { listCategories, listProducts } from "@/lib/services/catalog";
import { formatNPR } from "@/lib/utils";
import { isSupabaseConfigured } from "@/lib/env";

export default async function AdminDashboardPage() {
  const [categories, products] = await Promise.all([
    listCategories(),
    listProducts({ activeOnly: false }),
  ]);

  const totalStock = products.reduce((s, p) => s + p.stock, 0);
  const lowStock = products.filter((p) => p.stock <= p.lowStockThreshold);
  const orderCount = isSupabaseConfigured() ? await getAdminOrderCount() : 0;
  const orderVolumeKrw = isSupabaseConfigured() ? await getAdminOrderTotalsKrw() : 0;
  const [revenue, topProducts] = isSupabaseConfigured()
    ? await Promise.all([getRevenueSummary(), getTopSellingProducts(5)])
    : [null, []];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl text-background sm:text-4xl">Dashboard</h1>
        <p className="mt-2 text-sm text-background/70">
          {isSupabaseConfigured()
            ? "Live metrics from your Supabase catalog and orders."
            : "Demo catalog (set Supabase env vars for live orders and checkout)."}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-background/60">SKUs</p>
          <p className="mt-2 font-display text-3xl">{products.length}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-background/60">Units in stock</p>
          <p className="mt-2 font-display text-3xl">{totalStock}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-background/60">
            {isSupabaseConfigured() ? "Order volume (sum)" : "Orders (demo)"}
          </p>
          <p className="mt-2 font-display text-2xl">
            {isSupabaseConfigured() ? formatNPR(orderVolumeKrw) : "—"}
          </p>
          {isSupabaseConfigured() ? (
            <p className="mt-1 text-xs text-background/50">{orderCount} orders</p>
          ) : null}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-background/60">Paid revenue</p>
          <p className="mt-2 font-display text-2xl">
            {revenue ? formatNPR(revenue.paidRevenueKrw) : "—"}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-background/60">Average order</p>
          <p className="mt-2 font-display text-2xl">
            {revenue ? formatNPR(revenue.averageOrderValueKrw) : "—"}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-background/60">Active orders</p>
          <p className="mt-2 font-display text-2xl">
            {revenue
              ? revenue.statusCounts.pending +
                revenue.statusCounts.paid +
                revenue.statusCounts.processing +
                revenue.statusCounts.shipped
              : 0}
          </p>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="font-display text-xl">Order statistics</h2>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {revenue
              ? Object.entries(revenue.statusCounts).map(([status, count]) => (
                  <div
                    key={status}
                    className="flex justify-between rounded-lg border border-white/10 px-3 py-2"
                  >
                    <span className="capitalize text-background/70">{status}</span>
                    <span>{count}</span>
                  </div>
                ))
              : null}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="font-display text-xl">Top selling products</h2>
          {topProducts.length === 0 ? (
            <p className="mt-4 text-sm text-background/70">No sales data yet.</p>
          ) : (
            <ul className="mt-4 space-y-2 text-sm">
              {topProducts.map((product) => (
                <li
                  key={product.productId ?? product.name}
                  className="flex justify-between gap-4 border-b border-white/5 py-2 last:border-0"
                >
                  <span>{product.name}</span>
                  <span className="text-background/70">
                    {product.quantity} · {formatNPR(product.revenueKrw)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-xl">Low stock</h2>
          <Link
            href="/admin/inventory"
            className="text-xs uppercase tracking-widest text-accent-soft hover:underline"
          >
            Manage
          </Link>
        </div>
        {lowStock.length === 0 ? (
          <p className="mt-4 text-sm text-background/70">All SKUs above threshold.</p>
        ) : (
          <ul className="mt-4 space-y-2 text-sm">
            {lowStock.map((p) => (
              <li
                key={p.id}
                className="flex justify-between gap-4 border-b border-white/5 py-2 last:border-0"
              >
                <span>{p.name}</span>
                <span className="text-accent-soft">{p.stock} left</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="font-display text-xl">Categories</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {categories.map((c) => (
            <li key={c.id}>
              <Link
                href={`/admin/categories#${c.slug}`}
                className="flex justify-between rounded-lg border border-white/10 px-3 py-2 text-sm hover:bg-white/10"
              >
                <span>{c.name}</span>
                <span className="text-background/60">
                  {products.filter((p) => p.categoryId === c.id).length} SKUs
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
