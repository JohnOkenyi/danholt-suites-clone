'use client'

import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check } from 'lucide-react'
import { useFormState, useFormStatus } from 'react-dom'
import { joinPrivilegeClub } from '@/app/actions/bookings'

interface MembershipModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialTier?: string;
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full py-4 bg-danholt-gold text-danholt-midnight font-bold uppercase tracking-widest rounded-lg hover:bg-white transition-colors duration-300 disabled:opacity-70"
        >
            {pending ? "Submitting..." : "Request Membership"}
        </button>
    )
}

export default function MembershipModal({ isOpen, onClose, initialTier = 'Bronze' }: MembershipModalProps) {
    const [state, formAction] = useFormState(joinPrivilegeClub, { message: '', error: '' })

    // We can use the state.success to show the success view
    // But in this modal implementation, we previously had a local `isSubmitted` state.
    // We will sync them.

    useEffect(() => {
        if (!isOpen) {
            // Reset state if possible or just rely on re-mount? 
            // useFormState doesn't reset easily. We'll handle success viz based on state.success
        }
    }, [isOpen])

    const handleClose = () => {
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
                            {!state?.success ? (
                                <>
                                    <h2 className="text-2xl font-serif text-white mb-2">Join Privilege Club</h2>
                                    <p className="text-white/60 text-sm mb-8">
                                        Fill in your details below. Our team will contact you shortly to complete your membership.
                                    </p>

                                    <form action={formAction} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-widest text-danholt-gold font-bold">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                placeholder="John Doe"
                                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-danholt-gold/50 transition-colors"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-widest text-danholt-gold font-bold">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                placeholder="john@example.com"
                                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-danholt-gold/50 transition-colors"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-widest text-danholt-gold font-bold">Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                placeholder="+234..."
                                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-danholt-gold/50 transition-colors"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs uppercase tracking-widest text-danholt-gold font-bold">Preferred Tier</label>
                                                <select
                                                    name="tier"
                                                    defaultValue={initialTier}
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
                                                    name="contactMethod"
                                                    defaultValue="email"
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-danholt-gold/50 transition-colors appearance-none cursor-pointer"
                                                >
                                                    <option value="email" className="bg-danholt-midnight">Email</option>
                                                    <option value="whatsapp" className="bg-danholt-midnight">WhatsApp</option>
                                                    <option value="phone" className="bg-danholt-midnight">Phone Call</option>
                                                </select>
                                            </div>
                                        </div>

                                        <SubmitButton />
                                    </form>
                                </>
                            ) : (
                                <div className="text-center py-10">
                                    <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Check size={32} />
                                    </div>
                                    <h3 className="text-2xl font-serif text-white mb-4">Request Received</h3>
                                    <p className="text-white/60 mb-8">
                                        {state?.message || "Thank you. Our team will reach out to you shortly."}
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
