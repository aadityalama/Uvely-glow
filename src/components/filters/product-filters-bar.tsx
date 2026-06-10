"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import type { SortKey } from "@/lib/products";
import { Button } from "@/components/ui/button";
import type { Category } from "@/types";

const sorts: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price low" },
  { value: "price-desc", label: "Price high" },
  { value: "name", label: "A-Z" },
];

export function ProductFiltersBar({ categories }: { categories: Category[] }) {
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
  const activeFilters = [category, min, max, stock ? "stock" : ""].filter(Boolean).length;

  return (
    <div className="rounded-[2rem] border border-line bg-card/95 p-4 backdrop-blur sm:p-5">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">
              Refine your ritual
            </p>
            <p className="mt-1 text-sm text-muted">
              Search by ingredient, concern, texture, or brand.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted">
            {activeFilters ? (
              <button
                type="button"
                onClick={() =>
                  push((p) => {
                    p.delete("category");
                    p.delete("min");
                    p.delete("max");
                    p.delete("stock");
                    p.delete("sort");
                  })
                }
                className="rounded-full border border-line px-3 py-2 transition hover:border-deep hover:text-deep"
              >
                Clear {activeFilters}
              </button>
            ) : null}
            {pending ? <span>Updating edit...</span> : <span>Live curation</span>}
          </div>
        </div>

        <form
          className="grid gap-3 lg:grid-cols-[minmax(18rem,1fr)_auto_auto_auto]"
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
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">
              Search
            </span>
            <input
              name="q"
              defaultValue={q}
              placeholder="Snail mucin, SPF, centella..."
              className="h-12 w-full rounded-full border border-line bg-background pl-20 pr-4 text-sm outline-none transition focus:border-deep focus:ring-4 focus:ring-accent-soft"
            />
          </div>
          <Button type="submit" variant="accent" className="h-12 px-7">
            Search
          </Button>
          <select
            value={sort}
            onChange={(e) =>
              push((p) => {
                const next = e.target.value;
                if (next === "featured") p.delete("sort");
                else p.set("sort", next);
              })
            }
            className="h-12 rounded-full border border-line bg-background px-4 text-sm text-foreground outline-none transition focus:border-deep focus:ring-4 focus:ring-accent-soft"
          >
            {sorts.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <label className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-line bg-background px-4 text-sm text-muted transition hover:border-deep hover:text-deep">
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
            In stock
          </label>
        </form>

        <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            onClick={() =>
              push((p) => {
                p.delete("category");
              })
            }
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
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
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                category === c.slug
                  ? "border-deep bg-deep text-background"
                  : "border-line bg-background text-muted hover:border-foreground/30"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-line pt-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Price
          </span>
          <input
            inputMode="numeric"
            placeholder="Min"
            defaultValue={min}
            className="h-10 w-28 rounded-full border border-line bg-background px-4 text-sm outline-none transition focus:border-deep focus:ring-4 focus:ring-accent-soft"
            onBlur={(e) => {
              const v = e.target.value.trim();
              push((p) => {
                if (v) p.set("min", v);
                else p.delete("min");
              });
            }}
          />
          <span className="text-muted">to</span>
          <input
            inputMode="numeric"
            placeholder="Max"
            defaultValue={max}
            className="h-10 w-28 rounded-full border border-line bg-background px-4 text-sm outline-none transition focus:border-deep focus:ring-4 focus:ring-accent-soft"
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
    </div>
  );
}
