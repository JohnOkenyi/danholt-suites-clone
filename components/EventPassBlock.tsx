'use client'

import { motion } from 'framer-motion'
import { Ticket, Briefcase } from 'lucide-react'

export default function EventPassBlock() {
    return (
        <section className="py-16 bg-white border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="bg-danholt-navy rounded-2xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Background Accents */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-danholt-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <div className="relative z-10 max-w-xl">
                        <span className="text-danholt-gold text-xs font-bold uppercase tracking-[0.2em] block mb-2">
                            Coming for an Event?
                        </span>
                        <h2 className="text-3xl font-serif text-white mb-4">
                            Unlock Tailored Rates
                        </h2>
                        <p className="text-white/60 mb-6 font-light">
                            Whether it’s a wedding, conference, or celebration, tell us what brings you to Danholt.
                        </p>

                        <div className="flex gap-4">
                            <div className="flex items-center gap-2 bg-white/5 py-2 px-3 rounded text-xs text-white/80 border border-white/10">
                                <Ticket className="w-3 h-3 text-danholt-gold" />
                                Wedding Guest Pass
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 py-2 px-3 rounded text-xs text-white/80 border border-white/10">
                                <Briefcase className="w-3 h-3 text-danholt-gold" />
                                Business Traveler
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 w-full md:w-auto flex-shrink-0 bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                        <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                            <label className="text-xs uppercase tracking-widest text-danholt-gold font-bold">Event or Venue Name</label>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="text"
                                    placeholder="e.g. Johnson Wedding"
                                    className="bg-black/20 border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-danholt-gold/50 min-w-[250px]"
                                />
                                <button className="bg-danholt-gold text-danholt-navy px-6 py-3 rounded font-bold uppercase text-xs tracking-widest hover:bg-white transition-colors">
                                    Unlock Rates
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
