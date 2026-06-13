"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import type { StoreMessages } from "@/lib/i18n/store-messages";
import { cn } from "@/lib/utils";

const HERO_SLIDES = [
  "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=2400&q=88",
  "https://images.unsplash.com/photo-1612817283660-dbee81158fad?auto=format&fit=crop&w=2400&q=88",
  "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=2400&q=88",
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=2400&q=88",
] as const;

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-zinc-800" aria-hidden>
      <path
        d={dir === "left" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LuxuryFullscreenHero({ hero }: { hero: StoreMessages["hero"] }) {
  const [slide, setSlide] = useState(0);
  const total = HERO_SLIDES.length;

  const prev = useCallback(() => setSlide((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setSlide((i) => (i + 1) % total), [total]);

  const src = HERO_SLIDES[slide];

  return (
    <section className="relative min-h-[calc(100dvh-var(--store-header-total))] w-full overflow-hidden bg-[#f4f1ec]">
      <Image
        key={src}
        src={src}
        alt="K-beauty products and textures — Uvely Glow hero"
        fill
        priority={slide === 0}
        sizes="100vw"
        className="object-cover object-[center_42%] sm:object-[center_38%]"
      />
      {/* Layered white veils — readability without flattening photography */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_115%_90%_at_0%_45%,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.72)_38%,rgba(255,255,255,0.28)_62%,transparent_78%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/88 to-white/15"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/45 via-transparent to-white/25"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/20"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[calc(100dvh-var(--store-header-total))] flex-col justify-between px-5 pb-10 pt-12 sm:px-8 sm:pb-12 sm:pt-14 lg:px-12 lg:pb-14 lg:pt-16">
        <div className="mx-auto w-full max-w-[1200px] flex-1">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-[#6b5420] sm:text-xs">
            {hero.eyebrow}
          </p>
          <h1 className="mt-5 max-w-[42rem] font-display text-[2.625rem] font-extrabold leading-[1.05] tracking-[-0.035em] text-zinc-950 [text-shadow:0_1px_0_rgba(255,255,255,0.92),0_2px_28px_rgba(255,255,255,0.7)] sm:text-5xl md:text-[3.25rem] lg:text-[72px] xl:text-[5rem] xl:leading-[1.02]">
            {hero.titleLine}
          </h1>
          <p className="mt-7 max-w-xl text-[20px] font-medium leading-[1.85] text-zinc-900 text-pretty antialiased sm:max-w-[36rem] lg:text-[21px] lg:leading-[1.9]">
            {hero.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3 sm:mt-12 sm:gap-4">
            <Link
              href="/products"
              className="inline-flex h-12 min-w-[11.5rem] items-center justify-center rounded-full bg-zinc-950 px-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-[var(--luxury-shadow-sm)] transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 sm:h-[3.25rem] sm:min-w-[13rem]"
            >
              {hero.ctaShop}
            </Link>
            <Link
              href="/quiz"
              className="inline-flex h-12 min-w-[10rem] items-center justify-center rounded-full border-2 border-zinc-900/90 bg-white/95 px-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-950 shadow-[var(--luxury-shadow-sm)] backdrop-blur-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 sm:h-[3.25rem]"
            >
              {hero.ctaQuiz}
            </Link>
          </div>
        </div>

        <div className="relative mx-auto mt-12 w-full max-w-[1200px] pb-3">
          <button
            type="button"
            onClick={prev}
            className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/70 text-zinc-900 shadow-[var(--luxury-shadow-sm)] backdrop-blur-md transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30 focus-visible:ring-offset-2 sm:left-4 sm:h-14 sm:w-14 md:left-6"
            aria-label="Previous slide"
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/70 text-zinc-900 shadow-[var(--luxury-shadow-sm)] backdrop-blur-md transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30 focus-visible:ring-offset-2 sm:right-4 sm:h-14 sm:w-14 md:right-6"
            aria-label="Next slide"
          >
            <Chevron dir="right" />
          </button>

          <div className="flex justify-center gap-2.5 px-14 pb-1 pt-8 sm:px-16 md:px-20">
            {HERO_SLIDES.map((id, i) => (
              <button
                key={id}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={slide === i}
                onClick={() => setSlide(i)}
                className={cn(
                  "h-2.5 w-2.5 rounded-full border-2 border-white/90 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 sm:h-3 sm:w-3",
                  slide === i ? "bg-white shadow-sm" : "bg-white/25 hover:bg-white/50",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
