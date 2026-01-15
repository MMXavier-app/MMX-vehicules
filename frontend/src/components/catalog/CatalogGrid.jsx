import React from 'react';
import { VehicleCard } from './VehicleCard';

// Itérateur personnalisé pour les véhicules
class VehicleIterator {
  constructor(vehicles) {
    this.vehicles = vehicles;
    this.index = 0;
  }

  hasNext() {
    return this.index < this.vehicles.length;
  }

  next() {
    if (this.hasNext()) {
      return this.vehicles[this.index++];
    }
    return null;
  }

  reset() {
    this.index = 0;
  }
}

export const CatalogGrid = ({ vehicles, viewMode = 'grid', itemsPerRow = 3 }) => {
  const iterator = new VehicleIterator(vehicles);
  const displayedVehicles = [];
  
  while (iterator.hasNext()) {
    displayedVehicles.push(iterator.next());
  }

  const gridClasses = {
    1: 'grid-cols-1 max-w-2xl mx-auto',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const cardSize = viewMode === 'compact' ? itemsPerRow : 1;

  return (
    <div className={`grid gap-6 ${gridClasses[cardSize] || gridClasses[3]}`}>
      {displayedVehicles.map((vehicle) => (
        <VehicleCard 
          key={vehicle.id} 
          vehicle={vehicle}
        />
      ))}
    </div>
  );
};

// Composant pour basculer entre les modes d'affichage
export const ViewModeToggle = ({ viewMode, onViewModeChange }) => {
  return (
    <div className="flex items-center gap-2 mb-6">
      <span className="text-gray-700 mr-3">Affichage :</span>
      <button
        onClick={() => onViewModeChange('grid')}
        className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
        title="Vue grille"
      >
        ▫️ Grille
      </button>
      <button
        onClick={() => onViewModeChange('compact')}
        className={`p-2 rounded-lg ${viewMode === 'compact' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
        title="Vue compacte"
      >
        ▦ Compact
      </button>
      <button
        onClick={() => onViewModeChange('list')}
        className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
        title="Vue liste"
      >
        ☰ Liste
      </button>
    </div>
  );
};
