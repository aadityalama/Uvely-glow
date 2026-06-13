"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type MegaLink = { href: string; label: string };

export type MegaMenuCopy = {
  skincare: string;
  makeup: string;
  hairBody: string;
  collections: string;
  promoTitle: string;
  promoBody: string;
  promoCta: string;
  viewAll: string;
};

export function ShopMegaMenu({
  shopHref,
  shopLabel,
  mega,
  skincareLinks,
  makeupLinks,
  hairBodyLinks,
  collectionLinks,
  promoImageSrc,
  promoImageAlt,
}: {
  shopHref: string;
  shopLabel: string;
  mega: MegaMenuCopy;
  skincareLinks: MegaLink[];
  makeupLinks: MegaLink[];
  hairBodyLinks: MegaLink[];
  collectionLinks: MegaLink[];
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
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  }, [clearTimer]);

  const onEnter = useCallback(() => {
    clearTimer();
    setOpen(true);
  }, [clearTimer]);

  function column(title: string, links: MegaLink[], viewHref: string) {
    return (
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted">{title}</p>
        <ul className="mt-3 space-y-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm text-foreground/90 transition hover:text-accent"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={viewHref}
          className="mt-3 inline-block text-[11px] font-semibold uppercase tracking-[0.18em] text-accent transition hover:underline"
          onClick={() => setOpen(false)}
        >
          {mega.viewAll}
        </Link>
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
        href={shopHref}
        className={cn(
          "inline-flex items-center gap-1 text-sm font-medium tracking-wide text-muted transition hover:text-accent",
          open && "text-accent",
        )}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {shopLabel}
        <span className="text-[10px] opacity-70" aria-hidden>
          ▾
        </span>
      </Link>

      <div
        className={cn(
          "pointer-events-none absolute left-1/2 top-full z-50 w-[min(100vw-2rem,72rem)] -translate-x-1/2 pt-2 opacity-0 transition duration-150",
          open && "pointer-events-auto opacity-100",
        )}
        onMouseEnter={onEnter}
        onMouseLeave={scheduleClose}
      >
        <div className="rounded-xl border border-line bg-card shadow-[0_24px_48px_-12px_rgba(18,15,17,0.18)]">
          <div className="grid gap-8 p-6 sm:grid-cols-2 lg:grid-cols-5 lg:p-8">
            {column(mega.skincare, skincareLinks, "/categories")}
            {column(mega.makeup, makeupLinks, "/products?q=lip")}
            {column(mega.hairBody, hairBodyLinks, "/products?q=hair")}
            {column(mega.collections, collectionLinks, "/products")}
            <Link
              href="/bestsellers"
              className="group relative flex min-h-[220px] flex-col justify-end overflow-hidden rounded-lg border border-line bg-accent-soft/40 p-4 sm:col-span-2 lg:col-span-1"
              onClick={() => setOpen(false)}
            >
              <Image
                src={promoImageSrc}
                alt={promoImageAlt}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                sizes="(min-width: 1024px) 240px, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/85 via-deep/35 to-transparent" />
              <div className="relative z-10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-champagne">
                  {mega.promoTitle}
                </p>
                <p className="mt-2 text-sm font-medium leading-snug text-white">{mega.promoBody}</p>
                <span className="mt-3 inline-flex text-[11px] font-semibold uppercase tracking-[0.2em] text-white underline-offset-4 group-hover:underline">
                  {mega.promoCta}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
