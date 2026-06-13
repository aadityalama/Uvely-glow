import Image from "next/image";
import Link from "next/link";

const TILES = [
  {
    src: "https://images.unsplash.com/photo-1598440947619-c3f3409e0fd4?auto=format&fit=crop&w=800&q=80",
    alt: "Flat lay of glass skincare bottles on blush surface",
  },
  {
    src: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
    alt: "Minimal product texture swatch on porcelain",
  },
  {
    src: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80",
    alt: "Cream jar with gold accent in soft window light",
  },
  {
    src: "https://images.unsplash.com/photo-1571875257727-256c39da42af?auto=format&fit=crop&w=800&q=80",
    alt: "Serum dropper close-up with reflections",
  },
  {
    src: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80",
    alt: "Pastel skincare bottles arranged in grid",
  },
  {
    src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    alt: "Hands applying lightweight essence",
  },
] as const;

export function InstagramGallery() {
  return (
    <section className="bg-card py-20 sm:py-28 md:py-32">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-rose-gold">
              @uvelyglow
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-[1.12] text-deep sm:text-4xl md:text-5xl">
              Instagram gallery
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-zinc-700 sm:text-[17px] sm:leading-[1.75]">
              Daily texture studies, Seoul sourcing diaries, and community
              reposts—follow for first access to limited drops.
            </p>
          </div>
          <Link
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-line bg-background px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-deep shadow-[var(--luxury-shadow-sm)] transition hover:border-rose-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/25 focus-visible:ring-offset-2"
          >
            Follow on Instagram
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:gap-5">
          {TILES.map((t) => (
            <Link
              key={t.src}
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative block aspect-square overflow-hidden rounded-[1.25rem] bg-blush shadow-[var(--luxury-shadow-sm)] ring-1 ring-black/[0.04] transition-shadow hover:shadow-[var(--luxury-shadow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/25 focus-visible:ring-offset-2 sm:rounded-[1.75rem]"
            >
              <Image
                src={t.src}
                alt={t.alt}
                fill
                sizes="(max-width:640px) 50vw, 33vw"
                className="object-cover transition duration-700 hover:scale-[1.04]"
              />
              <span className="absolute inset-0 bg-deep/0 transition hover:bg-deep/10" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
