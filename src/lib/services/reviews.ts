import { createServerSupabaseClient } from "@/lib/supabase/server";

export type ReviewView = {
  id: string;
  rating: number;
  title: string | null;
  body: string | null;
  createdAt: string;
  author: string;
  isVerifiedPurchase: boolean;
  beforeImageUrl: string | null;
  afterImageUrl: string | null;
};

export async function listApprovedReviews(
  productId: string,
): Promise<ReviewView[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("reviews")
    .select("id, rating, title, body, created_at, is_verified_purchase, before_image_url, after_image_url")
    .eq("product_id", productId)
    .eq("is_approved", true)
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data.map((r) => ({
    id: r.id,
    rating: r.rating,
    title: r.title,
    body: r.body,
    createdAt: r.created_at,
    author: "Verified buyer",
    isVerifiedPurchase: r.is_verified_purchase,
    beforeImageUrl: r.before_image_url,
    afterImageUrl: r.after_image_url,
  }));
}

export async function listPendingReviewsForAdmin() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("reviews")
    .select("id, product_id, user_id, rating, title, body, created_at")
    .eq("is_approved", false)
    .order("created_at", { ascending: false });
  if (error || !data?.length) return [];

  const productIds = [...new Set(data.map((r) => r.product_id).filter(Boolean))] as string[];
  const nameById = new Map<string, string>();
  const slugById = new Map<string, string>();
  if (productIds.length) {
    const { data: prods } = await supabase.from("products").select("id, name, slug").in("id", productIds);
    for (const p of prods ?? []) nameById.set(p.id, p.name);
    for (const p of prods ?? []) slugById.set(p.id, p.slug);
  }

  return data.map((r) => ({
    id: r.id,
    productId: r.product_id,
    productSlug: slugById.get(r.product_id) ?? "",
    productName: nameById.get(r.product_id) ?? "Product",
    rating: r.rating,
    title: r.title,
    body: r.body,
    createdAt: r.created_at,
    author: "Customer",
  }));
}
