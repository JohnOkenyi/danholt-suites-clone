'use client'

import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Bed, Utensils, Dumbbell, ShieldCheck, Wifi } from 'lucide-react'


const services = [
    {
        id: 1,
        title: "Luxury Rooms",
        icon: Bed,
        pos: { top: '15%', left: '15%' },
        delay: 0,
        floatingDuration: 6.2
    },
    {
        id: 2,
        title: "Fine Dining",
        icon: Utensils,
        pos: { top: '20%', right: '15%' },
        delay: 1.5,
        floatingDuration: 7.5
    },
    {
        id: 3,
        title: "Fitness",
        icon: Dumbbell,
        pos: { top: '55%', left: '10%' },
        delay: 0.8,
        floatingDuration: 5.8
    },
    {
        id: 4,
        title: "24/7 Security",
        icon: ShieldCheck,
        pos: { top: '65%', right: '10%' },
        delay: 2.2,
        floatingDuration: 6.9
    },
    {
        id: 5,
        title: "High-Speed WiFi",
        icon: Wifi,
        pos: { bottom: '15%', left: '30%' },
        delay: 1.2,
        floatingDuration: 7.1
    }
]

export default function FloatingServicesSection() {
    return (
        <section className="relative min-h-screen py-32 bg-white overflow-hidden flex items-center justify-center">


            {/* Main Center Text */}
            <div className="relative z-20 text-center max-w-4xl mx-auto px-6 pointer-events-none select-none">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-4xl md:text-6xl font-sans font-light text-danholt-navy leading-tight"
                >
                    Where every need is anticipated.
                    <br />
                    <span className="font-serif text-danholt-navy/60">Before you even ask.</span>
                </motion.h2>
            </div>

            {/* Floating Draggable Cards */}
            <div className="absolute inset-0 z-30 pointer-events-none">
                {services.map((service) => (
                    <motion.div
                        key={service.id}
                        className="absolute pointer-events-auto cursor-grab active:cursor-grabbing"
                        style={service.pos}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        drag
                        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                        whileHover={{ scale: 1.05, zIndex: 50 }}
                        animate={{
                            y: [0, -20, 0],
                            x: [0, 10, 0],
                        }}
                        transition={{
                            opacity: { duration: 0.8, delay: service.delay },
                            scale: { duration: 0.8, delay: service.delay },
                            y: {
                                duration: service.floatingDuration,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: service.delay
                            },
                            x: {
                                duration: service.floatingDuration,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: service.delay
                            }
                        }}
                    >
                        <div className="group relative w-32 h-32 md:w-40 md:h-40 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 flex flex-col items-center justify-center gap-4 transition-all duration-500 hover:border-danholt-gold/50 shadow-lg hover:shadow-[0_0_30px_rgba(197,160,89,0.2)]">
                            {/* Shine Effect */}
                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-danholt-gold/10 to-transparent" />

                            <div className="p-3 rounded-full bg-gray-50 group-hover:bg-danholt-gold/20 transition-colors duration-300">
                                <service.icon className="w-6 h-6 md:w-8 md:h-8 text-danholt-gold" />
                            </div>
                            <span className="text-xs md:text-sm text-danholt-navy font-medium text-center px-2">
                                {service.title}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Fade gradients for smooth integration */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
        </section>
    )
}
