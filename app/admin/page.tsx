'use client'

import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { login, requestPasswordReset } from '@/app/actions/auth'
import { Lock, Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'

function SubmitButton({ label = 'Access Dashboard' }: { label?: string }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-4 bg-danholt-gold text-black font-bold rounded-xl hover:bg-white transition-all disabled:opacity-50 shadow-lg shadow-danholt-gold/10 flex items-center justify-center gap-2"
    >
      {pending ? (
        <>
          <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
          Processing...
        </>
      ) : label}
    </button>
  )
}

export default function AdminLoginPage() {
  const [state, formAction] = useFormState(login, { error: '' })
  const [view, setView] = useState<'login' | 'forgot'>('login')
  const [resetEmail, setResetEmail] = useState('')
  const [resetStatus, setResetStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [isResetting, setIsResetting] = useState(false)

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsResetting(true)
    setResetStatus(null)

    const result = await requestPasswordReset(resetEmail)
    setIsResetting(false)

    if (result.success) {
      setResetStatus({ type: 'success', message: 'If you are an authorized administrator, a reset link has been sent to your email.' })
    } else {
      setResetStatus({ type: 'error', message: result.error || 'Failed to send reset email.' })
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 selection:bg-danholt-gold selection:text-black">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md relative overflow-hidden animate-in fade-in zoom-in-95 duration-500">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-danholt-gold to-transparent opacity-50" />

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-danholt-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-danholt-gold/20">
            <Lock className="w-8 h-8 text-danholt-gold" />
          </div>
          <h1 className="text-2xl font-bold text-white font-playfair tracking-wide">
            {view === 'login' ? 'Admin Login' : 'Reset Access'}
          </h1>
          <p className="text-gray-400 text-sm mt-2">Danholt Suites Management</p>
        </div>

        {view === 'login' ? (
          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Official Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-danholt-gold transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="admin@danholtsuites.com"
                  className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-3.5 rounded-xl text-white outline-none focus:border-danholt-gold/50 focus:ring-1 focus:ring-danholt-gold/50 transition-all placeholder:text-gray-600"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Secret Key</label>
                <button
                  type="button"
                  onClick={() => setView('forgot')}
                  className="text-[10px] text-danholt-gold hover:text-white transition-colors"
                >
                  Forgot Access?
                </button>
              </div>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 px-4 py-3.5 rounded-xl text-white outline-none focus:border-danholt-gold/50 focus:ring-1 focus:ring-danholt-gold/50 transition-all placeholder:text-gray-600"
                required
              />
            </div>

            {state?.error && (
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-400 animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-xs font-medium">{state.error}</p>
              </div>
            )}

            <div className="pt-2">
              <SubmitButton />
            </div>

            <div className="text-center">
              <Link href="/" className="text-xs text-gray-500 hover:text-white transition-colors">
                ← Return to Public Site
              </Link>
            </div>
          </form>
        ) : (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            {resetStatus?.type === 'success' ? (
              <div className="space-y-6">
                <div className="bg-green-500/10 border border-green-500/20 p-5 rounded-xl flex items-start gap-4 text-green-400">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium leading-relaxed">{resetStatus.message}</p>
                </div>
                <button
                  onClick={() => setView('login')}
                  className="w-full py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Administrator Email</label>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3.5 rounded-xl text-white outline-none focus:border-danholt-gold/50 focus:ring-1 focus:ring-danholt-gold/50 transition-all placeholder:text-gray-600"
                    required
                  />
                </div>

                {resetStatus?.type === 'error' && (
                  <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-400">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-xs font-medium">{resetStatus.message}</p>
                  </div>
                )}

                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={isResetting}
                    className="w-full py-4 bg-danholt-gold text-black font-bold rounded-xl hover:bg-white transition-all disabled:opacity-50 shadow-lg shadow-danholt-gold/10 flex items-center justify-center gap-2"
                  >
                    {isResetting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Send Reset Link'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setView('login')}
                    className="w-full py-4 bg-transparent text-gray-500 hover:text-white transition-all text-xs font-bold uppercase tracking-widest"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
