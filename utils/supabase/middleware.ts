import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                },
            },
        }
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    // Protected routes guard
    if (request.nextUrl.pathname.startsWith('/admin') &&
        !['/admin', '/admin/reset-password'].includes(request.nextUrl.pathname)) {

        if (authError || !user) {
            return NextResponse.redirect(new URL('/admin', request.url))
        }

        // Secondary check: is the user in the admin_users table?
        const { data: isAdmin } = await supabase
            .from('admin_users')
            .select('email')
            .eq('email', user.email)
            .single()

        if (!isAdmin) {
            // Sign out if they snuck in somehow
            await supabase.auth.signOut()
            return NextResponse.redirect(new URL('/admin', request.url))
        }
    }

    return response
}
