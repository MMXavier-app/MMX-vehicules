import React, { useState, useEffect } from 'react';

// Observer Pattern
class VehicleObserver {
  constructor(name) {
    this.name = name;
    this.updates = [];
  }
  
  update(vehicle, event) {
    const updateMsg = `[${this.name}] ${vehicle} - ${event}`;
    this.updates.push(updateMsg);
    return updateMsg;
  }
  
  getUpdates() {
    return this.updates;
  }
  
  clearUpdates() {
    this.updates = [];
  }
}

class VehicleSubject {
  constructor() {
    this.observers = [];
  }
  
  attach(observer) {
    this.observers.push(observer);
  }
  
  detach(observer) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }
  
  notify(vehicle, event) {
    return this.observers.map(observer => 
      observer.update(vehicle, event)
    );
  }
}

// Decorator Pattern - Base Component
class VehicleDisplay {
  constructor(vehicle) {
    this.vehicle = vehicle;
  }
  
  display() {
    return `Véhicule: ${this.vehicle.name}`;
  }
  
  getPrice() {
    return this.vehicle.price;
  }
}

// Decorator de base
class VehicleDecorator extends VehicleDisplay {
  constructor(vehicleDisplay) {
    super(vehicleDisplay.vehicle);
    this.vehicleDisplay = vehicleDisplay;
  }
  
  display() {
    return this.vehicleDisplay.display();
  }
  
  getPrice() {
    return this.vehicleDisplay.getPrice();
  }
}

// Decorators concrets
class AnimationDecorator extends VehicleDecorator {
  display() {
    return `${this.vehicleDisplay.display()} 🎥 [Animation 3D incluse]`;
  }
  
  getPrice() {
    return this.vehicleDisplay.getPrice() + 500; // Animation coûte 500€
  }
}

class DiscountDecorator extends VehicleDecorator {
  constructor(vehicleDisplay, discountPercent) {
    super(vehicleDisplay);
    this.discountPercent = discountPercent;
  }
  
  display() {
    return `${this.vehicleDisplay.display()} 🏷️ [Promotion: -${this.discountPercent}%]`;
  }
  
  getPrice() {
    const originalPrice = this.vehicleDisplay.getPrice();
    return originalPrice * (1 - this.discountPercent / 100);
  }
}

class OptionsDecorator extends VehicleDecorator {
  constructor(vehicleDisplay, options) {
    super(vehicleDisplay);
    this.options = options;
  }
  
  display() {
    const optionsStr = this.options.join(', ');
    return `${this.vehicleDisplay.display()} ⚙️ [Options: ${optionsStr}]`;
  }
  
  getPrice() {
    return this.vehicleDisplay.getPrice() + (this.options.length * 750);
  }
}

