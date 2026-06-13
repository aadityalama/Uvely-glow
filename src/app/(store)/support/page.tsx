import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ShippingInformationSection } from "@/components/support/shipping-information";
import { getSupportSnapshot } from "@/lib/services/enterprise";

export const metadata: Metadata = {
  title: "Customer Support",
  description:
    "AI support assistant, FAQ, Nepal shipping rates by region, and ticket system for Uvely Glow customers.",
};

export default async function SupportPage() {
  const support = await getSupportSnapshot();

  return (
    <Container className="py-12 sm:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
        Help Center
      </p>
      <h1 className="mt-3 font-display text-5xl text-deep">Customer support</h1>
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_22rem]">
        <section className="rounded-2xl border border-line bg-card p-6">
          <h2 className="font-display text-3xl text-deep">{support.aiAssistantName}</h2>
          <p className="mt-2 text-muted">
            AI support assistant framework for order, subscription, loyalty, and product questions.
          </p>
          <div className="mt-6 space-y-3">
            {support.suggestedAnswers.map((answer) => (
              <p key={answer} className="rounded-xl bg-background p-4 text-sm text-muted">
                {answer}
              </p>
            ))}
          </div>
        </section>
        <aside id="faq" className="scroll-mt-28 rounded-2xl border border-line bg-card p-6">
          <h2 className="font-display text-2xl text-deep">FAQ knowledge base</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {support.faqCategories.map((category) => (
              <li key={category} className="rounded-lg bg-background px-3 py-2">
                {category}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">
            {support.openTickets} open tickets · {support.avgResponseHours}h average response.
          </p>
        </aside>
      </div>

      <div className="mt-6 space-y-6">
        <ShippingInformationSection />
        <section id="returns" className="scroll-mt-28 rounded-2xl border border-line bg-card p-6">
          <h2 className="font-display text-2xl text-deep">Returns & exchanges</h2>
          <p className="mt-3 text-sm text-muted">
            Start a return from your account orders, or message support for sizing exchanges. Eligibility windows and
            label flows connect here when your policy service is wired in.
          </p>
        </section>
      </div>
    </Container>
  );
}
