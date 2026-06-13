import type { Metadata } from "next";
import { ShippingInfoRedirect } from "./shipping-info-redirect";

export const metadata: Metadata = {
  title: "Shipping Information",
  description: "Nepal delivery rates and service details for Uvely Glow orders.",
};

export default function ShippingInformationAliasPage() {
  return <ShippingInfoRedirect />;
}
