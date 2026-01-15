import React, { useState } from 'react';

// Factory Method Pattern
class Order {
  constructor(type, vehicle, client, amount) {
    this.id = `ORD-${Date.now()}`;
    this.type = type;
    this.vehicle = vehicle;
    this.client = client;
    this.amount = amount;
    this.status = 'En cours';
    this.createdAt = new Date();
  }
  
  process() {
    this.status = 'Validée';
    this.processedAt = new Date();
  }
  
  getInfo() {
    return {
      id: this.id,
      type: this.type,
      vehicle: this.vehicle,
      client: this.client,
      amount: this.amount,
      status: this.status,
      createdAt: this.createdAt.toLocaleString(),
    };
  }
}

class CashOrder extends Order {
  constructor(vehicle, client, amount) {
    super('Paiement comptant', vehicle, client, amount);
    this.paymentMethod = 'Comptant';
    this.discount = amount > 30000 ? 0.05 : 0; // 5% de réduction pour gros achats
    this.finalAmount = amount * (1 - this.discount);
  }
}

class CreditOrder extends Order {
  constructor(vehicle, client, amount) {
    super('Demande de crédit', vehicle, client, amount);
    this.paymentMethod = 'Crédit';
    this.interestRate = 0.03; // 3% d'intérêt
    this.months = 60;
    this.monthlyPayment = (amount * (1 + this.interestRate)) / this.months;
  }
}

// Creator (Factory)
class OrderCreator {
  createOrder(vehicle, client, amount) {
    throw new Error('Méthode abstraite');
  }
}

// Concrete Creators
class CashOrderCreator extends OrderCreator {
  createOrder(vehicle, client, amount) {
    return new CashOrder(vehicle, client, amount);
  }
}

class CreditOrderCreator extends OrderCreator {
  createOrder(vehicle, client, amount) {
    return new CreditOrder(vehicle, client, amount);
  }
}

export function OrderFactoryDemo() {
  const [orderType, setOrderType] = useState('cash');
  const [orders, setOrders] = useState([]);
  
  const createOrder = () => {
    const creator = orderType === 'cash' 
      ? new CashOrderCreator() 
      : new CreditOrderCreator();
    
    const vehicles = ['Tesla Model 3', 'Renault Zoé', 'Peugeot 208'];
    const clients = ['Jean Dupont', 'Marie Curie', 'Paul Martin'];
    
    const vehicle = vehicles[Math.floor(Math.random() * vehicles.length)];
    const client = clients[Math.floor(Math.random() * clients.length)];
    const amount = 25000 + Math.floor(Math.random() * 20000);
    
    const order = creator.createOrder(vehicle, client, amount);
    order.process();
    
    setOrders(prev => [order.getInfo(), ...prev.slice(0, 4)]);
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-purple-50 p-4 rounded-lg">
        <h3 className="font-bold text-purple-800 mb-2">Factory Method Pattern</h3>
        <p className="text-purple-700">
          Définit une interface pour créer un objet, mais laisse les sous-classes décider quelle classe instancier.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de commande :
            </label>
            <div className="flex space-x-4">
              <button
                onClick={() => setOrderType('cash')}
                className={`px-4 py-2 rounded-lg ${orderType === 'cash' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
              >
                💵 Commande Comptant
              </button>
              <button
                onClick={() => setOrderType('credit')}
                className={`px-4 py-2 rounded-lg ${orderType === 'credit' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
              >
                🏦 Commande Crédit
              </button>
            </div>
          </div>
          
          <button
            onClick={createOrder}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Créer une commande {orderType === 'cash' ? 'comptant' : 'crédit'}
          </button>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-2">Structure du Pattern :</h4>
            <pre className="text-sm bg-gray-800 text-gray-100 p-3 rounded overflow-auto">
{`abstract class OrderCreator {
  abstract createOrder(); // Factory Method
}

class CashOrderCreator extends OrderCreator {
  createOrder() { return new CashOrder(); }
}

class CreditOrderCreator extends OrderCreator {
  createOrder() { return new CreditOrder(); }
}`}
            </pre>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-gray-800 mb-4">Commandes créées :</h4>
          {orders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Créez votre première commande
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, index) => (
                <div key={index} className={`border rounded-lg p-4 ${order.type.includes('comptant') ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h5 className="font-bold flex items-center gap-2">
                        {order.type.includes('comptant') ? '💵' : '🏦'} {order.type}
                      </h5>
                      <p className="text-sm text-gray-600">ID: {order.id}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded ${order.status === 'Validée' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Véhicule:</span>
                      <p className="font-medium">{order.vehicle}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Client:</span>
                      <p className="font-medium">{order.client}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Montant:</span>
                      <p className="font-bold text-lg">{order.amount.toLocaleString()}€</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Créée le:</span>
                      <p className="text-sm">{order.createdAt}</p>
                    </div>
                  </div>
                  
                  {order.type.includes('comptant') && order.amount > 30000 && (
                    <div className="mt-2 bg-green-100 text-green-800 text-sm p-2 rounded">
                      ✅ Réduction de 5% appliquée (achat > 30.000€)
                    </div>
                  )}
                  
                  {order.type.includes('crédit') && (
                    <div className="mt-2 bg-blue-100 text-blue-800 text-sm p-2 rounded">
                      📊 Taux d'intérêt: 3% sur 60 mois
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
