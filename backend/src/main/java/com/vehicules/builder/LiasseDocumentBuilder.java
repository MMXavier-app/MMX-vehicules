package com.vehicules.builder;

import java.util.ArrayList;
import java.util.List;

/**
 * PATTERN 2: Builder
 * Responsabilité: Construire les liasses de documents nécessaires
 */
public class LiasseDocumentBuilder {
    
    private List<String> documents = new ArrayList<>();
    private String format = "PDF";
    
    public LiasseDocumentBuilder ajouterDemandeImmatriculation() {
        documents.add("Demande d'immatriculation");
        return this;
    }
    
    public LiasseDocumentBuilder ajouterCertificatCession() {
        documents.add("Certificat de cession");
        return this;
    }
    
    public LiasseDocumentBuilder ajouterBonCommande() {
        documents.add("Bon de commande");
        return this;
    }
    
    public LiasseDocumentBuilder enFormatPDF() {
        this.format = "PDF";
        return this;
    }
    
    public LiasseDocumentBuilder enFormatHTML() {
        this.format = "HTML";
        return this;
    }
    
    public LiasseDocument build() {
        return new LiasseDocument(documents, format);
    }
    
    // Classe représentant la liasse
    public static class LiasseDocument {
        private final List<String> documents;
        private final String format;
        
        public LiasseDocument(List<String> documents, String format) {
            this.documents = documents;
            this.format = format;
        }
        
        public String genererLiasse() {
            StringBuilder sb = new StringBuilder();
            sb.append("=== LIASSE DOCUMENTS (").append(format).append(") ===\n");
            for (int i = 0; i < documents.size(); i++) {
                sb.append(i+1).append(". ").append(documents.get(i)).append("\n");
            }
            sb.append("Total: ").append(documents.size()).append(" documents");
            return sb.toString();
        }
        
        public List<String> getDocuments() { return documents; }
        public String getFormat() { return format; }
    }
}
