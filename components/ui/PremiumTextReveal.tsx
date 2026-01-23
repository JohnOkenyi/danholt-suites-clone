'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface PremiumTextRevealProps {
    text: string
    className?: string
    delay?: number
    duration?: number
}

export default function PremiumTextReveal({
    text,
    className = "",
    delay = 0,
    duration = 0.8
}: PremiumTextRevealProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: false, margin: "-10%" })

    // Split text into words to handle wrapping correctly, then characters for the effect
    const words = text.split(" ")

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: delay * i },
        }),
    }

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100,
                duration: duration
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            filter: 'blur(10px)',
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    }

    return (
        <motion.div
            ref={ref}
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
            variants={container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={className}
        >
            {words.map((word, index) => (
                <span key={index} style={{ display: "inline-block", marginRight: "0.25em", whiteSpace: "nowrap" }}>
                    {Array.from(word).map((letter, i) => (
                        <motion.span key={i} variants={child} style={{ display: "inline-block" }}>
                            {letter}
                        </motion.span>
                    ))}
                </span>
            ))}
        </motion.div>
    )
}
