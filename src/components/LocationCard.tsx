import React from 'react';
import { Navigation } from 'lucide-react';
import { type Location } from '../types';

interface LocationCardProps {
  location: Location;
  isLatest?: boolean;
}

export function LocationCard({ location, isLatest }: LocationCardProps) {
  const mapUrl = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${location.lat},${location.lng}&zoom=17`;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg shadow-lg flex flex-col h-[500px]">
      <div className="p-4 flex-shrink-0">
        <h2 className="text-xl font-semibold mb-2">
          {isLatest ? 'Ubicación Actual' : 'Ubicación Guardada'}
        </h2>
        <p className="text-sm mb-2">
          <span className="text-blue-200">Guardado el:</span> {location.timestamp}
        </p>
        <p className="text-sm mb-2">
          <span className="text-blue-200">Coordenadas:</span>
          <br />
          {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
        </p>
      </div>
      
      <div className="flex-1 relative">
        <iframe
          title="Ubicación del auto"
          width="100%"
          height="100%"
          frameBorder="0"
          src={embedUrl}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full"
        />
      </div>

      <div className="p-4 flex-shrink-0">
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-3 px-4 transition-colors"
        >
          <Navigation className="w-5 h-5 mr-2" />
          Ver en Google Maps
        </a>
      </div>
    </div>
  );
}