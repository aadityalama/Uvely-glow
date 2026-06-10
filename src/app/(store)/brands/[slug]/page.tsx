import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ProductGrid } from "@/components/product/product-grid";
import {
  getBrand,
  listBrands,
  matchBrandProducts,
} from "@/lib/services/content";
import { listProducts } from "@/lib/services/catalog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const brands = await listBrands();
  return brands.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrand(slug);
  if (!brand) return { title: "Brand" };
  return {
    title: brand.seoTitle,
    description: brand.seoDescription,
    openGraph: {
      title: brand.seoTitle,
      description: brand.seoDescription,
      images: [{ url: brand.heroImageUrl, width: 1200, height: 630, alt: brand.name }],
    },
  };
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params;
  const brand = await getBrand(slug);
  if (!brand) notFound();
  const products = await listProducts({ activeOnly: true });
  const matched = matchBrandProducts(brand, products);

  return (
    <Container className="py-12 sm:py-16">
      <section className="overflow-hidden rounded-3xl border border-line bg-card">
        <div className="relative aspect-[16/7] min-h-72">
          <Image
            src={brand.heroImageUrl}
            alt={brand.name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep/80 via-deep/30 to-transparent" />
          <div className="absolute inset-0 flex items-center p-8 text-background sm:p-12">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.25em]">
                {brand.tagline}
              </p>
              <h1 className="mt-3 font-display text-5xl">{brand.name}</h1>
              <p className="mt-4 text-background/80">{brand.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-3xl text-deep">Matched products</h2>
        {matched.length ? (
          <div className="mt-6">
            <ProductGrid items={matched} />
          </div>
        ) : (
          <p className="mt-4 rounded-2xl border border-line bg-card p-6 text-muted">
            Products can be linked through the Phase 4 brand_id field as the
            catalog is enriched.
          </p>
        )}
      </section>
    </Container>
  );
}
