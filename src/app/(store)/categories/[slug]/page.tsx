import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ProductGrid } from "@/components/product/product-grid";
import { getCategoryBySlug } from "@/lib/services/catalog";
import { listProducts } from "@/lib/services/catalog";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = await getCategoryBySlug(slug);
  if (!cat) return { title: "Category" };
  return {
    title: cat.name,
    description: cat.description,
    openGraph: { title: `${cat.name} · Uvely Glow` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = await getCategoryBySlug(slug);
  if (!cat) notFound();
  const items = await listProducts({ categorySlug: cat.slug, activeOnly: true });

  return (
    <Container className="py-12 sm:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
        Category
      </p>
      <h1 className="mt-2 font-display text-4xl text-deep sm:text-5xl">{cat.name}</h1>
      <p className="mt-4 max-w-2xl text-muted">{cat.description}</p>
      <div className="mt-10">
        <ProductGrid items={items} />
      </div>
      <p className="mt-12 text-center text-sm text-muted">
        <Link href="/categories" className="text-accent underline-offset-4 hover:underline">
          All categories
        </Link>
      </p>
    </Container>
  );
}
