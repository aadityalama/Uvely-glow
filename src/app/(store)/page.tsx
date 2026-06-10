import Link from "next/link";
import { HeroSection } from "@/components/home/hero-section";
import { Container } from "@/components/layout/container";
import { ProductGrid } from "@/components/product/product-grid";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

export default function HomePage() {
  const featured = products.filter((p) => p.isFeatured).slice(0, 6);

  return (
    <>
      <HeroSection />
      <Container className="py-16 sm:py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-3xl text-deep sm:text-4xl">
              Curated picks
            </h2>
            <p className="mt-2 max-w-xl text-muted">
              Ten hero products to anchor your routine—each chosen for texture,
              transparency, and that quiet luxury finish.
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold uppercase tracking-[0.2em] text-accent underline-offset-4 hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="mt-10">
          <ProductGrid items={featured} />
        </div>
      </Container>

      <section className="border-y border-line bg-card py-16 sm:py-20">
        <Container>
          <h2 className="font-display text-3xl text-deep sm:text-4xl">
            Shop by category
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <Link
                key={c.id}
                href={`/categories/${c.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-line bg-background p-8 transition hover:-translate-y-0.5 hover:shadow-lg"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 font-display text-2xl text-deep group-hover:text-accent">
                  {c.name}
                </p>
                <p className="mt-2 text-sm text-muted">{c.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
