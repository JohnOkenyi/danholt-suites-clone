-- DANHOLT SUITES: EMERGENCY PRODUCTION DB REPAIR
-- This script fixes the hijacked "Stylist" columns and restores the correct "Hotel" schema.
-- RUN THIS IN YOUR SUPABASE SQL EDITOR (https://supabase.com/dashboard/project/_/sql)

BEGIN;

-- 1. DROP INCORRECT TABLES
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS restaurant_reservations CASCADE;
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS membership_requests CASCADE;

-- 2. CREATE CORRECT HOTEL TABLES
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  room_id UUID REFERENCES rooms(id),
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER DEFAULT 1,
  total_price NUMERIC,
  special_requests TEXT,
  status TEXT DEFAULT 'pending'
);

CREATE TABLE restaurant_reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  guests INTEGER DEFAULT 2,
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT,
  special_requests TEXT,
  status TEXT DEFAULT 'confirmed'
);

CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread'
);

CREATE TABLE membership_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  membership_tier TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending'
);

-- 3. ENABLE PUBLIC ACCESS (RLS Policies)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read bookings" ON bookings FOR SELECT USING (true);
CREATE POLICY "Public insert bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update bookings" ON bookings FOR UPDATE USING (true);
CREATE POLICY "Public delete bookings" ON bookings FOR DELETE USING (true);

ALTER TABLE restaurant_reservations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read dining" ON restaurant_reservations FOR SELECT USING (true);
CREATE POLICY "Public insert dining" ON restaurant_reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update dining" ON restaurant_reservations FOR UPDATE USING (true);
CREATE POLICY "Public delete dining" ON restaurant_reservations FOR DELETE USING (true);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read contact" ON contact_messages FOR SELECT USING (true);
CREATE POLICY "Public insert contact" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update contact" ON contact_messages FOR UPDATE USING (true);
CREATE POLICY "Public delete contact" ON contact_messages FOR DELETE USING (true);

ALTER TABLE membership_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read membership" ON membership_requests FOR SELECT USING (true);
CREATE POLICY "Public insert membership" ON membership_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update membership" ON membership_requests FOR UPDATE USING (true);
CREATE POLICY "Public delete membership" ON membership_requests FOR DELETE USING (true);

-- 4. ENABLE REALTIME
ALTER PUBLICATION supabase_realtime ADD TABLE 
  bookings, 
  restaurant_reservations, 
  contact_messages, 
  membership_requests;

COMMIT;
