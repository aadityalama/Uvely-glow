import Link from "next/link";
import type { Metadata } from "next";
import { listBrands } from "@/lib/services/content";

export const metadata: Metadata = {
  title: "Brands",
  robots: { index: false, follow: false },
};

export default async function AdminBrandsPage() {
  const brands = await listBrands();

  return (
    <div>
      <h1 className="font-display text-3xl text-background">Brands</h1>
      <p className="mt-2 max-w-2xl text-sm text-background/70">
        Storefront brand profiles and linked merchandising. Edit brand content in your CMS or
        extend this table with Supabase-backed brand records.
      </p>
      <ul className="mt-8 divide-y divide-white/10 rounded-xl border border-white/10">
        {brands.map((b) => (
          <li key={b.slug} className="flex flex-wrap items-center justify-between gap-3 px-4 py-4">
            <div>
              <p className="font-medium text-background">{b.name}</p>
              <p className="text-sm text-background/60">{b.tagline}</p>
            </div>
            <Link
              href={`/brands/${b.slug}`}
              className="text-xs font-semibold uppercase tracking-[0.18em] text-champagne hover:underline"
            >
              View storefront
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
