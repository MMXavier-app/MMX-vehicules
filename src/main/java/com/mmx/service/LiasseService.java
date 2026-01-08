package com.mmx.service;

import com.mmx.builder.DocumentBuilder;
import com.mmx.builder.LiasseDocument;
import com.mmx.singleton.LiasseVierge;
import org.springframework.stereotype.Service;

@Service
public class LiasseService {
    
    public LiasseDocument genererLiasseComplete(Long orderId, String clientName, 
                                               String vehicleModel, double price, 
                                               String[] options, String format) {
        
        // 1. Vérifier le Singleton
        LiasseVierge liasseVierge = LiasseVierge.getInstance();
        System.out.println("Service: Utilisation de la liasse vierge au format " + liasseVierge.getFormat());
        
        // 2. Construire la liasse avec le Builder
        DocumentBuilder builder = new DocumentBuilder();
        
        // Document 1: Demande d'immatriculation
        builder.setDemandeImmatriculation(
            "=== DEMANDE D'IMMATRICULATION ===\n" +
            "Numéro de commande: CMD-" + orderId + "\n" +
            "Nom du client: " + clientName + "\n" +
            "Modèle du véhicule: " + vehicleModel + "\n" +
            "Type de véhicule: Voiture particulière\n" +
            "Date de la demande: " + new java.util.Date() + "\n" +
            "Signature du client: ________________\n" +
            "Cachet de l'administration: [À APPOSER]"
        );
        
        // Document 2: Certificat de cession
        builder.setCertificatCession(
            "=== CERTIFICAT DE CESSION ===\n" +
            "Je soussigné(e), MMX Véhicules,\n" +
            "cède à " + clientName + "\n" +
            "le véhicule suivant: " + vehicleModel + "\n" +
            "pour le prix de: " + String.format("%.2f", price) + " €\n" +
            "Options incluses: " + (options != null ? String.join(", ", options) : "Aucune") + "\n" +
            "Date de cession: " + new java.util.Date() + "\n" +
            "Lieu: Siège social MMX Véhicules\n" +
            "Signature du vendeur: ________________\n" +
            "Signature de l'acheteur: ________________"
        );
        
        // Document 3: Bon de commande
        builder.setBonCommande(
            "=== BON DE COMMANDE ===\n" +
            "Référence: CMD-" + orderId + "\n" +
            "Date: " + new java.util.Date() + "\n" +
            "\n" +
            "CLIENT:\n" +
            "Nom: " + clientName + "\n" +
            "\n" +
            "VÉHICULE COMMANDÉ:\n" +
            "Modèle: " + vehicleModel + "\n" +
            "Prix de base: " + String.format("%.2f", price) + " €\n" +
            "\n" +
            "OPTIONS:\n" +
            (options != null && options.length > 0 ? 
                String.join("\n", java.util.Arrays.stream(options)
                    .map(opt -> "  • " + opt)
                    .toArray(String[]::new)) : 
                "  • Aucune option") + "\n" +
            "\n" +
            "MONTANT TOTAL: " + String.format("%.2f", price) + " €\n" +
            "\n" +
            "CONDITIONS:\n" +
            "  • Paiement à la livraison\n" +
            "  • Livraison sous 15 jours ouvrables\n" +
            "  *Garantie: 24 mois\n" +
            "\n" +
            "STATUT: COMMANDE CONFIRMÉE\n" +
            "\n" +
            "Signature: ________________"
        );
        
        // Définir le format
        builder.setFormat(format);
        
        // Construire et retourner la liasse
        return builder.build();
    }
    
    public String genererResumeLiasse(LiasseDocument liasse) {
        return "LIASSE GÉNÉRÉE:\n" +
               "Format: " + liasse.getFormat() + "\n" +
               "Contient 3 documents:\n" +
               "1. Demande d'immatriculation (" + 
                  liasse.getDemandeImmatriculation().split("\n")[0] + ")\n" +
               "2. Certificat de cession (" + 
                  liasse.getCertificatCession().split("\n")[0] + ")\n" +
               "3. Bon de commande (" + 
                  liasse.getBonCommande().split("\n")[0] + ")";
    }
}
