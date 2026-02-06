'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Check, X, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface StatusUpdateButtonsProps {
    id: string;
    currentStatus: string;
    updateAction: (id: string, status: string) => Promise<{ success?: boolean; error?: string }>;
}

const statusConfig: Record<string, { icon: any, color: string, label: string }> = {
    pending: { icon: Clock, color: 'text-yellow-400', label: 'Pending' },
    confirmed: { icon: Check, color: 'text-green-400', label: 'Confirmed' },
    cancelled: { icon: X, color: 'text-red-400', label: 'Cancelled' }
}

export default function StatusUpdateButtons({ id, currentStatus, updateAction }: StatusUpdateButtonsProps) {
    const [isUpdating, setIsUpdating] = useState(false)
    const [showOptions, setShowOptions] = useState(false)
    const [coords, setCoords] = useState<{ top: number; left: number; width: number } | null>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    const updateCoords = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect()
            setCoords({
                top: rect.bottom + window.scrollY,
                left: rect.right + window.scrollX - 140, // Assuming min-width 140px, align to right
                width: 140
            })
        }
    }

    useEffect(() => {
        if (showOptions) {
            updateCoords()
            // Close on scroll or resize as coordinates will change
            window.addEventListener('scroll', () => setShowOptions(false))
            window.addEventListener('resize', () => setShowOptions(false))
        }
        return () => {
            window.removeEventListener('scroll', () => setShowOptions(false))
            window.removeEventListener('resize', () => setShowOptions(false))
        }
    }, [showOptions])

    const handleStatusChange = async (newStatus: string) => {
        if (newStatus === currentStatus) return;

        setIsUpdating(true)
        const result = await updateAction(id, newStatus)
        if (result.error) {
            alert("Error: " + result.error)
        }
        setIsUpdating(false)
        setShowOptions(false)
    }

    return (
        <div className="relative">
            <button
                ref={buttonRef}
                onClick={(e) => {
                    e.stopPropagation()
                    setShowOptions(!showOptions)
                }}
                disabled={isUpdating}
                className={`p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
                title="Update Status"
            >
                {isUpdating ? (
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                    <Clock size={16} className="text-blue-400" />
                )}
            </button>

            {showOptions && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[9999] pointer-events-none">
                    <div
                        className="absolute inset-0 pointer-events-auto"
                        onClick={() => setShowOptions(false)}
                    />
                    <AnimatePresence>
                        {showOptions && coords && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                style={{
                                    top: coords.top + 8,
                                    left: coords.left,
                                    width: coords.width,
                                    position: 'absolute'
                                }}
                                className="z-[10000] pointer-events-auto bg-[#0f172a] border border-white/10 rounded-xl shadow-2xl p-2 backdrop-blur-xl"
                            >
                                {Object.entries(statusConfig).map(([status, config]) => (
                                    <button
                                        key={status}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleStatusChange(status)
                                        }}
                                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all hover:bg-white/10 ${currentStatus === status ? 'bg-white/5 ' + config.color : 'text-gray-400'
                                            }`}
                                    >
                                        <config.icon size={14} />
                                        {config.label}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>,
                document.body
            )}
        </div>
    )
}
