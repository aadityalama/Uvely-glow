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

  function column(
    title: string,
    links: MegaLink[],
    viewHref: string,
    opts?: { collectionsPanel?: boolean },
  ) {
    const panel = opts?.collectionsPanel;
    return (
      <div
        className={cn(
          "min-w-0",
          panel &&
            "rounded-md border border-zinc-200 bg-zinc-50/90 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]",
        )}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">{title}</p>
        <ul className={cn("mt-3 space-y-1.5", panel && "mt-4")}>
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={cn(
                  "block py-0.5 text-[13px] leading-snug text-zinc-900 transition hover:text-accent",
                  panel && "rounded-sm px-1 py-1 hover:bg-white/80",
                )}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={viewHref}
          className="mt-4 inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-accent transition hover:underline"
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
          "inline-flex items-center gap-1 text-[13px] font-medium tracking-wide text-muted transition hover:text-accent",
          open && "text-accent",
        )}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {shopLabel}
        <span className="text-[9px] leading-none opacity-60" aria-hidden>
          ▾
        </span>
      </Link>

      <div
        className={cn(
          "pointer-events-none absolute left-1/2 top-full z-50 w-[min(100vw-1.5rem,1200px)] -translate-x-1/2 pt-2 opacity-0 transition duration-150",
          open && "pointer-events-auto opacity-100",
        )}
        onMouseEnter={onEnter}
        onMouseLeave={scheduleClose}
      >
        <div className="border border-zinc-200 bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.18)]">
          <div className="overflow-x-auto">
            <div className="grid min-w-[960px] gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_220px] lg:items-stretch">
            <div className="border-b border-zinc-100 p-6 lg:border-b-0 lg:border-r lg:py-8 lg:pl-8 lg:pr-6">
              {column(mega.skincare, skincareLinks, "/categories")}
            </div>
            <div className="border-b border-zinc-100 p-6 lg:border-b-0 lg:border-r lg:py-8 lg:px-6">
              {column(mega.makeup, makeupLinks, "/products?q=base")}
            </div>
            <div className="border-b border-zinc-100 p-6 lg:border-b-0 lg:border-r lg:py-8 lg:px-6">
              {column(mega.hairBody, hairBodyLinks, "/products?q=body")}
            </div>
            <div className="border-b border-zinc-100 p-6 lg:border-b-0 lg:border-r lg:py-8 lg:px-6">
              {column(mega.collections, collectionLinks, "/bestsellers", { collectionsPanel: true })}
            </div>
            <div className="p-4 lg:p-4 lg:pr-4">
              <Link
                href="/products"
                className="group relative flex h-full min-h-[260px] flex-col justify-end overflow-hidden border border-zinc-200 bg-zinc-100 lg:min-h-[300px]"
                onClick={() => setOpen(false)}
              >
                <Image
                  src={promoImageSrc}
                  alt={promoImageAlt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  sizes="220px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
                <div className="relative z-10 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-champagne">
                    {mega.promoTitle}
                  </p>
                  <p className="mt-2 text-[13px] font-medium leading-snug text-white">{mega.promoBody}</p>
                  <span className="mt-3 inline-flex text-[10px] font-semibold uppercase tracking-[0.2em] text-white underline-offset-4 group-hover:underline">
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
