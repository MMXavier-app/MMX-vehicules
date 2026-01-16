package com.vehicules.documents;

public class DemandeImmatriculation implements Document {
    private String contenu;
    
    // Constructeur avec paramètre
    public DemandeImmatriculation(String contenu) {
        this.contenu = contenu;
    }
    
    // Constructeur vide + setter
    public DemandeImmatriculation() {}
    
    public void setContenu(String contenu) {
        this.contenu = contenu;
    }
    
    @Override
    public String getContenu() {
        return "DEMANDE D'IMMATRICULATION\n" + contenu;
    }
    
    @Override
    public void afficher() {
        System.out.println(getContenu());
    }
}