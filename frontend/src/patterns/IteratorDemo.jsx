import React, { useState } from 'react';

// Iterator Pattern
class VehicleCollection {
  constructor(vehicles) {
    this.vehicles = vehicles;
  }
  
  createIterator() {
    return new VehicleIterator(this.vehicles);
  }
  
  createReverseIterator() {
    return new ReverseVehicleIterator(this.vehicles);
  }
  
  createTypeIterator(vehicleType) {
    return new VehicleTypeIterator(this.vehicles, vehicleType);
  }
}

// Iterator Interface
class Iterator {
  hasNext() {
    throw new Error('Méthode abstraite');
  }
  
  next() {
    throw new Error('Méthode abstraite');
  }
  
  reset() {
    throw new Error('Méthode abstraite');
  }
}

// Concrete Iterators
class VehicleIterator extends Iterator {
  constructor(vehicles) {
    super();
    this.vehicles = vehicles;
    this.position = 0;
  }
  
  hasNext() {
    return this.position < this.vehicles.length;
  }
  
  next() {
    if (this.hasNext()) {
      return this.vehicles[this.position++];
    }
    return null;
  }
  
  reset() {
    this.position = 0;
  }
  
  getCurrentPosition() {
    return this.position;
  }
  
  getTotal() {
    return this.vehicles.length;
  }
}

class ReverseVehicleIterator extends Iterator {
  constructor(vehicles) {
    super();
    this.vehicles = vehicles;
    this.position = vehicles.length - 1;
  }
  
  hasNext() {
    return this.position >= 0;
  }
  
  next() {
    if (this.hasNext()) {
      return this.vehicles[this.position--];
    }
    return null;
  }
  
  reset() {
    this.position = this.vehicles.length - 1;
  }
}

class VehicleTypeIterator extends Iterator {
  constructor(vehicles, type) {
    super();
    this.vehicles = vehicles.filter(v => v.type === type);
    this.position = 0;
    this.type = type;
  }
  
  hasNext() {
    return this.position < this.vehicles.length;
  }
  
  next() {
    if (this.hasNext()) {
      return this.vehicles[this.position++];
    }
    return null;
  }
  
  reset() {
    this.position = 0;
  }
  
  getType() {
    return this.type;
  }
}

