'use client';

import React from 'react';
import Image from 'next/image';
import { Users, Move, ArrowRight } from 'lucide-react';
import { Room } from '@/types/room';

interface RoomCardProps {
    room: Room;
    onViewDetails: (room: Room) => void;
    onBookNow: (room: Room) => void;
}

export default function RoomCard({ room, onViewDetails, onBookNow }: RoomCardProps) {
    return (
        <div className="group bg-white rounded-lg overflow-hidden flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-white rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-lg z-10">
                    <span className="text-danholt-navy font-bold text-sm leading-tight">{room.priceDisplay}</span>
                    <span className="text-gray-400 text-[10px] leading-tight">/night</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                    <h3 className="text-2xl font-serif text-danholt-navy mb-2">{room.name}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{room.description}</p>
                </div>

                {/* Specs */}
                <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2 text-danholt-gold">
                        <Users size={18} />
                        <span className="text-gray-600 text-sm font-medium">{room.guests} Guests</span>
                    </div>
                    <div className="flex items-center gap-2 text-danholt-gold">
                        <Move size={18} />
                        <span className="text-gray-600 text-sm font-medium">{room.size} m²</span>
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-auto flex gap-4">
                    <button
                        onClick={() => onViewDetails(room)}
                        className="flex-1 py-3 px-4 border border-danholt-navy text-danholt-navy rounded-md text-sm font-bold uppercase tracking-wider hover:bg-danholt-navy hover:text-white transition-colors"
                    >
                        View Details
                    </button>
                    <button
                        onClick={() => onBookNow(room)}
                        className="flex-1 py-3 px-4 bg-danholt-navy text-white rounded-md text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-danholt-navy/90 transition-colors"
                    >
                        Book Now <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
