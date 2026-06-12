import Image from "next/image";
import Link from "next/link";
import { UvelyLogo } from "@/components/brand/uvely-logo";
import { ButtonLink } from "@/components/ui/button";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=2400&q=88";

export function LuxuryFullscreenHero() {
  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-deep">
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

      <div className="relative z-10 flex min-h-[100dvh] flex-col justify-between px-5 pb-10 pt-28 sm:px-8 sm:pb-14 sm:pt-32 lg:px-12">
        <header className="mx-auto flex w-full max-w-[88rem] flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <UvelyLogo size="hero" href="/" inverted className="drop-shadow-md" />
          <p className="max-w-md font-sans text-sm font-medium leading-relaxed text-white/85 sm:text-base lg:text-right lg:text-white/80">
            Dermatologist-informed formulas, Seoul sourcing, and textures that
            melt like silk. This is K-beauty elevated for the modern luxury
            wardrobe.
          </p>
        </header>

        <div className="mx-auto w-full max-w-[88rem]">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.5em] text-champagne sm:text-xs">
            The glass-skin collection
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Radiance, distilled in{" "}
            <span className="italic text-blush">Seoul</span>.
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
            Full-screen luxury. Micro-layered hydration. Finishes that read
            expensive on camera—and unforgettable in person.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <ButtonLink
              href="/products"
              className="rounded-full border-0 bg-gradient-to-r from-champagne via-rose-gold-light to-rose-gold px-9 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-deep shadow-lg shadow-deep/25 hover:opacity-95"
            >
              Shop bestsellers
            </ButtonLink>
            <ButtonLink
              href="/quiz"
              variant="outline"
              className="rounded-full border-white/40 bg-white/10 px-9 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md hover:border-white/60 hover:bg-white/15"
            >
              Skin ritual quiz
            </ButtonLink>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[88rem] flex-col items-start justify-between gap-6 border-t border-white/15 pt-8 text-xs text-white/55 sm:flex-row sm:items-center">
          <p className="font-medium uppercase tracking-[0.35em]">
            Complimentary shipping · Authenticity guaranteed
          </p>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 font-semibold uppercase tracking-[0.28em] text-champagne transition hover:text-white"
          >
            Discover the edit
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
