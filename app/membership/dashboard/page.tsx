'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Crown, History, Star, User, Search, Loader2 } from 'lucide-react'
import Image from 'next/image'
import PremiumButton from '@/components/ui/PremiumButton'
import { createClient } from '@/utils/supabase/client'

export default function MemberDashboard() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [memberData, setMemberData] = useState<any>(null)
    const [bookings, setBookings] = useState<any[]>([])
    const [error, setError] = useState('')

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setIsLoading(true)
        setError('')
        const supabase = createClient()

        try {
            // Find membership request
            const { data: member, error: memberErr } = await supabase
                .from('membership_requests')
                .select('*')
                .eq('email', email)
                .single()

            if (memberErr || !member) {
                setError("No active membership found for this email. Have you joined the Privilege Club?")
                setMemberData(null)
            } else {
                setMemberData(member)

                // Fetch bookings for this email
                const { data: userBookings } = await supabase
                    .from('bookings')
                    .select('*, rooms(name)')
                    .eq('guest_email', email)
                    .order('check_in', { ascending: false })

                setBookings(userBookings || [])
            }
        } catch (err) {
            setError("Something went wrong. Please try again later.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-20 px-4 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-danholt-gold/5 blur-[120px] rounded-full -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-danholt-gold/5 blur-[120px] rounded-full -ml-64 -mb-64" />

            <div className="max-w-6xl mx-auto relative z-10">
                <header className="text-center mb-16">
                    <span className="text-danholt-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">
                        Privilege Club
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif mb-6">Your Sanctuary</h1>
                    <p className="text-white/40 max-w-2xl mx-auto text-lg font-light">
                        Manage your exclusive preferences and revisit your timeless stays at Danholt Suites.
                    </p>
                </header>

                {!memberData ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-md mx-auto"
                    >
                        <form onSubmit={handleSearch} className="space-y-6">
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-danholt-gold transition-colors" size={20} />
                                <input
                                    type="email"
                                    placeholder="Enter your registered email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full h-16 pl-14 pr-6 bg-white/[0.03] border border-white/10 rounded-xl focus:border-danholt-gold focus:bg-white/[0.05] outline-none transition-all placeholder:text-white/20 font-light"
                                    required
                                />
                            </div>
                            <PremiumButton
                                variant="primary"
                                className="w-full h-16 text-lg"
                                disabled={isLoading}
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : "Access Dashboard"}
                            </PremiumButton>
                            {error && <p className="text-red-400 text-center text-sm font-light italic">{error}</p>}
                        </form>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Member Sidebar */}
                        <motion.aside
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-1 space-y-8"
                        >
                            <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl relative overflow-hidden group">
                                <Crown className="absolute -top-4 -right-4 w-24 h-24 text-danholt-gold/10 -rotate-12 transition-transform group-hover:scale-110" />
                                <div className="relative z-10 text-center">
                                    <div className="w-20 h-20 rounded-full bg-danholt-gold/20 flex items-center justify-center text-danholt-gold text-3xl font-serif mx-auto mb-6 border border-danholt-gold/30">
                                        {memberData.full_name?.[0]}
                                    </div>
                                    <h2 className="text-2xl font-serif mb-1">{memberData.full_name}</h2>
                                    <div className="flex items-center justify-center gap-2 text-danholt-gold text-xs font-bold uppercase tracking-widest mb-6">
                                        <Star size={12} fill="currentColor" />
                                        {memberData.membership_tier} Member
                                    </div>
                                    <div className="space-y-4 pt-6 border-t border-white/10 text-left">
                                        <div className="flex items-center gap-3 text-sm text-white/60">
                                            <User size={14} className="text-danholt-gold" />
                                            {memberData.email}
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-white/60">
                                            <History size={14} className="text-danholt-gold" />
                                            Joined {new Date(memberData.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setMemberData(null)}
                                className="w-full py-4 text-white/40 hover:text-white transition-colors text-xs uppercase tracking-widest"
                            >
                                Switch Account
                            </button>
                        </motion.aside>

                        {/* Booking History */}
                        <motion.section
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-2 space-y-8"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-serif">Stay History</h3>
                                <span className="text-white/20 text-xs uppercase tracking-widest font-bold">
                                    {bookings.length} reservations
                                </span>
                            </div>

                            <div className="space-y-4">
                                {bookings.length === 0 ? (
                                    <div className="p-12 text-center rounded-2xl border border-dashed border-white/10 text-white/20 bg-white/[0.01]">
                                        <History size={40} className="mx-auto mb-4 opacity-50" />
                                        <p className="font-light italic">You haven&apos;t stayed with us yet. Your future luxury awaits.</p>
                                    </div>
                                ) : (
                                    bookings.map((booking) => (
                                        <div
                                            key={booking.id}
                                            className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-danholt-gold/30 transition-all group flex items-center justify-between"
                                        >
                                            <div className="flex gap-6">
                                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-900 border border-white/10">
                                                    <Image
                                                        src={`/images/room-${booking.rooms?.name?.toLowerCase().includes('deluxe') ? 'deluxe' : 'standard'}.jpg`}
                                                        alt="Room"
                                                        width={64}
                                                        height={64}
                                                        className="object-cover w-full h-full opacity-60 group-hover:opacity-100 transition-opacity"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-medium mb-1">{booking.rooms?.name}</h4>
                                                    <div className="text-xs text-white/40 font-light flex items-center gap-4">
                                                        <span>{new Date(booking.check_in).toLocaleDateString()} — {new Date(booking.check_out).toLocaleDateString()}</span>
                                                        <span className="flex items-center gap-1">
                                                            <div className={`w-1.5 h-1.5 rounded-full ${booking.status === 'confirmed' ? 'bg-green-500' :
                                                                booking.status === 'cancelled' ? 'bg-red-500' : 'bg-yellow-500'
                                                                }`} />
                                                            {booking.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-danholt-gold font-medium mb-1">₦{booking.total_price?.toLocaleString()}</div>
                                                <div className="text-[10px] text-white/20 uppercase tracking-widest">Confirmed</div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </motion.section>
                    </div>
                )}
            </div>
        </main>
    )
}
