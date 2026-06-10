import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { NewsletterCapture } from "@/components/marketing/newsletter-capture";
import { listBlogPosts } from "@/lib/services/content";

export const metadata: Metadata = {
  title: "K-Beauty Blog",
  description:
    "SEO skincare guides, Korean beauty routines, ingredient comparisons, and product education from Uvely Glow.",
  openGraph: {
    title: "Uvely Glow K-Beauty Blog",
    description: "Korean beauty guides, routines, and skin concern education.",
  },
};

export default async function BlogPage() {
  const posts = await listBlogPosts();

  return (
    <Container className="py-12 sm:py-16">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          Editorial
        </p>
        <h1 className="mt-3 font-display text-5xl text-deep">K-Beauty blog</h1>
        <p className="mt-4 text-muted">
          SEO-rich skincare articles that help shoppers choose routines by skin
          concern, ingredient, season, and product format.
        </p>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_22rem]">
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-2xl border border-line bg-card"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={post.heroImageUrl}
                  alt={post.title}
                  fill
                  className="object-cover transition group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-widest text-accent">
                  {post.tags.slice(0, 2).join(" / ")}
                </p>
                <h2 className="mt-2 font-display text-2xl text-deep">{post.title}</h2>
                <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
        <NewsletterCapture compact />
      </div>
    </Container>
  );
}
