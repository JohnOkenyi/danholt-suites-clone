'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export type ActionState = {
    success?: boolean;
    message?: string;
    error?: string;
};

export async function createRoomBooking(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const supabase = createClient();

    const rawData = {
        guest_name: formData.get("name") as string,
        guest_email: formData.get("email") as string,
        guest_phone: formData.get("phone") as string,
        check_in: formData.get("checkIn") as string,
        check_out: formData.get("checkOut") as string,
        guests: parseInt(formData.get("guests") as string),
        room_id: formData.get("roomId") as string,
        special_requests: formData.get("requests") as string,
        status: 'pending'
    };

    if (!rawData.guest_name || !rawData.guest_email || !rawData.check_in || !rawData.check_out) {
        return { error: "Please fill in all required fields." };
    }

    try {
        // 1. Look up room by slug
        const { data: roomData, error: roomError } = await supabase
            .from('rooms')
            .select('id, price')
            .eq('slug', rawData.room_id)
            .single();

        if (roomError || !roomData) {
            console.error("Room lookup failed:", roomError);
            return { error: `Room configuration error: Could not find room '${rawData.room_id}'. Please contact support.` };
        }

        // Calculate price
        const start = new Date(rawData.check_in);
        const end = new Date(rawData.check_out);
        const diffDays = Math.max(1, Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
        const totalPrice = diffDays * Number(roomData.price);

        const bookingData = {
            ...rawData,
            room_id: roomData.id, // Use the UUID from the DB
            total_price: totalPrice
        };

        const { error } = await supabase
            .from("bookings")
            .insert(bookingData);

        if (error) {
            console.error("Supabase Booking Error:", error);
            // Check for specific RLS errors
            if (error.code === '42501') {
                return { error: "Permission denied. Please ensure database policies are set up." };
            }
            return { error: "Failed to submit booking: " + error.message };
        }

        revalidatePath("/admin/bookings");
        return { success: true, message: "Booking request submitted successfully! We will contact you shortly." };
    } catch (err) {
        console.error("Unexpected Booking Error:", err);
        return { error: "An unexpected system error occurred. Please try again." };
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
