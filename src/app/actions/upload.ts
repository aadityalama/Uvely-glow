"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/admin";

export async function uploadProductImageAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const file = formData.get("file");
  const productId = String(formData.get("product_id") ?? "");
  if (!(file instanceof File) || !productId) throw new Error("Missing file or product");

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${productId}/${crypto.randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error: upErr } = await supabase.storage
    .from("product-images")
    .upload(path, buffer, {
      contentType: file.type || "image/jpeg",
      upsert: false,
    });
  if (upErr) throw new Error(upErr.message);

  const {
    data: { publicUrl },
  } = supabase.storage.from("product-images").getPublicUrl(path);

  const { data: product } = await supabase
    .from("products")
    .select("gallery_urls, image_url")
    .eq("id", productId)
    .maybeSingle();
  const gallery = [...(product?.gallery_urls ?? []), publicUrl];
  const { error: dbErr } = await supabase
    .from("products")
    .update({ gallery_urls: gallery })
    .eq("id", productId);
  if (dbErr) throw new Error(dbErr.message);

  revalidatePath("/admin/products");
  revalidatePath("/products");
  return { publicUrl };
}
