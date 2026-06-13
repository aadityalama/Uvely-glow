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
    <footer className="relative mt-0 border-t border-zinc-200 bg-[#f4f4f2] text-zinc-900">
      <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <UvelyLogo size="lg" href="/" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-zinc-600">{t.footer.tagline}</p>
            <p className="mt-4 max-w-sm border-l-2 border-zinc-300 pl-4 text-xs leading-relaxed text-zinc-500">
              {t.footer.languageNote}
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-700">
              <span className="border border-zinc-300 bg-white px-3 py-1.5">{t.trustBar.authenticBadge}</span>
              <span className="border border-zinc-300 bg-white px-3 py-1.5">{t.announcement.freeShipping}</span>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-zinc-500">{t.footer.shop}</p>
              <ul className="mt-4 space-y-2.5 text-sm text-zinc-700">
                {shop.map((item) => (
                  <li key={item.href}>
                    <Link className="transition hover:text-zinc-950" href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-zinc-500">{t.footer.care}</p>
              <ul className="mt-4 space-y-2.5 text-sm text-zinc-700">
                {care.map((item) => (
                  <li key={item.href}>
                    <Link className="transition hover:text-zinc-950" href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-zinc-500">{t.footer.company}</p>
              <ul className="mt-4 space-y-2.5 text-sm text-zinc-700">
                {legal.map((item) => (
                  <li key={item.href}>
                    <Link className="transition hover:text-zinc-950" href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-zinc-500">
              {t.footer.newsletterTitle}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">{t.footer.newsletterHint}</p>
            <FooterNewsletterForm
              theme="light"
              emailPlaceholder={t.footer.emailPlaceholder}
              subscribeLabel={t.footer.subscribe}
              privacyNote={t.footer.privacyNote}
              privacyLinkLabel={t.footer.privacyLink}
            />

            <div className="mt-10 border-t border-zinc-200 pt-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-zinc-500">
                {t.footer.contactTitle}
              </p>
              <address className="mt-3 not-italic text-sm leading-relaxed text-zinc-700">
                {t.footer.addressLine1}
                <br />
                {t.footer.addressLine2}
              </address>
              <dl className="mt-4 grid gap-3 text-sm text-zinc-700 sm:grid-cols-2">
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                    {t.footer.emailLabel}
                  </dt>
                  <dd className="mt-1">
                    <a className="hover:underline" href="mailto:hello@uvelyglow.com">
                      hello@uvelyglow.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                    {t.footer.phoneLabel}
                  </dt>
                  <dd className="mt-1">
                    <a className="hover:underline" href={`tel:${t.footer.phoneValue.replace(/\s/g, "")}`}>
                      {t.footer.phoneValue}
                    </a>
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                    {t.footer.hoursLabel}
                  </dt>
                  <dd className="mt-1">{t.footer.hoursValue}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-zinc-200 pt-8 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
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
