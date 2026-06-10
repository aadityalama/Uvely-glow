import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { listCategories } from "@/lib/services/catalog";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse Uvely Glow Korean beauty by category.",
};

export default async function CategoriesPage() {
  const categories = await listCategories();

  return (
    <Container className="py-12 sm:py-16">
      <h1 className="font-display text-4xl text-deep sm:text-5xl">Categories</h1>
      <p className="mt-4 max-w-2xl text-muted">
        From first-step toners to pillow-soft lips—each aisle is edited for
        texture and tolerance.
      </p>
      <ul className="mt-12 grid gap-4 sm:grid-cols-2">
        {categories.map((c) => (
          <li key={c.id}>
            <Link
              href={`/categories/${c.slug}`}
              className="block rounded-2xl border border-line bg-card p-6 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="font-display text-2xl text-deep">{c.name}</p>
              <p className="mt-2 text-sm text-muted">{c.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
