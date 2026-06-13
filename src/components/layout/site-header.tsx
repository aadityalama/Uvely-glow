"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signOutAction } from "@/app/actions/auth";
import { UvelyLogo } from "@/components/brand/uvely-logo";
import { Container } from "@/components/layout/container";
import { HeaderLanguageSwitch } from "@/components/layout/header-language-switch";
import { ShopMegaMenu, type MegaLink } from "@/components/layout/shop-mega-menu";
import { useCart } from "@/context/cart-context";
import { useSession } from "@/context/session-context";
import { useWishlist } from "@/context/wishlist-context";
import type { StoreLocale } from "@/lib/i18n/constants";
import type { StoreMessages } from "@/lib/i18n/store-messages";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";

const PROMO_CARD_IMAGE =
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=85";

function IconBag(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M6 7h15l-1.5 12H7.5L6 7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 7V5a3 3 0 0 1 6 0v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconHeart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M12 21s-7-4.35-7-10a4.5 4.5 0 0 1 8-2.82A4.5 4.5 0 0 1 19 11c0 5.65-7 10-7 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconSearch(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M16 16l4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconPin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2" fill="currentColor" />
    </svg>
  );
}

function buildMegaModel(
  categories: Category[],
  m: StoreMessages["mega"],
): {
  skincare: MegaLink[];
  makeup: MegaLink[];
  hairBody: MegaLink[];
  collections: MegaLink[];
  mega: StoreMessages["mega"];
} {
  const skincare: MegaLink[] = categories.map((c) => ({
    href: `/categories/${c.slug}`,
    label: c.name,
  }));
  const makeup: MegaLink[] = [
    { href: "/products?q=lip", label: "Lip & masks" },
    { href: "/products?q=base", label: "Base & cushion" },
    { href: "/products?q=eye", label: "Eyes & brows" },
    { href: "/products?q=cheek", label: "Cheek & glow" },
  ];
  const hairBody: MegaLink[] = [
    { href: "/products?q=hair", label: "Hair care" },
    { href: "/products?q=scalp", label: "Scalp treatments" },
    { href: "/products?q=body", label: "Body care" },
    { href: "/products?q=hand", label: "Hands & feet" },
  ];
  const collections: MegaLink[] = [
    { href: "/bestsellers", label: "Bestsellers" },
    { href: "/products?sort=featured", label: "Staff picks" },
    { href: "/wishlist", label: "Saved list" },
    { href: "/brands", label: "Shop by brand" },
  ];
  return { skincare, makeup, hairBody, collections, mega: m };
}

