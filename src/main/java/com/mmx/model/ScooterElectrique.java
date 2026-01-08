package com.mmx.model;

public class ScooterElectrique extends Vehicule {
    
    private int autonomie; // km
    private int puissance; // kW
    
    public ScooterElectrique() {}
    
    public ScooterElectrique(String marque, String modele, double prix, int autonomie, int puissance) {
        this.setMarque(marque);
        this.setModele(modele);
        this.setPrix(prix);
        this.autonomie = autonomie;
        this.puissance = puissance;
    }
    
    @Override
    public String getType() {
        return "Scooter Électrique";
    }
    
    @Override
    public String getDetailsTechniques() {
        return String.format("%d km d'autonomie, %d kW", autonomie, puissance);
    }
    
    // Getters and setters
    public int getAutonomie() {
        return autonomie;
    }
    
    public void setAutonomie(int autonomie) {
        this.autonomie = autonomie;
    }
    
    public int getPuissance() {
        return puissance;
    }
    
    public void setPuissance(int puissance) {
        this.puissance = puissance;
    }
}
