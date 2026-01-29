export const KNOWLEDGE_BASE = [
    {
        keywords: ['brand', 'philosophy', 'vision', 'about', 'values'],
        answer: "Danholt Suites operates on the philosophy 'Here is a tribute to good living!'. Our vision is Evolved Hospitality, creating curated moments and unrivaled excellence. We value intuitive service and designing spaces that disconnect you from noise and reconnect you with perfection."
    },
    {
        keywords: ['room', 'suite', 'accommodation', 'stay', 'sleep', 'standard', 'deluxe', 'executive', 'price', 'cost', 'rate'],
        answer: "We offer three luxury room types:\n1. STANDARD ROOM (₦10,000/night): 2 Guests, 25m², cozy retreat.\n2. DELUXE ROOM (₦15,000/night): 2 Guests, 35m², spacious elegance.\n3. EXECUTIVE DELUXE (₦20,000/night): 3 Guests, 45m², the pinnacle of luxury."
    },
    {
        keywords: ['location', 'address', 'where', 'find', 'landmark'],
        answer: "We are located at #3 Iyabo, Obeyode Street (Beside Collinear Hospital), Dogbano, Jikwoyi, Phase 3, Abuja, Nigeria."
    },
    {
        keywords: ['contact', 'phone', 'call', 'email', 'reach', 'number', 'support'],
        answer: "You can reach us at 0704 608 0351 / 07046080351 or +234 800 000 0000.\nEmails: reservations@danholt.com (Bookings), concierge@danholt.com (Special requests)."
    },
    {
        keywords: ['food', 'dining', 'eat', 'restaurant', 'kitchen', 'menu', 'meal', 'breakfast', 'lunch', 'dinner', 'drink', 'rice', 'chicken', 'soup'],
        answer: "The Danholt Kitchen serves delicious Nigerian cuisines. Menu highlights:\n- Jollof/White Rice: ₦4,000\n- Spicy Chicken: ₦2,000 - ₦2,500\n- Swallow Meals (Pounded Yam, Semo, Garri, Amala) with Soup: ₦4,000\n- Drinks: Water (₦400), Sodas (₦600), Beers (₦1,000+), Wines (₦10,000+)."
    },
    {
        keywords: ['facility', 'amenities', 'hall', 'conference', 'sport', 'gym', 'tennis', 'football', 'pool', 'swim', 'playground', 'kids'],
        answer: "Our facilities include:\n1. Conference Hall: Projector, Sound System, WiFi.\n2. Sports Facilities (₦1,500): 5-a-side Football, Tennis.\n3. Swimming Pool (₦2,000): Adult & Kids sections, Poolside Bar.\n4. Children's Playground: Free access, secure and supervised."
    },
    {
        keywords: ['membership', 'club', 'privilege', 'loyalty', 'bronze', 'silver', 'gold', 'join'],
        answer: "Join the Danholt Privilege Club:\n- BRONZE (₦1,000/mo): 5% off dining.\n- SILVER (₦3,000/mo): 10% off rooms, priority late checkout.\n- GOLD (₦5,000+/mo): 15% off rooms, upgrades, private events.\nAll tiers get monthly rewards!"
    },
    {
        keywords: ['booking', 'reserve', 'reservation', 'payment', 'credit card'],
        answer: "Booking is seamless online. No credit card is required. Payment options? Contact reservations@danholt.com. We accept 1-6 guests depending on capacity."
    },
    {
        keywords: ['check-in', 'check in', 'check-out', 'check out', 'time', 'early', 'late'],
        answer: "Reception is open 24/7. Early check-in and Late checkout guarantees are available for ₦2,000 each (subject to availability)."
    },
    {
        keywords: ['wifi', 'internet', 'security', 'safety'],
        answer: "Yes, we provide free high-speed WiFi throughout the property and ensure your safety with 24/7 security."
    },
    {
        keywords: ['package', 'offer', 'deal', 'promo', 'romantic', 'couple', 'business', 'wedding'],
        answer: "Check out our packages:\n1. Romantic Escape: Dinner for two, late checkout.\n2. Weekend Reset: 2-night stay, breakfast, facility access.\n3. Business Traveler Pass: Work-friendly room, priority laundry."
    },
    {
        keywords: ['referral', 'friend', 'invite', 'code'],
        answer: "Our 'Friends of Danholt' referral program is in Beta. Share your code after a stay to earn rewards when friends book!"
    },
    {
        keywords: ['airport', 'pickup', 'shuttle', 'transport'],
        answer: "Yes, airport pickup is available as an add-on, especially recommended for our Business Traveler Pass holders."
    }
];

export function findAnswer(query: string): string | null {
    const lowerQuery = query.toLowerCase();

    // Find the best match based on keyword presence
    // Sort by number of matching keywords to find the most specific answer
    const match = KNOWLEDGE_BASE
        .map(item => ({
            item,
            score: item.keywords.filter(keyword => lowerQuery.includes(keyword)).length
        }))
        .filter(result => result.score > 0)
        .sort((a, b) => b.score - a.score)[0];

    return match ? match.item.answer : null;
}
