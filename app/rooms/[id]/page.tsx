'use client';

import { useState } from 'react'
import { ROOMS } from '@/lib/rooms'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check, ArrowLeft, Wifi, Tv, Wind, Coffee, Smartphone, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import PremiumButton from '@/components/ui/PremiumButton'

const amenityIcons: Record<string, any> = {
    'Free WiFi': Wifi,
    'Flat Screen TV': Tv,
    'Air Conditioning': Wind,
    'Mini Bar': Coffee,
    'Breakfast': Coffee,
    'Work Desk': Smartphone,
    '24/7 Power': ShieldCheck
}

export default function RoomDetailPage({ params }: { params: { id: string } }) {
    const room = ROOMS.find(r => r.id === params.id)
    const [activeImage, setActiveImage] = (room?.images && room.images.length > 0)
        ? useState(room.images[0])
        : useState(room?.image || '');

    if (!room) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-danholt-midnight pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto">
                <Link
                    href="/rooms"
                    className="inline-flex items-center gap-2 text-danholt-gold/60 hover:text-danholt-gold transition-colors mb-8 group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Collection
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Image Section */}
                    <div className="space-y-6">
                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 group">
                            <Image
                                src={activeImage}
                                alt={room.name}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-8 left-8">
                                <h1 className="text-4xl md:text-5xl font-serif text-white mb-2">{room.name}</h1>
                                <div className="text-danholt-gold text-xl font-medium">
                                    ₦{room.price.toLocaleString()} <span className="text-sm font-light text-white/60">/ NIGHT</span>
                                </div>
                            </div>
                        </div>

                        {/* Gallery Thumbnails */}
                        {room.images && room.images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                                {room.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveImage(img)}
                                        className={`relative w-24 aspect-square rounded-lg overflow-hidden border-2 transition-all ${activeImage === img ? 'border-danholt-gold' : 'border-transparent opacity-60 hover:opacity-100'
                                            }`}
                                    >
                                        <Image src={img} alt={`${room.name} view ${index + 1}`} fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="space-y-10">
                        <section>
                            <h2 className="text-danholt-gold text-xs font-bold uppercase tracking-[0.4em] mb-6">
                                Experience Luxury
                            </h2>
                            <p className="text-xl text-white/80 font-light leading-relaxed">
                                {room.description}
                            </p>
                        </section>

                        <section className="grid grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-white font-serif text-lg mb-4">Capacity</h3>
                                <p className="text-white/60">{room.guests} Guests</p>
                            </div>
                            <div>
                                <h3 className="text-white font-serif text-lg mb-4">Size</h3>
                                <p className="text-white/60">{room.size} sq.m</p>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-white font-serif text-lg mb-6">Amenities</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {room.amenities.map((amenity, i) => {
                                    const Icon = amenityIcons[amenity] || Check
                                    return (
                                        <div key={i} className="flex items-center gap-3 text-white/60 group">
                                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-danholt-gold/20 group-hover:text-danholt-gold transition-colors">
                                                <Icon size={14} />
                                            </div>
                                            <span className="text-sm font-light">{amenity}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </section>

                        <div className="pt-8">
                            <Link href={`/booking?room=${room.id}`}>
                                <PremiumButton variant="primary" className="w-full md:w-auto h-16 px-12 text-lg">
                                    Reserve This Suite
                                </PremiumButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
