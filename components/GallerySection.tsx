'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import AnimatedText from './AnimatedText'

const galleryImages = [
    '/images/room-standard.jpg',
    '/images/feature-pool.jpg',
    '/images/gallery-1.jpg',
    '/images/gallery-2.jpg',
    '/images/gallery-3.jpg',
    '/images/gallery-4.jpg',
    '/images/room-deluxe.jpg',
    '/images/hero-slide-3.jpg',
]

export default function GallerySection() {
    return (
        <section className="py-48 bg-danholt-navy relative overflow-hidden text-center">
            <div className="max-w-[1800px] mx-auto px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mb-32 flex flex-col items-center"
                >
                    <span className="text-danholt-gold text-[10px] font-bold uppercase tracking-[1em] mb-12 block">
                        Visual // Database
                    </span>
                    <AnimatedText
                        text="Curated Moments."
                        className="text-6xl md:text-8xl font-bold text-white tracking-tighter leading-[0.9]"
                    />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {galleryImages.map((src, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05, duration: 0.8 }}
                            className={`relative overflow-hidden group cursor-none ${index === 0 || index === 5 ? 'md:col-span-2 md:row-span-2 aspect-square' : 'aspect-square'}`}
                        >
                            {/* Custom Circular Cursor Element inside item */}
                            <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                <div className="w-16 h-16 rounded-full border border-danholt-gold/40 flex items-center justify-center backdrop-blur-sm">
                                    <span className="text-[8px] font-bold text-danholt-gold">VIEW</span>
                                </div>
                            </div>

                            <div className="w-full h-full relative overflow-hidden glass-panel border border-white/5">
                                <Image
                                    src={src}
                                    alt={`Gallery image ${index + 1}`}
                                    fill
                                    className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110"
                                />

                                {/* HUD Corners for images */}
                                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20 group-hover:border-danholt-blue transition-colors" />
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20 group-hover:border-danholt-gold transition-colors" />

                                {/* Bottom-left index label */}
                                <div className="absolute bottom-4 left-4 font-mono text-[8px] text-white/20 group-hover:text-white/60 transition-colors">
                                    [IMG_0{index + 1}]
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Texture Overlay */}
            <div className="absolute inset-0 z-0 bg-digital-grid opacity-[0.05] pointer-events-none" />
        </section>
    )
}
