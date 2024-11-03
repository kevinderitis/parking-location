import { useState, useEffect } from 'react';
import { type Location } from '../types';

const STORAGE_KEY = 'parking-locations';
const ITEMS_PER_PAGE = 5;

export function useLocations() {
  const [locations, setLocations] = useState<Location[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
  }, [locations]);

  const addLocation = (location: Omit<Location, 'id'>) => {
    const newLocation: Location = {
      ...location,
      id: crypto.randomUUID(),
    };
    setLocations(prev => [newLocation, ...prev]);
  };

  const paginatedLocations = locations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(locations.length / ITEMS_PER_PAGE);

  const nextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  return {
    locations: paginatedLocations,
    addLocation,
    latestLocation: locations[0] || null,
    pagination: {
      currentPage,
      totalPages,
      nextPage,
      prevPage,
      hasNext: currentPage < totalPages,
      hasPrev: currentPage > 1,
      total: locations.length
    }
  };
}