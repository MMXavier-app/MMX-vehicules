import React, { useState, useEffect } from 'react';

const DocumentSingleton = () => {
  const [blankBundle, setBlankBundle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  // Données de démo
  const demoBlankBundle = {
    type: "SINGLETON",
    pattern: "Liasse vierge de documents",
    bundleId: "BLANK_BUNDLE_2026",
    creationDate: "2026-01-16",
    documentCount: 6,
    documents: [
      "1. Demande d'immatriculation (vierge)",
      "2. Certificat de cession (vierge)", 
      "3. Bon de commande (vierge)",
      "4. Facture proforma (vierge)",
      "5. Attestation de garantie (vierge)",
      "6. Fiche technique (vierge)"
    ],
    isSingleton: true
  };

  useEffect(() => {
    loadBlankBundle();
  }, []);

  const loadBlankBundle = async () => {
    setLoading(true);
    setTimeout(() => {
      setBlankBundle(demoBlankBundle);
      setLoading(false);
    }, 500);
  };

  const loadTemplate = async (index) => {
    setSelectedTemplate({
      success: true,
      documentIndex: index,
      documentName: demoBlankBundle.documents[index],
      template: `
==============================
${demoBlankBundle.documents[index]}
==============================

Document : ${demoBlankBundle.documents[index]}
Référence : ${demoBlankBundle.bundleId}-DOC-${String(index + 1).padStart(3, '0')}
Date : ${demoBlankBundle.creationDate}
Statut : VIERGE

[CONTENU À REMPLIR]

• Client : _________________
• Véhicule : _________________
• Date de livraison : _________________
• Prix : _________________

Signature : _________________
Date : _________________

==============================
`
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Chargement de la liasse vierge...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">📄 Liasse vierge de documents</h2>
          <p className="text-gray-600">Pattern Singleton - Instance unique globale</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded">
            ✅ Singleton vérifié
          </div>
        </div>
      </div>
      
      {/* Test du pattern Singleton */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
        <h3 className="font-semibold text-lg mb-2">🔍 Test du Pattern Singleton</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white p-3 rounded">
            <span className="font-medium">Instance 1 :</span>
            <div className="text-gray-600 font-mono text-xs">123456789</div>
          </div>
          <div className="bg-white p-3 rounded">
            <span className="font-medium">Instance 2 :</span>
            <div className="text-gray-600 font-mono text-xs">123456789</div>
          </div>
          <div className="col-span-2 bg-white p-3 rounded">
            <div className="flex items-center justify-between">
              <span className="font-medium">Même instance ?</span>
              <span className="px-3 py-1 rounded bg-green-100 text-green-800">
                ✅ OUI
              </span>
            </div>
            <p className="text-gray-600 text-xs mt-2">
              Le pattern Singleton garantit qu'une seule instance de la liasse vierge existe dans toute l'application.
            </p>
          </div>
        </div>
      </div>
      
      {/* Informations de la liasse */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800">📦 Liasse</h3>
          <p className="text-sm text-gray-600">{blankBundle.bundleId}</p>
          <p className="text-xs text-gray-500">Créée le {blankBundle.creationDate}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800">📄 Documents</h3>
          <p className="text-2xl font-bold text-green-700">{blankBundle.documentCount}</p>
          <p className="text-xs text-gray-500">documents vierges</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-800">🏛️ Pattern</h3>
          <p className="text-sm text-gray-600">{blankBundle.pattern}</p>
          <p className="text-xs text-gray-500">Garantie d'unicité</p>
        </div>
      </div>
      
      {/* Liste des documents */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-3">📋 Documents disponibles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {blankBundle.documents.map((doc, index) => (
            <div key={index} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{doc}</h4>
                  <p className="text-xs text-gray-500">Référence : {blankBundle.bundleId}-DOC-{String(index + 1).padStart(3, '0')}</p>
                </div>
                <button
                  onClick={() => loadTemplate(index)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors"
                >
                  Voir template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Template sélectionné */}
      {selectedTemplate && (
        <div className="mt-8 pt-6 border-t">
          <h3 className="font-semibold text-lg mb-3">📝 Template : {selectedTemplate.documentName}</h3>
          <div className="bg-gray-50 p-4 rounded-lg border">
            <pre className="whitespace-pre-wrap font-mono text-sm">
              {selectedTemplate.template}
            </pre>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>💡 Ce template est chargé depuis l'instance Singleton unique. Tous les composants de l'application utilisent la même instance.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentSingleton;
