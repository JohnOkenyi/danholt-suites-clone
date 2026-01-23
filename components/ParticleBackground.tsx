'use client'

import React, { useRef, useEffect, useCallback } from 'react'

/**
 * ParticleBackground - Interactive particle system with mouse repulsion
 * Inspired by antigravity.google aesthetic
 * 
 * Features:
 * - Perlin-like noise for organic drifting motion
 * - Mouse repulsion with smooth easing
 * - Color variations (dark gray with accent colors)
 * - Responsive particle count based on screen size
 * - 60fps animation using requestAnimationFrame
 */

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    baseX: number
    baseY: number
    radius: number
    color: string
    noiseOffsetX: number
    noiseOffsetY: number
    driftSpeed: number
}

interface ParticleBackgroundProps {
    className?: string
}

// Simple noise function for organic movement
function noise(x: number, y: number, time: number): number {
    return Math.sin(x * 0.01 + time) * Math.cos(y * 0.01 + time * 0.5) * 0.5 +
        Math.sin(x * 0.02 - time * 0.3) * 0.3 +
        Math.cos(y * 0.015 + time * 0.7) * 0.2
}

// Configuration - Easy to customize
const CONFIG = {
    REPULSION_RADIUS: 140,      // Pixels - area of mouse influence
    REPULSION_STRENGTH: 8,       // Force applied to particles
    RETURN_SPEED: 0.03,          // How fast particles return to drift
    DRIFT_INTENSITY: 0.3,        // Intensity of floating motion
    PARTICLE_DENSITY: 0.00001,   // Reduced density significantly
    MIN_PARTICLES: 20,           // Lower limits
    MAX_PARTICLES: 60,
}

