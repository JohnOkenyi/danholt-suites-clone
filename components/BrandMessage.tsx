'use client'

import React from 'react'
import { motion } from 'framer-motion'
import AnimatedText from './AnimatedText'

export default function BrandMessage() {
    return (
        <section className="py-48 bg-danholt-navy relative flex items-center justify-center overflow-hidden">
            <div className="max-w-6xl mx-auto px-12 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                    className="glass-panel p-24 relative"
                >
                    {/* HUD Metadata Overlay */}
                    <div className="absolute top-8 left-8 flex gap-4 opacity-20">
                        <span className="text-[8px] font-mono tracking-widest">[ AUTH_SYST ]</span>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <AnimatedText
                            text="The next evolution of hospitality, where luxury becomes personal."
                            className="text-3xl md:text-5xl font-bold text-white leading-relaxed tracking-tight mb-12 italic"
                        />

                        <div className="flex justify-center items-center gap-8">
                            <div className="w-12 h-[1px] bg-danholt-gold/40" />
                            <span className="text-danholt-gold text-[10px] font-bold uppercase tracking-[0.5em]">Synchronized // Presence</span>
                            <div className="w-12 h-[1px] bg-danholt-gold/40" />
                        </div>
                    </div>

                    {/* L-Shaped Corner Marker */}
                    <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-danholt-blue/40" />
                </motion.div>
            </div>

            {/* Background Texture Overlay */}
            <div className="absolute inset-0 z-0 bg-digital-grid opacity-[0.05] pointer-events-none" />
        </section>
    )
}
