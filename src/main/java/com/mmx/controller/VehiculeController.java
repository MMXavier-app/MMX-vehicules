package com.mmx.controller;

import com.mmx.model.Vehicule;
import com.mmx.service.VehiculeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/vehicules")
@CrossOrigin(origins = "*")
public class VehiculeController {
    
    @Autowired
    private VehiculeService vehiculeService;
    
    @GetMapping
    public ResponseEntity<List<Vehicule>> getAllVehicules() {
        List<Vehicule> vehicules = vehiculeService.getAllVehicules();
        return ResponseEntity.ok(vehicules);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Vehicule> getVehiculeById(@PathVariable Long id) {
        Vehicule vehicule = vehiculeService.getVehiculeById(id);
        if (vehicule != null) {
            return ResponseEntity.ok(vehicule);
        }
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("/en-stock")
    public ResponseEntity<List<Vehicule>> getVehiculesEnStock() {
        List<Vehicule> vehicules = vehiculeService.getVehiculesEnStock();
        return ResponseEntity.ok(vehicules);
    }
    
    @GetMapping("/vendus")
    public ResponseEntity<List<Vehicule>> getVehiculesVendus() {
        List<Vehicule> vehicules = vehiculeService.getVehiculesVendus();
        return ResponseEntity.ok(vehicules);
    }
    
    @PostMapping("/{id}/solder")
    public ResponseEntity<Vehicule> solderVehicule(@PathVariable Long id, @RequestParam double reduction) {
        vehiculeService.solderVehicule(id, reduction);
        Vehicule vehicule = vehiculeService.getVehiculeById(id);
        if (vehicule != null) {
            return ResponseEntity.ok(vehicule);
        }
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("/test")
    public ResponseEntity<Map<String, String>> test() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "API Véhicules fonctionne");
        response.put("status", "OK");
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/automobile/essence")
    public ResponseEntity<Vehicule> creerAutomobileEssence(@RequestBody VehiculeRequest request) {
        Vehicule vehicule = vehiculeService.creerAutomobileEssence(
            request.getMarque(), 
            request.getModele(), 
            request.getPrix()
        );
        return ResponseEntity.ok(vehicule);
    }
    
    @PostMapping("/automobile/electrique")
    public ResponseEntity<Vehicule> creerAutomobileElectrique(@RequestBody VehiculeRequest request) {
        Vehicule vehicule = vehiculeService.creerAutomobileElectrique(
            request.getMarque(), 
            request.getModele(), 
            request.getPrix()
        );
        return ResponseEntity.ok(vehicule);
    }
    
    @PostMapping("/scooter/essence")
    public ResponseEntity<Vehicule> creerScooterEssence(@RequestBody VehiculeRequest request) {
        Vehicule vehicule = vehiculeService.creerScooterEssence(
            request.getMarque(), 
            request.getModele(), 
            request.getPrix()
        );
        return ResponseEntity.ok(vehicule);
    }
    
    @PostMapping("/scooter/electrique")
    public ResponseEntity<Vehicule> creerScooterElectrique(@RequestBody VehiculeRequest request) {
        Vehicule vehicule = vehiculeService.creerScooterElectrique(
            request.getMarque(), 
            request.getModele(), 
            request.getPrix()
        );
        return ResponseEntity.ok(vehicule);
    }
    
    // Classe DTO pour les requêtes
    static class VehiculeRequest {
        private String marque;
        private String modele;
        private double prix;
        
        // Getters et setters
        public String getMarque() { return marque; }
        public void setMarque(String marque) { this.marque = marque; }
        
        public String getModele() { return modele; }
        public void setModele(String modele) { this.modele = modele; }
        
        public double getPrix() { return prix; }
        public void setPrix(double prix) { this.prix = prix; }
    }
}
