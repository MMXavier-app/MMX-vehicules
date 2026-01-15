import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';

const Catalogue = () => {
  const { addToCart } = useCart();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [message, setMessage] = useState('');

  const vehicles = [
    {
      id: 1,
      name: 'Tesla Model 3',
      type: 'electric',
      price: 45000,
      stock: 12,
      description: 'Voiture électrique avec autonomie de 500km',
      image: 'https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      name: 'Renault Zoé',
      type: 'electric',
      price: 32000,
      stock: 8,
      description: 'Compacte électrique urbaine',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&h=300&fit=crop',
    },
    {
      id: 3,
      name: 'Peugeot 208',
      type: 'gasoline',
      price: 22000,
      stock: 5,
      description: 'Citadine essence économique',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop',
    },
    {
      id: 4,
      name: 'BMW i4',
      type: 'electric',
      price: 55000,
      stock: 3,
      description: 'Berline électrique sportive',
      image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=400&h=300&fit=crop',
    },
    {
      id: 5,
      name: 'Volkswagen Golf',
      type: 'gasoline',
      price: 28000,
      stock: 10,
      description: 'Compacte polyvalente',
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop',
    },
    {
      id: 6,
      name: 'Vespa Elettrica',
      type: 'electric',
      price: 8500,
      stock: 15,
      description: 'Scooter électrique urbain',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    },
  ];

  const allOptions = [
    'GPS',
    'Sièges chauffants',
    'Caméra de recul',
    'Sièges sportifs',
    'Sièges en cuir',
    'Toit panoramique',
    'Barres de toit',
    'Suspension sport',
    'Confort+',
    'Peinture métallisée',
    'Jantes alliage',
    'Système audio premium',
  ];

  const handleAddToCart = (vehicle) => {
    try {
      addToCart(vehicle, selectedOptions);
      setMessage(`✅ ${vehicle.name} ajouté au panier avec ${selectedOptions.length} option(s)`);
      setSelectedOptions([]);
      setSelectedVehicle(null);
      
      // Effacer le message après 3 secondes
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(`❌ Erreur: ${error.message}`);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(opt => opt !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="space-y-6">
      {message && (
        <div className={`p-4 rounded-lg ${message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map(vehicle => (
          <div key={vehicle.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-48">
              <img 
                src={vehicle.image} 
                alt={vehicle.name}
                className="w-full h-full object-cover"
              />
              {vehicle.stock > 0 ? (
                <span className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                  Stock: {vehicle.stock}
                </span>
              ) : (
                <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                  Rupture
                </span>
              )}
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-900">{vehicle.name}</h3>
                <span className="text-lg font-semibold text-blue-600">
                  {vehicle.type === 'electric' ? '⚡' : '⛽'}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{vehicle.description}</p>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  {vehicle.price.toLocaleString()}€
                </span>
                <button
                  onClick={() => setSelectedVehicle(vehicle)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Options
                </button>
              </div>
              
              <button
                onClick={() => handleAddToCart(vehicle)}
                disabled={vehicle.stock === 0}
                className={`w-full py-3 rounded-lg font-bold transition-colors ${
                  vehicle.stock === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {vehicle.stock === 0 ? 'RUPTURE DE STOCK' : 'AJOUTER AU PANIER'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal pour sélectionner les options */}
      {selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Options pour {selectedVehicle.name}
                </h3>
                <button
                  onClick={() => {
                    setSelectedVehicle(null);
                    setSelectedOptions([]);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  Sélectionnez les options (500€ par option). Certaines options sont incompatibles.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {allOptions.map(option => (
                    <button
                      key={option}
                      onClick={() => toggleOption(option)}
                      className={`p-3 rounded-lg border transition-colors ${
                        selectedOptions.includes(option)
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
                <p className="font-bold text-yellow-800 mb-2">⚠️ Options incompatibles :</p>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Sièges sportifs ≠ Sièges en cuir</li>
                  <li>• Toit panoramique ≠ Barres de toit</li>
                  <li>• Suspension sport ≠ Confort+</li>
                </ul>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">Options sélectionnées :</p>
                  <p className="font-bold">
                    {selectedOptions.length > 0 
                      ? selectedOptions.join(', ')
                      : 'Aucune option'}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    + {selectedOptions.length * 500}€ d'options
                  </p>
                </div>
                
                <div className="space-x-3">
                  <button
                    onClick={() => setSelectedOptions([])}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                  >
                    Réinitialiser
                  </button>
                  <button
                    onClick={() => handleAddToCart(selectedVehicle)}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold"
                  >
                    Ajouter avec options
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalogue;
