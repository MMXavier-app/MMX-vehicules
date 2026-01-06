package com.vehicules.model;

public class AutomobileElectrique extends Automobile {
    
    public AutomobileElectrique(String marque, String modele, double prix) {
        super(marque, modele, prix);
        this.typeCarburant = "Électrique";
    }
    
    public AutomobileElectrique() {
        super();
        this.typeCarburant = "Électrique";
    }
}
