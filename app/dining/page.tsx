'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, ArrowRight, Leaf } from 'lucide-react'
import { TabButton } from '@/components/ui/TabButton'

// Menu Data
import { MENU_CATEGORIES, MENU_ITEMS } from './data'

export default function DiningPage() {
    const [activeCategory, setActiveCategory] = useState("Main Dishes & Sides");

    return (
        <main className="min-h-screen bg-danholt-midnight text-white selection:bg-danholt-gold selection:text-danholt-midnight">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/nigerian-dish.png"
                        // Note: Using Jollof Rice image as requested for "The Danholt Kitchen" background.
                        alt="The Danholt Kitchen"
                        fill
                        className="object-cover opacity-50"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-danholt-midnight/80 via-danholt-midnight/40 to-danholt-midnight" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block text-danholt-gold text-sm font-bold tracking-[0.3em] uppercase mb-6 border border-danholt-gold/30 px-6 py-2 rounded-full backdrop-blur-sm bg-danholt-midnight/30 md:mt-32"
                    >
                        Fine Dining
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 tracking-tight"
                    >
                        The Danholt Kitchen
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-white/80 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-10"
                    >
                        Delicious Nigerian cuisines from our restaurant and exotic drinks from our bar. Experience authentic Nigerian flavors in a serene atmosphere.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link href="/dining/reserve" className="group w-full sm:w-auto">
                            <button className="w-full sm:w-auto px-8 py-4 bg-danholt-midnight border border-white/20 text-white rounded-full flex items-center justify-center gap-3 hover:bg-white/10 transition-all duration-300">
                                <Calendar className="w-5 h-5 text-danholt-gold" />
                                <span className="uppercase tracking-widest text-sm font-bold">Reserve a Table</span>
                            </button>
                        </Link>

                        <Link href="/dining/pre-order" className="group w-full sm:w-auto">
                            <button className="w-full sm:w-auto px-8 py-4 bg-white text-danholt-midnight rounded-full flex items-center justify-center gap-3 hover:bg-danholt-gold transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] md:shadow-none hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                                <span className="uppercase tracking-widest text-sm font-bold">Pre-order Food</span>
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Menu Section */}
            <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {MENU_CATEGORIES.map((category) => (
                        <TabButton
                            key={category}
                            label={category}
                            isActive={activeCategory === category}
                            onClick={() => setActiveCategory(category)}
                        />
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-12"
                    >
                        {MENU_ITEMS[activeCategory as keyof typeof MENU_ITEMS].map((item, index) => (
                            <div key={index} className="group relative bg-white/5 border border-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 hover:border-danholt-gold/30">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl md:text-2xl font-serif text-danholt-cold-white group-hover:text-danholt-gold transition-colors">
                                        {item.name}
                                    </h3>
                                    <span className="text-xl font-bold text-danholt-gold font-serif">
                                        ₦{item.price.toLocaleString()}
                                    </span>
                                </div>

                                <div className="w-12 h-[1px] bg-white/20 my-4 group-hover:w-full group-hover:bg-danholt-gold/50 transition-all duration-700" />

                                <p className="text-white/60 font-light leading-relaxed mb-4">
                                    {item.description}
                                </p>

                                {item.isVeg && (
                                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" title="Vegetarian / Special Item">
                                        <Leaf className="w-5 h-5 text-teal-400" />
                                    </div>
                                )}

                                {/* Leaf icon also shown statically next to description or name if desired, 
                                    but design requested "Leaf icon for vegetarian/special items".
                                    I'll add it visibly next to the name for better visibility as per common menu designs. 
                                */}
                                {item.isVeg && (
                                    <div className="flex items-center gap-2 mt-2">
                                        <Leaf className="w-4 h-4 text-teal-400" />
                                        <span className="text-xs text-teal-400 uppercase tracking-wider font-semibold">Vegetarian Friendly</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </section>
        </main>
    )
}
