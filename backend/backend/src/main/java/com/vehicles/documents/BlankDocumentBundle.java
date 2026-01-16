package com.vehicles.documents;

import java.util.Arrays;
import java.util.List;

/**
 * Singleton pour la liasse vierge de documents
 * Garantit qu'il n'y a qu'une seule instance de la liasse vierge
 */
public class BlankDocumentBundle {
    
    // Instance unique (Singleton)
    private static BlankDocumentBundle instance;
    
    // Documents de base de la liasse vierge
    private List<String> blankDocuments;
    private final String bundleId = "BLANK_BUNDLE_2026";
    private final String creationDate = "2026-01-16";
    
    // Constructeur privé pour empêcher l'instanciation directe
    private BlankDocumentBundle() {
        // Initialisation des documents vierges
        blankDocuments = Arrays.asList(
            "1. Demande d'immatriculation (vierge)",
            "2. Certificat de cession (vierge)", 
            "3. Bon de commande (vierge)",
            "4. Facture proforma (vierge)",
            "5. Attestation de garantie (vierge)",
            "6. Fiche technique (vierge)"
        );
        
        System.out.println("✅ Singleton BlankDocumentBundle créé : Liasse vierge initialisée");
    }
    
    // Méthode statique pour obtenir l'instance unique
    public static synchronized BlankDocumentBundle getInstance() {
        if (instance == null) {
            instance = new BlankDocumentBundle();
        }
        return instance;
    }
    
    // Méthodes d'accès
    public List<String> getBlankDocuments() {
        return blankDocuments;
    }
    
    public String getBundleId() {
        return bundleId;
    }
    
    public String getCreationDate() {
        return creationDate;
    }
    
    public int getDocumentCount() {
        return blankDocuments.size();
    }
    
    public void displayBlankBundle() {
        System.out.println("\n📄 LIASSE VIERGE DE DOCUMENTS (Singleton)");
        System.out.println("=" .repeat(50));
        System.out.println("ID : " + bundleId);
        System.out.println("Date de création : " + creationDate);
        System.out.println("Nombre de documents : " + getDocumentCount());
        System.out.println("\nDocuments inclus :");
        for (String doc : blankDocuments) {
            System.out.println("  • " + doc);
        }
    }
    
    public String getDocumentTemplate(int index) {
        if (index >= 0 && index < blankDocuments.size()) {
            String docName = blankDocuments.get(index);
            return String.format("""
                ==============================
                %s
                ==============================
                
                Document : %s
                Référence : %s-DOC-%03d
                Date : %s
                Statut : VIERGE
                
                [CONTENU À REMPLIR]
                
                ==============================
                """, docName, docName, bundleId, index + 1, creationDate);
        }
        return "Document non trouvé";
    }
    
    // Vérification que c'est bien un Singleton
    public static void testSingleton() {
        System.out.println("\n🔍 TEST DU PATTERN SINGLETON");
        System.out.println("-".repeat(30));
        
        BlankDocumentBundle instance1 = BlankDocumentBundle.getInstance();
        BlankDocumentBundle instance2 = BlankDocumentBundle.getInstance();
        
        System.out.println("Instance 1 : " + instance1);
        System.out.println("Instance 2 : " + instance2);
        System.out.println("Même instance ? : " + (instance1 == instance2));
        System.out.println("HashCode instance1 : " + instance1.hashCode());
        System.out.println("HashCode instance2 : " + instance2.hashCode());
        
        if (instance1 == instance2) {
            System.out.println("✅ SUCCÈS : Pattern Singleton vérifié - Une seule instance existe");
        } else {
            System.out.println("❌ ÉCHEC : Plusieurs instances créées");
        }
    }
}
