'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Bed, Utensils, Calendar, Car } from 'lucide-react'
import Image from 'next/image'
import AnimatedText from './AnimatedText'

const services = [
    {
        icon: Bed,
        title: 'Luxury Accommodation',
        description: 'Experience comfort redefined in our thoughtfully designed suites equipped with modern amenities.',
        image: '/images/room-deluxe.jpg'
    },
    {
        icon: Utensils,
        title: 'Exquisite Dining',
        description: 'Savor world-class culinary delights prepared by our expert chefs in a serene ambiance.',
        image: '/images/feature-dining.jpg'
    },
    {
        icon: Calendar,
        title: 'Event Hosting',
        description: 'From intimate gatherings to grand celebrations, our venues set the perfect stage for your events.',
        image: '/images/hero-slide-3.jpg'
    },
    {
        icon: Car,
        title: 'Chauffeur Service',
        description: 'Travel in style with our premium chauffeur services, ensuring seamless city transfers.',
        image: '/images/hero-slide-1.jpg'
    }
]

export default function ServiceShowcase() {
    return (
        <section className="py-48 bg-danholt-navy relative overflow-hidden">
            <div className="max-w-[1800px] mx-auto px-12 relative z-10">
                <div className="mb-32 flex flex-col items-center text-center">
                    <span className="text-danholt-gold text-[10px] font-bold uppercase tracking-[0.8em] mb-8">
                        Operational // Excellence
                    </span>
                    <AnimatedText
                        text="Curating Human Experience."
                        className="text-6xl md:text-8xl font-bold text-white tracking-tighter leading-[0.9] max-w-4xl"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="group relative"
                        >
                            {/* Glassmorphic Card */}
                            <div className="glass-panel p-12 lg:p-16 h-full flex flex-col transition-all duration-700 group-hover:bg-danholt-blue/5 group-hover:border-danholt-blue/40">
                                {/* HUD Corner Decorations */}
                                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/10 group-hover:border-danholt-blue transition-colors" />
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/10 group-hover:border-danholt-gold transition-colors" />

                                <div className="flex justify-between items-start mb-12">
                                    <div className="w-16 h-16 rounded-full glass-panel flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform duration-500">
                                        <service.icon className="w-6 h-6 text-danholt-blue group-hover:text-danholt-gold transition-colors" />
                                    </div>
                                    <span className="text-[10px] font-mono text-white/20 tracking-widest mt-4">
                                        REF_0{index + 1}
                                    </span>
                                </div>

                                <div className="relative aspect-square mb-12 overflow-hidden rounded-xl border border-white/5">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-active:grayscale-0 group-active:opacity-100 transition-all duration-300 group-hover:scale-110"
                                    />
                                    {/* Scanner Effect Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-danholt-navy to-transparent opacity-60" />
                                    <div className="absolute inset-x-0 top-0 h-[100%] bg-danholt-blue/10 scanline opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>

                                <h3 className="text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-danholt-blue transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-white/40 text-[15px] leading-relaxed mb-12 font-sans flex-grow">
                                    {service.description}
                                </p>

                                <button className="flex items-center gap-3 text-danholt-gold text-[10px] font-bold uppercase tracking-[0.4em] hover:text-white transition-colors group/btn">
                                    <span>Initialize Experience</span>
                                    <motion.span
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        →
                                    </motion.span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Texture Overlay */}
            <div className="absolute inset-0 z-0 bg-digital-grid opacity-[0.1] pointer-events-none" />
        </section>
    )
}
