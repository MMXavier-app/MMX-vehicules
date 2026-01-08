package com.mmx.template;

public abstract class CalculateurTaxe {
    
    public final double calculerMontantTotal(double montantBase, String pays) {
        double montantTaxe = calculerTaxe(montantBase, pays);
        double montantReduction = appliquerReduction(montantBase + montantTaxe);
        return montantBase + montantTaxe - montantReduction;
    }
    
    protected abstract double calculerTaxe(double montant, String pays);
    
    protected double appliquerReduction(double montant) {
        if (montant > 10000) {
            return montant * 0.05;
        }
        return 0;
    }
    
    protected double getTauxStandard(String pays) {
        switch (pays.toUpperCase()) {
            case "FRANCE": return 0.20;
            case "BELGIQUE": return 0.21;
            case "ALLEMAGNE": return 0.19;
            case "LUXEMBOURG": return 0.17;
            default: return 0.20;
        }
    }
}

class CalculateurTaxeCommande extends CalculateurTaxe {
    
    @Override
    protected double calculerTaxe(double montant, String pays) {
        double taux = getTauxStandard(pays);
        double taxeBase = montant * taux;
        
        if (pays.equalsIgnoreCase("FRANCE") && montant > 50000) {
            taxeBase += montant * 0.10;
        }
        
        return taxeBase;
    }
    
    @Override
    protected double appliquerReduction(double montant) {
        double reduction = super.appliquerReduction(montant);
        if (montant > 50000) {
            reduction += 1000;
        }
        return reduction;
    }
}
