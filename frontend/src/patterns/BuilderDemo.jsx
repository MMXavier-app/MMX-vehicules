import React, { useState } from 'react';

// Builder Pattern
class Document {
  constructor(type, content) {
    this.type = type;
    this.content = content;
    this.format = 'HTML';
  }
  
  setFormat(format) {
    this.format = format;
    return this;
  }
  
  toString() {
    return `${this.type} (${this.format}): ${this.content}`;
  }
}

class DocumentBundle {
  constructor() {
    this.documents = [];
  }
  
  addDocument(document) {
    this.documents.push(document);
  }
  
  getDocuments() {
    return this.documents;
  }
}

class DocumentBuilder {
  constructor() {
    this.bundle = new DocumentBundle();
  }
  
  createRegistrationRequest(vehicle, client) {
    const doc = new Document(
      'Demande d\'immatriculation',
      `Véhicule: ${vehicle}, Client: ${client}`
    );
    this.bundle.addDocument(doc);
    return this;
  }
  
  createTransferCertificate(vehicle, client) {
    const doc = new Document(
      'Certificat de cession',
      `Transfert de ${vehicle} à ${client}`
    );
    this.bundle.addDocument(doc);
    return this;
  }
  
  createOrderForm(vehicle, client) {
    const doc = new Document(
      'Bon de commande',
      `Commande N°${Math.floor(Math.random() * 10000)} - ${vehicle}`
    );
    this.bundle.addDocument(doc);
    return this;
  }
  
  setPDFFormat() {
    this.bundle.documents.forEach(doc => doc.setFormat('PDF'));
    return this;
  }
  
  setHTMLFormat() {
    this.bundle.documents.forEach(doc => doc.setFormat('HTML'));
    return this;
  }
  
  build() {
    return this.bundle;
  }
}

export function DocumentBuilderDemo() {
  const [format, setFormat] = useState('HTML');
  const [bundle, setBundle] = useState(null);
  
  const buildDocuments = () => {
    const builder = new DocumentBuilder();
    
    const builtBundle = builder
      .createRegistrationRequest('Tesla Model 3', 'Jean Dupont')
      .createTransferCertificate('Tesla Model 3', 'Jean Dupont')
      .createOrderForm('Tesla Model 3', 'Jean Dupont')
      [format === 'PDF' ? 'setPDFFormat' : 'setHTMLFormat']()
      .build();
    
    setBundle(builtBundle);
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="font-bold text-green-800 mb-2">Builder Pattern</h3>
        <p className="text-green-700">
          Construit des objets complexes (liasse de documents) étape par étape.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Format des documents :
            </label>
            <div className="flex space-x-4">
              <button
                onClick={() => setFormat('HTML')}
                className={`px-4 py-2 rounded-lg ${format === 'HTML' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
              >
                📄 Format HTML
              </button>
              <button
                onClick={() => setFormat('PDF')}
                className={`px-4 py-2 rounded-lg ${format === 'PDF' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
              >
                📊 Format PDF
              </button>
            </div>
          </div>
          
          <button
            onClick={buildDocuments}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Construire la liasse de documents ({format})
          </button>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-2">Code du Builder :</h4>
            <pre className="text-sm bg-gray-800 text-gray-100 p-3 rounded overflow-auto">
{`class DocumentBuilder {
  createRegistrationRequest() { /* ... */ return this; }
  createTransferCertificate() { /* ... */ return this; }
  createOrderForm() { /* ... */ return this; }
  setPDFFormat() { /* ... */ return this; }
  build() { return this.bundle; }
}

// Usage :
new DocumentBuilder()
  .createRegistrationRequest()
  .createTransferCertificate()
  .setPDFFormat()
  .build();`}
            </pre>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-gray-800 mb-4">Liasse de documents générée :</h4>
          {bundle ? (
            <div className="space-y-4">
              {bundle.getDocuments().map((doc, index) => (
                <div key={index} className={`border rounded-lg p-4 ${format === 'PDF' ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-bold flex items-center gap-2">
                      {format === 'PDF' ? '📊' : '📄'} {doc.type}
                    </h5>
                    <span className={`px-2 py-1 text-xs rounded ${format === 'PDF' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                      {doc.format}
                    </span>
                  </div>
                  <p className="text-gray-700">{doc.content}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    Généré le {new Date().toLocaleDateString()} à {new Date().toLocaleTimeString()}
                  </div>
                </div>
              ))}
              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  ✅ La liasse complète contient les 3 documents requis pour l'acquisition d'un véhicule.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Cliquez sur "Construire la liasse" pour générer les documents
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
