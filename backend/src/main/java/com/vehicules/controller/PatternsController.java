package com.vehicules.controller;

import com.vehicules.singleton.DocumentViergeSingleton;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/patterns")
@CrossOrigin(origins = "http://localhost:5173")
public class PatternsController {
    
    @GetMapping("/singleton")
    public Map<String, String> testSingleton() {
        Map<String, String> response = new HashMap<>();
        
        DocumentViergeSingleton doc1 = DocumentViergeSingleton.getInstance();
        DocumentViergeSingleton doc2 = DocumentViergeSingleton.getInstance();
        
        response.put("pattern", "Singleton");
        response.put("instance1", String.valueOf(doc1.hashCode()));
        response.put("instance2", String.valueOf(doc2.hashCode()));
        response.put("same", String.valueOf(doc1 == doc2));
        response.put("message", doc1.genererDocumentVierge());
        
        return response;
    }
    
    @GetMapping("/factory/{type}")
    public Map<String, String> testFactoryMethod(@PathVariable String type) {
        Map<String, String> response = new HashMap<>();
        response.put("pattern", "Factory Method");
        response.put("type", type);
        response.put("message", "Commande " + type + " créée avec succès");
        return response;
    }
    
    @GetMapping("/all")
    public Map<String, String> getAllPatterns() {
        Map<String, String> patterns = new HashMap<>();
        patterns.put("1", "Abstract Factory - Véhicules");
        patterns.put("2", "Builder - Documents");
        patterns.put("3", "Factory Method - Commandes");
        patterns.put("4", "Singleton - Document vierge");
        patterns.put("5", "Adapter - PDF/HTML");
        patterns.put("6", "Bridge - Formulaires");
        patterns.put("7", "Composite - Sociétés");
        patterns.put("8", "Decorator - Catalogue");
        patterns.put("9", "Observer - Notifications");
        patterns.put("10", "Iterator - Recherche");
        patterns.put("11", "Template Method - Taxes");
        patterns.put("12", "Command - Soldes");
        return patterns;
    }
}
