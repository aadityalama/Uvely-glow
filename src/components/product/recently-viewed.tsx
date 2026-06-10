"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/types";
import { ProductCard } from "@/components/product/product-card";

const STORAGE_KEY = "uvely-recently-viewed";

export function TrackRecentlyViewed({ productId }: { productId: string }) {
  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const current = raw ? (JSON.parse(raw) as string[]) : [];
    const next = [productId, ...current.filter((id) => id !== productId)].slice(0, 8);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, [productId]);

  return null;
}

export function RecentlyViewedProducts({ products }: { products: Product[] }) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      setIds(raw ? (JSON.parse(raw) as string[]) : []);
    } catch {
      setIds([]);
    }
  }, []);

  const items = useMemo(
    () =>
      ids
        .map((id) => products.find((product) => product.id === id))
        .filter(Boolean)
        .slice(0, 4) as Product[],
    [ids, products],
  );

  if (!items.length) return null;

  return (
    <section className="mt-16">
      <h2 className="font-display text-3xl text-deep">Recently viewed</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
