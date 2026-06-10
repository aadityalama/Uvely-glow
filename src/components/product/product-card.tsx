"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/types";
import { cn, formatKRW } from "@/lib/utils";
import { useWishlist } from "@/context/wishlist-context";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { toggle, has } = useWishlist();
  const saved = has(product.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.35) }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative block aspect-[4/5] overflow-hidden bg-accent-soft/30">
        <Link href={`/products/${product.slug}`} className="absolute inset-0 z-0">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        </Link>
        {product.compareAtKrw ? (
          <span className="pointer-events-none absolute left-3 top-3 z-[1] rounded-full bg-deep/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-background">
            Sale
          </span>
        ) : null}
        <button
          type="button"
          onClick={() => void toggle(product.id)}
          className={cn(
            "absolute right-3 top-3 z-[2] inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background/90 text-foreground backdrop-blur transition hover:scale-105",
            saved ? "border-accent text-accent" : "border-line",
          )}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill={saved ? "currentColor" : "none"}>
            <path
              d="M12 21s-7-4.35-7-10a4.5 4.5 0 0 1 8-2.82A4.5 4.5 0 0 1 19 11c0 5.65-7 10-7 10Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        <Link href={`/products/${product.slug}`}>
          <h2 className="font-display text-lg leading-snug text-deep transition group-hover:text-accent sm:text-xl">
            {product.name}
          </h2>
        </Link>
        <p className="line-clamp-2 text-sm text-muted">{product.shortDescription}</p>
        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <span className="text-sm font-semibold">{formatKRW(product.priceKrw)}</span>
          {product.compareAtKrw ? (
            <span className="text-xs text-muted line-through">
              {formatKRW(product.compareAtKrw)}
            </span>
          ) : null}
        </div>
        {product.stock <= product.lowStockThreshold ? (
          <p className="text-xs font-medium text-accent">Low stock</p>
        ) : null}
      </div>
    </motion.article>
  );
}
