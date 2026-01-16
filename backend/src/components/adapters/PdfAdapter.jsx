import React, { useState } from 'react';

const PdfAdapter = () => {
  const [pdfContent, setPdfContent] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [conversionHistory, setConversionHistory] = useState([]);

  // Simuler des documents HTML
  const htmlTemplates = [
    {
      name: 'Demande d\'immatriculation',
      html: `
        <div class="document">
          <h1>Demande d'immatriculation</h1>
          <p><strong>Client:</strong> _________________</p>
          <p><strong>Véhicule:</strong> _________________</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString('fr-FR')}</p>
        </div>
      `
    },
    {
      name: 'Certificat de cession',
      html: `
        <div class="document">
          <h1>Certificat de cession</h1>
          <p><strong>Cédant:</strong> _________________</p>
          <p><strong>Acquéreur:</strong> _________________</p>
          <p><strong>Prix:</strong> _________________ €</p>
        </div>
      `
    },
    {
      name: 'Bon de commande',
      html: `
        <div class="document">
          <h1>Bon de commande</h1>
          <p><strong>Référence:</strong> CMD-${Date.now()}</p>
          <p><strong>Détails véhicule:</strong> _________________</p>
          <p><strong>Options:</strong> _________________</p>
        </div>
      `
    }
  ];

  // Adapter: convertir HTML vers PDF (simulé)
  const adaptHtmlToPdf = (html) => {
    // Simulation de conversion HTML → PDF
    const pdf = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 100
>>
stream
${html.replace(/<[^>]*>/g, '')}
endstream
endobj

xref
0 5
0000000000 65535 f
0000000010 00000 n
0000000053 00000 n
0000000112 00000 n
0000000201 00000 n
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
308
%%EOF`;

    return pdf;
  };

  const handleConvertToPdf = () => {
    if (!htmlContent.trim()) {
      alert('Veuillez entrer du contenu HTML');
      return;
    }

    const pdf = adaptHtmlToPdf(htmlContent);
    setPdfContent(pdf);
    
    // Ajouter à l'historique
    setConversionHistory(prev => [
      {
        id: Date.now(),
        html: htmlContent.substring(0, 50) + '...',
        pdf: pdf.substring(0, 50) + '...',
        timestamp: new Date().toLocaleTimeString()
      },
      ...prev.slice(0, 4)
    ]);
  };

  const loadTemplate = (template) => {
    setHtmlContent(template.html);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">🔄 Adapter - Documents PDF</h2>
          <p className="text-gray-600">Conversion HTML → PDF - Pattern Adapter</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600 bg-green-50 px-3 py-1 rounded">
            Adaptateur de format
          </div>
        </div>
      </div>

      {/* Explication du pattern */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-lg mb-2">🎯 Pattern Adapter</h3>
        <p className="text-gray-600">
          L'Adapter permet à des interfaces incompatibles de travailler ensemble. Ici, nous adaptons 
          du contenu HTML (utilisé par l'application) au format PDF (requis pour l'impression).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section HTML */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">📝 Source HTML</h3>
            <div className="text-sm text-gray-500">
              {htmlContent.length} caractères
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium mb-2">Templates prédéfinis :</h4>
            <div className="flex flex-wrap gap-2">
              {htmlTemplates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => loadTemplate(template)}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm"
                >
                  {template.name}
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={htmlContent}
            onChange={(e) => setHtmlContent(e.target.value)}
            placeholder="Collez ou écrivez du contenu HTML ici..."
            className="w-full h-64 p-4 border rounded-lg font-mono text-sm"
          />

          <button
            onClick={handleConvertToPdf}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            🔄 Convertir en PDF
          </button>
        </div>

        {/* Section PDF */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">📄 PDF Résultat</h3>
            <div className="text-sm text-gray-500">
              {pdfContent ? `${pdfContent.length} caractères` : 'En attente'}
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-gray-50">
            <pre className="whitespace-pre-wrap font-mono text-xs h-64 overflow-auto">
              {pdfContent || 'Le PDF apparaîtra ici après conversion...'}
            </pre>
          </div>

          {pdfContent && (
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(pdfContent);
                  alert('PDF copié dans le presse-papier !');
                }}
                className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
              >
                📋 Copier PDF
              </button>
              <button
                onClick={() => {
                  const blob = new Blob([pdfContent], { type: 'application/pdf' });
                  const url = URL.createObjectURL(blob);
                  window.open(url, '_blank');
                }}
                className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
              >
                👁️ Visualiser
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Historique des conversions */}
      {conversionHistory.length > 0 && (
        <div className="mt-8 pt-6 border-t">
          <h3 className="font-bold text-lg mb-4">📊 Historique des conversions</h3>
          <div className="space-y-3">
            {conversionHistory.map((conv) => (
              <div key={conv.id} className="border rounded-lg p-3 hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Conversion à {conv.timestamp}</div>
                    <div className="text-sm text-gray-600">
                      HTML: {conv.html} → PDF: {conv.pdf}
                    </div>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Adapté
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Diagramme Adapter */}
      <div className="mt-8 pt-6 border-t">
        <h3 className="font-bold text-lg mb-4">🏗️ Structure du Pattern Adapter</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-center space-y-4">
            <div className="font-medium text-blue-600">Client (Application)</div>
            <div className="text-gray-400">↓ utilise</div>
            <div className="font-medium text-green-600">Interface Cible (PDFGenerator)</div>
            <div className="text-gray-400">↓</div>
            <div className="font-medium text-purple-600">Adaptateur (HtmlToPdfAdapter)</div>
            <div className="text-gray-400">↓ adapte</div>
            <div className="font-medium text-red-600">Adapté (HTMLDocument)</div>
            <div className="mt-4 text-sm text-gray-600">
              L'Adaptateur convertit l'interface d'HTMLDocument en celle attendue par PDFGenerator
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfAdapter;
