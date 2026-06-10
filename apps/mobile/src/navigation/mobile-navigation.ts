export type MobileRoute =
  | "Home"
  | "Shop"
  | "ProductDetail"
  | "Cart"
  | "Account"
  | "Loyalty"
  | "Subscriptions"
  | "Support";

export const mobileTabs: Array<{ name: MobileRoute; label: string }> = [
  { name: "Home", label: "Home" },
  { name: "Shop", label: "Shop" },
  { name: "Cart", label: "Bag" },
  { name: "Loyalty", label: "Rewards" },
  { name: "Account", label: "Account" },
];

export const protectedMobileRoutes: MobileRoute[] = [
  "Account",
  "Loyalty",
  "Subscriptions",
  "Support",
];
