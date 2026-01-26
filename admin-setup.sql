-- Enable Public Read Access for Admin Dashboard (Demo only)
CREATE POLICY "Public read access for bookings" ON bookings FOR SELECT USING (true);
CREATE POLICY "Public read access for restaurant_reservations" ON restaurant_reservations FOR SELECT USING (true);

-- Ensure Insert is allowed (already in setup but just in case)
CREATE POLICY "Public insert for bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert for restaurant_reservations" ON restaurant_reservations FOR INSERT WITH CHECK (true);
