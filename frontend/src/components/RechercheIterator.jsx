import React, { useState, useEffect } from 'react';

// Iterator Pattern Implementation
class VehicleIterator {
  constructor(vehicles) {
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

  previous() {
    if (this.position > 0) {
      this.position--;
      return this.vehicles[this.position - 1];
    }
    return null;
  }

  reset() {
    this.position = 0;
  }

  getCurrent() {
    return this.vehicles[this.position - 1];
  }

  getCurrentIndex() {
    return this.position - 1;
  }

  getTotal() {
    return this.vehicles.length;
  }

  setPosition(position) {
    if (position >= 0 && position < this.vehicles.length) {
      this.position = position;
    }
  }

  // Recherche par mot-clé
  findByKeyword(keyword) {
    const results = [];
    this.reset();
    while (this.hasNext()) {
      const vehicle = this.next();
      const searchableText = `
        ${vehicle.name.toLowerCase()}
        ${vehicle.description.toLowerCase()}
        ${vehicle.type.toLowerCase()}
        ${vehicle.fuelType.toLowerCase()}
      `;
      if (searchableText.includes(keyword.toLowerCase())) {
        results.push(vehicle);
      }
    }
    this.reset();
    return results;
  }

  // Recherche avec opérateurs logiques
  searchWithOperators(keywords, operator = 'AND') {
    const results = [];
    this.reset();
    
    while (this.hasNext()) {
      const vehicle = this.next();
      const searchableText = `
        ${vehicle.name.toLowerCase()}
        ${vehicle.description.toLowerCase()}
        ${vehicle.type.toLowerCase()}
        ${vehicle.fuelType.toLowerCase()}
      `;
      
      let matches = true;
      
      if (operator === 'AND') {
        matches = keywords.every(keyword => 
          searchableText.includes(keyword.toLowerCase())
        );
      } else if (operator === 'OR') {
        matches = keywords.some(keyword => 
          searchableText.includes(keyword.toLowerCase())
        );
      }
      
      if (matches) {
        results.push(vehicle);
      }
    }
    
    this.reset();
    return results;
  }
}

const RechercheIterator = () => {
  const [vehicles, setVehicles] = useState([]);
  const [iterator, setIterator] = useState(null);
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchMode, setSearchMode] = useState('simple');
  const [operator, setOperator] = useState('AND');
  const [keywords, setKeywords] = useState(['']);
  const [showIteratorDemo, setShowIteratorDemo] = useState(false);
  const [iteratorLog, setIteratorLog] = useState([]);

  // Données de démo
  const demoVehicles = [
    {
      id: 1,
      name: 'Tesla Model 3',
      type: 'car',
      fuelType: 'electric',
      price: 45000,
      description: 'Voiture électrique avec autonomie de 500km et système Autopilot',
      keywords: ['tesla', 'electrique', 'autopilot', 'berline']
    },
    {
      id: 2,
      name: 'Renault Zoé',
      type: 'car',
      fuelType: 'electric',
      price: 32000,
      description: 'Compacte électrique urbaine parfaite pour la ville',
      keywords: ['renault', 'electrique', 'urbaine', 'compacte']
    },
    {
      id: 3,
      name: 'Peugeot 208',
      type: 'car',
      fuelType: 'gasoline',
      price: 22000,
      description: 'Citadine essence économique avec design moderne',
      keywords: ['peugeot', 'essence', 'citadine', 'économique']
    },
    {
      id: 4,
      name: 'BMW i4',
      type: 'car',
      fuelType: 'electric',
      price: 55000,
      description: 'Berline électrique sportive luxueuse et performante',
      keywords: ['bmw', 'electrique', 'sportive', 'luxe']
    },
    {
      id: 5,
      name: 'Volkswagen Golf',
      type: 'car',
      fuelType: 'gasoline',
      price: 28000,
      description: 'Compacte polyvalente fiable et confortable',
      keywords: ['volkswagen', 'essence', 'compacte', 'fiable']
    },
    {
      id: 6,
      name: 'Vespa Elettrica',
      type: 'scooter',
      fuelType: 'electric',
      price: 8500,
      description: 'Scooter électrique urbain design italien',
      keywords: ['vespa', 'electrique', 'scooter', 'urbain']
    },
    {
      id: 7,
      name: 'Yamaha NMAX',
      type: 'scooter',
      fuelType: 'gasoline',
      price: 5500,
      description: 'Scooter 125cc essence pratique et économique',
      keywords: ['yamaha', 'essence', 'scooter', '125cc']
    },
  ];

