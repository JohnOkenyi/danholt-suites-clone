export interface Room {
    id: string;
    name: string;
    price: number; // Stored as number for calculations
    priceDisplay: string; // Formatted string
    guests: number;
    size: number; // in m²
    bedType: string;
    image: string;
    images?: string[];
    description: string;
    amenities: string[];
}
