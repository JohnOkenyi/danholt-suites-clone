'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight, Heart, Briefcase, Coffee } from 'lucide-react'
import Link from 'next/link'

const packages = [
    {
        tag: 'COUPLES',
        title: 'Romantic Escape',
        description: 'A one-night stay for two with a curated dinner and late checkout, perfect for anniversaries, proposals, and special celebrations.',
        icon: Heart,
        features: [
            '1-night stay in a selected room category',
            'Dinner for two at the restaurant',
            'Complimentary welcome drink on arrival',
            'Late checkout (subject to availability)'
        ],
        cta: 'Book This Package',
        link: '/booking?package=romantic'
    },
    {
        tag: 'GETAWAY',
        title: 'Weekend Reset',
        description: 'Recharge with a two-night stay, daily breakfast, and access to fitness facilities.',
        icon: Coffee,
        features: [
            '2-night stay (e.g., Fri–Sun or Sat–Mon)',
            'Daily breakfast for two',
            'Access to fitness and sports facilities',
            'Flexible check-in and checkout where possible'
        ],
        cta: 'Book This Package',
        link: '/booking?package=weekend'
    },
    {
        tag: 'BUSINESS',
        title: 'Business Traveler Pass',
        description: 'Stay productive and comfortable with business-friendly amenities and support.',
        icon: Briefcase,
        features: [
            'Room with work-friendly space and WiFi',
            'Early breakfast option',
            'Priority same-day laundry',
            'Optional airport pickup add-on'
        ],
        cta: 'Book This Package',
        link: '/booking?package=business'
    }
]

export default function PackagesSection() {
    return (
        <section className="py-24 bg-[#FAF9F7] relative">
            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* Header */}
                <div className="mb-16 md:mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-danholt-gold text-xs font-bold uppercase tracking-[0.3em] block mb-4"
                    >
                        Packages & Offers
                    </motion.span>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-serif text-danholt-midnight max-w-xl"
                        >
                            Curated Stays & Experiences
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-500 max-w-md text-lg leading-relaxed"
                        >
                            Choose from ready-made packages that combine rooms, dining, and thoughtful extras, so every stay feels simple and special.
                        </motion.p>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {packages.map((pkg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-danholt-gold/30 hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <span className="px-3 py-1 bg-danholt-midnight/5 text-danholt-midnight text-[10px] font-bold uppercase tracking-widest rounded-full group-hover:bg-danholt-gold group-hover:text-white transition-colors">
                                    {pkg.tag}
                                </span>
                                <pkg.icon className="w-5 h-5 text-gray-400 group-hover:text-danholt-gold transition-colors" />
                            </div>

                            <h3 className="text-2xl font-serif text-danholt-midnight mb-3">{pkg.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6">{pkg.description}</p>

                            <ul className="space-y-3 mb-8 flex-grow">
                                {pkg.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                                        <Check className="w-4 h-4 text-danholt-gold mt-0.5 shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                                <Link
                                    href={pkg.link}
                                    className="flex-1 py-3 px-4 bg-danholt-midnight text-white text-center text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-danholt-gold transition-colors duration-300"
                                >
                                    {pkg.cta}
                                </Link>
                                <button className="py-3 px-4 border border-gray-200 text-danholt-midnight text-xs font-bold uppercase tracking-widest rounded-lg hover:border-danholt-gold hover:text-danholt-gold transition-colors duration-300">
                                    Details
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}
