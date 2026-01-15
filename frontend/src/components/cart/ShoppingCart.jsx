import React, { useState, useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';

// Composant observateur
const CartObserverDisplay = ({ cart }) => {
  const [itemCount, setItemCount] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    setItemCount(cart.length);
    const total = cart.reduce((sum, item) => sum + item.basePrice, 0);
    setTotalValue(total);
  }, [cart]);

  return (
    <div className="bg-blue-50 p-4 rounded-lg mb-4">
      <div className="flex justify-between items-center">
        <div>
          <span className="font-semibold">Observateur de panier :</span>
          <span className="ml-2 text-blue-600">
            {itemCount} article{itemCount > 1 ? 's' : ''}
          </span>
        </div>
        <div className="text-green-600 font-bold">
          {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalValue)}
        </div>
      </div>
    </div>
  );
};

const ShoppingCart = () => {
  const { cart, removeFromCart, undo, canUndo, calculateTotal, clearCart } = useCart();
  const [localCart, setLocalCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [commandeFinalisee, setCommandeFinalisee] = useState(null);
  
  // Observer implementation
  useEffect(() => {
    setLocalCart([...cart]);
  }, [cart]);

  const handleFinaliserCommande = (commande) => {
    console.log('Commande finalisée:', commande);
    setCommandeFinalisee(commande);
    clearCart(); // Vider le panier après commande
    setShowCheckout(false);
    
    // Afficher une alerte de succès
    alert(`🎉 Commande #${commande.reference} confirmée !\n\nTotal: ${commande.totalTTC.toFixed(2)} €\n\nUn email de confirmation vous a été envoyé.`);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Votre panier est vide !');
      return;
    }
    setShowCheckout(true);
  };

  // Importer dynamiquement PanierFinalisation pour éviter les erreurs
  const PanierFinalisation = React.lazy(() => import('../PanierFinalisation'));

  // Si on est en mode checkout
  if (showCheckout) {
    // Préparer les données pour PanierFinalisation
    const panierData = {
      items: cart.map(item => ({
        id: item.id,
        nom: item.vehicle?.name || 'Véhicule',
        vehicule: item.vehicle?.name || 'Véhicule',
        prix: item.basePrice || 0,
        quantite: 1,
        options: item.options || []
      }))
    };
    
    return (
      <div className="p-6">
        <button
          onClick={() => setShowCheckout(false)}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg mb-4 hover:bg-gray-700 transition-colors"
        >
          ← Retour au panier
        </button>
        
        <React.Suspense fallback={<div className="p-8 text-center">Chargement du formulaire de commande...</div>}>
          <PanierFinalisation 
            panier={panierData}
            onCommandeFinalisee={handleFinaliserCommande}
          />
        </React.Suspense>
      </div>
    );
  }

  // Si commande finalisée
  if (commandeFinalisee) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="text-5xl mb-4 text-green-600">✅</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Commande Confirmée !</h3>
        
        <div className="bg-green-50 p-6 rounded-lg mb-6">
          <p className="font-semibold text-green-800 mb-2">Référence: {commandeFinalisee.reference}</p>
          <p className="text-gray-700">Date: {new Date(commandeFinalisee.date).toLocaleString()}</p>
          <p className="text-gray-700">Total: {commandeFinalisee.totalTTC.toFixed(2)} €</p>
          <p className="text-gray-700">Mode de paiement: {commandeFinalisee.modePaiement}</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6 text-left">
          <h4 className="font-bold text-blue-800 mb-2">Prochaines étapes :</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li className="text-blue-700">📧 Vous recevrez un email de confirmation</li>
            <li className="text-blue-700">📞 Notre équipe vous contactera sous 24h</li>
            <li className="text-blue-700">📄 La liasse documentaire a été générée</li>
            <li className="text-blue-700">🚚 Livraison prévue sous 15 jours ouvrés</li>
          </ul>
        </div>
        
        <button
          onClick={() => setCommandeFinalisee(null)}
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retourner au catalogue
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="text-5xl mb-4">🛒</div>
        <h3 className="text-xl font-bold text-gray-700 mb-2">Votre panier est vide</h3>
        <p className="text-gray-500">Ajoutez des véhicules pour commencer vos achats</p>
      </div>
    );
  }

  const total = calculateTotal();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gray-900 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">🛒 Panier d'achat</h2>
          <div className="flex gap-2">
            {canUndo && (
              <button
                onClick={undo}
                className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
              >
                ↩ Annuler
              </button>
            )}
            <button 
              onClick={handleCheckout}
              className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-500 transition-colors"
            >
              Commander
            </button>
          </div>
        </div>
      </div>

      <CartObserverDisplay cart={cart} />

      <div className="p-6">
        <div className="space-y-4">
          {localCart.map((item) => (
            <div key={item.id} className="flex items-center border-b pb-4">
              <div className="w-24 h-24 flex-shrink-0">
                {item.vehicle?.image ? (
                  <img
                    src={item.vehicle.image}
                    alt={item.vehicle?.name || 'Véhicule'}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">🚗</span>
                  </div>
                )}
              </div>
              
              <div className="ml-4 flex-grow">
                <h4 className="font-bold text-lg">{item.vehicle?.name || 'Véhicule'}</h4>
                <p className="text-gray-600 text-sm">{item.vehicle?.description || ''}</p>
                
                {item.options && item.options.length > 0 && (
                  <div className="mt-2">
                    <span className="text-sm text-gray-500">Options :</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.options.map(option => (
                        <span key={option} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {option}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="text-right">
                <div className="font-bold text-lg">
                  {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(item.basePrice)}
                </div>
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
              <span>Sous-total :</span>
              <span>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(total * 0.8)}</span>
            </div>
            <div className="flex justify-between">
              <span>Options :</span>
              <span>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(total * 0.1)}</span>
            </div>
            <div className="flex justify-between">
              <span>TVA (20%) :</span>
              <span>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(total * 0.2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>Total :</span>
              <span className="text-green-600">
                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(total)}
              </span>
            </div>
          </div>

          <button 
            onClick={handleCheckout}
            className="w-full mt-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
          >
            Finaliser la commande
          </button>
        </div>
      </div>
    </div>
  );
};

export { ShoppingCart };
