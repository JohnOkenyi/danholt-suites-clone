'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Users, Bed, Maximize, Wifi, Zap, Coffee, Tv } from 'lucide-react'

export default function RoomsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const rooms = [
    {
      id: '1',
      name: 'Standard',
      slug: 'standard',
      description: 'Comfortable and affordable accommodation',
      price: 10000,
      category: 'budget',
      categoryLabel: 'Budget Friendly',
      capacity: 2,
      bed: 'Double Bed',
      size: 22,
      amenities: ['Free WiFi', '24/7 Power', 'Air Conditioning', 'Flat Screen TV'],
    },
    {
      id: '2',
      name: 'Deluxe',
      slug: 'deluxe',
      description: 'Elegantly furnished room with modern amenities',
      price: 15000,
      category: 'family',
      categoryLabel: 'Best for Family',
      capacity: 2,
      bed: 'Queen Bed',
      size: 28,
      amenities: ['Free WiFi', '24/7 Power', 'Mini Bar', 'Breakfast'],
    },
    {
      id: '3',
      name: 'Executive Deluxe',
      slug: 'executive-deluxe',
      description: 'Premium suite with dedicated workspace and extra living space',
      price: 20000,
      category: 'business',
      categoryLabel: 'Best for Business',
      capacity: 2,
      bed: 'King Bed',
      size: 35,
      amenities: ['Free WiFi', '24/7 Power', 'Mini Bar', 'Breakfast'],
    },
  ]

  const categories = [
    { id: 'all', label: 'All Rooms' },
    { id: 'business', label: 'Best for Business' },
    { id: 'family', label: 'Best for Family' },
    { id: 'budget', label: 'Budget Friendly' },
  ]

  const filteredRooms = selectedCategory === 'all' 
    ? rooms 
    : rooms.filter(room => room.category === selectedCategory)

  const allAmenities = [
    { icon: Wifi, label: 'Free WiFi', description: 'High-speed internet' },
    { icon: Zap, label: '24/7 Power', description: 'Uninterrupted supply' },
    { icon: Coffee, label: 'Room Service', description: 'At your convenience' },
    { icon: Tv, label: 'Flat Screen TV', description: 'Entertainment' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center bg-gradient-to-br from-dark via-gray-900 to-dark">
        <div className="relative z-10 text-center px-4">
          <span className="text-gold text-sm font-semibold tracking-wider uppercase">ACCOMMODATION</span>
          <h1 className="text-5xl font-bold text-white mt-2 mb-4">Our Rooms</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose from our selection of elegantly designed rooms, each offering comfort and modern amenities.
          </p>
        </div>
      </section>

      {/* Booking Widget */}
      <section className="py-8 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Check-in</label>
              <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Check-out</label>
              <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Guests</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold">
                <option>2 Guests</option>
                <option>1 Guest</option>
                <option>3 Guests</option>
                <option>4 Guests</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-gold hover:bg-opacity-90 text-white py-2 rounded-lg font-semibold">
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gold text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          <p className="text-center mt-4 text-gray-600">
            {filteredRooms.length} room{filteredRooms.length !== 1 ? 's' : ''} available
          </p>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <div key={room.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="relative bg-gradient-to-br from-gold to-amber-600 h-64 flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">{room.name}</span>
                  <span className="absolute top-4 right-4 px-3 py-1 bg-white text-gold text-xs font-semibold rounded-full">
                    {room.categoryLabel}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-dark">{room.name}</h3>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">From</p>
                      <p className="text-2xl font-bold text-gold">₦{room.price.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">/night</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{room.description}</p>

                  <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b">
                    <div className="flex flex-col items-center">
                      <Users className="w-5 h-5 text-gold mb-1" />
                      <p className="text-sm font-semibold text-dark">{room.capacity} Guests</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <Bed className="w-5 h-5 text-gold mb-1" />
                      <p className="text-sm font-semibold text-dark">{room.bed}</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <Maximize className="w-5 h-5 text-gold mb-1" />
                      <p className="text-sm font-semibold text-dark">{room.size} m²</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {room.amenities.map((amenity, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 border-2 border-gold text-gold hover:bg-gold hover:text-white py-2 rounded-lg font-semibold transition-all">
                      View Details
                    </button>
                    <button className="flex-1 bg-gold hover:bg-opacity-90 text-white py-2 rounded-lg font-semibold transition-all">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold text-sm font-semibold tracking-wider uppercase">WHAT WE OFFER</span>
            <h2 className="text-4xl font-bold text-dark mt-2">Every Room Includes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {allAmenities.map((amenity, index) => (
              <div key={index} className="bg-white p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
                <amenity.icon className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-dark mb-2">{amenity.label}</h3>
                <p className="text-gray-600">{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
