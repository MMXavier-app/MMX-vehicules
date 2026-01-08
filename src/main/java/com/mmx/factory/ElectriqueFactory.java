package com.mmx.factory;

import com.mmx.model.AutomobileElectrique;
import com.mmx.model.ScooterElectrique;
import com.mmx.model.Vehicule;

public class ElectriqueFactory implements VehiculeFactory {
    
    @Override
    public Vehicule creerAutomobile(String marque, String modele, double prix) {
        AutomobileElectrique auto = new AutomobileElectrique();
        auto.setMarque(marque);
        auto.setModele(modele);
        auto.setPrix(prix);
        auto.setAutonomie(400);
        auto.setTempsRecharge(8);
        return auto;
    }
    
    @Override
    public Vehicule creerScooter(String marque, String modele, double prix) {
        ScooterElectrique scooter = new ScooterElectrique();
        scooter.setMarque(marque);
        scooter.setModele(modele);
        scooter.setPrix(prix);
        scooter.setAutonomie(100);
        scooter.setPuissance(5);
        return scooter;
    }
}
