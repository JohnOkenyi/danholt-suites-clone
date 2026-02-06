'use client'

import { useState } from 'react'
import { updatePassword } from '@/app/actions/auth'
import { Lock, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isUpdating, setIsUpdating] = useState(false)
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setStatus({ type: 'error', message: 'Passwords do not match.' })
            return
        }

        setIsUpdating(true)
        setStatus(null)

        const result = await updatePassword(password)
        setIsUpdating(false)

        if (result.success) {
            setStatus({ type: 'success', message: 'Password updated successfully! You can now log in.' })
        } else {
            setStatus({ type: 'error', message: result.error || 'Failed to update password.' })
        }
    }

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
            <div className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-danholt-gold to-transparent opacity-50" />

                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-danholt-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-danholt-gold/20">
                        <Lock className="w-8 h-8 text-danholt-gold" />
                    </div>
                    <h1 className="text-2xl font-bold text-white font-playfair tracking-wide">Update Password</h1>
                    <p className="text-gray-400 text-sm mt-2">Secure access to Danholt Command Center</p>
                </div>

                {status?.type === 'success' ? (
                    <div className="text-center space-y-6">
                        <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl flex items-center gap-3 text-green-400">
                            <CheckCircle className="w-5 h-5 flex-shrink-0" />
                            <p className="text-sm font-medium">{status.message}</p>
                        </div>
                        <Link
                            href="/admin"
                            className="block w-full py-3.5 bg-danholt-gold text-black font-bold rounded-xl hover:bg-white transition-all text-center shadow-lg shadow-danholt-gold/10"
                        >
                            Back to Login
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-widest text-[10px]">New Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-white/5 border border-white/10 px-4 py-3.5 rounded-xl text-white outline-none focus:border-danholt-gold/50 focus:ring-1 focus:ring-danholt-gold/50 transition-all placeholder:text-gray-600"
                                required
                                minLength={6}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-widest text-[10px]">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-white/5 border border-white/10 px-4 py-3.5 rounded-xl text-white outline-none focus:border-danholt-gold/50 focus:ring-1 focus:ring-danholt-gold/50 transition-all placeholder:text-gray-600"
                                required
                            />
                        </div>

                        {status?.type === 'error' && (
                            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-400 animate-in fade-in slide-in-from-top-1">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <p className="text-sm">{status.message}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="w-full py-4 bg-danholt-gold text-black font-bold rounded-xl hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-danholt-gold/10 flex items-center justify-center gap-2"
                        >
                            {isUpdating ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                'Update Password'
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}
