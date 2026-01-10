# 🚀 Quick Start Guide - Danholt Suites Clone

Since you've already cloned the repository and set it up locally, here's your next steps to complete the website:

## ✅ What You Have

- Repository cloned locally
- Configuration files (package.json, tsconfig.json, next.config.js, .env.example)
- Database schema (supabase-setup.sql)
- Comprehensive README

## 🎯 What's Next - Complete These Steps

### Step 1: Initialize Next.js (If Not Done)

```bash
cd danholt-suites-clone

# Install all dependencies
npm install

# If you haven't initialized Next.js yet:
npx create-next-app@14 . --typescript --tailwind --app
# Answer: Yes to all prompts
```

### Step 2: Set Up Tailwind Config

Create `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#D4A574",
        dark: "#1A1A1A",
      },
    },
  },
  plugins: [],
};
export default config;
```

### Step 3: Add Global Styles

Update `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background-color: #FFFFFF;
}
```

### Step 4: Set Up Supabase

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. **Use existing project** (homelyhealth-care or odu-oma-club-backend)
3. **Run the SQL**: Copy content from `supabase-setup.sql`
4. **Get your credentials**:
   - Project URL
   - Anon key
   - Service role key

5. **Create .env.local**:
```bash
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

### Step 5: Create Supabase Client

Create `lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Step 6: Create TypeScript Types

Create `types/index.ts`:

```typescript
export interface Room {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
  category: 'business' | 'family' | 'budget';
  capacity: number;
  bed_type: string;
  size_sqm: number;
  amenities: string[];
  available: boolean;
}

export interface Facility {
  id: string;
  name: string;
  slug: string;
  description: string;
  capacity: string;
  operating_hours: string;
  image_url: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'starters' | 'mains' | 'sides' | 'drinks' | 'desserts';
  description: string;
  price: number;
  image_url: string;
  popular: boolean;
}
```

### Step 7: Create Layout Components

Create `components/Header.tsx`:

```typescript
import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-dark/95 backdrop-blur-sm z-50 border-b border-gold/20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          <span className="text-gold">DANHOLT</span>
          <span className="text-white"> SUITES</span>
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-white hover:text-gold transition">Home</Link>
          <Link href="/rooms" className="text-white hover:text-gold transition">Rooms</Link>
          <Link href="/restaurant" className="text-white hover:text-gold transition">Restaurant</Link>
          <Link href="/facilities" className="text-white hover:text-gold transition">Facilities</Link>
          <Link href="/gallery" className="text-white hover:text-gold transition">Gallery</Link>
          <Link href="/contact" className="text-white hover:text-gold transition">Contact</Link>
        </nav>

        <Link href="/rooms" className="bg-gold text-dark px-6 py-2 rounded-full hover:bg-gold/90 transition">
          Book a Stay
        </Link>
      </div>
    </header>
  );
}
```

Create `components/Footer.tsx`:

```typescript
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-gold">DANHOLT</span> SUITES
            </h3>
            <p className="text-gray-400">
              Your home in Abuja. Experience comfort, privacy, and convenience.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4 text-gold">QUICK LINKS</h4>
            <div className="space-y-2">
              <Link href="/" className="block hover:text-gold">Home</Link>
              <Link href="/rooms" className="block hover:text-gold">Rooms</Link>
              <Link href="/restaurant" className="block hover:text-gold">Restaurant</Link>
              <Link href="/facilities" className="block hover:text-gold">Facilities</Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4 text-gold">CONTACT</h4>
            <p>#3 Iyabo Okeyode Street</p>
            <p>Jikwoyi Phase 3, Abuja</p>
            <p className="mt-2">Phone: 07046080351</p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          © 2026 Danholt Suites. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
```

### Step 8: Create Root Layout

Update `app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Danholt Suites - Your Home in Abuja",
  description: "Experience comfort, privacy, and convenience at Danholt Suites",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

### Step 9: Create Home Page

Update `app/page.tsx`:

```typescript
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen bg-dark text-white flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark/50" />
        <div className="container mx-auto px-4 z-10">
          <p className="text-gold text-sm uppercase tracking-wider mb-4">WELCOME TO DANHOLT SUITES</p>
          <h1 className="text-6xl font-bold mb-4">
            Your Home<br />
            <span className="text-gold">in Abuja</span>
          </h1>
          <p className="text-xl max-w-2xl mb-8">
            Comfort, privacy, and convenience. Experience top-notch service at Danholt Suites – where every stay feels like coming home.
          </p>
          
          {/* Booking Widget */}
          <div className="bg-dark/80 backdrop-blur-md p-6 rounded-lg max-w-2xl">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm mb-2">Check-in</label>
                <input type="date" className="w-full bg-white/10 border border-gold/30 rounded px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm mb-2">Check-out</label>
                <input type="date" className="w-full bg-white/10 border border-gold/30 rounded px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm mb-2">Guests</label>
                <select className="w-full bg-white/10 border border-gold/30 rounded px-4 py-2">
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4 Guests</option>
                </select>
              </div>
            </div>
            <Link href="/rooms" className="block mt-4 bg-gold text-dark text-center py-3 rounded-lg font-bold hover:bg-gold/90 transition">
              Check Availability
            </Link>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-gold text-xl font-bold mb-2">Free WiFi</h3>
              <p>High-speed internet throughout</p>
            </div>
            <div className="text-center">
              <h3 className="text-gold text-xl font-bold mb-2">24/7 Power</h3>
              <p>Uninterrupted electricity</p>
            </div>
            <div className="text-center">
              <h3 className="text-gold text-xl font-bold mb-2">Fine Dining</h3>
              <p>Delicious cuisines served</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
```

### Step 10: Run Your Website

```bash
npm run dev
```

Open http://localhost:3000 - You should see your homepage!

## 🎨 Next Pages to Build

Now that you have the foundation, create these pages:

1. **app/rooms/page.tsx** - List all rooms from Supabase
2. **app/restaurant/page.tsx** - Show menu items
3. **app/facilities/page.tsx** - Display facilities
4. **app/gallery/page.tsx** - Photo gallery
5. **app/contact/page.tsx** - Contact form

## 📦 Need Help?

Check the README.md for detailed database schemas and more examples!

---

**Your website is now ready to build! Start with the steps above and you'll have a working clone in no time.** 🎉
