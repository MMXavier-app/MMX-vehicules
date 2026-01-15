import React, { useState } from 'react';

// Template Method Pattern
class OrderCalculator {
  constructor(vehicle, options = []) {
    this.vehicle = vehicle;
    this.options = options;
  }
  
  // Template Method - définit le squelette de l'algorithme
  calculateTotal() {
    const basePrice = this.calculateBasePrice();
    const optionsPrice = this.calculateOptionsPrice();
    const tax = this.calculateTax();
    const discount = this.calculateDiscount();
    
    const subtotal = basePrice + optionsPrice;
    const totalBeforeTax = subtotal - discount;
    const total = totalBeforeTax + tax;
    
    return {
      basePrice,
      optionsPrice,
      subtotal,
      discount,
      totalBeforeTax,
      tax,
      total,
      breakdown: this.getBreakdown()
    };
  }
  
  // Méthodes primitives (à implémenter par les sous-classes)
  calculateTax() {
    throw new Error('Méthode abstraite');
  }
  
  calculateDiscount() {
    throw new Error('Méthode abstraite');
  }
  
  // Méthodes concrètes (déjà implémentées)
  calculateBasePrice() {
    return this.vehicle.price;
  }
  
  calculateOptionsPrice() {
    return this.options.reduce((total, option) => total + (option.price || 500), 0);
  }
  
  getBreakdown() {
    return `Calcul pour ${this.vehicle.name}`;
  }
}

// Calcul pour la France
class FranceOrderCalculator extends OrderCalculator {
  calculateTax() {
    // TVA 20% en France
    const basePrice = this.calculateBasePrice();
    const optionsPrice = this.calculateOptionsPrice();
    const discount = this.calculateDiscount();
    
    return (basePrice + optionsPrice - discount) * 0.20;
  }
  
  calculateDiscount() {
    // Pas de remise par défaut en France
    return 0;
  }
  
  getBreakdown() {
    return `France: TVA 20%, pas de remise spécifique`;
  }
}

// Calcul pour l'Allemagne
class GermanyOrderCalculator extends OrderCalculator {
  calculateTax() {
    // TVA 19% en Allemagne
    const basePrice = this.calculateBasePrice();
    const optionsPrice = this.calculateOptionsPrice();
    const discount = this.calculateDiscount();
    
    return (basePrice + optionsPrice - discount) * 0.19;
  }
  
  calculateDiscount() {
    // Réduction écologique pour véhicules électriques en Allemagne
    if (this.vehicle.type === 'electric') {
      return this.calculateBasePrice() * 0.10; // 10% de réduction
    }
    return 0;
  }
  
  getBreakdown() {
    return `Allemagne: TVA 19%, ${this.vehicle.type === 'electric' ? '10% réduction écologique' : 'pas de remise'}`;
  }
}

// Calcul pour la Belgique
class BelgiumOrderCalculator extends OrderCalculator {
  calculateTax() {
    // TVA 21% en Belgique
    const basePrice = this.calculateBasePrice();
    const optionsPrice = this.calculateOptionsPrice();
    const discount = this.calculateDiscount();
    
    return (basePrice + optionsPrice - discount) * 0.21;
  }
  
  calculateDiscount() {
    // Réduction pour options nombreuses
    if (this.options.length >= 3) {
      return 1000; // 1000€ de réduction
    }
    return 0;
  }
  
  getBreakdown() {
    return `Belgique: TVA 21%, ${this.options.length >= 3 ? '1000€ de réduction pour 3+ options' : 'pas de remise'}`;
  }
}

