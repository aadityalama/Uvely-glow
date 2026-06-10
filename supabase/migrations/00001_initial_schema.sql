-- Uvely Glow — PostgreSQL schema for Supabase
-- Run in Supabase SQL editor or via supabase db push

create extension if not exists "uuid-ossp";

-- Categories
create table if not exists public.categories (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  name text not null,
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Products
create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  name text not null,
  description text not null,
  short_description text,
  price_krw int not null check (price_krw >= 0),
  compare_at_krw int,
  sku text unique,
  stock int not null default 0 check (stock >= 0),
  low_stock_threshold int not null default 5,
  image_url text not null,
  gallery_urls text[] default '{}',
  category_id uuid references public.categories (id) on delete set null,
  ingredients text,
  is_featured boolean not null default false,
  is_active boolean not null default true,
  meta_title text,
  meta_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_category_id_idx on public.products (category_id);
create index if not exists products_slug_idx on public.products (slug);
create index if not exists products_featured_idx on public.products (is_featured) where is_featured = true;

-- Profiles (1:1 with auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  phone text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Orders
create type public.order_status as enum (
  'pending',
  'paid',
  'processing',
  'shipped',
  'delivered',
  'cancelled'
);

create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users (id) on delete set null,
  email text not null,
  status public.order_status not null default 'pending',
  subtotal_krw int not null,
  shipping_krw int not null default 0,
  tax_krw int not null default 0,
  total_krw int not null,
  shipping_name text,
  shipping_line1 text,
  shipping_line2 text,
  shipping_city text,
  shipping_region text,
  shipping_postal text,
  shipping_country text default 'KR',
  stripe_payment_intent_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_user_id_idx on public.orders (user_id);

create table if not exists public.order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id uuid references public.products (id) on delete set null,
  name_snapshot text not null,
  unit_price_krw int not null,
  quantity int not null check (quantity > 0)
);

create index if not exists order_items_order_id_idx on public.order_items (order_id);

-- Wishlist
create table if not exists public.wishlist_items (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);

-- Inventory log (admin)
create table if not exists public.inventory_adjustments (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references public.products (id) on delete cascade,
  delta int not null,
  reason text,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

-- updated_at trigger helper
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists products_updated_at on public.products;
create trigger products_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists orders_updated_at on public.orders;
create trigger orders_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

-- RLS (enable; tune policies for your auth model)
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.wishlist_items enable row level security;
alter table public.inventory_adjustments enable row level security;

-- Public read for catalog
create policy "categories_select_public" on public.categories
  for select using (true);

create policy "products_select_public" on public.products
  for select using (is_active = true);

-- Profiles: users manage own row
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

-- Orders: own orders
create policy "orders_select_own" on public.orders
  for select using (auth.uid() = user_id);

create policy "orders_insert_own" on public.orders
  for insert with check (auth.uid() = user_id or user_id is null);

create policy "order_items_select_own" on public.order_items
  for select using (
    exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid())
  );

-- Wishlist
create policy "wishlist_select_own" on public.wishlist_items
  for select using (auth.uid() = user_id);

create policy "wishlist_insert_own" on public.wishlist_items
  for insert with check (auth.uid() = user_id);

create policy "wishlist_delete_own" on public.wishlist_items
  for delete using (auth.uid() = user_id);

-- Admin policies (service role bypasses RLS; for dashboard use service role or is_admin check in app)
-- Example: admin full access on products (requires profiles.is_admin = true)
create policy "products_admin_all" on public.products
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
  );

create policy "categories_admin_all" on public.categories
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
  );

create policy "orders_admin_all" on public.orders
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
  );

create policy "order_items_admin_all" on public.order_items
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
  );

create policy "inventory_admin_all" on public.inventory_adjustments
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
  );

create policy "profiles_admin_select" on public.profiles
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
  );
