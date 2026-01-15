import React, { useState, useEffect } from 'react';
import { vehiculeService } from '../services/api';
import { Search, Filter, Plus, Trash2, Edit, Eye } from 'lucide-react';

const CataloguePage = () => {
  const [vehicules, setVehicules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEnergie, setFilterEnergie] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchVehicules();
  }, []);

  const fetchVehicules = async () => {
    try {
      setLoading(true);
      const response = await vehiculeService.getAllVehicules();
      setVehicules(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des véhicules:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      try {
        const response = await vehiculeService.searchVehicules(searchTerm);
        setVehicules(response.data);
      } catch (error) {
        console.error('Erreur lors de la recherche:', error);
      }
    } else {
      fetchVehicules();
    }
  };

  const filteredVehicules = vehicules.filter(vehicule => {
    if (filterEnergie === 'all') return true;
    return vehicule.energie === filterEnergie;
  });

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      try {
        await vehiculeService.deleteVehicule(id);
        setVehicules(vehicules.filter(v => v.id !== id));
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Catalogue Véhicules</h1>
          <p className="mt-2 text-gray-600">Gérez votre inventaire de véhicules</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Ajouter un véhicule
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un véhicule..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="input-field pl-10"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Filter className="w-5 h-5 mr-2 text-gray-500" />
              <select
                value={filterEnergie}
                onChange={(e) => setFilterEnergie(e.target.value)}
                className="input-field"
              >
                <option value="all">Toutes les énergies</option>
                <option value="Essence">Essence</option>
                <option value="Electrique">Électrique</option>
              </select>
            </div>
            
            <button onClick={handleSearch} className="btn-primary">
              Rechercher
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="text-2xl font-bold text-gray-900">{vehicules.length}</div>
          <div className="text-sm text-gray-500">Véhicules total</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="text-2xl font-bold text-green-600">
            {vehicules.filter(v => v.energie === 'Electrique').length}
          </div>
          <div className="text-sm text-gray-500">Véhicules électriques</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="text-2xl font-bold text-orange-600">
            {vehicules.filter(v => v.energie === 'Essence').length}
          </div>
          <div className="text-sm text-gray-500">Véhicules essence</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="text-2xl font-bold text-blue-600">
            {vehicules.reduce((sum, v) => sum + v.stock, 0)}
          </div>
          <div className="text-sm text-gray-500">Stock total</div>
        </div>
      </div>

      {/* Véhicules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicules.map((vehicule) => (
          <div key={vehicule.id} className="card group">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{vehicule.marque} {vehicule.modele}</h3>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${
                    vehicule.energie === 'Electrique' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {vehicule.energie}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary-600">
                    {vehicule.prix.toLocaleString('fr-FR')} €
                  </div>
                  <div className="text-sm text-gray-500">Stock: {vehicule.stock}</div>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {vehicule.description}
              </p>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(vehicule.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <button className="btn-primary text-sm px-4 py-2">
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Ajouter un véhicule</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type de véhicule</label>
                <select className="input-field">
                  <option value="">Sélectionnez un type</option>
                  <option value="auto_essence">Automobile Essence</option>
                  <option value="auto_electrique">Automobile Électrique</option>
                  <option value="scooter_essence">Scooter Essence</option>
                  <option value="scooter_electrique">Scooter Électrique</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Marque</label>
                <input type="text" className="input-field" placeholder="Ex: Renault" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Modèle</label>
                <input type="text" className="input-field" placeholder="Ex: Clio" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prix</label>
                <input type="number" className="input-field" placeholder="Ex: 18500" />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Annuler
                </button>
                <button className="btn-primary">
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CataloguePage;
