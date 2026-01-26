'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from 'framer-motion'
import { Bed, Utensils, Wifi, Zap, Trophy, LucideIcon } from 'lucide-react'

// Card Data
interface CardData {
    id: string
    title: string
    icon: LucideIcon
    // Target position in AnticipationSection (percentages)
    targetLeft: string
    targetTop: string
    // Initial random offset factors
    initialX: number
    initialY: number
}

const cards: CardData[] = [
    {
        id: 'luxury-rooms',
        title: 'Luxury Rooms',
        icon: Bed,
        targetLeft: '10%',
        targetTop: '10%',
        initialX: -20,
        initialY: -10
    },
    {
        id: 'dining',
        title: 'Fine Dining',
        icon: Utensils,
        targetLeft: '80%',
        targetTop: '20%',
        initialX: 20,
        initialY: -20
    },
    {
        id: 'fitness',
        title: 'Fitness',
        icon: Trophy,
        targetLeft: '15%',
        targetTop: '70%',
        initialX: -15,
        initialY: 15
    },
    {
        id: 'security',
        title: '24/7 Security',
        icon: Zap,
        targetLeft: '80%',
        targetTop: '75%',
        initialX: 25,
        initialY: 10
    },
    {
        id: 'wifi',
        title: 'High-Speed WiFi',
        icon: Wifi,
        targetLeft: '45%',
        targetTop: '85%',
        initialX: 0,
        initialY: 20
    }
]

export default function FloatingCardsContainer() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Map scroll progress to animation states
    // 0 -> 0.5: Floating/Wandering phase
    // 0.5 -> 1.0: Settling phase

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none z-50 h-[200vh] top-[100vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {cards.map((card, index) => (
                    <FloatingCard
                        key={card.id}
                        card={card}
                        scrollYProgress={scrollYProgress}
                        index={index}
                    />
                ))}
            </div>
        </div>
    )
}

function FloatingCard({ card, scrollYProgress, index }: { card: CardData, scrollYProgress: any, index: number }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const yFloat = useTransform(scrollYProgress, [0, 0.6], [card.initialY * 10, 0])
    const xFloat = useTransform(scrollYProgress, [0, 0.6], [card.initialX * 10, 0])

    return (
        <motion.div
            drag={false} // Disable drag on mobile if needed, or keep enabled. Keeping specific user request only.
            whileHover={{ scale: 1.1, zIndex: 100 }}
            onMouseMove={onMouseMove}
            style={{
                position: 'absolute',
                left: card.targetLeft,
                top: card.targetTop,
                x: xFloat,
                y: yFloat,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: 1,
                scale: 1,
                y: [0, -10, 0],
                x: [0, 5, 0]
            }}
            transition={{
                opacity: { duration: 0.5, delay: index * 0.1 },
                default: {
                    repeat: Infinity,
                    duration: 3 + Math.random() * 2,
                    ease: "easeInOut"
                }
            }}
            // Changed cursor-move to pointer-events-auto. Added md:block logic to container if it was hidden.
            // Wait, previous container had "hidden md:block". I removed it in the parent.
            className="pointer-events-auto absolute cursor-default md:cursor-move group"
        >
            {/* Added bg-danholt-midnight for mobile, md:bg-white/5 for desktop. Removed shadow/glow on mobile implicitly by changing bg? No, user asked for dark blue. */}
            <div className="relative overflow-hidden bg-danholt-midnight md:bg-white/5 md:backdrop-blur-xl border border-white/10 p-4 md:p-6 rounded-2xl flex flex-col items-center gap-2 md:gap-4 w-32 md:w-40 shadow-2xl transition-colors md:hover:bg-white/10">
                {/* Shine Effect - Hidden on mobile */}
                <motion.div
                    className="hidden md:block pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        background: useMotionTemplate`
                    radial-gradient(
                        650px circle at ${mouseX}px ${mouseY}px,
                        rgba(255,255,255,0.4),
                        transparent 80%
                    )
                    `,
                    }}
                />

                <div className="p-2 md:p-3 bg-danholt-gold/10 rounded-full text-danholt-gold mb-1">
                    <card.icon size={20} className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <span className="text-xs md:text-sm font-medium text-white/90 tracking-wide text-center">{card.title}</span>
            </div>
        </motion.div>
    )
}
