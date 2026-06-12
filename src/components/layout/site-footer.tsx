import Link from "next/link";
import { UvelyLogo } from "@/components/brand/uvely-logo";

const shop = [
  { href: "/products", label: "All products" },
  { href: "/categories", label: "Categories" },
  { href: "/brands", label: "Brands" },
  { href: "/wishlist", label: "Wishlist" },
];

const care = [
  { href: "/account", label: "Account" },
  { href: "/account/orders", label: "Orders" },
  { href: "/checkout", label: "Checkout" },
  { href: "/support", label: "Concierge" },
];

const legal = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-0 overflow-hidden border-t border-line/80 bg-deep text-ivory">
      <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-rose-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-champagne/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[88rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <UvelyLogo size="lg" inverted />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">
              Luxury Korean beauty with editorial curation, authenticated sourcing,
              and textures designed for visible radiance under real light.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-champagne/90">
              <span className="rounded-full border border-white/15 px-4 py-2">Seoul lab tested</span>
              <span className="rounded-full border border-white/15 px-4 py-2">Carbon-neutral ship</span>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-champagne/80">
                Shop
              </p>
              <ul className="mt-5 space-y-3 text-sm text-white/70">
                {shop.map((item) => (
                  <li key={item.href}>
                    <Link className="transition hover:text-white" href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-champagne/80">
                Client care
              </p>
              <ul className="mt-5 space-y-3 text-sm text-white/70">
                {care.map((item) => (
                  <li key={item.href}>
                    <Link className="transition hover:text-white" href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-champagne/80">
                Maison
              </p>
              <ul className="mt-5 space-y-3 text-sm text-white/70">
                {legal.map((item) => (
                  <li key={item.href}>
                    <Link className="transition hover:text-white" href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-champagne/80">
              Private list
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              First access to limited Seoul drops and ritual notes—no noise.
            </p>
            <form className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="Email address"
                className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white outline-none placeholder:text-white/40 backdrop-blur transition focus:border-champagne/60 focus:ring-2 focus:ring-champagne/25"
              />
              <button
                type="submit"
                className="rounded-full bg-gradient-to-r from-champagne to-rose-gold-light px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-deep shadow-lg transition hover:opacity-95"
              >
                Join
              </button>
            </form>
            <p className="mt-4 text-xs text-white/45">
              By subscribing you agree to our{" "}
              <Link href="/privacy" className="underline underline-offset-4 hover:text-white">
                privacy policy
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-10 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Uvely Glow. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span>Authenticity guarantee</span>
            <span>Complimentary returns on qualifying orders</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
