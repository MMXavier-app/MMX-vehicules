package com.mmx.singleton;

public class LiasseVierge {
    private static LiasseVierge instance;
    private final String format;
    
    private LiasseVierge() {
        this.format = "PDF";
        System.out.println("Création de la liasse vierge au format " + format);
    }
    
    public static synchronized LiasseVierge getInstance() {
        if (instance == null) {
            instance = new LiasseVierge();
        }
        return instance;
    }
    
    public String getFormat() {
        return format;
    }
    
    public String getLiasseVierge() {
        return "LIASSE VIERGE\n" +
               "Format: " + format + "\n" +
               "1. Demande d'immatriculation: [VIDE]\n" +
               "2. Certificat de cession: [VIDE]\n" +
               "3. Bon de commande: [VIDE]\n";
    }
    
    public void afficherInfo() {
        System.out.println("Liasse vierge disponible au format: " + format);
    }
}
