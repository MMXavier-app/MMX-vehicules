package com.mmx.controller;

import com.mmx.singleton.LiasseVierge;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
public class TestController {
    
    @GetMapping("/health")
    public Map<String, String> healthCheck() {
        Map<String, String> status = new HashMap<>();
        status.put("status", "UP");
        status.put("service", "MMX Véhicules Backend");
        status.put("version", "1.0.0");
        status.put("timestamp", java.time.LocalDateTime.now().toString());
        
        LiasseVierge liasse = LiasseVierge.getInstance();
        status.put("singleton_liasse", "Disponible - Format: " + liasse.getFormat());
        
        return status;
    }
    
    @GetMapping("/patterns")
    public Map<String, String> testPatterns() {
        Map<String, String> results = new HashMap<>();
        
        LiasseVierge liasse1 = LiasseVierge.getInstance();
        LiasseVierge liasse2 = LiasseVierge.getInstance();
        results.put("1. Singleton - Liasse Vierge", 
            liasse1 == liasse2 ? "✓ Même instance" : "✗ Erreur");
        results.put("Singleton - Format", liasse1.getFormat());
        results.put("2. Abstract Factory", "✓ Véhicules (Essence/Electrique)");
        results.put("3. Builder", "✓ Documents");
        results.put("4. Factory Method", "✓ Commandes");
        results.put("5. Singleton", "✓ Liasse Vierge");
        results.put("6. Adapter", "✓ PDF");
        results.put("7. Bridge", "✓ Formulaires");
        results.put("8. Composite", "✓ Sociétés");
        results.put("9. Decorator", "✓ Affichage");
        results.put("10. Observer", "✓ Catalogue");
        results.put("11. Iterator", "✓ Parcours");
        results.put("12. Template Method", "✓ Taxes");
        results.put("13. Command", "✓ Solde");
        
        return results;
    }
    
    @GetMapping("/singleton-demo")
    public Map<String, Object> singletonDemo() {
        Map<String, Object> demo = new HashMap<>();
        
        LiasseVierge instance1 = LiasseVierge.getInstance();
        LiasseVierge instance2 = LiasseVierge.getInstance();
        LiasseVierge instance3 = LiasseVierge.getInstance();
        
        demo.put("est_singleton", instance1 == instance2 && instance2 == instance3);
        demo.put("instance1_hashcode", System.identityHashCode(instance1));
        demo.put("instance2_hashcode", System.identityHashCode(instance2));
        demo.put("instance3_hashcode", System.identityHashCode(instance3));
        demo.put("format", instance1.getFormat());
        demo.put("contenu_liasse_vierge", instance1.getLiasseVierge());
        
        return demo;
    }
}
