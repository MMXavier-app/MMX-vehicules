import React, { useState } from 'react';
import { saveAs } from 'file-saver';

export const InvoicePDFGenerator = ({ invoice, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [includeQRCode, setIncludeQRCode] = useState(false);
  const [includeLogo, setIncludeLogo] = useState(true);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const generatePDF = async () => {
    if (!invoice) return;

    setIsGenerating(true);
    
    try {
      // Simulation d'appel API (à remplacer par votre vrai endpoint)
      console.log('Génération PDF pour la facture:', invoice.id);
      
      // Pour le moment, simuler la génération
      setTimeout(() => {
        // Créer un PDF simulé (en réalité, vous appellerez votre backend)
        const pdfContent = `
          FACTURE N°: ${invoice.invoiceNumber}
          Date: ${formatDate(invoice.invoiceDate)}
          
          CLIENT:
          ${invoice.clientName}
          ${invoice.clientAddress}
          
          ARTICLES:
          ${invoice.items.map(item => 
            `${item.description} - ${item.quantity} x ${formatCurrency(item.unitPrice)} = ${formatCurrency(item.totalPrice)}`
          ).join('\n')}
          
          SOUS-TOTAL: ${formatCurrency(invoice.subTotal)}
          TAXES (${invoice.taxRate}%): ${formatCurrency(invoice.taxAmount)}
          TOTAL: ${formatCurrency(invoice.totalAmount)}
          
          Facture générée par MMX Véhicules
        `;
        
        const blob = new Blob([pdfContent], { type: 'application/pdf' });
        const fileName = `Facture_${invoice.invoiceNumber}_${invoice.clientName.replace(/\s+/g, '_')}.pdf`;
        
        saveAs(blob, fileName);
        
        alert(`PDF généré avec succès : ${fileName}`);
        setIsGenerating(false);
        
        if (onClose) onClose();
      }, 1500);
      
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la génération du PDF');
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">📄 Générer PDF</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Facture #{invoice.invoiceNumber}</h3>
              <p className="text-blue-700">{invoice.clientName}</p>
              <p className="text-blue-600 text-sm">Total: {formatCurrency(invoice.totalAmount)}</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={includeLogo}
                    onChange={(e) => setIncludeLogo(e.target.checked)}
                    className="h-5 w-5 text-blue-600 rounded"
                  />
                  <span className="text-gray-700">Inclure le logo MMX</span>
                </label>
                <span className="text-sm text-gray-500">✅ Recommandé</span>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={includeQRCode}
                    onChange={(e) => setIncludeQRCode(e.target.checked)}
                    className="h-5 w-5 text-blue-600 rounded"
                  />
                  <span className="text-gray-700">Ajouter QR Code de paiement</span>
                </label>
                <span className="text-sm text-gray-500">⚡ Facilite le paiement</span>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600 mb-4">
                Le PDF sera généré avec le pattern <strong>Adapter</strong> (PDFBox) 
                et <strong>Builder</strong> pour la configuration.
              </p>
            </div>
          </div>
          
          <div className="flex space-x-4 mt-8">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={generatePDF}
              disabled={isGenerating}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Génération...
                </span>
              ) : (
                'Générer PDF'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePDFGenerator;
