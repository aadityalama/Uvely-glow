import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { getBlogPost, listBlogPosts } from "@/lib/services/content";
import { env } from "@/lib/env";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await listBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "K-Beauty article" };
  return {
    title: post.seoTitle,
    description: post.seoDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      type: "article",
      url: `${env.siteUrl}/blog/${post.slug}`,
      images: [{ url: post.ogImageUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.seoDescription,
      images: [post.ogImageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.ogImageUrl,
    author: { "@type": "Organization", name: post.authorName },
    publisher: { "@type": "Organization", name: "Uvely Glow" },
    datePublished: post.publishedAt,
    mainEntityOfPage: `${env.siteUrl}/blog/${post.slug}`,
  };

  return (
    <Container className="py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href="/blog" className="text-sm text-accent hover:underline">
        Back to blog
      </Link>
      <article className="mx-auto mt-8 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          {post.tags.join(" / ")}
        </p>
        <h1 className="mt-3 font-display text-5xl leading-tight text-deep">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-muted">{post.excerpt}</p>
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl border border-line">
          <Image
            src={post.heroImageUrl}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
        <div className="prose prose-neutral mt-8 max-w-none text-foreground">
          {post.body.split("\n").map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </Container>
  );
}