export function SiteHeader({
  serverCartCount,
  serverWishlistCount,
  locale,
  messages: t,
  categories,
}: {
  serverCartCount?: number;
  serverWishlistCount?: number;
  locale: StoreLocale;
  messages: StoreMessages;
  categories: Category[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const { count: clientCartCount } = useCart();
  const { ids } = useWishlist();
  const { email, isAdmin } = useSession();

  const cartCount =
    typeof serverCartCount === "number" ? serverCartCount : clientCartCount;
  const wishlistCount =
    typeof serverWishlistCount === "number" ? serverWishlistCount : ids.length;

  const searchHref = useMemo(() => {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    return `/products${params.toString() ? `?${params}` : ""}`;
  }, [q]);

  const megaModel = useMemo(() => buildMegaModel(categories, t.mega), [categories, t.mega]);

  const navRest = [
    { href: "/categories", label: t.nav.categories },
    { href: "/quiz", label: t.nav.skinQuiz },
    { href: "/brands", label: t.nav.brands },
    { href: "/bestsellers", label: t.nav.bestsellers },
    { href: "/blog", label: t.nav.journal },
    { href: "/about", label: t.nav.aboutUs },
  ] as const;

  function linkClass(href: string) {
    const active =
      pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
    return cn(
      "shrink-0 text-sm font-medium tracking-wide transition hover:text-accent",
      active ? "text-accent" : "text-muted",
    );
  }

  return (
    <header className="sticky top-0 z-50 isolate border-b border-line/80 bg-background/95 backdrop-blur-xl">
      <div className="border-b border-white/10 bg-deep text-white">
        <Container className="flex h-9 items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.16em]">
          <div className="scrollbar-hide flex min-w-0 flex-1 items-center gap-3 overflow-x-auto whitespace-nowrap py-1 sm:gap-5">
            <span className="shrink-0 text-white/95">{t.announcement.freeShipping}</span>
            <span className="hidden h-3 w-px shrink-0 bg-white/25 sm:block" aria-hidden />
            <span className="shrink-0 text-white/90">{t.announcement.authentic}</span>
            <span className="hidden h-3 w-px shrink-0 bg-white/25 md:block" aria-hidden />
            <span className="hidden shrink-0 text-white/90 md:inline">{t.announcement.pureKorean}</span>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <span className="hidden items-center gap-1 text-white/85 lg:inline-flex">
              <IconPin className="h-3.5 w-3.5 text-champagne/90" />
              {t.announcement.location}
            </span>
            <HeaderLanguageSwitch
              locale={locale}
              englishLabel={t.tools.english}
              koreanLabel={t.tools.korean}
              ariaLabel={t.tools.language}
            />
          </div>
        </Container>
      </div>

      <Container className="flex h-[var(--store-nav-h)] items-center gap-3 sm:gap-4">
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-card text-foreground md:hidden"
            aria-label={t.tools.openMenu}
            onClick={() => setOpen(true)}
          >
            <span className="block h-0.5 w-5 bg-foreground" />
          </button>
          <UvelyLogo size="sm" href="/" className="sm:hidden" />
          <UvelyLogo size="md" href="/" className="hidden sm:flex" />
        </div>

        <nav
          aria-label="Primary"
          className="relative z-20 hidden min-w-0 flex-1 overflow-x-auto overflow-y-visible scrollbar-hide md:flex md:justify-center"
        >
          <div className="flex w-max max-w-full flex-none flex-nowrap items-center gap-x-5 lg:gap-x-7">
            <ShopMegaMenu
              shopHref="/products"
              shopLabel={t.nav.shop}
              mega={megaModel.mega}
              skincareLinks={megaModel.skincare}
              makeupLinks={megaModel.makeup}
              hairBodyLinks={megaModel.hairBody}
              collectionLinks={megaModel.collections}
              promoImageSrc={PROMO_CARD_IMAGE}
              promoImageAlt={megaModel.mega.promoTitle}
            />
            {navRest.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass(item.href)}>
                {item.label}
              </Link>
            ))}
            {isAdmin ? (
              <Link
                href="/admin"
                prefetch={false}
                className="shrink-0 text-sm font-medium tracking-wide text-muted transition hover:text-accent"
              >
                {t.nav.admin}
              </Link>
            ) : null}
          </div>
        </nav>

        <div className="relative z-10 ml-auto flex min-w-0 shrink-0 items-center justify-end gap-2 sm:gap-3 md:ml-0">
          {email ? (
            <span className="hidden max-w-[10rem] truncate text-xs text-muted lg:inline">
              {email}
            </span>
          ) : null}
          {email ? (
            <form action={signOutAction}>
              <button
                type="submit"
                className="hidden rounded-full border border-line px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted transition hover:border-accent/40 hover:text-accent lg:inline-block"
              >
                {t.tools.logOut}
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className="hidden rounded-full border border-line px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted transition hover:border-accent/40 hover:text-accent lg:inline-block"
            >
              {t.tools.logIn}
            </Link>
          )}
          <form
            action={searchHref}
            className="relative hidden w-full max-w-xs shrink-0 sm:block sm:w-56 md:w-64 lg:max-w-xs"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = searchHref;
            }}
          >
            <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              name="q"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t.tools.searchPlaceholder}
              className="h-10 w-full rounded-full border border-line bg-card pl-10 pr-4 text-sm outline-none transition focus:border-foreground/40 focus:ring-2 focus:ring-accent-soft"
            />
          </form>
          <Link
            href="/wishlist"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-card text-foreground transition hover:border-accent/40 hover:text-accent"
            aria-label={t.tools.wishlist}
          >
            <IconHeart className="h-5 w-5" />
            {wishlistCount > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-white">
                {wishlistCount > 9 ? "9+" : wishlistCount}
              </span>
            ) : null}
          </Link>
          <Link
            href="/cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-card text-foreground transition hover:border-accent/40 hover:text-accent"
            aria-label={t.tools.cart}
          >
            <IconBag className="h-5 w-5" />
            {cartCount > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-deep px-1 text-[10px] font-semibold text-background">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            ) : null}
          </Link>
        </div>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 bg-deep/40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="absolute left-0 top-0 flex h-full w-[min(100%,22rem)] flex-col gap-5 overflow-y-auto bg-background p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xl">{t.tools.menu}</span>
                <button
                  type="button"
                  className="rounded-full border border-line px-3 py-1 text-xs uppercase tracking-widest"
                  onClick={() => setOpen(false)}
                >
                  {t.tools.closeMenu}
                </button>
              </div>
              <div className="flex items-center justify-between gap-2 border-b border-line pb-4">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  {t.tools.language}
                </span>
                <HeaderLanguageSwitch
                  locale={locale}
                  englishLabel={t.tools.english}
                  koreanLabel={t.tools.korean}
                  ariaLabel={t.tools.language}
                />
              </div>
              <form
                className="relative"
                onSubmit={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  window.location.href = searchHref;
                }}
              >
                <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={t.tools.searchPlaceholder}
                  className="h-11 w-full rounded-full border border-line bg-card pl-10 pr-4 text-sm outline-none"
                />
              </form>
              <div className="flex flex-col gap-1">
                <Link
                  href="/products"
                  className="text-lg font-medium"
                  onClick={() => setOpen(false)}
                >
                  {t.nav.shop}
                </Link>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
                  {t.mega.skincare}
                </p>
                <div className="ml-2 flex flex-col gap-2 border-l border-line pl-3">
                  {megaModel.skincare.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="text-sm text-muted"
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
                  {t.mega.makeup}
                </p>
                <div className="ml-2 flex flex-col gap-2 border-l border-line pl-3">
                  {megaModel.makeup.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="text-sm text-muted"
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
                  {t.mega.hairBody}
                </p>
                <div className="ml-2 flex flex-col gap-2 border-l border-line pl-3">
                  {megaModel.hairBody.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="text-sm text-muted"
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
                  {t.mega.collections}
                </p>
                <div className="ml-2 flex flex-col gap-2 border-l border-line pl-3">
                  {megaModel.collections.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="text-sm text-muted"
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 border-t border-line pt-4">
                {navRest.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                {isAdmin ? (
                  <Link
                    href="/admin"
                    className="text-lg font-medium text-muted"
                    prefetch={false}
                    onClick={() => setOpen(false)}
                  >
                    {t.nav.admin}
                  </Link>
                ) : null}
                {email ? (
                  <form action={signOutAction}>
                    <button type="submit" className="text-lg font-medium text-accent">
                      {t.tools.logOut}
                    </button>
                  </form>
                ) : (
                  <Link href="/login" className="text-lg font-medium text-accent">
                    {t.tools.logIn}
                  </Link>
                )}
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