export default function ParticleBackground({ className = '' }: ParticleBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const particlesRef = useRef<Particle[]>([])
    const mouseRef = useRef({ x: -1000, y: -1000, isActive: false })
    const animationRef = useRef<number>(0)
    const timeRef = useRef(0)

    // Generate particle colors - mostly dark with occasional accents
    const getParticleColor = (): string => {
        const rand = Math.random()
        if (rand < 0.7) {
            // Dark gray variations (70%)
            const gray = Math.floor(Math.random() * 80 + 40)
            return `rgba(${gray}, ${gray}, ${gray}, ${Math.random() * 0.4 + 0.3})`
        } else if (rand < 0.85) {
            // Light orange accent (15%)
            return `rgba(255, ${Math.floor(Math.random() * 50 + 140)}, ${Math.floor(Math.random() * 50 + 80)}, ${Math.random() * 0.3 + 0.2})`
        } else {
            // Light blue accent (15%)
            return `rgba(${Math.floor(Math.random() * 50 + 100)}, ${Math.floor(Math.random() * 50 + 150)}, 255, ${Math.random() * 0.3 + 0.2})`
        }
    }

    // Initialize particles with responsive count
    const initParticles = useCallback((width: number, height: number) => {
        const area = width * height
        let count = Math.floor(area * CONFIG.PARTICLE_DENSITY)
        count = Math.max(CONFIG.MIN_PARTICLES, Math.min(CONFIG.MAX_PARTICLES, count))

        const particles: Particle[] = []

        for (let i = 0; i < count; i++) {
            const x = Math.random() * width
            const y = Math.random() * height
            const radius = Math.random() * 2 + 1 // 1-3px

            particles.push({
                x,
                y,
                vx: 0,
                vy: 0,
                baseX: x,
                baseY: y,
                radius,
                color: getParticleColor(),
                noiseOffsetX: Math.random() * 1000,
                noiseOffsetY: Math.random() * 1000,
                driftSpeed: Math.random() * 0.5 + 0.5
            })
        }

        particlesRef.current = particles
    }, [])

    // Main animation loop - 60fps target
    const animate = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const width = canvas.width
        const height = canvas.height
        const particles = particlesRef.current
        const mouse = mouseRef.current
        const time = timeRef.current * 0.01

        // Clear canvas with slight fade for trail effect
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'
        ctx.fillRect(0, 0, width, height)

        particles.forEach((p) => {
            // Calculate organic drift using noise function
            const noiseX = noise(p.noiseOffsetX, p.noiseOffsetY, time * p.driftSpeed)
            const noiseY = noise(p.noiseOffsetY, p.noiseOffsetX, time * p.driftSpeed + 100)

            // Target position with drift
            const targetX = p.baseX + noiseX * 50 * CONFIG.DRIFT_INTENSITY
            const targetY = p.baseY + noiseY * 50 * CONFIG.DRIFT_INTENSITY

            // Apply mouse repulsion
            if (mouse.isActive) {
                const dx = p.x - mouse.x
                const dy = p.y - mouse.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < CONFIG.REPULSION_RADIUS && distance > 0) {
                    // Calculate repulsion force with easing
                    const force = (1 - distance / CONFIG.REPULSION_RADIUS) * CONFIG.REPULSION_STRENGTH
                    const angle = Math.atan2(dy, dx)

                    // Apply smooth repulsion
                    p.vx += Math.cos(angle) * force * 0.3
                    p.vy += Math.sin(angle) * force * 0.3

                    // Scale up particles near cursor (subtle effect)
                    const scaleFactor = 1 + (1 - distance / CONFIG.REPULSION_RADIUS) * 0.5
                    ctx.beginPath()
                    ctx.arc(p.x, p.y, p.radius * scaleFactor, 0, Math.PI * 2)
                    ctx.fillStyle = p.color
                    ctx.fill()
                } else {
                    // Normal particle rendering
                    ctx.beginPath()
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
                    ctx.fillStyle = p.color
                    ctx.fill()
                }
            } else {
                // Normal particle rendering
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
                ctx.fillStyle = p.color
                ctx.fill()
            }

            // Apply velocity with strong damping for smooth motion
            p.x += p.vx
            p.y += p.vy
            p.vx *= 0.92
            p.vy *= 0.92

            // Gradually return to drift pattern
            if (!mouse.isActive || Math.sqrt(Math.pow(p.x - mouse.x, 2) + Math.pow(p.y - mouse.y, 2)) > CONFIG.REPULSION_RADIUS) {
                p.x += (targetX - p.x) * CONFIG.RETURN_SPEED
                p.y += (targetY - p.y) * CONFIG.RETURN_SPEED
            }

            // Wrap particles around screen edges
            if (p.x < -10) { p.x = width + 10; p.baseX = p.x }
            if (p.x > width + 10) { p.x = -10; p.baseX = p.x }
            if (p.y < -10) { p.y = height + 10; p.baseY = p.y }
            if (p.y > height + 10) { p.y = -10; p.baseY = p.y }
        })

        timeRef.current += 1
        animationRef.current = requestAnimationFrame(animate)
    }, [])

    // Mouse event handlers
    const handleMouseMove = useCallback((e: MouseEvent) => {
        const canvas = canvasRef.current
        if (!canvas) return
        const rect = canvas.getBoundingClientRect()
        mouseRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            isActive: true
        }
    }, [])

    const handleMouseLeave = useCallback(() => {
        mouseRef.current = { ...mouseRef.current, isActive: false }
    }, [])

    // Touch support for mobile
    const handleTouchMove = useCallback((e: TouchEvent) => {
        const canvas = canvasRef.current
        if (!canvas || !e.touches[0]) return
        const rect = canvas.getBoundingClientRect()
        mouseRef.current = {
            x: e.touches[0].clientX - rect.left,
            y: e.touches[0].clientY - rect.top,
            isActive: true
        }
    }, [])

    const handleTouchEnd = useCallback(() => {
        mouseRef.current = { ...mouseRef.current, isActive: false }
    }, [])

    // Setup and cleanup
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const handleResize = () => {
            const parent = canvas.parentElement
            if (!parent) return
            canvas.width = parent.offsetWidth
            canvas.height = parent.offsetHeight

            // Clear canvas to white on resize
            const ctx = canvas.getContext('2d')
            if (ctx) {
                ctx.fillStyle = '#ffffff'
                ctx.fillRect(0, 0, canvas.width, canvas.height)
            }

            initParticles(canvas.width, canvas.height)
        }

        handleResize()

        // Event listeners
        canvas.addEventListener('mousemove', handleMouseMove)
        canvas.addEventListener('mouseleave', handleMouseLeave)
        canvas.addEventListener('touchmove', handleTouchMove, { passive: true })
        canvas.addEventListener('touchend', handleTouchEnd)
        window.addEventListener('resize', handleResize)

        // Start animation
        animationRef.current = requestAnimationFrame(animate)

        return () => {
            canvas.removeEventListener('mousemove', handleMouseMove)
            canvas.removeEventListener('mouseleave', handleMouseLeave)
            canvas.removeEventListener('touchmove', handleTouchMove)
            canvas.removeEventListener('touchend', handleTouchEnd)
            window.removeEventListener('resize', handleResize)
            cancelAnimationFrame(animationRef.current)
        }
    }, [initParticles, animate, handleMouseMove, handleMouseLeave, handleTouchMove, handleTouchEnd])

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full pointer-events-auto ${className}`}
            style={{ zIndex: 0, background: 'transparent' }}
        />
    )
}
