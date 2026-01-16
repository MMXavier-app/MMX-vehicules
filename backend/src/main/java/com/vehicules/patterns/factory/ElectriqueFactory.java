package com.vehicules.patterns.factory;

import com.vehicules.model.Vehicule;

/**
 * Factory concrète pour les véhicules électriques
 */
public class ElectriqueFactory implements VehiculeFactory {
    @Override
    public Vehicule creerAutomobile(String marque, String modele, double prix) {
        return new Vehicule("AUTOMOBILE", "ELECTRIQUE", marque, modele, prix);
    }
    
    @Override
    public Vehicule creerScooter(String marque, String modele, double prix) {
        return new Vehicule("SCOOTER", "ELECTRIQUE", marque, modele, prix);
    }
}
