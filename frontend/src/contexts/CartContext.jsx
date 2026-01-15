import React, { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartHistory, setCartHistory] = useState([]);

  // Sauvegarder l'état du panier
  const saveState = useCallback(() => {
    setCartHistory(prev => [...prev, [...cart]]);
  }, [cart]);

  // Annuler la dernière action
  const undo = useCallback(() => {
    if (cartHistory.length > 0) {
      const previousState = cartHistory[cartHistory.length - 1];
      setCartHistory(prev => prev.slice(0, -1));
      setCart(previousState);
    }
  }, [cartHistory]);

  // Vérifier les options incompatibles
  const checkOptionConflicts = useCallback((options) => {
    const incompatiblePairs = [
      ['sièges sportifs', 'sièges en cuir'],
      ['toit panoramique', 'barres de toit'],
      ['suspension sport', 'confort+'],
    ];

    for (const [option1, option2] of incompatiblePairs) {
      if (options.includes(option1) && options.includes(option2)) {
        return { option1, option2 };
      }
    }
    return null;
  }, []);

  // Ajouter au panier
  const addToCart = useCallback((vehicle, selectedOptions = []) => {
    saveState();
    
    const conflict = checkOptionConflicts(selectedOptions);
    if (conflict) {
      throw new Error(`Options incompatibles: ${conflict.option1} et ${conflict.option2}`);
    }

    const newItem = {
      id: Date.now(),
      vehicle,
      options: selectedOptions,
      basePrice: vehicle.price,
    };

    setCart(prev => [...prev, newItem]);
  }, [saveState, checkOptionConflicts]);

  // Retirer du panier
  const removeFromCart = useCallback((id) => {
    saveState();
    setCart(prev => prev.filter(item => item.id !== id));
  }, [saveState]);

  // VIDER LE PANIER (NOUVELLE FONCTION)
  const clearCart = useCallback(() => {
    saveState();
    setCart([]);
  }, [saveState]);

  // Calculer le total
  const calculateTotal = useCallback(() => {
    return cart.reduce((total, item) => {
      return total + item.basePrice;
    }, 0);
  }, [cart]);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart, // AJOUTÉ
    undo,
    canUndo: cartHistory.length > 0,
    calculateTotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