  useEffect(() => {
    setVehicles(demoVehicles);
    const newIterator = new VehicleIterator(demoVehicles);
    setIterator(newIterator);
    addToLog('✅ Iterator initialisé avec ' + demoVehicles.length + ' véhicules');
  }, []);

  const addToLog = (message) => {
    setIteratorLog(prev => [`[${new Date().toLocaleTimeString()}] ${message}`, ...prev.slice(0, 9)]);
  };

  const handleNext = () => {
    if (iterator && iterator.hasNext()) {
      const vehicle = iterator.next();
      setCurrentVehicle(vehicle);
      addToLog(`→ Véhicule suivant: ${vehicle.name} (${iterator.getCurrentIndex() + 1}/${iterator.getTotal()})`);
    } else {
      addToLog('⏹️ Fin du catalogue atteinte');
    }
  };

  const handlePrevious = () => {
    if (iterator && iterator.getCurrentIndex() > 0) {
      iterator.setPosition(iterator.getCurrentIndex() - 1);
      const vehicle = iterator.getCurrent();
      setCurrentVehicle(vehicle);
      addToLog(`← Véhicule précédent: ${vehicle.name} (${iterator.getCurrentIndex() + 1}/${iterator.getTotal()})`);
    } else {
      addToLog('⏹️ Début du catalogue atteint');
    }
  };

  const handleReset = () => {
    if (iterator) {
      iterator.reset();
      setCurrentVehicle(null);
      addToLog('🔄 Iterator réinitialisé au début');
    }
  };

  const handleSearch = () => {
    if (!iterator) return;

    let results = [];
    if (searchMode === 'simple') {
      results = iterator.findByKeyword(searchQuery);
      addToLog(`🔍 Recherche simple: "${searchQuery}" - ${results.length} résultat(s)`);
    } else {
      const validKeywords = keywords.filter(k => k.trim() !== '');
      if (validKeywords.length > 0) {
        results = iterator.searchWithOperators(validKeywords, operator);
        addToLog(`🔍 Recherche ${operator}: "${validKeywords.join(` ${operator.toLowerCase()} `)}" - ${results.length} résultat(s)`);
      }
    }

    setSearchResults(results);
  };

  const addKeywordField = () => {
    setKeywords([...keywords, '']);
  };

  const removeKeywordField = (index) => {
    const newKeywords = [...keywords];
    newKeywords.splice(index, 1);
    setKeywords(newKeywords);
  };

