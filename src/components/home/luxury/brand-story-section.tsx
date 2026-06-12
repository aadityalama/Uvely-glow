import Image from "next/image";
import Link from "next/link";

export function BrandStorySection() {
  return (
    <section className="bg-ivory py-16 sm:py-24">
      <div className="mx-auto grid max-w-[88rem] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-blush shadow-lg sm:aspect-[5/6]">
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
          <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-rose-gold sm:text-xs">
            Maison Uvely
          </p>
          <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-deep sm:text-4xl md:text-5xl">
            Born in Seoul. Polished for the world.
          </h2>
          <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted sm:text-base">
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
