'use client'

import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet'
import { Icon } from 'leaflet'
import { useEffect, useRef, useState } from 'react'

export default function ContactMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    // Ensure map container is properly sized
    if (mapContainerRef.current) {
      const resizeMap = () => {
        try {
          // Trigger browser reflow
          const container = mapContainerRef.current
          if (container && container.offsetHeight === 0) {
            // If height is 0, set it explicitly
            container.style.height = '500px'
          }
        } catch (error) {
          console.error('Map resize error:', error)
        }
      }

      // Resize on mount
      resizeMap()

      // Resize on window resize
      window.addEventListener('resize', resizeMap)
      return () => window.removeEventListener('resize', resizeMap)
    }
  }, [])

  const customIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  })

  const position: [number, number] = [8.986, 7.555]

  return (
    <div
      ref={mapContainerRef}
      className="h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-xl border border-white/10 relative z-0"
      style={{ height: '500px', width: '100%' }}
    >
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        className="h-full w-full"
        style={{ height: '100%', width: '100%', minHeight: '500px', zIndex: 10, position: 'relative' }}
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            <div className="text-center p-2">
              <h3 className="font-bold text-danholt-midnight font-serif text-lg mb-1">Danholt Suites</h3>
              <p className="text-sm text-gray-600">#3 Iyabo, Obeyode Street</p>
              <p className="text-xs text-gray-500">(Beside Collinear Hospital)</p>
              <p className="text-sm text-gray-600">Dogbano, Jikwoyi, Phase 3, Abuja</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
