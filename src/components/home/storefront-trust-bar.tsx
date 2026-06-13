import { Container } from "@/components/layout/container";
import type { StoreMessages } from "@/lib/i18n/store-messages";

function IconShield(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M12 3 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconTruck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M3 7h11v10H3V7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M14 10h3l3 3v4h-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="7.5" cy="18" r="1.5" fill="currentColor" />
      <circle cx="17" cy="18" r="1.5" fill="currentColor" />
    </svg>
  );
}

function IconBadge(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <circle cx="12" cy="9" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconHeadset(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M5 11a7 7 0 0 1 14 0v2a2 2 0 0 1-2 2h-1v-4h1a5 5 0 0 0-10 0h1v4H7a2 2 0 0 1-2-2v-2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StorefrontTrustBar({ trust }: { trust: StoreMessages["trustBar"] }) {
  const items = [
    { icon: IconShield, label: trust.secure },
    { icon: IconTruck, label: trust.shipping },
    { icon: IconBadge, label: trust.authenticBadge },
    { icon: IconHeadset, label: trust.support },
  ] as const;

  return (
    <section className="border-b border-zinc-200 bg-zinc-100">
      <Container className="max-w-[1200px] py-8 sm:py-9">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
          {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center text-center">
              <Icon className="h-6 w-6 text-zinc-700" />
              <p className="mt-3 max-w-[11rem] text-[10px] font-semibold uppercase leading-snug tracking-[0.18em] text-zinc-700 sm:max-w-none">
                {label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
