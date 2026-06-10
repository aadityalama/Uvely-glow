"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import type { Database, OrderStatusDb } from "@/lib/supabase/database.types";

type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];
type ProductUpdate = Database["public"]["Tables"]["products"]["Update"];

export async function adminCreateProductAction(values: ProductInsert) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("products").insert(values);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/products");
  revalidatePath("/products");
}

export async function adminUpdateProductAction(id: string, values: ProductUpdate) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("products").update(values).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/products");
  revalidatePath("/products");
  if (values.slug) revalidatePath(`/products/${values.slug}`);
}

export async function adminDeleteProductAction(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/products");
  revalidatePath("/products");
}

type CategoryInsert = Database["public"]["Tables"]["categories"]["Insert"];
type CategoryUpdate = Database["public"]["Tables"]["categories"]["Update"];

export async function adminCreateCategoryAction(values: CategoryInsert) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("categories").insert(values);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/categories");
  revalidatePath("/categories");
}

export async function adminUpdateCategoryAction(id: string, values: CategoryUpdate) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("categories").update(values).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/categories");
  revalidatePath("/categories");
}

export async function adminDeleteCategoryAction(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/categories");
}

export async function adminAdjustInventoryAction(
  productId: string,
  delta: number,
  reason: string,
) {
  const { supabase, user } = await requireAdmin();
  const { data: prod } = await supabase
    .from("products")
    .select("stock")
    .eq("id", productId)
    .maybeSingle();
  if (!prod) throw new Error("Product not found");
  const next = prod.stock + delta;
  if (next < 0) throw new Error("Stock cannot be negative");
  const { error: uerr } = await supabase
    .from("products")
    .update({ stock: next })
    .eq("id", productId);
  if (uerr) throw new Error(uerr.message);
  await supabase.from("inventory_adjustments").insert({
    product_id: productId,
    delta,
    reason: reason || null,
    created_by: user.id,
  });
  revalidatePath("/admin/inventory");
  revalidatePath("/admin/products");
}

export async function adminUpdateOrderStatusAction(
  orderId: string,
  status: string,
) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("orders")
    .update({ status: status as OrderStatusDb })
    .eq("id", orderId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/orders");
  revalidatePath("/account/orders");
}

export async function adminSetReviewApprovedAction(
  reviewId: string,
  isApproved: boolean,
) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("reviews")
    .update({ is_approved: isApproved })
    .eq("id", reviewId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/reviews");
}

export async function adminDeleteReviewAction(reviewId: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("reviews").delete().eq("id", reviewId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/reviews");
}

function num(formData: FormData, key: string, fallback: number) {
  const v = Number(formData.get(key));
  return Number.isFinite(v) ? Math.trunc(v) : fallback;
}

export async function adminSaveProductFromFormAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "").trim();
  const compareRaw = String(formData.get("compare_at_krw") ?? "").trim();
  const galleryRaw = String(formData.get("gallery_urls") ?? "").trim();
  const gallery_urls = galleryRaw
    ? galleryRaw
        .split(/\n+/)
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const payload = {
    slug: String(formData.get("slug") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    short_description: String(formData.get("short_description") ?? "").trim() || null,
    description: String(formData.get("description") ?? "").trim(),
    price_krw: num(formData, "price_krw", 0),
    compare_at_krw: (() => {
      if (!compareRaw) return null;
      const n = Number(compareRaw);
      return Number.isFinite(n) ? n : null;
    })(),
    sku: String(formData.get("sku") ?? "").trim() || null,
    stock: num(formData, "stock", 0),
    low_stock_threshold: num(formData, "low_stock_threshold", 5),
    image_url: String(formData.get("image_url") ?? "").trim(),
    gallery_urls,
    category_id: String(formData.get("category_id") ?? "").trim() || null,
    ingredients: String(formData.get("ingredients") ?? "").trim() || null,
    is_featured: String(formData.get("is_featured") ?? "false") === "true",
    is_active: String(formData.get("is_active") ?? "true") === "true",
  };

  if (!payload.slug || !payload.name || !payload.image_url) {
    throw new Error("Slug, name, and primary image are required");
  }

  if (id) {
    const { error } = await supabase.from("products").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("products").insert(payload);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/admin/products");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function adminSaveCategoryFromFormAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "").trim();
  const payload = {
    slug: String(formData.get("slug") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    sort_order: num(formData, "sort_order", 0),
  };
  if (!payload.slug || !payload.name) throw new Error("Slug and name are required");
  if (id) {
    const { error } = await supabase.from("categories").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("categories").insert(payload);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/admin/categories");
  revalidatePath("/categories");
  redirect("/admin/categories");
}

export async function adminDeleteCategoryFormAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  await adminDeleteCategoryAction(id);
  redirect("/admin/categories");
}

export async function adminDeleteProductFormAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  await adminDeleteProductAction(id);
  redirect("/admin/products");
}

export async function adminUpdateOrderFromFormAction(formData: FormData) {
  const orderId = String(formData.get("order_id") ?? "");
  const status = String(formData.get("status") ?? "");
  await adminUpdateOrderStatusAction(orderId, status);
  redirect("/admin/orders");
}

export async function adminAdjustInventoryFormAction(formData: FormData) {
  const productId = String(formData.get("product_id") ?? "");
  const delta = Number(formData.get("delta") ?? 0);
  const reason = String(formData.get("reason") ?? "");
  await adminAdjustInventoryAction(productId, delta, reason);
  redirect("/admin/inventory");
}

export async function adminApproveReviewFormAction(formData: FormData) {
  const reviewId = String(formData.get("review_id") ?? "");
  await adminSetReviewApprovedAction(reviewId, true);
  redirect("/admin/reviews");
}

export async function adminDismissReviewFormAction(formData: FormData) {
  const reviewId = String(formData.get("review_id") ?? "");
  await adminDeleteReviewAction(reviewId);
  redirect("/admin/reviews");
}
