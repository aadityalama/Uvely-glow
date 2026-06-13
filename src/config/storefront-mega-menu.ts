/**
 * Static mega-menu tree — edit labels/hrefs here to match REFERENCE.png 1:1
 * (see docs/screenshots/storefront/README.md).
 */
export type MegaMenuLink = { href: string; label: string };

export const REFERENCE_MEGA_MENU = {
  skincare: [
    { href: "/products?q=cleanser", label: "Cleansers" },
    { href: "/categories/toners", label: "Toners & mists" },
    { href: "/categories/serums-essences", label: "Essences & serums" },
    { href: "/categories/creams", label: "Moisturizers" },
    { href: "/categories/sun-protection", label: "Sun care" },
    { href: "/categories/lips-masks", label: "Masks & packs" },
    { href: "/products?q=eye", label: "Eye care" },
    { href: "/products?q=lip", label: "Lip care" },
  ] satisfies MegaMenuLink[],
  makeup: [
    { href: "/products?q=base", label: "Base & cushion" },
    { href: "/products?q=concealer", label: "Concealer" },
    { href: "/products?q=eye", label: "Eye makeup" },
    { href: "/products?q=lip", label: "Lip makeup" },
    { href: "/products?q=cheek", label: "Cheek & contour" },
    { href: "/products?q=brow", label: "Brows" },
    { href: "/products?q=tool", label: "Tools & brushes" },
    { href: "/products?q=set", label: "Makeup sets" },
  ] satisfies MegaMenuLink[],
  hairBody: [
    { href: "/products?q=shampoo", label: "Shampoo & care" },
    { href: "/products?q=treatment", label: "Hair treatment" },
    { href: "/products?q=styling", label: "Styling" },
    { href: "/products?q=body", label: "Body care" },
    { href: "/products?q=hand", label: "Hand & foot" },
    { href: "/products?q=scalp", label: "Scalp care" },
    { href: "/products?q=bath", label: "Bath" },
    { href: "/products?q=oral", label: "Oral care" },
  ] satisfies MegaMenuLink[],
  collections: [
    { href: "/bestsellers", label: "Bestsellers" },
    { href: "/products", label: "New arrivals" },
    { href: "/products?q=set", label: "Sets & bundles" },
    { href: "/products?q=gift", label: "Gifts" },
    { href: "/wishlist", label: "Editor’s picks" },
    { href: "/brands", label: "Shop by brand" },
    { href: "/blog", label: "Journal features" },
    { href: "/quiz", label: "Routine finder" },
  ] satisfies MegaMenuLink[],
} as const;
