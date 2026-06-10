import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { AddToCartSection } from "@/components/product/add-to-cart-section";
import { ProductGrid } from "@/components/product/product-grid";
import { ReviewsPanel } from "@/components/product/reviews-panel";
import {
  RecentlyViewedProducts,
  TrackRecentlyViewed,
} from "@/components/product/recently-viewed";
import { ProductViewAnalytics } from "@/components/product/product-analytics";
import { listApprovedReviews } from "@/lib/services/reviews";
import { getProductBySlug, listProductSlugs } from "@/lib/services/catalog";
import { formatKRW } from "@/lib/utils";
import { listCategories, listProducts } from "@/lib/services/catalog";
import {
  getFrequentlyBoughtTogether,
  getRelatedProducts,
} from "@/lib/services/recommendations";
import { getSessionUser } from "@/lib/supabase/session";
import { env } from "@/lib/env";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await listProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: product.imageUrl, width: 900, height: 1125, alt: product.name }],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product || !product.isActive) notFound();

  const categories = await listCategories();
  const allProducts = await listProducts({ activeOnly: true });
  const category = categories.find((c) => c.id === product.categoryId);
  const reviews = await listApprovedReviews(product.id);
  const user = await getSessionUser();
  const related = getRelatedProducts(product, allProducts);
  const bundle = getFrequentlyBoughtTogether(product, allProducts);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [product.imageUrl, ...product.galleryUrls],
    description: product.description,
    sku: product.sku,
    brand: { "@type": "Brand", name: "Uvely Glow" },
    offers: {
      "@type": "Offer",
      url: `${env.siteUrl}/products/${product.slug}`,
      priceCurrency: "KRW",
      price: product.priceKrw,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };

  return (
    <Container className="py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TrackRecentlyViewed productId={product.id} />
      <ProductViewAnalytics productId={product.id} />
      <nav className="text-xs text-muted">
        <Link href="/products" className="hover:text-accent">
          Shop
        </Link>
        <span className="mx-2">/</span>
        {category ? (
          <Link href={`/categories/${category.slug}`} className="hover:text-accent">
            {category.name}
          </Link>
        ) : (
          <span>Routine</span>
        )}
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="space-y-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-accent-soft/20">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
          {product.galleryUrls.length ? (
            <div className="grid grid-cols-3 gap-3" aria-label="Premium image gallery">
              {product.galleryUrls.map((url) => (
                <div
                  key={url}
                  className="relative aspect-square overflow-hidden rounded-xl border border-line bg-card"
                >
                  <Image src={url} alt="" fill className="object-cover" sizes="120px" />
                </div>
              ))}
            </div>
          ) : null}
          <div className="rounded-2xl border border-line bg-card p-5 text-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Media support
            </p>
            <p className="mt-2 text-muted">
              Phase 4 supports premium product media, video URLs, and
              before/after galleries through the product_media table.
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {category?.name ?? "K-beauty"}
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-deep sm:text-5xl">
            {product.name}
          </h1>
          <div className="mt-4 flex flex-wrap items-baseline gap-3">
            <span className="text-2xl font-semibold">{formatKRW(product.priceKrw)}</span>
            {product.compareAtKrw ? (
              <span className="text-sm text-muted line-through">
                {formatKRW(product.compareAtKrw)}
              </span>
            ) : null}
          </div>
          <p className="mt-6 text-base leading-relaxed text-muted">{product.description}</p>
          <div className="mt-6 rounded-2xl border border-line bg-card p-5 text-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Key ingredients
            </p>
            <p className="mt-2 text-foreground/90">{product.ingredients}</p>
          </div>
          <p className="mt-4 text-sm text-muted">
            SKU <span className="font-mono text-foreground">{product.sku}</span>
            <span className="mx-2">·</span>
            {product.stock > 0 ? (
              <span>{product.stock} in stock</span>
            ) : (
              <span className="text-accent">Out of stock</span>
            )}
          </p>
          <div className="mt-8">
            <AddToCartSection product={product} />
          </div>
        </div>
      </div>

      <ReviewsPanel
        productId={product.id}
        slug={product.slug}
        initialReviews={reviews}
        canReview={Boolean(user)}
      />

      {bundle.length > 1 ? (
        <section className="mt-16 rounded-3xl border border-line bg-card p-6 sm:p-8">
          <h2 className="font-display text-3xl text-deep">
            Frequently bought together
          </h2>
          <p className="mt-2 text-sm text-muted">
            Build a complete K-beauty routine with complementary textures and
            steps.
          </p>
          <div className="mt-6">
            <ProductGrid items={bundle} />
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section className="mt-16">
          <h2 className="font-display text-3xl text-deep">Related products</h2>
          <div className="mt-6">
            <ProductGrid items={related} />
          </div>
        </section>
      ) : null}

      <RecentlyViewedProducts products={allProducts} />
    </Container>
  );
}
