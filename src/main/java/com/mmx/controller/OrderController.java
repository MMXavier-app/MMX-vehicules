package com.mmx.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private List<Map<String, Object>> orders = new ArrayList<>();
    private int orderIdCounter = 1;

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllOrders() {
        return ResponseEntity.ok(orders);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createOrder(@RequestBody Map<String, Object> orderData) {
        Map<String, Object> order = new HashMap<>(orderData);
        
        // Générer un ID et numéro de commande
        int orderId = orderIdCounter++;
        order.put("id", orderId);
        order.put("orderNumber", "CMD-" + String.format("%06d", orderId));
        order.put("status", "en cours");
        order.put("createdAt", new Date());
        
        // Calculer le montant total avec taxes
        double subtotal = calculateSubtotal(order);
        String country = (String) order.getOrDefault("country", "France");
        double taxRate = getTaxRate(country);
        double taxAmount = subtotal * taxRate;
        double totalAmount = subtotal + taxAmount;
        
        order.put("subtotal", subtotal);
        order.put("taxRate", taxRate);
        order.put("taxAmount", taxAmount);
        order.put("totalAmount", totalAmount);
        order.put("currency", "EUR");
        
        orders.add(order);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Commande créée avec succès");
        response.put("order", order);
        response.put("estimatedDelivery", new Date(System.currentTimeMillis() + 7 * 24 * 60 * 60 * 1000)); // +7 jours
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getOrder(@PathVariable int id) {
        Optional<Map<String, Object>> order = orders.stream()
            .filter(o -> (int) o.get("id") == id)
            .findFirst();
            
        return order.map(ResponseEntity::ok)
            .orElse(ResponseEntity.status(404).body(Map.of("error", "Commande non trouvée")));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Map<String, Object>> updateOrderStatus(
            @PathVariable int id,
            @RequestBody Map<String, Object> statusUpdate) {
        
        String newStatus = (String) statusUpdate.get("status");
        String[] allowedStatuses = {"en cours", "validée", "livrée", "annulée"};
        
        if (!Arrays.asList(allowedStatuses).contains(newStatus)) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Statut invalide",
                "allowedStatuses", allowedStatuses
            ));
        }
        
        for (Map<String, Object> order : orders) {
            if ((int) order.get("id") == id) {
                order.put("status", newStatus);
                order.put("statusUpdatedAt", new Date());
                
                // Si la commande est livrée, ajouter une date de livraison
                if ("livrée".equals(newStatus)) {
                    order.put("deliveredAt", new Date());
                }
                
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("message", "Statut mis à jour");
                response.put("order", order);
                
                return ResponseEntity.ok(response);
            }
        }
        
        return ResponseEntity.status(404).body(Map.of("error", "Commande non trouvée"));
    }

    @PostMapping("/{id}/documents")
    public ResponseEntity<Map<String, Object>> generateDocuments(
            @PathVariable int id,
            @RequestParam(defaultValue = "PDF") String format) {
        
        Optional<Map<String, Object>> orderOpt = orders.stream()
            .filter(o -> (int) o.get("id") == id)
            .findFirst();
            
        if (!orderOpt.isPresent()) {
            return ResponseEntity.status(404).body(Map.of("error", "Commande non trouvée"));
        }
        
        Map<String, Object> order = orderOpt.get();
        List<Map<String, Object>> documents = Arrays.asList(
            createDocument("Demande d'immatriculation", format, order),
            createDocument("Certificat de cession", format, order),
            createDocument("Bon de commande", format, order)
        );
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Documents générés en format " + format);
        response.put("documents", documents);
        response.put("generatedAt", new Date());
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/calculate")
    public ResponseEntity<Map<String, Object>> calculateOrder(@RequestBody Map<String, Object> calculationRequest) {
        double subtotal = calculateSubtotal(calculationRequest);
        String country = (String) calculationRequest.getOrDefault("country", "France");
        double taxRate = getTaxRate(country);
        double taxAmount = subtotal * taxRate;
        double totalAmount = subtotal + taxAmount;
        
        Map<String, Object> calculation = new HashMap<>();
        calculation.put("subtotal", subtotal);
        calculation.put("taxRate", taxRate);
        calculation.put("taxAmount", taxAmount);
        calculation.put("totalAmount", totalAmount);
        calculation.put("currency", "EUR");
        calculation.put("country", country);
        calculation.put("calculationDate", new Date());
        
        return ResponseEntity.ok(calculation);
    }

    private double calculateSubtotal(Map<String, Object> order) {
        // Simulation du calcul du sous-total
        double basePrice = Double.parseDouble(order.getOrDefault("basePrice", "30000").toString());
        int optionsCount = ((List<?>) order.getOrDefault("options", Collections.emptyList())).size();
        double optionsPrice = optionsCount * 500; // 500€ par option
        
        return basePrice + optionsPrice;
    }

    private double getTaxRate(String country) {
        switch (country.toLowerCase()) {
            case "france": return 0.20; // TVA 20%
            case "allemagne": return 0.19; // TVA 19%
            case "belgique": return 0.21; // TVA 21%
            case "espagne": return 0.21; // TVA 21%
            case "italie": return 0.22; // TVA 22%
            default: return 0.20; // Par défaut 20%
        }
    }

    private Map<String, Object> createDocument(String type, String format, Map<String, Object> order) {
        Map<String, Object> doc = new HashMap<>();
        doc.put("type", type);
        doc.put("format", format);
        doc.put("reference", "DOC-" + type.substring(0, 3).toUpperCase() + "-" + 
                 order.get("orderNumber") + "-" + System.currentTimeMillis());
        doc.put("content", type + " pour la commande " + order.get("orderNumber"));
        doc.put("generatedAt", new Date());
        doc.put("size", format.equals("PDF") ? "2.5 MB" : "1.8 MB");
        
        return doc;
    }
}
