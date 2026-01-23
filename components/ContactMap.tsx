'use client'

import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

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
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            <div style={{ textAlign: 'center', padding: '8px' }}>
              <h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>Danholt Suites</h3>
              <p style={{ fontSize: '14px', margin: '4px 0' }}>#3 Iyabo, Obeyode Street</p>
              <p style={{ fontSize: '12px', margin: '4px 0' }}>(Beside Collinear Hospital)</p>
              <p style={{ fontSize: '14px', margin: '4px 0' }}>Dogbano, Jikwoyi, Phase 3, Abuja</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
