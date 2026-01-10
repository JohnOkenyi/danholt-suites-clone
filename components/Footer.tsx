import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-gold">DANHOLT</span> SUITES
            </h3>
            <p className="text-gray-400">
              Your home in Abuja. Experience comfort, privacy, and convenience at Danholt Suites – where every stay feels like coming home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">QUICK LINKS</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="text-gray-400 hover:text-gold transition-colors">
                  Rooms
                </Link>
              </li>
              <li>
                <Link href="/restaurant" className="text-gray-400 hover:text-gold transition-colors">
                  Restaurant
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="text-gray-400 hover:text-gold transition-colors">
                  Facilities
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-4">CONTACT</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                <span className="text-gray-400">
                  #3 Iyabo Okeyode Street<br />
                  Beside Collinear Hospital<br />
                  Jikwoyi Phase 3, Abuja
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold" />
                <a href="tel:07046080351" className="text-gray-400 hover:text-gold transition-colors">
                  07046080351
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2026 Danholt Suites. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
