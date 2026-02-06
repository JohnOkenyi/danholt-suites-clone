
'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { login } from '@/app/actions/auth'
import { Lock } from 'lucide-react'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 bg-danholt-midnight text-white font-bold rounded-lg hover:bg-black transition-colors disabled:opacity-50"
    >
      {pending ? 'Accessing...' : 'Access Dashboard'}
    </button>
  )
}

export default function AdminLoginPage() {
  const [state, formAction] = useFormState(login, { error: '' })

  return (
    <div className="min-h-screen bg-danholt-midnight flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-danholt-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-danholt-gold" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-gray-500 text-sm mt-2">Danholt Suites Management</p>
        </div>

        <form action={formAction} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="admin@danholtsuites.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-danholt-gold focus:border-transparent outline-none transition-all text-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-danholt-gold focus:border-transparent outline-none transition-all text-black"
              required
            />
          </div>

          {state?.error && (
            <div className="bg-red-50 text-red-600 p-3 rounded text-sm text-center">
              {state.error}
            </div>
          )}

          <SubmitButton />
        </form>
      </div>
    </div>
  )
}
