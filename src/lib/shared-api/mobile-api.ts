import { listProducts } from "@/lib/services/catalog";
import {
  getEnterpriseDashboard,
  getLoyaltySnapshot,
  getSubscriptionSnapshot,
} from "@/lib/services/enterprise";
import { getSupportSnapshot } from "@/lib/services/support-snapshot";

export async function getMobileHomePayload(userId?: string) {
  const [products, enterprise] = await Promise.all([
    listProducts({ activeOnly: true }),
    getEnterpriseDashboard(),
  ]);

  return {
    featuredProducts: products.filter((product) => product.isFeatured).slice(0, 6),
    enterprise,
    loyalty: userId ? await getLoyaltySnapshot(userId) : null,
    subscription: userId ? await getSubscriptionSnapshot(userId) : null,
  };
}

export function getMobileSupportPayload() {
  return getSupportSnapshot();
}
