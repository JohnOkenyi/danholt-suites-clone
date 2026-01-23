'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const galleryImages = [
  { id: 1, src: '/images/room-deluxe.jpg', category: 'rooms', alt: 'Deluxe Suite' },
  { id: 2, src: '/images/feature-dining.jpg', category: 'restaurant', alt: 'Fine Dining' },
  { id: 3, src: '/images/feature-pool.jpg', category: 'facilities', alt: 'Premium Pool' },
  { id: 4, src: '/images/gallery-1.jpg', category: 'exterior', alt: 'Exterior View' },
  { id: 5, src: '/images/gallery-2.jpg', category: 'restaurant', alt: 'Culinary Art' },
  { id: 6, src: '/images/gallery-3.jpg', category: 'rooms', alt: 'Presidential Suite' },
  { id: 7, src: '/images/gallery-4.jpg', category: 'facilities', alt: 'Lounge Area' },
  { id: 8, src: '/images/hero-slide-1.jpg', category: 'facilities', alt: 'Conference Hall' },
  { id: 9, src: '/images/hero-slide-2.jpg', category: 'exterior', alt: 'Night View' },
  { id: 10, src: '/images/hero-slide-3.jpg', category: 'rooms', alt: 'Standard Room' },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'rooms', label: 'Rooms' },
    { id: 'restaurant', label: 'Restaurant' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'exterior', label: 'Exterior' },
  ]

  const filteredImages = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gallery-4.jpg"
            alt="Gallery Hero"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
        <div className="relative z-10 text-center px-4">
          <span className="text-danholt-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">
            Visual Journey
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">Our Gallery</h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg font-light">
            Explore the beauty and comfort of Danholt Suites.
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-12 px-4 sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${activeCategory === category.id
                  ? 'bg-danholt-gold text-danholt-navy'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 px-4 md:px-8 max-w-[1600px] mx-auto min-h-[50vh]">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredImages.map((image) => (
              <motion.div
                layout
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-[4/3] group overflow-hidden rounded-sm bg-zinc-900"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white font-serif text-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {image.alt}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredImages.length === 0 && (
          <div className="text-center py-20 text-white/40">
            No images found in this category.
          </div>
        )}
      </section>
    </div>
  )
}
