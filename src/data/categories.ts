import type { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "c-toners",
    slug: "toners",
    name: "Toners & mists",
    description: "Heartleaf, rice water, and barrier-soothing first steps.",
    sortOrder: 1,
  },
  {
    id: "c-serums",
    slug: "serums-essences",
    name: "Serums & essences",
    description: "Layered hydration, snail mucin, and centella calm.",
    sortOrder: 2,
  },
  {
    id: "c-creams",
    slug: "creams",
    name: "Creams & moisturizers",
    description: "Silky finishes, jelly textures, and overnight comfort.",
    sortOrder: 3,
  },
  {
    id: "c-sun",
    slug: "sun-protection",
    name: "Sun protection",
    description: "Invisible shields with a soft Seoul glow.",
    sortOrder: 4,
  },
  {
    id: "c-lips",
    slug: "lips-masks",
    name: "Lips & masks",
    description: "Overnight rituals and pillow-soft lips.",
    sortOrder: 5,
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
