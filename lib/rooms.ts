import { Room } from '@/types/room';

export const ROOMS: Room[] = [
    {
        id: 'standard',
        name: "Standard",
        price: 10000,
        priceDisplay: "₦10,000",
        guests: 2,
        size: 25,
        bedType: "Queen Bed",
        image: "/images/room-standard.jpg",
        description: "A cozy retreat designed for comfort, featuring modern amenities and a serene atmosphere perfect for short stays.",
        amenities: [
            "Free WiFi",
            "Air Conditioning",
            "24/7 Electricity",
            "Flat Screen TV",
            "Mini Bar",
            "En-suite Bathroom"
        ]
    },
    {
        id: 'deluxe',
        name: "Deluxe",
        price: 15000,
        priceDisplay: "₦15,000",
        guests: 2,
        size: 35,
        bedType: "King Bed",
        image: "/images/room-deluxe.jpg",
        description: "Spacious elegance with premium furnishings, offering an elevated experience for the discerning traveler.",
        amenities: [
            "Free WiFi",
            "Air Conditioning",
            "24/7 Electricity",
            "Flat Screen TV",
            "Mini Bar",
            "En-suite Bathroom"
        ]
    },
    {
        id: 'executive-deluxe',
        name: "Executive Deluxe",
        price: 20000,
        priceDisplay: "₦20,000",
        guests: 3,
        size: 45,
        bedType: "Super King Bed",
        image: "/images/hero-slide-3.jpg",
        description: "The pinnacle of luxury. Expansive living space, exclusive access, and unparalleled attention to detail.",
        amenities: [
            "Free WiFi",
            "Air Conditioning",
            "24/7 Electricity",
            "Flat Screen TV",
            "Mini Bar",
            "En-suite Bathroom"
        ]
    }
];
