package com.vehicules.controller;

import com.vehicules.documents.*;
import com.vehicules.adapter.*;
import com.vehicules.singleton.DocumentViergeSingleton;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "*")
public class DocumentController {
    
    @GetMapping("/liasse")
    public Map<String, Object> genererLiasseBuilder() {
        // Utilisation du Builder Pattern
        LiasseBuilder builder = new LiasseBuilderConcret();
        DirecteurLiasse directeur = new DirecteurLiasse();
        
        LiasseDocuments liasse = directeur.construireLiasseComplete(
            builder,
            "Toyota Corolla - Rouge - 2024",
            "Jean Dupont - 123 Rue Example, Paris",
            "AutoVente Pro",
            "Jean Dupont",
            "Commande #12345",
            25000.0
        );
        
        Map<String, Object> response = new HashMap<>();
        response.put("pattern", "Builder");
        response.put("liasse", "Liasse complète pour Toyota Corolla");
        response.put("documents", Arrays.asList(
            "Demande d'immatriculation",
            "Certificat de cession", 
            "Bon de commande"
        ));
        response.put("message", "Liasse générée avec Builder Pattern");
        return response;
    }
    
    @GetMapping("/vierge")
    public Map<String, Object> getLiasseVierge() {
        // Utilisation du Singleton Pattern
        DocumentViergeSingleton singleton1 = DocumentViergeSingleton.getInstance();
        DocumentViergeSingleton singleton2 = DocumentViergeSingleton.getInstance();
        
        Map<String, Object> response = new HashMap<>();
        response.put("pattern", "Singleton");
        response.put("document", singleton1.genererDocumentVierge());
        response.put("instance1Hash", singleton1.hashCode());
        response.put("instance2Hash", singleton2.hashCode());
        response.put("sameInstance", singleton1 == singleton2);
        response.put("message", "Document vierge généré (Singleton Pattern)");
        return response;
    }
    
    @PostMapping("/adapter/{format}")
    public Map<String, Object> adapterDocument(@PathVariable String format, 
                                              @RequestBody Map<String, Object> contenu) {
        String texteContenu = (String) contenu.getOrDefault("contenu", "Contenu par défaut");
        DocumentAdapter adapter;
        
        if ("pdf".equalsIgnoreCase(format)) {
            adapter = new PdfAdapter(texteContenu);
        } else if ("html".equalsIgnoreCase(format)) {
            adapter = new HtmlAdapter(texteContenu);
        } else {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Format non supporté");
            error.put("format", format);
            error.put("formatsSupportes", Arrays.asList("pdf", "html"));
            return error;
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("pattern", "Adapter");
        response.put("format", format);
        response.put("contenuOriginal", texteContenu);
        response.put("contenuAdapte", adapter.getContenu());
        response.put("type", adapter.getType());
        response.put("classe", adapter.getClass().getSimpleName());
        response.put("message", "Document adapté avec Adapter Pattern");
        return response;
    }
    
    @GetMapping("/bridge")
    public Map<String, Object> testBridge() {
        Map<String, Object> response = new HashMap<>();
        response.put("pattern", "Bridge");
        response.put("message", "Bridge Pattern implémenté pour les formulaires");
        response.put("renderers", Arrays.asList("HTML", "Widget"));
        response.put("formulaires", Arrays.asList("Formulaire Client", "Formulaire Commande"));
        return response;
    }
}
