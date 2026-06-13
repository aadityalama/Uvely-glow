import type { Product } from "@/types";

export type FeaturedBrandPreview = {
  id: string;
  displayName: string;
  catalogQuery: string;
  products: Product[];
};

function matchesBrand(p: Product, re: RegExp) {
  const blob = `${p.name}\n${p.shortDescription}\n${p.description}`;
  return re.test(blob);
}

const BRAND_PREVIEW_DEFS: ReadonlyArray<{
  id: string;
  displayName: string;
  catalogQuery: string;
  test: (p: Product) => boolean;
}> = [
  {
    id: "boj",
    displayName: "Beauty of Joseon",
    catalogQuery: "Beauty of Joseon",
    test: (p) => matchesBrand(p, /beauty of joseon|joseon relief/i),
  },
  {
    id: "cosrx",
    displayName: "COSRX",
    catalogQuery: "COSRX",
    test: (p) => matchesBrand(p, /\bcosrx\b/i),
  },
  {
    id: "anua",
    displayName: "Anua",
    catalogQuery: "Anua",
    test: (p) => matchesBrand(p, /\banua\b/i),
  },
  {
    id: "skin1004",
    displayName: "SKIN1004",
    catalogQuery: "SKIN1004",
    test: (p) => matchesBrand(p, /skin\s*1004|skin1004/i),
  },
  {
    id: "round-lab",
    displayName: "Round Lab",
    catalogQuery: "Round Lab",
    test: (p) => matchesBrand(p, /round\s*lab/i),
  },
];

const MAX_PREVIEW = 6;
const MIN_TARGET = 3;

/**
 * Builds up to 6 products per featured brand for homepage hover previews.
 * Prefer featured SKUs, then name order. If a brand has fewer than 3 matches
 * in the catalog, returns all matches (still useful with a strong “Shop all” CTA).
 */
export function buildFeaturedBrandPreviews(products: Product[]): FeaturedBrandPreview[] {
  const active = products.filter((p) => p.isActive);

  return BRAND_PREVIEW_DEFS.map((def) => {
    const matched = active.filter((p) => def.test(p));
    const sorted = [...matched].sort((a, b) => {
      const f = Number(b.isFeatured) - Number(a.isFeatured);
      if (f !== 0) return f;
      return a.name.localeCompare(b.name);
    });

    let chosen = sorted.slice(0, MAX_PREVIEW);

    /* Light widen only when we are short on SKUs: pull name-only matches */
    if (chosen.length < MIN_TARGET) {
      const loose = active.filter((p) => {
        if (chosen.some((c) => c.id === p.id)) return false;
        const q = def.catalogQuery.toLowerCase();
        return p.name.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q.replace(/\s+/g, "-"));
      });
      const merged = [...chosen, ...loose].sort((a, b) => {
        const f = Number(b.isFeatured) - Number(a.isFeatured);
        if (f !== 0) return f;
        return a.name.localeCompare(b.name);
      });
      chosen = merged.slice(0, MAX_PREVIEW);
    }

    return {
      id: def.id,
      displayName: def.displayName,
      catalogQuery: def.catalogQuery,
      products: chosen,
    };
  });
}
