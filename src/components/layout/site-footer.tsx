import Link from "next/link";
import { UvelyLogo } from "@/components/brand/uvely-logo";
import { FooterNewsletterForm } from "@/components/layout/footer-newsletter-form";
import { HeaderLanguageSwitch } from "@/components/layout/header-language-switch";
import type { StoreLocale } from "@/lib/i18n/constants";
import type { StoreMessages } from "@/lib/i18n/store-messages";
import { cn } from "@/lib/utils";

const columnHeading =
  "text-[11px] font-semibold uppercase tracking-[0.32em] text-champagne sm:text-xs";
const linkClass =
  "text-[15px] font-normal leading-snug text-white/80 transition hover:text-champagne sm:text-base";
const careItem = "text-base font-medium tracking-wide text-white/90 sm:text-lg";

function SocialInstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" className="fill-none stroke-current" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" className="fill-none stroke-current" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1.2" className="fill-current" />
    </svg>
  );
}

function SocialFacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M13.5 22v-8.2h2.7l.5-3.4H13.5V8.5c0-1 .3-1.7 1.7-1.7h1.8V3.6c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.6v2.6H7v3.4h2v8.2h4.5Z"
      />
    </svg>
  );
}

function VisaMark({ className }: { className?: string }) {
  return (
    <span className={cn("font-bold italic tracking-tight text-white", className)} aria-hidden>
      VISA
    </span>
  );
}

function MastercardMark({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-flex h-5 w-9 items-center justify-center", className)} aria-hidden>
      <span className="absolute left-0.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-white/35" />
      <span className="absolute right-0.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-white/60" />
    </span>
  );
}

