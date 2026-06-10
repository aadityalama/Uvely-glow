import { categories as fallbackCategories } from "@/data/categories";
import { products as fallbackProducts } from "@/data/products";
import { isSupabaseConfigured } from "@/lib/env";
import { mapCategory, mapProduct } from "@/lib/mappers/catalog";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Category, Product } from "@/types";

export async function listCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured()) return fallbackCategories;
  const supabase = await createServerSupabaseClient();
  if (!supabase) return fallbackCategories;
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error || !data?.length) return fallbackCategories;
  return data.map(mapCategory);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const all = await listCategories();
  return all.find((c) => c.slug === slug) ?? null;
}

export async function listProducts(options?: {
  categorySlug?: string;
  q?: string;
  activeOnly?: boolean;
}): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    return filterLocal(fallbackProducts, options);
  }
  const supabase = await createServerSupabaseClient();
  if (!supabase) return filterLocal(fallbackProducts, options);

  let q = supabase.from("products").select("*").order("name");
  if (options?.activeOnly !== false) {
    q = q.eq("is_active", true);
  }
  const { data, error } = await q;
  if (error || !data?.length) return filterLocal(fallbackProducts, options);
  let mapped = data.map(mapProduct);
  if (options?.categorySlug) {
    const cat = await getCategoryBySlug(options.categorySlug);
    if (cat) mapped = mapped.filter((p) => p.categoryId === cat.id);
  }
  if (options?.q?.trim()) {
    const s = options.q.trim().toLowerCase();
    mapped = mapped.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.shortDescription.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s),
    );
  }
  return mapped;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured()) {
    return fallbackProducts.find((p) => p.slug === slug) ?? null;
  }
  const supabase = await createServerSupabaseClient();
  if (!supabase) return fallbackProducts.find((p) => p.slug === slug) ?? null;
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error || !data) return fallbackProducts.find((p) => p.slug === slug) ?? null;
  return mapProduct(data);
}

export async function listProductSlugs(): Promise<string[]> {
  const products = await listProducts({ activeOnly: false });
  return products.map((p) => p.slug);
}

function filterLocal(
  list: Product[],
  options?: { categorySlug?: string; q?: string; activeOnly?: boolean },
): Product[] {
  let out = [...list];
  if (options?.activeOnly !== false) out = out.filter((p) => p.isActive);
  if (options?.categorySlug) {
    const cat = fallbackCategories.find((c) => c.slug === options.categorySlug);
    if (cat) out = out.filter((p) => p.categoryId === cat.id);
  }
  if (options?.q?.trim()) {
    const s = options.q.trim().toLowerCase();
    out = out.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.shortDescription.toLowerCase().includes(s),
    );
  }
  return out;
}
