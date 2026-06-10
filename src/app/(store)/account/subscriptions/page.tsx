import { redirect } from "next/navigation";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button";
import { getSubscriptionSnapshot } from "@/lib/services/enterprise";
import { getSessionUser } from "@/lib/supabase/session";
import { formatKRW } from "@/lib/utils";

export default async function SubscriptionsPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/account/subscriptions");
  const subscription = await getSubscriptionSnapshot(user.id);

  return (
    <Container className="py-12 sm:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
        K-Beauty Box
      </p>
      <h1 className="mt-3 font-display text-5xl text-deep">
        Subscription management
      </h1>
      <div className="mt-10 rounded-2xl border border-line bg-card p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl text-deep">{subscription.planName}</h2>
            <p className="mt-2 text-muted">
              {formatKRW(subscription.priceKrw)} · {subscription.cadence} · {subscription.status}
            </p>
            <p className="mt-2 text-sm text-muted">
              Next renewal {new Date(subscription.nextRenewal).toLocaleDateString("en-NP")}
            </p>
          </div>
          <ButtonLink href="/support" variant="outline">
            Manage with support
          </ButtonLink>
        </div>
        <ol className="mt-8 grid gap-3 sm:grid-cols-4">
          {subscription.renewalWorkflow.map((step, index) => (
            <li key={step} className="rounded-xl bg-background p-4 text-sm">
              <span className="text-xs uppercase tracking-widest text-accent">
                Step {index + 1}
              </span>
              <p className="mt-2 font-semibold">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </Container>
  );
}
