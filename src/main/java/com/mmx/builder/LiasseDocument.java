package com.mmx.builder;

public class LiasseDocument {
    private String demandeImmatriculation;
    private String certificatCession;
    private String bonCommande;
    private String format;
    
    public LiasseDocument(String demandeImmatriculation, String certificatCession, 
                         String bonCommande, String format) {
        this.demandeImmatriculation = demandeImmatriculation;
        this.certificatCession = certificatCession;
        this.bonCommande = bonCommande;
        this.format = format;
    }
    
    // Getters
    public String getDemandeImmatriculation() { return demandeImmatriculation; }
    public String getCertificatCession() { return certificatCession; }
    public String getBonCommande() { return bonCommande; }
    public String getFormat() { return format; }
    
    @Override
    public String toString() {
        return "LiasseDocument [format=" + format + 
               ", immatriculation=" + demandeImmatriculation.substring(0, Math.min(50, demandeImmatriculation.length())) + "...]";
    }
}
