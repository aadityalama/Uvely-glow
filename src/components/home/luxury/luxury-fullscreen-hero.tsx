"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import type { StoreMessages } from "@/lib/i18n/store-messages";
import { cn } from "@/lib/utils";

/**
 * Premium K-beauty editorial stills (packaging-forward, high-res Unsplash).
 * w=3000 + q=92 for crisp labels and glass on large desktops.
 */
const HERO_SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1741896135518-ce303a539bc0?auto=format&fit=crop&w=3000&q=92",
    objectPosition: "object-cover object-[center_44%] sm:object-[center_40%]",
  },
  {
    src: "https://images.unsplash.com/photo-1741896135490-4062a3b21abf?auto=format&fit=crop&w=3000&q=92",
    objectPosition: "object-cover object-[center_42%] sm:object-[center_38%]",
  },
  {
    src: "https://images.unsplash.com/photo-1741896136069-f3588d8993b5?auto=format&fit=crop&w=3000&q=92",
    objectPosition: "object-cover object-[center_45%] sm:object-[52%_42%]",
  },
  {
    src: "https://images.unsplash.com/photo-1741896135705-9dfb73461085?auto=format&fit=crop&w=3000&q=92",
    objectPosition: "object-cover object-[52%_48%] sm:object-[56%_44%] lg:object-[58%_42%]",
  },
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

  const { src, objectPosition } = HERO_SLIDES[slide];

  return (
    <section className="relative min-h-[calc(100dvh-var(--store-header-total))] w-full overflow-hidden bg-[#f4f1ec]">
      <Image
        key={src}
        src={src}
        alt="Premium Korean skincare bottles and serums — Uvely Glow hero"
        fill
        priority={slide === 0}
        sizes="100vw"
        className={cn("contrast-[1.1] saturate-[1.05]", objectPosition)}
      />

      <div className="relative z-10 flex min-h-[calc(100dvh-var(--store-header-total))] flex-col px-5 pb-8 pt-10 sm:px-8 sm:pb-10 sm:pt-12 lg:px-12 lg:pb-12 lg:pt-14 xl:px-14 xl:pb-12 xl:pt-16 min-[1920px]:px-16">
        <div className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-center lg:max-w-[min(92vw,1280px)] min-[1440px]:max-w-[min(90vw,1360px)] min-[1920px]:max-w-[1400px]">
          <div className="isolate w-full max-w-[min(100%,28rem)] rounded-[1.65rem] bg-white/72 px-6 py-7 shadow-[0_1px_0_rgba(255,255,255,0.65)_inset,0_18px_50px_-28px_rgba(15,10,12,0.2)] ring-1 ring-white/80 backdrop-blur-md sm:max-w-[min(100%,34rem)] sm:rounded-[1.75rem] sm:px-8 sm:py-8 lg:max-w-[min(100%,38rem)] xl:max-w-[min(100%,40rem)]">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-[#6b5420] sm:text-xs">
              {hero.eyebrow}
            </p>
            <h1 className="mt-4 max-w-[40rem] font-display text-[2.3rem] font-extrabold leading-[1.06] tracking-[-0.032em] text-zinc-950 sm:mt-5 sm:text-[2.625rem] sm:leading-[1.05] md:text-[2.85rem] lg:mt-5 lg:text-[3.94rem] lg:leading-[1.04] xl:text-[4.375rem] xl:leading-[1.03] min-[1440px]:text-[4.45rem] 2xl:text-[4.5rem] 2xl:leading-[1.02]">
              {hero.titleLine}
            </h1>
            <p className="mt-5 max-w-xl text-[18px] font-medium leading-[1.75] text-zinc-800 text-pretty antialiased sm:mt-6 sm:max-w-[34rem] sm:text-[19px] sm:leading-[1.82] lg:mt-6 lg:text-[20px] lg:leading-[1.88] xl:text-[21px]">
              {hero.subtitle}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4 lg:mt-9">
              <Link
                href="/products"
                className="inline-flex h-[3.125rem] min-w-[12rem] items-center justify-center rounded-full bg-zinc-950 px-9 text-[11.5px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_2px_6px_rgba(15,10,12,0.14),0_14px_36px_-10px_rgba(15,10,12,0.28)] ring-1 ring-zinc-950/10 transition hover:bg-zinc-800 hover:shadow-[0_4px_12px_rgba(15,10,12,0.16),0_18px_44px_-12px_rgba(15,10,12,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 sm:h-14 sm:min-w-[13.5rem] sm:px-10 sm:text-xs sm:tracking-[0.24em]"
              >
                {hero.ctaShop}
              </Link>
              <Link
                href="/quiz"
                className="inline-flex h-[3.125rem] min-w-[10.5rem] items-center justify-center rounded-full border-[2.5px] border-zinc-950 bg-white px-9 text-[11.5px] font-semibold uppercase tracking-[0.22em] text-zinc-950 shadow-[0_2px_6px_rgba(15,10,12,0.08),0_12px_32px_-12px_rgba(15,10,12,0.2)] backdrop-blur-sm transition hover:bg-zinc-50 hover:shadow-[0_3px_10px_rgba(15,10,12,0.1),0_16px_40px_-12px_rgba(15,10,12,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 sm:h-14 sm:min-w-[11.25rem] sm:px-10 sm:text-xs sm:tracking-[0.24em]"
              >
                {hero.ctaQuiz}
              </Link>
            </div>
          </div>
        </div>

        <div className="relative mx-auto mt-8 w-full max-w-[1280px] shrink-0 pb-2 sm:mt-10 lg:mt-10 min-[1440px]:max-w-[min(90vw,1360px)] min-[1920px]:max-w-[1400px]">
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

          <div className="flex justify-center gap-2.5 px-14 pb-1 pt-6 sm:px-16 sm:pt-7 md:px-20">
            {HERO_SLIDES.map(({ src: slideSrc }, i) => (
              <button
                key={slideSrc}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={slide === i}
                onClick={() => setSlide(i)}
                className={cn(
                  "h-2.5 w-2.5 rounded-full border-2 border-zinc-900/20 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 sm:h-3 sm:w-3",
                  slide === i ? "border-zinc-900 bg-zinc-900 shadow-sm" : "bg-white/70 hover:bg-white",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
