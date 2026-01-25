import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { formData, stats, transactionId } = body

    // Insert booking into Supabase
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          guest_name: formData.name,
          guest_email: formData.email,
          phone: formData.phone,
          room_id: formData.roomId,
          check_in: formData.checkIn,
          check_out: formData.checkOut,
          guests: formData.guests,
          total_amount: stats.total,
          payment_id: transactionId,
          status: 'confirmed',
          special_requests: formData.requests,
          created_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) {
      return NextResponse.json(
        { error: 'Failed to create booking' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: true, booking: data[0] },
      { status: 201 }
    )
  } catch (error) {
    console.error('Payment error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
