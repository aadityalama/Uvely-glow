-- Phase 3: Nepal commerce engine

create type public.payment_method as enum ('esewa', 'khalti', 'cash_on_delivery');
create type public.payment_status as enum ('unpaid', 'initiated', 'paid', 'failed', 'refunded');
create type public.fulfillment_status as enum ('unfulfilled', 'packed', 'shipped', 'delivered', 'returned');
create type public.notification_type as enum (
  'order_placed',
  'payment_success',
  'order_shipped',
  'order_delivered'
);

alter table public.orders
  add column if not exists payment_method public.payment_method not null default 'cash_on_delivery',
  add column if not exists payment_status public.payment_status not null default 'unpaid',
  add column if not exists payment_provider_ref text,
  add column if not exists shipping_method text not null default 'standard',
  add column if not exists shipping_provider text,
  add column if not exists delivery_fee_krw int not null default 0,
  add column if not exists delivery_province text,
  add column if not exists delivery_district text,
  add column if not exists tracking_number text,
  add column if not exists estimated_delivery_days int,
  add column if not exists packed_at timestamptz,
  add column if not exists shipped_at timestamptz,
  add column if not exists delivered_at timestamptz,
  add column if not exists invoice_number text unique;

create table if not exists public.order_status_events (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references public.orders (id) on delete cascade,
  status public.order_status not null,
  fulfillment_status public.fulfillment_status not null default 'unfulfilled',
  note text,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists order_status_events_order_id_idx
  on public.order_status_events (order_id, created_at desc);

alter table public.order_status_events enable row level security;

create policy "order_status_events_select_own" on public.order_status_events
  for select using (
    exists (
      select 1 from public.orders o
      where o.id = order_id and o.user_id = auth.uid()
    )
  );

create policy "order_status_events_admin_all" on public.order_status_events
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
  );

create table if not exists public.order_notifications (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references public.orders (id) on delete cascade,
  user_id uuid references auth.users (id) on delete cascade,
  type public.notification_type not null,
  channel text not null default 'in_app',
  title text not null,
  message text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists order_notifications_user_id_idx
  on public.order_notifications (user_id, created_at desc);

alter table public.order_notifications enable row level security;

create policy "order_notifications_select_own" on public.order_notifications
  for select using (auth.uid() = user_id);

create policy "order_notifications_admin_all" on public.order_notifications
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
  );

create table if not exists public.nepal_districts (
  id uuid primary key default uuid_generate_v4(),
  province text not null,
  district text not null,
  zone_name text,
  base_delivery_fee_krw int not null default 0,
  remote_surcharge_krw int not null default 0,
  estimated_days_min int not null default 2,
  estimated_days_max int not null default 5,
  is_active boolean not null default true,
  unique (province, district)
);

alter table public.nepal_districts enable row level security;

create policy "nepal_districts_select_public" on public.nepal_districts
  for select using (is_active = true);

create policy "nepal_districts_admin_all" on public.nepal_districts
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
  );

insert into public.nepal_districts
  (province, district, zone_name, base_delivery_fee_krw, remote_surcharge_krw, estimated_days_min, estimated_days_max)
values
  ('Bagmati', 'Kathmandu', 'Central', 150, 0, 1, 2),
  ('Bagmati', 'Lalitpur', 'Central', 150, 0, 1, 2),
  ('Bagmati', 'Bhaktapur', 'Central', 175, 0, 1, 2),
  ('Bagmati', 'Chitwan', 'Central', 250, 0, 2, 3),
  ('Gandaki', 'Kaski', 'Western', 300, 0, 2, 4),
  ('Gandaki', 'Gorkha', 'Western', 350, 75, 3, 5),
  ('Koshi', 'Morang', 'Eastern', 325, 0, 2, 4),
  ('Koshi', 'Sunsari', 'Eastern', 325, 0, 2, 4),
  ('Madhesh', 'Parsa', 'Central', 300, 0, 2, 4),
  ('Madhesh', 'Dhanusha', 'Central', 325, 0, 2, 4),
  ('Lumbini', 'Rupandehi', 'Western', 325, 0, 2, 4),
  ('Lumbini', 'Banke', 'Western', 375, 50, 3, 5),
  ('Karnali', 'Surkhet', 'Mid-western', 450, 125, 4, 7),
  ('Karnali', 'Jumla', 'Mid-western', 550, 250, 5, 9),
  ('Sudurpashchim', 'Kailali', 'Far-western', 450, 100, 4, 7),
  ('Sudurpashchim', 'Kanchanpur', 'Far-western', 475, 125, 4, 7)
on conflict (province, district) do update set
  base_delivery_fee_krw = excluded.base_delivery_fee_krw,
  remote_surcharge_krw = excluded.remote_surcharge_krw,
  estimated_days_min = excluded.estimated_days_min,
  estimated_days_max = excluded.estimated_days_max,
  is_active = true;

create or replace function public.set_phase3_order_timestamps()
returns trigger
language plpgsql
as $$
begin
  if new.status = 'processing' and old.status is distinct from new.status and new.packed_at is null then
    new.packed_at = now();
  end if;
  if new.status = 'shipped' and old.status is distinct from new.status and new.shipped_at is null then
    new.shipped_at = now();
  end if;
  if new.status = 'delivered' and old.status is distinct from new.status and new.delivered_at is null then
    new.delivered_at = now();
  end if;
  return new;
end;
$$;

drop trigger if exists phase3_order_timestamps on public.orders;
create trigger phase3_order_timestamps
  before update on public.orders
  for each row execute function public.set_phase3_order_timestamps();
