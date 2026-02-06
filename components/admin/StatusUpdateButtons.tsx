'use client'

import { useState } from 'react'
import { Check, X, Clock, HelpCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface StatusUpdateButtonsProps {
    id: string;
    currentStatus: string;
    updateAction: (id: string, status: string) => Promise<{ success?: boolean; error?: string }>;
    direction?: 'up' | 'down';
}

const statusConfig: Record<string, { icon: any, color: string, label: string }> = {
    pending: { icon: Clock, color: 'text-yellow-400', label: 'Pending' },
    confirmed: { icon: Check, color: 'text-green-400', label: 'Confirmed' },
    cancelled: { icon: X, color: 'text-red-400', label: 'Cancelled' }
}

export default function StatusUpdateButtons({ id, currentStatus, updateAction, direction = 'down' }: StatusUpdateButtonsProps) {
    const [isUpdating, setIsUpdating] = useState(false)
    const [showOptions, setShowOptions] = useState(false)

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
                onClick={() => setShowOptions(!showOptions)}
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

            <AnimatePresence>
                {showOptions && (
                    <>
                        <div
                            className="fixed inset-0 z-[60]"
                            onClick={() => setShowOptions(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: direction === 'down' ? -10 : 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: direction === 'down' ? -10 : 10 }}
                            className={`absolute right-0 z-[70] bg-danholt-midnight border border-white/10 rounded-xl shadow-2xl p-2 min-w-[140px] backdrop-blur-xl ${direction === 'down' ? 'top-full mt-2' : 'bottom-full mb-2'
                                }`}
                        >
                            {Object.entries(statusConfig).map(([status, config]) => (
                                <button
                                    key={status}
                                    onClick={() => handleStatusChange(status)}
                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all hover:bg-white/10 ${currentStatus === status ? 'bg-white/5 ' + config.color : 'text-gray-400'
                                        }`}
                                >
                                    <config.icon size={14} />
                                    {config.label}
                                </button>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
