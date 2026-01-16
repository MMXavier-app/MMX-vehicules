package com.mmx.model;

public class ScooterEssence extends Vehicule {
    
    private int cylindree; // cm³
    private double consommation; // L/100km
    
    public ScooterEssence() {}
    
    public ScooterEssence(String marque, String modele, double prix, int cylindree, double consommation) {
        this.setMarque(marque);
        this.setModele(modele);
        this.setPrix(prix);
        this.cylindree = cylindree;
        this.consommation = consommation;
    }
    
    @Override
    public String getType() {
        return "Scooter Essence";
    }
    
    @Override
    public String getDetailsTechniques() {
        return String.format("%d cm³, %.1f L/100km", cylindree, consommation);
    }
    
    // Getters and setters
    public int getCylindree() {
        return cylindree;
    }
    
    public void setCylindree(int cylindree) {
        this.cylindree = cylindree;
    }
    
    public double getConsommation() {
        return consommation;
    }
    
    public void setConsommation(double consommation) {
        this.consommation = consommation;
    }
}
