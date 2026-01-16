package com.mmx.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.*;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "http://localhost:5173")
public class VehicleController {

    // Catalogue de véhicules
    @GetMapping("/catalogue")
    public ResponseEntity<List<Map<String, Object>>> getCatalogue(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String fuel,
            @RequestParam(defaultValue = "1") int itemsPerRow) {
        
        List<Map<String, Object>> vehicles = Arrays.asList(
            createVehicle(1, "Tesla Model 3", "electric", "car", 45000, 12, "Voiture électrique avec autonomie de 500km", true),
            createVehicle(2, "Renault Zoé", "electric", "car", 32000, 8, "Compacte électrique urbaine", false),
            createVehicle(3, "Peugeot 208", "gasoline", "car", 22000, 5, "Citadine essence économique", true),
            createVehicle(4, "BMW i4", "electric", "car", 55000, 3, "Berline électrique sportive", false),
            createVehicle(5, "Volkswagen Golf", "gasoline", "car", 28000, 10, "Compacte polyvalente", true),
            createVehicle(6, "Nissan Leaf", "electric", "car", 35000, 7, "Véhicule électrique fiable", false),
            createVehicle(7, "Vespa Elettrica", "electric", "scooter", 8500, 15, "Scooter électrique urbain", true),
            createVehicle(8, "Yamaha NMAX", "gasoline", "scooter", 5500, 20, "Scooter 125cc essence", false)
        );
        
        // Filtrer si nécessaire
        List<Map<String, Object>> filtered = new ArrayList<>();
        for (Map<String, Object> vehicle : vehicles) {
            boolean match = true;
            if (type != null && !type.isEmpty() && !vehicle.get("type").equals(type)) {
                match = false;
            }
            if (fuel != null && !fuel.isEmpty() && !vehicle.get("fuelType").equals(fuel)) {
                match = false;
            }
            if (match) {
                filtered.add(vehicle);
            }
        }
        
        return ResponseEntity.ok(filtered);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getVehicle(@PathVariable int id) {
        List<Map<String, Object>> vehicles = Arrays.asList(
            createVehicle(1, "Tesla Model 3", "electric", "car", 45000, 12, "Voiture électrique avec autonomie de 500km", true),
            createVehicle(2, "Renault Zoé", "electric", "car", 32000, 8, "Compacte électrique urbaine", false)
        );
        
        Optional<Map<String, Object>> vehicle = vehicles.stream()
            .filter(v -> (int) v.get("id") == id)
            .findFirst();
            
        return vehicle.map(ResponseEntity::ok)
            .orElse(ResponseEntity.status(404).body(Map.of("error", "Véhicule non trouvé")));
    }

    @PostMapping("/search")
    public ResponseEntity<List<Map<String, Object>>> searchVehicles(
            @RequestBody Map<String, Object> searchCriteria) {
        
        String keyword = (String) searchCriteria.getOrDefault("keyword", "");
        String operator = (String) searchCriteria.getOrDefault("operator", "and");
        
        // Simulation de recherche
        List<Map<String, Object>> results = Arrays.asList(
            createVehicle(1, "Tesla Model 3", "electric", "car", 45000, 12, 
                "Voiture électrique avec autonomie de 500km", true),
            createVehicle(4, "BMW i4", "electric", "car", 55000, 3, 
                "Berline électrique sportive", false)
        );
        
        return ResponseEntity.ok(results);
    }

    @GetMapping("/{id}/animation")
    public ResponseEntity<Map<String, Object>> getVehicleAnimation(@PathVariable int id) {
        Map<String, Object> animation = new HashMap<>();
        animation.put("vehicleId", id);
        animation.put("animationUrl", "https://www.youtube.com/embed/dQw4w9WgXcQ");
        animation.put("duration", "1:30");
        animation.put("format", "3D");
        animation.put("available", true);
        
        return ResponseEntity.ok(animation);
    }

    private Map<String, Object> createVehicle(int id, String name, String fuel, String type, 
            int price, int stock, String description, boolean isNew) {
        Map<String, Object> vehicle = new HashMap<>();
        vehicle.put("id", id);
        vehicle.put("name", name);
        vehicle.put("fuelType", fuel);
        vehicle.put("type", type);
        vehicle.put("price", price);
        vehicle.put("originalPrice", price + 5000);
        vehicle.put("stock", stock);
        vehicle.put("description", description);
        vehicle.put("isNew", isNew);
        vehicle.put("image", "https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=400&h=300&fit=crop");
        vehicle.put("options", Arrays.asList("GPS", "Sièges chauffants", "Caméra de recul"));
        vehicle.put("incompatibleOptions", Arrays.asList(
            Map.of("option1", "sièges sportifs", "option2", "sièges en cuir"),
            Map.of("option1", "toit panoramique", "option2", "barres de toit")
        ));
        vehicle.put("createdAt", new Date());
        
        return vehicle;
    }
}
