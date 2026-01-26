import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { ArrowLeft, LogOut } from 'lucide-react'
import { logout } from '@/app/actions/auth'
import {
    deleteBooking,
    deleteDiningReservation,
    deleteFacilityBooking,
    deleteMembershipRequest,
    deleteContactMessage
} from '@/app/actions/admin'
import DeleteButton from '@/components/admin/DeleteButton'
import RealtimeBookingsListener from '@/components/admin/RealtimeBookingsListener'

async function getBookings() {
    const supabase = createClient()

    // Fetch Room Bookings
    const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select(`
            *,
            rooms (name)
        `)
        .order('created_at', { ascending: false })

    // Fetch Contact Messages
    const { data: messages, error: messagesError } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

    // Fetch Membership Requests
    const { data: membership, error: membershipError } = await supabase
        .from('membership_requests')
        .select('*')
        .order('created_at', { ascending: false })

    // Fetch All Reservations (Dining & Facilities)
    const { data: allReservations, error: diningError } = await supabase
        .from('restaurant_reservations')
        .select('*')
        .order('created_at', { ascending: false })

    // SPLIT LOGIC: Facilities use the same table but have "Facility:" in special_requests
    const dining = allReservations?.filter((r: any) => !r.special_requests?.startsWith('Facility:')) || []
    const facilities = allReservations?.filter((r: any) => r.special_requests?.startsWith('Facility:')) || []

    return {
        bookings: bookings || [],
        dining: dining,
        facilities: facilities,
        messages: messages || [],
        membership: membership || [],
        errors: {
            bookings: bookingsError,
            dining: diningError,
            messages: messagesError,
            membership: membershipError
        }
    }
}

