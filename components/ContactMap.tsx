'use client'
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet'
import { Icon } from 'leaflet'
import { useEffect } from 'react'

function MapResizer() {
  const map = useMap()
  
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize()
    }, 100)
    
    return () => clearTimeout(timer)
  }, [map])
  
  return null
}

export default function ContactMap() {
  const customIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  })
  
  const position: [number, number] = [8.986, 7.555]
  
  return (
    <div className="h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-xl border border-white/10 relative z-0" style={{ height: '500px' }}>
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        className="h-full w-full"
        style={{ height: '100%', width: '100%', minHeight: '500px', zIndex: 10, position: 'relative' }}
        zoomControl={false}
      >
        <MapResizer />
        <ZoomControl position="bottomright" />
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customIcon}>
          <Popup className="font-sans">
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
}