'use client'

import { ReactLenis } from '@studio-freight/react-lenis'

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis root options={{
            lerp: 0.1,
            // duration: 1.5, // Removing fixed duration to rely on lerp for responsiveness
            smoothWheel: true,
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            touchMultiplier: 2,
            wheelMultiplier: 1.2, // Slightly increase wheel speed for responsiveness
        }}>
            {children}
        </ReactLenis>
    )
}
