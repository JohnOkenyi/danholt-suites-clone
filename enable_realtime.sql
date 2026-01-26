-- Enable Realtime (Corrected Version)
-- Run this in Supabase SQL Editor

begin;

-- 1. Policies
-- We drop existing policies first to ensure we can recreate them clean.
-- This handles the "policy already exists" error.
drop policy if exists "Enable read access for all users" on bookings;
drop policy if exists "Enable read access for all users" on restaurant_reservations;
drop policy if exists "Enable read access for all users" on contact_messages;
drop policy if exists "Enable read access for all users" on membership_requests;

create policy "Enable read access for all users" on bookings for select using (true);
create policy "Enable read access for all users" on restaurant_reservations for select using (true);
create policy "Enable read access for all users" on contact_messages for select using (true);
create policy "Enable read access for all users" on membership_requests for select using (true);

-- 2. Publication
-- Note: If you get an error saying "relation is already member of publication", that is GOOD.
-- It means it's already enabled. You can ignore that specific error.
alter publication supabase_realtime add table 
  bookings, 
  restaurant_reservations, 
  contact_messages, 
  membership_requests;

commit;
