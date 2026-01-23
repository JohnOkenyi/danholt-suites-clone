'use client'

import { motion } from 'framer-motion'
import { Calendar, Users, Mail, Phone, User, CreditCard, ChevronDown, CheckCircle, Info, ArrowLeft } from 'lucide-react'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ROOMS } from '@/lib/rooms'
import { Room } from '@/types/room'

const ADDONS = [
    { id: 'early_checkin', label: 'Early Check-in Guarantee', price: 2000, desc: 'Secure early check-in (subject to availability).' },
    { id: 'late_checkout', label: 'Late Checkout Guarantee', price: 2000, desc: 'Extend your stay beyond standard checkout.' },
    { id: 'celebration', label: 'Celebration Setup', price: 5000, desc: 'Room decoration for special occasions.' },
    { id: 'sweet_arrival', label: 'Sweet Arrival', price: 10000, desc: 'Pre-order cake, flowers, or wine.' }
]

function BookingForm() {
    const searchParams = useSearchParams()
    const initialRoomId = searchParams.get('room')

    const [formData, setFormData] = useState({
        checkIn: '',
        checkOut: '',
        guests: 2,
        roomId: initialRoomId || (ROOMS[0] ? ROOMS[0].id : ''),
        name: '',
        email: '',
        phone: '',
        requests: '',
        addons: [] as string[]
    })

    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
    const [stats, setStats] = useState({ nights: 0, subtotal: 0, total: 0 })

    // Update selected room when ID changes
    useEffect(() => {
        const room = ROOMS.find(r => r.id === formData.roomId) || ROOMS[0]
        setSelectedRoom(room || null)
    }, [formData.roomId])

    // Calculate stats when room or dates change
    useEffect(() => {
        if (!selectedRoom || !formData.checkIn || !formData.checkOut) {
            setStats({ nights: 0, subtotal: 0, total: 0 })
            return
        }

        const start = new Date(formData.checkIn)
        const end = new Date(formData.checkOut)

        if (end <= start) {
            setStats({ nights: 0, subtotal: 0, total: 0 })
            return
        }

        const diffTime = Math.abs(end.getTime() - start.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        const subtotal = diffDays * selectedRoom.price
        const addonsTotal = formData.addons.reduce((acc, addonId) => {
            const addon = ADDONS.find(a => a.id === addonId)
            return acc + (addon ? addon.price : 0)
        }, 0)

        setStats({
            nights: diffDays,
            subtotal: subtotal,
            total: subtotal + addonsTotal
        })

    }, [formData.checkIn, formData.checkOut, selectedRoom, formData.addons])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const isFormValid = () => {
        return (
            formData.checkIn !== '' &&
            formData.checkOut !== '' &&
            formData.name !== '' &&
            formData.email !== '' &&
            formData.phone !== '' &&
            stats.nights > 0
        )
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would handle the submission logic
        console.log("Booking submitted", { formData, stats })
        alert("Booking Simulated! In a real app, this would process payment.")
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form Column */}
            <div className="lg:col-span-2">
                <div className="glass-panel-luxury p-8 md:p-12 rounded-2xl border border-white/5 relative overflow-hidden bg-white/5 backdrop-blur-sm">
                    {/* Decorative Glow */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-danholt-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <form onSubmit={handleSubmit} className="relative z-10 space-y-12">

                        {/* Step 1: Stay Details */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-serif text-white border-b border-white/10 pb-4 flex items-center gap-3">
                                <span className="bg-danholt-gold text-danholt-navy w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                                Stay Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Dates */}
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-danholt-gold font-bold">Check-in Date</label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-danholt-gold transition-colors" />
                                        <input
                                            type="date"
                                            name="checkIn"
                                            value={formData.checkIn}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white focus:outline-none focus:border-danholt-gold/50 focus:bg-white/10 transition-all font-sans cursor-pointer"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-danholt-gold font-bold">Check-out Date</label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-danholt-gold transition-colors" />
                                        <input
                                            type="date"
                                            name="checkOut"
                                            value={formData.checkOut}
                                            onChange={handleInputChange}
                                            required
                                            min={formData.checkIn}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white focus:outline-none focus:border-danholt-gold/50 focus:bg-white/10 transition-all font-sans cursor-pointer"
                                        />
                                    </div>
                                </div>

                                {/* Guests */}
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-danholt-gold font-bold">Guests</label>
                                    <div className="relative group">
                                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-danholt-gold transition-colors" />
                                        <select
                                            name="guests"
                                            value={formData.guests}
                                            onChange={handleInputChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white focus:outline-none focus:border-danholt-gold/50 focus:bg-white/10 transition-all font-sans appearance-none cursor-pointer"
                                        >
                                            {[1, 2, 3, 4, 5, 6].map(num => (
                                                <option key={num} value={num} className="bg-danholt-navy text-white">{num} Guest{num > 1 ? 's' : ''}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Room Type */}
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-danholt-gold font-bold">Room Preference</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-white/40 group-focus-within:text-danholt-gold">
                                            <Info size={18} />
                                        </div>
                                        <select
                                            name="roomId"
                                            value={formData.roomId}
                                            onChange={handleInputChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-12 pr-12 text-white focus:outline-none focus:border-danholt-gold/50 focus:bg-white/10 transition-all font-sans appearance-none cursor-pointer"
                                        >
                                            {ROOMS.map(room => (
                                                <option key={room.id} value={room.id} className="bg-danholt-navy text-white">{room.name}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>



                        {/* Step 1.5: Enhance Your Stay */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-serif text-white border-b border-white/10 pb-4 flex items-center gap-3">
                                <span className="bg-danholt-gold text-danholt-navy w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                                Enhance Your Stay
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {ADDONS.map(addon => (
                                    <label
                                        key={addon.id}
                                        className={`relative flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-300
                                            ${formData.addons.includes(addon.id)
                                                ? 'bg-danholt-gold/10 border-danholt-gold'
                                                : 'bg-white/5 border-white/10 hover:border-white/20'
                                            }
                                        `}
                                    >
                                        <div className="pt-1">
                                            <input
                                                type="checkbox"
                                                checked={formData.addons.includes(addon.id)}
                                                onChange={(e) => {
                                                    const isChecked = e.target.checked
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        addons: isChecked
                                                            ? [...prev.addons, addon.id]
                                                            : prev.addons.filter(id => id !== addon.id)
                                                    }))
                                                }}
                                                className="w-4 h-4 rounded-sm accent-danholt-gold"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-sm mb-1">{addon.label}</h3>
                                            <p className="text-white/50 text-xs mb-2">{addon.desc}</p>
                                            <span className="text-danholt-gold text-xs font-bold">+₦{addon.price.toLocaleString()}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Step 3: Personal Information */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-serif text-white border-b border-white/10 pb-4 flex items-center gap-3">

                                <span className="bg-danholt-gold text-danholt-navy w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                                Guest Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-danholt-gold font-bold">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-danholt-gold transition-colors" />
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
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
                                            name="email"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-danholt-gold/50 focus:bg-white/10 transition-all font-sans"
                                        />
                                    </div>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-danholt-gold font-bold">Phone Number</label>
                                    <div className="relative group">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-danholt-gold transition-colors" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="+234 800 000 0000"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-danholt-gold/50 focus:bg-white/10 transition-all font-sans"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-danholt-gold font-bold">Special Requests</label>
                                <textarea
                                    name="requests"
                                    rows={4}
                                    placeholder="Dietary restrictions, anniversary celebration, early check-in etc."
                                    value={formData.requests}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-4 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-danholt-gold/50 focus:bg-white/10 transition-all font-sans resize-none"
                                ></textarea>
                            </div>
                        </div>

                        {/* Mobile Confirm Button (visible only on small screens) */}
                        <div className="pt-6 lg:hidden">
                            <button
                                type="submit"
                                disabled={!isFormValid()}
                                className={`w-full py-5 font-bold text-lg uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${isFormValid()
                                    ? 'bg-danholt-teal text-white hover:bg-danholt-teal/90 shadow-lg'
                                    : 'bg-white/10 text-white/30 cursor-not-allowed'
                                    }`}
                            >
                                Confirm Booking
                            </button>
                            <p className="text-center text-white/40 text-sm mt-4">
                                No credit card required to book now.
                            </p>
                        </div>

                    </form>
                </div>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-1">
                <div className="sticky top-32 space-y-6">
                    {/* Room Summary Card */}
                    <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
                        {selectedRoom && (
                            <>
                                <div className="relative h-48">
                                    <Image
                                        src={selectedRoom.image}
                                        alt={selectedRoom.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                        <h3 className="text-white font-serif text-xl">{selectedRoom.name}</h3>
                                    </div>
                                </div>
                                <div className="p-6 bg-white text-danholt-navy">
                                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-widest">Price per night</p>
                                            <p className="font-bold text-lg">{selectedRoom.priceDisplay}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500 uppercase tracking-widest">Details</p>
                                            <p className="font-medium text-sm">{selectedRoom.guests} Guests • {selectedRoom.size}m²</p>
                                        </div>
                                    </div>

                                    {/* Cost Breakdown */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Nights</span>
                                            <span className="font-medium">{stats.nights}</span>
                                        </div>
                                        {formData.addons.length > 0 && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Add-ons</span>
                                                <span className="font-medium">
                                                    +₦{formData.addons.reduce((acc, id) => {
                                                        const addon = ADDONS.find(a => a.id === id)
                                                        return acc + (addon ? addon.price : 0)
                                                    }, 0).toLocaleString()}
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-base font-bold text-danholt-navy pt-3 border-t border-gray-100">
                                            <span>Total</span>
                                            <span>₦{stats.total.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    {/* Desktop Submit Button */}
                                    <button
                                        onClick={handleSubmit}
                                        disabled={!isFormValid()}
                                        className={`hidden lg:flex w-full py-4 font-bold uppercase tracking-widest rounded-lg items-center justify-center gap-2 transition-all duration-300 ${isFormValid()
                                            ? 'bg-danholt-teal text-white hover:bg-danholt-teal/90 shadow-lg'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        Confirm Booking
                                    </button>
                                    <p className="text-center text-gray-400 text-xs mt-3 hidden lg:block">
                                        Payment collected upon arrival.
                                    </p>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Support Card */}
                    <div className="bg-danholt-navy border border-white/10 rounded-lg p-6 text-center">
                        <Phone className="w-8 h-8 text-danholt-gold mx-auto mb-3" />
                        <h4 className="text-white font-serif mb-2">Need Assistance?</h4>
                        <p className="text-white/60 text-sm mb-4">Our concierge team is available 24/7 to help with your reservation.</p>
                        <a href="tel:+2348000000000" className="text-danholt-gold font-bold hover:underline">
                            +234 800 000 0000
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function BookingPage() {
    return (
        <div className="min-h-screen bg-danholt-navy pt-32 pb-20">
            {/* Back Navigation */}
            <div className="max-w-[1400px] mx-auto px-6 mb-2">
                <Link href="/rooms" className="inline-flex items-center gap-2 text-white/60 hover:text-danholt-gold transition-colors group">
                    <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                        <ArrowLeft size={20} />
                    </div>
                    <span className="text-sm uppercase tracking-widest font-bold">Back to Rooms</span>
                </Link>
            </div>

            {/* Hero Header */}
            <section className="relative px-6 md:px-12 mb-12 max-w-[1400px] mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-danholt-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">
                        RESERVATIONS
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">
                        Complete Your Booking
                    </h1>
                </motion.div>
            </section>

            {/* Booking Form Container */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-[1400px] mx-auto px-6"
            >
                <Suspense fallback={<div className="text-white text-center">Loading booking details...</div>}>
                    <BookingForm />
                </Suspense>
            </motion.div>
        </div>
    )
}
