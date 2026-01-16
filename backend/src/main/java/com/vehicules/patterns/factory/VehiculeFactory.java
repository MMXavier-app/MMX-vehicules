package com.vehicules.patterns.factory;

import com.vehicules.model.Vehicule;

/**
 * ABSTRACT FACTORY PATTERN
 * Interface pour créer des familles d'objets liés (véhicules essence/électrique)
 */
public interface VehiculeFactory {
    Vehicule creerAutomobile(String marque, String modele, double prix);
    Vehicule creerScooter(String marque, String modele, double prix);
}
