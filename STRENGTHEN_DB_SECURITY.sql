-- STRENGTHEN DATABASE SECURITY
-- Run this in your Supabase SQL Editor to lock down the database.

-- 1. Enable RLS on all sensitive tables
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_requests ENABLE ROW LEVEL SECURITY;

-- 2. Clear existing policies to start fresh
DROP POLICY IF EXISTS "Enable read access for all users" ON rooms;
DROP POLICY IF EXISTS "Enable read access for all users" ON bookings;
DROP POLICY IF EXISTS "Enable insert for all users" ON bookings;
DROP POLICY IF EXISTS "Enable update for all users" ON bookings;
DROP POLICY IF EXISTS "Enable delete for all users" ON bookings;
-- (Add other drops as needed based on your current state)

-- 3. Define restrictive policies

-- ROOMS: Everyone can view, only admins can change.
CREATE POLICY "Public read access for rooms" ON rooms FOR SELECT USING (true);
CREATE POLICY "Admin full access for rooms" ON rooms FOR ALL 
  TO authenticated USING (auth.role() = 'authenticated');

-- BOOKINGS: Public can only submit (INSERT). Admins can do everything.
CREATE POLICY "Public insert for bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin full access for bookings" ON bookings FOR ALL 
  TO authenticated USING (auth.role() = 'authenticated');

-- RESTAURANT RESERVATIONS: Public can only submit. Admins full access.
CREATE POLICY "Public insert for restaurant_reservations" ON restaurant_reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin full access for restaurant_reservations" ON restaurant_reservations FOR ALL 
  TO authenticated USING (auth.role() = 'authenticated');

-- CONTACT MESSAGES: Public can only submit. Admins full access.
CREATE POLICY "Public insert for contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin full access for contact_messages" ON contact_messages FOR ALL 
  TO authenticated USING (auth.role() = 'authenticated');

-- MEMBERSHIP REQUESTS: Public can only submit. Admins full access.
CREATE POLICY "Public insert for membership_requests" ON membership_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin full access for membership_requests" ON membership_requests FOR ALL 
  TO authenticated USING (auth.role() = 'authenticated');

-- SAFETY: Ensure any 'status' updates for bookings are restricted
-- Note: A more advanced policy could check that public inserts only set status to 'pending'.
