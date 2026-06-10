import { createPublicSupabaseClient } from "@/lib/supabase/public";
import type { Product } from "@/types";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  authorName: string;
  heroImageUrl: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  ogImageUrl: string;
  publishedAt: string;
};

export type BrandProfile = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroImageUrl: string;
  seoTitle: string;
  seoDescription: string;
};

const fallbackPosts: BlogPost[] = [
  {
    slug: "glass-skin-routine-nepal",
    title: "The Korean glass skin routine for Nepal weather",
    excerpt:
      "Build a humidity-aware K-beauty routine with toner, serum, barrier cream, and daily SPF.",
    body:
      "Glass skin is less about piling on steps and more about matching hydration, barrier support, and sunscreen to your climate. In humid Kathmandu summers, use a watery toner, a lightweight serum, and a breathable SPF. In dry winter months, add a ceramide cream at night and keep exfoliation gentle.",
    authorName: "Uvely Editorial",
    heroImageUrl:
      "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=1200&q=80",
    tags: ["glass skin", "routine", "Nepal"],
    seoTitle: "Korean glass skin routine for Nepal",
    seoDescription:
      "A practical Korean skincare routine for Nepal weather, focused on hydration, barrier repair, and sunscreen.",
    ogImageUrl:
      "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=1200&q=80",
    publishedAt: new Date().toISOString(),
  },
  {
    slug: "centella-vs-snail-mucin",
    title: "Centella vs snail mucin: which K-beauty hero fits your skin?",
    excerpt:
      "Compare calming centella ampoules with bouncy snail mucin essences for your skin concern.",
    body:
      "Centella is best when your priority is visible redness, post-sun comfort, or a simple calming layer. Snail mucin is ideal when your skin feels dehydrated, textured, or in need of a cushiony repair step. Many routines use both: centella first for calm, snail mucin after toner for bounce.",
    authorName: "Uvely Editorial",
    heroImageUrl:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80",
    tags: ["centella", "snail mucin", "comparison"],
    seoTitle: "Centella vs snail mucin comparison",
    seoDescription:
      "Compare centella and snail mucin Korean skincare ingredients by skin concern, routine step, and texture.",
    ogImageUrl:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80",
    publishedAt: new Date().toISOString(),
  },
];

const fallbackBrands: BrandProfile[] = [
  {
    slug: "beauty-of-joseon",
    name: "Beauty of Joseon",
    tagline: "Hanbang glow rituals",
    description:
      "Heritage-inspired Korean skincare focused on rice, ginseng, and elegant daily sunscreen.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Beauty of Joseon at Uvely Glow",
    seoDescription:
      "Shop Beauty of Joseon sunscreen, serums, and hanbang K-beauty routines.",
  },
  {
    slug: "cosrx",
    name: "COSRX",
    tagline: "Clinical barrier care",
    description:
      "Problem-solving K-beauty staples for hydration, texture, sensitive skin, and barrier recovery.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "COSRX Korean skincare at Uvely Glow",
    seoDescription:
      "Discover COSRX snail mucin, toners, and gentle Korean skincare essentials.",
  },
  {
    slug: "skin1004",
    name: "SKIN1004",
    tagline: "Centella from Madagascar",
    description:
      "Minimalist centella-focused formulas for calm, hydrated, resilient skin.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "SKIN1004 centella skincare",
    seoDescription:
      "Shop SKIN1004 centella ampoules and soothing Korean skincare routines.",
  },
];

export async function listBlogPosts(): Promise<BlogPost[]> {
  const supabase = createPublicSupabaseClient();
  if (!supabase) return fallbackPosts;
  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug, title, excerpt, body, author_name, hero_image_url, tags, seo_title, seo_description, og_image_url, published_at, created_at")
    .order("published_at", { ascending: false });
  if (error || !data?.length) return fallbackPosts;
  return data.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    body: post.body,
    authorName: post.author_name,
    heroImageUrl: post.hero_image_url ?? fallbackPosts[0].heroImageUrl,
    tags: post.tags,
    seoTitle: post.seo_title ?? post.title,
    seoDescription: post.seo_description ?? post.excerpt,
    ogImageUrl: post.og_image_url ?? post.hero_image_url ?? fallbackPosts[0].ogImageUrl,
    publishedAt: post.published_at ?? post.created_at,
  }));
}

export async function getBlogPost(slug: string) {
  const posts = await listBlogPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function listBrands(): Promise<BrandProfile[]> {
  const supabase = createPublicSupabaseClient();
  if (!supabase) return fallbackBrands;
  const { data, error } = await supabase
    .from("brands")
    .select("slug, name, tagline, description, hero_image_url, seo_title, seo_description")
    .order("is_featured", { ascending: false })
    .order("name");
  if (error || !data?.length) return fallbackBrands;
  return data.map((brand) => ({
    slug: brand.slug,
    name: brand.name,
    tagline: brand.tagline ?? "K-beauty brand",
    description: brand.description ?? "",
    heroImageUrl: brand.hero_image_url ?? fallbackBrands[0].heroImageUrl,
    seoTitle: brand.seo_title ?? `${brand.name} Korean beauty`,
    seoDescription: brand.seo_description ?? brand.description ?? "",
  }));
}

export async function getBrand(slug: string) {
  const brands = await listBrands();
  return brands.find((brand) => brand.slug === slug) ?? null;
}

export function matchBrandProducts(brand: BrandProfile, products: Product[]) {
  const needle = brand.name.toLowerCase().replace(/[^a-z0-9]/g, "");
  return products.filter((product) =>
    product.name.toLowerCase().replace(/[^a-z0-9]/g, "").includes(needle),
  );
}
