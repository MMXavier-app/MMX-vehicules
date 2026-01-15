import React, { useState } from 'react';

// Système existant (Legacy)
class LegacyPDFGenerator {
  generatePDF(data) {
    return `PDF LEGACY: ${data}`;
  }
  
  printPDF(pdfContent) {
    return `Impression PDF: ${pdfContent}`;
  }
}

// Nouvelle interface souhaitée
class DocumentGenerator {
  generateDocument(data, format) {
    throw new Error('Méthode abstraite');
  }
  
  previewDocument(document) {
    throw new Error('Méthode abstraite');
  }
}

// HTML Generator (implémentation native)
class HTMLGenerator extends DocumentGenerator {
  generateDocument(data, format) {
    return `<html><body><h1>${data.title}</h1><p>${data.content}</p></body></html>`;
  }
  
  previewDocument(document) {
    return `Prévisualisation HTML: ${document.substring(0, 50)}...`;
  }
}

// Adapter pour PDF
class PDFAdapter extends DocumentGenerator {
  constructor() {
    super();
    this.legacyPDFGenerator = new LegacyPDFGenerator();
  }
  
  generateDocument(data, format) {
    // Adapte l'interface moderne à l'ancienne
    const legacyData = `Titre: ${data.title}, Contenu: ${data.content}`;
    return this.legacyPDFGenerator.generatePDF(legacyData);
  }
  
  previewDocument(document) {
    return this.legacyPDFGenerator.printPDF(document);
  }
}

export function AdapterDemo() {
  const [format, setFormat] = useState('HTML');
  const [documents, setDocuments] = useState([]);
  
  const generateDocument = () => {
    const data = {
      title: `Document ${format} - Commande Véhicule`,
      content: `Ce document a été généré le ${new Date().toLocaleString()} au format ${format}.`,
      vehicle: 'Tesla Model 3',
      client: 'Jean Dupont'
    };
    
    let generator;
    if (format === 'HTML') {
      generator = new HTMLGenerator();
    } else {
      generator = new PDFAdapter(); // Utilise l'adaptateur pour PDF
    }
    
    const document = generator.generateDocument(data, format);
    const preview = generator.previewDocument(document);
    
    setDocuments(prev => [{
      format,
      content: document,
      preview,
      timestamp: new Date().toLocaleTimeString()
    }, ...prev.slice(0, 3)]);
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-red-50 p-4 rounded-lg">
        <h3 className="font-bold text-red-800 mb-2">Adapter Pattern</h3>
        <p className="text-red-700">
          Adapte une interface existante à une nouvelle interface attendue par les clients.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Format de document :
            </label>
            <div className="flex space-x-4">
              <button
                onClick={() => setFormat('HTML')}
                className={`px-4 py-2 rounded-lg ${format === 'HTML' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                📄 HTML (Nouveau)
              </button>
              <button
                onClick={() => setFormat('PDF')}
                className={`px-4 py-2 rounded-lg ${format === 'PDF' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
              >
                📊 PDF (Legacy + Adapter)
              </button>
            </div>
          </div>
          
          <button
            onClick={generateDocument}
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            Générer document {format}
          </button>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-2">Problème résolu :</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700">• Système legacy PDF avec interface propriétaire</p>
              <p className="text-gray-700">• Nouveau système utilise interface DocumentGenerator</p>
              <p className="text-gray-700">• Adapter permet la compatibilité sans modifier le code legacy</p>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-gray-800 mb-4">Documents générés :</h4>
          {documents.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Générez un document pour voir l'adaptateur en action
            </div>
          ) : (
            <div className="space-y-4">
              {documents.map((doc, index) => (
                <div key={index} className={`border rounded-lg p-4 ${doc.format === 'PDF' ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'}`}>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{doc.format === 'PDF' ? '📊' : '📄'}</span>
                      <h5 className="font-bold">Document {doc.format}</h5>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded ${doc.format === 'PDF' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                      {doc.format === 'PDF' ? 'Via Adapter' : 'Natif'}
                    </span>
                  </div>
                  
                  <div className="bg-white p-3 rounded border mb-3">
                    <pre className="text-sm overflow-auto max-h-40">
                      {doc.content}
                    </pre>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">Prévisualisation :</p>
                    <p className="mt-1">{doc.preview}</p>
                  </div>
                  
                  <div className="mt-3 text-xs text-gray-500">
                    Généré à {doc.timestamp}
                  </div>
                  
                  {doc.format === 'PDF' && (
                    <div className="mt-3 p-2 bg-yellow-100 text-yellow-800 text-sm rounded">
                      ⚡ Cet utilisateur l'Adaptateur pour convertir l'interface legacy PDF
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-bold text-gray-800 mb-2">Structure de l'Adapter :</h4>
        <pre className="text-sm bg-gray-800 text-gray-100 p-3 rounded overflow-auto">
{`// Ancienne interface (legacy)
class LegacyPDFGenerator {
  generatePDF(data) { /* ... */ }
}

// Nouvelle interface
class DocumentGenerator {
  generateDocument(data) { /* ... */ }
}

// Adapter
class PDFAdapter extends DocumentGenerator {
  constructor() {
    super();
    this.legacy = new LegacyPDFGenerator();
  }
  
  generateDocument(data) {
    // Adapte les données et appelle l'ancien système
    const legacyData = this.adaptData(data);
    return this.legacy.generatePDF(legacyData);
  }
}`}
        </pre>
      </div>
    </div>
  );
}
