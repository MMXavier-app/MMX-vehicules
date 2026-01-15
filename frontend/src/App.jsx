import React, { useState } from 'react';
import { CartProvider } from './contexts/CartContext';
import Catalogue from './components/Catalogue';
import { ShoppingCart } from './components/cart/ShoppingCart';
import RechercheIterator from './components/RechercheIterator';
import FormulairesBridge from './components/FormulairesBridge';
import CommandesFactoryMethod from './components/CommandesFactoryMethod';
import DocumentsBuilder from './components/DocumentsBuilder';
import { CompanyTree, sampleCompanies } from './components/companies/CompanyTree';
import DocumentSingleton from './components/documents/DocumentSingleton';
import './App.css';

// Données de démo enrichies avec sociétés africaines
const enhancedSampleCompanies = () => {
  const baseCompanies = sampleCompanies;
  
  // Ajouter des sociétés africaines
  const africanCompanies = [
    {
      id: 7,
      name: 'Groupe Automobile Cameroun',
      type: 'Holding',
      employees: 850,
      country: 'Cameroun',
      city: 'Yaoundé',
      subsidiaries: [
        {
          id: 8,
          name: 'Yaoundé Auto Distribution',
          type: 'Distribution',
          employees: 220,
          country: 'Cameroun',
          city: 'Yaoundé Centre',
          subsidiaries: [
            {
              id: 9,
              name: 'Concession Yaoundé Bastos',
              type: 'Concession',
              employees: 35,
              country: 'Cameroun',
              city: 'Yaoundé Bastos'
            },
            {
              id: 10,
              name: 'Concession Douala Akwa',
              type: 'Concession',
              employees: 42,
              country: 'Cameroun',
              city: 'Douala Akwa'
            }
          ]
        },
        {
          id: 11,
          name: 'Cameroon Fleet Solutions',
          type: 'Location',
          employees: 95,
          country: 'Cameroun',
          city: 'Yaoundé'
        }
      ]
    },
    {
      id: 12,
      name: 'Groupe Automobile Sénégal',
      type: 'Holding',
      employees: 620,
      country: 'Sénégal',
      city: 'Dakar',
      subsidiaries: [
        {
          id: 13,
          name: 'Dakar Auto Distribution',
          type: 'Distribution',
          employees: 180,
          country: 'Sénégal',
          city: 'Dakar Plateau'
        }
      ]
    },
    {
      id: 14,
      name: 'Groupe Auto Côte d\'Ivoire',
      type: 'Holding',
      employees: 540,
      country: 'Côte d\'Ivoire',
      city: 'Abidjan'
    }
  ];
  
  return [...baseCompanies, ...africanCompanies];
};

function App() {
  const [activeTab, setActiveTab] = useState('catalogue');

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">🚗 MMX Véhicules</h1>
                <p className="text-blue-200">Vente en ligne de véhicules - Étude de cas INF4067</p>
                <p className="text-sm text-blue-300 mt-1">11 patrons de conception implémentés</p>
              </div>
              <div className="text-right">
                <p className="text-sm">Date de remise : 16/01/2026</p>
                <p className="text-blue-200 text-xs">Builder Pattern: Liasses de documents</p>
              </div>
            </div>
          </div>
        </header>

        <nav className="bg-white shadow">
          <div className="container mx-auto px-4">
            <div className="flex space-x-1 overflow-x-auto">
              <button
                onClick={() => setActiveTab('catalogue')}
                className={`px-4 py-3 font-medium whitespace-nowrap transition-colors ${
                  activeTab === 'catalogue'
                    ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                📋 Catalogue
              </button>
              <button
                onClick={() => setActiveTab('recherche')}
                className={`px-4 py-3 font-medium whitespace-nowrap transition-colors ${
                  activeTab === 'recherche'
                    ? 'bg-orange-50 text-orange-700 border-b-2 border-orange-600'
                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                🔍 Recherche (Iterator)
              </button>
              <button
                onClick={() => setActiveTab('panier')}
                className={`px-4 py-3 font-medium whitespace-nowrap transition-colors ${
                  activeTab === 'panier'
                    ? 'bg-green-50 text-green-700 border-b-2 border-green-600'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                🛒 Panier
              </button>
              <button
                onClick={() => setActiveTab('commandes')}
                className={`px-4 py-3 font-medium whitespace-nowrap transition-colors ${
                  activeTab === 'commandes'
                    ? 'bg-red-50 text-red-700 border-b-2 border-red-600'
                    : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                📝 Commandes (Factory Method)
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className={`px-4 py-3 font-medium whitespace-nowrap transition-colors ${
                  activeTab === 'documents'
                    ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                📄 Documents (Builder)
              </button>
              <button
                onClick={() => setActiveTab('societes')}
                className={`px-4 py-3 font-medium whitespace-nowrap transition-colors ${
                  activeTab === 'societes'
                    ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                🏢 Sociétés (Composite)
              </button>
              <button
                onClick={() => setActiveTab('singleton')}
                className={`px-4 py-3 font-medium whitespace-nowrap transition-colors ${
                  activeTab === 'singleton'
                    ? 'bg-teal-50 text-teal-700 border-b-2 border-teal-600'
                    : 'text-gray-600 hover:text-teal-600 hover:bg-teal-50'
                }`}
              >
                🏛️ Singleton (Liasse vierge)
              </button>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-8">
          {activeTab === 'catalogue' && (
            <div className="space-y-8">
              <Catalogue />
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">🛒 Panier actuel</h2>
                <ShoppingCart />
              </div>
            </div>
          )}
          
          {activeTab === 'recherche' && (
            <div className="p-6">
              <RechercheIterator />
            </div>
          )}
          
          {activeTab === 'panier' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">🛒 Gestion du Panier</h2>
              <ShoppingCart />
            </div>
          )}
          
          {activeTab === 'commandes' && (
            <div className="p-6">
              <CommandesFactoryMethod />
            </div>
          )}
          
          {activeTab === 'documents' && (
            <div className="p-6">
              <DocumentsBuilder />
            </div>
          )}
          
          {activeTab === 'societes' && (
            <div className="p-6">
              <CompanyTree companies={enhancedSampleCompanies()} />
            </div>
          )}
          
          {activeTab === 'singleton' && (
            <div className="p-6">
              <DocumentSingleton />
            </div>
          )}
        </main>

        <footer className="bg-gray-800 text-white py-6 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-400">
              Projet INF4067 - Étude de cas pratique - Remise le 16/01/2026
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Patterns implémentés : Abstract Factory, Builder, Factory Method, Singleton, 
              Adapter, Bridge, Composite, Decorator, Observer, Iterator, Template Method, Command
            </p>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;
