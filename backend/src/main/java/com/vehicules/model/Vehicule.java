package com.vehicules.model;

public class Vehicule {
    private String type; // AUTOMOBILE ou SCOOTER
    private String energie; // ESSENCE ou ELECTRIQUE
    private String marque;
    private String modele;
    private double prix;
    
    public Vehicule() {}
    
    public Vehicule(String type, String energie, String marque, String modele, double prix) {
        this.type = type;
        this.energie = energie;
        this.marque = marque;
        this.modele = modele;
        this.prix = prix;
    }
    
    // Getters et setters
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public String getEnergie() { return energie; }
    public void setEnergie(String energie) { this.energie = energie; }
    
    public String getMarque() { return marque; }
    public void setMarque(String marque) { this.marque = marque; }
    
    public String getModele() { return modele; }
    public void setModele(String modele) { this.modele = modele; }
    
    public double getPrix() { return prix; }
    public void setPrix(double prix) { this.prix = prix; }
    
    @Override
    public String toString() {
        return marque + " " + modele + " (" + type + " - " + energie + ") - " + prix + "€";
    }
}
