export default function FacilitiesPage() {
  const facilities = [
    {
      name: 'Conference Hall',
      capacity: '500 people',
      hours: '8:00 AM - 10:00 PM',
      description: 'A spacious venue perfect for conferences, seminars, and large gatherings with up to 500 people.',
    },
    {
      name: '5-Aside Football Pitch',
      capacity: '10-20 players',
      hours: '6:00 AM - 10:00 PM',
      description: 'World-class mini stadium for football matches, complete with floodlights and premium turf.',
    },
    {
      name: 'Event Space',
      capacity: '200 guests',
      hours: '24 hours',
      description: 'Versatile space for weddings, parties, and special celebrations with customizable setup.',
    },
    {
      name: 'Meeting Room',
      capacity: '20 people',
      hours: '8:00 AM - 8:00 PM',
      description: 'Private meeting rooms equipped with modern tech for business meetings and presentations.',
    },
    {
      name: "Children's Playground",
      capacity: '30 children',
      hours: '8:00 AM - 6:00 PM',
      description: 'Safe and fun playground with various activities for children of all ages.',
    },
  ]

  return (
    <div className="min-h-screen">
      <section className="relative h-96 flex items-center justify-center bg-gradient-to-br from-dark via-gray-900 to-dark">
        <div className="relative z-10 text-center px-4">
          <span className="inline-block px-4 py-2 bg-gold bg-opacity-20 rounded-full mb-4">
            <span className="text-gold text-sm font-semibold tracking-wider">🏢 PREMIUM AMENITIES</span>
          </span>
          <h1 className="text-5xl font-bold text-white mb-4">Our Facilities</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            World-class amenities for work, play, and everything in between.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold text-sm font-semibold tracking-wider uppercase">EXPLORE</span>
            <h2 className="text-4xl font-bold text-dark mt-2 mb-4">Book Our Facilities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From conferences to celebrations, we have the perfect space for your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                <div className="bg-gradient-to-br from-gold to-amber-600 h-48 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold text-center px-4">{facility.name}</span>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-dark mb-4">{facility.name}</h3>
                  
                  <div className="space-y-2 mb-4 pb-4 border-b">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capacity:</span>
                      <span className="font-semibold text-dark">{facility.capacity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hours:</span>
                      <span className="font-semibold text-dark">{facility.hours}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{facility.description}</p>

                  <button className="w-full bg-gold hover:bg-opacity-90 text-white py-3 rounded-lg font-semibold transition-all">
                    Book This Facility
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
