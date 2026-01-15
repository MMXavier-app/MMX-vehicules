import React, { useState } from 'react';
import InvoicePDFGenerator from './InvoicePDFGenerator';

export const InvoiceActions = ({ invoice, onValidate, onCancel }) => {
  const [showPDFGenerator, setShowPDFGenerator] = useState(false);
  
  const handleValidateInvoice = () => {
    if (window.confirm(`Valider la facture ${invoice.invoiceNumber} ?`)) {
      onValidate(invoice);
      // Après validation, montrer l'option PDF
      setTimeout(() => {
        setShowPDFGenerator(true);
      }, 500);
    }
  };
  
  const handleGeneratePDF = () => {
    setShowPDFGenerator(true);
  };
  
  const handleSendEmail = () => {
    alert(`Facture ${invoice.invoiceNumber} envoyée par email au client`);
  };
  
  return (
    <>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleValidateInvoice}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
        >
          ✅ Valider la facture
        </button>
        
        {invoice.status === 'validated' && (
          <>
            <button
              onClick={handleGeneratePDF}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              📄 Générer PDF
            </button>
            
            <button
              onClick={handleSendEmail}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
            >
              ✉️ Envoyer par email
            </button>
          </>
        )}
        
        <button
          onClick={() => onCancel(invoice)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          ❌ Annuler
        </button>
      </div>
      
      {showPDFGenerator && (
        <InvoicePDFGenerator
          invoice={invoice}
          onClose={() => setShowPDFGenerator(false)}
        />
      )}
    </>
  );
};

export default InvoiceActions;
