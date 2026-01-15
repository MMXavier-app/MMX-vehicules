import React, { useState } from 'react';

// Abstract Factory Pattern
class Vehicle {
  constructor(type, model, price) {
    this.type = type;
    this.model = model;
    this.price = price;
  }
  
  getDescription() {
    return `${this.type} ${this.model} - ${this.price}€`;
  }
}

class GasolineCar extends Vehicle {
  constructor(model, price) {
    super('Automobile Essence', model, price);
    this.fuel = 'Essence';
    this.emissions = 'CO2: 120g/km';
    this.icon = '⛽';
  }
}

class ElectricCar extends Vehicle {
  constructor(model, price) {
    super('Automobile Électrique', model, price);
    this.fuel = 'Électrique';
    this.autonomy = 'Autonomie: 500km';
    this.icon = '⚡';
  }
}

class GasolineScooter extends Vehicle {
  constructor(model, price) {
    super('Scooter Essence', model, price);
    this.fuel = 'Essence';
    this.engine = '125cc';
    this.icon = '🛵';
  }
}

class ElectricScooter extends Vehicle {
  constructor(model, price) {
    super('Scooter Électrique', model, price);
    this.fuel = 'Électrique';
    this.autonomy = 'Autonomie: 100km';
    this.icon = '🔋';
  }
}

// Abstract Factory Interface
class VehicleFactory {
  createCar(model, price) {
    throw new Error('Méthode abstraite');
  }
  
  createScooter(model, price) {
    throw new Error('Méthode abstraite');
  }
}

// Concrete Factories
class GasolineVehicleFactory extends VehicleFactory {
  createCar(model, price) {
    return new GasolineCar(model, price);
  }
  
  createScooter(model, price) {
    return new GasolineScooter(model, price);
  }
}

class ElectricVehicleFactory extends VehicleFactory {
  createCar(model, price) {
    return new ElectricCar(model, price);
  }
  
  createScooter(model, price) {
    return new ElectricScooter(model, price);
  }
}

export function VehicleFactoryDemo() {
  const [factoryType, setFactoryType] = useState('gasoline');
  const [vehicles, setVehicles] = useState([]);
  
  const createVehicles = () => {
    const factory = factoryType === 'gasoline' 
      ? new GasolineVehicleFactory() 
      : new ElectricVehicleFactory();
    
    const newVehicles = [
      factory.createCar('Modèle Premium', factoryType === 'gasoline' ? 35000 : 45000),
      factory.createScooter('Modèle Urbain', factoryType === 'gasoline' ? 5000 : 7000),
      factory.createCar('Modèle Familial', factoryType === 'gasoline' ? 28000 : 38000),
    ];
    
    setVehicles(newVehicles);
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-bold text-blue-800 mb-2">Abstract Factory Pattern</h3>
        <p className="text-blue-700">
          Crée des familles d'objets liés (véhicules essence/électrique) sans spécifier leurs classes concrètes.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sélectionner le type de factory :
            </label>
            <div className="flex space-x-4">
              <button
                onClick={() => setFactoryType('gasoline')}
                className={`px-4 py-2 rounded-lg ${factoryType === 'gasoline' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                ⛽ Factory Essence
              </button>
              <button
                onClick={() => setFactoryType('electric')}
                className={`px-4 py-2 rounded-lg ${factoryType === 'electric' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
              >
                ⚡ Factory Électrique
              </button>
            </div>
          </div>
          
          <button
            onClick={createVehicles}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Créer des véhicules avec {factoryType === 'gasoline' ? 'Factory Essence' : 'Factory Électrique'}
          </button>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-2">Code du Pattern :</h4>
            <pre className="text-sm bg-gray-800 text-gray-100 p-3 rounded overflow-auto">
{`class VehicleFactory {
  createCar() { /* abstrait */ }
  createScooter() { /* abstrait */ }
}

class GasolineVehicleFactory extends VehicleFactory {
  createCar() { return new GasolineCar(); }
  createScooter() { return new GasolineScooter(); }
}`}
            </pre>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-gray-800 mb-4">Véhicules créés :</h4>
          {vehicles.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Cliquez sur "Créer des véhicules" pour générer
            </div>
          ) : (
            <div className="space-y-4">
              {vehicles.map((vehicle, index) => (
                <div key={index} className="bg-white border rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{vehicle.icon}</span>
                        <h5 className="font-bold">{vehicle.type}</h5>
                      </div>
                      <p className="text-gray-600">{vehicle.model}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{vehicle.price}€</p>
                      <p className="text-sm text-gray-500">{vehicle.fuel}</p>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    {vehicle.emissions || vehicle.autonomy || vehicle.engine}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
