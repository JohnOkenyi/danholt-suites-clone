'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import AnimatedText from './AnimatedText'

export default function QuoteSection() {
    const { scrollYProgress } = useScroll()
    const scale = useTransform(scrollYProgress, [0.1, 0.3], [0.8, 1])
    const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1])

    return (
        <section className="relative min-h-screen bg-danholt-navy flex items-center justify-center py-32 overflow-hidden">
            {/* HUD Background Visual (Large Rotating Ring) */}
            <motion.div
                style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, 180]), opacity: 0.05 }}
                className="absolute w-[800px] h-[800px] border border-danholt-blue rounded-full flex items-center justify-center pointer-events-none"
            >
                <div className="w-[600px] h-[600px] border border-danholt-gold/20 rounded-full" />
            </motion.div>

            <motion.div
                style={{ scale, opacity }}
                className="max-w-5xl mx-auto px-12 text-center relative z-10"
            >
                <div className="mb-12 flex flex-col items-center">
                    <div className="w-1 h-32 bg-gradient-to-b from-transparent via-danholt-blue to-transparent mb-12" />
                    <span className="text-danholt-gold text-[10px] font-bold uppercase tracking-[1em]">Our Vision // Sync</span>
                </div>

                <div className="mb-24 flex justify-center">
                    <AnimatedText
                        text="Innovating hospitality for the modern world traveler."
                        className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-tight text-center"
                    />
                </div>

                <div className="flex justify-center gap-16 opacity-30">
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-[8px] font-mono">EST_2024</span>
                        <div className="w-12 h-[1px] bg-white" />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-[8px] font-mono">LOC_NC</span>
                        <div className="w-12 h-[1px] bg-white" />
                    </div>
                </div>
            </motion.div>
        </section>
    )
}
