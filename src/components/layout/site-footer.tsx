import Link from "next/link";
import { UvelyLogo } from "@/components/brand/uvely-logo";
import { FooterNewsletterForm } from "@/components/layout/footer-newsletter-form";
import type { StoreMessages } from "@/lib/i18n/store-messages";

export function SiteFooter({ messages: t }: { messages: StoreMessages }) {
  const shop = [
    { href: "/products", label: t.nav.shop },
    { href: "/categories", label: t.nav.categories },
    { href: "/brands", label: t.nav.brands },
    { href: "/wishlist", label: t.tools.wishlist },
  ];

  const care = [
    { href: "/account", label: "Account" },
    { href: "/account/orders", label: "Orders" },
    { href: "/checkout", label: "Checkout" },
    { href: "/support", label: "Support" },
  ];

  const legal = [
    { href: "/about", label: t.nav.aboutUs },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ];

  return (
    <footer className="relative mt-0 overflow-hidden border-t border-line/80 bg-deep text-ivory">
      <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-rose-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-champagne/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[88rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <UvelyLogo size="lg" inverted />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">{t.footer.tagline}</p>
            <p className="mt-5 max-w-sm border-l-2 border-champagne/50 pl-4 text-xs leading-relaxed text-white/55">
              {t.footer.languageNote}
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-champagne/90">
              <span className="rounded-full border border-white/15 px-4 py-2">{t.trustBar.authenticBadge}</span>
              <span className="rounded-full border border-white/15 px-4 py-2">{t.announcement.freeShipping}</span>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-champagne/80">
                {t.footer.shop}
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
                {t.footer.care}
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
                {t.footer.company}
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

          <div className="lg:col-span-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-champagne/80">
              {t.footer.newsletterTitle}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/65">{t.footer.newsletterHint}</p>
            <FooterNewsletterForm
              emailPlaceholder={t.footer.emailPlaceholder}
              subscribeLabel={t.footer.subscribe}
              privacyNote={t.footer.privacyNote}
              privacyLinkLabel={t.footer.privacyLink}
            />

            <div className="mt-10 border-t border-white/10 pt-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-champagne/80">
                {t.footer.contactTitle}
              </p>
              <address className="mt-4 not-italic text-sm leading-relaxed text-white/70">
                {t.footer.addressLine1}
                <br />
                {t.footer.addressLine2}
              </address>
              <dl className="mt-4 grid gap-3 text-sm text-white/70 sm:grid-cols-2">
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-champagne/70">
                    {t.footer.emailLabel}
                  </dt>
                  <dd className="mt-1">
                    <a className="hover:text-white" href="mailto:hello@uvelyglow.com">
                      hello@uvelyglow.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-champagne/70">
                    {t.footer.phoneLabel}
                  </dt>
                  <dd className="mt-1">
                    <a className="hover:text-white" href={`tel:${t.footer.phoneValue.replace(/\s/g, "")}`}>
                      {t.footer.phoneValue}
                    </a>
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-champagne/70">
                    {t.footer.hoursLabel}
                  </dt>
                  <dd className="mt-1">{t.footer.hoursValue}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-10 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Uvely Glow. {t.footer.rights}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span>{t.footer.authenticity}</span>
            <span>{t.footer.returns}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
