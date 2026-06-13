import Image from "next/image";
import Link from "next/link";

const REVIEWS = [
  {
    quote:
      "The texture is what sold me—expensive slip without silicones that pill. My barrier finally looks calm on camera.",
    name: "Hannah M.",
    city: "Los Angeles",
    rating: 5,
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    product: "COSRX Snail Essence",
  },
  {
    quote:
      "Shipping was flawless and the packaging feels like a department store haul. This is my new K-beauty home.",
    name: "Yuna K.",
    city: "Toronto",
    rating: 5,
    photo:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    product: "Anua Heartleaf Toner",
  },
  {
    quote:
      "I have melasma-prone skin and still want glow. Uvely Glow’s curation is tight—no filler products.",
    name: "Priya S.",
    city: "London",
    rating: 5,
    photo:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80",
    product: "Beauty of Joseon SPF",
  },
] as const;

export function CustomerReviewsSection() {
  return (
    <section className="border-t border-line bg-blush/35 py-20 sm:py-28 md:py-32">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-rose-gold">
              Clientele
            </p>
            <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold leading-[1.12] text-deep sm:text-4xl md:text-5xl">
              Five stars, five continents.
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-gold underline-offset-8 transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/25 focus-visible:ring-offset-2"
          >
            Read more stories
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
          {REVIEWS.map((r) => (
            <blockquote
              key={r.name}
              className="flex flex-col rounded-[1.75rem] border border-zinc-100/90 bg-card p-6 shadow-[var(--luxury-shadow)] ring-1 ring-black/[0.03] sm:rounded-[2rem] sm:p-8"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-full border border-line">
                  <Image
                    src={r.photo}
                    alt={`Portrait of ${r.name}`}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div>
                  <p className="font-display text-lg text-deep">{r.name}</p>
                  <p className="text-xs text-zinc-700">{r.city}</p>
                </div>
              </div>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-gold">
                {r.product}
              </p>
              <p className="mt-1 text-xs text-champagne" aria-label={`${r.rating} out of 5 stars`}>
                {"★".repeat(r.rating)}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-zinc-800 sm:text-base sm:leading-relaxed">&ldquo;{r.quote}&rdquo;</p>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
