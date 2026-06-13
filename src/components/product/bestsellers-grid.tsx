"use client";

import type { Product } from "@/types";
import { BestsellerCollectionCard } from "@/components/product/bestseller-collection-card";

export function BestsellersGrid({ items }: { items: Product[] }) {
  if (!items.length) {
    return <p className="text-center text-muted">No bestsellers in the catalog yet.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((p) => (
        <BestsellerCollectionCard key={p.id} product={p} />
      ))}
    </div>
  );
}
