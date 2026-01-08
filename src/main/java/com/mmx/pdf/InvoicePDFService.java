package com.mmx.pdf;

import java.io.IOException;

/**
 * Service pour générer des PDF de factures
 * Utilise le pattern Adapter pour adapter différentes bibliothèques PDF
 */
public interface InvoicePDFService {
    byte[] generateInvoicePDF(Invoice invoice) throws IOException;
    String getPDFMetadata(Invoice invoice);
}
