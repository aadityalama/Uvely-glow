"use client";

import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import type { MegaCollectionItem, MegaMenuLink } from "@/config/storefront-mega-menu";
import { cn } from "@/lib/utils";
import type { StoreMessages } from "@/lib/i18n/store-messages";

export type MegaMenuCopy = StoreMessages["mega"];

function IconSkincareColumn({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 3v18M9 6h6M8 21h8"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M10 6c0-1.1.9-2 2-2s2 .9 2 2v3H10V6Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMakeupColumn({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="5" y="5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.35" />
      <circle cx="12" cy="12" r="3.25" stroke="currentColor" strokeWidth="1.35" />
    </svg>
  );
}

function IconPumpColumn({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M9 4h6v3H9V4ZM8 7h8v13a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V7Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path d="M10 11h4" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  );
}

export function CategoriesMegaMenu({
  categoriesHref,
  categoriesLabel,
  mega,
  skincareLinks,
  makeupLinks,
  hairBodyLinks,
  collectionItems,
  promoImageSrc,
  promoImageAlt,
}: {
  categoriesHref: string;
  categoriesLabel: string;
  mega: MegaMenuCopy;
  skincareLinks: MegaMenuLink[];
  makeupLinks: MegaMenuLink[];
  hairBodyLinks: MegaMenuLink[];
  collectionItems: MegaCollectionItem[];
  promoImageSrc: string;
  promoImageAlt: string;
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearTimer();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }, [clearTimer]);

  const onEnter = useCallback(() => {
    clearTimer();
    setOpen(true);
  }, [clearTimer]);

  function columnHeader(title: string, Icon: ComponentType<{ className?: string }>) {
    return (
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 shrink-0 text-[#b08d55]" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-600">{title}</p>
      </div>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={onEnter}
      onMouseLeave={scheduleClose}
      onFocus={onEnter}
      onBlur={scheduleClose}
    >
      <Link
        href={categoriesHref}
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-2.5 py-2 text-[15px] font-semibold uppercase tracking-[0.06em] text-zinc-700 transition-colors duration-200 hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/25 focus-visible:ring-offset-2 md:px-3 md:tracking-[0.08em]",
          open && "text-accent",
        )}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {categoriesLabel}
        <span className="text-[9px] leading-none text-zinc-400" aria-hidden>
          ▾
        </span>
      </Link>

      <div
        className={cn(
          /* Viewport-centered panel: absolute % is relative to the narrow trigger and skews the flyout right */
          "pointer-events-none fixed left-1/2 top-[calc(var(--store-announcement-h)+var(--store-nav-h)+0.25rem)] z-[60] w-[min(100vw-1.5rem,1120px)] -translate-x-1/2 pt-[10px] opacity-0 transition duration-150",
          open && "pointer-events-auto opacity-100",
        )}
        onMouseEnter={onEnter}
        onMouseLeave={scheduleClose}
      >
        <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-[var(--luxury-shadow-lg)] sm:rounded-3xl">
          <div className="overflow-x-auto overscroll-x-contain px-3 sm:px-4">
            <div className="mx-auto grid w-full min-w-[920px] max-w-[1040px] grid-cols-[repeat(4,minmax(0,1fr))_minmax(208px,238px)] gap-0">
              <div className="border-b border-zinc-100 px-4 py-6 sm:px-5 sm:py-7 lg:border-b-0 lg:border-r lg:border-zinc-100">
                {columnHeader(mega.skincare, IconSkincareColumn)}
                <ul className="mt-4 space-y-0">
                  {skincareLinks.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="block py-[5px] text-[13px] font-medium leading-snug text-zinc-900 transition hover:text-[#b08d55]"
                        onClick={() => setOpen(false)}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/categories"
                  className="mt-5 inline-block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b08d55] transition hover:underline"
                  onClick={() => setOpen(false)}
                >
                  {mega.viewAllSkincare}
                </Link>
              </div>

              <div className="border-b border-zinc-100 px-4 py-6 sm:px-5 sm:py-7 lg:border-b-0 lg:border-r lg:border-zinc-100">
                {columnHeader(mega.makeup, IconMakeupColumn)}
                <ul className="mt-4 space-y-0">
                  {makeupLinks.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="block py-[5px] text-[13px] font-medium leading-snug text-zinc-900 transition hover:text-[#b08d55]"
                        onClick={() => setOpen(false)}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/products?q=makeup"
                  className="mt-5 inline-block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b08d55] transition hover:underline"
                  onClick={() => setOpen(false)}
                >
                  {mega.viewAllMakeup}
                </Link>
              </div>

              <div className="border-b border-zinc-100 px-4 py-6 sm:px-5 sm:py-7 lg:border-b-0 lg:border-r lg:border-zinc-100">
                {columnHeader(mega.hairBody, IconPumpColumn)}
                <ul className="mt-4 space-y-0">
                  {hairBodyLinks.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="block py-[5px] text-[13px] font-medium leading-snug text-zinc-900 transition hover:text-[#b08d55]"
                        onClick={() => setOpen(false)}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/products?q=body"
                  className="mt-5 inline-block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b08d55] transition hover:underline"
                  onClick={() => setOpen(false)}
                >
                  {mega.viewAllHairBody}
                </Link>
              </div>

              <div className="border-b border-zinc-100 px-4 py-6 sm:px-5 sm:py-7 lg:border-b-0 lg:border-r lg:border-zinc-100">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-600">{mega.collections}</p>
                <ul className="mt-4 space-y-3">
                  {collectionItems.map((c) => (
                    <li key={c.href}>
                      <Link
                        href={c.href}
                        className="group flex items-start gap-3 rounded-md py-0.5 transition hover:bg-zinc-50"
                        onClick={() => setOpen(false)}
                      >
                        <span className="relative mt-0.5 block h-11 w-11 shrink-0 overflow-hidden rounded-full border border-zinc-200 bg-zinc-100">
                          <Image
                            src={c.imageSrc}
                            alt={c.label}
                            fill
                            className="object-cover"
                            sizes="44px"
                          />
                        </span>
                        <span className="min-w-0 pt-0.5">
                          <span className="block text-[13px] font-medium leading-tight text-zinc-900 group-hover:text-[#b08d55]">
                            {c.label}
                          </span>
                          <span className="mt-0.5 block text-[12px] leading-snug text-zinc-600">{c.hint}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-b border-zinc-100 p-3 sm:p-4 lg:border-b-0 lg:pl-3 lg:pr-4">
                <Link
                  href="/products"
                  className="group relative flex aspect-[238/380] w-full flex-col justify-end overflow-hidden rounded-2xl border border-zinc-200/90 bg-zinc-100 shadow-[var(--luxury-shadow-sm)]"
                  onClick={() => setOpen(false)}
                >
                  <Image
                    src={promoImageSrc}
                    alt={promoImageAlt}
                    fill
                    className="object-cover object-center transition duration-500 group-hover:scale-[1.02]"
                    sizes="238px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <div className="relative z-10 p-4">
                    <p className="text-[11px] font-semibold uppercase leading-snug tracking-[0.2em] text-white">
                      {mega.promoTitle}
                    </p>
                    <p className="mt-2 text-[13px] font-medium leading-snug text-white/95">{mega.promoBody}</p>
                    <span className="mt-4 inline-flex h-9 items-center justify-center rounded-full bg-zinc-950 px-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition group-hover:bg-zinc-800">
                      {mega.promoCta}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