function FooterLinkList({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string }[];
}) {
  return (
    <div>
      <p className={columnHeading}>{title}</p>
      <ul className="mt-5 space-y-3.5 sm:mt-6 sm:space-y-4">
        {items.map((item) => (
          <li key={item.href + item.label}>
            <Link className={linkClass} href={item.href}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter({ locale, messages: t }: { locale: StoreLocale; messages: StoreMessages }) {
  const shopLinks = [
    { href: "/products?q=skincare", label: t.footer.shop.skincare },
    { href: "/products?q=makeup", label: t.footer.shop.makeup },
    { href: "/brands", label: t.footer.shop.brands },
    { href: "/bestsellers", label: t.footer.shop.bestsellers },
    { href: "/products", label: t.footer.shop.newArrivals },
    { href: "/products?q=gift", label: t.footer.shop.giftCards },
  ];

  const helpLinks = [
    { href: "/support#shipping", label: t.footer.help.shipping },
    { href: "/support#returns", label: t.footer.help.returns },
    { href: "/support#faq", label: t.footer.help.faq },
    { href: "/account/orders", label: t.footer.help.trackOrder },
    { href: "/contact", label: t.footer.help.contact },
  ];

  const companyLinks = [
    { href: "/about", label: t.footer.company.about },
    { href: "/about#our-story", label: t.footer.company.story },
    { href: "/blog", label: t.footer.company.blog },
    { href: "/contact#careers", label: t.footer.company.careers },
    { href: "/privacy", label: t.footer.company.privacy },
    { href: "/terms", label: t.footer.company.terms },
  ];

  const mail = `mailto:${t.footer.emailDisplay}`;

  const careLabels = [
    t.footer.customerCare.fastDelivery,
    t.footer.customerCare.easyReturns,
    t.footer.customerCare.securePayments,
  ];

  return (
    <footer className="relative mt-auto border-t border-white/[0.06] bg-[#0f0f0f] text-white antialiased">
      <div className="mx-auto max-w-[1320px] px-5 pb-10 pt-14 sm:px-8 sm:pb-12 sm:pt-16 lg:px-10 lg:pt-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-12 lg:gap-x-6 xl:gap-x-10">
          <div className="sm:col-span-2 lg:col-span-3">
            <UvelyLogo size="lg" href="/" inverted />
            <p className="mt-6 max-w-[22rem] text-base leading-relaxed text-white/85 sm:text-[17px] sm:leading-[1.65]">
              {t.footer.tagline}
            </p>
            <a
              href={mail}
              className="mt-6 inline-block text-base font-medium text-champagne/95 underline-offset-4 transition hover:text-champagne hover:underline sm:text-[17px]"
            >
              {t.footer.emailDisplay}
            </a>
            <p className="mt-3 text-base text-white/70 sm:text-[17px]">{t.footer.location}</p>
            <div className="mt-7 flex items-center gap-5 text-white/85">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-champagne"
                aria-label={t.footer.socialInstagramAria}
              >
                <SocialInstagramIcon className="h-6 w-6" />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-champagne"
                aria-label={t.footer.socialFacebookAria}
              >
                <SocialFacebookIcon className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <FooterLinkList title={t.footer.shopHeading} items={shopLinks} />
          </div>
          <div className="lg:col-span-2">
            <FooterLinkList title={t.footer.helpHeading} items={helpLinks} />
          </div>
          <div className="lg:col-span-2">
            <FooterLinkList title={t.footer.companyHeading} items={companyLinks} />
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <p className={cn(columnHeading, "max-w-xs leading-relaxed")}>{t.footer.subscribeHeading}</p>
            <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-[17px]">{t.footer.newsletterHint}</p>
            <FooterNewsletterForm
              theme="luxury"
              emailPlaceholder={t.footer.emailPlaceholder}
              subscribeLabel={t.footer.subscribe}
              privacyNote={t.footer.privacyNote}
              privacyLinkLabel={t.footer.privacyLink}
            />
          </div>
        </div>

        <div className="mt-16 border-y border-white/[0.08] py-10 sm:mt-20 sm:py-12">
          <div className="grid grid-cols-1 gap-6 text-center sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-white/[0.12]">
            {careLabels.map((label) => (
              <div key={label} className="flex items-center justify-center sm:px-6 lg:px-10">
                <span className={careItem}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center sm:mt-12">
          <HeaderLanguageSwitch
            locale={locale}
            englishLabel={t.footer.langEnglishPrimary}
            koreanLabel={t.footer.langKoreanSecondary}
            ariaLabel={t.footer.langGroupAria}
            variant="onLuxury"
            className="gap-3"
            labelClassName="text-sm font-semibold uppercase tracking-[0.12em] sm:text-[15px]"
          />
        </div>

        <div className="mt-12 flex flex-col gap-8 border-t border-white/[0.08] pt-10 sm:mt-14 sm:flex-row sm:items-center sm:justify-between sm:pt-12">
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <p className="text-base font-medium text-white/90 sm:text-[17px]">{t.footer.craftedLine}</p>
            <p className="text-sm text-white/45">
              © {new Date().getFullYear()} Uvely Glow. {t.footer.rights}
            </p>
          </div>
          <div
            className="flex flex-wrap items-center justify-center gap-6 sm:justify-end sm:gap-8"
            aria-label="Accepted payments"
          >
            <span className="flex h-10 min-w-[4.25rem] items-center justify-center rounded border border-white/15 bg-white/[0.04] px-4">
              <VisaMark className="text-sm" />
            </span>
            <span className="flex h-10 min-w-[4.25rem] items-center justify-center rounded border border-white/15 bg-white/[0.04] px-4">
              <MastercardMark />
            </span>
            <span className="flex h-10 min-w-[5rem] items-center justify-center rounded border border-white/15 bg-white/[0.04] px-4 text-[13px] font-semibold tracking-wide text-emerald-300/95">
              eSewa
            </span>
            <span className="flex h-10 min-w-[5rem] items-center justify-center rounded border border-white/15 bg-white/[0.04] px-4 text-[13px] font-semibold tracking-wide text-violet-300/95">
              Khalti
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
