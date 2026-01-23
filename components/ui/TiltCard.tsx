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

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect()
        if (rect) {
            const width = rect.width
            const height = rect.height
            const mouseX = e.clientX - rect.left
            const mouseY = e.clientY - rect.top
            const xPct = mouseX / width - 0.5
            const yPct = mouseY / height - 0.5
            x.set(xPct)
            y.set(yPct)
        }
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
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
