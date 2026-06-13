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
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/88 via-white/55 to-white/25" />

      <div className="relative z-10 flex min-h-[calc(100dvh-var(--store-header-total))] flex-col justify-between px-5 pb-8 pt-10 sm:px-8 sm:pb-10 sm:pt-12 lg:px-12">
        <div className="mx-auto w-full max-w-[1200px] flex-1">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.38em] text-[#b08d55] sm:text-[11px]">
            {hero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-[min(34rem,100%)] font-display text-[2.35rem] font-medium leading-[1.08] tracking-tight text-zinc-950 sm:text-5xl md:text-[3.25rem] lg:text-[3.5rem]">
            {hero.titleLine}
          </h1>
          <p className="mt-6 max-w-xl text-[14px] leading-relaxed text-zinc-700 sm:text-[15px]">{hero.subtitle}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4">
            <Link
              href="/products"
              className="inline-flex h-11 min-w-[11rem] items-center justify-center rounded-full bg-zinc-950 px-7 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-zinc-800 sm:h-12 sm:min-w-[12.5rem]"
            >
              {hero.ctaShop}
            </Link>
            <Link
              href="/quiz"
              className="inline-flex h-11 min-w-[9.5rem] items-center justify-center rounded-full border border-zinc-900/90 bg-white/90 px-7 text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-900 shadow-sm backdrop-blur-sm transition hover:bg-white sm:h-12"
            >
              {hero.ctaQuiz}
            </Link>
          </div>
        </div>

        <div className="relative mx-auto mt-10 w-full max-w-[1200px] pb-2">
          <button
            type="button"
            onClick={prev}
            className="absolute left-0 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/55 text-zinc-900 shadow-sm backdrop-blur-md transition hover:bg-white/80 sm:h-14 sm:w-14"
            aria-label="Previous slide"
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-0 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/55 text-zinc-900 shadow-sm backdrop-blur-md transition hover:bg-white/80 sm:h-14 sm:w-14"
            aria-label="Next slide"
          >
            <Chevron dir="right" />
          </button>

          <div className="flex justify-center gap-2 pb-1 pt-6">
            {HERO_SLIDES.map((id, i) => (
              <button
                key={id}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={slide === i}
                onClick={() => setSlide(i)}
                className={cn(
                  "h-2 w-2 rounded-full border border-white/80 transition sm:h-2.5 sm:w-2.5",
                  slide === i ? "bg-white" : "bg-transparent",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
