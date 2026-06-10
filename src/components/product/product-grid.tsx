"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@/types";
import { ProductCard } from "@/components/product/product-card";

const PAGE_SIZE = 8;

export function ProductGrid({ items }: { items: Product[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const visibleItems = useMemo(
    () => items.slice(0, visibleCount),
    [items, visibleCount],
  );
  const hasMore = visibleCount < items.length;

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [items]);

  useEffect(() => {
    if (!hasMore) return;
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisibleCount((current) => Math.min(current + PAGE_SIZE, items.length));
        }
      },
      { rootMargin: "600px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, items.length]);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {visibleItems.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
        {hasMore
          ? Array.from({ length: Math.min(4, items.length - visibleItems.length) }).map(
              (_, index) => <ProductCardSkeleton key={`skeleton-${index}`} />,
            )
          : null}
      </div>
      <div ref={sentinelRef} className="h-10" aria-hidden />
      {hasMore ? (
        <div className="mt-4 text-center text-xs uppercase tracking-[0.25em] text-muted">
          Curating more products
        </div>
      ) : items.length ? (
        <div className="mt-10 text-center text-xs uppercase tracking-[0.25em] text-muted">
          End of the edit
        </div>
      ) : null}
    </>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-line bg-card">
      <div className="aspect-[4/5] animate-pulse bg-accent-soft/60" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-20 animate-pulse rounded-full bg-accent-soft" />
        <div className="h-6 w-4/5 animate-pulse rounded-full bg-accent-soft" />
        <div className="h-4 w-full animate-pulse rounded-full bg-accent-soft/70" />
        <div className="h-10 w-full animate-pulse rounded-full bg-accent-soft" />
      </div>
    </div>
  );
}
