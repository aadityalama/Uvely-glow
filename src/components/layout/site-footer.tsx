import Link from "next/link";
import { UvelyLogo } from "@/components/brand/uvely-logo";
import { FooterNewsletterForm } from "@/components/layout/footer-newsletter-form";
import { HeaderLanguageSwitch } from "@/components/layout/header-language-switch";
import type { StoreLocale } from "@/lib/i18n/constants";
import type { StoreMessages } from "@/lib/i18n/store-messages";
import { cn } from "@/lib/utils";

const columnHeading =
  "text-[11px] font-semibold uppercase tracking-[0.28em] text-champagne sm:text-xs";
const linkClass =
  "text-[14px] font-normal leading-snug text-white/80 transition hover:text-champagne sm:text-[15px]";

function SocialInstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" className="fill-none stroke-current" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" className="fill-none stroke-current" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1.2" className="fill-current" />
    </svg>
  );
}

function SocialTiktokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M16.6 5.82s.95.01 1.78-.48c.83-.49 1.12-1.12 1.12-1.12v3.28a6.27 6.27 0 0 1-3.42-.98v6.45a5.93 5.93 0 1 1-5.93-5.93c.21 0 .42.01.62.04v3.1a2.84 2.84 0 1 0 2 2.7V5.82h4.83Z"
      />
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

function SocialYoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M21.8 8.001a2.75 2.75 0 0 0-1.94-1.95C18.2 5.6 12 5.6 12 5.6s-6.2 0-7.86.451A2.75 2.75 0 0 0 2.2 8.05 28.3 28.3 0 0 0 1.8 12a28.3 28.3 0 0 0 .4 3.999 2.75 2.75 0 0 0 1.94 1.954c1.66.45 7.86.45 7.86.45s6.2 0 7.86-.45a2.75 2.75 0 0 0 1.94-1.954 28.3 28.3 0 0 0 .4-3.999 28.3 28.3 0 0 0-.4-3.999ZM10 15.2V8.8L15.5 12 10 15.2Z"
      />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 7h16v10H4V7Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  );
}

function IconPin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
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

function IconTruckCare({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
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

function IconReturn({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 7v6a3 3 0 0 0 3 3h11M4 7l3 3m-3-3l3-3"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 17v-6a3 3 0 0 0-3-3H6"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconLockCare({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="5" y="10" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="1.35" />
      <path
        d="M8 10V7a4 4 0 0 1 8 0v3"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  );
}

function VisaMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" className={className} aria-hidden>
      <rect width="48" height="32" rx="4" fill="#1a1f71" />
      <path
        d="M20.2 21.4h3.1l-1.5-9.4h-3.1l1.5 9.4Zm12.8-9.1c-.6-.2-1.5-.5-2.7-.5-3 0-5.1 1.5-5.1 3.7 0 1.6 1.5 2.5 2.7 3 1.2.6 1.6.9 1.6 1.4 0 .8-1 1.1-1.9 1.1-1.3 0-2-.3-3-.9l-.5-.3-.5 3.1c.8.4 2.2.7 3.7.7 3.2 0 5.2-1.5 5.2-3.8 0-1.3-.8-2.2-2.5-3-1-.5-1.7-.8-1.7-1.3 0-.4.5-.9 1.5-.9 1 0 1.7.2 2.3.5l.3.2.5-3.1ZM35 12h-2.4c-.7 0-1.3.2-1.6 1.1l-4.6 11h3.1l.6-1.7h3.8c.1.8.5 1.7.5 1.7h2.7L35 12Zm-4.9 7.3c.2-.6 1.1-3 1.1-3-.1 0 .2-.6.4-1l.6 2.2.1.8h-2.2Z"
        fill="#fff"
      />
    </svg>
  );
}

function MastercardMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" className={className} aria-hidden>
      <rect width="48" height="32" rx="4" fill="#000" />
      <circle cx="19" cy="16" r="9" fill="#eb001b" />
      <circle cx="29" cy="16" r="9" fill="#f79e1b" />
      <path
        d="M24 10.2a8.9 8.9 0 0 1 0 11.6 8.9 8.9 0 0 1 0-11.6Z"
        fill="#ff5f00"
      />
    </svg>
  );
}

function ESewaMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 28" className={className} aria-hidden>
      <text x="2" y="20" fill="#60bb46" fontSize="16" fontWeight="700" fontFamily="system-ui,sans-serif">
        eSewa
      </text>
    </svg>
  );
}

function KhaltiMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 28" className={className} aria-hidden>
      <text x="2" y="20" fill="#5c2d91" fontSize="15" fontWeight="700" fontFamily="system-ui,sans-serif">
        Khalti
      </text>
    </svg>
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
      <ul className="mt-5 space-y-3 sm:mt-6 sm:space-y-3.5">
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

  const careBlocks = [
    {
      icon: IconTruckCare,
      title: t.footer.customerCare.fastDelivery,
      detail: t.footer.customerCare.fastDeliveryDetail,
    },
    {
      icon: IconReturn,
      title: t.footer.customerCare.easyReturns,
      detail: t.footer.customerCare.easyReturnsDetail,
    },
    {
      icon: IconLockCare,
      title: t.footer.customerCare.securePayments,
      detail: t.footer.customerCare.securePaymentsDetail,
    },
  ] as const;

  return (
    <footer className="relative mt-auto bg-black text-white antialiased">
      <div className="mx-auto max-w-[1200px] px-5 pb-12 pt-14 sm:px-8 sm:pb-14 sm:pt-16 lg:px-10 lg:pt-[4.5rem]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-10 md:gap-y-14 lg:grid-cols-12 lg:gap-x-8">
          <div className="md:col-span-2 lg:col-span-3">
            <UvelyLogo size="lg" href="/" inverted wordmarkOnly />
            <p className="mt-6 max-w-[22rem] text-[15px] leading-relaxed text-white/85 sm:text-base sm:leading-[1.65]">
              {t.footer.tagline}
            </p>
            <a
              href={mail}
              className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-champagne/95 underline-offset-4 transition hover:text-champagne hover:underline sm:text-base"
            >
              <IconMail className="h-4 w-4 shrink-0 text-champagne/90" />
              {t.footer.emailDisplay}
            </a>
            <p className="mt-4 inline-flex items-center gap-2 text-[15px] text-white/75 sm:text-base">
              <IconPin className="h-4 w-4 shrink-0 text-champagne/90" />
              {t.footer.location}
            </p>
            <div className="mt-8 flex items-center gap-6 text-white/85">
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
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-champagne"
                aria-label={t.footer.socialTiktokAria}
              >
                <SocialTiktokIcon className="h-6 w-6" />
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
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-champagne"
                aria-label={t.footer.socialYoutubeAria}
              >
                <SocialYoutubeIcon className="h-6 w-6" />
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

          <div className="md:col-span-2 lg:col-span-3">
            <p className={cn(columnHeading, "leading-relaxed")}>{t.footer.subscribeHeading}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-white/65 sm:text-base">{t.footer.newsletterHint}</p>
            <FooterNewsletterForm
              theme="luxury"
              emailPlaceholder={t.footer.emailPlaceholder}
              subscribeLabel={t.footer.subscribe}
              privacyNote={t.footer.privacyNote}
              privacyLinkLabel={t.footer.privacyLink}
            />
            <div className="mt-10 border-t border-white/[0.08] pt-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">{t.footer.langHeading}</p>
              <div className="mt-3">
                <HeaderLanguageSwitch
                  locale={locale}
                  englishLabel={t.footer.langEnglishPrimary}
                  koreanLabel={t.footer.langKoreanSecondary}
                  ariaLabel={t.footer.langGroupAria}
                  variant="onLuxury"
                  className="gap-3"
                  labelClassName="text-[13px] font-medium tracking-wide sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/[0.08] pt-12 lg:mt-16 lg:pt-14">
          <p className={columnHeading}>{t.footer.customerCareHeading}</p>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6 lg:gap-10">
            {careBlocks.map(({ icon: Icon, title, detail }) => (
              <div key={title} className="flex gap-4">
                <Icon className="mt-0.5 h-6 w-6 shrink-0 text-champagne" />
                <div>
                  <p className="text-[15px] font-semibold tracking-wide text-white">{title}</p>
                  <p className="mt-1 text-[14px] leading-snug text-white/60">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-6 border-t border-white/[0.08] pt-10 text-center sm:mt-16 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-12 sm:text-left">
          <p className="order-2 text-[13px] text-white/50 sm:order-1">
            © {new Date().getFullYear()} Uvely Glow. {t.footer.rights}
          </p>
          <p className="order-1 text-[15px] font-medium text-white/90 sm:order-2 sm:flex-1 sm:text-center">
            {t.footer.craftedLine}
          </p>
          <div
            className="order-3 flex flex-wrap items-center justify-center gap-4 sm:justify-end"
            aria-label="Accepted payments"
          >
            <span className="inline-flex h-9 w-[52px] items-center justify-center overflow-hidden rounded border border-white/15 bg-white">
              <VisaMark className="h-full w-full" />
            </span>
            <span className="inline-flex h-9 w-[52px] items-center justify-center overflow-hidden rounded border border-white/15 bg-white">
              <MastercardMark className="h-full w-full" />
            </span>
            <span className="inline-flex h-9 min-w-[4.5rem] items-center justify-center rounded border border-white/15 bg-white px-2">
              <ESewaMark className="h-5 w-[4.25rem]" />
            </span>
            <span className="inline-flex h-9 min-w-[4.5rem] items-center justify-center rounded border border-white/15 bg-white px-2">
              <KhaltiMark className="h-5 w-[4.25rem]" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
