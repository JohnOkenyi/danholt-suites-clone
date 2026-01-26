-- HARD RESET SCRIPT
-- This deletes the broken tables so we can build them correctly.

-- 1. DELETE OLD TABLES (Cascade deletes dependencies)
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS restaurant_reservations CASCADE;
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS membership_requests CASCADE;
DROP TABLE IF EXISTS "Rooms" CASCADE; -- Handle mixed case just in case
DROP TABLE IF EXISTS rooms CASCADE;

-- 2. CREATE NEW TABLES (Correct Columns)
CREATE TABLE rooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE, -- The missing column!
  price NUMERIC NOT NULL,
  description TEXT,
  image_url TEXT,
  amenities TEXT[]
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

CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  room_id UUID REFERENCES rooms(id),
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER DEFAULT 1,
  total_price NUMERIC,
  status TEXT DEFAULT 'pending'
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

-- 3. ENABLE PUBLIC ACCESS
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read rooms" ON rooms FOR SELECT USING (true);

ALTER TABLE restaurant_reservations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read dining" ON restaurant_reservations FOR SELECT USING (true);
CREATE POLICY "Public insert dining" ON restaurant_reservations FOR INSERT WITH CHECK (true);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read bookings" ON bookings FOR SELECT USING (true);
CREATE POLICY "Public insert bookings" ON bookings FOR INSERT WITH CHECK (true);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read contact" ON contact_messages FOR SELECT USING (true);
CREATE POLICY "Public insert contact" ON contact_messages FOR INSERT WITH CHECK (true);

ALTER TABLE membership_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read membership" ON membership_requests FOR SELECT USING (true);
CREATE POLICY "Public insert membership" ON membership_requests FOR INSERT WITH CHECK (true);

-- 4. INSERT DATA
INSERT INTO rooms (name, slug, price, description, image_url) VALUES 
('Standard', 'standard', 10000, 'Cozy comfort', '/images/room-standard.jpg'),
('Deluxe', 'deluxe', 15000, 'Premium stay', '/images/room-deluxe.jpg'),
('Executive', 'executive-deluxe', 20000, 'Top luxury', '/images/hero-slide-3.jpg');
