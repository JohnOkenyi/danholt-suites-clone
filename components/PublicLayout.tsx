'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LiveChatWidget from '@/components/LiveChatWidget'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isAdmin = pathname?.startsWith('/admin')

    if (isAdmin) {
        return <>{children}</>
    }

    return (
        <>
            <Header />
            <main className="relative z-10 w-full overflow-x-hidden">{children}</main>
            <Footer />
            <LiveChatWidget />
        </>
    )
}
