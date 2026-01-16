package com.mmx.pdf;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

/**
 * Implémentation avec Apache PDFBox (Adapter Pattern) - Classe publique
 */
public class PDFBoxAdapter implements InvoicePDFService {
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    private static final NumberFormat CURRENCY_FORMAT = NumberFormat.getCurrencyInstance(Locale.FRANCE);
    
    @Override
    public byte[] generateInvoicePDF(Invoice invoice) throws IOException {
        // Pour l'instant, retournons un PDF simulé
        // Dans une vraie implémentation, vous utiliseriez PDFBox
        
        String pdfContent = generateSimulatedPDF(invoice);
        return pdfContent.getBytes();
    }
    
    private String generateSimulatedPDF(Invoice invoice) {
        StringBuilder pdf = new StringBuilder();
        
        pdf.append("=== FACTURE ===\n\n");
        pdf.append("Facture N°: ").append(invoice.getInvoiceNumber()).append("\n");
        pdf.append("Date: ").append(invoice.getInvoiceDate().format(DATE_FORMATTER)).append("\n\n");
        
        pdf.append("CLIENT:\n");
        pdf.append(invoice.getClientName()).append("\n");
        pdf.append(invoice.getClientAddress()).append("\n\n");
        
        pdf.append("ARTICLES:\n");
        pdf.append(String.format("%-40s %-10s %-15s %-15s\n", 
            "Description", "Quantité", "Prix unit.", "Total"));
        pdf.append("-".repeat(80)).append("\n");
        
        for (InvoiceItem item : invoice.getItems()) {
            pdf.append(String.format("%-40s %-10d %-15s %-15s\n",
                item.getDescription().length() > 40 ? item.getDescription().substring(0, 37) + "..." : item.getDescription(),
                item.getQuantity(),
                CURRENCY_FORMAT.format(item.getUnitPrice()),
                CURRENCY_FORMAT.format(item.getTotalPrice())));
        }
        
        pdf.append("\n");
        pdf.append(String.format("%65s %-15s\n", "Sous-total:", CURRENCY_FORMAT.format(invoice.getSubTotal())));
        pdf.append(String.format("%65s %-15s\n", "Taxes (" + invoice.getTaxRate() + "%):", CURRENCY_FORMAT.format(invoice.getTaxAmount())));
        pdf.append(String.format("%65s %-15s\n", "TOTAL:", CURRENCY_FORMAT.format(invoice.getTotalAmount())));
        
        pdf.append("\n\nFacture générée automatiquement par MMX Véhicules\n");
        pdf.append("Date de génération: ").append(LocalDate.now().format(DATE_FORMATTER));
        
        return pdf.toString();
    }
    
    @Override
    public String getPDFMetadata(Invoice invoice) {
        return String.format("PDF_Facture_%s_%s_%s.pdf",
            invoice.getInvoiceNumber(),
            invoice.getClientName().replaceAll("\\s+", "_"),
            invoice.getInvoiceDate().format(DateTimeFormatter.ofPattern("yyyyMMdd")));
    }
}
