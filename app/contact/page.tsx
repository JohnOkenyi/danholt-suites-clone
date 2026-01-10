'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Form submitted! (Integration with Supabase pending)')
  }

  return (
    <div className="min-h-screen">
      <section className="relative h-96 flex items-center justify-center bg-gradient-to-br from-dark via-gray-900 to-dark">
        <div className="relative z-10 text-center px-4">
          <span className="inline-block px-4 py-2 bg-gold bg-opacity-20 rounded-full mb-4">
            <span className="text-gold text-sm font-semibold tracking-wider">💬 GET IN TOUCH</span>
          </span>
          <h1 className="text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We'd love to hear from you. Reach out for reservations, inquiries, or feedback.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <MapPin className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold text-dark mb-2">Location</h3>
              <p className="text-gray-600">#3 Iyabo Okeyode Street<br />Jikwoyi Phase 3, Abuja</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <Phone className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold text-dark mb-2">Phone</h3>
              <a href="tel:07046080351" className="text-gold hover:underline text-lg">07046080351</a>
              <p className="text-gray-600 mt-1">Available 24/7</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <Clock className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold text-dark mb-2">Hours</h3>
              <p className="text-gray-600">Check-in: 2:00 PM<br />Check-out: 12:00 PM</p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-dark mb-6 text-center">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold hover:bg-opacity-90 text-white py-4 rounded-lg font-semibold text-lg transition-all"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
