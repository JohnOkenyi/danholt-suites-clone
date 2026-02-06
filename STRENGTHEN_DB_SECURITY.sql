add this email first okenyijohn@  TO authenticated USING (is_admin());

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
