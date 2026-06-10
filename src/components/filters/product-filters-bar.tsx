"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { categories } from "@/data/categories";
import type { SortKey } from "@/lib/products";
import { Button } from "@/components/ui/button";

const sorts: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price ↑" },
  { value: "price-desc", label: "Price ↓" },
  { value: "name", label: "Name" },
];

export function ProductFiltersBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  const push = useCallback(
    (mutate: (p: URLSearchParams) => void) => {
      const p = new URLSearchParams(searchParams.toString());
      mutate(p);
      const qs = p.toString();
      startTransition(() => {
        router.push(qs ? `/products?${qs}` : "/products");
      });
    },
    [router, searchParams],
  );

  const q = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";
  const sort = (searchParams.get("sort") as SortKey | null) ?? "featured";
  const min = searchParams.get("min") ?? "";
  const max = searchParams.get("max") ?? "";
  const stock = searchParams.get("stock") === "1";

  return (
    <div className="space-y-6 rounded-2xl border border-line bg-card p-5 sm:p-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Search
        </p>
        <form
          className="mt-3 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const next = fd.get("q")?.toString() ?? "";
            push((p) => {
              if (next) p.set("q", next);
              else p.delete("q");
            });
          }}
        >
          <input
            name="q"
            defaultValue={q}
            placeholder="Ingredients, brand…"
            className="min-w-0 flex-1 rounded-xl border border-line bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent-soft"
          />
          <Button type="submit" variant="accent" className="shrink-0 px-4">
            Go
          </Button>
        </form>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Category
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() =>
              push((p) => {
                p.delete("category");
              })
            }
            className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
              !category
                ? "border-deep bg-deep text-background"
                : "border-line bg-background text-muted hover:border-foreground/30"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() =>
                push((p) => {
                  p.set("category", c.slug);
                })
              }
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                category === c.slug
                  ? "border-deep bg-deep text-background"
                  : "border-line bg-background text-muted hover:border-foreground/30"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Price (KRW)
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <input
            inputMode="numeric"
            placeholder="Min"
            defaultValue={min}
            className="w-24 rounded-xl border border-line bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent-soft"
            onBlur={(e) => {
              const v = e.target.value.trim();
              push((p) => {
                if (v) p.set("min", v);
                else p.delete("min");
              });
            }}
          />
          <span className="text-muted">—</span>
          <input
            inputMode="numeric"
            placeholder="Max"
            defaultValue={max}
            className="w-24 rounded-xl border border-line bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent-soft"
            onBlur={(e) => {
              const v = e.target.value.trim();
              push((p) => {
                if (v) p.set("max", v);
                else p.delete("max");
              });
            }}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={stock}
            onChange={() =>
              push((p) => {
                if (stock) p.delete("stock");
                else p.set("stock", "1");
              })
            }
            className="rounded border-line text-accent focus:ring-accent-soft"
          />
          In stock only
        </label>
        {pending ? (
          <span className="text-xs text-muted">Updating…</span>
        ) : null}
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Sort
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {sorts.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() =>
                push((p) => {
                  if (s.value === "featured") p.delete("sort");
                  else p.set("sort", s.value);
                })
              }
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                (sort === s.value) || (s.value === "featured" && !searchParams.get("sort"))
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-line bg-background text-muted hover:border-foreground/30"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
