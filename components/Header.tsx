'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-700 
        ${scrolled
            ? 'py-4 bg-danholt-midnight/80 backdrop-blur-md border-b border-danholt-cold-white/5'
            : 'py-8 bg-transparent'
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-full px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="group relative z-50">
            <div className="flex items-center leading-none">
              <span className="text-xl font-serif font-bold text-danholt-cold-white tracking-wide">
                DANHOLT
              </span>
              <span className="text-xl font-serif font-bold text-danholt-gold tracking-wide ml-2">
                SUITE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {['Home', 'Rooms', 'Facilities', 'Dining', 'Contact'].map((item, i) => (
              <Link
                key={item}
                href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
                className="link-animated text-danholt-cold-white text-sm font-medium tracking-widest uppercase hover:text-danholt-gold transition-colors duration-300"
              >
                {item}
              </Link>
            ))}
            <Link
              href="/membership"
              className="text-danholt-gold text-xs font-bold uppercase tracking-widest hover:text-white transition-colors mr-4"
            >
              Join Privilege Club
            </Link>
            <Link
              href="/booking"
              className="btn-premium ml-4 px-8 py-3 rounded-full bg-danholt-gold text-danholt-midnight font-bold tracking-widest text-xs uppercase"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden z-50 text-danholt-cold-white space-y-2 group"
          >
            <div className="w-8 h-[1px] bg-current transition-all duration-300 group-hover:w-6 ml-auto" />
            <div className="w-8 h-[1px] bg-current transition-all duration-300" />
            <div className="w-8 h-[1px] bg-current transition-all duration-300 group-hover:w-4 ml-auto" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 bg-danholt-midnight flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 pointer-events-none" />

            {['Home', 'Rooms', 'Facilities', 'Dining', 'Contact'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-serif text-danholt-cold-white hover:text-danholt-gold transition-colors tracking-widest"
              >
                {item}
              </Link>
            ))}
            <Link
              href="/booking"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-8 px-10 py-4 border border-danholt-gold text-danholt-gold font-bold uppercase tracking-widest text-sm hover:bg-danholt-gold hover:text-danholt-midnight transition-all duration-300"
            >
              Book Your Stay
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
