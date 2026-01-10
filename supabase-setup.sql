-- Danholt Suites Database Setup
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- 1. ROOMS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  category VARCHAR(50), -- 'business', 'family', 'budget'
  capacity INT DEFAULT 2,
  bed_type VARCHAR(50),
  size_sqm INT,
  amenities JSONB,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Sample Room Data
INSERT INTO rooms (name, slug, description, price, category, capacity, bed_type, size_sqm, amenities, image_url) VALUES
('Standard', 'standard', 'Comfortable and affordable accommodation', 10000, 'budget', 2, 'Double Bed', 22, '["Free WiFi", "24/7 Power", "Air Conditioning", "Flat Screen TV"]'::jsonb, 'https://via.placeholder.com/800x600/E8DCC4/1A1A1A?text=Standard+Room'),
('Deluxe', 'deluxe', 'Elegantly furnished room with modern amenities', 15000, 'family', 2, 'Queen Bed', 28, '["Free WiFi", "24/7 Power", "Mini Bar", "Breakfast"]'::jsonb, 'https://via.placeholder.com/800x600/D4A574/1A1A1A?text=Deluxe+Room'),
('Executive Deluxe', 'executive-deluxe', 'Premium suite with dedicated workspace and extra living space', 20000, 'business', 2, 'King Bed', 35, '["Free WiFi", "24/7 Power", "Mini Bar", "Breakfast", "Work Desk"]'::jsonb, 'https://via.placeholder.com/800x600/C8975E/1A1A1A?text=Executive+Room');

-- ========================================
-- 2. BOOKINGS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
  guest_name VARCHAR(255) NOT NULL,
  guest_email VARCHAR(255) NOT NULL,
  guest_phone VARCHAR(50),
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INT NOT NULL,
  total_price DECIMAL(10, 2),
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled', 'completed'
  special_requests TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ========================================
-- 3. FACILITIES TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS facilities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  capacity VARCHAR(100),
  operating_hours VARCHAR(100),
  image_url TEXT,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Sample Facility Data
INSERT INTO facilities (name, slug, description, capacity, operating_hours, image_url) VALUES
('Conference Hall', 'conference_hall', 'A spacious venue perfect for conferences, seminars, and large gatherings with up to 500 people.', '500 people', '8:00 AM - 10:00 PM', 'https://via.placeholder.com/800x600/D4A574/FFFFFF?text=Conference+Hall'),
('5-Aside Football Pitch', 'football_pitch', 'World-class mini stadium for football matches, complete with floodlights and premium turf.', '10-20 players', '6:00 AM - 10:00 PM', 'https://via.placeholder.com/800x600/2E7D32/FFFFFF?text=Football+Pitch'),
('Event Space', 'event_space', 'Versatile space for weddings, parties, and special celebrations with customizable setup.', '200 guests', '24 hours', 'https://via.placeholder.com/800x600/6A1B9A/FFFFFF?text=Event+Space'),
('Meeting Room', 'meeting_room', 'Private meeting rooms equipped with modern tech for business meetings and presentations.', '20 people', '8:00 AM - 8:00 PM', 'https://via.placeholder.com/800x600/1976D2/FFFFFF?text=Meeting+Room'),
('Children''s Playground', 'playground', 'Safe and fun playground with various activities for children of all ages.', '30 children', '8:00 AM - 6:00 PM', 'https://via.placeholder.com/800x600/F57C00/FFFFFF?text=Playground');

-- ========================================
-- 4. FACILITY BOOKINGS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS facility_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  facility_id UUID REFERENCES facilities(id) ON DELETE CASCADE,
  guest_name VARCHAR(255) NOT NULL,
  guest_email VARCHAR(255) NOT NULL,
  guest_phone VARCHAR(50),
  booking_date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  guests INT,
  purpose TEXT,
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled'
  created_at TIMESTAMP DEFAULT NOW()
);

