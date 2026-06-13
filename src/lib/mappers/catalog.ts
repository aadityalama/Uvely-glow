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
  return {
    id: row.id,
    slug: row.slug ?? "",
    name: row.name ?? "",
    description: row.description ?? "",
    shortDescription: row.short_description ?? "",
    priceKrw: row.price_krw,
    compareAtKrw: row.compare_at_krw,
    sku: row.sku ?? "",
    stock: row.stock,
    lowStockThreshold: row.low_stock_threshold,
    imageUrl: row.image_url ?? "",
    galleryUrls: row.gallery_urls ?? [],
    categoryId: row.category_id ?? "",
    ingredients: row.ingredients ?? "",
    isFeatured: row.is_featured,
    isActive: row.is_active,
  };
}
