import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ProductFiltersBar } from "@/components/filters/product-filters-bar";
import { ProductGrid } from "@/components/product/product-grid";
import { categories } from "@/data/categories";
import { filterProducts, type SortKey } from "@/lib/products";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Search, filter, and shop curated Korean beauty at Uvely Glow.",
};

const slugToId = new Map(categories.map((c) => [c.slug, c.id]));

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

  const list = filterProducts(products, { q, categorySlug: category, minKrw, maxKrw, sort, inStockOnly }, slugToId);

  return (
    <Container className="py-12 sm:py-16">
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl text-deep sm:text-5xl">Shop</h1>
        <p className="mt-4 text-muted">
          {list.length} {list.length === 1 ? "product" : "products"}
          {q ? ` matching “${q}”` : ""}
        </p>
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,17rem)_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Suspense fallback={<div className="h-40 animate-pulse rounded-2xl bg-accent-soft/40" />}>
            <ProductFiltersBar />
          </Suspense>
        </aside>
        <div>
          <ProductGrid items={list} />
        </div>
      </div>
    </Container>
  );
}
