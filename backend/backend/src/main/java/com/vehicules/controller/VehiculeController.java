package com.vehicules.controller;

import com.vehicules.patterns.factory.*;
import com.vehicules.model.*;
import com.vehicules.iterator.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/vehicules")
@CrossOrigin(origins = "*")
public class VehiculeController {
    
    private CollectionVehicules collectionVehicules = new CollectionVehicules();
    
    public VehiculeController() {
        // Initialiser avec quelques véhicules via Abstract Factory
        AbstractVehiculeFactory essenceFactory = new EssenceFactory();
        AbstractVehiculeFactory electriqueFactory = new ElectriqueFactory();
        
        // Créer des véhicules (convertir int en Double)
        collectionVehicules.ajouterVehicule(essenceFactory.createAutomobile("Toyota", "Corolla", 25000.0));
        collectionVehicules.ajouterVehicule(electriqueFactory.createAutomobile("Tesla", "Model 3", 45000.0));
        collectionVehicules.ajouterVehicule(essenceFactory.createScooter("Yamaha", "NMAX", 3000.0));
        collectionVehicules.ajouterVehicule(electriqueFactory.createScooter("Niu", "NQi", 2500.0));
        collectionVehicules.ajouterVehicule(essenceFactory.createAutomobile("Ford", "Focus", 28000.0));
        collectionVehicules.ajouterVehicule(electriqueFactory.createAutomobile("Renault", "Zoe", 32000.0));
    }
    
    @GetMapping
    public List<Map<String, Object>> getAllVehicules() {
        List<Map<String, Object>> result = new ArrayList<>();
        List<Vehicule> vehicules = collectionVehicules.getVehicules();
        
        for (Vehicule v : vehicules) {
            result.add(convertVehiculeToMap(v));
        }
        
        return result;
    }
    
    @GetMapping("/filtre/{type}")
    public List<Map<String, Object>> getVehiculesFiltre(@PathVariable String type) {
        List<Map<String, Object>> result = new ArrayList<>();
        List<Vehicule> vehicules = collectionVehicules.getVehicules();
        
        for (Vehicule v : vehicules) {
            if ("all".equalsIgnoreCase(type) || 
                type.equalsIgnoreCase(v.getTypeEnergie()) ||
                type.equalsIgnoreCase(v.getClass().getSimpleName().replace("Essence", "").replace("Electrique", ""))) {
                result.add(convertVehiculeToMap(v));
            }
        }
        
        return result;
    }
    
    @PostMapping("/factory")
    public Map<String, Object> createWithFactory(@RequestBody Map<String, Object> request) {
        String type = (String) request.get("type");
        String energie = (String) request.get("energie");
        String marque = (String) request.get("marque");
        String modele = (String) request.get("modele");
        double prix = ((Number) request.get("prix")).doubleValue();
        
        AbstractVehiculeFactory factory;
        if ("electrique".equalsIgnoreCase(energie)) {
            factory = new ElectriqueFactory();
        } else {
            factory = new EssenceFactory();
        }
        
        Vehicule vehicule;
        if ("automobile".equalsIgnoreCase(type)) {
            vehicule = factory.createAutomobile(marque, modele, prix);
        } else {
            vehicule = factory.createScooter(marque, modele, prix);
        }
        
        collectionVehicules.ajouterVehicule(vehicule);
        
        Map<String, Object> response = convertVehiculeToMap(vehicule);
        response.put("message", "Véhicule créé avec Abstract Factory");
        return response;
    }
    
    @GetMapping("/iterator")
    public Map<String, Object> demoIterator() {
        Map<String, Object> response = new HashMap<>();
        response.put("pattern", "Iterator");
        
        List<String> vehiculesParcourus = new ArrayList<>();
        CatalogueIterator iterator = collectionVehicules.creerIterateur();
        
        while (iterator.hasNext()) {
            Vehicule v = iterator.next();
            vehiculesParcourus.add(v.getMarque() + " " + v.getModele() + " (" + v.getTypeEnergie() + ")");
        }
        
        response.put("vehiculesParcourus", vehiculesParcourus);
        response.put("total", vehiculesParcourus.size());
        response.put("message", "Parcours avec Iterator Pattern");
        return response;
    }
    
    private Map<String, Object> convertVehiculeToMap(Vehicule v) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", v.hashCode());
        map.put("type", v.getClass().getSimpleName());
        map.put("marque", v.getMarque());
        map.put("modele", v.getModele());
        map.put("prix", v.getPrix());
        map.put("energie", v.getTypeEnergie());
        map.put("description", v.getMarque() + " " + v.getModele() + " - " + v.getTypeEnergie());
        return map;
    }
}
