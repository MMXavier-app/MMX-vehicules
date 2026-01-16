package com.vehicules.model;

public class Commande {
    private String numero;
    private String type; // COMPTANT ou CREDIT
    private String statut; // EN_COURS, VALIDEE, LIVREE
    private double montant;
    private Client client;
    
    public Commande() {}
    
    public Commande(String numero, String type, double montant, Client client) {
        this.numero = numero;
        this.type = type;
        this.montant = montant;
        this.client = client;
        this.statut = "EN_COURS";
    }
    
    // Getters et setters
    public String getNumero() { return numero; }
    public void setNumero(String numero) { this.numero = numero; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public String getStatut() { return statut; }
    public void setStatut(String statut) { this.statut = statut; }
    
    public double getMontant() { return montant; }
    public void setMontant(double montant) { this.montant = montant; }
    
    public Client getClient() { return client; }
    public void setClient(Client client) { this.client = client; }
    
    @Override
    public String toString() {
        return "Commande #" + numero + " - " + type + " - " + montant + "€ - Statut: " + statut;
    }
}
