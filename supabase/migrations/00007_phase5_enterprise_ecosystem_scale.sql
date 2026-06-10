-- Phase 5: Enterprise ecosystem, mobile foundation, loyalty, subscriptions, operations, BI, and security

create type public.loyalty_tier as enum ('silver', 'gold', 'platinum');
create type public.subscription_status as enum ('active', 'paused', 'past_due', 'cancelled');
create type public.support_ticket_status as enum ('open', 'pending', 'resolved', 'closed');
create type public.vendor_status as enum ('draft', 'review', 'active', 'suspended');
create type public.purchase_order_status as enum ('draft', 'submitted', 'received', 'cancelled');

create table if not exists public.mobile_devices (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users (id) on delete cascade,
  platform text not null check (platform in ('ios', 'android', 'web')),
  device_token text,
  app_version text,
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.push_subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users (id) on delete cascade,
  mobile_device_id uuid references public.mobile_devices (id) on delete cascade,
  topic text not null,
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  unique (user_id, topic)
);

create table if not exists public.loyalty_accounts (
  user_id uuid primary key references auth.users (id) on delete cascade,
  points_balance int not null default 0,
  lifetime_points int not null default 0,
  tier public.loyalty_tier not null default 'silver',
  referral_code text not null unique default upper(substr(replace(uuid_generate_v4()::text, '-', ''), 1, 10)),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.loyalty_transactions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users (id) on delete cascade,
  order_id uuid references public.orders (id) on delete set null,
  points int not null,
  reason text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.kbeauty_box_subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users (id) on delete cascade,
  status public.subscription_status not null default 'active',
  plan_name text not null default 'Monthly K-Beauty Box',
  price_krw int not null default 49000,
  cadence text not null default 'monthly',
  next_renewal_at timestamptz,
  last_renewed_at timestamptz,
  shipping_address_id uuid references public.addresses (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subscription_events (
  id uuid primary key default uuid_generate_v4(),
  subscription_id uuid not null references public.kbeauty_box_subscriptions (id) on delete cascade,
  event_name text not null,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists public.support_faqs (
  id uuid primary key default uuid_generate_v4(),
  category text not null,
  question text not null,
  answer text not null,
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.support_tickets (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users (id) on delete set null,
  email text not null,
  subject text not null,
  status public.support_ticket_status not null default 'open',
  priority text not null default 'normal',
  ai_summary text,
  assigned_to uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.support_messages (
  id uuid primary key default uuid_generate_v4(),
  ticket_id uuid not null references public.support_tickets (id) on delete cascade,
  sender_user_id uuid references auth.users (id) on delete set null,
  sender_role text not null default 'customer',
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.vendors (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  name text not null,
  contact_email text,
  status public.vendor_status not null default 'draft',
  commission_rate numeric(5,2) not null default 15,
  payout_terms text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.vendor_onboarding_steps (
  id uuid primary key default uuid_generate_v4(),
  vendor_id uuid not null references public.vendors (id) on delete cascade,
  step_key text not null,
  label text not null,
  completed_at timestamptz,
  unique (vendor_id, step_key)
);

create table if not exists public.warehouse_locations (
  id uuid primary key default uuid_generate_v4(),
  code text not null unique,
  name text not null,
  city text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.warehouse_inventory (
  id uuid primary key default uuid_generate_v4(),
  warehouse_id uuid not null references public.warehouse_locations (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete cascade,
  on_hand int not null default 0,
  allocated int not null default 0,
  reorder_point int not null default 10,
  forecast_30d int not null default 0,
  updated_at timestamptz not null default now(),
  unique (warehouse_id, product_id)
);

create table if not exists public.low_stock_alerts (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references public.products (id) on delete cascade,
  warehouse_id uuid references public.warehouse_locations (id) on delete cascade,
  threshold int not null,
  current_stock int not null,
  resolved_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.purchase_orders (
  id uuid primary key default uuid_generate_v4(),
  vendor_id uuid references public.vendors (id) on delete set null,
  status public.purchase_order_status not null default 'draft',
  expected_at timestamptz,
  total_krw int not null default 0,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.purchase_order_items (
  id uuid primary key default uuid_generate_v4(),
  purchase_order_id uuid not null references public.purchase_orders (id) on delete cascade,
  product_id uuid references public.products (id) on delete set null,
  quantity int not null check (quantity > 0),
  unit_cost_krw int not null default 0
);

create table if not exists public.marketing_campaigns (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  name text not null,
  channel text not null,
  budget_krw int not null default 0,
  starts_at timestamptz,
  ends_at timestamptz,
  status text not null default 'planned',
  created_at timestamptz not null default now()
);

create table if not exists public.affiliate_commissions (
  id uuid primary key default uuid_generate_v4(),
  affiliate_profile_id uuid references public.affiliate_profiles (id) on delete set null,
  order_id uuid references public.orders (id) on delete set null,
  commission_krw int not null,
  status text not null default 'pending',
  payable_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.executive_metric_snapshots (
  id uuid primary key default uuid_generate_v4(),
  snapshot_date date not null unique default current_date,
  revenue_krw int not null default 0,
  gross_margin_krw int not null default 0,
  orders_count int not null default 0,
  active_customers int not null default 0,
  forecast_revenue_krw int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.customer_cohorts (
  id uuid primary key default uuid_generate_v4(),
  cohort_month date not null,
  customers_count int not null default 0,
  repeat_purchase_rate numeric(5,2) not null default 0,
  avg_ltv_krw int not null default 0,
  created_at timestamptz not null default now(),
  unique (cohort_month)
);

create table if not exists public.audit_logs (
  id uuid primary key default uuid_generate_v4(),
  actor_user_id uuid references auth.users (id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  ip_address text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.rate_limit_events (
  id uuid primary key default uuid_generate_v4(),
  key text not null,
  route text not null,
  hits int not null default 1,
  window_started_at timestamptz not null default now(),
  blocked boolean not null default false
);

create table if not exists public.admin_activity_logs (
  id uuid primary key default uuid_generate_v4(),
  admin_user_id uuid references auth.users (id) on delete set null,
  activity text not null,
  target text,
  created_at timestamptz not null default now()
);

create table if not exists public.cache_invalidation_log (
  id uuid primary key default uuid_generate_v4(),
  cache_key text not null,
  reason text,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.mobile_devices enable row level security;
alter table public.push_subscriptions enable row level security;
alter table public.loyalty_accounts enable row level security;
alter table public.loyalty_transactions enable row level security;
alter table public.kbeauty_box_subscriptions enable row level security;
alter table public.subscription_events enable row level security;
alter table public.support_faqs enable row level security;
alter table public.support_tickets enable row level security;
alter table public.support_messages enable row level security;
alter table public.vendors enable row level security;
alter table public.vendor_onboarding_steps enable row level security;
alter table public.warehouse_locations enable row level security;
alter table public.warehouse_inventory enable row level security;
alter table public.low_stock_alerts enable row level security;
alter table public.purchase_orders enable row level security;
alter table public.purchase_order_items enable row level security;
alter table public.marketing_campaigns enable row level security;
alter table public.affiliate_commissions enable row level security;
alter table public.executive_metric_snapshots enable row level security;
alter table public.customer_cohorts enable row level security;
alter table public.audit_logs enable row level security;
alter table public.rate_limit_events enable row level security;
alter table public.admin_activity_logs enable row level security;
alter table public.cache_invalidation_log enable row level security;

create policy "support_faqs_public_read" on public.support_faqs for select using (is_published = true);
create policy "loyalty_accounts_own" on public.loyalty_accounts for select using (auth.uid() = user_id);
create policy "loyalty_transactions_own" on public.loyalty_transactions for select using (auth.uid() = user_id);
create policy "subscriptions_own" on public.kbeauty_box_subscriptions for select using (auth.uid() = user_id);
create policy "support_tickets_own" on public.support_tickets for select using (auth.uid() = user_id);
create policy "support_tickets_insert_own" on public.support_tickets for insert with check (auth.uid() = user_id or user_id is null);
create policy "support_messages_own" on public.support_messages for select using (
  exists (select 1 from public.support_tickets t where t.id = ticket_id and t.user_id = auth.uid())
);
create policy "mobile_devices_own" on public.mobile_devices for all using (auth.uid() = user_id);
create policy "push_subscriptions_own" on public.push_subscriptions for all using (auth.uid() = user_id);

create policy "phase5_admin_all_mobile_devices" on public.mobile_devices for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "phase5_admin_all_push" on public.push_subscriptions for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "phase5_admin_all_loyalty" on public.loyalty_accounts for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "phase5_admin_all_loyalty_tx" on public.loyalty_transactions for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "phase5_admin_all_subscriptions" on public.kbeauty_box_subscriptions for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "phase5_admin_all_subscription_events" on public.subscription_events for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "phase5_admin_all_support_faqs" on public.support_faqs for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "phase5_admin_all_support_tickets" on public.support_tickets for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "phase5_admin_all_support_messages" on public.support_messages for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "phase5_admin_all_vendors" on public.vendors for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "phase5_admin_all_vendor_steps" on public.vendor_onboarding_steps for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "phase5_admin_all_ops" on public.warehouse_locations for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "phase5_admin_all_inventory" on public.warehouse_inventory for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "phase5_admin_all_alerts" on public.low_stock_alerts for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "phase5_admin_all_pos" on public.purchase_orders for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "phase5_admin_all_po_items" on public.purchase_order_items for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "phase5_admin_all_campaigns" on public.marketing_campaigns for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "phase5_admin_all_commissions" on public.affiliate_commissions for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "phase5_admin_all_bi" on public.executive_metric_snapshots for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "phase5_admin_all_cohorts" on public.customer_cohorts for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "phase5_admin_all_audit" on public.audit_logs for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "phase5_admin_all_rate_limits" on public.rate_limit_events for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "phase5_admin_all_admin_activity" on public.admin_activity_logs for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
create policy "phase5_admin_all_cache" on public.cache_invalidation_log for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));

drop trigger if exists loyalty_accounts_updated_at on public.loyalty_accounts;
create trigger loyalty_accounts_updated_at before update on public.loyalty_accounts for each row execute function public.set_updated_at();

drop trigger if exists kbeauty_box_subscriptions_updated_at on public.kbeauty_box_subscriptions;
create trigger kbeauty_box_subscriptions_updated_at before update on public.kbeauty_box_subscriptions for each row execute function public.set_updated_at();

drop trigger if exists support_tickets_updated_at on public.support_tickets;
create trigger support_tickets_updated_at before update on public.support_tickets for each row execute function public.set_updated_at();

drop trigger if exists vendors_updated_at on public.vendors;
create trigger vendors_updated_at before update on public.vendors for each row execute function public.set_updated_at();

insert into public.support_faqs (category, question, answer, sort_order) values
  ('Orders', 'How do I track my K-Beauty Box?', 'Open Account > Subscriptions to see renewal, shipping, and support details.', 1),
  ('Loyalty', 'How do reward tiers work?', 'Silver starts at signup, Gold unlocks at 2,500 lifetime points, and Platinum unlocks at 7,500 lifetime points.', 2),
  ('Mobile', 'Will push notifications be available?', 'The mobile foundation includes device registration and topic subscriptions for order, loyalty, and campaign notifications.', 3)
on conflict do nothing;

insert into public.warehouse_locations (code, name, city) values
  ('KTM-01', 'Kathmandu Fulfillment Hub', 'Kathmandu'),
  ('PKR-01', 'Pokhara Forward Stock', 'Pokhara')
on conflict (code) do nothing;

insert into public.marketing_campaigns (slug, name, channel, budget_krw, status) values
  ('nepal-glow-launch', 'Nepal Glow Launch', 'influencer', 2500000, 'planned'),
  ('kbeauty-box-waitlist', 'K-Beauty Box Waitlist', 'email', 750000, 'active')
on conflict (slug) do nothing;
