import React from 'react';
import { Car } from 'lucide-react';

export function Header() {
  return (
    <header className="h-16 flex items-center bg-blue-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <Car className="w-8 h-8 mr-3" />
          <h1 className="text-2xl font-bold">Mi Auto Estacionado</h1>
        </div>
      </div>
    </header>
  );
}