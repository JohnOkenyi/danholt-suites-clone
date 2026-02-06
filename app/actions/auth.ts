'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function login(prevState: any, formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return { error: 'Email and password are required' }
    }

    const supabase = createClient()

    // Clear legacy cookie to prevent bypass
    cookies().delete('admin_session')

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect('/admin/bookings')
}

export async function logout() {
    const supabase = createClient()
    cookies().delete('admin_session')
    await supabase.auth.signOut()
    redirect('/admin')
}
