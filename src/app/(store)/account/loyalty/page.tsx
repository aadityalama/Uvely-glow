import { redirect } from "next/navigation";
import { Container } from "@/components/layout/container";
import { getLoyaltySnapshot } from "@/lib/services/enterprise";
import { getSessionUser } from "@/lib/supabase/session";

export default async function LoyaltyPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/account/loyalty");
  const loyalty = await getLoyaltySnapshot(user.id);
  const progress = Math.min(100, Math.round((loyalty.lifetimePoints / loyalty.nextTierAt) * 100));

  return (
    <Container className="py-12 sm:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
        Uvely Rewards
      </p>
      <h1 className="mt-3 font-display text-5xl text-deep">Loyalty dashboard</h1>
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_22rem]">
        <section className="rounded-2xl border border-line bg-card p-6">
          <h2 className="font-display text-3xl text-deep">{loyalty.tier} tier</h2>
          <p className="mt-2 text-muted">{loyalty.pointsBalance} reward points available</p>
          <div className="mt-6 h-3 overflow-hidden rounded-full bg-background">
            <div className="h-full bg-accent" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-3 text-sm text-muted">
            {loyalty.nextTierAt - loyalty.lifetimePoints} points until {loyalty.nextTier}.
          </p>
        </section>
        <aside className="rounded-2xl border border-line bg-card p-6 text-sm">
          <h2 className="font-display text-2xl text-deep">Earn rules</h2>
          <p className="mt-3 text-muted">{loyalty.earnRate}</p>
          <p className="mt-2 text-muted">{loyalty.referralReward} referral reward points</p>
          <p className="mt-2 text-muted">{loyalty.purchaseRewardRate}x purchase rewards on campaigns</p>
        </aside>
      </div>
    </Container>
  );
}
