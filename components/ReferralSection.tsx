'use client'

import { motion } from 'framer-motion'
import { Share2, UserCheck, Gift } from 'lucide-react'
import Link from 'next/link'

const steps = [
    {
        icon: Share2,
        title: 'Share Your Code',
        description: 'After your stay or membership signup, receive a referral code.'
    },
    {
        icon: UserCheck,
        title: 'Your Friend Books',
        description: 'They quote your code when booking their stay.'
    },
    {
        icon: Gift,
        title: 'You Earn Rewards',
        description: 'Enjoy rewards like restaurant credit, free drinks, or late checkout.'
    }
]

export default function ReferralSection() {
    return (
        <section className="py-20 bg-white relative">
            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-danholt-gold text-xs font-bold uppercase tracking-[0.2em] block mb-3">
                        Referrals
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif text-danholt-midnight mb-4">
                        Friends of Danholt
                    </h2>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        Invite friends, earn more moments. Every referral brings you closer to extra perks.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-[28px] left-[16%] right-[16%] h-[1px] bg-gray-200 z-0"></div>

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative z-10 flex flex-col items-center text-center"
                        >
                            <div className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-6 shadow-sm">
                                <step.icon className="w-6 h-6 text-danholt-gold" />
                            </div>
                            <h3 className="text-lg font-serif text-danholt-midnight mb-2">{step.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">{step.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Note */}
                <div className="mt-16 text-center border-t border-gray-100 pt-10">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">
                        *Currently in Beta
                    </p>
                    <p className="text-gray-500 text-sm mb-6">
                        For now, our team will track codes manually. Just share your code and we’ll handle the rest.
                    </p>
                    <Link href="/contact" className="text-danholt-gold font-bold text-sm uppercase tracking-widest hover:text-danholt-midnight transition-colors">
                        Ask about referrals &rarr;
                    </Link>
                </div>
            </div>
        </section>
    )
}
