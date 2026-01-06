package com.vehicules.documents;

public class LiasseBuilderConcret implements LiasseBuilder {
    private LiasseDocuments liasse;
    
    public LiasseBuilderConcret() {
        this.liasse = new LiasseDocuments();
    }
    
    @Override
    public void construireDemandeImmatriculation(String infoVehicule, String infoClient) {
        String contenu = "Véhicule: " + infoVehicule + "\nClient: " + infoClient;
        DemandeImmatriculation doc = new DemandeImmatriculation(contenu);
        liasse.ajouterDocument(doc);
    }
    
    @Override
    public void construireCertificatCession(String infoVendeur, String infoAcheteur) {
        String contenu = "Vendeur: " + infoVendeur + "\nAcheteur: " + infoAcheteur;
        CertificatCession doc = new CertificatCession(contenu);
        liasse.ajouterDocument(doc);
    }
    
    @Override
    public void construireBonCommande(String infoCommande, double montant) {
        String contenu = "Commande: " + infoCommande + "\nMontant: " + montant + "€";
        BonCommande doc = new BonCommande(contenu);
        liasse.ajouterDocument(doc);
    }
    
    @Override
    public LiasseDocuments getResultat() {
        return liasse;
    }
}