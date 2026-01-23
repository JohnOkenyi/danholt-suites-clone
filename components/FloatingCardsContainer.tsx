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
        <div ref={containerRef} className="hidden md:block absolute inset-0 pointer-events-none z-50 h-[200vh]">
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

    // Scroll Interpolations
    // Start from random positions and converge to target
    // We'll simulate "floating all over" by using large ranges for the start

    // Initial floating movement (paralax-like)
    const yFloat = useTransform(scrollYProgress, [0, 0.6], [card.initialY * 10, 0])
    const xFloat = useTransform(scrollYProgress, [0, 0.6], [card.initialX * 10, 0])

    // Convergence to target position
    // We use CSS calc to interpolate between random spots and the final specific target
    // Ideally, we want them to be moving "all over" initially. 
    // Let's create a wandering animation that fades out as we scroll deep.

    return (
        <motion.div
            drag
            dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
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
                // Add a gentle floating animation loop
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
            className="pointer-events-auto absolute cursor-move group"
        >
            <div className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex flex-col items-center gap-4 w-40 shadow-2xl transition-colors hover:bg-white/10">
                {/* Shine Effect */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
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

                <div className="p-3 bg-danholt-gold/10 rounded-full text-danholt-gold mb-1">
                    <card.icon size={24} />
                </div>
                <span className="text-sm font-medium text-white/90 tracking-wide text-center">{card.title}</span>
            </div>
        </motion.div>
    )
}
