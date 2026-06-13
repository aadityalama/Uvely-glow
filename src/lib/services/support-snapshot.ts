/** Static support / help-center copy — keep this module import-free to avoid pulling catalog/orders into /support. */
export function getSupportSnapshot() {
  return {
    aiAssistantName: "GlowBot",
    openTickets: 6,
    avgResponseHours: 4,
    faqCategories: ["Orders", "Loyalty", "Subscriptions", "Mobile", "Returns"],
    suggestedAnswers: [
      "Track an order from Account > Orders.",
      "K-Beauty Box renewals can be paused before the next billing date.",
      "Reward points post after fulfillment confirmation.",
    ],
  } as const;
}
