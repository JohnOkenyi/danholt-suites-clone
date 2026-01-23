"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const heroImages = [
    '/images/hero-new-1.jpg',
    '/images/hero-new-2.jpg',
    '/images/hero-new-3.jpg'
];

export default function LuxuryHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Auto-rotate images every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section ref={containerRef} className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
            {/* Background Image Slideshow with Parallax */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 w-full h-[120%]"
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={heroImages[currentImageIndex]}
                            alt={`Danholt Suites ${currentImageIndex + 1}`}
                            fill
                            priority={currentImageIndex === 0}
                            className="object-cover"
                            quality={75}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Dark Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
            </motion.div>

            {/* Content */}
            <motion.div
                style={{ opacity }}
                className="relative z-10 text-center px-6 max-w-7xl mx-auto"
            >
                {/* Decorative Line Above */}
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "120px", opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="h-[2px] bg-gradient-to-r from-transparent via-danholt-gold to-transparent mx-auto mb-12"
                />

                {/* Main Headline with Staggered Animation */}
                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Static text without animation or shadow */}
                        <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-2 md:gap-y-4">
                            {["Here", "is", "a", "tribute", "to", "good", "living!"].map((word, index) => (
                                <span
                                    key={index}
                                    className={`
                                        inline-block
                                        text-3xl md:text-4xl lg:text-5xl xl:text-6xl
                                        font-bold
                                        tracking-tight
                                        leading-none
                                        text-white
                                        hover:scale-105
                                        transition-transform
                                        duration-300
                                        cursor-default
                                    `}
                                >
                                    {word}
                                </span>
                            ))}
                        </div>

                        {/* Animated underline accent */}
                        <motion.div
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            transition={{ duration: 1.5, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
                            className="h-1 w-32 md:w-48 bg-gradient-to-r from-transparent via-danholt-gold to-transparent mx-auto mt-8 md:mt-12 origin-center"
                        />
                    </motion.h1>
                </div>

                {/* Decorative Line Below */}
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "120px", opacity: 1 }}
                    transition={{ duration: 1.2, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
                    className="h-[2px] bg-gradient-to-r from-transparent via-danholt-gold to-transparent mx-auto mt-12"
                />
            </motion.div>

            {/* Image Indicators */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {heroImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex
                            ? 'bg-white w-8'
                            : 'bg-white/50 hover:bg-white/75'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white to-transparent opacity-50" />
                <span className="text-[10px] text-white/60 uppercase tracking-[0.2em]">Scroll</span>
            </motion.div>
        </section>
    );
}
