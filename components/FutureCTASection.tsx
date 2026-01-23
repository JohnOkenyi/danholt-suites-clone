'use client'

import React from 'react'

export default function FutureCTASection() {
    return (
        <section className="relative w-full min-h-[50vh] flex items-center justify-center bg-[#020617] text-white overflow-hidden py-20 px-6 font-sans">
            {/* Accent Line */}
            <div className="absolute left-0 top-0 w-1 h-full bg-danholt-gold z-0" />

            {/* Content */}
            <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight mb-12 tracking-wide text-white">
                    The future of hospitality isn&apos;t impersonal.<br />
                    <span className="text-white/60">It&apos;s human.</span>
                </h1>

                <a
                    href="/booking"
                    className="inline-block w-full sm:w-auto px-8 py-4 bg-danholt-gold text-danholt-midnight font-bold text-base md:text-lg rounded-full shadow-lg hover:bg-[#b8975a] hover:scale-105 transition-all duration-300"
                >
                    Book Your Stay
                </a>
            </div>

            {/* Chat Icon - Fixed Position */}
            {/* <div className="fixed bottom-10 right-10 w-16 h-16 bg-danholt-gold rounded-full flex items-center justify-center cursor-pointer shadow-xl z-50 hover:scale-110 transition-transform hidden md:flex">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-white">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
            </div> */}
        </section>
    )
}
