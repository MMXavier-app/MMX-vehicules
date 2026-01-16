package com.vehicules;

import com.vehicules.model.Vehicule;
import com.vehicules.patterns.factory.VehiculeFactory;
import com.vehicules.patterns.factory.EssenceFactory;
import com.vehicules.patterns.factory.ElectriqueFactory;

public class AbstractFactoryDemo {
    public static void main(String[] args) {
        System.out.println("=== DÉMONSTRATION ABSTRACT FACTORY PATTERN ===\n");
        
        // Utilisation de l'Abstract Factory
        VehiculeFactory essenceFactory = new EssenceFactory();
        VehiculeFactory electriqueFactory = new ElectriqueFactory();
        
        // Création de véhicules essence
        System.out.println("Véhicules Essence:");
        Vehicule autoEssence = essenceFactory.creerAutomobile("Toyota", "Corolla", 25000);
        Vehicule scooterEssence = essenceFactory.creerScooter("Yamaha", "NMAX", 3000);
        System.out.println("  - " + autoEssence);
        System.out.println("  - " + scooterEssence);
        
        // Création de véhicules électriques
        System.out.println("\nVéhicules Électriques:");
        Vehicule autoElectrique = electriqueFactory.creerAutomobile("Tesla", "Model 3", 45000);
        Vehicule scooterElectrique = electriqueFactory.creerScooter("Niu", "NQi", 2500);
        System.out.println("  - " + autoElectrique);
        System.out.println("  - " + scooterElectrique);
        
        System.out.println("\n✅ Abstract Factory Pattern démontré avec succès!");
        System.out.println("Avantages: Séparation création/utilisation, extensibilité, cohérence des familles d'objets");
    }
}
