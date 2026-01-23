'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import ErrorBoundary from '@/components/ErrorBoundary'

const ContactMap = dynamic(() => import('./ContactMap'), {
    ssr: false,
    loading: () => <div className="h-[400px] w-full bg-gray-100 rounded-2xl animate-pulse flex items-center justify-center text-gray-400">Loading Map...</div>
})

export default function SafeContactMap() {
    return (
        <ErrorBoundary>
            <ContactMap />
        </ErrorBoundary>
    )
}
