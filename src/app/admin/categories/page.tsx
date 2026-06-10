import Link from "next/link";
import {
  adminDeleteCategoryFormAction,
  adminSaveCategoryFromFormAction,
} from "@/app/actions/admin";
import { listCategories, listProducts } from "@/lib/services/catalog";
import { isSupabaseConfigured } from "@/lib/env";

export default async function AdminCategoriesPage() {
  if (!isSupabaseConfigured()) {
    return (
      <p className="text-sm text-background/70">
        Set NEXT_PUBLIC_SUPABASE_URL and anon key to manage categories.
      </p>
    );
  }

  const [categories, products] = await Promise.all([
    listCategories(),
    listProducts({ activeOnly: false }),
  ]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl text-background">Category management</h1>
        <p className="mt-2 text-sm text-background/70">
          Create and edit categories used on the storefront.
        </p>
      </div>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="font-display text-xl text-background">New category</h2>
        <form action={adminSaveCategoryFromFormAction} className="mt-4 grid max-w-xl gap-3">
          <input type="hidden" name="id" value="" />
          <Field label="Slug" name="slug" placeholder="e.g. serums" required />
          <Field label="Name" name="name" required />
          <div>
            <label className="text-xs uppercase tracking-widest text-background/60">
              Description
            </label>
            <textarea
              name="description"
              rows={2}
              className="mt-2 w-full rounded-lg border border-white/10 bg-deep px-3 py-2 text-sm text-background"
            />
          </div>
          <Field label="Sort order" name="sort_order" type="number" defaultValue="0" />
          <button
            type="submit"
            className="w-fit rounded-full bg-background px-5 py-2 text-xs font-semibold uppercase tracking-widest text-deep"
          >
            Create
          </button>
        </form>
      </section>

      <ul className="space-y-6">
        {categories.map((c) => (
          <li
            key={c.id}
            id={c.slug}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <form action={adminSaveCategoryFromFormAction} className="space-y-3">
                  <input type="hidden" name="id" value={c.id} />
                  <Field label="Slug" name="slug" defaultValue={c.slug} required />
                  <Field label="Name" name="name" defaultValue={c.name} required />
                  <div>
                    <label className="text-xs uppercase tracking-widest text-background/60">
                      Description
                    </label>
                    <textarea
                      name="description"
                      rows={2}
                      defaultValue={c.description}
                      className="mt-2 w-full rounded-lg border border-white/10 bg-deep px-3 py-2 text-sm text-background"
                    />
                  </div>
                  <Field
                    label="Sort order"
                    name="sort_order"
                    type="number"
                    defaultValue={String(c.sortOrder)}
                  />
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="submit"
                      className="rounded-full bg-background px-5 py-2 text-xs font-semibold uppercase tracking-widest text-deep"
                    >
                      Save
                    </button>
                    <Link
                      href={`/categories/${c.slug}`}
                      className="self-center text-xs uppercase tracking-widest text-accent-soft hover:underline"
                    >
                      View on site
                    </Link>
                  </div>
                </form>
              </div>
              <div className="text-right text-sm">
                <p className="text-background/60">Products</p>
                <p className="font-semibold">
                  {products.filter((p) => p.categoryId === c.id).length}
                </p>
                <form action={adminDeleteCategoryFormAction} className="mt-3">
                  <input type="hidden" name="id" value={c.id} />
                  <button
                    type="submit"
                    className="text-xs uppercase tracking-widest text-rose-300 hover:underline"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-background/60">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border border-white/10 bg-deep px-3 py-2 text-sm text-background"
      />
    </div>
  );
}
