import React, { useState } from 'react';

const TemplateMethod = () => {
  const [order, setOrder] = useState({
    basePrice: 25000,
    country: 'France',
    vehicleType: 'car',
    options: ['climatisation', 'jantes-alliage'],
    quantity: 1
  });

  const [calculationResult, setCalculationResult] = useState(null);

  // Classe de base Template Method
  class OrderCalculator {
    calculateTotal(order) {
      let total = this.calculateBaseAmount(order);
      total = this.applyTaxes(total, order);
      total = this.applyOptions(total, order);
      total = this.applyQuantityDiscount(total, order);
      total = this.applyCountrySpecificAdjustments(total, order);
      return this.finalizeCalculation(total, order);
    }

    // Méthodes template (à surcharger)
    calculateBaseAmount(order) {
      return order.basePrice;
    }

    applyTaxes(amount, order) {
      // Par défaut : TVA française 20%
      return amount * 1.20;
    }

    applyOptions(amount, order) {
      let optionsCost = 0;
      order.options.forEach(option => {
        switch(option) {
          case 'climatisation': optionsCost += 1500; break;
          case 'jantes-alliage': optionsCost += 800; break;
          case 'toit-ouvrant': optionsCost += 1200; break;
          case 'sieges-cuir': optionsCost += 2000; break;
          default: optionsCost += 500;
        }
      });
      return amount + optionsCost;
    }

    applyQuantityDiscount(amount, order) {
      if (order.quantity > 5) {
        return amount * 0.90; // 10% de réduction
      }
      if (order.quantity > 2) {
        return amount * 0.95; // 5% de réduction
      }
      return amount;
    }

    applyCountrySpecificAdjustments(amount, order) {
      return amount; // Par défaut, pas d'ajustement
    }

    finalizeCalculation(amount, order) {
      return Math.round(amount * 100) / 100;
    }
  }

  // Implémentation pour la France
  class FranceOrderCalculator extends OrderCalculator {
    applyTaxes(amount, order) {
      // TVA française : 20% pour voitures, 10% pour scooters
      const tvaRate = order.vehicleType === 'scooter' ? 1.10 : 1.20;
      return amount * tvaRate;
    }

    applyCountrySpecificAdjustments(amount, order) {
      // Malus écologique pour les voitures essence > 20k€
      if (order.vehicleType === 'car' && order.basePrice > 20000) {
        return amount + 1000;
      }
      return amount;
    }
  }

  // Implémentation pour la Belgique
  class BelgiumOrderCalculator extends OrderCalculator {
    applyTaxes(amount, order) {
      // TVA belge : 21%
      return amount * 1.21;
    }

    applyCountrySpecificAdjustments(amount, order) {
      // Taxe de circulation
      return amount + 500;
    }
  }

  // Implémentation pour le Cameroun
  class CameroonOrderCalculator extends OrderCalculator {
    applyTaxes(amount, order) {
      // TVA camerounaise : 19.25%
      return amount * 1.1925;
    }

    applyCountrySpecificAdjustments(amount, order) {
      // Droits de douane + taxe spécifique
      let adjusted = amount * 1.15; // 15% de droits
      
      // Réduction pour véhicules électriques
      if (order.vehicleType === 'electric-car') {
        adjusted *= 0.85; // 15% de réduction écologique
      }
      
      return adjusted;
    }
  }

  const calculateOrder = () => {
    let calculator;
    
    switch(order.country) {
      case 'France':
        calculator = new FranceOrderCalculator();
        break;
      case 'Belgique':
        calculator = new BelgiumOrderCalculator();
        break;
      case 'Cameroun':
        calculator = new CameroonOrderCalculator();
        break;
      default:
        calculator = new OrderCalculator();
    }

    const result = calculator.calculateTotal(order);
    
    // Détail du calcul
    const steps = {
      base: order.basePrice,
      afterTaxes: calculator.applyTaxes(order.basePrice, order),
      afterOptions: calculator.applyOptions(calculator.applyTaxes(order.basePrice, order), order),
      afterDiscount: calculator.applyQuantityDiscount(
        calculator.applyOptions(calculator.applyTaxes(order.basePrice, order), order), 
        order
      ),
      afterCountry: calculator.applyCountrySpecificAdjustments(
        calculator.applyQuantityDiscount(
          calculator.applyOptions(calculator.applyTaxes(order.basePrice, order), order), 
          order
        ), 
        order
      ),
      final: result
    };

    setCalculationResult({ total: result, steps, calculator: calculator.constructor.name });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">📊 Template Method - Calcul de commande</h2>
          <p className="text-gray-600">Algorithme de calcul avec étapes redéfinissables</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600 bg-yellow-50 px-3 py-1 rounded">
            Pattern Template Method
          </div>
        </div>
      </div>

      {/* Configuration de la commande */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="space-y-2">
          <label className="block font-medium">Pays de livraison</label>
          <select 
            value={order.country}
            onChange={(e) => setOrder({...order, country: e.target.value})}
            className="w-full border rounded-lg p-3"
          >
            <option value="France">🇫🇷 France</option>
            <option value="Belgique">🇧🇪 Belgique</option>
            <option value="Cameroun">🇨🇲 Cameroun</option>
            <option value="Allemagne">🇩🇪 Allemagne</option>
            <option value="Sénégal">🇸🇳 Sénégal</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block font-medium">Type de véhicule</label>
          <select 
            value={order.vehicleType}
            onChange={(e) => setOrder({...order, vehicleType: e.target.value})}
            className="w-full border rounded-lg p-3"
          >
            <option value="car">🚗 Voiture essence</option>
            <option value="electric-car">⚡ Voiture électrique</option>
            <option value="scooter">🛵 Scooter</option>
            <option value="electric-scooter">🔌 Scooter électrique</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block font-medium">Prix de base (€)</label>
          <input
            type="number"
            value={order.basePrice}
            onChange={(e) => setOrder({...order, basePrice: parseInt(e.target.value) || 0})}
            className="w-full border rounded-lg p-3"
            min="0"
            step="100"
          />
        </div>

        <div className="space-y-2">
          <label className="block font-medium">Quantité</label>
          <input
            type="number"
            value={order.quantity}
            onChange={(e) => setOrder({...order, quantity: parseInt(e.target.value) || 1})}
            className="w-full border rounded-lg p-3"
            min="1"
            max="100"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="block font-medium">Options</label>
          <div className="flex flex-wrap gap-2">
            {['climatisation', 'jantes-alliage', 'toit-ouvrant', 'sieges-cuir', 'systeme-audio'].map(option => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={order.options.includes(option)}
                  onChange={(e) => {
                    const newOptions = e.target.checked
                      ? [...order.options, option]
                      : order.options.filter(o => o !== option);
                    setOrder({...order, options: newOptions});
                  }}
                  className="rounded"
                />
                <span className="capitalize">{option.replace('-', ' ')}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={calculateOrder}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg mb-8"
      >
        🧮 Calculer le montant total
      </button>

      {/* Résultat du calcul */}
      {calculationResult && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {calculationResult.total.toLocaleString('fr-FR')} €
              </div>
              <div className="text-gray-600">
                Montant total pour {order.quantity} véhicule(s) en {order.country}
              </div>
              <div className="text-sm text-gray-500 mt-2">
                Calculateur utilisé: <span className="font-mono">{calculationResult.calculator}</span>
              </div>
            </div>
          </div>

          {/* Étapes du calcul */}
          <div>
            <h3 className="font-bold text-lg mb-4">📈 Détail des étapes de calcul</h3>
            <div className="space-y-3">
              {[
                { label: 'Prix de base', value: calculationResult.steps.base },
                { label: 'Après taxes', value: calculationResult.steps.afterTaxes },
                { label: 'Après options', value: calculationResult.steps.afterOptions },
                { label: 'Après remise quantité', value: calculationResult.steps.afterDiscount },
                { label: 'Après ajustements pays', value: calculationResult.steps.afterCountry },
              ].map((step, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      {index + 1}
                    </div>
                    <span>{step.label}</span>
                  </div>
                  <span className="font-bold">{step.value.toLocaleString('fr-FR')} €</span>
                </div>
              ))}
              
              <div className="flex justify-between items-center pt-2 border-t">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3">
                    ✓
                  </div>
                  <span className="font-bold">Total final</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">
                  {calculationResult.total.toLocaleString('fr-FR')} €
                </span>
              </div>
            </div>
          </div>

          {/* Explication du pattern */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold mb-2">🎯 Comment fonctionne le Template Method ?</h4>
            <p className="text-gray-600 text-sm">
              Le pattern Template Method définit le squelette d'un algorithme dans une classe de base, 
              en laissant les sous-classes redéfinir certaines étapes sans changer la structure de l'algorithme.
              Ici, chaque pays a sa propre implémentation des étapes de calcul (taxes, ajustements).
            </p>
          </div>
        </div>
      )}

      {/* Diagramme du pattern */}
      <div className="mt-8 pt-6 border-t">
        <h3 className="font-bold text-lg mb-4">🏗️ Structure du Pattern Template Method</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-48 font-bold text-blue-600">OrderCalculator (classe abstraite)</div>
              <div className="ml-4 text-gray-600">
                - calculateTotal() [template method]<br/>
                - calculateBaseAmount()<br/>
                - applyTaxes() [hook]<br/>
                - applyOptions()<br/>
                - applyQuantityDiscount()<br/>
                - applyCountrySpecificAdjustments() [hook]<br/>
                - finalizeCalculation()
              </div>
            </div>
            
            <div className="text-gray-400 text-center">▼ hérite et surcharge</div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-48">
                <div className="font-bold text-green-600">FranceOrderCalculator</div>
                <div className="text-gray-600 text-sm">
                  - applyTaxes(): TVA 20%<br/>
                  - applyCountrySpecificAdjustments(): malus écologique
                </div>
              </div>
              
              <div className="flex-1 min-w-48">
                <div className="font-bold text-purple-600">BelgiumOrderCalculator</div>
                <div className="text-gray-600 text-sm">
                  - applyTaxes(): TVA 21%<br/>
                  - applyCountrySpecificAdjustments(): taxe circulation
                </div>
              </div>
              
              <div className="flex-1 min-w-48">
                <div className="font-bold text-red-600">CameroonOrderCalculator</div>
                <div className="text-gray-600 text-sm">
                  - applyTaxes(): TVA 19.25%<br/>
                  - applyCountrySpecificAdjustments(): droits de douane
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateMethod;
