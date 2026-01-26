-- FIX MISSING DATA (Run this in Supabase SQL Editor)

-- 1. Ensure rooms table exists
CREATE TABLE IF NOT EXISTS rooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  price NUMERIC NOT NULL,
  description TEXT,
  image_url TEXT
);

-- 2. Insert Rooms (upsert based on slug)
INSERT INTO rooms (name, slug, price, description)
VALUES 
  ('Standard Room', 'standard', 10000, 'A cozy retreat designed for comfort.'),
  ('Deluxe Room', 'deluxe', 15000, 'Spacious elegance with premium furnishings.'),
  ('Executive Deluxe', 'executive-deluxe', 20000, 'The pinnacle of luxury.')
ON CONFLICT (slug) DO UPDATE 
SET price = EXCLUDED.price;

-- 3. Double Check Permissions
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read access" ON rooms;
CREATE POLICY "Public read access" ON rooms FOR SELECT USING (true);
