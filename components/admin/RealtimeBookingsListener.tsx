'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function RealtimeBookingsListener() {
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        // Create a single channel for all admin-related updates
        const channel = supabase
            .channel('admin-dashboard-changes')
            .on(
                'postgres_changes',
                {
                    event: '*', // Listen for INSERT, UPDATE, DELETE
                    schema: 'public',
                    table: 'bookings'
                },
                () => {
                    console.log('Realtime update: bookings')
                    router.refresh()
                }
            )
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'restaurant_reservations'
                },
                () => {
                    console.log('Realtime update: dining')
                    router.refresh()
                }
            )
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'contact_messages'
                },
                () => {
                    console.log('Realtime update: messages')
                    router.refresh()
                }
            )
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'membership_requests'
                },
                () => {
                    console.log('Realtime update: memberships')
                    router.refresh()
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [router, supabase])

    return null // This component is invisible
}
