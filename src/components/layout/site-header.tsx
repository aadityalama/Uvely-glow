"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signOutAction } from "@/app/actions/auth";
import { UvelyLogo } from "@/components/brand/uvely-logo";
import { StorefrontTrustBar } from "@/components/home/storefront-trust-bar";
import { Container } from "@/components/layout/container";
import { HeaderLanguageSwitch } from "@/components/layout/header-language-switch";
import { HeaderLocaleDropdown } from "@/components/layout/header-locale-dropdown";
import { CategoriesMegaMenu } from "@/components/layout/shop-mega-menu";
import { REFERENCE_MEGA_MENU } from "@/config/storefront-mega-menu";
import { useCart } from "@/context/cart-context";
import { useSession } from "@/context/session-context";
import { useWishlist } from "@/context/wishlist-context";
import type { StoreLocale } from "@/lib/i18n/constants";
import type { StoreMessages } from "@/lib/i18n/store-messages";
import { cn } from "@/lib/utils";

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

function IconTruckTiny(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M3 7h11v10H3V7Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path
        d="M14 10h3l3 3v4h-3"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <circle cx="7.5" cy="18" r="1.5" fill="currentColor" />
      <circle cx="17" cy="18" r="1.5" fill="currentColor" />
    </svg>
  );
}

function IconShieldTiny(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M12 3 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-3Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconLeafTiny(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M6 20s10-2 12-12C8 10 6 20 6 20Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path d="M6 20c2-4 6-7 12-8" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  );
}

function IconPinTiny(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.25" stroke="currentColor" strokeWidth="1.35" />
    </svg>
  );
}

