import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const cookieStore = cookies()
    const session = cookieStore.get('admin_session')

    if (!session?.value) {
        redirect('/admin')
    }

    return (
        <>
            {children}
        </>
    )
}
