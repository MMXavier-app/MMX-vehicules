package com.vehicles.documents;

import java.util.HashMap;
import java.util.Map;

/**
 * Service pour gérer les liasses de documents
 */
public class DocumentService {
    
    public Map<String, Object> createDocumentBundle(String clientName, String vehicleType) {
        Map<String, Object> response = new HashMap<>();
        
        // Obtenir l'instance Singleton de la liasse vierge
        BlankDocumentBundle blankBundle = BlankDocumentBundle.getInstance();
        
        response.put("success", true);
        response.put("message", "Liasse de documents créée avec succès");
        response.put("bundleId", "BUNDLE-" + System.currentTimeMillis());
        response.put("clientName", clientName);
        response.put("vehicleType", vehicleType);
        response.put("baseBundleId", blankBundle.getBundleId());
        response.put("creationDate", blankBundle.getCreationDate());
        response.put("documentCount", blankBundle.getDocumentCount());
        response.put("documents", blankBundle.getBlankDocuments());
        
        return response;
    }
    
    public Map<String, Object> getBlankDocumentTemplate(int docIndex) {
        Map<String, Object> response = new HashMap<>();
        
        BlankDocumentBundle blankBundle = BlankDocumentBundle.getInstance();
        
        if (docIndex >= 0 && docIndex < blankBundle.getDocumentCount()) {
            response.put("success", true);
            response.put("documentIndex", docIndex);
            response.put("documentName", blankBundle.getBlankDocuments().get(docIndex));
            response.put("template", blankBundle.getDocumentTemplate(docIndex));
        } else {
            response.put("success", false);
            response.put("error", "Index de document invalide");
        }
        
        return response;
    }
    
    public void demonstrateSingletonPattern() {
        System.out.println("\n🎯 DÉMONSTRATION PATTERN SINGLETON");
        System.out.println("=" .repeat(40));
        
        // Test 1 : Obtenir l'instance plusieurs fois
        System.out.println("Test 1 : Obtention multiple de l'instance");
        BlankDocumentBundle bundle1 = BlankDocumentBundle.getInstance();
        BlankDocumentBundle bundle2 = BlankDocumentBundle.getInstance();
        BlankDocumentBundle bundle3 = BlankDocumentBundle.getInstance();
        
        System.out.println("Instance 1 hash: " + bundle1.hashCode());
        System.out.println("Instance 2 hash: " + bundle2.hashCode());
        System.out.println("Instance 3 hash: " + bundle3.hashCode());
        System.out.println("Toutes identiques ? " + 
            (bundle1 == bundle2 && bundle2 == bundle3));
        
        // Test 2 : Afficher la liasse vierge
        System.out.println("\nTest 2 : Contenu de la liasse vierge");
        bundle1.displayBlankBundle();
        
        // Test 3 : Obtenir un template
        System.out.println("\nTest 3 : Template du premier document");
        System.out.println(bundle1.getDocumentTemplate(0));
    }
}
