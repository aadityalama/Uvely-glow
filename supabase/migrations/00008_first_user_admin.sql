-- First registered user becomes admin (is_admin = true).
-- Backfill: if no admin exists yet, promote the oldest profile by created_at.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  is_first_profile boolean;
begin
  is_first_profile := (select count(*) from public.profiles) = 0;

  insert into public.profiles (id, email, full_name, is_admin)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    is_first_profile
  )
  on conflict (id) do update
    set email = excluded.email,
        full_name = coalesce(excluded.full_name, public.profiles.full_name);
  return new;
end;
$$;

-- If migrations were applied before this logic and every profile has is_admin = false,
-- promote the earliest-created profile once (still only one bootstrap admin).
update public.profiles p
set is_admin = true
where p.is_admin = false
  and not exists (select 1 from public.profiles p2 where p2.is_admin = true)
  and p.id = (
    select id from public.profiles order by created_at asc limit 1
  );
