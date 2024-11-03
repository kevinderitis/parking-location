import React, { useState } from 'react';
import { History, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { Header } from './components/Header';
import { LocationCard } from './components/LocationCard';
import { SaveLocationButton } from './components/SaveLocationButton';
import { useLocations } from './hooks/useLocations';
import { useGeolocation } from './hooks/useGeolocation';

export function App() {
  const { locations, addLocation, latestLocation, pagination } = useLocations();
  const { loading, error, getLocation, permissionStatus } = useGeolocation();
  const [showHistory, setShowHistory] = useState(false);

  const saveLocation = async () => {
    try {
      const position = await getLocation();
      if (position) {
        addLocation({
          ...position,
          timestamp: new Date().toLocaleString('es-ES')
        });
      }
    } catch (error) {
      console.error('Failed to save location:', error);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-blue-900 to-blue-700 text-white flex flex-col overflow-hidden">
      <Header />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="container mx-auto px-4 py-4 flex flex-col h-full max-w-2xl">
          <div className="flex gap-4 mb-4 flex-shrink-0">
            <SaveLocationButton 
              onClick={saveLocation} 
              loading={loading} 
              disabled={permissionStatus === 'denied'}
            />

            <button
              onClick={() => setShowHistory(prev => !prev)}
              className="flex-shrink-0 bg-blue-800 hover:bg-blue-700 text-white rounded-lg px-6 flex items-center justify-center transition-colors"
              aria-label="Ver historial"
            >
              <History className="w-6 h-6" />
            </button>
          </div>

          {error && (
            <div className="bg-red-500/20 text-white p-4 rounded-lg mb-4 flex-shrink-0">
              <p className="text-sm">{error}</p>
              {permissionStatus === 'denied' && (
                <p className="text-sm mt-2">
                  Para volver a habilitar el acceso, busca el ícono 🔒 o ⓘ en la barra de direcciones 
                  y cambia la configuración de ubicación.
                </p>
              )}
            </div>
          )}

          <div className="flex-1 min-h-0 overflow-hidden">
            {showHistory ? (
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-4 flex-shrink-0">
                  <h2 className="text-2xl font-bold">Ubicaciones Anteriores</h2>
                  {latestLocation && (
                    <button
                      onClick={() => setShowHistory(false)}
                      className="flex items-center gap-2 text-sm bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      <MapPin className="w-4 h-4" />
                      Ver Actual
                    </button>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 min-h-0">
                  {locations.map((location) => (
                    <LocationCard
                      key={location.id}
                      location={location}
                      isLatest={location.id === latestLocation?.id}
                    />
                  ))}
                  {locations.length === 0 && (
                    <p className="text-center text-blue-100">
                      No hay ubicaciones guardadas
                    </p>
                  )}
                </div>

                {pagination.total > 5 && (
                  <div className="flex items-center justify-between mt-4 bg-white/10 p-4 rounded-lg flex-shrink-0">
                    <button
                      onClick={pagination.prevPage}
                      disabled={!pagination.hasPrev}
                      className="flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Anterior
                    </button>
                    <span>
                      Página {pagination.currentPage} de {pagination.totalPages}
                    </span>
                    <button
                      onClick={pagination.nextPage}
                      disabled={!pagination.hasNext}
                      className="flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Siguiente
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full">
                {latestLocation ? (
                  <LocationCard location={latestLocation} isLatest />
                ) : (
                  <div className="text-center text-blue-100">
                    <p>Presiona el botón para guardar la ubicación de tu auto</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}