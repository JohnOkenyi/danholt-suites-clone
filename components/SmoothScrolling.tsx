'use client'

import { ReactLenis } from '@studio-freight/react-lenis'

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis root options={{
            lerp: 0.12, // Faster response (less "laggy" feel)
            // duration: 1.5,
            smoothWheel: true,
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            touchMultiplier: 2,
            wheelMultiplier: 1.0, // More natural scroll speed
        }}>
            {children}
        </ReactLenis>
    )
}
