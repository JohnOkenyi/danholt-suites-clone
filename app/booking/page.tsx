'use client'

import { motion } from 'framer-motion'
import { Calendar, Users, Mail, Phone, User, CreditCard, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function BookingPage() {
    const [activeSelect, setActiveSelect] = useState<string | null>(null)

    return (
        <div className="min-h-screen bg-danholt-navy pt-32 pb-20">
            {/* Hero Header */}
            <section className="relative px-6 md:px-12 mb-20 max-w-[1400px] mx-auto text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-serif text-white mb-6"
                >
                    Secure Your <span className="text-danholt-gold">Sanctuary</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-white/60 text-lg max-w-2xl mx-auto font-light tracking-wide"
                >
                    Begin your journey to relaxation. Reserve your suite and let us curate an unforgettable experience for you.
                </motion.p>
            </section>

            {/* Booking Form Container */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="max-w-4xl mx-auto px-6"
            >
                <div className="glass-panel-luxury p-8 md:p-12 rounded-2xl border border-white/5 relative overflow-hidden">
                    {/* Decorative Glow */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-danholt-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <form className="relative z-10 space-y-12">

                        {/* Step 1: Stay Details */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-serif text-white border-b border-white/10 pb-4">Stay Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Dates */}
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-danholt-gold font-bold">Check-in</label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-danholt-gold transition-colors" />
                                        <input
                                            type="date"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white focus:outline-none focus:border-danholt-gold/50 focus:bg-white/10 transition-all font-sans"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-danholt-gold font-bold">Check-out</label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-danholt-gold transition-colors" />
                                        <input
                                            type="date"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white focus:outline-none focus:border-danholt-gold/50 focus:bg-white/10 transition-all font-sans"
                                        />
                                    </div>
                                </div>

                                {/* Guests */}
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-danholt-gold font-bold">Guests</label>
                                    <div className="relative group">
                                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-danholt-gold transition-colors" />
                                        <select className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white focus:outline-none focus:border-danholt-gold/50 focus:bg-white/10 transition-all font-sans appearance-none cursor-pointer">
                                            <option className="bg-danholt-charcoal">1 Guest</option>
                                            <option className="bg-danholt-charcoal">2 Guests</option>
                                            <option className="bg-danholt-charcoal">3 Guests</option>
                                            <option className="bg-danholt-charcoal">4+ Guests</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Room Type */}
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-danholt-gold font-bold">Room Selection</label>
                                    <div className="relative group">
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                                        <select className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-4 pr-12 text-white focus:outline-none focus:border-danholt-gold/50 focus:bg-white/10 transition-all font-sans appearance-none cursor-pointer">
                                            <option className="bg-danholt-charcoal">Deluxe Suite</option>
                                            <option className="bg-danholt-charcoal">Executive Suite</option>
                                            <option className="bg-danholt-charcoal">Presidential Penthouse</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 2: Personal Information */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-serif text-white border-b border-white/10 pb-4">Personal Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-danholt-gold font-bold">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-danholt-gold transition-colors" />
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-danholt-gold/50 focus:bg-white/10 transition-all font-sans"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-danholt-gold font-bold">Email Address</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-danholt-gold transition-colors" />
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-danholt-gold/50 focus:bg-white/10 transition-all font-sans"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-danholt-gold font-bold">Phone Number</label>
                                    <div className="relative group">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-danholt-gold transition-colors" />
                                        <input
                                            type="tel"
                                            placeholder="+1 (555) 000-0000"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-danholt-gold/50 focus:bg-white/10 transition-all font-sans"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-danholt-gold font-bold">Special Requests</label>
                                <textarea
                                    rows={4}
                                    placeholder="Dietary restrictions, anniversary celebration, etc."
                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-4 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-danholt-gold/50 focus:bg-white/10 transition-all font-sans resize-none"
                                ></textarea>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                className="w-full py-5 bg-danholt-gold text-danholt-navy font-bold text-lg uppercase tracking-widest rounded-lg hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(197,160,89,0.2)] hover:shadow-[0_0_30px_rgba(197,160,89,0.4)] flex items-center justify-center gap-2"
                            >
                                Confirm Reservation
                            </button>
                            <p className="text-center text-white/40 text-sm mt-4">
                                Payment will be collected upon arrival. No credit card required to book.
                            </p>
                        </div>

                    </form>
                </div>
            </motion.div>
        </div>
    )
}
