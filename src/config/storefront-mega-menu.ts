/**
 * Mega-menu tree aligned with storefront reference (CATEGORIES dropdown).
 */
export type MegaMenuLink = { href: string; label: string };

export type MegaCollectionItem = {
  href: string;
  label: string;
  hint: string;
  /** Small circular thumbnail */
  imageSrc: string;
};

export const REFERENCE_MEGA_MENU = {
  skincare: [
    { href: "/products?q=cleanser", label: "Cleansers" },
    { href: "/categories/toners", label: "Toners" },
    { href: "/categories/serums-essences", label: "Serums & Ampoules" },
    { href: "/categories/creams", label: "Moisturizers" },
    { href: "/categories/sun-protection", label: "Sunscreen" },
    { href: "/categories/lips-masks", label: "Sheet Masks" },
    { href: "/products?q=eye", label: "Eye Care" },
    { href: "/products?q=lip", label: "Lip Care" },
  ] satisfies MegaMenuLink[],
  makeup: [
    { href: "/products?q=face", label: "Face" },
    { href: "/products?q=lip", label: "Lips" },
    { href: "/products?q=eye", label: "Eyes" },
    { href: "/products?q=base", label: "Base Makeup" },
    { href: "/products?q=tool", label: "Makeup Tools" },
  ] satisfies MegaMenuLink[],
  hairBody: [
    { href: "/products?q=hair", label: "Hair Care" },
    { href: "/products?q=body", label: "Body Care" },
    { href: "/products?q=hand", label: "Hand & Foot" },
    { href: "/products?q=fragrance", label: "Fragrance" },
  ] satisfies MegaMenuLink[],
  collections: [
    {
      href: "/bestsellers",
      label: "Glass Skin Edit",
      hint: "For radiant skin",
      imageSrc:
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=120&h=120&q=80",
    },
    {
      href: "/products",
      label: "K-Beauty Essentials",
      hint: "Daily must-haves",
      imageSrc:
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=120&h=120&q=80",
    },
    {
      href: "/products?q=anti-aging",
      label: "Anti-Aging Solutions",
      hint: "Timeless beauty",
      imageSrc:
        "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=120&h=120&q=80",
    },
    {
      href: "/products?q=clean",
      label: "Clean Beauty",
      hint: "Gentle & effective",
      imageSrc:
        "https://images.unsplash.com/photo-1741896136069-f3588d8993b5?auto=format&fit=crop&w=120&h=120&q=80",
    },
  ] satisfies MegaCollectionItem[],
} as const;
