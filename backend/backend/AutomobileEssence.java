package com.vehicules.model;

public class AutomobileEssence extends Automobile {
    
    // Constructeur avec paramètres
    public AutomobileEssence(String marque, String modele, double prix) {
        super(marque, modele, prix);
        this.typeCarburant = "Essence";
    }
    
    // Constructeur par défaut
    public AutomobileEssence() {
        super();
        this.typeCarburant = "Essence";
    }
}
