import React, { useState } from 'react';

// Command Pattern
class Vehicle {
  constructor(id, name, price, stockAge = 0) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stockAge = stockAge; // en jours
    this.isDiscounted = false;
    this.originalPrice = price;
  }
  
  applyDiscount(percentage) {
    if (!this.isDiscounted) {
      this.originalPrice = this.price;
      this.price = this.price * (1 - percentage / 100);
      this.isDiscounted = true;
      return `Réduction de ${percentage}% appliquée: ${this.name}`;
    }
    return `Déjà en promo: ${this.name}`;
  }
  
  removeDiscount() {
    if (this.isDiscounted) {
      this.price = this.originalPrice;
      this.isDiscounted = false;
      return `Promotion retirée: ${this.name}`;
    }
    return `Pas en promo: ${this.name}`;
  }
  
  markAsSold() {
    return `Véhicule soldé: ${this.name}`;
  }
  
  getStatus() {
    return {
      name: this.name,
      price: this.price,
      originalPrice: this.originalPrice,
      stockAge: this.stockAge,
      isDiscounted: this.isDiscounted,
      discount: this.isDiscounted ? 
        Math.round((1 - this.price / this.originalPrice) * 100) : 0
    };
  }
}

// Command Interface
class Command {
  execute() {
    throw new Error('Méthode abstraite');
  }
  
  undo() {
    throw new Error('Méthode abstraite');
  }
  
  getDescription() {
    throw new Error('Méthode abstraite');
  }
}

// Concrete Commands
class ApplyDiscountCommand extends Command {
  constructor(vehicle, percentage) {
    super();
    this.vehicle = vehicle;
    this.percentage = percentage;
    this.previousState = null;
  }
  
  execute() {
    this.previousState = this.vehicle.getStatus();
    const result = this.vehicle.applyDiscount(this.percentage);
    return result;
  }
  
  undo() {
    if (this.previousState) {
      this.vehicle.price = this.previousState.originalPrice;
      this.vehicle.isDiscounted = false;
      return `Annulation: ${this.vehicle.name} remis à ${this.vehicle.price}€`;
    }
    return `Annulation impossible: ${this.vehicle.name}`;
  }
  
  getDescription() {
    return `APPLIQUER réduction ${this.percentage}% sur ${this.vehicle.name}`;
  }
}

class MarkAsSoldCommand extends Command {
  constructor(vehicle) {
    super();
    this.vehicle = vehicle;
    this.previousState = null;
  }
  
  execute() {
    this.previousState = this.vehicle.getStatus();
    const result = this.vehicle.markAsSold();
    return result;
  }
  
  undo() {
    if (this.previousState) {
      this.vehicle.price = this.previousState.price;
      this.vehicle.isDiscounted = this.previousState.isDiscounted;
      return `Annulation: ${this.vehicle.name} restauré`;
    }
    return `Annulation impossible: ${this.vehicle.name}`;
  }
  
  getDescription() {
    return `SOLDER ${this.vehicle.name} (en stock depuis ${this.vehicle.stockAge} jours)`;
  }
}

class RemoveDiscountCommand extends Command {
  constructor(vehicle) {
    super();
    this.vehicle = vehicle;
    this.previousState = null;
  }
  
  execute() {
    this.previousState = this.vehicle.getStatus();
    const result = this.vehicle.removeDiscount();
    return result;
  }
  
  undo() {
    if (this.previousState && this.previousState.isDiscounted) {
      const discount = this.previousState.discount;
      this.vehicle.price = this.previousState.price;
      this.vehicle.isDiscounted = true;
      return `Annulation: ${this.vehicle.name} remis en promo (${discount}%)`;
    }
    return `Annulation impossible: ${this.vehicle.name}`;
  }
  
  getDescription() {
    return `RETIRER promotion de ${this.vehicle.name}`;
  }
}

// Command Invoker
class CommandInvoker {
  constructor() {
    this.commandHistory = [];
    this.undoHistory = [];
  }
  
  executeCommand(command) {
    const result = command.execute();
    this.commandHistory.push(command);
    this.undoHistory = []; // Clear undo history when new command executed
    return result;
  }
  
  undo() {
    if (this.commandHistory.length > 0) {
      const command = this.commandHistory.pop();
      const result = command.undo();
      this.undoHistory.push(command);
      return result;
    }
    return 'Aucune commande à annuler';
  }
  
  redo() {
    if (this.undoHistory.length > 0) {
      const command = this.undoHistory.pop();
      const result = command.execute();
      this.commandHistory.push(command);
      return result;
    }
    return 'Aucune commande à refaire';
  }
  
  getHistory() {
    return this.commandHistory.map((cmd, idx) => 
      `${idx + 1}. ${cmd.getDescription()}`
    );
  }
  
  clearHistory() {
    this.commandHistory = [];
    this.undoHistory = [];
  }
}

