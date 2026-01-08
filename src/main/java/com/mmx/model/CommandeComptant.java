package com.mmx.model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("COMPTANT")
public class CommandeComptant extends Commande {
    
    private double montantVerse;
    
    public CommandeComptant() {}
    
    public CommandeComptant(String numeroCommande, String clientNom, double montantTotal, double montantVerse) {
        this.setNumeroCommande(numeroCommande);
        this.setClientNom(clientNom);
        this.setMontantTotal(montantTotal);
        this.montantVerse = montantVerse;
        this.setDateCommande(java.time.LocalDate.now());
    }
    
    @Override
    public String getTypePaiement() {
        return "Paiement au comptant";
    }
    
    @Override
    public void traiterPaiement() {
        System.out.println("Traitement du paiement au comptant pour la commande " + getNumeroCommande());
        System.out.println("Montant total: " + getMontantTotal());
        System.out.println("Montant versé: " + montantVerse);
        
        if (montantVerse >= getMontantTotal()) {
            double rendu = montantVerse - getMontantTotal();
            if (rendu > 0) {
                System.out.println("À rendre: " + rendu);
            }
            setStatut("PAYE");
        } else {
            System.out.println("Montant insuffisant!");
            setStatut("EN_ATTENTE");
        }
    }
    
    // Getters and setters
    public double getMontantVerse() {
        return montantVerse;
    }
    
    public void setMontantVerse(double montantVerse) {
        this.montantVerse = montantVerse;
    }
}
