package com.vehicules.documents;

import java.util.ArrayList;
import java.util.List;

public class LiasseDocuments {
    private List<Document> documents = new ArrayList<>();
    
    public void ajouterDocument(Document document) {
        documents.add(document);
    }
    
    public void afficherLiasse() {
        System.out.println("=== LIASSE DE DOCUMENTS ===");
        for (Document doc : documents) {
            doc.afficher();
            System.out.println("---");
        }
    }
    
    public List<Document> getDocuments() {
        return documents;
    }
}
