export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentMethod = "esewa" | "khalti" | "cash_on_delivery";
export type PaymentStatus = "unpaid" | "initiated" | "paid" | "failed" | "refunded";
export type ShippingMethod = "standard" | "express" | "valley_same_day";

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  sortOrder: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  priceKrw: number;
  compareAtKrw: number | null;
  sku: string;
  stock: number;
  lowStockThreshold: number;
  imageUrl: string;
  galleryUrls: string[];
  categoryId: string;
  ingredients: string;
  isFeatured: boolean;
  isActive: boolean;
}

export interface CartLine {
  productId: string;
  quantity: number;
}

export interface OrderLineSnapshot {
  productId: string;
  name: string;
  unitPriceKrw: number;
  quantity: number;
}

export interface LocalOrder {
  id: string;
  createdAt: string;
  email: string;
  status: OrderStatus;
  subtotalKrw: number;
  shippingKrw: number;
  taxKrw: number;
  totalKrw: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  shippingMethod: ShippingMethod;
  deliveryProvince: string;
  deliveryDistrict: string;
  trackingNumber: string;
  estimatedDeliveryDays: number | null;
  invoiceNumber: string;
  items: OrderLineSnapshot[];
  shipping: {
    name: string;
    line1: string;
    line2: string;
    city: string;
    region: string;
    postal: string;
    country: string;
  };
}

export interface CustomerProfile {
  fullName: string;
  email: string;
  phone: string;
}
