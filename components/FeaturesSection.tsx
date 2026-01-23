'use client'

import React from 'react'
import { motion } from 'framer-motion'

const features = [
    { title: 'Personalized Service', description: 'Every preference remembered' },
    { title: '24/7 Concierge', description: 'Always at your service' },
    { title: 'Seamless Experience', description: 'From booking to checkout' },
]

export default function FeaturesSection() {
    return (
        <section className="py-20 bg-[#FAF9F7] relative">
            <div className="max-w-5xl mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="text-center mb-16 md:mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 leading-tight mb-2"
                    >
                        The Danholt Suites Promise.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-600"
                    >
                        Excellence in every detail.
                    </motion.p>
                </div>

                {/* 2x2 Grid of Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {features.map((feature, index) => {
                        // Different animation directions for each card
                        const isLeft = index % 2 === 0;
                        const isTop = index < 2;

                        return (
                            <motion.div
                                key={index}
                                initial={{
                                    opacity: 0,
                                    x: isLeft ? -80 : 80,
                                    y: 50,
                                    scale: 0.9,
                                    rotateY: isLeft ? -15 : 15
                                }}
                                whileInView={{
                                    opacity: 1,
                                    x: 0,
                                    y: 0,
                                    scale: 1,
                                    rotateY: 0
                                }}
                                viewport={{ once: false, margin: "-50px" }}
                                transition={{
                                    delay: index * 0.15,
                                    duration: 0.7,
                                    ease: [0.25, 0.46, 0.45, 0.94]
                                }}
                                className="group"
                            >
                                <div className="bg-white rounded-2xl p-8 md:p-10 border-l-4 border-danholt-gold shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 h-full">
                                    <h3 className="text-xl md:text-2xl font-medium text-gray-800 mb-3 group-hover:text-danholt-gold transition-colors duration-300">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-500 text-base md:text-lg">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

