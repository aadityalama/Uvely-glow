"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Container } from "@/components/layout/container";
import type { FeaturedBrandPreview } from "@/lib/home/featured-brand-previews";
import type { StoreMessages } from "@/lib/i18n/store-messages";
import { cn, formatKRW } from "@/lib/utils";

const PANEL_TRANSITION = { duration: 0.24, ease: [0.22, 1, 0.36, 1] as const };

export function StorefrontBrandStrip({
  title,
  brands,
}: {
  title: StoreMessages["brands"]["title"];
  brands: FeaturedBrandPreview[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const panelHeadingId = useId();

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setActiveId(null), 220);
  }, [clearCloseTimer]);

  const openBrand = useCallback(
    (id: string) => {
      clearCloseTimer();
      setActiveId(id);
    },
    [clearCloseTimer],
  );

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  useEffect(() => {
    if (!activeId) return;
    const onResize = () => setActiveId(null);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeId]);

  useEffect(() => {
    if (!activeId) return;
    const onDocDown = (e: MouseEvent) => {
      const el = rootRef.current;
      if (el && !el.contains(e.target as Node)) setActiveId(null);
    };
    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, [activeId]);

  const active = brands.find((b) => b.id === activeId) ?? null;

  return (
    <section className="border-y border-zinc-200/90 bg-white py-8 sm:py-12">
      <Container className="max-w-[1200px]">
        {title ? (
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.32em] text-zinc-600">
            {title}
          </p>
        ) : null}

        <div ref={rootRef} className={cn("relative", title ? "mt-5" : "mt-0")}>
          <div
            className={cn(
              "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-5 md:gap-3 lg:gap-5",
            )}
          >
            {brands.map((brand, i) => {
              const isActive = activeId === brand.id;
              return (
                <button
                  key={brand.id}
                  type="button"
                  aria-expanded={isActive}
                  aria-controls={isActive ? `${panelHeadingId}-${brand.id}` : undefined}
                  className={cn(
                    "group flex min-h-[3.5rem] w-full flex-col items-center justify-center rounded-2xl border border-zinc-200/90 bg-gradient-to-b from-white to-zinc-50/90 px-3 py-3 text-center text-[12px] font-semibold leading-snug tracking-wide text-zinc-900 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_1px_2px_rgba(15,10,12,0.04)] transition sm:min-h-[3.75rem] sm:px-4 sm:text-[13px] md:min-h-0 md:py-3.5",
                    "hover:border-rose-gold/40 hover:text-accent hover:shadow-[var(--luxury-shadow-sm)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/25 focus-visible:ring-offset-2",
                    isActive && "border-rose-gold/45 text-accent shadow-[var(--luxury-shadow-sm)]",
                    i === brands.length - 1 && "col-span-2 justify-self-center sm:col-span-1",
                  )}
                  onMouseEnter={() => openBrand(brand.id)}
                  onMouseLeave={scheduleClose}
                  onClick={() => setActiveId((cur) => (cur === brand.id ? null : brand.id))}
                >
                  <span className="text-balance">{brand.displayName}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.id}
                role="region"
                aria-labelledby={`${panelHeadingId}-${active.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={PANEL_TRANSITION}
                className="absolute left-0 right-0 top-full z-40 pt-3 before:absolute before:inset-x-0 before:-top-3 before:h-3 before:content-['']"
                onMouseEnter={clearCloseTimer}
                onMouseLeave={scheduleClose}
              >
                <div className="rounded-2xl border border-zinc-200/90 bg-white/98 p-4 shadow-[var(--luxury-shadow-lg)] ring-1 ring-black/[0.04] backdrop-blur-sm sm:p-5">
                  <div className="flex flex-col gap-1 border-b border-zinc-100 pb-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p
                        id={`${panelHeadingId}-${active.id}`}
                        className="text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-500"
                      >
                        Curated for you
                      </p>
                      <p className="mt-1 font-display text-lg font-semibold tracking-tight text-deep sm:text-xl">
                        {active.displayName}
                      </p>
                    </div>
                    <Link
                      href={`/products?q=${encodeURIComponent(active.catalogQuery)}`}
                      className="mt-2 inline-flex shrink-0 items-center justify-center self-start rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-800 transition hover:border-rose-gold/40 hover:bg-white hover:text-accent sm:mt-0"
                    >
                      Shop all {active.displayName}
                    </Link>
                  </div>

                  {active.products.length > 0 ? (
                    <div className="scrollbar-hide mt-4 flex gap-3 overflow-x-auto pb-1 pt-0.5">
                      {active.products.map((p) => (
                        <Link
                          key={p.id}
                          href={`/products/${p.slug}`}
                          className="group/card w-[6.75rem] shrink-0 sm:w-[7.25rem]"
                        >
                          <div className="relative aspect-square overflow-hidden rounded-xl border border-zinc-100 bg-zinc-50 shadow-sm transition group-hover/card:border-rose-gold/30 group-hover/card:shadow-md">
                            <Image
                              src={p.imageUrl}
                              alt={p.name}
                              fill
                              sizes="120px"
                              className="object-cover transition duration-300 group-hover/card:scale-[1.04]"
                            />
                          </div>
                          <p className="mt-2 line-clamp-2 text-left text-[11px] font-medium leading-snug text-zinc-900 sm:text-xs">
                            {p.name}
                          </p>
                          <p className="mt-1 text-left text-[10px] font-semibold text-zinc-600 sm:text-[11px]">
                            {formatKRW(p.priceKrw)}
                          </p>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-4 text-sm text-zinc-600">
                      New arrivals from {active.displayName} are on the way. Browse the full catalog to
                      explore similar routines.
                    </p>
                  )}

                  <div className="mt-4 flex justify-end border-t border-zinc-100 pt-3">
                    <Link
                      href={`/products?q=${encodeURIComponent(active.catalogQuery)}`}
                      className="text-[11px] font-semibold text-accent underline-offset-4 transition hover:underline"
                    >
                      View all results →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
