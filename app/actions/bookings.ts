'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { sendEmail, getBookingTemplate } from "@/utils/email";

export type ActionState = {
    success?: boolean;
    message?: string;
    error?: string;
};

export async function createRoomBooking(prevState: ActionState, formData: FormData): Promise<ActionState> {
    try {
        const supabase = createClient();

        const rawData = {
            guest_name: formData.get("name") as string,
            guest_email: formData.get("email") as string,
            guest_phone: formData.get("phone") as string,
            check_in: formData.get("checkIn") as string,
            check_out: formData.get("checkOut") as string,
            guests: parseInt(formData.get("guests") as string || '1'),
            room_id: formData.get("roomId") as string, // This is the slug (e.g., 'standard')
            special_requests: formData.get("requests") as string,
            status: 'pending'
        };

        if (!rawData.guest_name || !rawData.guest_email || !rawData.check_in || !rawData.check_out || !rawData.room_id) {
            return { error: "Please fill in all required fields." };
        }

        // 1. Look up room by slug
        const { data: roomData, error: roomError } = await supabase
            .from('rooms')
            .select('id, price, name')
            .eq('slug', rawData.room_id)
            .single();

        if (roomError || !roomData) {
            return { error: "Room selection error. Please refresh and try again." };
        }

        // 2. Overlap Check
        const { data: existing } = await supabase
            .from('bookings')
            .select('id')
            .eq('room_id', roomData.id)
            .neq('status', 'cancelled')
            .lt('check_in', rawData.check_out)
            .gt('check_out', rawData.check_in);

        if (existing && existing.length > 0) {
            return { error: "The selected dates are no longer available for this room." };
        }

        // 3. Price Calculation
        const start = new Date(rawData.check_in);
        const end = new Date(rawData.check_out);
        const nights = Math.max(1, Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
        const totalPrice = nights * Number(roomData.price);

        const bookingData = {
            room_id: roomData.id,
            guest_name: rawData.guest_name,
            guest_email: rawData.guest_email,
            guest_phone: rawData.guest_phone,
            check_in: rawData.check_in,
            check_out: rawData.check_out,
            guests: rawData.guests,
            total_price: totalPrice,
            special_requests: rawData.special_requests,
            status: 'pending'
        };

        // 4. Insert
        const { error: insertError } = await supabase.from("bookings").insert(bookingData);
        if (insertError) throw insertError;

        revalidatePath("/admin/bookings");

        // 5. Send Email (Non-blocking)
        try {
            await sendEmail({
                to: rawData.guest_email,
                subject: `Reservation Confirmed - ${roomData.name}`,
                html: getBookingTemplate(
                    rawData.guest_name,
                    roomData.name,
                    rawData.check_in,
                    rawData.check_out,
                    totalPrice
                )
            });
        } catch (e) {
            console.error("Email warning:", e);
        }

        return { success: true, message: "Your luxury stay is being prepared! We have sent a confirmation email." };
    } catch (err: any) {
        console.error("Booking Final Error:", err);
        return { error: "Reservation process failed. Please contact the concierge if this persists." };
    }
}

export async function createDiningReservation(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const supabase = createClient();

    const rawData = {
        guest_name: formData.get("fullName") as string,
        guest_email: formData.get("email") as string,
        guest_phone: formData.get("phone") as string,
        reservation_date: formData.get("date") as string,
        reservation_time: formData.get("time") as string,
        guests: parseInt((formData.get("partySize") as string).replace(/\D/g, '')),
        special_requests: formData.get("specialRequests") as string,
        status: 'pending'
    };

    if (!rawData.guest_name || !rawData.guest_email || !rawData.reservation_date || !rawData.reservation_time) {
        return { error: "Missing required fields" };
    }

    const { error } = await supabase
        .from("restaurant_reservations")
        .insert(rawData);

    if (error) {
        console.error("Supabase Error:", error);
        return { error: "Failed to reserve table. " + error.message };
    }

    revalidatePath("/admin/bookings");
    return { success: true, message: "Table reserved successfully!" };
}

export async function createFacilityBooking(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const supabase = createClient();

    const rawData = {
        guest_name: formData.get("name") as string,
        guest_email: formData.get("email") as string,
        guest_phone: formData.get("phone") as string,
        reservation_date: formData.get("date") as string,
        reservation_time: "09:00", // Default to morning for facility events
        guests: parseInt(formData.get("attendees") as string),
        special_requests: `Facility: ${formData.get("facility")} | Type: ${formData.get("eventType")} | Details: ${formData.get("details")}`,
        status: 'pending'
    };

    if (!rawData.guest_name || !rawData.guest_email || !rawData.reservation_date) {
        return { error: "Missing required fields" };
    }

    const { error } = await supabase
        .from("restaurant_reservations")
        .insert(rawData);

    if (error) {
        console.error("Supabase Error:", error);
        return { error: "Failed to submit inquiry. " + error.message };
    }

    revalidatePath("/admin/bookings");
    return { success: true, message: "Facility inquiry submitted successfully! Our team will contact you." };
}

export async function submitContactForm(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const supabase = createClient();
    const rawData = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        subject: formData.get("subject") as string,
        message: formData.get("message") as string,
        status: 'unread'
    };

    if (!rawData.name || !rawData.email || !rawData.message) {
        return { error: "Missing required fields" };
    }

    const { error } = await supabase.from("contact_messages").insert(rawData);

    if (error) {
        console.error("Supabase Error:", error);
        return { error: "Failed to send message: " + error.message };
    }

    revalidatePath("/admin/bookings");
    return { success: true, message: "Message sent! We will be in touch shortly." };
}

export async function joinPrivilegeClub(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const supabase = createClient();
    const rawData = {
        full_name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        membership_tier: formData.get("tier") as string,
        // contactMethod is not in the schema I made, I'll put it in notes
        notes: `Preferred Contact: ${formData.get("contactMethod")}`,
        status: 'pending'
    };

    if (!rawData.full_name || !rawData.email) {
        return { error: "Missing name or email" };
    }

    const { error } = await supabase.from("membership_requests").insert(rawData);

    if (error) {
        console.error("Supabase Error:", error);
        return { error: "Failed to submit request: " + error.message };
    }

    revalidatePath("/admin/bookings");
    return { success: true, message: "Membership request received! Welcome to the club." };
}
