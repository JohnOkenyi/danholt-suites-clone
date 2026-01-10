import Link from 'next/link'
import { Wifi, Zap, Utensils, Shield, MapPin, Star } from 'lucide-react'

export default function Home() {
  const amenities = [
    { icon: Wifi, title: 'Free WiFi', description: 'High-speed internet throughout' },
    { icon: Zap, title: '24/7 Power', description: 'Uninterrupted electricity' },
    { icon: Utensils, title: 'Fine Dining', description: 'Delicious cuisines served' },
    { icon: Shield, title: 'Secure', description: '24-hour security' },
    { icon: MapPin, title: 'Serene Location', description: 'Peaceful Jikwoyi area' },
  ]

  const rooms = [
    {
      id: '1',
      name: 'Deluxe',
      description: 'Elegantly furnished room with modern amenities',
      price: 15000,
      category: 'Best for Family',
      capacity: 2,
      bed: 'Queen Bed',
      size: 28,
      amenities: ['Free WiFi', '24/7 Power', 'Mini Bar', 'Breakfast'],
    },
    {
      id: '2',
      name: 'Executive Deluxe',
      description: 'Premium suite with dedicated workspace and extra living space',
      price: 20000,
      category: 'Best for Business',
      capacity: 2,
      bed: 'King Bed',
      size: 35,
      amenities: ['Free WiFi', '24/7 Power', 'Mini Bar', 'Breakfast'],
    },
  ]

  const stats = [
    { number: '500+', label: 'Conference Capacity' },
    { number: '24/7', label: 'Power Supply' },
    { number: '5-aside', label: 'Football Pitch' },
    { number: '100%', label: 'Satisfaction' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-dark via-gray-900 to-dark overflow-hidden">
        {/* Animated background effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gold rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-block px-4 py-2 bg-gold bg-opacity-20 rounded-full mb-6">
            <span className="text-gold text-sm font-semibold tracking-wider">WELCOME TO DANHOLT SUITES</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Your Home<br />
            <span className="text-gold">in Abuja</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Comfort, privacy, and convenience. Experience top-notch service at Danholt Suites – where every stay feels like coming home.
          </p>

          {/* Booking Widget */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Check-in</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Check-out</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Guests</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent">
                  <option>2 Guests</option>
                  <option>1 Guest</option>
                  <option>3 Guests</option>
                  <option>4 Guests</option>
                </select>
              </div>
              <div className="flex items-end">
                <Link 
                  href="/rooms"
                  className="w-full bg-gold hover:bg-opacity-90 text-white py-3 rounded-lg font-semibold text-center transition-all duration-200"
                >
                  Check Availability
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {amenities.map((amenity, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gold bg-opacity-10 rounded-full mb-4">
                  <amenity.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-lg font-semibold text-dark mb-2">{amenity.title}</h3>
                <p className="text-gray-600">{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold text-sm font-semibold tracking-wider uppercase">OUR ROOMS</span>
            <h2 className="text-4xl font-bold text-dark mt-2 mb-4">Luxurious Comfort Awaits</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Each room is thoughtfully designed to provide the perfect balance of comfort and elegance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {rooms.map((room) => (
              <div key={room.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="bg-gradient-to-br from-gold to-amber-600 h-48 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">{room.name}</span>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="inline-block px-3 py-1 bg-gold bg-opacity-10 text-gold text-xs font-semibold rounded-full mb-2">
                        {room.category}
                      </span>
                      <h3 className="text-2xl font-bold text-dark">{room.name}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">From</p>
                      <p className="text-3xl font-bold text-gold">₦{room.price.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">/night</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{room.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-dark">{room.capacity}</p>
                      <p className="text-xs text-gray-600">Guests</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-dark">{room.bed}</p>
                      <p className="text-xs text-gray-600">Bed Type</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-dark">{room.size}</p>
                      <p className="text-xs text-gray-600">m²</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {room.amenities.map((amenity, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {amenity}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <Link 
                      href={`/rooms/${room.id}`}
                      className="flex-1 border-2 border-gold text-gold hover:bg-gold hover:text-white py-2 rounded-lg font-semibold text-center transition-all duration-200"
                    >
                      View Details
                    </Link>
                    <Link 
                      href={`/rooms/${room.id}/book`}
                      className="flex-1 bg-gold hover:bg-opacity-90 text-white py-2 rounded-lg font-semibold text-center transition-all duration-200"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link 
              href="/rooms"
              className="inline-flex items-center px-8 py-3 border-2 border-gold text-gold hover:bg-gold hover:text-white rounded-full font-semibold transition-all duration-200"
            >
              View All Rooms
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-dark via-gray-900 to-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold text-sm font-semibold tracking-wider uppercase">THE EXPERIENCE</span>
            <h2 className="text-4xl font-bold text-white mt-2 mb-4">More Than Just a Stay</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From world-class sports facilities to fine dining and modern amenities, every aspect of Danholt Suites is designed for your comfort and convenience.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-5xl font-bold text-gold mb-2">{stat.number}</p>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-dark mb-6">Ready to Experience Danholt Suites?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Book your stay today and discover why guests love calling Danholt Suites their home in Abuja.
          </p>
          <Link 
            href="/rooms"
            className="inline-block bg-gold hover:bg-opacity-90 text-white px-12 py-4 rounded-full font-semibold text-lg transition-all duration-200"
          >
            Book Now
          </Link>
        </div>
      </section>
    </div>
  )
}
