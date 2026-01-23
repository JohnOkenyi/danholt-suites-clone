'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check } from 'lucide-react'

interface MembershipModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialTier?: string;
}

export default function MembershipModal({ isOpen, onClose, initialTier = 'Bronze' }: MembershipModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        tier: initialTier,
        contactMethod: 'email'
    })
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Simulate API call
        setTimeout(() => {
            setIsSubmitted(true)
        }, 1000)
    }

    const handleClose = () => {
        setIsSubmitted(false)
        setFormData({
            name: '',
            email: '',
            phone: '',
            tier: initialTier,
            contactMethod: 'email'
        })
        onClose()
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-danholt-midnight border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                    >
                        {/* Decorative Gradient */}
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-danholt-gold to-transparent" />

                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-8 md:p-10">
                            {!isSubmitted ? (
                                <>
                                    <h2 className="text-2xl font-serif text-white mb-2">Join Privilege Club</h2>
                                    <p className="text-white/60 text-sm mb-8">
                                        Fill in your details below. Our team will contact you shortly to complete your membership.
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-widest text-danholt-gold font-bold">Full Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-danholt-gold/50 transition-colors"
                                                placeholder="John Doe"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-widest text-danholt-gold font-bold">Email Address</label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-danholt-gold/50 transition-colors"
                                                placeholder="john@example.com"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-widest text-danholt-gold font-bold">Phone Number</label>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-danholt-gold/50 transition-colors"
                                                placeholder="+234..."
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs uppercase tracking-widest text-danholt-gold font-bold">Preferred Tier</label>
                                                <select
                                                    value={formData.tier}
                                                    onChange={e => setFormData({ ...formData, tier: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-danholt-gold/50 transition-colors appearance-none cursor-pointer"
                                                >
                                                    <option value="Bronze" className="bg-danholt-midnight">Bronze</option>
                                                    <option value="Silver" className="bg-danholt-midnight">Silver</option>
                                                    <option value="Gold" className="bg-danholt-midnight">Gold</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs uppercase tracking-widest text-danholt-gold font-bold">Contact Via</label>
                                                <select
                                                    value={formData.contactMethod}
                                                    onChange={e => setFormData({ ...formData, contactMethod: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-danholt-gold/50 transition-colors appearance-none cursor-pointer"
                                                >
                                                    <option value="email" className="bg-danholt-midnight">Email</option>
                                                    <option value="whatsapp" className="bg-danholt-midnight">WhatsApp</option>
                                                    <option value="phone" className="bg-danholt-midnight">Phone Call</option>
                                                </select>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full py-4 bg-danholt-gold text-danholt-midnight font-bold uppercase tracking-widest rounded-lg hover:bg-white transition-colors duration-300"
                                        >
                                            Request Membership
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div className="text-center py-10">
                                    <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Check size={32} />
                                    </div>
                                    <h3 className="text-2xl font-serif text-white mb-4">Request Received</h3>
                                    <p className="text-white/60 mb-8">
                                        Thank you, {formData.name}. Our team will reach out to you via {formData.contactMethod} shortly to finalize your {formData.tier} membership.
                                    </p>
                                    <button
                                        onClick={handleClose}
                                        className="px-8 py-3 border border-white/20 text-white hover:bg-white hover:text-danholt-midnight transition-all rounded-lg uppercase tracking-widest text-sm font-bold"
                                    >
                                        Close
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
