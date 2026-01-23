'use client'

import { motion } from 'framer-motion'
import React from 'react'

interface SplitTextProps {
    children: string
    className?: string
    delay?: number
}

// Reusing existing SplitText logic but ensuring it's robust for new usage
export default function SplitText({ children, className, delay = 0 }: SplitTextProps) {
    const words = children.split(' ')

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: delay * i },
        }),
    }

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100,
            },
        },
    }

    return (
        <motion.span
            style={{ overflow: 'hidden', display: 'inline-block', verticalAlign: 'top' }}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={className}
        >
            {words.map((word, index) => (
                <span key={index} style={{ display: 'inline-block', marginRight: '0.25em' }}>
                    {Array.from(word).map((letter, i) => (
                        <motion.span key={i} variants={child} style={{ display: 'inline-block' }}>
                            {letter}
                        </motion.span>
                    ))}
                </span>
            ))}
        </motion.span>
    )
}
