-- FINAL COMPLETE SETUP SCRIPT
-- 1. Create Tables
create table if not exists rooms (id uuid default gen_random_uuid() primary key, name text, slug text unique, price numeric, description text, image_url text, amenities text[]);
create table if not exists restaurant_reservations (id uuid default gen_random_uuid() primary key, created_at timestamp default now(), reservation_date date, reservation_time time, guests int, guest_name text, guest_email text, special_requests text, status text default 'confirmed');
create table if not exists bookings (id uuid default gen_random_uuid() primary key, created_at timestamp default now(), room_id uuid references rooms(id), guest_name text, guest_email text, check_in date, check_out date, guests int, total_price numeric, status text default 'pending');
create table if not exists contact_messages (id uuid default gen_random_uuid() primary key, created_at timestamp default now(), name text, email text, subject text, message text, status text default 'unread');
create table if not exists membership_requests (id uuid default gen_random_uuid() primary key, created_at timestamp default now(), full_name text, email text, phone text, membership_tier text, notes text, status text default 'pending');

-- 2. Allow Public Access (Use this for demo only)
alter table rooms enable row level security;
drop policy if exists "p1" on rooms; create policy "p1" on rooms for select using (true);

alter table restaurant_reservations enable row level security;
drop policy if exists "p2" on restaurant_reservations; create policy "p2" on restaurant_reservations for select using (true); 
drop policy if exists "p3" on restaurant_reservations; create policy "p3" on restaurant_reservations for insert with check (true);

alter table bookings enable row level security;
drop policy if exists "p4" on bookings; create policy "p4" on bookings for select using (true);
drop policy if exists "p5" on bookings; create policy "p5" on bookings for insert with check (true);

alter table contact_messages enable row level security;
drop policy if exists "p6" on contact_messages; create policy "p6" on contact_messages for select using (true); 
drop policy if exists "p7" on contact_messages; create policy "p7" on contact_messages for insert with check (true);

alter table membership_requests enable row level security;
drop policy if exists "p8" on membership_requests; create policy "p8" on membership_requests for select using (true); 
drop policy if exists "p9" on membership_requests; create policy "p9" on membership_requests for insert with check (true);

-- 3. Insert Room Data
insert into rooms (name, slug, price, description, image_url) values 
('Standard', 'standard', 10000, 'Cozy comfort', '/images/room-standard.jpg'),
('Deluxe', 'deluxe', 15000, 'Premium stay', '/images/room-deluxe.jpg'),
('Executive', 'executive-deluxe', 20000, 'Top luxury', '/images/hero-slide-3.jpg')
on conflict (slug) do nothing;
