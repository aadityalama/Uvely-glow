import Image from "next/image";
import Link from "next/link";

export function BrandStorySection() {
  return (
    <section className="bg-ivory py-20 sm:py-28 md:py-32">
      <div className="mx-auto grid max-w-[88rem] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-zinc-100/90 bg-blush shadow-[var(--luxury-shadow-lg)] ring-1 ring-black/[0.04] sm:aspect-[5/6] sm:rounded-[2rem]">
          <Image
            src="https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=1400&q=85"
            alt="Hands presenting luxury skincare jars in soft rose-tinted light"
            fill
            sizes="(max-width:1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-deep/30 to-transparent" />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-rose-gold">
            Maison Uvely
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.12] text-deep sm:text-4xl md:text-5xl">
            Born in Seoul. Polished for the world.
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-zinc-800 sm:text-[17px] sm:leading-[1.75]">
            <p>
              Uvely Glow began as a private studio edit—small-batch imports for
              clients who wanted Olive Young depth with boutique-house curation.
              Today, we partner directly with heritage labs and indie disruptors
              across Korea to bottle rituals that feel ceremonial, not clinical.
            </p>
            <p>
              Every SKU passes our texture board: slip, dry-down, scent
              restraint, and flash photography. If it does not elevate your
              shelf, it never reaches yours.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full bg-deep px-8 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-ivory transition hover:bg-foreground"
            >
              Our story
            </Link>
            <Link
              href="/brands"
              className="inline-flex items-center justify-center rounded-full border border-line bg-card px-8 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-deep transition hover:border-rose-gold/40"
            >
              Partner houses
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
