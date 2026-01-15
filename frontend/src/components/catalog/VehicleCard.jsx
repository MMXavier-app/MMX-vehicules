import React, { useState } from 'react';

// Base Component
const BaseVehicleCard = ({ vehicle, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={vehicle.image || '/default-vehicle.jpg'} 
          alt={vehicle.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        {vehicle.isNew && (
          <span className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            NOUVEAU
          </span>
        )}
        {vehicle.discount && (
          <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            -{vehicle.discount}%
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900">{vehicle.name}</h3>
          <span className="text-lg font-semibold text-blue-600">
            {vehicle.type === 'electric' ? '⚡' : '⛽'} {vehicle.fuelType}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{vehicle.description}</p>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(vehicle.price)}
            </span>
            {vehicle.originalPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(vehicle.originalPrice)}
              </span>
            )}
          </div>
          
          <div className="text-sm text-gray-500">
            Stock: {vehicle.stock > 0 ? `${vehicle.stock} unités` : 'Rupture'}
          </div>
        </div>
        
        {children}
      </div>
    </div>
  );
};

// Decorator pour les animations
const withAnimation = (WrappedComponent) => {
  return function WithAnimation(props) {
    const [showAnimation, setShowAnimation] = useState(false);
    
    return (
      <div className="relative">
        <WrappedComponent {...props}>
          <button
            onClick={() => setShowAnimation(!showAnimation)}
            className="mt-4 w-full py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center gap-2"
          >
            <span>▶️ Voir l'animation</span>
          </button>
          
          {showAnimation && props.vehicle.animationUrl && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <div className="aspect-video w-full">
                <iframe
                  src={props.vehicle.animationUrl}
                  className="w-full h-full rounded"
                  title={`Animation ${props.vehicle.name}`}
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </WrappedComponent>
      </div>
    );
  };
};

// Decorator pour les options rapides
const withQuickOptions = (WrappedComponent) => {
  return function WithQuickOptions(props) {
    const popularOptions = ['GPS', 'Sièges chauffants', 'Caméra de recul'];
    
    return (
      <WrappedComponent {...props}>
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Options populaires :</p>
          <div className="flex flex-wrap gap-2">
            {popularOptions.map(option => (
              <span key={option} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {option}
              </span>
            ))}
          </div>
        </div>
        {props.children}
      </WrappedComponent>
    );
  };
};

// Composant exporté avec décorateurs appliqués
export const VehicleCard = withQuickOptions(withAnimation(BaseVehicleCard));

// Version simple sans décorateurs
export const SimpleVehicleCard = BaseVehicleCard;
