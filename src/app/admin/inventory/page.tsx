import { adminAdjustInventoryFormAction } from "@/app/actions/admin";
import { listProducts } from "@/lib/services/catalog";
import { formatKRW } from "@/lib/utils";
import { isSupabaseConfigured } from "@/lib/env";

export default async function AdminInventoryPage() {
  if (!isSupabaseConfigured()) {
    return (
      <p className="text-sm text-background/70">
        Set NEXT_PUBLIC_SUPABASE_URL and anon key to adjust inventory.
      </p>
    );
  }

  const products = await listProducts({ activeOnly: false });

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-background">Inventory</h1>
      <p className="text-sm text-background/70">
        Stock changes are logged in <code className="rounded bg-white/10 px-1">inventory_adjustments</code>.
      </p>
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-white/10 text-xs uppercase tracking-widest text-background/60">
            <tr>
              <th className="p-4 font-medium">SKU</th>
              <th className="p-4 font-medium">Product</th>
              <th className="p-4 font-medium">On hand</th>
              <th className="p-4 font-medium">Alert at</th>
              <th className="p-4 font-medium">Retail</th>
              <th className="p-4 font-medium">Adjust</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-white/5 last:border-0">
                <td className="p-4 font-mono text-xs">{p.sku || "—"}</td>
                <td className="p-4">{p.name}</td>
                <td className="p-4">
                  <span className={p.stock <= p.lowStockThreshold ? "text-amber-200" : ""}>
                    {p.stock}
                  </span>
                </td>
                <td className="p-4 text-background/70">{p.lowStockThreshold}</td>
                <td className="p-4">{formatKRW(p.priceKrw)}</td>
                <td className="p-4">
                  <form action={adminAdjustInventoryFormAction} className="flex flex-wrap items-end gap-2">
                    <input type="hidden" name="product_id" value={p.id} />
                    <label className="sr-only" htmlFor={`delta-${p.id}`}>
                      Quantity change
                    </label>
                    <input
                      id={`delta-${p.id}`}
                      name="delta"
                      type="number"
                      placeholder="+/-"
                      required
                      className="w-20 rounded-lg border border-white/10 bg-deep px-2 py-1.5 text-xs text-background"
                    />
                    <input
                      name="reason"
                      type="text"
                      placeholder="Reason"
                      className="min-w-[100px] flex-1 rounded-lg border border-white/10 bg-deep px-2 py-1.5 text-xs text-background"
                    />
                    <button
                      type="submit"
                      className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-widest hover:bg-white/10"
                    >
                      Apply
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
