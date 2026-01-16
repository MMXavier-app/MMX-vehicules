package com.vehicules.model;

public class ScooterElectrique extends Scooter {
    
    public ScooterElectrique(String marque, String modele, double prix) {
        super(marque, modele, prix);
        this.typeCarburant = "Électrique";
    }
    
    public ScooterElectrique() {
        super();
        this.typeCarburant = "Électrique";
    }
}
