package com.vehicules.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/patterns/demo")
@CrossOrigin(origins = "http://localhost:5173")
public class PatternsDemoController {
    
    @GetMapping("/abstract-factory/{type}")
    public Map<String, Object> testAbstractFactory(@PathVariable String type) {
        Map<String, Object> response = new HashMap<>();
        response.put("pattern", "Abstract Factory");
        response.put("type", type);
        response.put("message", "Pattern Abstract Factory opérationnel");
        response.put("vehicules", List.of("Automobile créée", "Scooter créée"));
        return response;
    }
    
    @GetMapping("/builder")
    public Map<String, Object> testBuilder() {
        Map<String, Object> response = new HashMap<>();
        response.put("pattern", "Builder");
        response.put("message", "Pattern Builder opérationnel");
        response.put("documents", List.of("Document 1", "Document 2", "Document 3"));
        return response;
    }
    
    @GetMapping("/adapter/{format}")
    public Map<String, Object> testAdapter(@PathVariable String format) {
        Map<String, Object> response = new HashMap<>();
        response.put("pattern", "Adapter");
        response.put("format", format);
        response.put("message", "Pattern Adapter pour " + format + " opérationnel");
        return response;
    }
    
    @GetMapping("/all")
    public Map<String, Object> getAllPatterns() {
        Map<String, Object> response = new HashMap<>();
        response.put("patterns", List.of(
            Map.of("name", "Abstract Factory", "status", "implémenté", "id", 1),
            Map.of("name", "Builder", "status", "implémenté", "id", 2),
            Map.of("name", "Factory Method", "status", "implémenté", "id", 3),
            Map.of("name", "Singleton", "status", "implémenté", "id", 4),
            Map.of("name", "Adapter", "status", "implémenté", "id", 5),
            Map.of("name", "Bridge", "status", "à implémenter", "id", 6),
            Map.of("name", "Composite", "status", "à implémenter", "id", 7),
            Map.of("name", "Decorator", "status", "à implémenter", "id", 8),
            Map.of("name", "Observer", "status", "à implémenter", "id", 9),
            Map.of("name", "Iterator", "status", "à implémenter", "id", 10),
            Map.of("name", "Template Method", "status", "à implémenter", "id", 11),
            Map.of("name", "Command", "status", "à implémenter", "id", 12)
        ));
        return response;
    }
}
