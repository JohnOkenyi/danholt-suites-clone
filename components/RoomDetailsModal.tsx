import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Users, Move, BedDouble, ArrowLeft } from 'lucide-react';
import { Room } from '@/types/room';

interface RoomDetailsModalProps {
    room: Room | null;
    isOpen: boolean;
    onClose: () => void;
    onBookNow: (room: Room) => void;
}

export default function RoomDetailsModal({ room, isOpen, onClose, onBookNow }: RoomDetailsModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!mounted || !room) return null;

    // Use portal to render modal outside of parent stacking contexts
    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-4xl bg-white rounded-lg overflow-hidden shadow-2xl max-h-[90vh] flex flex-col md:flex-row z-10"
                    >
                        {/* Close Button (Mobile) */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 left-4 z-50 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors md:hidden"
                        >
                            <ArrowLeft size={24} />
                        </button>

                        {/* Close Button (Desktop) */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-50 p-2 text-gray-400 hover:text-danholt-navy transition-colors hidden md:block bg-white/10 backdrop-blur-sm rounded-full"
                        >
                            <X size={24} />
                        </button>

                        {/* Image Section */}
                        <div className="relative h-64 md:h-auto md:w-2/5 flex-shrink-0">
                            <Image
                                src={room.image}
                                alt={room.name}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />

                            <div className="hidden md:block absolute top-4 left-4 z-30">
                                <button
                                    onClick={onClose}
                                    className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur text-danholt-navy rounded-full text-sm font-bold hover:bg-white transition-colors"
                                >
                                    <ArrowLeft size={16} /> Back
                                </button>
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="flex-1 p-6 md:p-10 overflow-y-auto bg-white relative">
                            <div className="mb-2">
                                <span className="inline-block px-3 py-1 bg-danholt-gold/10 text-danholt-gold text-xs font-bold tracking-widest uppercase rounded-full">
                                    {room.bedType}
                                </span>
                            </div>

                            <div className="flex justify-between items-start mb-6">
                                <h2 className="text-3xl md:text-4xl font-serif text-danholt-navy">{room.name}</h2>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-danholt-teal">{room.priceDisplay}</div>
                                    <div className="text-xs text-gray-500">/ NIGHT</div>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-4 mb-8 border-y border-gray-100 py-6">
                                <div className="text-center border-r border-gray-100 last:border-0">
                                    <div className="flex justify-center text-danholt-gold mb-2"><Users size={20} /></div>
                                    <div className="text-sm font-bold text-danholt-navy">{room.guests} Guests</div>
                                    <div className="text-xs text-gray-400">Max Capacity</div>
                                </div>
                                <div className="text-center border-r border-gray-100 last:border-0">
                                    <div className="flex justify-center text-danholt-gold mb-2"><Move size={20} /></div>
                                    <div className="text-sm font-bold text-danholt-navy">{room.size} m²</div>
                                    <div className="text-xs text-gray-400">Room Size</div>
                                </div>
                                <div className="text-center">
                                    <div className="flex justify-center text-danholt-gold mb-2"><BedDouble size={20} /></div>
                                    <div className="text-sm font-bold text-danholt-navy">{room.bedType}</div>
                                    <div className="text-xs text-gray-400">Bed Type</div>
                                </div>
                            </div>

                            {/* About */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-danholt-navy mb-3">About This Room</h3>
                                <p className="text-gray-500 leading-relaxed text-sm">
                                    {room.description}
                                    <br /><br />
                                    Experience the perfect blend of comfort and luxury. Each room is thoughtfully designed to provide a serene sanctuary, equipped with modern amenities to ensure your stay is as relaxing as it is memorable.
                                </p>
                            </div>

                            {/* Amenities */}
                            <div className="mb-10">
                                <h3 className="text-lg font-bold text-danholt-navy mb-4">Amenities</h3>
                                <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                                    {room.amenities.map((amenity, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                            <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                                                <Check size={12} className="text-green-600" />
                                            </div>
                                            {amenity}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action */}
                            <button
                                onClick={() => onBookNow(room)}
                                className="w-full py-4 bg-danholt-teal text-white text-lg font-bold rounded-lg hover:bg-danholt-teal/90 transition-all shadow-lg shadow-danholt-teal/20"
                            >
                                Reserve This Room
                            </button>

                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
