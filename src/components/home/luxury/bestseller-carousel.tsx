"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef } from "react";
import type { Product } from "@/types";
import { cn, formatKRW } from "@/lib/utils";

export function BestsellerCarousel({ products }: { products: Product[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = useCallback((dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.85) * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  }, []);

  if (!products.length) return null;

  return (
    <section className="border-y border-line/80 bg-card py-16 sm:py-24">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-rose-gold sm:text-xs">
              Bestsellers
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-deep sm:text-4xl md:text-5xl">
              The icons everyone restocks.
            </h2>
          </div>
          <div className="flex gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-background text-deep transition hover:border-rose-gold/40 hover:text-rose-gold"
              aria-label="Scroll bestsellers left"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-background text-deep transition hover:border-rose-gold/40 hover:text-rose-gold"
              aria-label="Scroll bestsellers right"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="scrollbar-hide mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:gap-6"
        >
          {products.map((p, i) => (
            <article
              key={p.id}
              className={cn(
                "relative w-[min(100%,20rem)] shrink-0 snap-start overflow-hidden rounded-2xl border border-line/90 bg-ivory sm:w-[22rem] sm:rounded-3xl",
                i === 0 && "sm:ml-0",
              )}
            >
              <Link href={`/products/${p.slug}`} className="block">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={p.imageUrl}
                    alt={p.name}
                    fill
                    sizes="320px"
                    className="object-cover"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-deep/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-champagne backdrop-blur">
                    Bestseller
                  </div>
                </div>
                <div className="space-y-2 p-5 sm:p-6">
                  <h3 className="font-display text-xl leading-snug text-deep sm:text-2xl">
                    {p.name}
                  </h3>
                  <p className="line-clamp-2 text-sm text-muted">{p.shortDescription}</p>
                  <div className="flex items-baseline justify-between pt-2">
                    <span className="text-sm font-semibold tracking-tight">
                      {formatKRW(p.priceKrw)}
                    </span>
                    {p.compareAtKrw ? (
                      <span className="text-xs text-muted line-through">
                        {formatKRW(p.compareAtKrw)}
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-rose-gold">
                        In stock
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
