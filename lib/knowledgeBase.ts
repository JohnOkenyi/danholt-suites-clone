export const KNOWLEDGE_BASE = [
    {
        keywords: ['room', 'suite', 'accommodation', 'stay', 'sleep', 'booking', 'reservation'],
        answer: "We offer several luxurious room options: The Presidential Suite, Royal Suite, and Executive Rooms. You can book directly through our website by clicking the 'Book Now' button."
    },
    {
        keywords: ['price', 'rate', 'cost', 'expensive', 'much'],
        answer: "Our rates vary by room type and season. Please check the 'Rooms' page on our website for the most up-to-date pricing and availability, or contact our staff for assistance."
    },
    {
        keywords: ['check-in', 'check in', 'check-out', 'check out', 'time'],
        answer: "Standard Check-in is at 2:00 PM and Check-out is at 12:00 PM. Early check-in and late check-out can be added to your booking for a small fee during the reservation process."
    },
    {
        keywords: ['food', 'dining', 'restaurant', 'eat', 'menu', 'breakfast', 'dinner'],
        answer: "Danholt Suites features world-class dining. We offer a complimentary gourmet breakfast for all guests. Our restaurant serves local and international cuisine 24/7."
    },
    {
        keywords: ['amenities', 'pool', 'gym', 'wifi', 'internet', 'parking'],
        answer: "All guests enjoy access to our infinity pool, state-of-the-art fitness center, high-speed Wi-Fi, and secure underground parking."
    },
    {
        keywords: ['membership', 'privilege', 'club', 'loyalty', 'rewards'],
        answer: "The Danholt Privilege Club offers exclusive benefits like room upgrades, priority booking, and dining discounts. You can join by visiting the 'Membership' page or clicking 'Join Privilege Club' in the menu."
    },
    {
        keywords: ['location', 'address', 'where', 'find'],
        answer: "We are located in a prime area. Please check the Contact section of our website for location details or call our staff at +234 800 000 0000 for directions."
    },
    {
        keywords: ['contact', 'phone', 'email', 'support', 'help'],
        answer: "You can reach our 24/7 concierge at +234 800 000 0000 or email us at concierge@danholtsuites.com."
    },
    {
        keywords: ['event', 'wedding', 'conference', 'meeting', 'party'],
        answer: "Yes! We have elegant venues for weddings, corporate meetings, and private events. Please contact us directly for a custom quote."
    },
    {
        keywords: ['airport', 'pickup', 'shuttle', 'transport'],
        answer: "We offer luxury airport pickup services. This can be arranged as an add-on during your booking or by contacting the concierge."
    }
];

export function findAnswer(query: string): string | null {
    const lowerQuery = query.toLowerCase();

    // Find the best match based on keyword presence
    const match = KNOWLEDGE_BASE.find(item =>
        item.keywords.some(keyword => lowerQuery.includes(keyword))
    );

    return match ? match.answer : null;
}
