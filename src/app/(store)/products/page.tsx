import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ProductFiltersBar } from "@/components/filters/product-filters-bar";
import { ProductGrid } from "@/components/product/product-grid";
import { filterProducts, type SortKey } from "@/lib/products";
import { getSearchSuggestions } from "@/lib/services/recommendations";
import { listCategories, listProducts } from "@/lib/services/catalog";

export const metadata: Metadata = {
  title: "Shop",
  description: "Search, filter, and shop curated Korean beauty at Uvely Glow.",
};

type Search = {
  q?: string;
  category?: string;
  min?: string;
  max?: string;
  sort?: string;
  stock?: string;
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const sp = await searchParams;
  const q = sp.q;
  const category = sp.category;
  const minKrw = sp.min ? Number(sp.min) : undefined;
  const maxKrw = sp.max ? Number(sp.max) : undefined;
  const sort = (sp.sort as SortKey | undefined) ?? "featured";
  const inStockOnly = sp.stock === "1";

  const categories = await listCategories();
  const slugToId = new Map(categories.map((c) => [c.slug, c.id]));
  const base = await listProducts({ q, categorySlug: category, activeOnly: true });
  const list = filterProducts(base, { q, categorySlug: category, minKrw, maxKrw, sort, inStockOnly }, slugToId);
  const suggestions = getSearchSuggestions(base, q ?? "");

  return (
    <Container className="py-12 sm:py-16">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          Korean beauty atelier
        </p>
        <h1 className="mt-3 font-display text-5xl leading-none text-deep sm:text-7xl">
          Shop the glow edit
        </h1>
        <p className="mt-4 text-muted">
          {list.length} {list.length === 1 ? "product" : "products"}
          {q ? ` matching “${q}”` : ""}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <a
              key={suggestion}
              href={`/products?q=${encodeURIComponent(suggestion)}`}
              className="rounded-full border border-line bg-card px-3 py-1 text-xs text-muted transition hover:border-accent hover:text-accent"
            >
              {suggestion}
            </a>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <Suspense fallback={<div className="h-32 animate-pulse rounded-[2rem] bg-accent-soft/50" />}>
          <ProductFiltersBar categories={categories} />
        </Suspense>
      </div>
      <div className="mt-10">
        <ProductGrid items={list} />
      </div>
    </Container>
  );
}
