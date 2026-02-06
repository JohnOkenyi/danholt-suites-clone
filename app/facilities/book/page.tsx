'use client'

import { motion } from 'framer-motion'
import { Calendar, Users, Mail, Phone, User, ChevronDown, AlignLeft, ArrowLeft } from 'lucide-react'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useFormState } from 'react-dom'
import { createFacilityBooking } from '@/app/actions/bookings'
import Image from 'next/image'
import Link from 'next/link'

const FACILITIES = [
    { id: 'Conference Hall', name: 'Conference Hall' },
    { id: 'Sports Facilities', name: 'Sports Facilities' },
    { id: 'Swimming Pool', name: 'Swimming Pool' },
    { id: 'Children\'s Playground', name: 'Children\'s Playground' },
    { id: 'Other', name: 'Other / Custom Event' }
]

const EVENT_TYPES = [
    'Conference / Seminar',
    'Wedding / Reception',
    'Private Party',
    'Sports Tournament',
    'Team Building',
    'Other'
]

function FacilityBookingForm() {
    const searchParams = useSearchParams()
    const initialFacility = searchParams.get('facility')

    const [formData, setFormData] = useState({
        facility: initialFacility || 'Conference Hall',
        eventType: 'Conference / Seminar',
        date: '',
        attendees: '',
        name: '',
        email: '',
        phone: '',
        details: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const isFormValid = () => {
        return (
            formData.date !== '' &&
            formData.attendees !== '' &&
            formData.name !== '' &&
            formData.email !== '' &&
            formData.phone !== ''
        )
    }

    const [state, formAction] = useFormState(createFacilityBooking, { message: '', error: '' })

    // Show alerts based on state
    useEffect(() => {
        if (state?.success) {
            alert(state.message)
            // Optional: Redirect or clear form
        } else if (state?.error) {
            alert(state.error)
        }
    }, [state])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // We need to construct FormData manually because the form input names match our state but we used controlled inputs
        // actually useFormState works with the form action directly if inputs have names.
        // We will switch the form to use `action={formAction}` and keep controlled inputs for validation if needed, 
        // OR just use the action. 
        // For simplicity with existing validation logic, we can trigger the action programmatically or bind it.
        // But `useFormState` expects the form action to be triggered.
        // We will just change the <form> tag.
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form Column */}
            <div className="lg:col-span-2">
                <div className="glass-panel-luxury p-8 md:p-12 rounded-2xl border border-white/5 relative overflow-hidden bg-white/5 backdrop-blur-sm">
                    {/* Decorative Glow */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-danholt-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <form action={formAction} className="relative z-10 space-y-12">

                        {/* Step 1: Event Details */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-serif text-white border-b border-white/10 pb-4 flex items-center gap-3">
                                <span className="bg-danholt-gold text-danholt-navy w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                                Event Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Facility Selection */}
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-danholt-gold font-bold">Facility</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-white/40 group-focus-within:text-danholt-gold">
                                            <AlignLeft size={18} />
                                        </div>
                                        <select
                                            name="facility"
                                            value={formData.facility}
                                            onChange={handleInputChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-12 pr-12 text-white focus:outline-none focus:border-danholt-gold/50 focus:bg-white/10 transition-all font-sans appearance-none cursor-pointer"
                                        >
                                            {FACILITIES.map(f => (
                                                <option key={f.id} value={f.id} className="bg-danholt-navy text-white">{f.name}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Event Type */}
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-danholt-gold font-bold">Event Type</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-white/40 group-focus-within:text-danholt-gold">
                                            <AlignLeft size={18} />
                                        </div>
                                        <select
                                            name="eventType"
                                            value={formData.eventType}
                                            onChange={handleInputChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-12 pr-12 text-white focus:outline-none focus:border-danholt-gold/50 focus:bg-white/10 transition-all font-sans appearance-none cursor-pointer"
                                        >
                                            {EVENT_TYPES.map(type => (
                                                <option key={type} value={type} className="bg-danholt-navy text-white">{type}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Date */}
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-danholt-gold font-bold">Preferred Date</label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-danholt-gold transition-colors" />
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white focus:outline-none focus:border-danholt-gold/50 focus:bg-white/10 transition-all font-sans cursor-pointer"
                                        />
                                    </div>
                                </div>

                                {/* Attendees */}
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-danholt-gold font-bold">Expected Attendees</label>
                                    <div className="relative group">
                                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-danholt-gold transition-colors" />
                                        <input
                                            type="number"
                                            name="attendees"
                                            placeholder="e.g. 50"
                                            value={formData.attendees}
                                            onChange={handleInputChange}
                                            required
                                            min="1"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-danholt-gold/50 focus:bg-white/10 transition-all font-sans"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 2: Contact Information */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-serif text-white border-b border-white/10 pb-4 flex items-center gap-3">
                                <span className="bg-danholt-gold text-danholt-navy w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                                Contact Information
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
                        </div>

                        {/* Step 3: Specific Requirements */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-serif text-white border-b border-white/10 pb-4 flex items-center gap-3">
                                <span className="bg-danholt-gold text-danholt-navy w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                                Details & Requirements
                            </h2>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-danholt-gold font-bold">Tell us more about your event</label>
                                <textarea
                                    name="details"
                                    rows={6}
                                    placeholder="Please describe your specific needs (e.g., catering, A/V equipment, seating arrangement, special requests)..."
                                    value={formData.details}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-4 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-danholt-gold/50 focus:bg-white/10 transition-all font-sans resize-none"
                                ></textarea>
                            </div>
                        </div>

                        {/* Step 4: Payment Information */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-serif text-white border-b border-white/10 pb-4 flex items-center gap-3">
                                <span className="bg-danholt-gold text-danholt-navy w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                                Payment Information
                            </h2>

                            <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8">
                                <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-6">
                                    <span className="text-white/60">Estimated Cost</span>
                                    <span className="text-2xl font-serif text-danholt-gold font-bold">
                                        {formData.facility === 'Swimming Pool' ? '₦2,000' :
                                            formData.facility === 'Sports Facilities' ? '₦1,500' :
                                                'Custom Quote'}
                                    </span>
                                </div>

                                <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Payment Details (Moniepoint)</h3>
                                <div className="space-y-3 font-mono text-sm bg-black/20 p-4 rounded-lg">
                                    <div className="flex justify-between">
                                        <span className="text-white/40">Bank Name:</span>
                                        <span className="text-white">Moniepoint</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white/40">Account Name:</span>
                                        <span className="text-white">Danholt Suites Ltd</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white/40">Account Number:</span>
                                        <span className="text-danholt-gold font-bold text-lg">6564614352</span>
                                    </div>
                                </div>
                                <p className="text-xs text-white/40 mt-4 text-center">
                                    Please verify the account name before making any transfer.
                                    Use your name as the payment reference.
                                </p>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={!isFormValid()}
                                className={`w-full py-5 font-bold text-lg uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${isFormValid()
                                    ? 'bg-danholt-teal text-white hover:bg-danholt-teal/90 shadow-lg'
                                    : 'bg-white/10 text-white/30 cursor-not-allowed'
                                    }`}
                            >
                                Submit Inquiry
                            </button>
                            <p className="text-center text-white/40 text-sm mt-4">
                                Our team will review your request and contact you within 24 hours.
                            </p>
                        </div>

                    </form>
                </div>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-1">
                <div className="sticky top-32 space-y-6">
                    {/* Info Card */}
                    <div className="bg-white rounded-lg overflow-hidden shadow-2xl p-6 text-danholt-navy">
                        <h3 className="text-xl font-serif mb-4 pb-4 border-b border-gray-100">Why Host with Us?</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-danholt-gold mt-2 flex-shrink-0" />
                                <span className="text-gray-600">State-of-the-art audio visual equipment custom tailored to your needs.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-danholt-gold mt-2 flex-shrink-0" />
                                <span className="text-gray-600">Dedicated events team to manage every detail from start to finish.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-danholt-gold mt-2 flex-shrink-0" />
                                <span className="text-gray-600">World-class catering options from our gourmet kitchen.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-danholt-gold mt-2 flex-shrink-0" />
                                <span className="text-gray-600">Secure and private environment for high-profile gatherings.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Support Card */}
                    <div className="bg-danholt-navy border border-white/10 rounded-lg p-6 text-center">
                        <Phone className="w-8 h-8 text-danholt-gold mx-auto mb-3" />
                        <h4 className="text-white font-serif mb-2">Events Team</h4>
                        <p className="text-white/60 text-sm mb-4">Direct line for urgent inquiries.</p>
                        <a href="tel:+2348000000000" className="text-danholt-gold font-bold hover:underline">
                            +234 800 000 0000
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function FacilityBookingPage() {
    return (
        <div className="min-h-screen bg-danholt-navy pt-32 pb-20">
            {/* Back Navigation */}
            <div className="max-w-[1400px] mx-auto px-6 mb-2">
                <Link href="/facilities" className="inline-flex items-center gap-2 text-white/60 hover:text-danholt-gold transition-colors group">
                    <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                        <ArrowLeft size={20} />
                    </div>
                    <span className="text-sm uppercase tracking-widest font-bold">Back to Facilities</span>
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
                        Event Booking
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">
                        Reserve a Facility
                    </h1>
                    <p className="text-white/60 max-w-xl mx-auto text-lg font-light leading-relaxed">
                        Host your next event with Danholt Suites. Fill out the details below and we&apos;ll get back to you with a tailored quote.
                    </p>
                </motion.div>
            </section>

            {/* Form Container */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-[1400px] mx-auto px-6"
            >
                <Suspense fallback={<div className="text-white text-center">Loading form...</div>}>
                    <FacilityBookingForm />
                </Suspense>
            </motion.div>
        </div>
    )
}
