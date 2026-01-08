package com.mmx.model;

public class AutomobileEssence extends Vehicule {
    
    private int nombrePortes;
    private double consommation; // L/100km
    
    public AutomobileEssence() {}
    
    public AutomobileEssence(String marque, String modele, double prix, int nombrePortes, double consommation) {
        this.setMarque(marque);
        this.setModele(modele);
        this.setPrix(prix);
        this.nombrePortes = nombrePortes;
        this.consommation = consommation;
    }
    
    @Override
    public String getType() {
        return "Automobile Essence";
    }
    
    @Override
    public String getDetailsTechniques() {
        return String.format("%d portes, %.1f L/100km", nombrePortes, consommation);
    }
    
    // Getters and setters
    public int getNombrePortes() {
        return nombrePortes;
    }
    
    public void setNombrePortes(int nombrePortes) {
        this.nombrePortes = nombrePortes;
    }
    
    public double getConsommation() {
        return consommation;
    }
    
    public void setConsommation(double consommation) {
        this.consommation = consommation;
    }
}