function IconChevronTiny(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SiteHeader({
  serverCartCount,
  serverWishlistCount,
  locale,
  messages: t,
}: {
  serverCartCount?: number;
  serverWishlistCount?: number;
  locale: StoreLocale;
  messages: StoreMessages;
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

  const megaModel = useMemo(
    () => ({
      skincare: [...REFERENCE_MEGA_MENU.skincare],
      makeup: [...REFERENCE_MEGA_MENU.makeup],
      hairBody: [...REFERENCE_MEGA_MENU.hairBody],
      collections: [...REFERENCE_MEGA_MENU.collections],
      mega: t.mega,
    }),
    [t.mega],
  );

  const navRest = [
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
      "shrink-0 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted transition hover:text-accent xl:text-[11px] xl:tracking-[0.1em]",
      active ? "text-accent" : "text-muted",
    );
  }

  return (
    <header className="sticky top-0 z-50 isolate bg-white shadow-[0_1px_0_rgba(0,0,0,0.06)]">
      <div className="bg-zinc-950 text-white">
        <Container className="flex h-[var(--store-announcement-h)] max-w-[1200px] items-center gap-3 px-5 sm:px-8 lg:px-10">
          <div className="scrollbar-hide flex min-w-0 flex-1 items-center gap-x-0 overflow-x-auto whitespace-nowrap py-0 text-[10px] font-semibold uppercase tracking-[0.14em] sm:gap-x-0">
            <span className="inline-flex shrink-0 items-center gap-1.5 pr-2 sm:pr-4">
              <IconTruckTiny className="h-3.5 w-3.5 shrink-0 text-white/85" />
              {t.announcement.freeShipping}
            </span>
            <span className="hidden h-3 w-px shrink-0 bg-white/25 sm:block" aria-hidden />
            <span className="inline-flex shrink-0 items-center gap-1.5 px-2 sm:px-4">
              <IconShieldTiny className="h-3.5 w-3.5 shrink-0 text-white/85" />
              {t.announcement.authentic}
            </span>
            <span className="hidden h-3 w-px shrink-0 bg-white/25 sm:block" aria-hidden />
            <span className="inline-flex shrink-0 items-center gap-1.5 px-2 sm:px-4">
              <IconLeafTiny className="h-3.5 w-3.5 shrink-0 text-white/85" />
              {t.announcement.pureKorean}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-4 sm:gap-5">
            <span className="hidden items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85 lg:inline-flex">
              <IconPinTiny className="h-3.5 w-3.5 text-white/80" aria-hidden />
              {t.announcement.location}
              <IconChevronTiny className="h-3 w-3 text-white/45" aria-hidden />
            </span>
            <HeaderLocaleDropdown
              locale={locale}
              englishPrimaryLabel={t.footer.langEnglishPrimary}
              koreanSecondaryLabel={t.footer.langKoreanSecondary}
              currentLabel={locale === "ko" ? t.tools.korean : t.tools.english}
              ariaLabel={t.tools.language}
            />
          </div>
        </Container>
      </div>

      <Container className="flex h-[var(--store-nav-h)] max-w-[1200px] items-center gap-4 px-5 sm:gap-5 sm:px-8 lg:px-10">
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-zinc-300 bg-white text-foreground md:hidden"
            aria-label={t.tools.openMenu}
            onClick={() => setOpen(true)}
          >
            <span className="block h-0.5 w-5 bg-foreground" />
          </button>
          <UvelyLogo size="sm" href="/" wordmarkOnly className="sm:hidden" />
          <UvelyLogo size="sm" href="/" wordmarkOnly className="hidden sm:flex md:hidden" />
          <UvelyLogo size="md" href="/" wordmarkOnly className="hidden md:flex" />
        </div>

        <nav
          aria-label="Primary"
          className="relative z-20 hidden min-w-0 flex-1 md:flex md:justify-center md:overflow-visible"
        >
          <div className="flex w-max max-w-full flex-none flex-nowrap items-center gap-x-2 md:gap-x-2.5 lg:gap-x-3 xl:gap-x-4">
            <Link href="/products" className={cn(linkClass("/products"), "inline-flex items-center gap-1")}>
              {t.nav.shop}
              <span className="text-[9px] leading-none text-zinc-400" aria-hidden>
                ▾
              </span>
            </Link>
            <CategoriesMegaMenu
              categoriesHref="/categories"
              categoriesLabel={t.nav.categories}
              mega={megaModel.mega}
              skincareLinks={megaModel.skincare}
              makeupLinks={megaModel.makeup}
              hairBodyLinks={megaModel.hairBody}
              collectionItems={megaModel.collections}
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
                className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted transition hover:text-accent xl:text-[11px] xl:tracking-[0.1em]"
              >
                {t.nav.admin}
              </Link>
            ) : null}
          </div>
        </nav>

        <div className="relative z-10 ml-auto flex min-w-0 shrink-0 items-center justify-end gap-1.5 sm:gap-2 md:ml-0 md:gap-3">
          <form
            action={searchHref}
            className="relative hidden w-[180px] shrink-0 sm:block lg:w-[220px] xl:w-[248px]"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = searchHref;
            }}
          >
            <input
              name="q"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t.tools.searchPlaceholder}
              className="h-10 w-full rounded-full border border-zinc-200 bg-zinc-100/70 pl-4 pr-11 text-[13px] text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:ring-1 focus:ring-zinc-900/10"
            />
            <IconSearch className="pointer-events-none absolute right-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500" />
          </form>
          <Link
            href="/wishlist"
            className="relative inline-flex h-10 w-10 items-center justify-center text-zinc-900 transition hover:text-zinc-600"
            aria-label={t.tools.wishlist}
          >
            <IconHeart className="h-[19px] w-[19px]" />
            {wishlistCount > 0 ? (
              <span className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#c9a57a] px-1 text-[10px] font-semibold text-white">
                {wishlistCount > 9 ? "9+" : wishlistCount}
              </span>
            ) : null}
          </Link>
          <Link
            href="/cart"
            className="relative inline-flex h-10 w-10 items-center justify-center text-zinc-900 transition hover:text-zinc-600"
            aria-label={t.tools.cart}
          >
            <IconBag className="h-[19px] w-[19px]" />
            {cartCount > 0 ? (
              <span className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#c9a57a] px-1 text-[10px] font-semibold text-white">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            ) : null}
          </Link>
        </div>
      </Container>

      <StorefrontTrustBar trust={t.trustBar} />

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 md:hidden"
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
                  className="rounded-sm border border-zinc-300 px-3 py-1 text-xs uppercase tracking-widest"
                  onClick={() => setOpen(false)}
                >
                  {t.tools.closeMenu}
                </button>
              </div>
              <div className="flex items-center justify-between gap-2 border-b border-zinc-200 pb-4">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  {t.tools.language}
                </span>
                <HeaderLanguageSwitch
                  variant="onLight"
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
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={t.tools.searchPlaceholder}
                  className="h-10 w-full rounded-full border border-zinc-300 bg-white pl-4 pr-11 text-[13px] outline-none"
                />
                <IconSearch className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              </form>
              <div className="flex flex-col gap-1">
                <Link
                  href="/products"
                  className="text-lg font-medium"
                  onClick={() => setOpen(false)}
                >
                  {t.nav.shop}
                </Link>
                <Link
                  href="/categories"
                  className="text-lg font-medium"
                  onClick={() => setOpen(false)}
                >
                  {t.nav.categories}
                </Link>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
                  {t.mega.skincare}
                </p>
                <div className="ml-2 flex flex-col gap-2 border-l border-zinc-200 pl-3">
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
                <div className="ml-2 flex flex-col gap-2 border-l border-zinc-200 pl-3">
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
                <div className="ml-2 flex flex-col gap-2 border-l border-zinc-200 pl-3">
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
                <div className="ml-2 flex flex-col gap-2 border-l border-zinc-200 pl-3">
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
              <div className="flex flex-col gap-3 border-t border-zinc-200 pt-4">
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
