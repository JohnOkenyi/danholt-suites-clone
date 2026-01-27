import React, { useRef, useMemo } from 'react'
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion'
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

    // Optimization: Stable random values for hydration consistency
    const { floatDuration, floatDelay, floatY } = useMemo(() => ({
        floatDuration: 3 + Math.random() * 2, // Slightly faster (3-5s) to feel responsive
        floatDelay: index * 0.2, // Staggered start
        floatY: -15 // Consistent float distance
    }), [index]);

    const yFloat = useTransform(scrollYProgress, [0, 0.6], [card.initialY * 10, 0])
    const xFloat = useTransform(scrollYProgress, [0, 0.6], [card.initialX * 10, 0])

    return (
        <motion.div
            style={{
                position: 'absolute',
                left: card.targetLeft,
                top: card.targetTop,
                x: xFloat, // Parallax X (Scroll)
                y: yFloat, // Parallax Y (Scroll)
            }}
            className="pointer-events-auto absolute z-10"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, floatY, 0] // Floating Y (Loop) - Separated from Scroll Y
                }}
                transition={{
                    opacity: { duration: 0.6, delay: floatDelay },
                    scale: { duration: 0.6, delay: floatDelay },
                    y: {
                        duration: floatDuration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatType: "reverse" // Smoother bounce
                    }
                }}
                whileHover={{ scale: 1.05, y: -5 }} // Snappy hover
                onMouseMove={onMouseMove}
                className="group cursor-default md:cursor-move"
            >
                <div className="relative overflow-hidden bg-danholt-midnight md:bg-white/5 md:backdrop-blur-xl border border-white/10 p-4 md:p-6 rounded-2xl flex flex-col items-center gap-2 md:gap-4 w-32 md:w-40 shadow-2xl transition-colors md:hover:bg-white/10">
                    {/* Shine Effect */}
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
        </motion.div>
    )
}
