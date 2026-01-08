package com.mmx.controller;

import com.mmx.builder.DocumentBuilder;
import com.mmx.builder.LiasseDocument;
import com.mmx.singleton.LiasseVierge;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/patrons")
public class PatronsController {
    
    @GetMapping("/test-all")
    public Map<String, Object> testAllPatrons() {
        Map<String, Object> results = new HashMap<>();
        
        // 1. Singleton
        LiasseVierge liasseVierge1 = LiasseVierge.getInstance();
        LiasseVierge liasseVierge2 = LiasseVierge.getInstance();
        results.put("singleton_meme_instance", liasseVierge1 == liasseVierge2);
        results.put("singleton_format", liasseVierge1.getFormat());
        results.put("singleton_contenu", liasseVierge1.getLiasseVierge());
        
        // 2. Builder
        try {
            LiasseDocument liasse = new DocumentBuilder()
                .setDemandeImmatriculation("Demande d'immatriculation pour véhicule neuf")
                .setCertificatCession("Certificat de cession établi le " + java.time.LocalDate.now())
                .setBonCommande("Bon de commande N°CMD-2024-001")
                .setFormat("PDF")
                .build();
            results.put("builder_success", true);
            results.put("builder_format", liasse.getFormat());
            results.put("builder_contenu", liasse.toString());
        } catch (Exception e) {
            results.put("builder_error", e.getMessage());
        }
        
        return results;
    }
    
    @GetMapping("/singleton/liasse-vierge")
    public Map<String, Object> getLiasseVierge() {
        Map<String, Object> response = new HashMap<>();
        
        LiasseVierge liasseVierge = LiasseVierge.getInstance();
        
        response.put("singleton", true);
        response.put("format", liasseVierge.getFormat());
        response.put("contenu", liasseVierge.getLiasseVierge());
        response.put("description", "Liasse vierge de documents au format " + liasseVierge.getFormat());
        response.put("timestamp", java.time.LocalDateTime.now().toString());
        
        return response;
    }
    
    @GetMapping("/builder/creer-liasse")
    public Map<String, Object> creerLiasse(
            @RequestParam(required = false, defaultValue = "Demande d'immatriculation standard") String immatriculation,
            @RequestParam(required = false, defaultValue = "Certificat de cession standard") String cession,
            @RequestParam(required = false, defaultValue = "Bon de commande standard") String bonCommande,
            @RequestParam(required = false, defaultValue = "PDF") String format) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            LiasseDocument liasse = new DocumentBuilder()
                .setDemandeImmatriculation(immatriculation)
                .setCertificatCession(cession)
                .setBonCommande(bonCommande)
                .setFormat(format)
                .build();
            
            response.put("success", true);
            response.put("patron", "Builder");
            response.put("format", liasse.getFormat());
            response.put("demande_immatriculation", liasse.getDemandeImmatriculation());
            response.put("certificat_cession", liasse.getCertificatCession());
            response.put("bon_commande", liasse.getBonCommande());
            response.put("message", "Liasse créée avec succès");
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
        }
        
        return response;
    }
}
