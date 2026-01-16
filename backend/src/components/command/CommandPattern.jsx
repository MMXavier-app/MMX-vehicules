import React, { useState } from 'react';

const CommandPattern = () => {
  const [vehicles, setVehicles] = useState([
    { id: 1, name: 'Peugeot 208 2019', type: 'car', price: 18900, stockDays: 120, status: 'en stock' },
    { id: 2, name: 'Renault Clio 2020', type: 'car', price: 17500, stockDays: 95, status: 'en stock' },
    { id: 3, name: 'Citroën C3 2018', type: 'car', price: 14900, stockDays: 210, status: 'en stock' },
    { id: 4, name: 'Vespa Primavera', type: 'scooter', price: 4900, stockDays: 180, status: 'en stock' },
    { id: 5, name: 'Tesla Model 3 2021', type: 'electric-car', price: 42900, stockDays: 65, status: 'en stock' },
    { id: 6, name: 'Peugeot e-208', type: 'electric-car', price: 34900, stockDays: 45, status: 'en stock' },
    { id: 7, name: 'Yamaha NMAX', type: 'scooter', price: 5200, stockDays: 150, status: 'en stock' },
    { id: 8, name: 'Renault Zoe 2020', type: 'electric-car', price: 32900, stockDays: 300, status: 'en stock' },
  ]);

  const [commandHistory, setCommandHistory] = useState([]);
  const [discountThreshold, setDiscountThreshold] = useState(90);
  const [selectedVehicles, setSelectedVehicles] = useState([]);

  // Interface Command
  class VehicleCommand {
    constructor(vehicle, action, params) {
      this.vehicle = vehicle;
      this.action = action;
      this.params = params;
      this.timestamp = new Date();
      this.executed = false;
    }

    execute() {
      throw new Error('Méthode execute() doit être implémentée');
    }

    undo() {
      throw new Error('Méthode undo() doit être implémentée');
    }

    getDescription() {
      return `${this.action} - ${this.vehicle.name}`;
    }
  }

  // Commande concrète : Appliquer une remise
  class ApplyDiscountCommand extends VehicleCommand {
    execute() {
      if (this.executed) return;
      
      const discount = this.params.discount;
      const oldPrice = this.vehicle.price;
      const newPrice = oldPrice * (1 - discount / 100);
      
      setVehicles(prev => prev.map(v => 
        v.id === this.vehicle.id 
          ? { ...v, price: Math.round(newPrice), status: 'en solde' }
          : v
      ));

      this.oldPrice = oldPrice;
      this.executed = true;
      
      setCommandHistory(prev => [this, ...prev]);
    }

    undo() {
      if (!this.executed) return;
      
      setVehicles(prev => prev.map(v => 
        v.id === this.vehicle.id 
          ? { ...v, price: this.oldPrice, status: 'en stock' }
          : v
      ));

      this.executed = false;
    }

    getDescription() {
      return `Remise de ${this.params.discount}% appliquée - ${this.vehicle.name}`;
    }
  }

  // Commande concrète : Marquer comme soldé
  class MarkAsClearanceCommand extends VehicleCommand {
    execute() {
      if (this.executed) return;
      
      setVehicles(prev => prev.map(v => 
        v.id === this.vehicle.id 
          ? { ...v, status: 'soldé urgent', price: v.price * 0.7 } // 30% de réduction
          : v
      ));

      this.executed = true;
      setCommandHistory(prev => [this, ...prev]);
    }

    undo() {
      if (!this.executed) return;
      
      setVehicles(prev => prev.map(v => 
        v.id === this.vehicle.id 
          ? { ...v, status: 'en stock', price: v.price / 0.7 }
          : v
      ));

      this.executed = false;
    }

    getDescription() {
      return `Soldé urgent - ${this.vehicle.name}`;
    }
  }

  // Commande concrète : Lot de véhicules
  class BulkDiscountCommand extends VehicleCommand {
    execute() {
      if (this.executed) return;
      
      const vehiclesToUpdate = this.params.vehicleIds;
      const discount = this.params.discount;
      
      setVehicles(prev => prev.map(v => 
        vehiclesToUpdate.includes(v.id)
          ? { ...v, price: v.price * (1 - discount / 100), status: 'solde lot' }
          : v
      ));

      this.executed = true;
      setCommandHistory(prev => [this, ...prev]);
    }

    undo() {
      if (!this.executed) return;
      
      // Note: Dans une vraie implémentation, on garderait les anciens prix
      alert('Annulation du lot non implémentée en démo');
      this.executed = false;
    }

    getDescription() {
      return `Remise lot ${this.params.discount}% - ${this.params.vehicleIds.length} véhicules`;
    }
  }

  const applyDiscountToOldStock = () => {
    const oldVehicles = vehicles.filter(v => v.stockDays > discountThreshold);
    
    oldVehicles.forEach(vehicle => {
      let discount;
      if (vehicle.stockDays > 180) {
        discount = 25;
      } else if (vehicle.stockDays > 120) {
        discount = 15;
      } else {
        discount = 10;
      }
      
      const command = new ApplyDiscountCommand(vehicle, 'apply-discount', { discount });
      command.execute();
    });
  };

  const markAsClearance = (vehicleId) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    const command = new MarkAsClearanceCommand(vehicle, 'clearance', {});
    command.execute();
  };

  const applyBulkDiscount = () => {
    if (selectedVehicles.length === 0) {
      alert('Sélectionnez des véhicules d\'abord');
      return;
    }
    
    const command = new BulkDiscountCommand(
      { id: 'bulk', name: 'Lot de véhicules' },
      'bulk-discount',
      { vehicleIds: selectedVehicles, discount: 20 }
    );
    command.execute();
    setSelectedVehicles([]);
  };

  const undoLastCommand = () => {
    if (commandHistory.length === 0) return;
    
    const lastCommand = commandHistory[0];
    lastCommand.undo();
    setCommandHistory(prev => prev.slice(1));
  };

  const toggleVehicleSelection = (vehicleId) => {
    setSelectedVehicles(prev => 
      prev.includes(vehicleId)
        ? prev.filter(id => id !== vehicleId)
        : [...prev, vehicleId]
    );
  };

  const getStockStatusColor = (days) => {
    if (days > 180) return 'bg-red-100 text-red-800';
    if (days > 120) return 'bg-orange-100 text-orange-800';
    if (days > 90) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'en stock': return 'bg-blue-100 text-blue-800';
      case 'en solde': return 'bg-purple-100 text-purple-800';
      case 'soldé urgent': return 'bg-red-100 text-red-800';
      case 'solde lot': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">⚡ Command - Soldes véhicules</h2>
          <p className="text-gray-600">Pattern Command pour gérer les opérations de solde</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600 bg-red-50 px-3 py-1 rounded">
            Pattern Command
          </div>
        </div>
      </div>

      {/* Contrôles */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="block font-medium">Seuil jours en stock</label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="30"
              max="365"
              value={discountThreshold}
              onChange={(e) => setDiscountThreshold(parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="font-bold">{discountThreshold} jours</span>
          </div>
          <p className="text-sm text-gray-500">
            Véhicules > {discountThreshold} jours = éligibles remise
          </p>
        </div>

        <div className="space-y-2">
          <label className="block font-medium">Actions rapides</label>
          <div className="flex space-x-2">
            <button
              onClick={applyDiscountToOldStock}
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              🏷️ Remise auto
            </button>
            <button
              onClick={applyBulkDiscount}
              className="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
            >
              📦 Lot -20%
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block font-medium">Historique</label>
          <button
            onClick={undoLastCommand}
            disabled={commandHistory.length === 0}
            className={`w-full py-2 rounded ${commandHistory.length === 0 ? 'bg-gray-300' : 'bg-gray-600 hover:bg-gray-700 text-white'}`}
          >
            ↩️ Annuler dernière action
          </button>
        </div>
      </div>

      {/* Liste des véhicules */}
      <div className="mb-8">
        <h3 className="font-bold text-lg mb-4">📋 Véhicules en stock</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border p-3 text-left">
                  <input 
                    type="checkbox"
                    checked={selectedVehicles.length === vehicles.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedVehicles(vehicles.map(v => v.id));
                      } else {
                        setSelectedVehicles([]);
                      }
                    }}
                  />
                </th>
                <th className="border p-3 text-left">Véhicule</th>
                <th className="border p-3 text-left">Type</th>
                <th className="border p-3 text-left">Prix</th>
                <th className="border p-3 text-left">Jours stock</th>
                <th className="border p-3 text-left">Statut</th>
                <th className="border p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map(vehicle => (
                <tr key={vehicle.id} className="hover:bg-gray-50">
                  <td className="border p-3">
                    <input
                      type="checkbox"
                      checked={selectedVehicles.includes(vehicle.id)}
                      onChange={() => toggleVehicleSelection(vehicle.id)}
                    />
                  </td>
                  <td className="border p-3 font-medium">{vehicle.name}</td>
                  <td className="border p-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      vehicle.type.includes('electric') 
                        ? 'bg-green-100 text-green-800'
                        : vehicle.type === 'car'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {vehicle.type}
                    </span>
                  </td>
                  <td className="border p-3 font-bold">
                    {vehicle.price.toLocaleString('fr-FR')} €
                  </td>
                  <td className="border p-3">
                    <span className={`px-2 py-1 rounded text-xs ${getStockStatusColor(vehicle.stockDays)}`}>
                      {vehicle.stockDays} jours
                    </span>
                  </td>
                  <td className="border p-3">
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(vehicle.status)}`}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="border p-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          const command = new ApplyDiscountCommand(
                            vehicle, 
                            'discount-10', 
                            { discount: 10 }
                          );
                          command.execute();
                        }}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                      >
                        -10%
                      </button>
                      <button
                        onClick={() => markAsClearance(vehicle.id)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                      >
                        Urgent
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Historique des commandes */}
      {commandHistory.length > 0 && (
        <div className="mb-8">
          <h3 className="font-bold text-lg mb-4">📜 Historique des commandes</h3>
          <div className="space-y-2">
            {commandHistory.slice(0, 5).map((cmd, index) => (
              <div key={index} className="border rounded-lg p-3 flex justify-between items-center">
                <div>
                  <div className="font-medium">{cmd.getDescription()}</div>
                  <div className="text-sm text-gray-500">
                    {cmd.timestamp.toLocaleTimeString('fr-FR')}
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${cmd.executed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {cmd.executed ? 'Exécuté' : 'Annulé'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Statistiques */}
      <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-700">
            {vehicles.filter(v => v.stockDays > discountThreshold).length}
          </div>
          <div className="text-sm text-gray-600">Véhicules anciens</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-700">
            {vehicles.filter(v => v.status !== 'en stock').length}
          </div>
          <div className="text-sm text-gray-600">En solde</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-700">
            {commandHistory.length}
          </div>
          <div className="text-sm text-gray-600">Commandes exécutées</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-red-700">
            {selectedVehicles.length}
          </div>
          <div className="text-sm text-gray-600">Sélectionnés</div>
        </div>
      </div>

      {/* Explication du pattern */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-bold mb-2">🎯 Comment fonctionne le Pattern Command ?</h4>
        <p className="text-gray-600 text-sm">
          Le pattern Command encapsule une requête en tant qu'objet, permettant de paramétrer 
          des clients avec différentes requêtes, de mettre les requêtes en file d'attente ou 
          de les journaliser, et de prendre en charge les opérations d'annulation.
        </p>
        <p className="text-gray-600 text-sm mt-2">
          Ici, chaque action (appliquer une remise, solder un véhicule) est encapsulée dans 
          un objet Command qui peut être exécuté, annulé et stocké dans l'historique.
        </p>
      </div>

      {/* Diagramme du pattern */}
      <div className="mt-8 pt-6 border-t">
        <h3 className="font-bold text-lg mb-4">🏗️ Structure du Pattern Command</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-48 font-bold text-blue-600">Command (interface)</div>
              <div className="ml-4 text-gray-600">
                - execute()<br/>
                - undo()<br/>
                - getDescription()
              </div>
            </div>
            
            <div className="text-gray-400 text-center">▼ implémente</div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-48">
                <div className="font-bold text-green-600">ApplyDiscountCommand</div>
                <div className="text-gray-600 text-sm">
                  - execute(): applique remise<br/>
                  - undo(): restaure prix<br/>
                  - vehicle: référence
                </div>
              </div>
              
              <div className="flex-1 min-w-48">
                <div className="font-bold text-purple-600">MarkAsClearanceCommand</div>
                <div className="text-gray-600 text-sm">
                  - execute(): marque soldé<br/>
                  - undo(): restaure statut<br/>
                  - vehicle: référence
                </div>
              </div>
              
              <div className="flex-1 min-w-48">
                <div className="font-bold text-red-600">BulkDiscountCommand</div>
                <div className="text-gray-600 text-sm">
                  - execute(): remise lot<br/>
                  - undo(): annule lot<br/>
                  - vehicleIds: liste
                </div>
              </div>
            </div>
            
            <div className="text-gray-400 text-center">▲</div>
            
            <div className="flex items-center">
              <div className="w-48 font-bold text-yellow-600">Invoker (Boutons UI)</div>
              <div className="ml-4 text-gray-600">
                - Appelle command.execute()<br/>
                - Gère l'historique<br/>
                - Permet undo()
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandPattern;
