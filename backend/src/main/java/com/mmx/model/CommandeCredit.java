package com.mmx.model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("CREDIT")
public class CommandeCredit extends Commande {
    
    private String organismeCredit;
    private int dureeMois;
    private double tauxInteret;
    
    public CommandeCredit() {}
    
    public CommandeCredit(String numeroCommande, String clientNom, double montantTotal, 
                         String organismeCredit, int dureeMois, double tauxInteret) {
        this.setNumeroCommande(numeroCommande);
        this.setClientNom(clientNom);
        this.setMontantTotal(montantTotal);
        this.organismeCredit = organismeCredit;
        this.dureeMois = dureeMois;
        this.tauxInteret = tauxInteret;
        this.setDateCommande(java.time.LocalDate.now());
    }
    
    @Override
    public String getTypePaiement() {
        return "Crédit (" + organismeCredit + ")";
    }
    
    @Override
    public void traiterPaiement() {
        System.out.println("Traitement du crédit pour la commande " + getNumeroCommande());
        System.out.println("Organisme: " + organismeCredit);
        System.out.println("Durée: " + dureeMois + " mois");
        System.out.println("Taux: " + tauxInteret + "%");
        
        double mensualite = calculerMensualite();
        System.out.println("Mensualité: " + mensualite);
        
        setStatut("CREDIT_EN_COURS");
    }
    
    private double calculerMensualite() {
        double montantAvecInterets = getMontantTotal() * (1 + tauxInteret / 100);
        return montantAvecInterets / dureeMois;
    }
    
    // Getters and setters
    public String getOrganismeCredit() {
        return organismeCredit;
    }
    
    public void setOrganismeCredit(String organismeCredit) {
        this.organismeCredit = organismeCredit;
    }
    
    public int getDureeMois() {
        return dureeMois;
    }
    
    public void setDureeMois(int dureeMois) {
        this.dureeMois = dureeMois;
    }
    
    public double getTauxInteret() {
        return tauxInteret;
    }
    
    public void setTauxInteret(double tauxInteret) {
        this.tauxInteret = tauxInteret;
    }
}
