import Link from "next/link";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { formatKRW } from "@/lib/utils";

export default function AdminProductsPage() {
  const catName = (id: string) => categories.find((c) => c.id === id)?.name ?? "—";

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-background">Product management</h1>
      <p className="text-sm text-background/70">
        Read-only view of seeded catalog. Connect Supabase for CRUD.
      </p>
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-white/10 text-xs uppercase tracking-widest text-background/60">
            <tr>
              <th className="p-4 font-medium">Product</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium">Stock</th>
              <th className="p-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-white/5 last:border-0">
                <td className="p-4">
                  <Link href={`/products/${p.slug}`} className="font-medium hover:underline">
                    {p.name}
                  </Link>
                  <p className="mt-1 font-mono text-xs text-background/50">{p.sku}</p>
                </td>
                <td className="p-4 text-background/80">{catName(p.categoryId)}</td>
                <td className="p-4">{formatKRW(p.priceKrw)}</td>
                <td className="p-4">{p.stock}</td>
                <td className="p-4">
                  {p.isActive ? (
                    <span className="text-emerald-300">Active</span>
                  ) : (
                    <span className="text-amber-200">Hidden</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
