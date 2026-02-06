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

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (authError) {
        return { error: authError.message }
    }

    // MANDATORY: Check if user is an authorized admin
    const { data: adminUser, error: adminError } = await supabase
        .from('admin_users')
        .select('email')
        .eq('email', email)
        .single()

    if (adminError || !adminUser) {
        // Sign out immediately if not an authorized admin
        await supabase.auth.signOut()
        return { error: 'Access Denied: You are not an authorized administrator.' }
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

export async function requestPasswordReset(email: string) {
    const supabase = createClient()

    // Check if user is an admin first (optional but good for safety)
    const { data: adminUser } = await supabase
        .from('admin_users')
        .select('email')
        .eq('email', email)
        .single()

    if (!adminUser) {
        return { error: 'No administrator found with this email address.' }
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/reset-password`,
    })

    if (error) {
        return { error: error.message }
    }

    return { success: true }
}

export async function updatePassword(password: string) {
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
        return { error: error.message }
    }

    return { success: true }
}
