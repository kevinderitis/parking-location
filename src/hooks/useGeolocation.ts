import { useState, useCallback, useEffect } from 'react';

type PermissionStatus = 'granted' | 'denied' | 'prompt';

interface Position {
  lat: number;
  lng: number;
}

export function useGeolocation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>('prompt');

  useEffect(() => {
    navigator.permissions
      ?.query({ name: 'geolocation' })
      .then((result) => {
        setPermissionStatus(result.state as PermissionStatus);
        result.addEventListener('change', () => {
          setPermissionStatus(result.state as PermissionStatus);
        });
      });
  }, []);

  const getLocation = useCallback((): Promise<Position> => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      setError(null);

      if (!navigator.geolocation) {
        setLoading(false);
        setError('La geolocalización no está soportada en este navegador.');
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLoading(false);
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          setLoading(false);
          let errorMessage = 'Error al obtener la ubicación.';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Acceso a la ubicación denegado.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Información de ubicación no disponible.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Se agotó el tiempo de espera.';
              break;
          }
          
          setError(errorMessage);
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    });
  }, []);

  return {
    loading,
    error,
    getLocation,
    permissionStatus
  };
}