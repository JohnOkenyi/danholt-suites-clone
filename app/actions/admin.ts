'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deleteBooking(id: string) {
    const supabase = createClient()
    const { error } = await supabase.from('bookings').delete().eq('id', id)

    if (error) {
        console.error('Error deleting booking:', error)
        return { error: error.message }
    }

    revalidatePath('/admin/bookings')
    return { success: true }
}

export async function deleteDiningReservation(id: string) {
    const supabase = createClient()
    const { error } = await supabase.from('restaurant_reservations').delete().eq('id', id)

    if (error) {
        console.error('Error deleting dining reservation:', error)
        return { error: error.message }
    }

    revalidatePath('/admin/bookings')
    return { success: true }
}

export async function deleteFacilityBooking(id: string) {
    const supabase = createClient()
    // Facility bookings are just restaurant_reservations with specific metadata
    const { error } = await supabase.from('restaurant_reservations').delete().eq('id', id)

    if (error) {
        console.error('Error deleting facility booking:', error)
        return { error: error.message }
    }

    revalidatePath('/admin/bookings')
    return { success: true }
}

export async function deleteMembershipRequest(id: string) {
    const supabase = createClient()
    const { error } = await supabase.from('membership_requests').delete().eq('id', id)

    if (error) {
        console.error('Error deleting membership request:', error)
        return { error: error.message }
    }

    revalidatePath('/admin/bookings')
    return { success: true }
}

export async function deleteContactMessage(id: string) {
    const supabase = createClient()
    const { error } = await supabase.from('contact_messages').delete().eq('id', id)

    if (error) {
        console.error('Error deleting contact message:', error)
        return { error: error.message }
    }

    revalidatePath('/admin/bookings')
    return { success: true }
}
