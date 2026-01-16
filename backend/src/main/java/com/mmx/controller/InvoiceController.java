package com.mmx.controller;

import com.mmx.pdf.InvoicePDFService;
import com.mmx.pdf.PDFGeneratorBuilder;
import com.mmx.pdf.Invoice;
import com.mmx.service.InvoiceService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(origins = "*")
public class InvoiceController {
    
    private final InvoiceService invoiceService;
    
    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }
    
    @PostMapping("/{id}/generate-pdf")
    public ResponseEntity<byte[]> generateInvoicePDF(
            @PathVariable Long id,
            @RequestBody PDFRequest request) {
        
        try {
            Invoice invoice = invoiceService.getInvoiceById(id);
            
            if (invoice == null) {
                return ResponseEntity.notFound().build();
            }
            
            // Utilisation du Builder Pattern pour configurer le générateur
            InvoicePDFService pdfService = new PDFGeneratorBuilder()
                .withLogo(request.isIncludeLogo())
                .withQRCode(request.isIncludeQRCode())
                .withFooterText("MMX Véhicules - Facture N° " + invoice.getInvoiceNumber())
                .build();
            
            byte[] pdfBytes = pdfService.generateInvoicePDF(invoice);
            String fileName = pdfService.getPDFMetadata(invoice);
            
            // Mettre à jour le statut de la facture
            invoiceService.markInvoiceAsPDFGenerated(id);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", fileName);
            headers.setContentLength(pdfBytes.length);
            
            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
            
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(("Erreur lors de la génération du PDF: " + e.getMessage()).getBytes());
        }
    }
    
    @PostMapping("/{id}/validate")
    public ResponseEntity<Invoice> validateInvoice(@PathVariable Long id) {
        Invoice validatedInvoice = invoiceService.validateInvoice(id);
        if (validatedInvoice != null) {
            return ResponseEntity.ok(validatedInvoice);
        }
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Invoice> getInvoice(@PathVariable Long id) {
        Invoice invoice = invoiceService.getInvoiceById(id);
        if (invoice != null) {
            return ResponseEntity.ok(invoice);
        }
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping
    public ResponseEntity<java.util.List<Invoice>> getAllInvoices() {
        return ResponseEntity.ok(invoiceService.getAllInvoices());
    }
    
    // Classe DTO pour la requête PDF
    static class PDFRequest {
        private boolean includeLogo;
        private boolean includeQRCode;
        
        // Getters et setters
        public boolean isIncludeLogo() { return includeLogo; }
        public void setIncludeLogo(boolean includeLogo) { this.includeLogo = includeLogo; }
        
        public boolean isIncludeQRCode() { return includeQRCode; }
        public void setIncludeQRCode(boolean includeQRCode) { this.includeQRCode = includeQRCode; }
    }
}
