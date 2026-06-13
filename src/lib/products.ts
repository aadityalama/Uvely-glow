import type { Product } from "@/types";
import { products } from "@/data/products";

export type SortKey = "featured" | "price-asc" | "price-desc" | "name";

export interface ProductFilters {
  q?: string;
  categorySlug?: string;
  minKrw?: number;
  maxKrw?: number;
  sort?: SortKey;
  inStockOnly?: boolean;
}

/** Case-insensitive match across searchable fields; tolerates nullish values from DB or mappers. */
export function productMatchesQuery(p: Product, rawQ: string) {
  const s = rawQ.trim().toLowerCase();
  if (!s) return true;
  const fields = [p.name, p.shortDescription, p.description, p.ingredients];
  return fields.some((f) => String(f ?? "").toLowerCase().includes(s));
}

function matchesQuery(p: Product, q: string) {
  return productMatchesQuery(p, q);
}

export function filterProducts(
  list: Product[],
  { q, categorySlug, minKrw, maxKrw, sort = "featured", inStockOnly }: ProductFilters,
  categoryIdBySlug: Map<string, string>,
) {
  let out = list.filter((p) => p.isActive);

  if (q) out = out.filter((p) => matchesQuery(p, q));
  if (categorySlug) {
    const id = categoryIdBySlug.get(categorySlug);
    if (id) out = out.filter((p) => p.categoryId === id);
  }
  if (typeof minKrw === "number" && !Number.isNaN(minKrw)) {
    out = out.filter((p) => p.priceKrw >= minKrw);
  }
  if (typeof maxKrw === "number" && !Number.isNaN(maxKrw)) {
    out = out.filter((p) => p.priceKrw <= maxKrw);
  }
  if (inStockOnly) out = out.filter((p) => p.stock > 0);

  const sorted = [...out];
  if (sort === "price-asc") sorted.sort((a, b) => a.priceKrw - b.priceKrw);
  else if (sort === "price-desc") sorted.sort((a, b) => b.priceKrw - a.priceKrw);
  else if (sort === "name")
    sorted.sort((a, b) => String(a.name ?? "").localeCompare(String(b.name ?? "")));
  else
    sorted.sort(
      (a, b) =>
        Number(b.isFeatured) - Number(a.isFeatured) ||
        String(a.name ?? "").localeCompare(String(b.name ?? "")),
    );

  return sorted;
}

export function getAllProducts() {
  return products.filter((p) => p.isActive);
}
