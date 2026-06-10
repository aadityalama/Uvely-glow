import Link from "next/link";
import { redirect } from "next/navigation";
import { adminSaveProductFromFormAction } from "@/app/actions/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";

export default async function NewProductPage() {
  if (!isSupabaseConfigured()) redirect("/admin/products");
  const supabase = await createServerSupabaseClient();
  if (!supabase) redirect("/admin/products");
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name")
    .order("sort_order");

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-background">New product</h1>
      <form
        action={adminSaveProductFromFormAction}
        className="max-w-2xl space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6"
      >
        <Field label="Slug" name="slug" required />
        <Field label="Name" name="name" required />
        <Field label="Short description" name="short_description" />
        <div>
          <label className="text-xs uppercase tracking-widest text-background/60">
            Description
          </label>
          <textarea
            name="description"
            required
            rows={4}
            className="mt-2 w-full rounded-lg border border-white/10 bg-deep px-3 py-2 text-sm text-background"
          />
        </div>
        <Field label="Price (KRW)" name="price_krw" type="number" required />
        <Field label="Compare-at (KRW)" name="compare_at_krw" type="number" />
        <Field label="SKU" name="sku" />
        <Field label="Stock" name="stock" type="number" required />
        <Field label="Low stock threshold" name="low_stock_threshold" type="number" />
        <Field label="Primary image URL" name="image_url" required />
        <div>
          <label className="text-xs uppercase tracking-widest text-background/60">
            Gallery URLs (one per line)
          </label>
          <textarea
            name="gallery_urls"
            rows={3}
            className="mt-2 w-full rounded-lg border border-white/10 bg-deep px-3 py-2 text-sm text-background"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest text-background/60">
            Category
          </label>
          <select
            name="category_id"
            className="mt-2 w-full rounded-lg border border-white/10 bg-deep px-3 py-2 text-sm text-background"
          >
            <option value="">—</option>
            {(categories ?? []).map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest text-background/60">
            Ingredients
          </label>
          <textarea
            name="ingredients"
            rows={2}
            className="mt-2 w-full rounded-lg border border-white/10 bg-deep px-3 py-2 text-sm text-background"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs uppercase tracking-widest text-background/60">
              Featured
            </label>
            <select
              name="is_featured"
              className="mt-2 w-full rounded-lg border border-white/10 bg-deep px-3 py-2 text-sm text-background"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-background/60">
              Active
            </label>
            <select
              name="is_active"
              className="mt-2 w-full rounded-lg border border-white/10 bg-deep px-3 py-2 text-sm text-background"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-full bg-background px-6 py-2 text-xs font-semibold uppercase tracking-widest text-deep"
          >
            Save
          </button>
          <Link href="/admin/products" className="text-sm text-background/70 hover:underline">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-background/60">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-lg border border-white/10 bg-deep px-3 py-2 text-sm text-background"
      />
    </div>
  );
}
