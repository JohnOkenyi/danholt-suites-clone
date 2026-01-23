'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const slides = [
    '/images/hero-slide-1.jpg',
    '/images/hero-slide-2.jpg',
    '/images/hero-slide-3.jpg'
]

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 6000)
        return () => clearInterval(timer)
    }, [])

    return (
        <section className="relative h-screen min-h-[800px] w-full flex items-center justify-center overflow-hidden bg-danholt-black">

            {/* Background Image Slider */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 z-0"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slides[currentSlide]})` }}
                    />
                    {/* Modern Gradient Overlay: Darker at bottom for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60" />
                </motion.div>
            </AnimatePresence>

            {/* Content Content - Apple Style centered */}
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">

                <motion.div
                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} // Apple-style easing
                    className="mb-6"
                >
                    <span className="inline-block py-1 px-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-xs font-medium text-white tracking-widest uppercase mb-4">
                        Premium Hospitality
                    </span>
                    <h2 className="text-white/90 text-sm md:text-base font-medium tracking-[0.2em] uppercase font-sans">
                        Here is a tribute to
                    </h2>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-6xl md:text-8xl lg:text-[110px] font-bold text-white tracking-tight leading-none mb-8 drop-shadow-2xl"
                >
                    GOOD LIVING
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-xl md:text-3xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed"
                >
                    True luxury isn&apos;t designed.<br />
                    <span className="font-serif italic text-white">It&apos;s felt.</span>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="mt-12"
                >
                    <Link href="/rooms">
                        <button className="bg-danholt-gold text-danholt-navy px-10 py-4 rounded-full text-sm font-semibold tracking-wide hover:bg-white hover:text-danholt-navy hover:scale-105 transition-all duration-300 shadow-lg shadow-danholt-gold/30">
                            Book Your Stay
                        </button>
                    </Link>
                </motion.div>

            </div>

            {/* Slider Indicators */}
            <div className="absolute bottom-12 flex gap-3 z-20">
                {slides.map((_, idx) => (
                    <div
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentSlide ? 'w-8 bg-white' : 'w-1.5 bg-white/40'}`}
                    />
                ))}
            </div>
        </section>
    )
}
