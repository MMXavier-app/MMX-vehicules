package com.mmx.service;

import com.mmx.factory.ElectriqueFactory;
import com.mmx.factory.EssenceFactory;
import com.mmx.factory.VehiculeFactory;
import com.mmx.model.Vehicule;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class VehiculeService {
    
    private Map<Long, Vehicule> vehicules = new HashMap<>();
    private Long nextId = 1L;
    
    public VehiculeService() {
        initializeDemoData();
    }
    
    private void initializeDemoData() {
        // Créer des véhicules de démo
        VehiculeFactory essenceFactory = new EssenceFactory();
        VehiculeFactory electriqueFactory = new ElectriqueFactory();
        
        // Véhicules essence
        Vehicule v1 = essenceFactory.creerAutomobile("Toyota", "Corolla", 25000.0);
        v1.setId(nextId++);
        v1.setAnneeFabrication(2023);
        v1.setCouleur("Bleu");
        v1.setKilometrage(15000);
        vehicules.put(v1.getId(), v1);
        
        Vehicule v2 = essenceFactory.creerAutomobile("Renault", "Clio", 20000.0);
        v2.setId(nextId++);
        v2.setAnneeFabrication(2022);
        v2.setCouleur("Rouge");
        v2.setKilometrage(25000);
        vehicules.put(v2.getId(), v2);
        
        Vehicule v3 = essenceFactory.creerScooter("Yamaha", "NMAX", 5000.0);
        v3.setId(nextId++);
        v3.setAnneeFabrication(2023);
        v3.setCouleur("Noir");
        v3.setKilometrage(5000);
        vehicules.put(v3.getId(), v3);
        
        // Véhicules électriques
        Vehicule v4 = electriqueFactory.creerAutomobile("Tesla", "Model 3", 45000.0);
        v4.setId(nextId++);
        v4.setAnneeFabrication(2024);
        v4.setCouleur("Blanc");
        v4.setKilometrage(10000);
        vehicules.put(v4.getId(), v4);
        
        Vehicule v5 = electriqueFactory.creerScooter("NIU", "NQi GT", 3500.0);
        v5.setId(nextId++);
        v5.setAnneeFabrication(2023);
        v5.setCouleur("Vert");
        v5.setKilometrage(2000);
        vehicules.put(v5.getId(), v5);
    }
    
    public List<Vehicule> getAllVehicules() {
        return new ArrayList<>(vehicules.values());
    }
    
    public Vehicule getVehiculeById(Long id) {
        return vehicules.get(id);
    }
    
    public void updateVehicule(Vehicule vehicule) {
        if (vehicule != null && vehicule.getId() != null) {
            vehicules.put(vehicule.getId(), vehicule);
        }
    }
    
    public void solderVehicule(Long id, double pourcentageReduction) {
        Vehicule vehicule = getVehiculeById(id);
        if (vehicule != null) {
            double nouveauPrix = vehicule.getPrix() * (1 - pourcentageReduction / 100);
            vehicule.setPrix(nouveauPrix);
            vehicule.setEnStock(false); // Marquer comme vendu
            updateVehicule(vehicule);
        }
    }
    
    public List<Vehicule> getVehiculesEnStock() {
        List<Vehicule> result = new ArrayList<>();
        for (Vehicule v : vehicules.values()) {
            if (v.isEnStock()) {
                result.add(v);
            }
        }
        return result;
    }
    
    public List<Vehicule> getVehiculesVendus() {
        List<Vehicule> result = new ArrayList<>();
        for (Vehicule v : vehicules.values()) {
            if (!v.isEnStock()) {
                result.add(v);
            }
        }
        return result;
    }
    
    // Méthodes de création (utilisent le pattern Abstract Factory)
    public Vehicule creerAutomobileEssence(String marque, String modele, double prix) {
        EssenceFactory factory = new EssenceFactory();
        Vehicule v = factory.creerAutomobile(marque, modele, prix);
        v.setId(nextId++);
        vehicules.put(v.getId(), v);
        return v;
    }
    
    public Vehicule creerAutomobileElectrique(String marque, String modele, double prix) {
        ElectriqueFactory factory = new ElectriqueFactory();
        Vehicule v = factory.creerAutomobile(marque, modele, prix);
        v.setId(nextId++);
        vehicules.put(v.getId(), v);
        return v;
    }
    
    public Vehicule creerScooterEssence(String marque, String modele, double prix) {
        EssenceFactory factory = new EssenceFactory();
        Vehicule v = factory.creerScooter(marque, modele, prix);
        v.setId(nextId++);
        vehicules.put(v.getId(), v);
        return v;
    }
    
    public Vehicule creerScooterElectrique(String marque, String modele, double prix) {
        ElectriqueFactory factory = new ElectriqueFactory();
        Vehicule v = factory.creerScooter(marque, modele, prix);
        v.setId(nextId++);
        vehicules.put(v.getId(), v);
        return v;
    }
}
