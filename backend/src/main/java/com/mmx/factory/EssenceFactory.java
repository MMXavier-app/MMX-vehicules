package com.mmx.factory;

import com.mmx.model.AutomobileEssence;
import com.mmx.model.ScooterEssence;
import com.mmx.model.Vehicule;

public class EssenceFactory implements VehiculeFactory {
    
    @Override
    public Vehicule creerAutomobile(String marque, String modele, double prix) {
        AutomobileEssence auto = new AutomobileEssence();
        auto.setMarque(marque);
        auto.setModele(modele);
        auto.setPrix(prix);
        auto.setNombrePortes(5);
        auto.setConsommation(6.5);
        return auto;
    }
    
    @Override
    public Vehicule creerScooter(String marque, String modele, double prix) {
        ScooterEssence scooter = new ScooterEssence();
        scooter.setMarque(marque);
        scooter.setModele(modele);
        scooter.setPrix(prix);
        scooter.setCylindree(125);
        scooter.setConsommation(2.5);
        return scooter;
    }
}
