import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";

type DarkMarketingPageShellProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
};

/**
 * Dark gradient page backdrop and hero (light-on-dark). Content cards should
 * use {@link LightGlassCard} with light-on-glass typography for readable body copy.
 */
export function DarkMarketingPageShell({
  eyebrow,
  title,
  description,
  children,
}: DarkMarketingPageShellProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0908] via-deep to-[#15120f] pb-20 pt-6 text-background sm:pb-24 sm:pt-10">
      <Container>
        <header className="border-b border-white/10 pb-10 sm:pb-14">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-soft">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-3 font-display text-4xl leading-tight text-background sm:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-background/75">
              {description}
            </p>
          ) : null}
        </header>
        <div className="mt-10 space-y-6 sm:mt-12 sm:space-y-8">{children}</div>
      </Container>
    </div>
  );
}
