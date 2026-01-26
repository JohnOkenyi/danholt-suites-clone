-- 1. Table for Contact Form Messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' -- 'unread', 'read', 'replied'
);

-- 2. Table for Membership/Privilege Club Requests
CREATE TABLE IF NOT EXISTS membership_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  membership_tier TEXT, -- 'Silver', 'Gold', 'Platinum'
  notes TEXT,
  status TEXT DEFAULT 'pending' -- 'pending', 'approved', 'contacted'
);

-- 3. Enable Public Access (Since we don't have auth on frontend yet)
-- Note: In production, you'd want tighter security (Recaptcha, RLS with authenticated users), 
-- but for this public form, we allow anon inserts.

-- Policy for Contact Messages
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert contact_messages" 
ON contact_messages FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public read contact_messages" 
ON contact_messages FOR SELECT 
USING (true); -- Ideally restrict to admin role, but keeping open for dashboard demo

-- Policy for Membership Requests
ALTER TABLE membership_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert membership_requests" 
ON membership_requests FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public read membership_requests" 
ON membership_requests FOR SELECT 
USING (true);
