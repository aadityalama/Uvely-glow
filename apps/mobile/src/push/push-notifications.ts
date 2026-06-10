export type PushTopic =
  | "order_updates"
  | "loyalty_rewards"
  | "subscription_renewals"
  | "campaigns";

export type PushRegistration = {
  userId: string;
  platform: "ios" | "android";
  deviceToken: string;
  appVersion: string;
  topics: PushTopic[];
};

export function buildPushRegistration(input: PushRegistration) {
  return {
    ...input,
    registeredAt: new Date().toISOString(),
  };
}
