import type { Product } from "@/types";
import { ProductCard } from "@/components/product/product-card";

export function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} />
      ))}
    </div>
  );
}
