import React from 'react';
import { useCart } from '../contexts/CartContext';

const Panier = () => {
  const { cart, removeFromCart, undo, canUndo, calculateTotal, clearCart, itemCount } = useCart();
  
  const total = calculateTotal();

  if (itemCount === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="text-5xl mb-4">🛒</div>
        <h3 className="text-xl font-bold text-gray-700 mb-2">Votre panier est vide</h3>
        <p className="text-gray-500">Ajoutez des véhicules pour commencer vos achats</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gray-900 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">🛒 Panier d'achat</h2>
          <div className="flex items-center gap-3">
            <span className="bg-blue-500 px-3 py-1 rounded-full">
              {itemCount} article{itemCount > 1 ? 's' : ''}
            </span>
            {canUndo && (
              <button
                onClick={undo}
                className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
              >
                ↩ Annuler
              </button>
            )}
            <button
              onClick={clearCart}
              className="px-3 py-1 bg-red-600 rounded hover:bg-red-500 transition-colors"
            >
              Vider
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-start border-b pb-4">
              <div className="w-24 h-24 flex-shrink-0">
                <img
                  src={item.vehicle.image}
                  alt={item.vehicle.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              
              <div className="ml-4 flex-grow">
                <h4 className="font-bold text-lg">{item.vehicle.name}</h4>
                <p className="text-gray-600 text-sm">{item.vehicle.description}</p>
                
                {item.options.length > 0 && (
                  <div className="mt-2">
                    <span className="text-sm text-gray-500">Options :</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.options.map(option => (
                        <span key={option} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                          {option}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-2 text-sm text-gray-500">
                  Ajouté le {new Date(item.addedAt).toLocaleDateString()}
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-bold text-lg">
                  {item.basePrice.toLocaleString()}€
                </div>
                {item.optionsPrice > 0 && (
                  <div className="text-sm text-blue-600">
                    + {item.optionsPrice}€ d'options
                  </div>
                )}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-2 text-red-600 hover:text-red-800 text-sm"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Sous-total véhicules :</span>
              <span>{cart.reduce((sum, item) => sum + item.basePrice, 0).toLocaleString()}€</span>
            </div>
            <div className="flex justify-between">
              <span>Options :</span>
              <span>{cart.reduce((sum, item) => sum + item.optionsPrice, 0).toLocaleString()}€</span>
            </div>
            <div className="flex justify-between">
              <span>TVA (20%) :</span>
              <span>{(total * 0.2).toLocaleString()}€</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>Total :</span>
              <span className="text-green-600">
                {total.toLocaleString()}€
              </span>
            </div>
          </div>

          <button className="w-full mt-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors">
            Finaliser la commande
          </button>
        </div>
      </div>
    </div>
  );
};

export default Panier;
