'use server'

import { createClient } from "@/utils/supabase/server";

export async function getRoomAvailabilitySummary() {
    try {
        const supabase = createClient();

        // 1. Get all rooms
        const { data: rooms, error: roomsError } = await supabase
            .from('rooms')
            .select('id, name, slug');

        if (roomsError || !rooms) throw roomsError;

        // 2. Get all active bookings for the next 30 days
        const today = new Date().toISOString().split('T')[0];
        const thirtyDaysLater = new Date();
        thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);
        const endDate = thirtyDaysLater.toISOString().split('T')[0];

        const { data: bookings, error: bookingsError } = await supabase
            .from('bookings')
            .select('room_id, check_in, check_out')
            .neq('status', 'cancelled')
            .gte('check_out', today)
            .lte('check_in', endDate);

        if (bookingsError) throw bookingsError;

        // 3. Generate summary
        let summary = "Real-time Room Availability Summary:\n\n";

        for (const room of rooms) {
            const roomBookings = bookings.filter(b => b.room_id === room.id)
                .sort((a, b) => new Date(a.check_in).getTime() - new Date(b.check_in).getTime());

            if (roomBookings.length === 0) {
                summary += `- ${room.name}: Fully available for the next 30 days.\n`;
            } else {
                summary += `- ${room.name}: \n`;
                roomBookings.forEach(b => {
                    summary += `  * Booked: ${b.check_in} to ${b.check_out}\n`;
                });

                // Find next opening
                const lastBooking = roomBookings[roomBookings.length - 1];
                const nextOpening = lastBooking.check_out;
                summary += `  * Next full availability starts: ${nextOpening}\n`;
            }
        }

        return summary;
    } catch (err) {
        console.error("AI Availability Error:", err);
        return "I'm having trouble accessing live availability right now. Please check our booking page or contact the concierge for the most up-to-date status.";
    }
}
