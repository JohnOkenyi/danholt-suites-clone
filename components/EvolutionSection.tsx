'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function EvolutionSection() {
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Scroll-linked horizontal movement
    const x = useTransform(scrollYProgress, [0, 1], [-100, 100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    return (
        <section ref={sectionRef} className="py-20 bg-white px-6 relative overflow-hidden">
            <div className="max-w-4xl mx-auto text-center relative z-10">
                {/* Decorative gold line */}
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 80 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className="h-[2px] bg-danholt-gold mx-auto mb-10"
                />

                <motion.p
                    style={{ x, opacity }}
                    className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-700 leading-relaxed tracking-wide"
                >
                    This is the next evolution of hospitality,
                </motion.p>

                <motion.p
                    style={{ x: useTransform(scrollYProgress, [0, 1], [100, -100]), opacity }}
                    className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-400 leading-relaxed tracking-wide mt-2"
                >
                    where luxury becomes personal.
                </motion.p>

                {/* Decorative gold line */}
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 80 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className="h-[2px] bg-danholt-gold mx-auto mt-10"
                />
            </div>
        </section>
    )
}