export default async function AdminDashboard() {
    const { bookings, dining, facilities, messages, membership, errors } = await getBookings()

    // Get Today's Date (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0]

    // Aggregate Today's Agenda
    const todaysAgenda = [
        ...bookings.filter((b: any) => b.check_in === today).map((b: any) => ({ ...b, type: 'Check-in', time: '14:00', title: `Guest Check-in: ${b.guest_name}`, contact: b.guest_phone })),
        ...dining.filter((d: any) => d.reservation_date === today).map((d: any) => ({ ...d, type: 'Dining', time: d.reservation_time, title: `Dining: ${d.guest_name} (${d.guests} ppl)`, contact: d.guest_phone })),
        ...facilities.filter((f: any) => f.reservation_date === today).map((f: any) => ({ ...f, type: 'Event', time: '09:00', title: `Event: ${f.guest_name}`, contact: f.guest_phone }))
    ].sort((a, b) => a.time.localeCompare(b.time))


    return (
        <main className="min-h-screen bg-[#020617] text-white p-2 md:p-8 font-sans selection:bg-danholt-gold selection:text-black overflow-x-hidden">
            {/* Background Gradients for 'World Class' feel */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />
            </div>

            <RealtimeBookingsListener />

            <div className="relative z-10 max-w-7xl mx-auto space-y-6 md:space-y-8">
                {/* Luxury Header - Mobile Optimized */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-2xl gap-4">
                    <div className="flex items-center gap-6">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white font-playfair tracking-wide">Danholt Suites</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                <p className="text-gray-400 text-xs uppercase tracking-[0.2em] font-medium">Command Center</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                        <Link
                            href="/"
                            className="flex-1 md:flex-none justify-center group flex items-center px-5 py-2.5 text-sm text-gray-400 hover:text-white transition-all bg-white/[0.02] hover:bg-white/[0.08] border border-white/[0.05] rounded-xl"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Site
                        </Link>
                        <form action={logout} className="flex-1 md:flex-none">
                            <button className="w-full flex justify-center items-center bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 hover:border-red-500 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-red-900/20">
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </button>
                        </form>
                    </div>
                </div>

                {Object.values(errors).some(e => e) && (
                    <div className="bg-red-950/30 border border-red-500/30 text-red-200 p-4 rounded-xl backdrop-blur-md">
                        <p className="font-bold flex items-center gap-2 text-red-400"><span className="text-xl">⚠️</span> System Alert</p>
                        <div className="text-sm mt-2 space-y-1 opacity-80 pl-8">
                            {errors.bookings && <p>Bookings: {errors.bookings.message}</p>}
                            {errors.dining && <p>Dining: {errors.dining.message}</p>}
                            {errors.messages && <p>Messages: {errors.messages.message}</p>}
                            {errors.membership && <p>Membership: {errors.membership.message}</p>}
                        </div>
                    </div>
                )}

                {/* KPI Metrics - Glass Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
                    {[
                        { label: 'Rooms Booked', count: bookings.length, color: 'text-danholt-gold', bg: 'from-danholt-gold/20 to-transparent' },
                        { label: 'Dining Reserved', count: dining.length, color: 'text-orange-400', bg: 'from-orange-500/20 to-transparent' },
                        { label: 'Events / Facility', count: facilities.length, color: 'text-teal-400', bg: 'from-teal-500/20 to-transparent' },
                        { label: 'Members', count: membership.length, color: 'text-purple-400', bg: 'from-purple-500/20 to-transparent' },
                        { label: 'Inbox', count: messages.length, color: 'text-blue-400', bg: 'from-blue-500/20 to-transparent' },
                    ].map((kpi) => (
                        <div key={kpi.label} className="relative group overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-4 md:p-5 transition-all hover:bg-white/[0.04]">
                            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${kpi.bg} opacity-20 rounded-bl-full group-hover:opacity-30 transition-opacity`} />
                            <div className={`text-2xl md:text-3xl font-bold ${kpi.color} font-playfair relative z-10`}>{kpi.count}</div>
                            <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-medium relative z-10 group-hover:text-gray-300 transition-colors">{kpi.label}</div>
                        </div>
                    ))}
                </div>

                {/* TODAY'S AGENDA */}
                <section className="bg-gradient-to-br from-blue-900/10 to-purple-900/10 border border-white/[0.08] rounded-2xl overflow-hidden backdrop-blur-xl">
                    <div className="p-6 md:p-8 border-b border-white/[0.08] flex justify-between items-center">
                        <h2 className="text-xl font-playfair font-bold text-white flex items-center gap-3">
                            <span className="text-2xl">📅</span>
                            Today&apos;s Agenda
                        </h2>
                        <span className="text-xs font-mono text-blue-300 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                    </div>
                    <div className="p-6">
                        {todaysAgenda.length === 0 ? (
                            <div className="text-center p-8 text-gray-500 italic">No scheduled activities for today.</div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {todaysAgenda.map((item: any, idx: number) => (
                                    <div key={`${item.id}-${idx}`} className="bg-white/[0.03] p-4 rounded-xl border border-white/[0.05] flex items-start gap-4 hover:bg-white/[0.15] hover:border-white/20 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 group cursor-default">
                                        <div className={`
                                            w-12 h-12 rounded-lg flex items-center justify-center text-xs font-bold
                                            ${item.type === 'Check-in' ? 'bg-danholt-gold/20 text-danholt-gold group-hover:bg-danholt-gold group-hover:text-black' :
                                                item.type === 'Dining' ? 'bg-orange-500/20 text-orange-400 group-hover:bg-orange-500 group-hover:text-white' :
                                                    'bg-teal-500/20 text-teal-400 group-hover:bg-teal-500 group-hover:text-white'}
                                            transition-colors
                                        `}>
                                            {item.time}
                                        </div>
                                        <div>
                                            <div className="text-xs uppercase tracking-wider opacity-60 font-semibold mb-1 group-hover:text-white group-hover:opacity-100 transition-all">{item.type}</div>
                                            <div className="font-bold text-white mb-1 group-hover:text-white group-hover:scale-105 origin-left transition-transform">{item.guest_name}</div>
                                            {item.type === 'Dining' && <div className="text-xs text-gray-400">{item.guests} Guests</div>}
                                            {item.special_requests && <div className="text-xs text-gray-500 italic mt-2 line-clamp-1">&quot;{item.special_requests}&quot;</div>}
                                            <div className="mt-2 flex gap-2">
                                                {item.guest_phone && (
                                                    <a href={`tel:${item.guest_phone}`} className="text-[10px] bg-white/5 hover:bg-white/10 px-2 py-1 rounded text-gray-300 transition-colors">
                                                        📞 {item.guest_phone}
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* 1. ROOM BOOKINGS - Premium Table */}
                <section className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl">
                    <div className="p-6 md:p-8 border-b border-white/[0.08] flex justify-between items-center bg-gradient-to-r from-white/[0.02] to-transparent">
                        <div className="flex items-center gap-4">
                            <div>
                                <h2 className="text-lg md:text-xl font-playfair font-bold text-danholt-gold">Room Reservations</h2>
                                <p className="text-xs text-blue-400 mt-0.5">Live booking data</p>
                            </div>
                        </div>
                        <span className="px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-danholt-gold/10 text-[10px] md:text-xs text-danholt-gold border border-danholt-gold/20 font-mono">
                            {bookings.length} Records
                        </span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm min-w-[800px] md:min-w-0">
                            <thead className="bg-black/20 text-[10px] uppercase tracking-[0.15em] text-blue-300/70 font-semibold">
                                <tr>
                                    <th className="p-4 md:p-6 font-medium">Guest Identity</th>
                                    <th className="p-4 md:p-6 font-medium">Suite Selection</th>
                                    <th className="p-4 md:p-6 font-medium">Stay Window</th>
                                    <th className="p-4 md:p-6 font-medium">Financials</th>
                                    <th className="p-4 md:p-6 font-medium">State</th>
                                    <th className="p-4 md:p-6 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.04]">
                                {bookings.length === 0 ? (
                                    <tr><td colSpan={6} className="p-16 text-center text-gray-600 italic">No bookings found in the system.</td></tr>
                                ) : (
                                    bookings.map((booking: any) => (
                                        <tr key={booking.id} className="group hover:bg-white/[0.15] transition-all duration-200">
                                            <td className="p-4 md:p-6">
                                                <div className="font-bold text-danholt-gold group-hover:text-white group-hover:scale-105 origin-left transition-all text-base">{booking.guest_name}</div>
                                                <div className="text-blue-300 text-xs mt-1 font-mono opacity-80 group-hover:text-blue-100 group-hover:opacity-100">{booking.guest_email}</div>
                                            </td>
                                            <td className="p-4 md:p-6">
                                                <span className="text-purple-200 font-medium font-playfair group-hover:text-white group-hover:font-bold transition-all">
                                                    {booking.rooms?.name || 'Unknown Room'}
                                                </span>
                                            </td>
                                            <td className="p-4 md:p-6">
                                                <div className="text-teal-300 font-mono text-xs bg-teal-900/20 inline-block px-2 py-1 rounded border border-teal-500/10 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                                                    {new Date(booking.check_in).toLocaleDateString()}
                                                </div>
                                                <span className="text-gray-600 mx-2 group-hover:text-white">→</span>
                                                <div className="text-teal-300 font-mono text-xs bg-teal-900/20 inline-block px-2 py-1 rounded border border-teal-500/10 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                                                    {new Date(booking.check_out).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="p-4 md:p-6 font-mono text-emerald-400 font-bold group-hover:text-emerald-300 text-base">
                                                {booking.total_price ? '₦' + Number(booking.total_price).toLocaleString() : '-'}
                                            </td>
                                            <td className="p-4 md:p-6">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                                                    ${booking.status === 'confirmed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                                        booking.status === 'cancelled' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                                            'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}
                                                `}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${booking.status === 'confirmed' ? 'bg-green-400' :
                                                        booking.status === 'cancelled' ? 'bg-red-400' : 'bg-yellow-400'
                                                        }`}></span>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="p-4 md:p-6 text-right">
                                                <div className="flex justify-end">
                                                    <DeleteButton
                                                        id={booking.id}
                                                        itemName="Booking"
                                                        deleteAction={deleteBooking}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* 2. DINING RESERVATIONS */}
                    <section className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden backdrop-blur-xl">
                        <div className="p-6 md:p-8 border-b border-white/[0.08] bg-gradient-to-r from-orange-500/[0.05] to-transparent">
                            <h2 className="text-lg font-playfair font-bold text-orange-400 flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"></span>
                                Dining Concierge
                            </h2>
                        </div>
                        {/* Mobile: Full Height, Desktop: Fixed Height Scroll */}
                        <div className="md:max-h-[400px] md:overflow-y-auto">
                            <table className="w-full text-left text-sm min-w-[500px] md:min-w-0">
                                <tbody className="divide-y divide-white/[0.04]">
                                    {dining.length === 0 ? (
                                        <tr><td className="p-12 text-center text-gray-600">No dining bookings.</td></tr>
                                    ) : dining.map((res: any) => (
                                        <tr key={res.id} className="group hover:bg-white/[0.15] transition-all duration-200">
                                            <td className="p-5">
                                                <div className="text-orange-200 font-medium group-hover:text-white group-hover:scale-105 origin-left transition-all">{res.reservation_time}</div>
                                                <div className="text-[10px] text-orange-500/70 uppercase tracking-wider mt-1 group-hover:text-orange-300">{new Date(res.reservation_date).toLocaleDateString()}</div>
                                            </td>
                                            <td className="p-5">
                                                <div className="text-white font-medium group-hover:text-orange-100 font-bold">{res.guest_name}</div>
                                                <div className="text-[10px] text-orange-400 font-bold mt-1 bg-orange-500/10 inline-block px-1.5 py-0.5 rounded border border-orange-500/20 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                                    {res.guests} Guests
                                                </div>
                                                <div className="mt-1 space-y-0.5 group-hover:opacity-100 opacity-80">
                                                    <div className="text-xs text-blue-200/60 font-mono tracking-tight group-hover:text-blue-100">{res.guest_email}</div>
                                                    <div className="text-xs text-blue-200/60 font-mono tracking-tight group-hover:text-blue-100">{res.guest_phone}</div>
                                                </div>
                                            </td>
                                            <td className="p-5 text-xs text-gray-400 italic font-serif group-hover:text-gray-200">
                                                &quot;{res.special_requests || 'No specific requests'}&quot;
                                            </td>
                                            <td className="p-5 text-right">
                                                <div className="flex justify-end">
                                                    <DeleteButton
                                                        id={res.id}
                                                        itemName="Reservation"
                                                        deleteAction={deleteDiningReservation}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* 3. FACILITY BOOKINGS */}
                    <section className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden backdrop-blur-xl">
                        <div className="p-6 md:p-8 border-b border-white/[0.08] bg-gradient-to-r from-teal-500/[0.05] to-transparent">
                            <h2 className="text-lg font-playfair font-bold text-teal-400 flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]"></span>
                                Events & Facilities
                            </h2>
                        </div>
                        {/* Mobile: Full Height, Desktop: Fixed Height Scroll */}
                        <div className="md:max-h-[400px] md:overflow-y-auto">
                            <table className="w-full text-left text-sm min-w-[500px] md:min-w-0">
                                <tbody className="divide-y divide-white/[0.04]">
                                    {facilities.length === 0 ? (
                                        <tr><td className="p-12 text-center text-gray-600">No event bookings.</td></tr>
                                    ) : facilities.map((res: any) => {
                                        const details = res.special_requests?.replace('Facility:', '') || '';
                                        return (
                                            <tr key={res.id} className="group hover:bg-white/[0.15] transition-all duration-200">
                                                <td className="p-5">
                                                    <div className="text-teal-200 font-medium group-hover:text-white group-hover:scale-105 origin-left transition-all">{new Date(res.reservation_date).toLocaleDateString()}</div>
                                                    <div className="text-[10px] text-teal-500/70 font-bold mt-1 uppercase tracking-wider group-hover:text-teal-300">Scheduled</div>
                                                </td>
                                                <td className="p-5">
                                                    <div className="text-white font-medium group-hover:text-teal-100 font-bold">{res.guest_name}</div>
                                                    <div className="mt-1 space-y-0.5 group-hover:opacity-100 opacity-80">
                                                        <div className="text-xs text-blue-200/60 font-mono tracking-tight group-hover:text-blue-100">{res.guest_email}</div>
                                                        <div className="text-xs text-blue-200/60 font-mono tracking-tight group-hover:text-blue-100">{res.guest_phone}</div>
                                                    </div>
                                                </td>
                                                <td className="p-5 text-xs text-gray-400 max-w-[200px] group-hover:text-gray-200">
                                                    {details}
                                                </td>
                                                <td className="p-5 text-right">
                                                    <div className="flex justify-end">
                                                        <DeleteButton
                                                            id={res.id}
                                                            itemName="Event"
                                                            deleteAction={deleteFacilityBooking}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>

                {/* 4. OTHER LISTS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <section className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:border-purple-500/30 transition-colors">
                        <h3 className="text-[10px] font-bold text-purple-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                            New Memberships
                        </h3>
                        <div className="space-y-4">
                            {membership.slice(0, 5).map((m: any) => (
                                <div key={m.id} className="flex justify-between items-center text-sm p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.15] transition-all duration-200 border border-transparent hover:border-white/20 hover:shadow-lg hover:scale-[1.02] group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center text-purple-300 text-xs font-bold border border-purple-500/30 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                            {m.full_name?.[0]}
                                        </div>
                                        <div>
                                            <span className="text-purple-100 font-medium block group-hover:text-white group-hover:font-bold transition-colors">{m.full_name}</span>
                                            <span className="text-purple-300/50 text-[10px] block group-hover:text-purple-200">{m.email}</span>
                                            <span className="text-purple-300/50 text-[10px] block group-hover:text-purple-200">{m.phone}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="px-2.5 py-1 rounded text-[10px] uppercase font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20 group-hover:bg-purple-500 group-hover:text-white transition-colors">{m.membership_tier}</span>
                                        <DeleteButton
                                            id={m.id}
                                            itemName="Member"
                                            deleteAction={deleteMembershipRequest}
                                        />
                                    </div>
                                </div>
                            ))}
                            {membership.length === 0 && <p className="text-xs text-gray-600 italic">No new members.</p>}
                        </div>
                    </section>

                    <section className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:border-blue-500/30 transition-colors">
                        <h3 className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                            Recent Messages
                        </h3>
                        <div className="space-y-4">
                            {messages.slice(0, 5).map((m: any) => (
                                <div key={m.id} className="text-sm p-4 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.15] hover:border-white/20 transition-all duration-200 relative group hover:scale-[1.02] hover:shadow-lg">
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <DeleteButton
                                            id={m.id}
                                            itemName="Message"
                                            deleteAction={deleteContactMessage}
                                        />
                                    </div>
                                    <div className="flex justify-between text-[10px] text-gray-500 mb-2 uppercase tracking-wider font-medium group-hover:text-gray-300">
                                        <span className="text-blue-300 group-hover:text-white font-bold transition-colors">
                                            {m.name}
                                            <span className="block text-[8px] text-blue-400/50 lowercase mt-0.5 group-hover:text-blue-200">{m.email}</span>
                                        </span>
                                        <span className="text-blue-200/50 group-hover:text-blue-100">{new Date(m.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div className="text-white font-medium truncate opacity-90 pr-8 group-hover:opacity-100 group-hover:text-white">{m.subject}</div>
                                    <div className="text-xs text-gray-400 truncate mt-1 pr-8 group-hover:text-gray-200">{m.message}</div>
                                </div>
                            ))}
                            {messages.length === 0 && <p className="text-xs text-gray-600 italic">Inbox empty.</p>}
                        </div>
                    </section>
                </div>

            </div>
        </main>
    )
}
