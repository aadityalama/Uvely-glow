import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ProductGrid } from "@/components/product/product-grid";
import { listCategories, listProducts } from "@/lib/services/catalog";

export const metadata: Metadata = {
  title: "Bestsellers",
  description: "Shop the most-loved Korean beauty bestsellers at Uvely Glow, curated for Nepal.",
};

export default async function BestsellersPage() {
  const [products, categories] = await Promise.all([
    listProducts({ activeOnly: true }),
    listCategories(),
  ]);
  const featured = products.filter((p) => p.isFeatured);
  const list =
    featured.length > 0 ? featured : [...products].sort((a, b) => b.stock - a.stock);

  return (
    <Container className="py-12 sm:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Uvely Glow</p>
      <h1 className="mt-3 font-display text-5xl leading-none text-deep sm:text-7xl">Bestsellers</h1>
      <p className="mt-4 max-w-2xl text-muted">
        The formulas our clients repurchase most—authenticated K-beauty, edited for Kathmandu
        routines.
      </p>
      <div className="mt-10">
        <ProductGrid items={list} />
      </div>
      <p className="mt-10 text-sm text-muted">
        Browse all categories:{" "}
        {categories.map((c, i) => (
          <span key={c.id}>
            {i > 0 ? " · " : null}
            <Link className="text-accent underline-offset-4 hover:underline" href={`/categories/${c.slug}`}>
              {c.name}
            </Link>
          </span>
        ))}
      </p>
    </Container>
  );
}
