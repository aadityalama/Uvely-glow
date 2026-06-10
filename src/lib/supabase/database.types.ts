export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type OrderStatusDb =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentMethodDb = "esewa" | "khalti" | "cash_on_delivery";
export type PaymentStatusDb =
  | "unpaid"
  | "initiated"
  | "paid"
  | "failed"
  | "refunded";
export type FulfillmentStatusDb =
  | "unfulfilled"
  | "packed"
  | "shipped"
  | "delivered"
  | "returned";
export type NotificationTypeDb =
  | "order_placed"
  | "payment_success"
  | "order_shipped"
  | "order_delivered";

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          description?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          description?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
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
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          description: string;
          short_description?: string | null;
          price_krw: number;
          compare_at_krw?: number | null;
          sku?: string | null;
          stock?: number;
          low_stock_threshold?: number;
          image_url: string;
          gallery_urls?: string[] | null;
          category_id?: string | null;
          ingredients?: string | null;
          is_featured?: boolean;
          is_active?: boolean;
          meta_title?: string | null;
          meta_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          description?: string;
          short_description?: string | null;
          price_krw?: number;
          compare_at_krw?: number | null;
          sku?: string | null;
          stock?: number;
          low_stock_threshold?: number;
          image_url?: string;
          gallery_urls?: string[] | null;
          category_id?: string | null;
          ingredients?: string | null;
          is_featured?: boolean;
          is_active?: boolean;
          meta_title?: string | null;
          meta_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          phone: string | null;
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          phone?: string | null;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          full_name?: string | null;
          phone?: string | null;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      cart_items: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          quantity: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id: string;
          quantity: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_id?: string;
          quantity?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      wishlist_items: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_id?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          email: string;
          status: OrderStatusDb;
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
          payment_method: PaymentMethodDb;
          payment_status: PaymentStatusDb;
          payment_provider_ref: string | null;
          shipping_method: string;
          shipping_provider: string | null;
          delivery_fee_krw: number;
          delivery_province: string | null;
          delivery_district: string | null;
          tracking_number: string | null;
          estimated_delivery_days: number | null;
          packed_at: string | null;
          shipped_at: string | null;
          delivered_at: string | null;
          invoice_number: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          email: string;
          status?: OrderStatusDb;
          subtotal_krw: number;
          shipping_krw?: number;
          tax_krw?: number;
          total_krw: number;
          shipping_name?: string | null;
          shipping_line1?: string | null;
          shipping_line2?: string | null;
          shipping_city?: string | null;
          shipping_region?: string | null;
          shipping_postal?: string | null;
          shipping_country?: string | null;
          stripe_payment_intent_id?: string | null;
          payment_method?: PaymentMethodDb;
          payment_status?: PaymentStatusDb;
          payment_provider_ref?: string | null;
          shipping_method?: string;
          shipping_provider?: string | null;
          delivery_fee_krw?: number;
          delivery_province?: string | null;
          delivery_district?: string | null;
          tracking_number?: string | null;
          estimated_delivery_days?: number | null;
          packed_at?: string | null;
          shipped_at?: string | null;
          delivered_at?: string | null;
          invoice_number?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          email?: string;
          status?: OrderStatusDb;
          subtotal_krw?: number;
          shipping_krw?: number;
          tax_krw?: number;
          total_krw?: number;
          shipping_name?: string | null;
          shipping_line1?: string | null;
          shipping_line2?: string | null;
          shipping_city?: string | null;
          shipping_region?: string | null;
          shipping_postal?: string | null;
          shipping_country?: string | null;
          stripe_payment_intent_id?: string | null;
          payment_method?: PaymentMethodDb;
          payment_status?: PaymentStatusDb;
          payment_provider_ref?: string | null;
          shipping_method?: string;
          shipping_provider?: string | null;
          delivery_fee_krw?: number;
          delivery_province?: string | null;
          delivery_district?: string | null;
          tracking_number?: string | null;
          estimated_delivery_days?: number | null;
          packed_at?: string | null;
          shipped_at?: string | null;
          delivered_at?: string | null;
          invoice_number?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string | null;
          name_snapshot: string;
          unit_price_krw: number;
          quantity: number;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id?: string | null;
          name_snapshot: string;
          unit_price_krw: number;
          quantity: number;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string | null;
          name_snapshot?: string;
          unit_price_krw?: number;
          quantity?: number;
        };
        Relationships: [];
      };
      addresses: {
        Row: {
          id: string;
          user_id: string;
          label: string | null;
          line1: string;
          line2: string | null;
          city: string;
          region: string | null;
          postal: string;
          country: string;
          is_default: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          label?: string | null;
          line1: string;
          line2?: string | null;
          city: string;
          region?: string | null;
          postal: string;
          country?: string;
          is_default?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          label?: string | null;
          line1?: string;
          line2?: string | null;
          city?: string;
          region?: string | null;
          postal?: string;
          country?: string;
          is_default?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      reviews: {
        Row: {
          id: string;
          product_id: string;
          user_id: string;
          rating: number;
          title: string | null;
          body: string | null;
          is_approved: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          user_id: string;
          rating: number;
          title?: string | null;
          body?: string | null;
          is_approved?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          user_id?: string;
          rating?: number;
          title?: string | null;
          body?: string | null;
          is_approved?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      order_status_events: {
        Row: {
          id: string;
          order_id: string;
          status: OrderStatusDb;
          fulfillment_status: FulfillmentStatusDb;
          note: string | null;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          status: OrderStatusDb;
          fulfillment_status?: FulfillmentStatusDb;
          note?: string | null;
          created_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          status?: OrderStatusDb;
          fulfillment_status?: FulfillmentStatusDb;
          note?: string | null;
          created_by?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      order_notifications: {
        Row: {
          id: string;
          order_id: string;
          user_id: string | null;
          type: NotificationTypeDb;
          channel: string;
          title: string;
          message: string;
          read_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          user_id?: string | null;
          type: NotificationTypeDb;
          channel?: string;
          title: string;
          message: string;
          read_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          user_id?: string | null;
          type?: NotificationTypeDb;
          channel?: string;
          title?: string;
          message?: string;
          read_at?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      nepal_districts: {
        Row: {
          id: string;
          province: string;
          district: string;
          zone_name: string | null;
          base_delivery_fee_krw: number;
          remote_surcharge_krw: number;
          estimated_days_min: number;
          estimated_days_max: number;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          province: string;
          district: string;
          zone_name?: string | null;
          base_delivery_fee_krw?: number;
          remote_surcharge_krw?: number;
          estimated_days_min?: number;
          estimated_days_max?: number;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          province?: string;
          district?: string;
          zone_name?: string | null;
          base_delivery_fee_krw?: number;
          remote_surcharge_krw?: number;
          estimated_days_min?: number;
          estimated_days_max?: number;
          is_active?: boolean;
        };
        Relationships: [];
      };
      inventory_adjustments: {
        Row: {
          id: string;
          product_id: string;
          delta: number;
          reason: string | null;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          delta: number;
          reason?: string | null;
          created_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          delta?: number;
          reason?: string | null;
          created_by?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
