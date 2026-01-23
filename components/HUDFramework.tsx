'use client'

import React, { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export default function HUDFramework() {
    const { scrollYProgress } = useScroll()
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    return (
        <div className="fixed inset-0 z-[100] pointer-events-none hud-glow-blue hud-glow-gold">
            {/* Viewport HUD Selection Corners */}
            <div className="hud-corner hud-corner-tl" />
            <div className="hud-corner hud-corner-tr" />
            <div className="hud-corner hud-corner-bl" />
            <div className="hud-corner hud-corner-br" />

            {/* Scroll Progress HUD Indicator (Left Edge) */}
            <div className="absolute left-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6">
                <span className="text-[8px] font-bold uppercase tracking-[0.5em] text-white/20 vertical-text origin-center rotate-180">
                    System.Scroll
                </span>
                <div className="w-[1px] h-48 bg-white/5 relative overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 w-full bg-danholt-gold shadow-[0_0_15px_rgba(212,175,55,1)] origin-top"
                        style={{ height: '100%', scaleY }}
                    />
                </div>
                <span className="text-[10px] font-mono text-danholt-gold/40">
                    {Math.round(scrollYProgress.get() * 100)}%
                </span>
            </div>

            {/* Bottom HUD Texture - Coordinate Label */}
            <div className="absolute bottom-12 right-12 flex flex-col items-end gap-1 opacity-20">
                <span className="text-[8px] font-mono tracking-tighter">LVL_01 // SEC_HUD</span>
                <span className="text-[8px] font-mono tracking-tighter">LAT: 40.7128° N, LON: 74.0060° W</span>
            </div>

            {/* Static HUD Noise Layer */}
            <div className="absolute inset-0 bg-transparent pointer-events-none opacity-[0.03] mix-blend-overlay" />
        </div>
    )
}
