package com.vehicules.model;

public abstract class Vehicule {
    private String marque;
    private String modele;
    private Double prix;
    private String typeEnergie;
    
    // Constructeurs
    public Vehicule() {}
    
    public Vehicule(String marque, String modele, Double prix) {
        this.marque = marque;
        this.modele = modele;
        this.prix = prix;
    }
    
    public Vehicule(String marque, String modele, Double prix, String typeEnergie) {
        this(marque, modele, prix);
        this.typeEnergie = typeEnergie;
    }
    
    // Getters et Setters
    public String getMarque() {
        return marque;
    }
    
    public void setMarque(String marque) {
        this.marque = marque;
    }
    
    public String getModele() {
        return modele;
    }
    
    public void setModele(String modele) {
        this.modele = modele;
    }
    
    public Double getPrix() {
        return prix;
    }
    
    public void setPrix(Double prix) {
        this.prix = prix;
    }
    
    public String getTypeEnergie() {
        return typeEnergie;
    }
    
    public void setTypeEnergie(String typeEnergie) {
        this.typeEnergie = typeEnergie;
    }
    
    // Méthode abstraite
    public abstract Double calculerTaxe();
    
    @Override
    public String toString() {
        return marque + " " + modele + " (" + typeEnergie + ") - " + prix + "€";
    }
}
