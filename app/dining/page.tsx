'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function DiningPage() {
    return (
        <main className="bg-black min-h-screen text-white">
            {/* Hero */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/feature-dining.jpg"
                        alt="Dining Hero"
                        fill
                        className="object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-center px-6"
                >
                    <span className="text-danholt-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">
                        Gastronomy
                    </span>
                    <h1 className="text-5xl md:text-8xl font-serif text-white mb-6">
                        Culinary Creations
                    </h1>
                    <p className="text-white/70 max-w-xl mx-auto text-lg font-light leading-relaxed italic">
                        &quot;Where every flavor tells a story.&quot;
                    </p>
                </motion.div>
            </section>

            {/* Menu Highlights */}
            <section className="py-32 px-6 md:px-12 max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl font-serif text-white mb-8">The Ambiance</h2>
                        <p className="text-white/60 leading-loose mb-8">
                            Dine in an atmosphere of refined elegance. Our restaurant blends contemporary design with warm lighting to create the perfect setting for intimate dinners or business lunches.
                        </p>
                        <p className="text-white/60 leading-loose">
                            Enjoy a curated selection of wines and spirits from our bar, perfectly paired with your meal by our expert sommelier.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative aspect-square"
                    >
                        <Image
                            src="/images/gallery-2.jpg" // Placeholder for food/interior
                            alt="Restaurant Interior"
                            fill
                            className="object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Chef's Special / Quote */}
            <section className="py-32 bg-white/5 relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <span className="text-danholt-gold text-6xl font-serif block mb-8">&ldquo;</span>
                    <h3 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-12">
                        We believe that food is not just nourishment, but an experience that engages all the senses.
                    </h3>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-1 bg-danholt-gold mb-4" />
                        <span className="text-sm font-bold uppercase tracking-widest text-white/50">Executive Chef</span>
                    </div>
                </div>
            </section>
        </main>
    )
}
