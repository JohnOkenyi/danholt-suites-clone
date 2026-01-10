export interface Room {
  id: string
  name: string
  slug: string
  description: string
  price: number
  category: 'budget' | 'family' | 'business'
  capacity: number
  bed_type: string
  size_sqm: number
  amenities: string[]
  image_url?: string
  images?: string[]
  available: boolean
  created_at: string
}

export interface Facility {
  id: string
  name: string
  slug: string
  description: string
  capacity: string
  operating_hours: string
  image_url?: string
  created_at: string
}

export interface MenuItem {
  id: string
  name: string
  category: 'starters' | 'mains' | 'sides' | 'drinks' | 'desserts'
  description: string
  price: number
  image_url?: string
  popular: boolean
  available: boolean
  created_at: string
}

export interface GalleryImage {
  id: string
  title: string
  category: 'rooms' | 'restaurant' | 'facilities' | 'exterior'
  image_url: string
  display_order: number
  created_at: string
}

export interface Booking {
  id: string
  room_id: string
  guest_name: string
  guest_email: string
  guest_phone: string
  check_in: string
  check_out: string
  guests: number
  total_price: number
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  status: 'new' | 'read' | 'responded'
  created_at: string
}
