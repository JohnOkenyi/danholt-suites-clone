'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(prevState: any, formData: FormData) {
    const password = formData.get('password') as string

    // Simple hardcoded check for demo
    if (password === 'admin123') {
        cookies().set('admin_session', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 // 1 day
        })
        redirect('/admin/bookings')
    }

    return { error: 'Invalid password' }
}

export async function logout() {
    cookies().delete('admin_session')
    redirect('/admin')
}
