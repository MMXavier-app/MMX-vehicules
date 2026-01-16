package com.mmx.builder;

public class DocumentBuilder {
    private String demandeImmatriculation = "";
    private String certificatCession = "";
    private String bonCommande = "";
    private String format = "PDF";
    
    public DocumentBuilder setDemandeImmatriculation(String contenu) {
        this.demandeImmatriculation = "DEMANDE D'IMMATRICULATION\n" + contenu;
        return this;
    }
    
    public DocumentBuilder setCertificatCession(String contenu) {
        this.certificatCession = "CERTIFICAT DE CESSION\n" + contenu;
        return this;
    }
    
    public DocumentBuilder setBonCommande(String contenu) {
        this.bonCommande = "BON DE COMMANDE\n" + contenu;
        return this;
    }
    
    public DocumentBuilder setFormat(String format) {
        if (format.equalsIgnoreCase("PDF") || format.equalsIgnoreCase("HTML")) {
            this.format = format.toUpperCase();
        }
        return this;
    }
    
    public LiasseDocument build() {
        // Vérifier que tous les documents sont présents
        if (demandeImmatriculation.isEmpty() || certificatCession.isEmpty() || bonCommande.isEmpty()) {
            throw new IllegalStateException("Tous les documents doivent être remplis");
        }
        
        return new LiasseDocument(demandeImmatriculation, certificatCession, bonCommande, format);
    }
}
