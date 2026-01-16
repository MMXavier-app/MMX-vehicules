package com.vehicules.model;

public class Client {
    private String nom;
    private String email;
    private String type; // PARTICULIER ou SOCIETE
    
    public Client() {}
    
    public Client(String nom, String email, String type) {
        this.nom = nom;
        this.email = email;
        this.type = type;
    }
    
    // Getters et setters
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    @Override
    public String toString() {
        return nom + " (" + email + ") - " + type;
    }
}
