package com.mmx.composite;

import java.util.ArrayList;
import java.util.List;

public interface SocieteClient {
    String getNom();
    double getChiffreAffaires();
    void ajouter(SocieteClient societe);
    void supprimer(SocieteClient societe);
    List<SocieteClient> getFiliales();
    
    // Nouvelles méthodes pour démonstration
    String proposerAchatFlotte(int nombreVehicules);
    double calculerChiffreAffairesTotal();
    int getNombreTotalEmployes();
}

class SocieteSimple implements SocieteClient {
    private String nom;
    private double chiffreAffaires;
    private int nombreEmployes;
    
    public SocieteSimple(String nom, double chiffreAffaires, int nombreEmployes) {
        this.nom = nom;
        this.chiffreAffaires = chiffreAffaires;
        this.nombreEmployes = nombreEmployes;
    }
    
    @Override
    public String getNom() {
        return nom;
    }
    
    @Override
    public double getChiffreAffaires() {
        return chiffreAffaires;
    }
    
    @Override
    public int getNombreTotalEmployes() {
        return nombreEmployes;
    }
    
    @Override
    public String proposerAchatFlotte(int nombreVehicules) {
        double montantEstime = nombreVehicules * 25000; // 25k par véhicule
        return String.format("Proposition envoyée à %s : %d véhicules (≈%.2f€)", 
                           nom, nombreVehicules, montantEstime);
    }
    
    @Override
    public double calculerChiffreAffairesTotal() {
        return chiffreAffaires;
    }
    
    @Override
    public void ajouter(SocieteClient societe) {
        throw new UnsupportedOperationException("Société simple ne peut pas avoir de filiales");
    }
    
    @Override
    public void supprimer(SocieteClient societe) {
        throw new UnsupportedOperationException("Société simple ne peut pas avoir de filiales");
    }
    
    @Override
    public List<SocieteClient> getFiliales() {
        return new ArrayList<>();
    }
}

class SocieteAvecFiliales implements SocieteClient {
    private String nom;
    private List<SocieteClient> filiales = new ArrayList<>();
    
    public SocieteAvecFiliales(String nom) {
        this.nom = nom;
    }
    
    @Override
    public String getNom() {
        return nom;
    }
    
    @Override
    public double getChiffreAffaires() {
        // Pour une société avec filiales, on pourrait avoir son propre CA
        return 0; // Ou implémenter un CA propre si nécessaire
    }
    
    @Override
    public int getNombreTotalEmployes() {
        int total = 0;
        for (SocieteClient filiale : filiales) {
            total += filiale.getNombreTotalEmployes();
        }
        return total;
    }
    
    @Override
    public String proposerAchatFlotte(int nombreVehicules) {
        StringBuilder result = new StringBuilder();
        result.append(String.format("📦 Propositions pour le groupe %s:\n", nom));
        
        // Répartir les véhicules proportionnellement aux employés
        int totalEmployes = getNombreTotalEmployes();
        if (totalEmployes > 0) {
            for (SocieteClient filiale : filiales) {
                int employesFiliale = filiale.getNombreTotalEmployes();
                int vehiculesFiliale = (int) Math.round((double) employesFiliale / totalEmployes * nombreVehicules);
                result.append("  • ").append(filiale.proposerAchatFlotte(vehiculesFiliale)).append("\n");
            }
        }
        return result.toString();
    }
    
    @Override
    public double calculerChiffreAffairesTotal() {
        double total = 0;
        for (SocieteClient filiale : filiales) {
            total += filiale.calculerChiffreAffairesTotal();
        }
        return total;
    }
    
    @Override
    public void ajouter(SocieteClient societe) {
        filiales.add(societe);
    }
    
    @Override
    public void supprimer(SocieteClient societe) {
        filiales.remove(societe);
    }
    
    @Override
    public List<SocieteClient> getFiliales() {
        return new ArrayList<>(filiales);
    }
}
