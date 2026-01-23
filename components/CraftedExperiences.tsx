'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

const experiences = [
    {
        title: "Suites",
        subtitle: "Private Sanctuary",
        description: "Immersive comfort designed for the modern elite.",
        image: "/images/room-deluxe.jpg",
        link: "/rooms"
    },
    {
        title: "Restaurant",
        subtitle: "Culinary Delight",
        description: "Authentic Nigerian flavors and international cuisine.",
        image: "/images/nigerian-dish.png",
        link: "/dining"
    },
    {
        title: "Sports Facilities",
        subtitle: "Body & Mind",
        description: "World-class stadium and fitness center for complete rejuvenation.",
        image: "https://danholtsuites.com/assets/img/gallery/13.jpg",
        link: "/facilities"
    }
]

export default function CraftedExperiences() {
    return (
        <section className="py-20 bg-danholt-navy relative z-10 border-t border-white/5">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24">
                    <div>
                        <h2 className="text-6xl md:text-8xl font-serif text-danholt-cold-white tracking-tight">
                            Experiences
                        </h2>
                    </div>
                    <div className="md:text-right mt-8 md:mt-0">
                        <p className="text-danholt-cold-white/60 max-w-sm ml-auto text-sm leading-relaxed">
                            DISCOVER A COLLECTION OF MOMENTS, CAREFULLY CURATED TO ELEVATE YOUR STAY BEYOND THE EXPECTED.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                    {experiences.map((item, i) => (
                        <Link href={item.link} key={i} className="group relative block w-full h-[600px] overflow-hidden">
                            <motion.div
                                className="w-full h-full relative"
                                whileHover={{ scale: 0.98 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-danholt-midnight/40 group-hover:bg-danholt-midnight/20 transition-colors duration-500" />

                                <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-12 h-12 rounded-full bg-danholt-gold flex items-center justify-center">
                                        <ArrowUpRight className="text-danholt-midnight w-6 h-6" />
                                    </div>
                                </div>

                                <div className="absolute bottom-0 left-0 p-8 w-full z-10">
                                    <span className="text-danholt-gold text-xs font-mono uppercase tracking-widest mb-2 block">
                                        {item.subtitle}
                                    </span>
                                    <h3 className="text-4xl font-serif text-white mb-4 group-hover:translate-x-2 transition-transform duration-500">
                                        {item.title}
                                    </h3>
                                    <div className="h-[1px] w-full bg-white/20 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-danholt-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out" />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
