'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-danholt-obsidian text-white pt-24 pb-12">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-24 mb-24">

          {/* Brand Column with Gold Line */}
          <div className="lg:col-span-1 relative pl-6">
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-danholt-gold h-32"></div>
            <div className="relative border border-danholt-gold/80 px-6 py-3 mb-8 inline-block">
              <div className="flex flex-col items-center">
                <span className="text-xl font-serif font-bold text-danholt-gold tracking-[0.2em] leading-none">
                  DANHOLT
                </span>
                <div className="absolute -bottom-[11px] left-1/2 -translate-x-1/2">
                  <div className="bg-[#050505] px-2">
                    <span className="text-[10px] font-serif font-medium tracking-[0.6em] text-danholt-gold uppercase whitespace-nowrap">
                      SUITES
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-400 font-light leading-relaxed text-sm max-w-xs">
              Where every moment is crafted with intention. Experience luxury redefined.
            </p>
          </div>

          {/* Links Column - Explore */}
          <div className="lg:pl-8">
            <h4 className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-8">EXPLORE</h4>
            <ul className="space-y-4">
              {['Home', 'Rooms', 'Facilities', 'Dining', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} className="text-gray-300 hover:text-danholt-gold transition-colors duration-300 text-sm font-light">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column - Services */}
          <div>
            <h4 className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-8">SERVICES</h4>
            <ul className="space-y-4">
              {['Room Reservations', 'Restaurant Booking', 'Facility Rentals'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-300 hover:text-danholt-gold transition-colors duration-300 text-sm font-light">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-8">CONTACT</h4>
            <div className="space-y-4 text-sm font-light text-gray-300">
              <p>#3 Iyabo, Obeyode Street<br />Dogbano, Jikwoyi, Abuja</p>
              <p className="pt-2">0704 608 0351</p>
              <p className="pt-2 hover:text-danholt-gold cursor-pointer transition-colors">reservations@danholt.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-500 font-light">&copy; 2026 Danholt Suites. All rights reserved.</p>

          <div className="flex gap-8 text-xs text-gray-500 font-light">
            <Link href="#" className="hover:text-danholt-gold transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-danholt-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
