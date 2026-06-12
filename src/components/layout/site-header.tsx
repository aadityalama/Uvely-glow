"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signOutAction } from "@/app/actions/auth";
import { UvelyLogo } from "@/components/brand/uvely-logo";
import { Container } from "@/components/layout/container";
import { useCart } from "@/context/cart-context";
import { useSession } from "@/context/session-context";
import { useWishlist } from "@/context/wishlist-context";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/products", label: "Shop" },
  { href: "/categories", label: "Categories" },
  { href: "/quiz", label: "Skin quiz" },
  { href: "/blog", label: "Blog" },
  { href: "/brands", label: "Brands" },
  { href: "/account", label: "Account" },
];

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

export function SiteHeader({
  serverCartCount,
  serverWishlistCount,
}: {
  serverCartCount?: number;
  serverWishlistCount?: number;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const { count: clientCartCount } = useCart();
  const { ids } = useWishlist();
  const { email } = useSession();

  const cartCount =
    typeof serverCartCount === "number" ? serverCartCount : clientCartCount;
  const wishlistCount =
    typeof serverWishlistCount === "number" ? serverWishlistCount : ids.length;

  const searchHref = useMemo(() => {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    return `/products${params.toString() ? `?${params}` : ""}`;
  }, [q]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-background/90 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-[4.25rem]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-card text-foreground md:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <span className="block h-0.5 w-5 bg-foreground" />
          </button>
          <UvelyLogo size="sm" href="/" className="sm:hidden" />
          <UvelyLogo size="md" href="/" className="hidden sm:flex" />
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium tracking-wide transition hover:text-accent",
                pathname === item.href || pathname.startsWith(`${item.href}/`)
                  ? "text-accent"
                  : "text-muted",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/admin"
            className="text-sm font-medium tracking-wide text-muted transition hover:text-foreground"
          >
            Admin
          </Link>
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2 sm:flex-none sm:gap-3">
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
                Log out
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className="hidden rounded-full border border-line px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted transition hover:border-accent/40 hover:text-accent lg:inline-block"
            >
              Log in
            </Link>
          )}
          <form
            action={searchHref}
            className="relative hidden max-w-xs flex-1 sm:block"
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
              placeholder="Search K-beauty…"
              className="h-10 w-full rounded-full border border-line bg-card pl-10 pr-4 text-sm outline-none transition focus:border-foreground/40 focus:ring-2 focus:ring-accent-soft"
            />
          </form>
          <Link
            href="/wishlist"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-card text-foreground transition hover:border-accent/40 hover:text-accent"
            aria-label="Wishlist"
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
            aria-label="Cart"
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
              className="absolute left-0 top-0 flex h-full w-[min(100%,20rem)] flex-col gap-6 bg-background p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xl">Menu</span>
                <button
                  type="button"
                  className="rounded-full border border-line px-3 py-1 text-xs uppercase tracking-widest"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
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
                  placeholder="Search…"
                  className="h-11 w-full rounded-full border border-line bg-card pl-10 pr-4 text-sm outline-none"
                />
              </form>
              <div className="flex flex-col gap-4">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/admin"
                  className="text-lg font-medium text-muted"
                  onClick={() => setOpen(false)}
                >
                  Admin
                </Link>
                {email ? (
                  <form action={signOutAction}>
                    <button type="submit" className="text-lg font-medium text-accent">
                      Log out
                    </button>
                  </form>
                ) : (
                  <Link href="/login" className="text-lg font-medium text-accent">
                    Log in
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
