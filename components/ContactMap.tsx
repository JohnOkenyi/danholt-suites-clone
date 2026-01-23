'use client'

import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet'

import { Icon } from 'leaflet'
import { useEffect, useState } from 'react'

export default function ContactMap() {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return <div className="h-[400px] w-full bg-gray-100 rounded-2xl animate-pulse" />

    // Fix for default Leaflet icon not loading in Next.js
    // Defined here to ensure it only runs on client-side
    const customIcon = new Icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    })

    // Jikwoyi, Abuja coordinates
    // Approximate location for Jikwoyi Phase 3
    const position: [number, number] = [8.986, 7.555]

    return (
        <div className="h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-xl border border-white/10 relative z-0">
            <MapContainer
                center={position}
                zoom={15}
                scrollWheelZoom={false}
                className="h-full w-full"
                style={{ height: '100%', width: '100%', minHeight: '400px' }}
                zoomControl={false}
            >
                <ZoomControl position="bottomright" />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
