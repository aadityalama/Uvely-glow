import Image from "next/image";
import Link from "next/link";
import { UvelyLogo } from "@/components/brand/uvely-logo";
import type { StoreMessages } from "@/lib/i18n/store-messages";
import { cn } from "@/lib/utils";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=2400&q=88";

export function LuxuryFullscreenHero({ hero }: { hero: StoreMessages["hero"] }) {
  return (
    <section className="relative min-h-[calc(100dvh-var(--store-header-total))] w-full overflow-hidden bg-deep">
      <Image
        src={HERO_IMAGE}
        alt="Portrait of a model with refined makeup and luminous skin representing Uvely Glow Korean beauty"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_22%] sm:object-[center_18%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/55 to-deep/25 sm:via-deep/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-deep/80 via-transparent to-deep/30" />

      <div className="relative z-10 flex min-h-[calc(100dvh-var(--store-header-total))] flex-col justify-between px-5 pb-10 pt-8 sm:px-8 sm:pb-12 sm:pt-10 lg:px-12">
        <header className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <UvelyLogo size="hero" href="/" inverted className="drop-shadow-md" />
          <p className="max-w-md font-sans text-sm font-medium leading-relaxed text-white/85 sm:text-base lg:text-right lg:text-white/80">
            {hero.topIntro}
          </p>
        </header>

        <div className="mx-auto w-full max-w-[1200px]">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.5em] text-champagne sm:text-xs">
            {hero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {hero.titleBefore}{" "}
            <span className="italic text-blush">{hero.titleAccent}</span>
            {hero.titleAfter}
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">{hero.subtitle}</p>
          <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="/products"
              className={cn(
                "inline-flex min-h-[44px] items-center justify-center border border-transparent bg-white px-8 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-deep transition hover:bg-white/90",
              )}
            >
              {hero.ctaShop}
            </Link>
            <Link
              href="/quiz"
              className={cn(
                "inline-flex min-h-[44px] items-center justify-center border border-white/55 bg-transparent px-8 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:border-white hover:bg-white/10",
              )}
            >
              {hero.ctaQuiz}
            </Link>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start justify-between gap-6 border-t border-white/15 pt-8 text-xs text-white/55 sm:flex-row sm:items-center">
          <p className="font-medium uppercase tracking-[0.28em] sm:tracking-[0.35em]">{hero.footerTrust}</p>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 font-semibold uppercase tracking-[0.28em] text-champagne transition hover:text-white"
          >
            {hero.discover}
            <span
              className="inline-block translate-x-0 transition group-hover:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
