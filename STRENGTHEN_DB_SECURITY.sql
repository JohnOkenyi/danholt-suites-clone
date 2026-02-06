-- STRENGTHEN DATABASE SECURITY
-- Run this in your Supabase SQL Editor to lock down the database.

-- 1. Create Admin Users table to restrict login
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin users are viewable by authenticated users" ON admin_users;
CREATE POLICY "Admin users are viewable by authenticated users" ON admin_users
  FOR SELECT TO authenticated USING (true);

-- 2. Enable RLS on all sensitive tables
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_requests ENABLE ROW LEVEL SECURITY;

-- 3. Define restrictive policies

-- Function to check if current user is an admin
CREATE OR REPLACE FUNCTION is_admin() 
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users 
    WHERE email = auth.jwt()->>'email'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ROOMS: Everyone can view, only admins can change.
DROP POLICY IF EXISTS "Public read access for rooms" ON rooms;
DROP POLICY IF EXISTS "Admin full access for rooms" ON rooms;
CREATE POLICY "Public read access for rooms" ON rooms FOR SELECT USING (true);
CREATE POLICY "Admin full access for rooms" ON rooms FOR ALL 
  TO authenticated USING (is_admin());

-- BOOKINGS: Public can only submit (INSERT). Admins can do everything.
DROP POLICY IF EXISTS "Public insert for bookings" ON bookings;
DROP POLICY IF EXISTS "Admin full access for bookings" ON bookings;
CREATE POLICY "Public insert for bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin full access for bookings" ON bookings FOR ALL 
  TO authenticated USING (is_admin());

-- RESTAURANT RESERVATIONS: Public can only submit. Admins full access.
DROP POLICY IF EXISTS "Public insert for restaurant_reservations" ON restaurant_reservations;
DROP POLICY IF EXISTS "Admin full access for restaurant_reservations" ON restaurant_reservations;
CREATE POLICY "Public insert for restaurant_reservations" ON restaurant_reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin full access for restaurant_reservations" ON restaurant_reservations FOR ALL 
  TO authenticated USING (is_admin());

-- CONTACT MESSAGES: Public can only submit. Admins full access.
DROP POLICY IF EXISTS "Public insert for contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "Admin full access for contact_messages" ON contact_messages;
CREATE POLICY "Public insert for contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin full access for contact_messages" ON contact_messages FOR ALL 
  TO authenticated USING (is_admin());

-- MEMBERSHIP REQUESTS: Public can only submit. Admins full access.
DROP POLICY IF EXISTS "Public insert for membership_requests" ON membership_requests;
DROP POLICY IF EXISTS "Admin full access for membership_requests" ON membership_requests;
CREATE POLICY "Public insert for membership_requests" ON membership_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin full access for membership_requests" ON membership_requests FOR ALL 
  TO authenticated USING (is_admin());

-- 4. Initial Seed Data
-- Add yourself as the first administrator
-- IMPORTANT: Replace with other emails as needed later
INSERT INTO admin_users (email) 
VALUES ('okenyijohn@gmail.com')
ON CONFLICT (email) DO NOTHING;
