'use client'

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

// Helper for class names if utils doesn't exist
function classNames(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(' ')
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string
    variant?: 'primary' | 'outline' | 'ghost'
}

export default function MagneticButton({ className, href, children, variant = 'primary', ...props }: ButtonProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e
        const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 }
        const x = clientX - (left + width / 2)
        const y = clientY - (top + height / 2)
        setPosition({ x, y })
    }

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 })
    }

    const baseStyles = "relative px-8 py-4 rounded-full font-medium text-lg transition-colors duration-300 overflow-hidden group"

    const variants = {
        primary: "bg-danholt-gold text-danholt-dark hover:text-danholt-dark/90",
        outline: "border border-danholt-gold text-danholt-gold hover:text-white",
        ghost: "text-white hover:text-danholt-gold"
    }

    const content = (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x * 0.5, y: position.y * 0.5 }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={classNames(baseStyles, variants[variant], className)}
        >
            {/* Glow Effect */}
            <motion.span
                className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"
                style={{ skewX: -20 }}
            />

            <span className="relative z-10 block">{children}</span>
        </motion.div>
    )

    if (href) {
        return <Link href={href} className={classNames("inline-block", className)}>{content}</Link>
    }

    return (
        <button className={classNames("inline-block bg-transparent border-none p-0 cursor-pointer", className)} {...props}>
            {content}
        </button>
    )
}
