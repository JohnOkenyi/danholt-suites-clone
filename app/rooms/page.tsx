'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Wifi, Tv, Coffee, Wind, Check } from 'lucide-react'

const rooms = [
  {
    name: "Standard Room",
    price: "₦70,000",
    image: "/images/room-standard.jpg",
    description: "A cozy retreat designed for comfort, featuring modern amenities and a serene atmosphere.",
    amenities: ["Free WiFi", "Smart TV", "Air Conditioning", "Breakfast Included"]
  },
  {
    name: "Deluxe Suite",
    price: "₦95,000",
    image: "/images/room-deluxe.jpg",
    description: "Spacious elegance with premium furnishings, offering an elevated experience for the discerning traveler.",
    amenities: ["Free WiFi", "Smart TV", "Mini Bar", "City View", "Work Desk"]
  },
  {
    name: "Executive Deluxe",
    price: "₦120,000",
    image: "/images/hero-slide-3.jpg", // Using existing image as placeholder
    description: "The pinnacle of luxury. Expansive living space, exclusive access, and unparalleled attention to detail.",
    amenities: ["Free WiFi", "4K Smart TV", "Lounge Area", "Jacuzzi", "Butler Service"]
  }
]

export default function RoomsPage() {
  return (
    <main className="bg-black min-h-screen text-white">
      {/* Rooms Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/room-deluxe.jpg"
            alt="Luxury Room Hero"
            fill
            className="object-cover opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6"
        >
          <span className="text-danholt-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">
            Accommodation
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
            Stay in Style
          </h1>
          <p className="text-white/60 max-w-xl mx-auto text-lg font-light leading-relaxed">
            Experience the perfect blend of comfort and luxury in our thoughtfully designed suites.
          </p>
        </motion.div>
      </section>

      {/* Room List */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {rooms.map((room, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              {/* Image Card */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-8 bg-white/5">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                {/* Price Tag */}
                <div className="absolute top-4 right-4 bg-danholt-gold/90 text-danholt-navy px-4 py-2 text-sm font-bold backdrop-blur-md">
                  {room.price} <span className="text-[10px] font-normal opacity-80">/ NIGHT</span>
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-2xl font-serif text-white mb-2 group-hover:text-danholt-gold transition-colors">
                  {room.name}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6 h-20">
                  {room.description}
                </p>

                {/* Amenities List */}
                <div className="space-y-2 mb-8 border-t border-white/10 pt-6">
                  {room.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-white/70 text-xs tracking-wide">
                      <Check className="w-3 h-3 text-danholt-gold" />
                      {amenity}
                    </div>
                  ))}
                </div>

                <Link href="/book" className="w-full">
                  <button className="w-full py-4 border border-white/20 text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-danholt-gold hover:border-danholt-gold hover:text-danholt-navy transition-all duration-300">
                    Book This Room
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}
