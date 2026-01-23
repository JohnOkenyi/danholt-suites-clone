'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Plus, Minus, Check, ChevronRight } from 'lucide-react'
import { MENU_CATEGORIES, MENU_ITEMS } from '../data'
import { TabButton } from '@/components/ui/TabButton'

// Reusing types from Reservation page or defining locally for simplicity
// In real app, would share these types.
type CartItem = {
    name: string;
    price: number;
    quantity: number;
}

export default function PreOrderPage() {
    const [step, setStep] = useState<1 | 2>(1)
    const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0])
    const [cart, setCart] = useState<Record<string, CartItem>>({})

    // Step 2 Form State
    const [guestType, setGuestType] = useState<'hotel' | 'external'>('hotel')
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        roomNumber: '',
        partySize: '2 Guests',
        date: '',
        time: ''
    })

    const addToCart = (item: { name: string, price: number }) => {
        setCart(prev => {
            const currentQty = prev[item.name]?.quantity || 0;
            return {
                ...prev,
                [item.name]: { ...item, quantity: currentQty + 1 }
            }
        })
    }

    const removeFromCart = (itemName: string) => {
        setCart(prev => {
            const currentQty = prev[itemName]?.quantity || 0;
            if (currentQty <= 1) {
                const newCart = { ...prev };
                delete newCart[itemName];
                return newCart;
            }
            return {
                ...prev,
                [itemName]: { ...prev[itemName], quantity: currentQty - 1 }
            }
        })
    }

    const getCartTotal = () => {
        return Object.values(cart).reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <main className="min-h-screen bg-danholt-midnight text-white pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex items-center justify-between">
                    <Link href="/dining" className="inline-flex items-center text-white/50 hover:text-danholt-gold transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Menu
                    </Link>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content Area */}
                    <div className="flex-1">
                        {/* Header & Steps */}
                        <div className="mb-12">
                            <span className="text-danholt-gold text-xs font-bold uppercase tracking-[0.2em] mb-2 block">
                                Pre-order
                            </span>
                            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">
                                {step === 1 ? 'Order Ahead' : 'Checkout'}
                            </h1>
                            <p className="text-white/60 font-light mb-8">
                                {step === 1
                                    ? 'Select your dishes in advance for a seamless dining experience'
                                    : 'Complete your reservation details'
                                }
                            </p>

                            {/* Progress Indicator */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300 ${step >= 1 ? 'border-danholt-gold bg-danholt-gold text-danholt-midnight' : 'border-white/20 text-white/50'}`}>1</div>
                                <div className={`h-[2px] w-12 transition-colors duration-300 ${step >= 2 ? 'bg-danholt-gold' : 'bg-white/10'}`} />
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300 ${step >= 2 ? 'border-danholt-gold bg-danholt-gold text-danholt-midnight' : 'border-white/20 text-white/50'}`}>2</div>
                            </div>
                        </div>

                        {step === 1 ? (
                            /* STEP 1: MENU SELECTION */
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                {/* Categories */}
                                <div className="flex flex-wrap gap-4 mb-8">
                                    {MENU_CATEGORIES.map(cat => (
                                        <TabButton
                                            key={cat}
                                            label={cat}
                                            isActive={activeCategory === cat}
                                            onClick={() => setActiveCategory(cat)}
                                        />
                                    ))}
                                </div>

                                {/* Items Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {MENU_ITEMS[activeCategory].map((item, i) => {
                                        const qty = cart[item.name]?.quantity || 0;
                                        return (
                                            <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:border-danholt-gold/30 transition-all group">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                                                        <p className="text-danholt-gold font-bold">₦{item.price.toLocaleString()}</p>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-white/60 mb-6 line-clamp-2">{item.description}</p>

                                                {qty === 0 ? (
                                                    <button
                                                        onClick={() => addToCart(item)}
                                                        className="w-full py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors uppercase text-xs tracking-wider"
                                                    >
                                                        Add to Order
                                                    </button>
                                                ) : (
                                                    <div className="flex items-center justify-between bg-danholt-gold/10 rounded-lg p-1 border border-danholt-gold/30">
                                                        <button
                                                            onClick={() => removeFromCart(item.name)}
                                                            className="w-8 h-8 flex items-center justify-center bg-danholt-midnight/50 hover:bg-danholt-midnight text-white rounded-md transition-colors"
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <span className="font-bold text-danholt-gold">{qty}</span>
                                                        <button
                                                            onClick={() => addToCart(item)}
                                                            className="w-8 h-8 flex items-center justify-center bg-danholt-gold text-danholt-midnight rounded-md hover:bg-white transition-colors"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            </motion.div>
                        ) : (
                            /* STEP 2: CHECKOUT FORM */
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white text-danholt-midnight rounded-2xl p-8"
                            >
                                <h3 className="text-xl font-bold mb-6 upercase tracking-wider border-b pb-4">Guest Details</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <label className={`flex items-center p-4 border rounded-xl cursor-pointer ${guestType === 'hotel' ? 'border-danholt-gold bg-danholt-gold/5' : ''}`}>
                                        <input type="radio" name="guestType" checked={guestType === 'hotel'} onChange={() => setGuestType('hotel')} className="sr-only" />
                                        <div className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${guestType === 'hotel' ? 'border-danholt-gold' : 'border-gray-400'}`}>
                                            {guestType === 'hotel' && <div className="w-2 h-2 bg-danholt-gold rounded-full" />}
                                        </div>
                                        <span className="font-bold">Hotel Guest</span>
                                    </label>
                                    <label className={`flex items-center p-4 border rounded-xl cursor-pointer ${guestType === 'external' ? 'border-danholt-gold bg-danholt-gold/5' : ''}`}>
                                        <input type="radio" name="guestType" checked={guestType === 'external'} onChange={() => setGuestType('external')} className="sr-only" />
                                        <div className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${guestType === 'external' ? 'border-danholt-gold' : 'border-gray-400'}`}>
                                            {guestType === 'external' && <div className="w-2 h-2 bg-danholt-gold rounded-full" />}
                                        </div>
                                        <span className="font-bold">External Guest</span>
                                    </label>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-0">
                                    <input placeholder="Full Name" name="fullName" value={formData.fullName} onChange={handleFormChange} className="w-full p-3 bg-gray-50 border rounded-lg focus:border-danholt-gold focus:outline-none" required />
                                    <input placeholder="Email" name="email" value={formData.email} onChange={handleFormChange} className="w-full p-3 bg-gray-50 border rounded-lg focus:border-danholt-gold focus:outline-none" required />
                                    <input placeholder="Phone" name="phone" value={formData.phone} onChange={handleFormChange} className="w-full p-3 bg-gray-50 border rounded-lg focus:border-danholt-gold focus:outline-none" />
                                    {guestType === 'hotel' && (
                                        <input placeholder="Room Number" name="roomNumber" value={formData.roomNumber} onChange={handleFormChange} className="w-full p-3 bg-gray-50 border rounded-lg focus:border-danholt-gold focus:outline-none" />
                                    )}
                                    <select name="partySize" value={formData.partySize} onChange={handleFormChange} className="w-full p-3 bg-gray-50 border rounded-lg focus:border-danholt-gold focus:outline-none">
                                        {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={`${n} Guests`}>{n} Guests</option>)}
                                    </select>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input type="date" name="date" value={formData.date} onChange={handleFormChange} className="w-full p-3 bg-gray-50 border rounded-lg focus:border-danholt-gold focus:outline-none text-sm" />
                                        <select name="time" value={formData.time} onChange={handleFormChange} className="w-full p-3 bg-gray-50 border rounded-lg focus:border-danholt-gold focus:outline-none">
                                            <option value="">Time</option>
                                            <option value="18:00">18:00</option>
                                            <option value="19:00">19:00</option>
                                            <option value="20:00">20:00</option>
                                        </select>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-96">
                        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 sticky top-24">
                            <h3 className="text-xl font-serif font-bold mb-6 pb-4 border-b border-white/10">Order Summary</h3>

                            {Object.keys(cart).length === 0 ? (
                                <p className="text-white/40 text-center py-8">Your cart is empty</p>
                            ) : (
                                <div className="space-y-4 mb-8">
                                    {Object.values(cart).map((item, i) => (
                                        <div key={i} className="flex justify-between text-sm">
                                            <span className="text-white/80">{item.quantity}× {item.name}</span>
                                            <span className="text-white font-bold">₦{(item.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    ))}
                                    <div className="border-t border-white/10 pt-4 mt-4 flex justify-between text-lg font-bold text-danholt-gold">
                                        <span>Total</span>
                                        <span>₦{getCartTotal().toLocaleString()}</span>
                                    </div>
                                </div>
                            )}

                            {step === 1 ? (
                                <button
                                    onClick={() => setStep(2)}
                                    disabled={Object.keys(cart).length === 0}
                                    className="w-full py-4 bg-danholt-gold text-danholt-midnight font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    Continue to Details
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            ) : (
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="flex-1 py-4 border border-white/20 text-white font-bold uppercase tracking-widest rounded-xl hover:bg-white/5 transition-colors text-xs"
                                    >
                                        Back
                                    </button>
                                    <button
                                        className="flex-[2] py-4 bg-danholt-gold text-danholt-midnight font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-colors text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                                        onClick={() => alert("Order Confirmed! (Demo)")}
                                        disabled={
                                            !formData.fullName ||
                                            !formData.email ||
                                            !formData.partySize ||
                                            !formData.date ||
                                            !formData.time ||
                                            (guestType === 'hotel' && !formData.roomNumber)
                                        }
                                    >
                                        Confirm Order
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
