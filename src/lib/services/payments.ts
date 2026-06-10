export type PaymentMethod = "esewa" | "khalti" | "cash_on_delivery";
export type PaymentStatus = "unpaid" | "initiated" | "paid" | "failed" | "refunded";

export type PaymentIntent = {
  method: PaymentMethod;
  status: PaymentStatus;
  providerRef: string | null;
  redirectUrl: string | null;
  message: string;
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  esewa: "eSewa",
  khalti: "Khalti",
  cash_on_delivery: "Cash on Delivery",
};

export function createPaymentIntent({
  method,
  orderId,
  totalKrw,
}: {
  method: PaymentMethod;
  orderId: string;
  totalKrw: number;
}): PaymentIntent {
  if (method === "cash_on_delivery") {
    return {
      method,
      status: "unpaid",
      providerRef: `cod_${orderId.slice(0, 12)}`,
      redirectUrl: null,
      message: "Collect payment when the order is delivered.",
    };
  }

  const providerRef = `${method}_${orderId.slice(0, 12)}_${Date.now()}`;
  const params = new URLSearchParams({
    order_id: orderId,
    amount: String(totalKrw),
    ref: providerRef,
  });

  return {
    method,
    status: "initiated",
    providerRef,
    redirectUrl:
      method === "esewa"
        ? `/checkout/payment/esewa?${params}`
        : `/checkout/payment/khalti?${params}`,
    message: `${PAYMENT_METHOD_LABELS[method]} payment intent created. Wire credentials and callback verification before production capture.`,
  };
}