export function TemplateMethodDemo() {
  const vehicles = [
    { name: 'Tesla Model 3', price: 45000, type: 'electric' },
    { name: 'Peugeot 208', price: 22000, type: 'gasoline' },
    { name: 'BMW i4', price: 55000, type: 'electric' },
  ];
  
  const options = [
    { name: 'GPS', price: 750 },
    { name: 'Sièges chauffants', price: 1200 },
    { name: 'Toit panoramique', price: 1800 },
    { name: 'Peinture métallisée', price: 900 },
    { name: 'Jantes alliage', price: 1500 },
  ];
  
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]);
  const [selectedOptions, setSelectedOptions] = useState([options[0], options[1]]);
  const [selectedCountry, setSelectedCountry] = useState('france');
  const [calculation, setCalculation] = useState(null);
  
  const calculateOrder = () => {
    let calculator;
    
    switch (selectedCountry) {
      case 'germany':
        calculator = new GermanyOrderCalculator(selectedVehicle, selectedOptions);
        break;
      case 'belgium':
        calculator = new BelgiumOrderCalculator(selectedVehicle, selectedOptions);
        break;
      default:
        calculator = new FranceOrderCalculator(selectedVehicle, selectedOptions);
    }
    
    const result = calculator.calculateTotal();
    setCalculation(result);
  };
  
  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(o => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-cyan-50 p-4 rounded-lg">
        <h3 className="font-bold text-cyan-800 mb-2">Template Method Pattern</h3>
        <p className="text-cyan-700">
          Définit le squelette d'un algorithme dans une méthode, en laissant certaines étapes aux sous-classes.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne 1: Configuration */}
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-gray-800 mb-3">Sélection du véhicule :</h4>
            <div className="space-y-2">
              {vehicles.map(vehicle => (
                <button
                  key={vehicle.name}
                  onClick={() => setSelectedVehicle(vehicle)}
                  className={`w-full p-3 text-left rounded-lg ${selectedVehicle.name === vehicle.name ? 'bg-cyan-100 text-cyan-700 border-l-4 border-cyan-500' : 'bg-gray-100'}`}
                >
                  <div className="flex justify-between items-center">
                    <span>{vehicle.name}</span>
                    <span className="font-bold">{vehicle.price.toLocaleString()}€</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {vehicle.type === 'electric' ? '⚡ Électrique' : '⛽ Essence'}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-800 mb-3">Options :</h4>
            <div className="space-y-2">
              {options.map(option => (
                <button
                  key={option.name}
                  onClick={() => toggleOption(option)}
                  className={`w-full p-3 text-left rounded-lg ${selectedOptions.includes(option) ? 'bg-green-100 text-green-700 border-l-4 border-green-500' : 'bg-gray-100'}`}
                >
                  <div className="flex justify-between items-center">
                    <span>{option.name}</span>
                    <span className="font-bold">{option.price}€</span>
                  </div>
                  {selectedOptions.includes(option) && (
                    <div className="text-sm text-green-600 mt-1">✅ Sélectionné</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Colonne 2: Pays et calcul */}
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-gray-800 mb-3">Pays de livraison :</h4>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setSelectedCountry('france')}
                className={`p-4 rounded-lg flex flex-col items-center ${selectedCountry === 'france' ? 'bg-blue-100 text-blue-700 border-2 border-blue-300' : 'bg-gray-100'}`}
              >
                <span className="text-2xl">🇫🇷</span>
                <span className="font-medium mt-1">France</span>
                <span className="text-xs text-gray-600">TVA 20%</span>
              </button>
              
              <button
                onClick={() => setSelectedCountry('germany')}
                className={`p-4 rounded-lg flex flex-col items-center ${selectedCountry === 'germany' ? 'bg-black text-white border-2 border-gray-300' : 'bg-gray-100'}`}
              >
                <span className="text-2xl">🇩🇪</span>
                <span className="font-medium mt-1">Allemagne</span>
                <span className="text-xs text-gray-600">TVA 19%</span>
              </button>
              
              <button
                onClick={() => setSelectedCountry('belgium')}
                className={`p-4 rounded-lg flex flex-col items-center ${selectedCountry === 'belgium' ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300' : 'bg-gray-100'}`}
              >
                <span className="text-2xl">🇧🇪</span>
                <span className="font-medium mt-1">Belgique</span>
                <span className="text-xs text-gray-600">TVA 21%</span>
              </button>
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                {selectedCountry === 'france' && 'France: Pas de remise spécifique'}
                {selectedCountry === 'germany' && 'Allemagne: 10% de réduction pour véhicules électriques'}
                {selectedCountry === 'belgium' && 'Belgique: 1000€ de réduction pour 3 options ou plus'}
              </p>
            </div>
          </div>
          
          <button
            onClick={calculateOrder}
            className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 transition-colors text-lg font-bold"
          >
            Calculer la commande
          </button>
          
          {calculation && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-bold text-gray-700 mb-2">Détails du calcul :</h5>
              <div className="text-sm space-y-1">
                <p>{calculation.breakdown}</p>
                <p>Options sélectionnées: {selectedOptions.length}</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Colonne 3: Résultats */}
        <div>
          <h4 className="font-bold text-gray-800 mb-4">Détail du calcul :</h4>
          
          {calculation ? (
            <div className="space-y-4">
              <div className="bg-white border rounded-lg p-6">
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span>Prix véhicule :</span>
                    <span className="font-bold">{calculation.basePrice.toLocaleString()}€</span>
                  </div>
                  
                  <div className="flex justify-between border-b pb-2">
                    <span>Options ({selectedOptions.length}) :</span>
                    <span className="font-bold">{calculation.optionsPrice.toLocaleString()}€</span>
                  </div>
                  
                  <div className="flex justify-between border-b pb-2">
                    <span>Sous-total :</span>
                    <span className="font-bold">{calculation.subtotal.toLocaleString()}€</span>
                  </div>
                  
                  <div className="flex justify-between border-b pb-2">
                    <span>Remise :</span>
                    <span className="font-bold text-green-600">-{calculation.discount.toLocaleString()}€</span>
                  </div>
                  
                  <div className="flex justify-between border-b pb-2">
                    <span>Total avant taxes :</span>
                    <span className="font-bold">{calculation.totalBeforeTax.toLocaleString()}€</span>
                  </div>
                  
                  <div className="flex justify-between border-b pb-2">
                    <span>Taxes ({selectedCountry === 'france' ? '20%' : selectedCountry === 'germany' ? '19%' : '21%'}) :</span>
                    <span className="font-bold text-red-600">+{calculation.tax.toLocaleString()}€</span>
                  </div>
                  
                  <div className="flex justify-between pt-2">
                    <span className="text-lg font-bold">TOTAL :</span>
                    <span className="text-2xl font-bold text-green-600">
                      {calculation.total.toLocaleString()}€
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-lg">
                <p className="font-bold text-cyan-800 mb-2">Template Method en action :</p>
                <p className="text-sm text-cyan-700">
                  Le squelette de calcul (calculateTotal) est fixe, mais les sous-classes 
                  implémentent calculateTax() et calculateDiscount() différemment selon le pays.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
              <p>Configurez la commande et cliquez sur "Calculer"</p>
              <p className="text-sm mt-2">Le Template Method adapte le calcul selon le pays</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-bold text-gray-800 mb-2">Structure du Template Method :</h4>
        <pre className="text-sm bg-gray-800 text-gray-100 p-3 rounded overflow-auto">
{`abstract class OrderCalculator {
  // Template Method (squelette fixe)
  calculateTotal() {
    const base = this.calculateBasePrice();
    const tax = this.calculateTax();      // ← Méthode abstraite
    const discount = this.calculateDiscount(); // ← Méthode abstraite
    return base + tax - discount;
  }
  
  // Méthodes primitives (implémentées par sous-classes)
  abstract calculateTax();
  abstract calculateDiscount();
  
  // Méthodes concrètes (déjà implémentées)
  calculateBasePrice() { return this.vehicle.price; }
}

class FranceCalculator extends OrderCalculator {
  calculateTax() { return this.calculateBasePrice() * 0.20; }
  calculateDiscount() { return 0; }
}`}
        </pre>
      </div>
    </div>
  );
}
