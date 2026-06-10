-- Phase 4: Premium growth, conversion, content, and marketplace analytics

create type public.coupon_type as enum ('percent', 'fixed_amount', 'free_shipping');
create type public.partnership_status as enum ('prospect', 'active', 'paused', 'completed');

create table if not exists public.brands (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  name text not null,
  tagline text,
  description text,
  hero_image_url text,
  logo_url text,
  country text not null default 'KR',
  seo_title text,
  seo_description text,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products
  add column if not exists brand_id uuid references public.brands (id) on delete set null,
  add column if not exists skin_concerns text[] not null default '{}',
  add column if not exists skin_types text[] not null default '{}',
  add column if not exists routine_step text,
  add column if not exists video_url text,
  add column if not exists conversion_score numeric(6,2) not null default 0;

create index if not exists products_brand_id_idx on public.products (brand_id);
create index if not exists products_skin_concerns_idx on public.products using gin (skin_concerns);

create table if not exists public.blog_posts (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  body text not null,
  author_name text not null default 'Uvely Editorial',
  hero_image_url text,
  tags text[] not null default '{}',
  related_product_ids uuid[] not null default '{}',
  seo_title text,
  seo_description text,
  og_image_url text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  source text not null default 'site',
  skin_concern text,
  coupon_code text,
  created_at timestamptz not null default now()
);

create table if not exists public.coupons (
  id uuid primary key default uuid_generate_v4(),
  code text not null unique,
  description text,
  type public.coupon_type not null,
  value int not null,
  min_order_krw int not null default 0,
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  usage_limit int,
  used_count int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.referrals (
  id uuid primary key default uuid_generate_v4(),
  referrer_user_id uuid references auth.users (id) on delete cascade,
  referred_email text not null,
  referral_code text not null,
  reward_coupon_id uuid references public.coupons (id) on delete set null,
  converted_order_id uuid references public.orders (id) on delete set null,
  created_at timestamptz not null default now(),
  unique (referral_code, referred_email)
);

create table if not exists public.affiliate_profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users (id) on delete cascade,
  display_name text not null,
  handle text not null unique,
  payout_email text,
  commission_rate numeric(5,2) not null default 10,
  clicks int not null default 0,
  conversions int not null default 0,
  revenue_krw int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.influencer_partnerships (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  handle text not null,
  platform text not null,
  status public.partnership_status not null default 'prospect',
  audience_size int,
  campaign_name text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.skincare_quiz_results (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users (id) on delete cascade,
  email text,
  skin_type text not null,
  concerns text[] not null default '{}',
  budget_krw int,
  routine_goal text,
  recommended_product_ids uuid[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.product_media (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references public.products (id) on delete cascade,
  media_type text not null check (media_type in ('image', 'video', 'before_after')),
  url text not null,
  alt text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.product_comparisons (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  title text not null,
  product_ids uuid[] not null default '{}',
  seo_description text,
  created_at timestamptz not null default now()
);

create table if not exists public.analytics_events (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users (id) on delete set null,
  event_name text not null,
  product_id uuid references public.products (id) on delete set null,
  order_id uuid references public.orders (id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.reviews
  add column if not exists is_verified_purchase boolean not null default false,
  add column if not exists before_image_url text,
  add column if not exists after_image_url text;

alter table public.brands enable row level security;
alter table public.blog_posts enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.coupons enable row level security;
alter table public.referrals enable row level security;
alter table public.affiliate_profiles enable row level security;
alter table public.influencer_partnerships enable row level security;
alter table public.skincare_quiz_results enable row level security;
alter table public.product_media enable row level security;
alter table public.product_comparisons enable row level security;
alter table public.analytics_events enable row level security;

create policy "brands_select_public" on public.brands for select using (true);
create policy "blog_posts_select_published" on public.blog_posts for select using (published_at is not null and published_at <= now());
create policy "coupons_select_active" on public.coupons for select using (is_active = true);
create policy "product_media_select_public" on public.product_media for select using (true);
create policy "product_comparisons_select_public" on public.product_comparisons for select using (true);
create policy "newsletter_insert_public" on public.newsletter_subscribers for insert with check (true);
create policy "quiz_insert_public" on public.skincare_quiz_results for insert with check (user_id is null or auth.uid() = user_id);
create policy "quiz_select_own" on public.skincare_quiz_results for select using (auth.uid() = user_id);
create policy "referrals_select_own" on public.referrals for select using (auth.uid() = referrer_user_id);
create policy "referrals_insert_own" on public.referrals for insert with check (auth.uid() = referrer_user_id);
create policy "affiliate_select_own" on public.affiliate_profiles for select using (auth.uid() = user_id);
create policy "analytics_insert_public" on public.analytics_events for insert with check (true);

create policy "brands_admin_all" on public.brands for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "blog_posts_admin_all" on public.blog_posts for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "marketing_admin_all" on public.newsletter_subscribers for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "coupons_admin_all" on public.coupons for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "referrals_admin_all" on public.referrals for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "affiliate_admin_all" on public.affiliate_profiles for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "influencers_admin_all" on public.influencer_partnerships for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "quiz_admin_all" on public.skincare_quiz_results for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "product_media_admin_all" on public.product_media for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "comparisons_admin_all" on public.product_comparisons for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "analytics_admin_all" on public.analytics_events for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));

drop trigger if exists brands_updated_at on public.brands;
create trigger brands_updated_at before update on public.brands for each row execute function public.set_updated_at();

drop trigger if exists blog_posts_updated_at on public.blog_posts;
create trigger blog_posts_updated_at before update on public.blog_posts for each row execute function public.set_updated_at();

insert into public.brands (slug, name, tagline, description, hero_image_url, is_featured, seo_title, seo_description) values
  ('beauty-of-joseon', 'Beauty of Joseon', 'Hanbang glow rituals', 'Heritage-inspired Korean skincare focused on rice, ginseng, and daily SPF rituals.', 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=1200&q=80', true, 'Beauty of Joseon Korean skincare', 'Shop Beauty of Joseon sunscreen, serums, and hanbang glow rituals.'),
  ('cosrx', 'COSRX', 'Clinical barrier care', 'Problem-solving K-beauty staples for hydration, texture, and sensitive-skin recovery.', 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1200&q=80', true, 'COSRX snail mucin and barrier care', 'Discover COSRX essences, toners, and gentle Korean skincare essentials.'),
  ('skin1004', 'SKIN1004', 'Centella from Madagascar', 'Minimalist centella-focused formulas for calm, hydrated, resilient skin.', 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1200&q=80', true, 'SKIN1004 centella Korean skincare', 'Shop SKIN1004 centella ampoules and soothing Korean skincare.')
on conflict (slug) do nothing;

insert into public.coupons (code, description, type, value, min_order_krw) values
  ('GLOW10', '10% off first Uvely Glow order', 'percent', 10, 15000),
  ('FREESHIPNP', 'Free Nepal delivery on routine orders', 'free_shipping', 100, 30000)
on conflict (code) do nothing;
