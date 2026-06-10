import type { OrderLineSnapshot } from "@/types";

export function makeInvoiceNumber(orderId: string, createdAt: string) {
  const date = new Date(createdAt);
  const stamp = Number.isNaN(date.valueOf())
    ? "00000000"
    : date.toISOString().slice(0, 10).replaceAll("-", "");
  return `UV-NP-${stamp}-${orderId.slice(0, 8).toUpperCase()}`;
}

export function buildInvoiceRows(items: OrderLineSnapshot[]) {
  return items.map((item) => ({
    description: item.name,
    quantity: item.quantity,
    unitPriceKrw: item.unitPriceKrw,
    lineTotalKrw: item.unitPriceKrw * item.quantity,
  }));
}
