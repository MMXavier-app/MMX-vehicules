package com.mmx.factory;

import com.mmx.model.Vehicule;

public interface VehiculeFactory {
    Vehicule creerAutomobile(String marque, String modele, double prix);
    Vehicule creerScooter(String marque, String modele, double prix);
}
