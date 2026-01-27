"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { BedDouble, Utensils, Dumbbell, ShieldCheck, Wifi } from 'lucide-react';
import AnimatedText from './AnimatedText';

const services = [
    { id: 1, title: "Luxury Rooms", icon: BedDouble },
    { id: 2, title: "Fine Dining", icon: Utensils },
    { id: 3, title: "Fitness Center", icon: Dumbbell },
    { id: 4, title: "24/7 Security", icon: ShieldCheck },
    { id: 5, title: "Free WiFi", icon: Wifi },
];

export default function AnticipationSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    // Parallax background movement
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    const [isMobile, setIsMobile] = useState(true)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return (
        <section ref={containerRef} className="relative w-full py-24 min-h-[700px] flex items-center justify-center overflow-hidden bg-white">
            {/* Subtle background accents for white theme */}
            {/* Subtle background accents - Optimized with Radial Gradients instead of Blur filters for performance */}
            <motion.div style={{ y: isMobile ? 0 : bgY }} className="absolute inset-0 pointer-events-none opacity-50">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.03),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(229,231,235,0.1),transparent_50%)]" />
            </motion.div>

            {/* Central Typography */}
            <motion.div
                style={isMobile ? {} : { y, opacity }}
                className="relative z-20 text-center max-w-4xl px-4 pointer-events-none flex flex-col items-center"
            >
                <div className="mb-6 flex items-center justify-center gap-3 opacity-80">
                    <div className="h-[1px] w-12 bg-danholt-gold" />
                    <span className="text-danholt-gold text-xs font-serif tracking-[0.3em] uppercase">World Class Service</span>
                    <div className="h-[1px] w-12 bg-danholt-gold" />
                </div>

                <div className="mb-8">
                    <h2 className="text-5xl md:text-7xl font-[200] text-gray-900 tracking-tight leading-tight py-4 drop-shadow-sm flex flex-col items-center gap-2">
                        {isMobile ? (
                            <span className="justify-center flex-wrap text-gray-900 flex">Where Every Need Is</span>
                        ) : (
                            <AnimatedText text="Where Every Need Is" className="justify-center flex-wrap text-gray-900" delay={0.1} />
                        )}

                        {/* Gradient Text for Maximum Pop */}
                        <span className="font-[400] text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#B8860B] to-[#D4AF37]">
                            {isMobile ? (
                                "Anticipated."
                            ) : (
                                <AnimatedText text="Anticipated." className="justify-center text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#B8860B] to-[#D4AF37]" delay={0.5} />
                            )}
                        </span>
                    </h2>
                </div>

                <p className="text-xl md:text-2xl font-[300] text-gray-500 tracking-widest uppercase letter-spacing-[0.15em] font-sans mb-16">
                    Before you even ask
                </p>

                {/* Mobile Grid Layout (Simple & Touchable but Premium) */}
                <div className="md:hidden grid grid-cols-2 gap-4 w-full max-w-sm mx-auto pointer-events-auto px-4">
                    {services.map((service) => (
                        <div key={service.id} className="group relative bg-danholt-navy border border-white/10 rounded-2xl p-4 shadow-md flex flex-col items-center gap-3 active:scale-95 transition-all duration-200">
                            {/* Glow Effect - Hidden on mobile for performance */}
                            <div className="hidden md:block absolute inset-0 bg-danholt-gold/5 rounded-2xl opacity-0 group-active:opacity-100 transition-opacity" />

                            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-danholt-gold/20 to-transparent flex items-center justify-center text-danholt-gold border border-white/5">
                                <service.icon size={24} strokeWidth={1.5} />
                            </div>
                            <span className="text-xs font-medium text-gray-200 text-center uppercase tracking-wide">
                                {service.title}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Desktop Arc Layout (Original) */}
                <div className="hidden md:flex pointer-events-auto items-end justify-center gap-4 md:gap-6">
                    {services.map((service, index) => {
                        // Create a beautiful arc pattern
                        const totalCards = services.length;
                        const middleIndex = (totalCards - 1) / 2;
                        const offset = index - middleIndex;
                        const yOffset = Math.abs(offset) * 20; // Creates arc effect

                        return (
                            <motion.div
                                key={service.id}
                                className="pointer-events-auto cursor-grab active:cursor-grabbing"
                                initial={{
                                    y: 100,
                                    opacity: 0,
                                    scale: 0.5
                                }}
                                whileInView={{
                                    y: -yOffset,
                                    opacity: 1,
                                    scale: 1
                                }}
                                viewport={{ once: false, margin: "-50px" }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.1,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                                whileHover={{
                                    scale: 1.15,
                                    y: -yOffset - 15,
                                    zIndex: 50
                                }}
                                whileTap={{ scale: 1.1 }}
                            >
                                {/* Card Content - Smaller, Glowing */}
                                <div className="group relative w-28 h-28 md:w-32 md:h-32">
                                    {/* Multi-layer Intense Glow on Hover */}
                                    {/* Multi-layer Intense Glow on Hover - Drastically Reduced Opacity */}
                                    <div className="absolute inset-0 bg-danholt-gold rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-all duration-300 scale-150" />
                                    <div className="absolute inset-0 bg-yellow-400 rounded-full blur-[30px] opacity-0 group-hover:opacity-15 transition-all duration-300 scale-125" />
                                    <div className="absolute inset-0 bg-white rounded-full blur-[15px] opacity-0 group-hover:opacity-5 transition-all duration-300" />

                                    <motion.div
                                        className="relative h-full w-full bg-[#0B1121] backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] flex flex-col items-center justify-center gap-3 p-4 transition-all duration-300 group-hover:border-danholt-gold group-hover:bg-[#0a0f1a] group-hover:shadow-[0_0_50px_rgba(212,175,55,0.5),0_0_100px_rgba(212,175,55,0.3)]"
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ repeat: Infinity, duration: 3 + index * 0.5, ease: "easeInOut" }}
                                    >
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-tr from-danholt-gold/20 to-transparent flex items-center justify-center text-danholt-gold group-hover:text-white group-hover:bg-gradient-to-tr group-hover:from-danholt-gold group-hover:to-yellow-500 group-hover:scale-110 transition-all duration-300 border border-white/5 group-hover:border-transparent group-hover:shadow-[0_0_20px_rgba(212,175,55,0.6)]">
                                            <service.icon size={24} strokeWidth={1.5} />
                                        </div>
                                        <span className="text-[10px] md:text-xs font-medium text-blue-100/70 text-center tracking-wider uppercase leading-tight group-hover:text-white transition-colors duration-300">
                                            {service.title}
                                        </span>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </motion.div>
        </section>
    );
}
