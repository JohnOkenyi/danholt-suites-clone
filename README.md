# 🏨 Danholt Suites Clone

> A complete, pixel-perfect clone of the Danholt Suites hotel website with full ownership of frontend and backend code. Built with Next.js, React, Tailwind CSS, and Supabase - **zero Base44 dependencies**.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Database Setup](#database-setup)
- [Deployment](#deployment)
- [Pages & Features](#pages--features)

## 🎯 Overview

This is a complete recreation of the Danholt Suites hotel website (originally built on Base44) as an independent, fully-owned application. Every feature, animation, and design element has been faithfully reproduced.

**Original Site:** https://danholt-suites-ccb8a24a.base44.app/

## ✨ Features

### Core Functionality
- ✅ Room booking system with availability checking
- ✅ Restaurant menu and food pre-ordering
- ✅ Facility booking (Conference Hall, Football Pitch, Event Space, etc.)
- ✅ Photo gallery with category filtering
- ✅ Contact form with email integration
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Animated particle background on hero section
- ✅ Interactive date pickers and guest selectors

### Pages
1. **Home** - Hero section, booking widget, amenities showcase
2. **Rooms** - Room listings with 3 room types (Standard ₦10k, Deluxe ₦15k, Executive ₦20k)
3. **Restaurant** - Menu with categories, reservations, pre-orders
4. **Facilities** - 5 facilities (Conference Hall, Football Pitch, Event Space, Meeting Room, Playground)
5. **Gallery** - Filterable photo gallery
6. **Contact** - Contact form, location, hours

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod
- **Date Picker:** react-datepicker
- **Icons:** Lucide React

### Backend
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage
- **API:** Next.js API Routes
- **Email:** Resend or SendGrid

### Deployment
- **Hosting:** Vercel
- **CI/CD:** Auto-deploy on push

## 📁 Project Structure

```
danholt-suites-clone/
├── src/
│   ├── app/              # Next.js pages
│   │   ├── page.tsx      # Home
│   │   ├── rooms/
│   │   ├── restaurant/
│   │   ├── facilities/
│   │   ├── gallery/
│   │   ├── contact/
│   │   └── api/
│   ├── components/       # Reusable components
│   ├── lib/             # Utils & Supabase client
│   └── types/           # TypeScript types
├── public/              # Static assets
└── .env.local          # Environment variables
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Supabase account
- Git

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/JohnOkenyi/danholt-suites-clone.git
cd danholt-suites-clone

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# 4. Run development server
npm run dev
```

Open http://localhost:3000

## 🗄️ Database Setup

### Supabase Tables

Create these tables in your Supabase project:

#### 1. `rooms`
```sql
CREATE TABLE rooms (
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
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 2. `bookings`
```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id UUID REFERENCES rooms(id),
  guest_name VARCHAR(255) NOT NULL,
  guest_email VARCHAR(255) NOT NULL,
  guest_phone VARCHAR(50),
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INT NOT NULL,
  total_price DECIMAL(10, 2),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 3. `facilities`
```sql
CREATE TABLE facilities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  description TEXT,
  capacity VARCHAR(100),
  operating_hours VARCHAR(100),
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 4. `menu_items`
```sql
CREATE TABLE menu_items (
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
```

#### 5. `gallery_images`
```sql
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255),
  category VARCHAR(50), -- 'rooms', 'restaurant', 'facilities', 'exterior'
  image_url TEXT NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 6. `contact_submissions`
```sql
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Sample Data

#### Rooms
```sql
INSERT INTO rooms (name, slug, description, price, category, capacity, bed_type, size_sqm, amenities) VALUES
('Standard', 'standard', 'Comfortable and affordable accommodation', 10000, 'budget', 2, 'Double Bed', 22, '["Free WiFi", "24/7 Power", "Air Conditioning", "Flat Screen TV"]'),
('Deluxe', 'deluxe', 'Elegantly furnished room with modern amenities', 15000, 'family', 2, 'Queen Bed', 28, '["Free WiFi", "24/7 Power", "Mini Bar", "Breakfast"]'),
('Executive Deluxe', 'executive-deluxe', 'Premium suite with dedicated workspace', 20000, 'business', 2, 'King Bed', 35, '["Free WiFi", "24/7 Power", "Mini Bar", "Breakfast"]');
```

#### Facilities
```sql
INSERT INTO facilities (name, slug, description, capacity, operating_hours) VALUES
('Conference Hall', 'conference_hall', 'Spacious venue for conferences and seminars', '500 people', '8:00 AM - 10:00 PM'),
('5-Aside Football Pitch', 'football_pitch', 'World-class mini stadium with floodlights', '10-20 players', '6:00 AM - 10:00 PM'),
('Event Space', 'event_space', 'Versatile space for weddings and parties', '200 guests', '24 hours'),
('Meeting Room', 'meeting_room', 'Private rooms with modern tech', '20 people', '8:00 AM - 8:00 PM'),
('Children\'s Playground', 'playground', 'Safe playground for all ages', '30 children', '8:00 AM - 6:00 PM');
```

#### Menu Items
```sql
INSERT INTO menu_items (name, category, description, price, popular) VALUES
('Jollof Rice', 'mains', 'Signature Nigerian jollof rice with chicken', 2500, true),
('Pounded Yam & Egusi', 'mains', 'Traditional pounded yam with egusi soup', 3000, true),
('Fried Rice', 'mains', 'Nigerian-style fried rice with vegetables', 2500, false),
('Grilled Fish', 'mains', 'Whole grilled tilapia with sides', 4000, false);
```

## 🎨 Design System

### Colors
```css
--gold: #D4A574 (primary brand color)
--dark: #1A1A1A (backgrounds)
--white: #FFFFFF (text)
```

### Key Components
1. **Particle Background** - Animated gold particles
2. **Booking Widget** - Date picker + guest selector
3. **Room/Facility Cards** - Image, details, CTAs
4. **Navigation** - Mobile hamburger menu

## 🚀 Deployment

### Deploy to Vercel

1. Connect GitHub repo to Vercel
2. Add environment variables
3. Deploy

Auto-deploys on every push to `main`.

## 📧 Contact Information

**Danholt Suites**
- Address: #3 Iyabo Okeyode Street, Jikwoyi Phase 3, Abuja
- Phone: 07046080351
- Email: info@danholtsuites.com

## 📝 Content Summary

### Room Types (3)
- Standard: ₦10,000/night
- Deluxe: ₦15,000/night  
- Executive Deluxe: ₦20,000/night

### Facilities (5)
- Conference Hall (500 people)
- 5-Aside Football Pitch
- Event Space (200 guests)
- Meeting Room (20 people)
- Children's Playground

### Amenities
- Free WiFi
- 24/7 Power Supply
- Fine Dining Restaurant
- Secure Parking
- Room Service

---

**Built with ❤️ using Next.js, React, Tailwind CSS & Supabase**
