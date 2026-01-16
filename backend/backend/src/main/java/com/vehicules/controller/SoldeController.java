package com.vehicules.controller;

import com.vehicules.command.*;
import com.vehicules.model.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/soldes")
@CrossOrigin(origins = "*")
public class SoldeController {
    
    private List<Map<String, Object>> historique = new ArrayList<>();
    
    @PostMapping("/appliquer")
    public Map<String, Object> appliquerSolde(@RequestBody Map<String, Object> request) {
        List<Integer> vehiculeIds = (List<Integer>) request.get("vehiculeIds");
        double pourcentage = ((Number) request.get("pourcentage")).doubleValue();
        String raison = (String) request.getOrDefault("raison", "Solde saisonnier");
        
        // Simulation (en vrai on récupérerait les véhicules de la base)
        Map<String, Object> historiqueEntry = new HashMap<>();
        historiqueEntry.put("id", historique.size() + 1);
        historiqueEntry.put("date", new Date().toString());
        historiqueEntry.put("vehicules", vehiculeIds.size());
        historiqueEntry.put("pourcentage", pourcentage);
        historiqueEntry.put("raison", raison);
        historiqueEntry.put("resultat", "Solde appliqué avec succès");
        historique.add(historiqueEntry);
        
        Map<String, Object> response = new HashMap<>();
        response.put("pattern", "Command");
        response.put("commande", "SolderVehiculeCommande");
        response.put("resultat", "Command Pattern exécuté (simulation)");
        response.put("details", historiqueEntry);
        response.put("message", "Command Pattern démontré");
        
        return response;
    }
    
    @PostMapping("/annuler")
    public Map<String, Object> annulerDerniereCommande() {
        if (historique.isEmpty()) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Aucune commande à annuler");
            return error;
        }
        
        Map<String, Object> derniere = historique.remove(historique.size() - 1);
        
        Map<String, Object> response = new HashMap<>();
        response.put("pattern", "Command");
        response.put("action", "annulation");
        response.put("commandeAnnulee", derniere);
        response.put("message", "Dernière commande annulée (simulation Command Pattern)");
        
        return response;
    }
    
    @GetMapping("/historique")
    public List<Map<String, Object>> getHistorique() {
        return historique;
    }
    
    @PostMapping("/stock-ancien")
    public Map<String, Object> solderStockAncien() {
        Map<String, Object> historiqueEntry = new HashMap<>();
        historiqueEntry.put("id", historique.size() + 1);
        historiqueEntry.put("date", new Date().toString());
        historiqueEntry.put("type", "Stock ancien");
        historiqueEntry.put("jours", 180);
        historiqueEntry.put("reduction", "20%");
        historiqueEntry.put("resultat", "Véhicules en stock depuis plus de 180 jours soldés");
        historique.add(historiqueEntry);
        
        Map<String, Object> response = new HashMap<>();
        response.put("pattern", "Command");
        response.put("commande", "SolderStockAncienCommande");
        response.put("resultat", "Command Pattern pour stock ancien exécuté");
        response.put("details", "Soldes de 20% appliqués aux véhicules en stock depuis plus de 180 jours");
        
        return response;
    }
}
