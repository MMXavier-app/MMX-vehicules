package com.mmx.service;

import com.mmx.pdf.Invoice;
import com.mmx.pdf.InvoiceItem;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class InvoiceService {
    
    private Map<Long, Invoice> invoices = new HashMap<>();
    private Long nextId = 1L;
    
    public InvoiceService() {
        // Données de démo
        initializeDemoData();
    }
    
    private void initializeDemoData() {
        Invoice invoice = new Invoice();
        invoice.setId(nextId++);
        invoice.setInvoiceNumber("FAC-2026-001");
        invoice.setInvoiceDate(LocalDate.now());
        invoice.setClientName("Groupe Automobile France");
        invoice.setClientAddress("123 Avenue des Champs-Élysées, 75008 Paris");
        invoice.setSubTotal(45000.00);
        invoice.setTaxRate(20.0);
        invoice.setTaxAmount(9000.00);
        invoice.setTotalAmount(54000.00);
        invoice.setStatus("validated");
        
        List<InvoiceItem> items = new ArrayList<>();
        
        InvoiceItem item1 = new InvoiceItem();
        item1.setId(1L);
        item1.setDescription("Automobile électrique - Tesla Model 3");
        item1.setQuantity(1);
        item1.setUnitPrice(42000.00);
        item1.setTotalPrice(42000.00);
        items.add(item1);
        
        InvoiceItem item2 = new InvoiceItem();
        item2.setId(2L);
        item2.setDescription("Options - Sièges cuir");
        item2.setQuantity(1);
        item2.setUnitPrice(3000.00);
        item2.setTotalPrice(3000.00);
        items.add(item2);
        
        invoice.setItems(items);
        invoices.put(invoice.getId(), invoice);
    }
    
    public Invoice getInvoiceById(Long id) {
        return invoices.get(id);
    }
    
    public Invoice validateInvoice(Long id) {
        Invoice invoice = invoices.get(id);
        if (invoice != null) {
            invoice.setStatus("validated");
        }
        return invoice;
    }
    
    public void markInvoiceAsPDFGenerated(Long id) {
        Invoice invoice = invoices.get(id);
        if (invoice != null) {
            // Mettre à jour le statut ou loguer l'action
            System.out.println("PDF généré pour la facture: " + invoice.getInvoiceNumber());
        }
    }
    
    public List<Invoice> getAllInvoices() {
        return new ArrayList<>(invoices.values());
    }
}
