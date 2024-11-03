import React from 'react';
import { MapPin } from 'lucide-react';

interface SaveLocationButtonProps {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export function SaveLocationButton({ onClick, loading, disabled }: SaveLocationButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className={`flex-1 rounded-lg py-4 px-6 flex items-center justify-center text-lg font-semibold transition-colors
        ${disabled 
          ? 'bg-gray-400 cursor-not-allowed' 
          : loading 
            ? 'bg-blue-200 cursor-wait'
            : 'bg-white text-blue-900 hover:bg-blue-50'
        }`}
    >
      <MapPin className={`w-6 h-6 mr-2 ${loading ? 'animate-pulse' : ''}`} />
      {loading ? 'Obteniendo ubicación...' : 'Guardar Ubicación'}
    </button>
  );
}