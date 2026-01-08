package com.mmx.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.*;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    private Map<String, List<Map<String, Object>>> userCarts = new HashMap<>();

    @GetMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> getCart(@PathVariable String userId) {
        List<Map<String, Object>> cart = userCarts.getOrDefault(userId, new ArrayList<>());
        
        double subtotal = cart.stream()
            .mapToDouble(item -> (double) item.getOrDefault("price", 0.0))
            .sum();
        
        Map<String, Object> response = new HashMap<>();
        response.put("userId", userId);
        response.put("items", cart);
        response.put("itemCount", cart.size());
        response.put("subtotal", subtotal);
        response.put("lastUpdated", new Date());
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{userId}/add")
    public ResponseEntity<Map<String, Object>> addToCart(
            @PathVariable String userId,
            @RequestBody Map<String, Object> cartItem) {
        
        List<Map<String, Object>> cart = userCarts.getOrDefault(userId, new ArrayList<>());
        
        // Vérifier les options incompatibles
        List<String> options = (List<String>) cartItem.getOrDefault("options", new ArrayList<>());
        List<Map<String, String>> conflicts = checkOptionConflicts(options);
        
        if (!conflicts.isEmpty()) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Options incompatibles détectées");
            error.put("conflicts", conflicts);
            return ResponseEntity.badRequest().body(error);
        }
        
        // Ajouter l'item au panier
        cartItem.put("cartItemId", UUID.randomUUID().toString());
        cartItem.put("addedAt", new Date());
        cart.add(cartItem);
        
        userCarts.put(userId, cart);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Article ajouté au panier");
        response.put("cartItem", cartItem);
        response.put("cartSize", cart.size());
        
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{userId}/remove/{itemId}")
    public ResponseEntity<Map<String, Object>> removeFromCart(
            @PathVariable String userId,
            @PathVariable String itemId) {
        
        List<Map<String, Object>> cart = userCarts.getOrDefault(userId, new ArrayList<>());
        boolean removed = cart.removeIf(item -> itemId.equals(item.get("cartItemId")));
        
        if (removed) {
            userCarts.put(userId, cart);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Article retiré du panier");
            response.put("cartSize", cart.size());
            
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(404).body(Map.of(
                "success", false,
                "message", "Article non trouvé dans le panier"
            ));
        }
    }

    @PostMapping("/{userId}/clear")
    public ResponseEntity<Map<String, Object>> clearCart(@PathVariable String userId) {
        List<Map<String, Object>> oldCart = userCarts.getOrDefault(userId, new ArrayList<>());
        userCarts.remove(userId);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Panier vidé");
        response.put("itemsRemoved", oldCart.size());
        response.put("clearedAt", new Date());
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{userId}/undo")
    public ResponseEntity<Map<String, Object>> undoLastAction(@PathVariable String userId) {
        // Simulation d'annulation - dans une vraie app, on aurait un historique
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Dernière action annulée");
        response.put("timestamp", new Date());
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{userId}/validate")
    public ResponseEntity<Map<String, Object>> validateCart(@PathVariable String userId) {
        List<Map<String, Object>> cart = userCarts.getOrDefault(userId, new ArrayList<>());
        
        if (cart.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Le panier est vide"
            ));
        }
        
        // Calculer le total
        double subtotal = cart.stream()
            .mapToDouble(item -> (double) item.getOrDefault("price", 0.0))
            .sum();
        
        Map<String, Object> validation = new HashMap<>();
        validation.put("success", true);
        validation.put("message", "Panier validé avec succès");
        validation.put("cartSize", cart.size());
        validation.put("subtotal", subtotal);
        validation.put("estimatedTax", subtotal * 0.20);
        validation.put("total", subtotal * 1.20);
        validation.put("validationDate", new Date());
        
        return ResponseEntity.ok(validation);
    }

    private List<Map<String, String>> checkOptionConflicts(List<String> options) {
        List<Map<String, String>> conflicts = new ArrayList<>();
        
        // Définir les paires d'options incompatibles
        Map<String, String> incompatiblePairs = Map.of(
            "sièges sportifs", "sièges en cuir",
            "toit panoramique", "barres de toit",
            "suspension sport", "confort+"
        );
        
        for (String option : options) {
            String incompatibleWith = incompatiblePairs.get(option);
            if (incompatibleWith != null && options.contains(incompatibleWith)) {
                Map<String, String> conflict = new HashMap<>();
                conflict.put("option1", option);
                conflict.put("option2", incompatibleWith);
                conflict.put("message", option + " est incompatible avec " + incompatibleWith);
                conflicts.add(conflict);
            }
        }
        
        return conflicts;
    }
}
