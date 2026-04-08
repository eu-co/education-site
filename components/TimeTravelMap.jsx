'use client';

import { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Image from 'next/image';

// Fix for Leaflet's default icon missing in Next.js
// inside components/TimeTravelMap.jsx

const createCustomIcon = (imageUrl) => {
  // 1. Ensure the URL starts with / if it's a local path
  let finalUrl = imageUrl;
  if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('/')) {
    finalUrl = `/${imageUrl}`;
  }

  return L.divIcon({
    className: 'custom-composer-icon',
    html: `
      <div style="
        width: 44px; 
        height: 44px; 
        border-radius: 50%; 
        border: 2px solid white; 
        overflow: hidden; 
        background: #111;
        box-shadow: 0 0 15px rgba(236,72,153,0.5);
      ">
        <img 
          src="${finalUrl || ''}" 
          style="width: 100%; height: 100%; object-fit: cover;" 
          onerror="this.src='https://ui-avatars.com/api/?name=C&background=333&color=fff'"
        />
      </div>
    `,
    iconSize: [44, 44],
    iconAnchor: [22, 22]
  });
};

export default function TimeTravelMap({ composers }) {
  // Set timeline state (adjust min/max based on your data)
  const [year, setYear] = useState(1790);

  // 1. Filter composers to only show those alive and with a known location in the current 'year'
  const activeComposers = useMemo(() => {
    return composers.map(composer => {
      // Skip if no location history exists yet
      if (!composer.locationHistory || composer.locationHistory.length === 0) return null;

      // Find the specific location block where the current year falls between start and end
      const currentLocation = composer.locationHistory.find(
        loc => year >= loc.start && year <= loc.end
      );

      // If they weren't born, were dead, or we don't have location data for this year, ignore them
      if (!currentLocation) return null;

      // Return the composer combined with their specific location for this year
      return { ...composer, currentLocation };
    }).filter(Boolean); // Remove all the nulls
  }, [composers, year]);

  return (
    <div className="w-full bg-white rounded-3xl border border-[var(--border)] overflow-hidden shadow-lg">
      
      {/* MAP UI */}
      <div className="relative h-[500px] w-full z-0">
        <MapContainer 
          center={[48.2082, 16.3738]} // Centers on Vienna by default
          zoom={5} 
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          {/* CartoDB Positron - A clean, light-themed map perfect for overlays */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          {/* Render Active Composers */}
          {activeComposers.map((composer) => (
            <Marker 
              key={composer.id} 
              position={[composer.currentLocation.lat, composer.currentLocation.lng]}
              icon={createCustomIcon(composer.imageUrl)}
            >
              <Popup className="composer-popup">
                <div className="text-center p-1">
                  <h3 className="font-bold text-lg text-gray-900 leading-tight mb-1">{composer.name}</h3>
                  <p className="text-pink-500 font-semibold text-xs uppercase tracking-widest mb-2">
                    {composer.currentLocation.city} • Age: {year - parseInt(composer.lifespan.split('-')[0])}
                  </p>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {composer.bio}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* TIMELINE CONTROLS */}
      <div className="p-8 bg-gray-50 border-t border-[var(--border)]">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-400 font-bold">1650</span>
          <h2 className="text-4xl font-black text-[var(--ink)] tracking-tighter">
            {year}
          </h2>
          <span className="text-gray-400 font-bold">1950</span>
        </div>
        
        <input 
          type="range" 
          min="1650" 
          max="1950" 
          value={year} 
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500 hover:accent-pink-600 transition-all"
        />
        
        <p className="text-center text-gray-500 text-sm mt-4 font-medium">
          Drag the slider to see where composers were living in any given year. Currently tracking <strong className="text-pink-500">{activeComposers.length}</strong> active composers.
        </p>
      </div>
    </div>
  );
}