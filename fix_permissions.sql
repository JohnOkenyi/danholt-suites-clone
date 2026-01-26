-- COMPREHENSIVE FIX FOR ALL TABLES AND PERMISSIONS

-- 0. ROOMS TABLE
-- First, ensure the table exists
create table if not exists rooms (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  slug text unique not null,
  name text not null,
  price numeric not null,
  description text,
  image text
);

-- SAFETY: Ensure columns exist if table was created previously without them
alter table rooms add column if not exists slug text;
alter table rooms add column if not exists description text;
alter table rooms add column if not exists image text;

-- Ensure slug is unique constraint if valid
do $$ 
begin 
  if not exists (select 1 from pg_constraint where conname = 'rooms_slug_key') then
    alter table rooms add constraint rooms_slug_key unique (slug);
  end if;
end $$;

-- Seed Rooms (Upsert based on slug)
insert into rooms (slug, name, price, image)
values 
  ('standard', 'Standard', 10000, '/images/room-standard.jpg'),
  ('deluxe', 'Deluxe', 15000, '/images/room-deluxe.jpg'),
  ('executive-deluxe', 'Executive Deluxe', 20000, '/images/hero-slide-3.jpg')
on conflict (slug) do update 
set price = excluded.price, name = excluded.name, image = excluded.image;

-- 1. BOOKINGS TABLE
create table if not exists bookings (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  room_id uuid references rooms(id),
  guest_name text not null,
  guest_email text not null,
  guest_phone text,
  check_in date not null,
  check_out date not null,
  guests integer default 1,
  total_price numeric,
  special_requests text,
  status text default 'pending'
);

-- SAFETY: Patch bookings (Added special_requests)
alter table bookings add column if not exists guest_phone text;
alter table bookings add column if not exists room_id uuid references rooms(id);
alter table bookings add column if not exists guests integer default 1;
alter table bookings add column if not exists total_price numeric;
alter table bookings add column if not exists special_requests text;
alter table bookings add column if not exists status text default 'pending';


-- 2. RESTAURANT RESERVATIONS
create table if not exists restaurant_reservations (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  reservation_date date not null,
  reservation_time time not null,
  guests integer default 2,
  guest_name text not null,
  guest_email text not null,
  guest_phone text,
  special_requests text,
  status text default 'confirmed'
);

-- SAFETY: Patch missing columns for Reservations (Adding guest_phone here too just in case)
alter table restaurant_reservations add column if not exists guest_phone text;
alter table restaurant_reservations add column if not exists special_requests text;
alter table restaurant_reservations add column if not exists status text default 'confirmed';


-- 3. CONTACT MESSAGES
create table if not exists contact_messages (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  subject text,
  message text not null,
  status text default 'unread'
);

-- SAFETY: Patch missing columns for Messages
alter table contact_messages add column if not exists subject text;
alter table contact_messages add column if not exists status text default 'unread';


-- 4. MEMBERSHIP REQUESTS
create table if not exists membership_requests (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  full_name text not null,
  email text not null,
  phone text,
  membership_tier text,
  notes text,
  status text default 'pending'
);

-- SAFETY: Patch missing columns for Membership
alter table membership_requests add column if not exists phone text;
alter table membership_requests add column if not exists membership_tier text;
alter table membership_requests add column if not exists notes text;
alter table membership_requests add column if not exists status text default 'pending';


-- === CRITICAL: FIX ROW LEVEL SECURITY (RLS) ===
-- We enable RLS but add polices to allow EVERYTHING for Anon/Public users
-- This is essential for the demo to work without login.

-- Bookings
alter table bookings enable row level security;
drop policy if exists "Enable read access for all users" on bookings;
drop policy if exists "Enable insert for all users" on bookings;
drop policy if exists "Enable update for all users" on bookings;
drop policy if exists "Enable delete for all users" on bookings;
create policy "Enable read access for all users" on bookings for select using (true);
create policy "Enable insert for all users" on bookings for insert with check (true);
create policy "Enable update for all users" on bookings for update using (true);
create policy "Enable delete for all users" on bookings for delete using (true);

-- Restaurant
alter table restaurant_reservations enable row level security;
drop policy if exists "Enable read access for all users" on restaurant_reservations;
drop policy if exists "Enable insert for all users" on restaurant_reservations;
drop policy if exists "Enable update for all users" on restaurant_reservations;
drop policy if exists "Enable delete for all users" on restaurant_reservations;
create policy "Enable read access for all users" on restaurant_reservations for select using (true);
create policy "Enable insert for all users" on restaurant_reservations for insert with check (true);
create policy "Enable update for all users" on restaurant_reservations for update using (true);
create policy "Enable delete for all users" on restaurant_reservations for delete using (true);

-- Contact
alter table contact_messages enable row level security;
drop policy if exists "Enable read access for all users" on contact_messages;
drop policy if exists "Enable insert for all users" on contact_messages;
drop policy if exists "Enable update for all users" on contact_messages;
drop policy if exists "Enable delete for all users" on contact_messages;
create policy "Enable read access for all users" on contact_messages for select using (true);
create policy "Enable insert for all users" on contact_messages for insert with check (true);
create policy "Enable update for all users" on contact_messages for update using (true);
create policy "Enable delete for all users" on contact_messages for delete using (true);

-- Membership
alter table membership_requests enable row level security;
drop policy if exists "Enable read access for all users" on membership_requests;
drop policy if exists "Enable insert for all users" on membership_requests;
drop policy if exists "Enable update for all users" on membership_requests;
drop policy if exists "Enable delete for all users" on membership_requests;
create policy "Enable read access for all users" on membership_requests for select using (true);
create policy "Enable insert for all users" on membership_requests for insert with check (true);
create policy "Enable update for all users" on membership_requests for update using (true);
create policy "Enable delete for all users" on membership_requests for delete using (true);

-- Rooms (Ensure we can read them too)
alter table rooms enable row level security;
drop policy if exists "Enable read access for all users" on rooms;
create policy "Enable read access for all users" on rooms for select using (true);
