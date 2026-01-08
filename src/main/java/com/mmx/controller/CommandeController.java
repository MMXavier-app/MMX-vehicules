package com.mmx.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.ArrayList;
import java.util.UUID;

@RestController
@RequestMapping("/api/commandes")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class CommandeController {
    
    @PostMapping
    public ResponseEntity<?> creerCommande(@RequestBody CommandeRequest request) {
        try {
            System.out.println("📦 NOUVELLE COMMANDE RECUE:");
            System.out.println("============================");
            System.out.println("Client: " + request.getClient().getNom());
            System.out.println("Email: " + request.getClient().getEmail());
            System.out.println("Téléphone: " + request.getClient().getTelephone());
            System.out.println("Total HT: " + request.getTotalHT() + " €");
            System.out.println("TVA: " + request.getTva() + " €");
            System.out.println("Total TTC: " + request.getTotalTTC() + " €");
            System.out.println("Mode paiement: " + request.getModePaiement());
            System.out.println("Nombre d'articles: " + request.getItems().size());
            
            // Afficher les articles
            request.getItems().forEach(item -> {
                System.out.println("  - " + item.getNom() + ": " + item.getPrix() + " € x " + item.getQuantite());
                if (item.getOptions() != null && !item.getOptions().isEmpty()) {
                    System.out.println("    Options: " + String.join(", ", item.getOptions()));
                }
            });
            
            // Générer une référence unique
            String reference = "CMD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
            
            // Créer la réponse
            CommandeResponse response = new CommandeResponse();
            response.setId(System.currentTimeMillis());
            response.setReference(reference);
            response.setDate(new Date());
            response.setClient(request.getClient());
            response.setItems(request.getItems());
            response.setTotalHT(request.getTotalHT());
            response.setTva(request.getTva());
            response.setTotalTTC(request.getTotalTTC());
            response.setModePaiement(request.getModePaiement());
            response.setStatut("CONFIRMÉE");
            
            System.out.println("✅ COMMANDE CRÉÉE: " + reference);
            System.out.println("============================\n");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            System.err.println("❌ ERREUR création commande: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest()
                .body("{\"error\": \"Erreur: " + e.getMessage() + "\"}");
        }
    }
    
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        System.out.println("✅ Test API Commandes appelé");
        return ResponseEntity.ok("✅ API Commandes fonctionnelle - Prête à recevoir des commandes");
    }
    
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("OK");
    }
    
    // Classes internes pour la requête
    public static class CommandeRequest {
        private ClientInfo client;
        private java.util.List<Item> items = new ArrayList<>();
        private double totalHT;
        private double tva;
        private double totalTTC;
        private String modePaiement;
        
        // Getters et Setters
        public ClientInfo getClient() { return client; }
        public void setClient(ClientInfo client) { this.client = client; }
        
        public java.util.List<Item> getItems() { return items; }
        public void setItems(java.util.List<Item> items) { this.items = items; }
        
        public double getTotalHT() { return totalHT; }
        public void setTotalHT(double totalHT) { this.totalHT = totalHT; }
        
        public double getTva() { return tva; }
        public void setTva(double tva) { this.tva = tva; }
        
        public double getTotalTTC() { return totalTTC; }
        public void setTotalTTC(double totalTTC) { this.totalTTC = totalTTC; }
        
        public String getModePaiement() { return modePaiement; }
        public void setModePaiement(String modePaiement) { this.modePaiement = modePaiement; }
    }
    
    public static class ClientInfo {
        private String nom;
        private String email;
        private String telephone;
        private String adresse;
        private String ville;
        private String codePostal;
        
        // Getters et Setters
        public String getNom() { return nom; }
        public void setNom(String nom) { this.nom = nom; }
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public String getTelephone() { return telephone; }
        public void setTelephone(String telephone) { this.telephone = telephone; }
        
        public String getAdresse() { return adresse; }
        public void setAdresse(String adresse) { this.adresse = adresse; }
        
        public String getVille() { return ville; }
        public void setVille(String ville) { this.ville = ville; }
        
        public String getCodePostal() { return codePostal; }
        public void setCodePostal(String codePostal) { this.codePostal = codePostal; }
    }
    
    public static class Item {
        private Long id;
        private String nom;
        private double prix;
        private int quantite = 1;
        private java.util.List<String> options = new ArrayList<>();
        
        // Getters et Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        
        public String getNom() { return nom; }
        public void setNom(String nom) { this.nom = nom; }
        
        public double getPrix() { return prix; }
        public void setPrix(double prix) { this.prix = prix; }
        
        public int getQuantite() { return quantite; }
        public void setQuantite(int quantite) { this.quantite = quantite; }
        
        public java.util.List<String> getOptions() { return options; }
        public void setOptions(java.util.List<String> options) { this.options = options; }
    }
    
    public static class CommandeResponse {
        private Long id;
        private String reference;
        private Date date;
        private ClientInfo client;
        private java.util.List<Item> items;
        private double totalHT;
        private double tva;
        private double totalTTC;
        private String modePaiement;
        private String statut;
        
        // Getters et Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        
        public String getReference() { return reference; }
        public void setReference(String reference) { this.reference = reference; }
        
        public Date getDate() { return date; }
        public void setDate(Date date) { this.date = date; }
        
        public ClientInfo getClient() { return client; }
        public void setClient(ClientInfo client) { this.client = client; }
        
        public java.util.List<Item> getItems() { return items; }
        public void setItems(java.util.List<Item> items) { this.items = items; }
        
        public double getTotalHT() { return totalHT; }
        public void setTotalHT(double totalHT) { this.totalHT = totalHT; }
        
        public double getTva() { return tva; }
        public void setTva(double tva) { this.tva = tva; }
        
        public double getTotalTTC() { return totalTTC; }
        public void setTotalTTC(double totalTTC) { this.totalTTC = totalTTC; }
        
        public String getModePaiement() { return modePaiement; }
        public void setModePaiement(String modePaiement) { this.modePaiement = modePaiement; }
        
        public String getStatut() { return statut; }
        public void setStatut(String statut) { this.statut = statut; }
    }
}
