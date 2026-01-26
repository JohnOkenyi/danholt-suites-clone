"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function IntroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Animate from -100px (left) to 100px (right) based on scroll - Smoother, less distance
    const x = useTransform(scrollYProgress, [0, 1], [-100, 100]);
    // Animate in opposite direction for parallax effect
    const xReverse = useTransform(scrollYProgress, [0, 1], [100, -100]);

    // Fade in and out effect like EvolutionSection
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    return (
        <section ref={sectionRef} className="py-20 bg-white text-center px-6 border-t border-gray-200 relative overflow-visible">
            {/* Background Glow */}
            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-danholt-gold/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-danholt-gold text-xs tracking-[0.4em] uppercase block mb-6"
                >
                    The New Standard
                </motion.span>

                <motion.h2
                    style={isMobile ? { opacity: 1 } : { x, opacity }}
                    initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-[200] text-gray-900 mb-10 leading-tight"
                >
                    Evolved <span className="font-[400] text-gray-800">Hospitality.</span>
                </motion.h2>

                <motion.p
                    style={isMobile ? { opacity: 1 } : { x: xReverse, opacity }}
                    initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-xl md:text-2xl text-gray-600 font-[300] leading-relaxed"
                >
                    We don&apos;t just host. We anticipate. Every interaction is a curated moment, every space a sanctuary designed to disconnect you from the noise and reconnect you with excellence.
                </motion.p>
            </div>
        </section>
    );
}
