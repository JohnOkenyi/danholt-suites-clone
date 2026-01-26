'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import { ContactInfoCard } from '@/components/ContactInfoCard'
import ContactMapLoader from '@/components/ContactMapLoader'

import { useFormStatus } from 'react-dom'
import { useFormState } from 'react-dom'
import { submitContactForm } from '@/app/actions/bookings'
import { useEffect } from 'react'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-4 bg-danholt-midnight text-white font-bold uppercase tracking-widest rounded-lg hover:bg-black transition-colors flex items-center justify-center gap-3 disabled:opacity-70"
    >
      {pending ? (
        <span>Sending...</span>
      ) : (
        <>
          <Send className="w-5 h-5" />
          <span>Send Message</span>
        </>
      )}
    </button>
  )
}

export default function ContactPage() {
  const [state, formAction] = useFormState(submitContactForm, { message: '', error: '' })

  useEffect(() => {
    if (state?.success) {
      alert(state.message)
    } else if (state?.error) {
      alert(state.error)
    }
  }, [state])

  // Removed old state and handler

  return (
    <main className="min-h-screen bg-danholt-midnight text-white selection:bg-danholt-gold selection:text-danholt-midnight">
      {/* Header Section */}
      <section className="pt-48 pb-20 px-6 md:px-12 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-danholt-gold text-sm font-bold uppercase tracking-[0.2em] mb-4 block font-serif">
            GET IN TOUCH
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
            Contact Us
          </h1>
          <p className="text-white/60 text-lg font-light max-w-2xl mx-auto">
            We&apos;re here to assist with your inquiries, reservations, or any special requests.
          </p>
        </motion.div>
      </section>

      <section className="pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left Column: Cards Grid */}
          <div className="space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ContactInfoCard
                icon={MapPin}
                title="Location"
                content={[
                  "Danholt Suites",
                  "#3 Iyabo, Obeyode Street",
                  "(Beside Collinear Hospital)",
                  "Dogbano, Jikwoyi, Phase 3, Abuja"
                ]}
              />
              <ContactInfoCard
                icon={Phone}
                title="Phone"
                content={[
                  "07046080351"
                ]}
              />
              <ContactInfoCard
                icon={Mail}
                title="Email"
                content={[
                  "reservations@danholt.com",
                  "concierge@danholt.com"
                ]}
              />
              <ContactInfoCard
                icon={Clock}
                title="Reception"
                content={[
                  "24 hours, 7 days a week",
                  "Concierge: 6AM - 11PM"
                ]}
              />
            </div>

            {/* Map Section */}
            <div className="w-full">
              <ContactMapLoader />
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:sticky lg:top-32 h-fit">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl">
              <div className="mb-8">
                <h2 className="text-3xl font-serif font-bold text-danholt-midnight mb-2">Send a Message</h2>
                <p className="text-gray-500">We usually reply within 24 hours.</p>
              </div>

              <form action={formAction} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-danholt-midnight block">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your name"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-danholt-midnight placeholder:text-gray-400 focus:outline-none focus:border-danholt-gold focus:ring-1 focus:ring-danholt-gold transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-danholt-midnight block">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="your@email.com"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-danholt-midnight placeholder:text-gray-400 focus:outline-none focus:border-danholt-gold focus:ring-1 focus:ring-danholt-gold transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-danholt-midnight block">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder="How can we help?"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-danholt-midnight placeholder:text-gray-400 focus:outline-none focus:border-danholt-gold focus:ring-1 focus:ring-danholt-gold transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-danholt-midnight block">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    placeholder="Your message..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-danholt-midnight placeholder:text-gray-400 focus:outline-none focus:border-danholt-gold focus:ring-1 focus:ring-danholt-gold transition-all resize-none"
                  />
                </div>

                <SubmitButton />
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
