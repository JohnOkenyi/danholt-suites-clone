'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail } from 'lucide-react'

export default function ContactPage() {
  return (
    <main className="bg-black min-h-screen text-white">
      {/* Hero */}
      <section className="pt-48 pb-24 px-6 md:px-12 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-danholt-gold text-xs font-bold uppercase tracking-[0.4em] mb-6 block">
            Get in Touch
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-8">
            Contact Us
          </h1>
          <p className="text-white/60 text-lg font-light">
            We are here to answer any questions you may have about our services.
          </p>
        </motion.div>
      </section>

      <section className="pb-32 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Contact Info */}
          <div className="space-y-12">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-danholt-gold" />
              </div>
              <div>
                <h3 className="text-xl font-serif text-white mb-2">Visit Us</h3>
                <p className="text-white/50 leading-relaxed">
                  #3 Iyabo, Obeyode Street,<br />Dogbano, Jikwoyi, Abuja
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-danholt-gold" />
              </div>
              <div>
                <h3 className="text-xl font-serif text-white mb-2">Call Us</h3>
                <p className="text-white/50 leading-relaxed">
                  0704 608 0351<br />
                  0812 345 6789
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-danholt-gold" />
              </div>
              <div>
                <h3 className="text-xl font-serif text-white mb-2">Email Us</h3>
                <p className="text-white/50 leading-relaxed">
                  reservations@danholt.com
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white/5 p-8 md:p-12 rounded-lg border border-white/5">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/50">Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-danholt-gold focus:outline-none transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/50">Phone</label>
                  <input type="tel" className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-danholt-gold focus:outline-none transition-colors" placeholder="+234..." />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/50">Email</label>
                <input type="email" className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-danholt-gold focus:outline-none transition-colors" placeholder="john@example.com" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/50">Message</label>
                <textarea className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-danholt-gold focus:outline-none transition-colors min-h-[100px]" placeholder="How can we help you?" />
              </div>

              <button type="button" className="px-10 py-4 bg-danholt-gold text-danholt-navy font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors duration-300">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
