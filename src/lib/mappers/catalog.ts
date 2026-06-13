import type { Category, Product } from "@/types";
import type { Database } from "@/lib/supabase/database.types";

type ProductRow = Database["public"]["Tables"]["products"]["Row"];
type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];

export function mapCategory(row: CategoryRow): Category {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description ?? "",
    sortOrder: row.sort_order,
  };
}

export function mapProduct(row: ProductRow): Product {
  const priceKrw = Number(row.price_krw);
  const compareRaw = row.compare_at_krw;
  const compareAtKrw =
    compareRaw === null || compareRaw === undefined ? null : Number(compareRaw);
  const stock = Number(row.stock);
  const lowStock = Number(row.low_stock_threshold);

  return {
    id: row.id,
    slug: row.slug ?? "",
    name: row.name ?? "",
    description: row.description ?? "",
    shortDescription: row.short_description ?? "",
    priceKrw: Number.isFinite(priceKrw) ? priceKrw : 0,
    compareAtKrw: compareAtKrw !== null && Number.isFinite(compareAtKrw) ? compareAtKrw : null,
    sku: row.sku ?? "",
    stock: Number.isFinite(stock) ? stock : 0,
    lowStockThreshold: Number.isFinite(lowStock) ? lowStock : 0,
    imageUrl: row.image_url ?? "",
    galleryUrls: row.gallery_urls ?? [],
    categoryId: row.category_id ?? "",
    ingredients: row.ingredients ?? "",
    isFeatured: row.is_featured,
    isActive: row.is_active,
  };
}
