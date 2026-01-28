'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const facilities = [
  {
    title: "Conference Hall",
    description: "Our state-of-the-art conference hall is designed for business excellence. Equipped with high-speed internet, modern audio-visual systems, and ergonomic seating, it's the perfect venue for seminars, workshops, and corporate meetings.",
    image: "/images/conference-hall-custom.jpg",
    features: ["High-speed WiFi", "Projector & Screen", "Sound System", "Catering Available"],
    bookingLink: "/facilities/book?facility=Conference%20Hall"
  },
  {
    title: "Sports Facilities",
    description: "Maintain your active lifestyle with our premium sports facilities. Whether you prefer a competitive game of tennis or a team match on our 5-a-side football pitch, we provide the perfect environment for recreation and fitness. Access to the football pitch: ₦1,500.",
    image: "/images/sports-pitch-custom.jpg",
    features: ["5-a-side Football Pitch", "Lawn Tennis Court", "Floodlights for Night Games", "Access: ₦1,500"],
    bookingLink: "/facilities/book?facility=Sports%20Facilities"
  },
  {
    title: "Swimming Pool",
    description: "Dive into relaxation in our crystal-clear swimming pool. Perfect for a refreshing dip or lounging by the water. Access to pool: ₦2,000.",
    image: "/images/swimming-pool.jpg", // Assuming this exists or will be added. If not, I'll need to use a generic one or ask.
    features: ["Adult & Kids Sections", "Poolside Bar", "Sun Loungers", "Towel Service", "Access: ₦2,000"],
    bookingLink: "/facilities/book?facility=Swimming%20Pool"
  },
  {
    title: "Children's Playground",
    description: "A safe and fun environment for our younger guests. Our playground is equipped with modern play structures and is located within a secure area so parents can relax while the kids have fun.",
    image: "/images/playground-custom.jpg",
    features: ["Secure Enclosure", "Modern Play Equipment", "Soft Landing Surfaces", "Supervised Area"]
  }
]

export default function FacilitiesPage() {
  return (
    <main className="bg-danholt-navy min-h-screen text-white">
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
          <div
            key={i}
            className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24`}
          >
            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full md:w-1/2 relative aspect-[4/3] grayscale hover:grayscale-0 transition-all duration-700"
            >
              <div className="absolute inset-0 border border-white/10 translate-x-4 translate-y-4 -z-10" />
              <Image
                src={facility.image}
                alt={facility.title}
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Text Side */}
            <motion.div
              initial={{ opacity: 0, x: i % 2 === 1 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full md:w-1/2 space-y-8"
            >
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

              {/* Booking Button */}
              {facility.bookingLink && (
                <div className="pt-8 relative z-30 flex justify-center md:block">
                  <a
                    href={facility.bookingLink}
                    className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 md:gap-3 md:px-10 md:py-5 text-danholt-navy text-base md:text-lg font-bold uppercase tracking-widest rounded-full shadow-xl overflow-hidden transition-all duration-300 transform active:scale-95"
                    style={{
                      background: 'linear-gradient(135deg, #FFD700 0%, #D4AF37 50%, #B8860B 100%)',
                    }}
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />

                    <span>Book </span>
                    {/* Arrow Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1 md:w-5 md:h-5">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        ))}
      </section>
    </main>
  )
}
