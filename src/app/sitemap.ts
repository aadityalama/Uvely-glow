import type { MetadataRoute } from "next";
import { listCategories, listProductSlugs } from "@/lib/services/catalog";
import { listBlogPosts, listBrands } from "@/lib/services/content";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, productSlugs, posts, brands] = await Promise.all([
    listCategories(),
    listProductSlugs(),
    listBlogPosts(),
    listBrands(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/products",
    "/categories",
    "/cart",
    "/checkout",
    "/wishlist",
    "/account",
    "/account/orders",
    "/account/loyalty",
    "/account/subscriptions",
    "/support",
    "/quiz",
    "/blog",
    "/brands",
    "/compare",
    "/marketing",
    "/referrals",
    "/affiliate",
    "/influencers",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "daily",
    priority: path === "" ? 1 : 0.7,
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${base}/categories/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const productRoutes = productSlugs.map((slug) => ({
    url: `${base}/products/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogRoutes = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const brandRoutes = brands.map((brand) => ({
    url: `${base}/brands/${brand.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.76,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...blogRoutes, ...brandRoutes];
}
