import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { listBrands } from "@/lib/services/content";

export const metadata: Metadata = {
  title: "Korean Beauty Brands",
  description:
    "Explore premium Korean beauty brands, brand stories, and curated product collections at Uvely Glow.",
  openGraph: {
    title: "Premium Korean Beauty Brands",
    description: "Brand landing pages for Korea's most loved skincare rituals.",
  },
};

export default async function BrandsPage() {
  const brands = await listBrands();

  return (
    <Container className="py-12 sm:py-16">
      <h1 className="font-display text-5xl text-deep">Brand showcase</h1>
      <p className="mt-4 max-w-2xl text-muted">
        Premium landing pages for Korean skincare brands, with editorial stories
        and matched products.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/brands/${brand.slug}`}
            className="group overflow-hidden rounded-2xl border border-line bg-card"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={brand.heroImageUrl}
                alt={brand.name}
                fill
                className="object-cover transition group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
            <div className="p-5">
              <p className="text-xs uppercase tracking-widest text-accent">
                {brand.tagline}
              </p>
              <h2 className="mt-2 font-display text-3xl text-deep">{brand.name}</h2>
              <p className="mt-2 text-sm text-muted">{brand.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
