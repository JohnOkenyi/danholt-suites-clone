"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function IntroSection() {
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Animate from -300px (left) to 300px (right) based on scroll
    const x = useTransform(scrollYProgress, [0, 1], [-300, 300]);
    // Animate in opposite direction for parallax effect
    const xReverse = useTransform(scrollYProgress, [0, 1], [200, -200]);

    return (
        <section ref={sectionRef} className="py-20 bg-white text-center px-6 border-t border-gray-200 relative overflow-visible">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-danholt-gold/5 blur-[120px] rounded-full pointer-events-none" />

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
                    style={{ x }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-[200] text-gray-900 mb-10 leading-tight"
                >
                    Evolved <span className="font-[400] text-gray-800">Hospitality.</span>
                </motion.h2>

                <motion.p
                    style={{ x: xReverse }}
                    initial={{ opacity: 0 }}
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
