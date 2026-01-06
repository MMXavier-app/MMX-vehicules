package com.vehicules.model;

public class ScooterEssence extends Scooter {
    
    public ScooterEssence(String marque, String modele, double prix) {
        super(marque, modele, prix);
        this.typeCarburant = "Essence";
    }
    
    public ScooterEssence() {
        super();
        this.typeCarburant = "Essence";
    }
}
