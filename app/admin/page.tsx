'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { ArrowLeft, LogOut, Eye, Trash2, CheckCircle, Clock, XCircle } from 'lucide-react'

interface Booking {
  id: string
  guest_name: string
  guest_email: string
  phone: string
  room_id: string
  check_in: string
  check_out: string
  guests: number
  total_amount: number
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showLoginForm, setShowLoginForm] = useState(true)
  const [stats, setStats] = useState({ total: 0, confirmed: 0, pending: 0, cancelled: 0 })

  // Simple password authentication
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'danholt2024'

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setShowLoginForm(false)
      setPassword('')
      fetchBookings()
    } else {
      alert('Invalid password')
      setPassword('')
    }
  }

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      const bookingsData = (data || []).map((b: any) => ({
        id: b.id,
        guest_name: b.guest_name,
        guest_email: b.guest_email,
        phone: b.phone,
        room_id: b.room_id,
        check_in: b.check_in,
        check_out: b.check_out,
        guests: b.guests,
        total_amount: b.total_amount || 0,
        status: b.status || 'pending',
        created_at: b.created_at
      }))

      setBookings(bookingsData)
      calculateStats(bookingsData)
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (data: Booking[]) => {
    const total = data.length
    const confirmed = data.filter(b => b.status === 'confirmed').length
    const pending = data.filter(b => b.status === 'pending').length
    const cancelled = data.filter(b => b.status === 'cancelled').length
    setStats({ total, confirmed, pending, cancelled })
  }

  const deleteBooking = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return

    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id)

      if (error) throw error
      setBookings(bookings.filter(b => b.id !== id))
    } catch (error) {
      console.error('Error deleting booking:', error)
      alert('Failed to delete booking')
    }
  }

  const updateStatus = async (id: string, status: 'pending' | 'confirmed' | 'cancelled') => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id)

      if (error) throw error
      setBookings(bookings.map(b => b.id === id ? { ...b, status } : b))
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Failed to update status')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setShowLoginForm(true)
    setPassword('')
    setBookings([])
  }

  if (showLoginForm && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-danholt-navy via-danholt-navy to-danholt-teal flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
            <h1 className="text-3xl font-serif text-white mb-2">Admin Dashboard</h1>
            <p className="text-white/60 mb-8">Enter password to access bookings</p>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-danholt-gold/50 focus:bg-white/20 transition-all"
              />
              <button
                type="submit"
                className="w-full bg-danholt-teal text-white py-3 rounded-lg font-bold hover:bg-danholt-teal/90 transition-all"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-danholt-navy via-danholt-navy to-danholt-teal p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-serif text-white">Bookings Dashboard</h1>
            <p className="text-white/60 mt-2">Manage all guest reservations</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 px-4 py-2 rounded-lg transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Bookings', value: stats.total, color: 'from-blue-500/20 to-blue-600/20', icon: '📊' },
            { label: 'Confirmed', value: stats.confirmed, color: 'from-green-500/20 to-green-600/20', icon: '✓' },
            { label: 'Pending', value: stats.pending, color: 'from-yellow-500/20 to-yellow-600/20', icon: '⏳' },
            { label: 'Cancelled', value: stats.cancelled, color: 'from-red-500/20 to-red-600/20', icon: '✕' }
          ].map((stat, i) => (
            <div key={i} className={`bg-gradient-to-br ${stat.color} backdrop-blur border border-white/10 rounded-xl p-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <span className="text-4xl">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-white">Loading bookings...</div>
          ) : bookings.length === 0 ? (
            <div className="p-8 text-center text-white/60">No bookings yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-white font-semibold text-sm">Guest Name</th>
                    <th className="px-6 py-4 text-left text-white font-semibold text-sm">Email</th>
                    <th className="px-6 py-4 text-left text-white font-semibold text-sm">Phone</th>
                    <th className="px-6 py-4 text-left text-white font-semibold text-sm">Check-in</th>
                    <th className="px-6 py-4 text-left text-white font-semibold text-sm">Check-out</th>
                    <th className="px-6 py-4 text-left text-white font-semibold text-sm">Amount</th>
                    <th className="px-6 py-4 text-left text-white font-semibold text-sm">Status</th>
                    <th className="px-6 py-4 text-left text-white font-semibold text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-white text-sm">{booking.guest_name}</td>
                      <td className="px-6 py-4 text-white/80 text-sm">{booking.guest_email}</td>
                      <td className="px-6 py-4 text-white/80 text-sm">{booking.phone}</td>
                      <td className="px-6 py-4 text-white/80 text-sm">{new Date(booking.check_in).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-white/80 text-sm">{new Date(booking.check_out).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-danholt-gold font-semibold text-sm">₦{booking.total_amount.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm">
                        <select
                          value={booking.status}
                          onChange={(e) => updateStatus(booking.id, e.target.value as any)}
                          className={`px-3 py-1 rounded-lg text-sm font-semibold cursor-pointer border-0 focus:outline-none ${
                            booking.status === 'confirmed'
                              ? 'bg-green-500/20 text-green-400'
                              : booking.status === 'pending'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => deleteBooking(booking.id)}
                          className="text-red-400 hover:text-red-300 transition-colors inline-flex items-center gap-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
