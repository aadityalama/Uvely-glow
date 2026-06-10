import Link from "next/link";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-background">Category management</h1>
      <ul className="space-y-4">
        {categories.map((c) => (
          <li
            key={c.id}
            id={c.slug}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-display text-xl text-background">{c.name}</p>
                <p className="mt-2 max-w-xl text-sm text-background/70">{c.description}</p>
                <p className="mt-2 text-xs font-mono text-background/50">/{c.slug}</p>
              </div>
              <div className="text-right text-sm">
                <p className="text-background/60">Products</p>
                <p className="font-semibold">
                  {products.filter((p) => p.categoryId === c.id).length}
                </p>
                <Link
                  href={`/categories/${c.slug}`}
                  className="mt-2 inline-block text-xs uppercase tracking-widest text-accent-soft hover:underline"
                >
                  View on site
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
