package com.vehicules.documents;

public class CertificatCession implements Document {
    private String contenu;
    
    public CertificatCession(String contenu) {
        this.contenu = contenu;
    }
    
    @Override
    public String getContenu() {
        return "CERTIFICAT DE CESSION\n" + contenu;
    }
    
    @Override
    public void afficher() {
        System.out.println(getContenu());
    }
}
