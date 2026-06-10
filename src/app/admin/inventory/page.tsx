import { products } from "@/data/products";
import { formatKRW } from "@/lib/utils";

export default function AdminInventoryPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-background">Inventory</h1>
      <p className="text-sm text-background/70">
        Threshold alerts align with <code className="rounded bg-white/10 px-1">low_stock_threshold</code> in schema.
      </p>
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="border-b border-white/10 text-xs uppercase tracking-widest text-background/60">
            <tr>
              <th className="p-4 font-medium">SKU</th>
              <th className="p-4 font-medium">Product</th>
              <th className="p-4 font-medium">On hand</th>
              <th className="p-4 font-medium">Alert at</th>
              <th className="p-4 font-medium">Retail</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-white/5 last:border-0">
                <td className="p-4 font-mono text-xs">{p.sku}</td>
                <td className="p-4">{p.name}</td>
                <td className="p-4">
                  <span className={p.stock <= p.lowStockThreshold ? "text-amber-200" : ""}>
                    {p.stock}
                  </span>
                </td>
                <td className="p-4 text-background/70">{p.lowStockThreshold}</td>
                <td className="p-4">{formatKRW(p.priceKrw)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
