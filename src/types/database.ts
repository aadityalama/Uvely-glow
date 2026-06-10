/**
 * Supabase / PostgreSQL row shapes aligned with `supabase/migrations/00001_initial_schema.sql`.
 * Use with generated types from Supabase CLI in production; kept explicit here for the repo.
 */
export type DbOrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface DbCategoryRow {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  sort_order: number;
  created_at: string;
}

export interface DbProductRow {
  id: string;
  slug: string;
  name: string;
  description: string;
  short_description: string | null;
  price_krw: number;
  compare_at_krw: number | null;
  sku: string | null;
  stock: number;
  low_stock_threshold: number;
  image_url: string;
  gallery_urls: string[] | null;
  category_id: string | null;
  ingredients: string | null;
  is_featured: boolean;
  is_active: boolean;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbProfileRow {
  id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbOrderRow {
  id: string;
  user_id: string | null;
  email: string;
  status: DbOrderStatus;
  subtotal_krw: number;
  shipping_krw: number;
  tax_krw: number;
  total_krw: number;
  shipping_name: string | null;
  shipping_line1: string | null;
  shipping_line2: string | null;
  shipping_city: string | null;
  shipping_region: string | null;
  shipping_postal: string | null;
  shipping_country: string | null;
  stripe_payment_intent_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbOrderItemRow {
  id: string;
  order_id: string;
  product_id: string | null;
  name_snapshot: string;
  unit_price_krw: number;
  quantity: number;
}
