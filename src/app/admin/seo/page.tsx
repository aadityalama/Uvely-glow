const checks = [
  {
    area: "Dynamic metadata",
    status: "Enabled",
    detail: "Products, articles, and brands generate title, description, canonical, and OG data.",
  },
  {
    area: "Open Graph",
    status: "Optimized",
    detail: "Article, product, brand, and global OG metadata are configured for sharing.",
  },
  {
    area: "Image optimization",
    status: "Optimized",
    detail: "Next/Image is used for product cards, galleries, blog, brand, and review media.",
  },
  {
    area: "Core Web Vitals",
    status: "Monitored",
    detail: "Critical images use priority only on hero/detail pages and fonts use display swap.",
  },
  {
    area: "Structured data",
    status: "Enabled",
    detail: "Product and Article JSON-LD are emitted on key SEO pages.",
  },
  {
    area: "Sitemap",
    status: "Expanded",
    detail: "Products, categories, blog articles, brand pages, and growth pages are discoverable.",
  },
];

export default function AdminSeoPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-background">SEO audit</h1>
        <p className="mt-2 text-sm text-background/70">
          Phase 4 performance and search-readiness checklist for Lighthouse,
          Core Web Vitals, image optimization, metadata, and structured data.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {checks.map((check) => (
          <div key={check.area} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-xl">{check.area}</h2>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-widest text-accent-soft">
                {check.status}
              </span>
            </div>
            <p className="mt-3 text-sm text-background/70">{check.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
