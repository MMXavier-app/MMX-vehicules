package com.vehicules.patterns.factory;

import com.vehicules.model.Vehicule;

/**
 * Factory concrète pour les véhicules essence
 */
public class EssenceFactory implements VehiculeFactory {
    @Override
    public Vehicule creerAutomobile(String marque, String modele, double prix) {
        return new Vehicule("AUTOMOBILE", "ESSENCE", marque, modele, prix);
    }
    
    @Override
    public Vehicule creerScooter(String marque, String modele, double prix) {
        return new Vehicule("SCOOTER", "ESSENCE", marque, modele, prix);
    }
}
