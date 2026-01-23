'use client'

import dynamic from 'next/dynamic'
const MapContent = dynamic(
  () => import('./MapContent'),
  { ssr: false }
)

export default function ContactMap() {
  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapContent />
    </div>
  )
