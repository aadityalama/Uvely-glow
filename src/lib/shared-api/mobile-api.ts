import { listProducts } from "@/lib/services/catalog";
import {
  getEnterpriseDashboard,
  getLoyaltySnapshot,
  getSubscriptionSnapshot,
  getSupportSnapshot,
} from "@/lib/services/enterprise";

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

export async function getMobileSupportPayload() {
  return getSupportSnapshot();
}
