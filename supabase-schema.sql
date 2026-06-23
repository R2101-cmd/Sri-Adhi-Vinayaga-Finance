create extension if not exists "pgcrypto";

create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  vehicle_name text not null,
  vehicle_model text not null,
  short_description text not null,
  availability_status text not null default 'available',
  photo_url text,
  updated_by text,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'vehicles'
      and column_name = 'vehicle_number'
  ) and not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'vehicles'
      and column_name = 'vehicle_name'
  ) then
    alter table public.vehicles rename column vehicle_number to vehicle_name;
  end if;
end $$;

alter table public.vehicles
add column if not exists vehicle_name text,
add column if not exists vehicle_model text,
add column if not exists short_description text,
add column if not exists availability_status text not null default 'available',
add column if not exists photo_url text,
add column if not exists updated_by text,
add column if not exists updated_at timestamptz not null default now(),
add column if not exists created_at timestamptz not null default now();

update public.vehicles
set
  vehicle_name = coalesce(nullif(vehicle_name, ''), 'Untitled Vehicle'),
  vehicle_model = coalesce(nullif(vehicle_model, ''), 'Model not specified'),
  short_description = coalesce(nullif(short_description, ''), 'Vehicle details will be updated soon.'),
  availability_status = case
    when availability_status in ('available', 'unavailable') then availability_status
    else 'available'
  end,
  updated_at = coalesce(updated_at, now()),
  created_at = coalesce(created_at, now());

alter table public.vehicles
alter column vehicle_name set not null,
alter column vehicle_model set not null,
alter column short_description set not null,
alter column availability_status set not null,
alter column updated_at set not null,
alter column created_at set not null;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'vehicles'
      and column_name = 'item_type'
  ) then
    alter table public.vehicles drop column item_type;
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'vehicles_availability_status_check'
  ) then
    alter table public.vehicles
    add constraint vehicles_availability_status_check
    check (availability_status in ('available', 'unavailable'));
  end if;
end $$;

alter table public.vehicles enable row level security;

drop policy if exists "Anyone can view vehicles" on public.vehicles;
create policy "Anyone can view vehicles"
on public.vehicles
for select
using (true);

drop policy if exists "Authenticated employees can add vehicles" on public.vehicles;
create policy "Authenticated employees can add vehicles"
on public.vehicles
for insert
to authenticated
with check (true);

drop policy if exists "Authenticated employees can update vehicles" on public.vehicles;
create policy "Authenticated employees can update vehicles"
on public.vehicles
for update
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated employees can delete vehicles" on public.vehicles;
create policy "Authenticated employees can delete vehicles"
on public.vehicles
for delete
to authenticated
using (true);

insert into storage.buckets (id, name, public)
values ('vehicle-photos', 'vehicle-photos', true)
on conflict (id) do update set public = true;

drop policy if exists "Public can view vehicle photos" on storage.objects;
create policy "Public can view vehicle photos"
on storage.objects
for select
using (bucket_id = 'vehicle-photos');

drop policy if exists "Authenticated employees can upload vehicle photos" on storage.objects;
create policy "Authenticated employees can upload vehicle photos"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'vehicle-photos');

drop policy if exists "Authenticated employees can replace vehicle photos" on storage.objects;
create policy "Authenticated employees can replace vehicle photos"
on storage.objects
for update
to authenticated
using (bucket_id = 'vehicle-photos')
with check (bucket_id = 'vehicle-photos');

drop policy if exists "Authenticated employees can delete vehicle photos" on storage.objects;
create policy "Authenticated employees can delete vehicle photos"
on storage.objects
for delete
to authenticated
using (bucket_id = 'vehicle-photos');

