-- Phase 2: cart_items, addresses, reviews, order policies, profile trigger, storage

-- ---------------------------------------------------------------------------
-- cart_items (persistent cart per user)
-- ---------------------------------------------------------------------------
create table if not exists public.cart_items (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete cascade,
  quantity int not null check (quantity > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, product_id)
);

create index if not exists cart_items_user_id_idx on public.cart_items (user_id);

drop trigger if exists cart_items_updated_at on public.cart_items;
create trigger cart_items_updated_at
  before update on public.cart_items
  for each row execute function public.set_updated_at();

alter table public.cart_items enable row level security;

create policy "cart_items_select_own" on public.cart_items
  for select using (auth.uid() = user_id);

create policy "cart_items_insert_own" on public.cart_items
  for insert with check (auth.uid() = user_id);

create policy "cart_items_update_own" on public.cart_items
  for update using (auth.uid() = user_id);

create policy "cart_items_delete_own" on public.cart_items
  for delete using (auth.uid() = user_id);

create policy "cart_items_admin_all" on public.cart_items
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
  );

-- ---------------------------------------------------------------------------
-- addresses (shipping / saved addresses)
-- ---------------------------------------------------------------------------
create table if not exists public.addresses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users (id) on delete cascade,
  label text,
  line1 text not null,
  line2 text,
  city text not null,
  region text,
  postal text not null,
  country text not null default 'KR',
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists addresses_user_id_idx on public.addresses (user_id);

drop trigger if exists addresses_updated_at on public.addresses;
create trigger addresses_updated_at
  before update on public.addresses
  for each row execute function public.set_updated_at();

alter table public.addresses enable row level security;

create policy "addresses_select_own" on public.addresses
  for select using (auth.uid() = user_id);

create policy "addresses_insert_own" on public.addresses
  for insert with check (auth.uid() = user_id);

create policy "addresses_update_own" on public.addresses
  for update using (auth.uid() = user_id);

create policy "addresses_delete_own" on public.addresses
  for delete using (auth.uid() = user_id);

create policy "addresses_admin_select" on public.addresses
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
  );

-- ---------------------------------------------------------------------------
-- reviews
-- ---------------------------------------------------------------------------
create table if not exists public.reviews (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references public.products (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  rating int not null check (rating >= 1 and rating <= 5),
  title text,
  body text,
  is_approved boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (product_id, user_id)
);

create index if not exists reviews_product_id_idx on public.reviews (product_id);

drop trigger if exists reviews_updated_at on public.reviews;
create trigger reviews_updated_at
  before update on public.reviews
  for each row execute function public.set_updated_at();

alter table public.reviews enable row level security;

create policy "reviews_select_public" on public.reviews
  for select using (is_approved = true or auth.uid() = user_id);

create policy "reviews_insert_own" on public.reviews
  for insert with check (auth.uid() = user_id);

create policy "reviews_update_own" on public.reviews
  for update using (auth.uid() = user_id);

create policy "reviews_admin_all" on public.reviews
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
  );

-- ---------------------------------------------------------------------------
-- orders: require authenticated user for inserts (persisted order history)
-- ---------------------------------------------------------------------------
drop policy if exists "orders_insert_own" on public.orders;
create policy "orders_insert_own" on public.orders
  for insert with check (auth.uid() = user_id);

drop policy if exists "orders_update_admin" on public.orders;
create policy "orders_update_admin" on public.orders
  for update using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
  );

-- ---------------------------------------------------------------------------
-- order_items: shoppers can insert line items for their own orders
-- ---------------------------------------------------------------------------
drop policy if exists "order_items_insert_own" on public.order_items;
create policy "order_items_insert_own" on public.order_items
  for insert with check (
    exists (
      select 1 from public.orders o
      where o.id = order_id and o.user_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- profiles: admin can update customer profiles (support / CRM)
-- ---------------------------------------------------------------------------
drop policy if exists "profiles_update_admin" on public.profiles;
create policy "profiles_update_admin" on public.profiles
  for update using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
  );

-- ---------------------------------------------------------------------------
-- Auto-create profile on signup
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do update
    set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Storage: product images (public read; admin write)
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-images',
  'product-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
)
on conflict (id) do nothing;

drop policy if exists "product_images_public_read" on storage.objects;
drop policy if exists "product_images_admin_insert" on storage.objects;
drop policy if exists "product_images_admin_update" on storage.objects;
drop policy if exists "product_images_admin_delete" on storage.objects;

create policy "product_images_public_read"
on storage.objects for select
using (bucket_id = 'product-images');

create policy "product_images_admin_insert"
on storage.objects for insert
with check (
  bucket_id = 'product-images'
  and exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
);

create policy "product_images_admin_update"
on storage.objects for update
using (
  bucket_id = 'product-images'
  and exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
);

create policy "product_images_admin_delete"
on storage.objects for delete
using (
  bucket_id = 'product-images'
  and exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
);
