"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Product } from "@/types";
import { cn, formatKRW } from "@/lib/utils";
import { useWishlist } from "@/context/wishlist-context";
import { useCart } from "@/context/cart-context";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { toggle, has } = useWishlist();
  const { add } = useCart();
  const saved = has(product.id);
  const [wishlistPulse, setWishlistPulse] = useState(false);
  const [added, setAdded] = useState(false);
  const badges = getProductBadges(product, index);

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: Math.min(index * 0.04, 0.24) }}
      className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-line bg-card transition duration-500 hover:-translate-y-1 hover:border-deep/20"
    >
      <div className="relative block aspect-[4/5] overflow-hidden bg-accent-soft/30">
        <Link href={`/products/${product.slug}`} className="absolute inset-0 z-0">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1280px) 50vw, 25vw"
            className="object-cover transition duration-1000 ease-out group-hover:scale-[1.06]"
          />
        </Link>
        <div className="absolute inset-x-0 bottom-0 z-[1] h-1/2 bg-gradient-to-t from-deep/45 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
        <div className="pointer-events-none absolute left-4 top-4 z-[1] flex flex-wrap gap-2">
          {badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full bg-background/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-deep backdrop-blur"
            >
              {badge}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            setWishlistPulse(true);
            void toggle(product.id);
            window.setTimeout(() => setWishlistPulse(false), 350);
          }}
          className={cn(
            "absolute right-4 top-4 z-[2] inline-flex h-11 w-11 items-center justify-center rounded-full border bg-background/90 text-foreground backdrop-blur transition duration-300 hover:scale-110",
            saved ? "border-accent text-accent" : "border-line hover:border-deep",
            wishlistPulse ? "scale-110" : "",
          )}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 transition" fill={saved ? "currentColor" : "none"}>
            <path
              d="M12 21s-7-4.35-7-10a4.5 4.5 0 0 1 8-2.82A4.5 4.5 0 0 1 19 11c0 5.65-7 10-7 10Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          disabled={product.stock <= 0}
          onClick={() => {
            add(product.id, 1);
            setAdded(true);
            window.setTimeout(() => setAdded(false), 1400);
          }}
          className="absolute inset-x-4 bottom-4 z-[2] rounded-full bg-background/95 px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-deep opacity-100 backdrop-blur transition duration-500 hover:bg-deep hover:text-background disabled:pointer-events-none disabled:opacity-40 sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
        >
          {added ? "Added to bag" : product.stock > 0 ? "Quick add" : "Sold out"}
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
          Uvely Glow edit
        </p>
        <Link href={`/products/${product.slug}`}>
          <h2 className="font-display text-2xl leading-[1.05] text-deep transition duration-300 group-hover:text-accent sm:text-3xl">
            {product.name}
          </h2>
        </Link>
        <p className="line-clamp-2 text-sm leading-6 text-muted">{product.shortDescription}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <div className="flex flex-col">
            <span className="text-base font-semibold tracking-tight">{formatKRW(product.priceKrw)}</span>
          {product.compareAtKrw ? (
              <span className="text-xs text-muted line-through">
                {formatKRW(product.compareAtKrw)}
              </span>
          ) : null}
          </div>
          <span className="rounded-full border border-line px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-muted">
            {product.stock > product.lowStockThreshold ? "In stock" : "Low stock"}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function getProductBadges(product: Product, index: number) {
  const badges: string[] = [];
  if (product.isFeatured) badges.push("Best Seller");
  if (product.compareAtKrw || index < 2) badges.push("New");
  if (product.stock >= 80 || /snail|centella|sun/i.test(product.name)) badges.push("Viral");
  return badges.slice(0, 2);
}
