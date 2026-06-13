"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { demoListRating, deriveBrandName, formatReviewCount } from "@/lib/products/product-display";
import type { Product } from "@/types";
import { cn, formatKRW } from "@/lib/utils";

export function BestsellerCollectionCard({ product }: { product: Product }) {
  const { add } = useCart();
  const { toggle, has } = useWishlist();
  const saved = has(product.id);
  const [busy, setBusy] = useState(false);
  const [flash, setFlash] = useState(false);
  const brand = deriveBrandName(product.name);
  const { value: rating, reviewCount } = demoListRating(product.slug);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-card shadow-[var(--luxury-shadow-sm)] ring-1 ring-black/[0.03] transition duration-300 hover:border-rose-gold/25 hover:shadow-[var(--luxury-shadow)]">
      <div className="relative aspect-[3/4] w-full shrink-0 overflow-hidden bg-zinc-50">
        <Link href={`/products/${product.slug}`} className="absolute inset-0 z-0 block" aria-label={`View ${product.name}`}>
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
            className="object-cover object-center transition duration-500 ease-out group-hover:scale-[1.04]"
          />
        </Link>
        <button
          type="button"
          onClick={() => void toggle(product.id)}
          className={cn(
            "absolute right-3 top-3 z-[2] inline-flex h-10 w-10 items-center justify-center rounded-full border bg-white/95 text-zinc-900 shadow-sm backdrop-blur transition hover:scale-105",
            saved ? "border-accent text-accent" : "border-zinc-200 hover:border-zinc-300",
          )}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill={saved ? "currentColor" : "none"} aria-hidden>
            <path
              d="M12 21s-7-4.35-7-10a4.5 4.5 0 0 1 8-2.82A4.5 4.5 0 0 1 19 11c0 5.65-7 10-7 10Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-2.5 p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">{brand}</p>

        <Link href={`/products/${product.slug}`} className="min-h-0">
          <h2 className="line-clamp-2 min-h-[2.75rem] font-display text-base font-semibold leading-snug tracking-tight text-deep transition group-hover:text-accent sm:min-h-[3rem] sm:text-lg">
            {product.name}
          </h2>
        </Link>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
          <span className="sr-only">
            Rated {rating.toFixed(1)} out of 5 stars, {reviewCount} reviews
          </span>
          <span className="text-champagne" aria-hidden>
            ★★★★★
          </span>
          <span className="font-semibold tabular-nums text-deep">{rating.toFixed(1)}</span>
          <span className="text-zinc-500">({formatReviewCount(reviewCount)} reviews)</span>
        </div>

        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-lg font-semibold tabular-nums tracking-tight text-deep">{formatKRW(product.priceKrw)}</span>
          {product.compareAtKrw ? (
            <span className="text-sm text-zinc-400 line-through">{formatKRW(product.compareAtKrw)}</span>
          ) : null}
        </div>

        <div className="mt-auto border-t border-zinc-100 pt-4">
          <Button
            variant="accent"
            className="h-11 w-full rounded-full text-[12px] font-semibold uppercase tracking-[0.14em]"
            disabled={product.stock <= 0 || busy}
            onClick={async () => {
              setBusy(true);
              try {
                await add(product.id, 1);
                setFlash(true);
                window.setTimeout(() => setFlash(false), 1600);
              } finally {
                setBusy(false);
              }
            }}
          >
            {product.stock <= 0
              ? "Out of stock"
              : flash
                ? "Added to bag"
                : busy
                  ? "Adding…"
                  : "Add to cart"}
          </Button>
        </div>
      </div>
    </article>
  );
}
