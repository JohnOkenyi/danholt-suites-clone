'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const facilities = [
  {
    title: "Conference Hall",
    description: "Our state-of-the-art conference hall is designed for business excellence. Equipped with high-speed internet, modern audio-visual systems, and ergonomic seating, it's the perfect venue for seminars, workshops, and corporate meetings.",
    image: "/images/hero-slide-1.jpg", // Placeholder
    features: ["High-speed WiFi", "Projector & Screen", "Sound System", "Catering Available"]
  },
  {
    title: "Sports Facilities",
    description: "Maintain your active lifestyle with our premium sports facilities. Whether you prefer a competitive game of tennis or a team match on our 5-a-side football pitch, we provide the perfect environment for recreation and fitness.",
    image: "/images/hero-slide-3.jpg", // Placeholder
    features: ["5-a-side Football Pitch", "Lawn Tennis Court", "Floodlights for Night Games", "Equipment Rental"]
  },
  {
    title: "Children's Playground",
    description: "A safe and fun environment for our younger guests. Our playground is equipped with modern play structures and is located within a secure area so parents can relax while the kids have fun.",
    image: "/images/feature-pool.jpg", // Placeholder
    features: ["Secure Enclosure", "Modern Play Equipment", "Soft Landing Surfaces", "Supervised Area"]
  }
]

export default function FacilitiesPage() {
  return (
    <main className="bg-black min-h-screen text-white">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-slide-3.jpg"
            alt="Facilities Hero"
            fill
            className="object-cover opacity-30 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6"
        >
          <span className="text-danholt-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">
            Amenities
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
            World Class Facilities
          </h1>
          <p className="text-white/60 max-w-xl mx-auto text-lg font-light leading-relaxed">
            Designed for both business and leisure, ensuring a complete experience.
          </p>
        </motion.div>
      </section>

      {/* Facilities Content */}
      <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto space-y-32">
        {facilities.map((facility, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16 md:gap-24`}
          >
            {/* Image Side */}
            <div className="w-full md:w-1/2 relative aspect-[4/3] grayscale hover:grayscale-0 transition-all duration-700">
              <div className="absolute inset-0 border border-white/10 translate-x-4 translate-y-4 -z-10" />
              <Image
                src={facility.image}
                alt={facility.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Text Side */}
            <div className="w-full md:w-1/2 space-y-8">
              <div>
                <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">
                  {facility.title}
                </h2>
                <div className="w-20 h-[1px] bg-danholt-gold mb-8" />
                <p className="text-white/60 leading-loose text-lg font-light">
                  {facility.description}
                </p>
              </div>

              <ul className="grid grid-cols-2 gap-4">
                {facility.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-white/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-danholt-gold" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </section>
    </main>
  )
}
