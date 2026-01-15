import React, { useState } from 'react';

// Singleton Pattern
class DocumentBundleSingleton {
  constructor() {
    if (DocumentBundleSingleton.instance) {
      return DocumentBundleSingleton.instance;
    }
    
    this.documents = [];
    this.template = {
      registration: "Modèle: Demande d'immatriculation",
      transfer: "Modèle: Certificat de cession", 
      order: "Modèle: Bon de commande"
    };
    
    DocumentBundleSingleton.instance = this;
    return this;
  }
  
  createBlankBundle() {
    this.documents = [
      { type: 'Demande d\'immatriculation', content: this.template.registration, format: 'VIDE' },
      { type: 'Certificat de cession', content: this.template.transfer, format: 'VIDE' },
      { type: 'Bon de commande', content: this.template.order, format: 'VIDE' }
    ];
    return this.documents;
  }
  
  getInstanceInfo() {
    return {
      instanceId: this._instanceId ||= Math.random().toString(36).substr(2, 9),
      created: this._created ||= new Date().toISOString(),
      documentCount: this.documents.length
    };
  }
}

export function SingletonDemo() {
  const [instance1, setInstance1] = useState(null);
  const [instance2, setInstance2] = useState(null);
  const [bundles, setBundles] = useState([]);
  
  const demonstrateSingleton = () => {
    // Créer deux "nouvelles" instances
    const singleton1 = new DocumentBundleSingleton();
    const singleton2 = new DocumentBundleSingleton();
    
    setInstance1(singleton1.getInstanceInfo());
    setInstance2(singleton2.getInstanceInfo());
    
    // Créer une liasse vierge
    const blankBundle = singleton1.createBlankBundle();
    setBundles(blankBundle);
    
    // Vérifier si c'est la même instance
    const areSameInstance = singleton1 === singleton2;
    
    alert(`Les deux variables référencent ${areSameInstance ? 'LA MÊME' : 'DES DIFFÉRENTES'} instance.\nID Instance 1: ${singleton1.getInstanceInfo().instanceId}\nID Instance 2: ${singleton2.getInstanceInfo().instanceId}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-bold text-yellow-800 mb-2">Singleton Pattern</h3>
        <p className="text-yellow-700">
          Garantit qu'une classe n'a qu'une seule instance et fournit un point d'accès global à celle-ci.
        </p>
      </div>
      
      <button
        onClick={demonstrateSingleton}
        className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition-colors"
      >
        Démontrer le pattern Singleton
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-bold text-gray-800">Instances créées :</h4>
          
          {instance1 && instance2 ? (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg border ${instance1.instanceId === instance2.instanceId ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <h5 className="font-bold mb-2">Instance 1</h5>
                <div className="text-sm space-y-1">
                  <p><span className="text-gray-500">ID:</span> {instance1.instanceId}</p>
                  <p><span className="text-gray-500">Créée le:</span> {new Date(instance1.created).toLocaleString()}</p>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg border ${instance1.instanceId === instance2.instanceId ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <h5 className="font-bold mb-2">Instance 2</h5>
                <div className="text-sm space-y-1">
                  <p><span className="text-gray-500">ID:</span> {instance2.instanceId}</p>
                  <p><span className="text-gray-500">Créée le:</span> {new Date(instance2.created).toLocaleString()}</p>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg ${instance1.instanceId === instance2.instanceId ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <p className="font-bold">
                  {instance1.instanceId === instance2.instanceId 
                    ? '✅ LES DEUX VARIABLES POINTENT VERS LA MÊME INSTANCE !' 
                    : '❌ LES VARIABLES POINTENT VERS DES INSTANCES DIFFÉRENTES'}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Cliquez sur le bouton pour démontrer
            </div>
          )}
        </div>
        
        <div>
          <h4 className="font-bold text-gray-800 mb-4">Liasse vierge créée :</h4>
          {bundles.length > 0 ? (
            <div className="space-y-3">
              {bundles.map((doc, index) => (
                <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <h5 className="font-medium">{doc.type}</h5>
                    <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                      {doc.format}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{doc.content}</p>
                  <div className="mt-2 text-xs text-gray-500">
                    Cette liasse vierge sert de modèle pour tous les documents du système
                  </div>
                </div>
              ))}
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-700">
                  📝 Cette liasse vierge est utilisée comme template pour toutes les nouvelles acquisitions de véhicules.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              La liasse vierge sera générée ici
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-bold text-gray-800 mb-2">Code du Singleton :</h4>
        <pre className="text-sm bg-gray-800 text-gray-100 p-3 rounded overflow-auto">
{`class DocumentBundleSingleton {
  constructor() {
    if (DocumentBundleSingleton.instance) {
      return DocumentBundleSingleton.instance; // Retourne l'instance existante
    }
    DocumentBundleSingleton.instance = this; // Crée la première instance
    return this;
  }
  
  // Méthodes de l'instance unique...
}

// Usage :
const instance1 = new DocumentBundleSingleton();
const instance2 = new DocumentBundleSingleton();
console.log(instance1 === instance2); // true`}
        </pre>
      </div>
    </div>
  );
}
