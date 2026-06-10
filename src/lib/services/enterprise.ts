import { listProducts } from "@/lib/services/catalog";
import { getAdminOrderCount, getAdminOrderTotalsKrw } from "@/lib/services/orders";

export type LoyaltyTier = "Silver" | "Gold" | "Platinum";

export async function getLoyaltySnapshot(userId?: string) {
  const referralSuffix = userId ? userId.slice(0, 6).toUpperCase() : "GUEST";
  return {
    tier: "Silver" as LoyaltyTier,
    pointsBalance: 420,
    lifetimePoints: 420,
    nextTier: "Gold" as LoyaltyTier,
    nextTierAt: 2500,
    earnRate: "1 point per NPR 100",
    referralReward: 500,
    purchaseRewardRate: 2,
    referralCode: `UVELY-${referralSuffix}`,
  };
}

export async function getSubscriptionSnapshot(userId?: string) {
  return {
    planName: "Monthly K-Beauty Box",
    status: "active",
    priceKrw: 49000,
    cadence: "Monthly",
    customerKey: userId ? `sub-${userId.slice(0, 8)}` : "sub-preview",
    nextRenewal: new Date(Date.now() + 1000 * 60 * 60 * 24 * 21).toISOString(),
    renewalWorkflow: ["Payment pre-check", "Box curation", "Warehouse pick", "Shipment"],
  };
}

export async function getSupportSnapshot() {
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
  };
}

export async function getOperationsSnapshot() {
  const products = await listProducts({ activeOnly: false });
  const lowStock = products.filter((product) => product.stock <= product.lowStockThreshold);
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);

  return {
    warehouses: 2,
    totalStock,
    lowStockCount: lowStock.length,
    forecast30dUnits: Math.round(totalStock * 0.32),
    purchaseOrdersOpen: Math.max(1, lowStock.length),
    lowStockProducts: lowStock.slice(0, 6),
  };
}

export async function getMarketplaceSnapshot() {
  return {
    activeVendors: 3,
    onboardingVendors: 2,
    averageCommissionRate: 15,
    vendorSteps: ["Business profile", "Brand catalog", "Payout setup", "Compliance review"],
  };
}

export async function getMarketingOpsSnapshot() {
  return {
    activeCampaigns: 2,
    influencerPartners: 8,
    affiliateRevenueKrw: 4280000,
    pendingCommissionsKrw: 428000,
    channels: ["Influencer", "Affiliate", "Email", "Push"],
  };
}

export async function getSecuritySnapshot() {
  return {
    auditEventsToday: 18,
    blockedRateLimitEvents: 3,
    adminActionsToday: 11,
    hardeningChecklist: [
      "RLS enabled for Phase 5 tables",
      "Admin activity logs defined",
      "Rate limit event capture defined",
      "Audit log schema defined",
      "Cache invalidation log defined",
    ],
  };
}

export async function getEnterpriseDashboard() {
  const [orderCount, revenueKrw, operations, marketplace, marketing, security] =
    await Promise.all([
      getAdminOrderCount(),
      getAdminOrderTotalsKrw(),
      getOperationsSnapshot(),
      getMarketplaceSnapshot(),
      getMarketingOpsSnapshot(),
      getSecuritySnapshot(),
    ]);

  const forecastRevenueKrw = Math.round(revenueKrw * 1.18 + 1200000);
  const estimatedClvKrw = orderCount ? Math.round((revenueKrw / orderCount) * 2.8) : 68000;

  return {
    orderCount,
    revenueKrw,
    forecastRevenueKrw,
    estimatedClvKrw,
    cohortRepeatRate: 34.5,
    operations,
    marketplace,
    marketing,
    security,
  };
}
