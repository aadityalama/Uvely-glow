import Image from "next/image";
import Link from "next/link";

const EDITORIAL = [
  {
    src: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=1600&q=85",
    alt: "Luxury serum bottles and droppers arranged as editorial still life",
    caption: "Serum atelier",
    href: "/categories/serums-essences",
  },
  {
    src: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1600&q=85",
    alt: "Minimal cream jars on blush marble with soft daylight",
    caption: "Cream couture",
    href: "/categories/creams",
  },
  {
    src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=85",
    alt: "Korean skincare textures swatched on skin with dewy finish",
    caption: "Texture lab",
    href: "/products",
  },
] as const;

export function LuxuryEditorialGrid() {
  return (
    <section className="bg-ivory py-20 sm:py-28 md:py-32">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-rose-gold">
              The campaign
            </p>
            <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold leading-[1.12] tracking-tight text-deep sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              Objects of desire.{" "}
              <span className="italic text-rose-gold">Proven</span> on skin.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-zinc-700 sm:text-[17px] sm:leading-[1.75]">
            Oversized photography, museum lighting, and packaging worthy of your
            vanity. Every hero is photographed in-house to match the exact finish
            you receive.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3 sm:gap-8">
          {EDITORIAL.map((item, i) => (
            <Link
              key={item.src}
              href={item.href}
              className="group relative aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-blush shadow-[var(--luxury-shadow)] ring-1 ring-black/[0.04] transition-shadow duration-300 hover:shadow-[var(--luxury-shadow-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/25 focus-visible:ring-offset-2 sm:aspect-[4/5] sm:rounded-[2rem]"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width:640px) 100vw, 33vw"
                className="object-cover transition duration-[1.2s] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/70 via-deep/10 to-transparent opacity-90 transition group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-champagne">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 font-display text-2xl text-white sm:text-3xl">
                  {item.caption}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/90 opacity-0 transition group-hover:opacity-100">
                  View category
                  <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
