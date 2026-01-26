'use client'

import React, { useState, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { createDiningReservation } from '@/app/actions/bookings'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User, Mail, Phone, Home, MessageSquare } from 'lucide-react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

export default function ReservationPage() {
    const [guestType, setGuestType] = useState<'hotel' | 'external'>('hotel')
    const [date, setDate] = useState<Date | null>(null)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        roomNumber: '',
        partySize: '2 Guests',
        time: '',
        specialRequests: ''
    })

    // Server Action Integration
    const [state, formAction] = useFormState(createDiningReservation, { message: '', error: '' })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    // Effect to show success message
    useEffect(() => {
        if (state.success) {
            alert(state.message);
            // Optional: reset form or redirect
        } else if (state.error) {
            alert(state.error);
        }
    }, [state]);

    const isValid = () => {
        if (!formData.fullName || !formData.email || !formData.partySize || !date || !formData.time) return false
        if (guestType === 'hotel' && !formData.roomNumber) return false
        return true
    }

    return (
        <main className="min-h-screen bg-danholt-midnight text-white pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-3xl mx-auto">
                <Link href="/dining" className="inline-flex items-center text-white/50 hover:text-danholt-gold mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dining
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white text-danholt-midnight rounded-2xl p-8 md:p-12 shadow-2xl"
                >
                    <div className="text-center mb-10">
                        <span className="text-danholt-gold text-xs font-bold uppercase tracking-[0.2em] mb-2 block">
                            The Danholt Kitchen
                        </span>
                        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-danholt-midnight">
                            Reserve Your Table
                        </h1>
                        <p className="text-gray-500 font-light">
                            Join us for an unforgettable dining experience
                        </p>
                    </div>

                    <form action={formAction} className="space-y-8">
                        {/* Hidden Inputs for special fields */}
                        <input type="hidden" name="date" value={date ? date.toISOString().split('T')[0] : ''} />
                        <input type="hidden" name="guestType" value={guestType} />

                        {/* Guest Type Selection */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <label
                                className={`
                                    relative flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-300
                                    ${guestType === 'hotel'
                                        ? 'border-danholt-gold bg-danholt-gold/5 shadow-md'
                                        : 'border-gray-200 hover:border-gray-300'}
                                `}
                            >
                                <input
                                    type="radio"
                                    name="guestType_visual"
                                    value="hotel"
                                    checked={guestType === 'hotel'}
                                    onChange={() => setGuestType('hotel')}
                                    className="peer sr-only"
                                />
                                <div className={`w-5 h-5 rounded-full border border-gray-300 mr-4 flex items-center justify-center ${guestType === 'hotel' ? 'border-danholt-gold' : ''}`}>
                                    {guestType === 'hotel' && <div className="w-2.5 h-2.5 rounded-full bg-danholt-gold" />}
                                </div>
                                <div>
                                    <span className="block font-bold text-sm text-danholt-midnight">Hotel Guest</span>
                                    <span className="block text-xs text-gray-500 mt-1">Im staying at Danholt</span>
                                </div>
                            </label>

                            <label
                                className={`
                                    relative flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-300
                                    ${guestType === 'external'
                                        ? 'border-danholt-gold bg-danholt-gold/5 shadow-md'
                                        : 'border-gray-200 hover:border-gray-300'}
                                `}
                            >
                                <input
                                    type="radio"
                                    name="guestType_visual"
                                    value="external"
                                    checked={guestType === 'external'}
                                    onChange={() => setGuestType('external')}
                                    className="peer sr-only"
                                />
                                <div className={`w-5 h-5 rounded-full border border-gray-300 mr-4 flex items-center justify-center ${guestType === 'external' ? 'border-danholt-gold' : ''}`}>
                                    {guestType === 'external' && <div className="w-2.5 h-2.5 rounded-full bg-danholt-gold" />}
                                </div>
                                <div>
                                    <span className="block font-bold text-sm text-danholt-midnight">External Guest</span>
                                    <span className="block text-xs text-gray-500 mt-1">Just visiting for dining</span>
                                </div>
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Personal Info */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="John Smith"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-danholt-gold focus:ring-1 focus:ring-danholt-gold transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-danholt-gold focus:ring-1 focus:ring-danholt-gold transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="+1 (555) 000-0000"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-danholt-gold focus:ring-1 focus:ring-danholt-gold transition-all"
                                    />
                                </div>
                            </div>

                            {/* Conditional Room Number */}
                            {guestType === 'hotel' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-2"
                                >
                                    <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Room Number</label>
                                    <div className="relative">
                                        <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            name="roomNumber"
                                            placeholder="e.g., 205"
                                            value={formData.roomNumber}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-danholt-gold focus:ring-1 focus:ring-danholt-gold transition-all"
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {/* Reservation Details */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Party Size</label>
                                <div className="relative">
                                    <select
                                        name="partySize"
                                        value={formData.partySize}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-danholt-gold focus:ring-1 focus:ring-danholt-gold transition-all appearance-none cursor-pointer"
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8, "9+"].map(num => (
                                            <option key={num} value={`${num} Guests`}>{num} Guests</option>
                                        ))}
                                    </select>
                                    {/* Arrow icon could be here but native select arrow is fine for now or custom */}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Date</label>
                                <div className="relative datepicker-wrapper">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10 pointer-events-none" />
                                    <DatePicker
                                        selected={date}
                                        onChange={(d) => setDate(d)}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-danholt-gold focus:ring-1 focus:ring-danholt-gold transition-all text-sm w-full"
                                        placeholderText="Select date"
                                        dateFormat="MMMM d, yyyy"
                                        minDate={new Date()}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Time</label>
                                <div className="relative">
                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <select
                                        name="time"
                                        value={formData.time}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-danholt-gold focus:ring-1 focus:ring-danholt-gold transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">Select time</option>
                                        {["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"].map(t => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Special Requests</label>
                            <div className="relative">
                                <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                                <textarea
                                    name="specialRequests"
                                    placeholder="Allergies, dietary restrictions, or special occasions..."
                                    value={formData.specialRequests}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-danholt-gold focus:ring-1 focus:ring-danholt-gold transition-all resize-none"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={!isValid()}
                            className="w-full py-4 text-sm font-bold uppercase tracking-widest bg-danholt-midnight text-white rounded-lg hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Confirm Reservation
                        </button>
                    </form>
                </motion.div>
            </div>
        </main>
    )
}
