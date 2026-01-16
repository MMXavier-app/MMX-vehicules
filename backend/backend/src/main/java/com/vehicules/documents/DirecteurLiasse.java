package com.vehicules.documents;

public class DirecteurLiasse {
    public LiasseDocuments construireLiasseComplete(LiasseBuilder builder, 
                                                    String infoVehicule, 
                                                    String infoClient,
                                                    String infoVendeur,
                                                    String infoAcheteur,
                                                    String infoCommande,
                                                    double montant) {
        builder.construireDemandeImmatriculation(infoVehicule, infoClient);
        builder.construireCertificatCession(infoVendeur, infoAcheteur);
        builder.construireBonCommande(infoCommande, montant);
        return builder.getResultat();
    }
}
