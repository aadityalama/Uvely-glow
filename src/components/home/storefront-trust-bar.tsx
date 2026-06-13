import { Container } from "@/components/layout/container";
import type { StoreMessages } from "@/lib/i18n/store-messages";

function IconGift({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 8V21M8 8H5a2 2 0 0 0-2 2v2h5M8 8h8M8 8V6a2 2 0 1 1 4 0v2m0 0h5v2a2 2 0 0 1-2 2h-3m-8 0h8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 3.5l2.2 5.5 6 .5-4.6 3.8 1.6 5.9L12 16.9 6.8 19.2l1.6-5.9L3.8 9.5l6-.5L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconLeaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
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

function IconDrop({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 21a6.5 6.5 0 0 0 0-13c-3.5 4-6.5 7.2-6.5 10a6.5 6.5 0 0 0 6.5 3Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconLock({ className }: { className?: string }) {
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

export function StorefrontTrustBar({ trust }: { trust: StoreMessages["trustBar"] }) {
  const items = [
    { icon: IconGift, title: trust.newArrivalsTitle, sub: trust.newArrivalsSub },
    { icon: IconStar, title: trust.bestSellersTitle, sub: trust.bestSellersSub },
    { icon: IconLeaf, title: trust.cleanSafeTitle, sub: trust.cleanSafeSub },
    { icon: IconDrop, title: trust.premiumTitle, sub: trust.premiumSub },
    { icon: IconLock, title: trust.secureTitle, sub: trust.secureSub },
  ] as const;

  return (
    <section className="border-b border-zinc-200/80 bg-[#f9f7f2]">
      <Container className="max-w-[1200px] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col divide-y divide-zinc-200/70 sm:flex-row sm:divide-x sm:divide-y-0">
          {items.map(({ icon: Icon, title, sub }) => (
            <div
              key={title}
              className="flex flex-1 flex-col items-center gap-2 px-2 py-4 text-center sm:py-[18px] sm:first:pl-0 sm:last:pr-0"
            >
              <Icon className="h-[18px] w-[18px] text-[#b08d55]" />
              <p className="text-[10px] font-semibold uppercase leading-tight tracking-[0.16em] text-zinc-800">
                {title}
              </p>
              <p className="max-w-[11rem] text-[12px] font-normal leading-snug tracking-normal text-zinc-600 sm:max-w-[13rem]">
                {sub}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