-- ========================================
-- 5. MENU ITEMS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50), -- 'starters', 'mains', 'sides', 'drinks', 'desserts'
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  popular BOOLEAN DEFAULT false,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Sample Menu Data
INSERT INTO menu_items (name, category, description, price, popular, image_url) VALUES
('Jollof Rice', 'mains', 'Signature Nigerian jollof rice with chicken', 2500, true, 'https://via.placeholder.com/400x300/D32F2F/FFFFFF?text=Jollof+Rice'),
('Pounded Yam & Egusi', 'mains', 'Traditional pounded yam with egusi soup', 3000, true, 'https://via.placeholder.com/400x300/388E3C/FFFFFF?text=Pounded+Yam'),
('Fried Rice', 'mains', 'Nigerian-style fried rice with vegetables and protein', 2500, false, 'https://via.placeholder.com/400x300/F57C00/FFFFFF?text=Fried+Rice'),
('Grilled Fish', 'mains', 'Whole grilled tilapia with sides', 4000, false, 'https://via.placeholder.com/400x300/0288D1/FFFFFF?text=Grilled+Fish'),
('Pepper Soup', 'starters', 'Spicy Nigerian pepper soup', 1500, false, 'https://via.placeholder.com/400x300/D32F2F/FFFFFF?text=Pepper+Soup'),
('Plantain', 'sides', 'Fried ripe plantain', 800, false, 'https://via.placeholder.com/400x300/FBC02D/1A1A1A?text=Plantain'),
('Chapman', 'drinks', 'Nigerian cocktail', 1000, false, 'https://via.placeholder.com/400x300/E91E63/FFFFFF?text=Chapman'),
('Zobo Drink', 'drinks', 'Hibiscus drink', 800, false, 'https://via.placeholder.com/400x300/C2185B/FFFFFF?text=Zobo');

-- ========================================
-- 6. RESTAURANT RESERVATIONS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS restaurant_reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  guest_name VARCHAR(255) NOT NULL,
  guest_email VARCHAR(255) NOT NULL,
  guest_phone VARCHAR(50),
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  guests INT NOT NULL,
  special_requests TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- ========================================
-- 7. FOOD ORDERS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS food_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  guest_name VARCHAR(255) NOT NULL,
  guest_email VARCHAR(255) NOT NULL,
  guest_phone VARCHAR(50),
  items JSONB NOT NULL,
  total_price DECIMAL(10, 2),
  delivery_date DATE,
  delivery_time TIME,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- ========================================
-- 8. GALLERY IMAGES TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255),
  category VARCHAR(50), -- 'rooms', 'restaurant', 'facilities', 'exterior'
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Sample Gallery Data
INSERT INTO gallery_images (title, category, image_url, display_order) VALUES
('Deluxe Suite', 'rooms', 'https://via.placeholder.com/800x600/D4A574/1A1A1A?text=Deluxe+Suite', 1),
('Executive Room', 'rooms', 'https://via.placeholder.com/800x600/C8975E/1A1A1A?text=Executive+Room', 2),
('Standard Room', 'rooms', 'https://via.placeholder.com/800x600/E8DCC4/1A1A1A?text=Standard+Room', 3),
('Restaurant', 'restaurant', 'https://via.placeholder.com/800x600/8D6E63/FFFFFF?text=Restaurant', 4),
('Dining Area', 'restaurant', 'https://via.placeholder.com/800x600/795548/FFFFFF?text=Dining+Area', 5),
('Conference Hall', 'facilities', 'https://via.placeholder.com/800x600/D4A574/FFFFFF?text=Conference+Hall', 6),
('Football Pitch', 'facilities', 'https://via.placeholder.com/800x600/2E7D32/FFFFFF?text=Football+Pitch', 7),
('Event Space', 'facilities', 'https://via.placeholder.com/800x600/6A1B9A/FFFFFF?text=Event+Space', 8),
('Hotel Exterior', 'exterior', 'https://via.placeholder.com/800x600/607D8B/FFFFFF?text=Hotel+Exterior', 9),
('Facilities View', 'exterior', 'https://via.placeholder.com/800x600/546E7A/FFFFFF?text=Facilities+View', 10);

-- ========================================
-- 9. CONTACT SUBMISSIONS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new', -- 'new', 'read', 'responded'
  created_at TIMESTAMP DEFAULT NOW()
);

-- ========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================

-- Enable RLS on all tables
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE facility_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public read access for display tables
CREATE POLICY "Public read access for rooms" ON rooms FOR SELECT USING (true);
CREATE POLICY "Public read access for facilities" ON facilities FOR SELECT USING (true);
CREATE POLICY "Public read access for menu_items" ON menu_items FOR SELECT USING (true);
CREATE POLICY "Public read access for gallery" ON gallery_images FOR SELECT USING (true);

-- Public insert for bookings and submissions
CREATE POLICY "Public insert for bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert for facility_bookings" ON facility_bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert for restaurant_reservations" ON restaurant_reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert for food_orders" ON food_orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert for contact_submissions" ON contact_submissions FOR INSERT WITH CHECK (true);

-- ========================================
-- INDEXES FOR PERFORMANCE
-- ========================================
CREATE INDEX idx_rooms_category ON rooms(category);
CREATE INDEX idx_rooms_available ON rooms(available);
CREATE INDEX idx_bookings_dates ON bookings(check_in, check_out);
CREATE INDEX idx_menu_category ON menu_items(category);
CREATE INDEX idx_gallery_category ON gallery_images(category);

-- ========================================
-- SETUP COMPLETE!
-- ========================================
