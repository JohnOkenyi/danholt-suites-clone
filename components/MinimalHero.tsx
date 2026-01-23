'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'


export default function MinimalHero() {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">


            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 flex flex-col items-center justify-center text-center h-full">

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <h1 className="text-5xl md:text-7xl lg:text-[80px] font-serif text-white leading-tight mb-8 drop-shadow-lg">
                        From Ordinary Stays<br />
                        <span className="italic font-light">to Extraordinary Experiences.</span>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="absolute bottom-12 flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => {
                        window.scrollTo({
                            top: window.innerHeight,
                            behavior: 'smooth'
                        })
                    }}
                >
                    <span className="text-white/80 text-sm tracking-[0.2em] font-light uppercase">Scroll to Explore</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ArrowDown className="w-5 h-5 text-danholt-yellow/80" />
                    </motion.div>
                </motion.div>

            </div>

            {/* Vignette Overlay for Depth */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-danholt-navy/20 to-danholt-navy/80 pointer-events-none" />
        </section>
    )
}
