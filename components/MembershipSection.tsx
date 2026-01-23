'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Star, Gift, Shield, Percent } from 'lucide-react'
import { MEMBERSHIP_TIERS } from '@/types/membership'
import MembershipModal from './MembershipModal'

const benefits = [
    {
        icon: Star,
        title: 'Guaranteed Value',
        description: 'Every member receives benefits every month.'
    },
    {
        icon: Gift,
        title: 'Exclusive Rewards',
        description: 'Access to complimentary nights, meals, and surprises.'
    },
    {
        icon: Shield,
        title: 'Priority Treatment',
        description: 'Faster responses and better room preferences.'
    },
    {
        icon: Percent,
        title: 'Members-only Offers',
        description: 'Private rates and limited-time deals.'
    }
]

export default function MembershipSection() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedTier, setSelectedTier] = useState('Bronze')

    const openModal = (tier: string) => {
        setSelectedTier(tier)
        setIsModalOpen(true)
    }

    return (
        <section id="membership" className="py-24 bg-danholt-midnight relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-5 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-danholt-gold/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

                {/* Header */}
                <div className="text-center mb-16 md:mb-24">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-danholt-gold text-xs font-bold uppercase tracking-[0.3em] block mb-4"
                    >
                        Membership
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6"
                    >
                        Danholt Privilege Club
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed text-balance"
                    >
                        A simple membership for guests who want more than a stay. Enjoy guaranteed monthly benefits, exclusive offers, and special chances to unlock complimentary nights and dining.
                    </motion.p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * index }}
                            className="text-center group"
                        >
                            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-danholt-gold/10 group-hover:border-danholt-gold/30 transition-all duration-300">
                                <benefit.icon className="w-6 h-6 text-danholt-gold" />
                            </div>
                            <h3 className="text-white font-serif text-lg mb-2">{benefit.title}</h3>
                            <p className="text-white/50 text-sm leading-relaxed">{benefit.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Tiers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {MEMBERSHIP_TIERS.map((tier, index) => (
                        <motion.div
                            key={tier.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + (0.1 * index) }}
                            className={`relative p-8 rounded-2xl border transition-all duration-500 group
                                ${tier.popular
                                    ? 'bg-gradient-to-b from-white/10 to-white/5 border-danholt-gold/50 md:-mt-8 md:-mb-8 z-10 shadow-[0_0_50px_rgba(212,175,55,0.1)]'
                                    : 'bg-white/5 border-white/10 hover:border-white/20'
                                }
                            `}
                        >
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-danholt-gold text-danholt-midnight px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-serif text-white mb-2">{tier.name}</h3>
                                <div className="text-danholt-gold font-bold mb-4">{tier.price}</div>
                                <p className="text-white/60 text-sm h-10">{tier.tagline}</p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {tier.benefits.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                                        <Check className="w-4 h-4 text-danholt-gold mt-1 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => openModal(tier.name)}
                                className={`w-full py-4 rounded-lg font-bold uppercase tracking-widest text-sm transition-all duration-300
                                    ${tier.popular
                                        ? 'bg-danholt-gold text-danholt-midnight hover:bg-white'
                                        : 'bg-white/10 text-white hover:bg-danholt-gold hover:text-danholt-midnight'
                                    }
                                `}
                            >
                                Join {tier.name}
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Footer CTA */}
                <div className="mt-16 text-center">
                    <p className="text-white/60 mb-8 max-w-xl mx-auto">
                        Joining is simple. Start with any tier, and our team will contact you to confirm your details and preferred payment method.
                    </p>
                    <button
                        onClick={() => openModal('Bronze')}
                        className="btn-premium px-10 py-4 bg-transparent border border-danholt-gold text-danholt-gold font-bold uppercase tracking-widest hover:bg-danholt-gold hover:text-danholt-midnight rounded-full"
                    >
                        Become a Member
                    </button>
                </div>

            </div>

            <MembershipModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialTier={selectedTier}
            />
        </section>
    )
}
