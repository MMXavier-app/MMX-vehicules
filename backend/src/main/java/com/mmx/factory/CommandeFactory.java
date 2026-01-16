package com.mmx.factory;

import com.mmx.model.Commande;
import com.mmx.model.CommandeComptant;
import com.mmx.model.CommandeCredit;

public class CommandeFactory {
    
    public Commande creerCommandeComptant(String numeroCommande, String clientNom, double montantTotal, double montantVerse) {
        CommandeComptant commande = new CommandeComptant();
        commande.setNumeroCommande(numeroCommande);
        commande.setClientNom(clientNom);
        commande.setMontantTotal(montantTotal);
        commande.setMontantVerse(montantVerse);
        return commande;
    }
    
    public Commande creerCommandeCredit(String numeroCommande, String clientNom, double montantTotal, 
                                        String organismeCredit, int dureeMois, double tauxInteret) {
        CommandeCredit commande = new CommandeCredit();
        commande.setNumeroCommande(numeroCommande);
        commande.setClientNom(clientNom);
        commande.setMontantTotal(montantTotal);
        commande.setOrganismeCredit(organismeCredit);
        commande.setDureeMois(dureeMois);
        commande.setTauxInteret(tauxInteret);
        return commande;
    }
}
