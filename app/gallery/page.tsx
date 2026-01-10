'use client'

import { useState } from 'react'

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'rooms', label: 'Rooms' },
    { id: 'restaurant', label: 'Restaurant' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'exterior', label: 'Exterior' },
  ]

  return (
    <div className="min-h-screen">
      <section className="relative h-96 flex items-center justify-center bg-gradient-to-br from-dark via-gray-900 to-dark">
        <div className="relative z-10 text-center px-4">
          <span className="inline-block px-4 py-2 bg-gold bg-opacity-20 rounded-full mb-4">
            <span className="text-gold text-sm font-semibold tracking-wider">📸 PHOTO GALLERY</span>
          </span>
          <h1 className="text-5xl font-bold text-white mb-4">Our Gallery</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore the beauty and comfort of Danholt Suites through our gallery.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeCategory === category.id ? 'bg-gold text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Gallery images will be loaded from Supabase Storage</p>
            <p className="text-gray-400 mt-2">Upload images to your Supabase project to display them here</p>
          </div>
        </div>
      </section>
    </div>
  )
}
