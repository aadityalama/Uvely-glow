import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { formatKRW } from "@/lib/utils";
import { isSupabaseConfigured } from "@/lib/env";

export default async function AdminProductsPage() {
  if (!isSupabaseConfigured()) {
    return (
      <p className="text-sm text-background/70">
        Set NEXT_PUBLIC_SUPABASE_URL and ANON_KEY to manage products.
      </p>
    );
  }
  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-background">Product management</h1>
          <p className="text-sm text-background/70">
            Create, update, and retire SKUs. Images: use primary URL or upload from edit.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-background px-4 py-2 text-xs font-semibold uppercase tracking-widest text-deep"
        >
          New product
        </Link>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-white/10 text-xs uppercase tracking-widest text-background/60">
            <tr>
              <th className="p-4 font-medium">Product</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium">Stock</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(products ?? []).map((p) => (
              <tr key={p.id} className="border-b border-white/5 last:border-0">
                <td className="p-4">
                  <Link href={`/products/${p.slug}`} className="font-medium hover:underline">
                    {p.name}
                  </Link>
                  <p className="mt-1 font-mono text-xs text-background/50">{p.sku}</p>
                </td>
                <td className="p-4">{formatKRW(p.price_krw)}</td>
                <td className="p-4">{p.stock}</td>
                <td className="p-4">
                  {p.is_active ? (
                    <span className="text-emerald-300">Active</span>
                  ) : (
                    <span className="text-amber-200">Hidden</span>
                  )}
                </td>
                <td className="p-4">
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    className="text-xs uppercase tracking-widest text-accent-soft hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
