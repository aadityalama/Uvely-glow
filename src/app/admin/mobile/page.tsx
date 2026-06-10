const capabilities = [
  "Expo app metadata and environment handoff",
  "Shared API layer for catalog, loyalty, subscriptions, support, and enterprise data",
  "Mobile navigation contract for tabs and protected screens",
  "Push notification registration schema for order, loyalty, subscription, and campaign topics",
];

const mobileTabs = ["Home", "Shop", "Bag", "Rewards", "Account"];
const protectedMobileRoutes = ["Account", "Loyalty", "Subscriptions", "Support"];

export default function AdminMobilePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-background">Mobile ecosystem</h1>
        <p className="mt-2 text-sm text-background/70">
          React Native / Expo foundation for Nepal&apos;s Korean beauty mobile app.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="font-display text-xl">Mobile navigation</h2>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            {mobileTabs.map((tab) => (
              <span key={tab} className="rounded-full border border-white/10 px-3 py-1">
                {tab}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-background/70">
            Protected routes: {protectedMobileRoutes.join(", ")}
          </p>
        </section>
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="font-display text-xl">Foundation checklist</h2>
          <ul className="mt-4 space-y-2 text-sm text-background/70">
            {capabilities.map((item) => (
              <li key={item} className="rounded-lg border border-white/10 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
