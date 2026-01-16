package com.vehicules.documents;

public class BonCommande implements Document {
    private String contenu;
    
    public BonCommande(String contenu) {
        this.contenu = contenu;
    }
    
    @Override
    public String getContenu() {
        return "BON DE COMMANDE\n" + contenu;
    }
    
    @Override
    public void afficher() {
        System.out.println(getContenu());
    }
}
