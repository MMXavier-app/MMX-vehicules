package com.mmx.model;

public class AutomobileElectrique extends Vehicule {
    
    private int autonomie; // km
    private int tempsRecharge; // heures
    
    public AutomobileElectrique() {}
    
    public AutomobileElectrique(String marque, String modele, double prix, int autonomie, int tempsRecharge) {
        this.setMarque(marque);
        this.setModele(modele);
        this.setPrix(prix);
        this.autonomie = autonomie;
        this.tempsRecharge = tempsRecharge;
    }
    
    @Override
    public String getType() {
        return "Automobile Électrique";
    }
    
    @Override
    public String getDetailsTechniques() {
        return String.format("%d km d'autonomie, %d heures de recharge", autonomie, tempsRecharge);
    }
    
    // Getters and setters
    public int getAutonomie() {
        return autonomie;
    }
    
    public void setAutonomie(int autonomie) {
        this.autonomie = autonomie;
    }
    
    public int getTempsRecharge() {
        return tempsRecharge;
    }
    
    public void setTempsRecharge(int tempsRecharge) {
        this.tempsRecharge = tempsRecharge;
    }
}