export function CommandDemo() {
  const vehicles = [
    new Vehicle(1, 'Renault Twingo 2018', 12000, 120),
    new Vehicle(2, 'Peugeot 308 2020', 22000, 90),
    new Vehicle(3, 'Citroën C3 2019', 15000, 150),
    new Vehicle(4, 'Volkswagen Golf 2021', 28000, 60),
    new Vehicle(5, 'Ford Fiesta 2017', 11000, 180),
  ];
  
  const [vehicleList, setVehicleList] = useState(vehicles);
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [actionLog, setActionLog] = useState([]);
  const [invoker] = useState(new CommandInvoker());
  
  const executeCommand = (commandType) => {
    let command;
    
    switch (commandType) {
      case 'discount10':
        command = new ApplyDiscountCommand(selectedVehicle, 10);
        break;
      case 'discount20':
        command = new ApplyDiscountCommand(selectedVehicle, 20);
        break;
      case 'discount30':
        command = new ApplyDiscountCommand(selectedVehicle, 30);
        break;
      case 'removeDiscount':
        command = new RemoveDiscountCommand(selectedVehicle);
        break;
      case 'markSold':
        command = new MarkAsSoldCommand(selectedVehicle);
        break;
      default:
        return;
    }
    
    const result = invoker.executeCommand(command);
    
    // Mettre à jour l'affichage
    setVehicleList([...vehicleList]);
    setCommandHistory(invoker.getHistory());
    setActionLog(prev => [`✅ ${new Date().toLocaleTimeString()}: ${result}`, ...prev.slice(0, 9)]);
  };
  
  const undoLastCommand = () => {
    const result = invoker.undo();
    setVehicleList([...vehicleList]);
    setCommandHistory(invoker.getHistory());
    setActionLog(prev => [`↩️ ${new Date().toLocaleTimeString()}: ${result}`, ...prev.slice(0, 9)]);
  };
  
  const redoLastCommand = () => {
    const result = invoker.redo();
    setVehicleList([...vehicleList]);
    setCommandHistory(invoker.getHistory());
    setActionLog(prev => [`↪️ ${new Date().toLocaleTimeString()}: ${result}`, ...prev.slice(0, 9)]);
  };
  
  const clearHistory = () => {
    invoker.clearHistory();
    setCommandHistory([]);
    setActionLog(prev => [`🧹 ${new Date().toLocaleTimeString()}: Historique effacé`, ...prev.slice(0, 9)]);
  };
  
  const getStockStatus = (age) => {
    if (age > 150) return { color: 'bg-red-100 text-red-800', label: 'Très ancien' };
    if (age > 100) return { color: 'bg-orange-100 text-orange-800', label: 'Ancien' };
    if (age > 60) return { color: 'bg-yellow-100 text-yellow-800', label: 'Moyen' };
    return { color: 'bg-green-100 text-green-800', label: 'Récent' };
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-violet-50 p-4 rounded-lg">
        <h3 className="font-bold text-violet-800 mb-2">Command Pattern</h3>
        <p className="text-violet-700">
          Encapsule une requête sous forme d'objet, permettant de paramétrer, mettre en file d'attente, 
          enregistrer et annuler des opérations.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne 1: Liste des véhicules */}
        <div className="space-y-4">
          <h4 className="font-bold text-gray-800">Véhicules en stock :</h4>
          
          <div className="space-y-3">
            {vehicleList.map(vehicle => {
              const status = getStockStatus(vehicle.stockAge);
              const vehicleStatus = vehicle.getStatus();
              
              return (
                <button
                  key={vehicle.id}
                  onClick={() => setSelectedVehicle(vehicle)}
                  className={`w-full p-4 text-left rounded-lg ${selectedVehicle.id === vehicle.id ? 'bg-violet-100 border-2 border-violet-300' : 'bg-gray-50 border'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-bold">{vehicle.name}</h5>
                    <span className={`px-2 py-1 text-xs rounded-full ${status.color}`}>
                      {vehicle.stockAge} jours
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <div className={`text-lg font-bold ${vehicleStatus.isDiscounted ? 'text-green-600' : 'text-gray-800'}`}>
                        {vehicleStatus.price.toLocaleString()}€
                      </div>
                      {vehicleStatus.isDiscounted && (
                        <div className="text-sm text-gray-500 line-through">
                          {vehicleStatus.originalPrice.toLocaleString()}€
                        </div>
                      )}
                    </div>
                    
                    {vehicleStatus.isDiscounted && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-bold">
                        -{vehicleStatus.discount}%
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-500">
                    Statut: {status.label} • {vehicleStatus.isDiscounted ? 'En promotion' : 'Prix normal'}
                  </div>
                </button>
              );
            })}
          </div>
          
          <div className="bg-yellow-50 p-3 rounded-lg">
            <p className="text-sm text-yellow-800">
              ⚠️ Les véhicules en stock depuis plus de 100 jours sont prioritaires pour les soldes.
            </p>
          </div>
        </div>
        
        {/* Colonne 2: Commandes disponibles */}
        <div className="space-y-4">
          <h4 className="font-bold text-gray-800">Commandes disponibles :</h4>
          
          <div className="space-y-3">
            <button
              onClick={() => executeCommand('discount10')}
              className="w-full p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-left"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-green-700">🔼 Appliquer 10% de réduction</span>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                  Légère
                </span>
              </div>
              <p className="text-sm text-green-600 mt-1">
                Pour véhicules en stock 60+ jours
              </p>
            </button>
            
            <button
              onClick={() => executeCommand('discount20')}
              className="w-full p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors text-left"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-orange-700">🔽 Appliquer 20% de réduction</span>
                <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded">
                  Importante
                </span>
              </div>
              <p className="text-sm text-orange-600 mt-1">
                Pour véhicules en stock 100+ jours
              </p>
            </button>
            
            <button
              onClick={() => executeCommand('discount30')}
              className="w-full p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors text-left"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-red-700">🔥 Appliquer 30% de réduction</span>
                <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">
                  Soldes
                </span>
              </div>
              <p className="text-sm text-red-600 mt-1">
                Pour véhicules en stock 150+ jours
              </p>
            </button>
            
            <button
              onClick={() => executeCommand('removeDiscount')}
              className="w-full p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-left"
              disabled={!selectedVehicle.isDiscounted}
            >
              <div className="flex items-center justify-between">
                <span className={`font-bold ${selectedVehicle.isDiscounted ? 'text-blue-700' : 'text-gray-400'}`}>
                  ↩️ Retirer la promotion
                </span>
              </div>
              <p className="text-sm text-blue-600 mt-1">
                Annuler la réduction en cours
              </p>
            </button>
            
            <button
              onClick={() => executeCommand('markSold')}
              className="w-full p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors text-left"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-purple-700">💰 Marquer comme soldé</span>
              </div>
              <p className="text-sm text-purple-600 mt-1">
                Finaliser la vente soldée
              </p>
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={undoLastCommand}
              className="bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              disabled={commandHistory.length === 0}
            >
              ↩ Annuler
            </button>
            
            <button
              onClick={redoLastCommand}
              className="bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition-colors"
            >
              ↪ Refaire
            </button>
          </div>
          
          <button
            onClick={clearHistory}
            className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            🧹 Effacer l'historique
          </button>
        </div>
        
        {/* Colonne 3: Historique et logs */}
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-gray-800 mb-3">Historique des commandes :</h4>
            <div className="bg-gray-50 border rounded-lg p-4 max-h-60 overflow-auto">
              {commandHistory.length > 0 ? (
                <ul className="space-y-2">
                  {commandHistory.map((cmd, idx) => (
                    <li key={idx} className="text-sm p-2 bg-white rounded border">
                      <span className="text-gray-500">#{idx + 1}</span> {cmd}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center py-4">Aucune commande exécutée</p>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-800 mb-3">Journal des actions :</h4>
            <div className="bg-gray-50 border rounded-lg p-4 max-h-60 overflow-auto">
              {actionLog.length > 0 ? (
                <ul className="space-y-2">
                  {actionLog.map((log, idx) => (
                    <li key={idx} className="text-sm p-2 bg-white rounded border">
                      {log}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center py-4">Aucune action enregistrée</p>
              )}
            </div>
          </div>
          
          <div className="bg-violet-50 p-3 rounded-lg">
            <p className="text-sm text-violet-800">
              💡 Command Pattern: Chaque action est un objet qui peut être exécuté, annulé, refait et historisé.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-bold text-gray-800 mb-2">Avantages du Command Pattern :</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
          <div className="bg-white p-3 rounded border">
            <p className="font-bold text-violet-600">🔄 Annulation/Refaire</p>
            <p className="text-gray-600 mt-1">Implémentation facile de l'annulation et du refaire</p>
          </div>
          <div className="bg-white p-3 rounded border">
            <p className="font-bold text-violet-600">⏱️ Historisation</p>
            <p className="text-gray-600 mt-1">Toutes les actions sont enregistrées</p>
          </div>
          <div className="bg-white p-3 rounded border">
            <p className="font-bold text-violet-600">📋 File d'attente</p>
            <p className="text-gray-600 mt-1">Commandes peuvent être mises en file d'attente</p>
          </div>
          <div className="bg-white p-3 rounded border">
            <p className="font-bold text-violet-600">🧩 Découplage</p>
            <p className="text-gray-600 mt-1">L'invocateur ne connaît pas l'implémentation</p>
          </div>
        </div>
      </div>
    </div>
  );
}
