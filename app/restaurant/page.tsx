'use client'

import { useState } from 'react'

export default function RestaurantPage() {
  const [activeCategory, setActiveCategory] = useState('mains')

  const menuItems = {
    mains: [
      { name: 'Jollof Rice', description: 'Signature Nigerian jollof rice with chicken', price: 2500, popular: true },
      { name: 'Pounded Yam & Egusi', description: 'Traditional pounded yam with egusi soup', price: 3000, popular: true },
      { name: 'Fried Rice', description: 'Nigerian-style fried rice with vegetables', price: 2500, popular: false },
      { name: 'Grilled Fish', description: 'Whole grilled tilapia with sides', price: 4000, popular: false },
    ],
  }

  const categories = [
    { id: 'starters', label: 'Starters' },
    { id: 'mains', label: 'Mains' },
    { id: 'sides', label: 'Sides' },
    { id: 'drinks', label: 'Drinks' },
    { id: 'desserts', label: 'Desserts' },
  ]

  const currentItems = menuItems[activeCategory as keyof typeof menuItems] || []

  return (
    <div className="min-h-screen">
      <section className="relative h-96 flex items-center justify-center bg-gradient-to-br from-dark via-gray-900 to-dark">
        <div className="relative z-10 text-center px-4">
          <span className="inline-block px-4 py-2 bg-gold bg-opacity-20 rounded-full mb-4">
            <span className="text-gold text-sm font-semibold tracking-wider">🍽️ FINE DINING</span>
          </span>
          <h1 className="text-5xl font-bold text-white mb-4">Our Restaurant</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Indulge in delicious Nigerian cuisines and exotic drinks, prepared fresh daily.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold text-sm font-semibold tracking-wider uppercase">CULINARY DELIGHTS</span>
            <h2 className="text-4xl font-bold text-dark mt-2 mb-4">Explore Our Menu</h2>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeCategory === category.id ? 'bg-gold text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-dark">{item.name}</h3>
                        {item.popular && (
                          <span className="px-2 py-1 bg-gold bg-opacity-10 text-gold text-xs font-semibold rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mt-2">{item.description}</p>
                    </div>
                    <p className="text-2xl font-bold text-gold ml-4">₦{item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <p className="text-gray-500 text-lg">Menu items coming soon for this category</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
