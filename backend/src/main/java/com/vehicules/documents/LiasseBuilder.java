package com.vehicules.documents;

public interface LiasseBuilder {
    void construireDemandeImmatriculation(String infoVehicule, String infoClient);
    void construireCertificatCession(String infoVendeur, String infoAcheteur);
    void construireBonCommande(String infoCommande, double montant);
    LiasseDocuments getResultat();
}
