/** Longest-first so e.g. "Beauty of Joseon" wins over "Anua". */
const KNOWN_BRANDS = [
  "Beauty of Joseon",
  "Dr.Althea",
  "SKIN1004",
  "Medicube",
  "Round Lab",
  "Torriden",
  "Mixsoon",
  "Laneige",
  "COSRX",
  "Anua",
] as const;

/**
 * Best-effort brand line for catalog cards when `Product` has no brand field.
 */
export function deriveBrandName(productName: string): string {
  const n = productName.trim();
  const lower = n.toLowerCase();
  for (const brand of KNOWN_BRANDS) {
    if (lower.startsWith(brand.toLowerCase())) return brand;
    if (lower.includes(brand.toLowerCase())) return brand;
  }
  const parts = n.split(/\s+/);
  if (parts.length >= 2) return `${parts[0]} ${parts[1]}`;
  return parts[0] ?? "Uvely Glow";
}

/** Deterministic demo rating for list cards (catalog has no aggregate rating yet). */
export function demoListRating(slug: string): { value: number; reviewCount: number } {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  const value = Math.round((4.35 + (h % 65) / 100) * 10) / 10;
  const reviewCount = 180 + (h % 4200);
  return { value, reviewCount };
}

export function formatReviewCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(n);
}
