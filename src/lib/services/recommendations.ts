import type { Product } from "@/types";

export type SkinQuizInput = {
  skinType: string;
  concerns: string[];
  budgetKrw: number;
  routineGoal: string;
};

const concernKeywords: Record<string, string[]> = {
  dehydration: ["hyaluronic", "hydration", "moisturizing", "essence", "serum"],
  redness: ["centella", "heartleaf", "relief", "soothing", "calm"],
  barrier: ["ceramide", "cream", "repair", "barrier", "relief"],
  texture: ["bean", "ferment", "snail", "essence", "exfoliation"],
  sun: ["sun", "spf", "sunscreen", "probiotics"],
  lips: ["lip", "mask", "sleeping"],
};

export function scoreProductForQuiz(product: Product, input: SkinQuizInput) {
  const haystack = [
    product.name,
    product.description,
    product.shortDescription,
    product.ingredients,
  ]
    .map((x) => String(x ?? ""))
    .join(" ")
    .toLowerCase();

  let score = product.isFeatured ? 12 : 4;
  if (product.stock > 0) score += 8;
  if (input.budgetKrw && product.priceKrw <= input.budgetKrw) score += 10;
  for (const concern of input.concerns) {
    for (const keyword of concernKeywords[concern] ?? [concern]) {
      if (haystack.includes(keyword)) score += 12;
    }
  }
  if (input.routineGoal === "minimal" && haystack.includes("lightweight")) score += 6;
  if (input.skinType === "sensitive" && /centella|heartleaf|relief|soothing/.test(haystack)) {
    score += 10;
  }
  return score;
}

export function getPersonalizedRecommendations(
  products: Product[],
  input: SkinQuizInput,
  limit = 4,
) {
  return products
    .map((product) => ({ product, score: scoreProductForQuiz(product, input) }))
    .sort((a, b) => b.score - a.score || a.product.priceKrw - b.product.priceKrw)
    .slice(0, limit);
}

export function getRelatedProducts(product: Product, products: Product[], limit = 4) {
  const categoryMatches = products.filter(
    (item) => item.id !== product.id && item.categoryId === product.categoryId,
  );
  const ingredientMatches = products.filter((item) => {
    if (item.id === product.id || item.categoryId === product.categoryId) return false;
    const source = String(product.ingredients ?? "").toLowerCase();
    return String(item.ingredients ?? "")
      .toLowerCase()
      .split(/,\s*/)
      .some((part) => part && source.includes(part.split(" ")[0]));
  });
  return [...categoryMatches, ...ingredientMatches].slice(0, limit);
}

export function getFrequentlyBoughtTogether(product: Product, products: Product[]) {
  const differentStep = products.find(
    (item) => item.id !== product.id && item.categoryId !== product.categoryId && item.stock > 0,
  );
  const sameRoutine = products.find(
    (item) => item.id !== product.id && item.categoryId === product.categoryId && item.stock > 0,
  );
  return [product, sameRoutine, differentStep].filter(Boolean) as Product[];
}

export function getSearchSuggestions(products: Product[], q: string) {
  const query = q.trim().toLowerCase();
  if (!query) {
    return ["snail mucin", "centella ampoule", "rice sunscreen", "barrier cream"];
  }
  return products
    .filter((product) => String(product.name ?? "").toLowerCase().includes(query))
    .map((product) => product.name)
    .slice(0, 5);
}
