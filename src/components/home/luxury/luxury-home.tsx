import type { Product } from "@/types";
import type { StoreMessages } from "@/lib/i18n/store-messages";
import { BeforeAfterGallery } from "./before-after-gallery";
import { BestsellerCarousel } from "./bestseller-carousel";
import { BrandStorySection } from "./brand-story-section";
import { CustomerReviewsSection } from "./customer-reviews-section";
import { InstagramGallery } from "./instagram-gallery";
import { LuxuryEditorialGrid } from "./luxury-editorial-grid";
import { LuxuryFullscreenHero } from "./luxury-fullscreen-hero";
import { NewArrivalsSection } from "./new-arrivals-section";
import { SkincareRoutineSection } from "./skincare-routine-section";
import { StorefrontBrandStrip } from "../storefront-brand-strip";

function pickBestsellers(products: Product[]) {
  const featured = products.filter((p) => p.isFeatured);
  if (featured.length >= 6) return featured.slice(0, 10);
  const rest = products.filter((p) => !featured.includes(p));
  return [...featured, ...rest].slice(0, 10);
}

function pickNewArrivals(products: Product[]) {
  const withPromo = products.filter((p) => p.compareAtKrw);
  const merged = [...withPromo, ...products.filter((p) => !withPromo.includes(p))];
  const unique = merged.filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i);
  return unique.slice(0, 5);
}

export function LuxuryHome({
  products,
  messages,
}: {
  products: Product[];
  messages: StoreMessages;
}) {
  const bestsellers = pickBestsellers(products);
  const newArrivals = pickNewArrivals(products);

  return (
    <div className="bg-background antialiased">
      <LuxuryFullscreenHero hero={messages.hero} />
      <StorefrontBrandStrip title={messages.brands.title} />
      <LuxuryEditorialGrid />
      <BestsellerCarousel products={bestsellers} />
      <NewArrivalsSection products={newArrivals} />
      <SkincareRoutineSection />
      <BeforeAfterGallery />
      <CustomerReviewsSection />
      <BrandStorySection />
      <InstagramGallery />
    </div>
  );
}
