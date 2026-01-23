'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function FloatingElements() {
    return (
        <>
            {/* Bottom Left - Discover Projects / Rooms */}
            <div className="fixed bottom-0 left-0 z-40 p-12 hidden lg:block">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="flex items-center gap-6"
                >
                    <button className="flex items-center gap-4 group">
                        <div className="w-12 h-12 rounded-full border border-danholt-blue/20 flex items-center justify-center group-hover:bg-danholt-blue group-hover:text-white transition-all duration-500 shadow-[0_0_15px_rgba(0,102,255,0.1)]">
                            <span className="text-xl">+</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-danholt-navy/60 group-hover:text-danholt-blue transition-colors duration-500">
                            Discover Rooms
                        </span>
                    </button>

                    {/* Progress Bar / Indicator as in target site */}
                    <div className="w-32 h-[1px] bg-danholt-blue/10 relative overflow-hidden">
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-0 bg-danholt-gold/40 shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                        />
                    </div>
                </motion.div>
            </div>

            {/* Bottom Right - Social / Contact Toggle */}
            <div className="fixed bottom-0 right-0 z-40 p-12 hidden lg:block">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                >
                    <div className="flex flex-col items-end gap-2">
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-danholt-gold/60">Follow @danholt</span>
                        <div className="h-1 w-8 bg-danholt-blue animate-pulse rounded-full" />
                    </div>
                </motion.div>
            </div>

            {/* Custom Cursor Circle (Very Subtle) */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-danholt-gold/40 rounded-full pointer-events-none z-[9999] hidden lg:block mix-blend-difference shadow-[0_0_10px_rgba(212,175,55,0.3)]"
                animate={{
                    x: typeof window !== 'undefined' ? 0 : 0,
                    y: typeof window !== 'undefined' ? 0 : 0,
                }}
            />
        </>
    )
}
