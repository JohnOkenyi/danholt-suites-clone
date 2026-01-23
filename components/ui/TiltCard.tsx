'use client'

import React, { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

function classNames(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(' ')
}

export default function TiltCard({ children, className }: { children: React.ReactNode, className?: string }) {
    const ref = useRef<HTMLDivElement>(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseX = useSpring(x, { stiffness: 50, damping: 10 })
    const mouseY = useSpring(y, { stiffness: 50, damping: 10 })

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"])
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"])

    const width = useRef(0)
    const height = useRef(0)
    const left = useRef(0)
    const top = useRef(0)

    const handleMouseEnter = () => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect()
            width.current = rect.width
            height.current = rect.height
            left.current = rect.left
            top.current = rect.top
        }
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        const mouseX = e.clientX - left.current
        const mouseY = e.clientY - top.current
        const xPct = mouseX / width.current - 0.5
        const yPct = mouseY / height.current - 0.5
        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={classNames("relative transition-all duration-200 ease-out", className)}
        >
            <div
                style={{ transform: "translateZ(20px)" }}
                className="h-full w-full"
            >
                {children}
            </div>
        </motion.div>
    )
}