export function IteratorDemo() {
  const vehicles = [
    { id: 1, name: 'Tesla Model 3', type: 'electric', price: 45000 },
    { id: 2, name: 'Renault Zoé', type: 'electric', price: 32000 },
    { id: 3, name: 'Peugeot 208', type: 'gasoline', price: 22000 },
    { id: 4, name: 'BMW i3', type: 'electric', price: 42000 },
    { id: 5, name: 'Volkswagen Golf', type: 'gasoline', price: 28000 },
    { id: 6, name: 'Nissan Leaf', type: 'electric', price: 35000 },
    { id: 7, name: 'Ford Focus', type: 'gasoline', price: 25000 },
  ];
  
  const [iteratorType, setIteratorType] = useState('normal');
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState('all');
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [iterator, setIterator] = useState(null);
  const [visited, setVisited] = useState([]);
  const [stats, setStats] = useState({ total: 0, current: 0 });
  
  const initializeIterator = () => {
    const collection = new VehicleCollection(vehicles);
    let newIterator;
    
    if (iteratorType === 'reverse') {
      newIterator = collection.createReverseIterator();
    } else if (iteratorType === 'filter' && vehicleTypeFilter !== 'all') {
      newIterator = collection.createTypeIterator(vehicleTypeFilter);
    } else {
      newIterator = collection.createIterator();
    }
    
    setIterator(newIterator);
    setCurrentVehicle(null);
    setVisited([]);
    setStats({ total: newIterator.getTotal ? newIterator.getTotal() : vehicles.length, current: 0 });
  };
  
  const getNextVehicle = () => {
    if (iterator && iterator.hasNext()) {
      const vehicle = iterator.next();
      setCurrentVehicle(vehicle);
      setVisited(prev => [...prev, vehicle]);
      setStats(prev => ({ ...prev, current: visited.length + 1 }));
      return vehicle;
    } else {
      alert('Fin de la collection atteinte !');
      return null;
    }
  };
  
  const resetIterator = () => {
    if (iterator) {
      iterator.reset();
      setCurrentVehicle(null);
      setVisited([]);
      setStats(prev => ({ ...prev, current: 0 }));
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-orange-50 p-4 rounded-lg">
        <h3 className="font-bold text-orange-800 mb-2">Iterator Pattern</h3>
        <p className="text-orange-700">
          Fournit un moyen d'accéder séquentiellement aux éléments d'une collection sans exposer sa représentation interne.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne 1: Contrôles */}
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-gray-800 mb-2">Type d'itérateur :</h4>
            <div className="space-y-2">
              <button
                onClick={() => setIteratorType('normal')}
                className={`w-full p-3 text-left rounded-lg ${iteratorType === 'normal' ? 'bg-orange-100 text-orange-700 border-l-4 border-orange-500' : 'bg-gray-100'}`}
              >
                🔄 Parcours normal
              </button>
              <button
                onClick={() => setIteratorType('reverse')}
                className={`w-full p-3 text-left rounded-lg ${iteratorType === 'reverse' ? 'bg-orange-100 text-orange-700 border-l-4 border-orange-500' : 'bg-gray-100'}`}
              >
                ⏪ Parcours inversé
              </button>
              <button
                onClick={() => setIteratorType('filter')}
                className={`w-full p-3 text-left rounded-lg ${iteratorType === 'filter' ? 'bg-orange-100 text-orange-700 border-l-4 border-orange-500' : 'bg-gray-100'}`}
              >
                🔍 Parcours filtré
              </button>
            </div>
          </div>
          
          {iteratorType === 'filter' && (
            <div>
              <h4 className="font-bold text-gray-800 mb-2">Filtrer par type :</h4>
              <div className="flex space-x-2">
                <button
                  onClick={() => setVehicleTypeFilter('electric')}
                  className={`px-4 py-2 rounded-lg ${vehicleTypeFilter === 'electric' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                >
                  ⚡ Électrique
                </button>
                <button
                  onClick={() => setVehicleTypeFilter('gasoline')}
                  className={`px-4 py-2 rounded-lg ${vehicleTypeFilter === 'gasoline' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                  ⛽ Essence
                </button>
                <button
                  onClick={() => setVehicleTypeFilter('all')}
                  className={`px-4 py-2 rounded-lg ${vehicleTypeFilter === 'all' ? 'bg-gray-600 text-white' : 'bg-gray-200'}`}
                >
                  Tous
                </button>
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            <button
              onClick={initializeIterator}
              className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors"
            >
              Initialiser l'itérateur
            </button>
            
            {iterator && (
              <>
                <button
                  onClick={getNextVehicle}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Véhicule suivant
                </button>
                
                <button
                  onClick={resetIterator}
                  className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Réinitialiser
                </button>
              </>
            )}
          </div>
          
          {iterator && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-bold text-gray-700 mb-2">Statistiques :</h5>
              <div className="space-y-1 text-sm">
                <p>Véhicules parcourus: {stats.current}/{stats.total}</p>
                <p>Type d'itérateur: {iteratorType}</p>
                {iteratorType === 'filter' && vehicleTypeFilter !== 'all' && (
                  <p>Filtre: {vehicleTypeFilter}</p>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Colonne 2: Véhicule courant */}
        <div className="space-y-4">
          <h4 className="font-bold text-gray-800">Véhicule courant :</h4>
          
          {currentVehicle ? (
            <div className="bg-white border rounded-lg p-6">
              <div className="text-center">
                <div className="text-4xl mb-4">
                  {currentVehicle.type === 'electric' ? '⚡' : '⛽'}
                </div>
                <h3 className="text-2xl font-bold mb-2">{currentVehicle.name}</h3>
                <div className="text-lg text-gray-700 mb-4">
                  {currentVehicle.type === 'electric' ? 'Véhicule Électrique' : 'Véhicule Essence'}
                </div>
                
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg">
                  <p className="font-bold text-gray-800">Prix : {currentVehicle.price.toLocaleString()}€</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Position: {stats.current}/{stats.total}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
              {iterator ? 'Cliquez sur "Véhicule suivant"' : 'Initialisez d\'abord l\'itérateur'}
            </div>
          )}
          
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              🔄 Iterator Pattern: Accès séquentiel sans connaître la structure interne de la collection.
            </p>
          </div>
        </div>
        
        {/* Colonne 3: Historique */}
        <div className="space-y-4">
          <h4 className="font-bold text-gray-800">Véhicules visités :</h4>
          
          <div className="space-y-2 max-h-80 overflow-auto">
            {visited.length > 0 ? (
              visited.map((vehicle, index) => (
                <div key={index} className="bg-gray-50 border rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{vehicle.type === 'electric' ? '⚡' : '⛽'}</span>
                      <span className="font-medium">{vehicle.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">#{index + 1}</span>
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    {vehicle.price.toLocaleString()}€
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                Aucun véhicule visité
              </div>
            )}
          </div>
          
          {visited.length > 0 && (
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-green-800">
                📊 Total visités: {visited.length} véhicule{visited.length > 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="bg-white p-4 rounded-lg border">
          <h5 className="font-bold text-orange-700 mb-2">🎯 Abstraction du parcours</h5>
          <p className="text-gray-600">Cache la structure interne de la collection au client</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <h5 className="font-bold text-orange-700 mb-2">🔄 Plusieurs stratégies</h5>
          <p className="text-gray-600">Parcours normal, inversé, filtré avec la même interface</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <h5 className="font-bold text-orange-700 mb-2">📊 Contrôle du parcours</h5>
          <p className="text-gray-600">Avancer, reculer, réinitialiser à tout moment</p>
        </div>
      </div>
    </div>
  );
}
