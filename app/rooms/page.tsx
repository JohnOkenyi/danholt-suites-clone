'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ROOMS } from '@/lib/rooms'
import { Room } from '@/types/room'
import RoomCard from '@/components/RoomCard'
import RoomDetailsModal from '@/components/RoomDetailsModal'

export default function RoomsPage() {
  const router = useRouter()
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewDetails = (room: Room) => {
    setSelectedRoom(room)
    setIsModalOpen(true)
  }

  const handleBookNow = (room: Room) => {
    router.push(`/booking?room=${room.id}`)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <main className="bg-danholt-navy min-h-screen text-white relative">
      {/* Rooms Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/room-deluxe.jpg"
            alt="Luxury Room Hero"
            fill
            className="object-cover opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-danholt-navy via-danholt-navy/50 to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6"
        >
          <span className="text-danholt-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">
            Accommodation
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
            Stay in Style
          </h1>
          <p className="text-white/60 max-w-xl mx-auto text-lg font-light leading-relaxed">
            Experience the perfect blend of comfort and luxury in our thoughtfully designed suites.
          </p>
        </motion.div>
      </section>

      {/* Room Grid */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
          {ROOMS.map((room, i) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="h-full"
            >
              <RoomCard
                room={room}
                onViewDetails={handleViewDetails}
                onBookNow={handleBookNow}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modal */}
      <RoomDetailsModal
        room={selectedRoom}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onBookNow={handleBookNow}
      />
    </main>
  )
}