export function DecoratorObserverDemo() {
  const [vehicle, setVehicle] = useState({
    name: 'Tesla Model 3',
    price: 45000,
    basePrice: 45000
  });
  
  const [decorators, setDecorators] = useState([]);
  const [observers, setObservers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [displayText, setDisplayText] = useState('');
  const [finalPrice, setFinalPrice] = useState(vehicle.price);
  
  // Observers
  const catalogObserver = new VehicleObserver('Catalogue');
  const cartObserver = new VehicleObserver('Panier');
  const stockObserver = new VehicleObserver('Stock');
  
  // Subject
  const vehicleSubject = new VehicleSubject();
  vehicleSubject.attach(catalogObserver);
  vehicleSubject.attach(cartObserver);
  vehicleSubject.attach(stockObserver);
  
  const toggleDecorator = (decoratorType) => {
    setDecorators(prev => {
      if (prev.includes(decoratorType)) {
        return prev.filter(d => d !== decoratorType);
      } else {
        return [...prev, decoratorType];
      }
    });
  };
  
  const updateVehicleDisplay = () => {
    // Créer l'affichage de base
    let display = new VehicleDisplay(vehicle);
    
    // Appliquer les décorateurs
    if (decorators.includes('animation')) {
      display = new AnimationDecorator(display);
      vehicleSubject.notify(vehicle.name, 'Animation ajoutée');
    }
    
    if (decorators.includes('discount')) {
      display = new DiscountDecorator(display, 15);
      vehicleSubject.notify(vehicle.name, 'Promotion 15% appliquée');
    }
    
    if (decorators.includes('options')) {
      display = new OptionsDecorator(display, ['GPS', 'Sièges chauffants', 'Toit panoramique']);
      vehicleSubject.notify(vehicle.name, 'Options premium ajoutées');
    }
    
    // Notifier les changements
    const msgs = vehicleSubject.notify(vehicle.name, 'Affichage mis à jour');
    setNotifications(msgs);
    
    // Mettre à jour l'affichage
    setDisplayText(display.display());
    setFinalPrice(display.getPrice());
    
    // Récupérer les updates des observateurs
    setObservers([
      { name: 'Catalogue', updates: catalogObserver.getUpdates() },
      { name: 'Panier', updates: cartObserver.getUpdates() },
      { name: 'Stock', updates: stockObserver.getUpdates() }
    ]);
  };
  
  useEffect(() => {
    updateVehicleDisplay();
  }, [decorators]);
  
  return (
    <div className="space-y-6">
      <div className="bg-pink-50 p-4 rounded-lg">
        <h3 className="font-bold text-pink-800 mb-2">Decorator + Observer Patterns</h3>
        <p className="text-pink-700">
          Decorator: Ajoute dynamiquement des fonctionnalités. Observer: Notifie des changements d'état.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne 1: Decorators */}
        <div className="space-y-4">
          <h4 className="font-bold text-gray-800">Decorators disponibles :</h4>
          <div className="space-y-3">
            <button
              onClick={() => toggleDecorator('animation')}
              className={`w-full p-3 text-left rounded-lg ${decorators.includes('animation') ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500' : 'bg-gray-100'}`}
            >
              <div className="flex items-center justify-between">
                <span>🎥 Animation 3D (+500€)</span>
                {decorators.includes('animation') && <span>✅</span>}
              </div>
            </button>
            
            <button
              onClick={() => toggleDecorator('discount')}
              className={`w-full p-3 text-left rounded-lg ${decorators.includes('discount') ? 'bg-green-100 text-green-700 border-l-4 border-green-500' : 'bg-gray-100'}`}
            >
              <div className="flex items-center justify-between">
                <span>🏷️ Promotion 15%</span>
                {decorators.includes('discount') && <span>✅</span>}
              </div>
            </button>
            
            <button
              onClick={() => toggleDecorator('options')}
              className={`w-full p-3 text-left rounded-lg ${decorators.includes('options') ? 'bg-purple-100 text-purple-700 border-l-4 border-purple-500' : 'bg-gray-100'}`}
            >
              <div className="flex items-center justify-between">
                <span>⚙️ Options Premium (+2.250€)</span>
                {decorators.includes('options') && <span>✅</span>}
              </div>
            </button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-bold text-gray-700 mb-2">Prix :</h5>
            <div className="text-lg font-bold text-green-600">
              {finalPrice.toLocaleString()}€
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Prix de base: {vehicle.basePrice.toLocaleString()}€
            </p>
            {decorators.includes('discount') && (
              <p className="text-sm text-green-600 mt-1">
                Économie: {((vehicle.basePrice * 0.15) + (decorators.includes('animation') ? 500 : 0) + (decorators.includes('options') ? 2250 : 0)).toLocaleString()}€
              </p>
            )}
          </div>
        </div>
        
        {/* Colonne 2: Affichage */}
        <div className="space-y-4">
          <h4 className="font-bold text-gray-800">Affichage du véhicule :</h4>
          <div className="bg-white border rounded-lg p-6">
            <div className="text-center">
              <div className="text-4xl mb-4">🚗</div>
              <h3 className="text-xl font-bold mb-2">{vehicle.name}</h3>
              <div className="text-lg text-gray-700 mb-6">
                {displayText || 'Véhicule de base'}
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <p className="font-bold text-gray-800">Decorator Pattern</p>
                <p className="text-sm text-gray-600 mt-1">
                  Les fonctionnalités sont ajoutées dynamiquement sans modifier la classe de base.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-3 rounded-lg">
            <p className="text-sm text-yellow-800">
              💡 Cliquez sur les décorateurs pour modifier dynamiquement l'affichage et le prix.
            </p>
          </div>
        </div>
        
        {/* Colonne 3: Observers */}
        <div className="space-y-4">
          <h4 className="font-bold text-gray-800">Observers (Notifications) :</h4>
          <div className="space-y-4">
            {observers.map((observer, idx) => (
              <div key={idx} className="bg-gray-50 border rounded-lg p-4">
                <h5 className="font-bold text-gray-700 mb-2">{observer.name}</h5>
                <div className="space-y-1 max-h-40 overflow-auto">
                  {observer.updates.length > 0 ? (
                    observer.updates.map((update, updateIdx) => (
                      <div key={updateIdx} className="text-sm p-2 bg-white rounded border">
                        {update}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">Aucune notification</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              📢 Observer Pattern: Les composants sont notifiés automatiquement des changements.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="bg-white p-4 rounded-lg border">
          <h5 className="font-bold text-pink-700 mb-2">🎨 Decorator Pattern</h5>
          <p className="text-gray-600">Ajoute des responsabilités à un objet dynamiquement. Flexible et respecte le principe ouvert/fermé.</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <h5 className="font-bold text-pink-700 mb-2">👁️ Observer Pattern</h5>
          <p className="text-gray-600">Définit une dépendance un-à-plusieurs entre objets pour les notifier des changements.</p>
        </div>
      </div>
    </div>
  );
}