  const updateKeyword = (index, value) => {
    const newKeywords = [...keywords];
    newKeywords[index] = value;
    setKeywords(newKeywords);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl border border-orange-200">
        <h2 className="text-2xl font-bold text-orange-800 mb-2">🔍 Recherche & Parcours - Pattern Iterator</h2>
        <p className="text-orange-700">
          Parcours séquentiel du catalogue avec recherche avancée et opérateurs logiques
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne 1: Recherche */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-gray-800 mb-4">Mode de recherche :</h3>
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setSearchMode('simple')}
                className={`px-4 py-2 rounded-lg ${searchMode === 'simple' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                🔍 Simple
              </button>
              <button
                onClick={() => setSearchMode('advanced')}
                className={`px-4 py-2 rounded-lg ${searchMode === 'advanced' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                ⚙️ Avancée
              </button>
            </div>

            {searchMode === 'simple' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mot-clé de recherche :
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ex: tesla, électrique, urbain..."
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Opérateur logique :
                  </label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setOperator('AND')}
                      className={`px-4 py-2 rounded-lg ${operator === 'AND' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                    >
                      ET (tous les mots)
                    </button>
                    <button
                      onClick={() => setOperator('OR')}
                      className={`px-4 py-2 rounded-lg ${operator === 'OR' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    >
                      OU (au moins un mot)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mots-clés :
                  </label>
                  <div className="space-y-2">
                    {keywords.map((keyword, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={keyword}
                          onChange={(e) => updateKeyword(index, e.target.value)}
                          className="flex-1 px-3 py-1 border rounded"
                          placeholder="Mot-clé"
                        />
                        {keywords.length > 1 && (
                          <button
                            onClick={() => removeKeywordField(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={addKeywordField}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      + Ajouter un mot-clé
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleSearch}
              className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              🔎 Lancer la recherche
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-gray-800 mb-4">Parcours séquentiel :</h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={handlePrevious}
                disabled={iterator && iterator.getCurrentIndex() <= 0}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Précédent
              </button>
              <button
                onClick={handleNext}
                disabled={iterator && !iterator.hasNext()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Suivant →
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                ↺ Réinitialiser
              </button>
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-bold">Pattern Iterator :</span> Parcours séquentiel sans exposer la structure interne
              </p>
            </div>
          </div>
        </div>

        {/* Colonne 2: Résultats */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-gray-800 mb-4">
              {searchResults.length > 0 
                ? `🔍 ${searchResults.length} résultat(s) trouvé(s)` 
                : currentVehicle 
                  ? 'Véhicule courant' 
                  : 'Aucun véhicule sélectionné'}
            </h3>

            {searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((vehicle) => (
                  <div key={vehicle.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-lg">{vehicle.name}</h4>
                        <p className="text-gray-600 text-sm">{vehicle.description}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded ${vehicle.fuelType === 'electric' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        {vehicle.fuelType === 'electric' ? '⚡' : '⛽'} {vehicle.fuelType}
                      </span>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="font-bold text-gray-900">{vehicle.price.toLocaleString()}€</span>
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded hover:bg-blue-200">
                        Voir détails
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : currentVehicle ? (
              <div className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold">{currentVehicle.name}</h4>
                  <span className="text-lg font-bold text-blue-600">
                    {iterator && `(${iterator.getCurrentIndex() + 1}/${iterator.getTotal()})`}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-4">{currentVehicle.description}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <span className="text-sm text-gray-500">Type :</span>
                    <p className="font-medium">{currentVehicle.type}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <span className="text-sm text-gray-500">Carburant :</span>
                    <p className="font-medium">{currentVehicle.fuelType}</p>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded">
                  <p className="font-bold text-gray-800">Prix : {currentVehicle.price.toLocaleString()}€</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>Utilisez les boutons de parcours ou lancez une recherche</p>
                <p className="text-sm mt-2">Le pattern Iterator permet un parcours séquentiel du catalogue</p>
              </div>
            )}
          </div>

          {iterator && (
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-bold text-gray-800 mb-4">Statistiques :</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-3 rounded">
                  <span className="text-sm text-blue-600">Véhicules totaux</span>
                  <p className="text-2xl font-bold">{iterator.getTotal()}</p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <span className="text-sm text-green-600">Position actuelle</span>
                  <p className="text-2xl font-bold">
                    {currentVehicle ? iterator.getCurrentIndex() + 1 : 0} / {iterator.getTotal()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Colonne 3: Logs et détails technique */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">Journal de parcours</h3>
              <button
                onClick={() => setIteratorLog([])}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Effacer
              </button>
            </div>
            
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg h-64 overflow-y-auto">
              {iteratorLog.length > 0 ? (
                <div className="space-y-2">
                  {iteratorLog.map((log, index) => (
                    <div key={index} className="text-sm font-mono">
                      {log}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">Le journal s'affichera ici</p>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-gray-800 mb-4">Détails technique :</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-sm overflow-auto max-h-40">
{`class VehicleIterator {
  constructor(vehicles) {
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

  // Méthodes de recherche...
}`}
              </pre>
            </div>
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                💡 Le pattern Iterator encapsule le parcours de la collection et permet différentes stratégies de recherche.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RechercheIterator;
