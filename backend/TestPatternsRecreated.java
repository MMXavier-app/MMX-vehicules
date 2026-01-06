public class TestPatternsRecreated {
    public static void main(String[] args) {
        System.out.println("=== TEST PATTERNS RECRÉÉS ===\n");
        
        // Test Adapter
        try {
            Class<?> adapterClass = Class.forName("com.vehicules.adapter.PdfAdapter");
            System.out.println("✅ Pattern ADAPTER - PdfAdapter trouvé");
            
            // Test instantiation
            Object pdfAdapter = adapterClass.newInstance();
            System.out.println("   Instance créée avec succès");
        } catch (Exception e) {
            System.out.println("❌ Adapter: " + e.getMessage());
        }
        
        // Test Observer
        try {
            Class<?> observerClass = Class.forName("com.vehicules.observer.CatalogueVehicules");
            System.out.println("\n✅ Pattern OBSERVER - CatalogueVehicules trouvé");
            
            Class<?> observerInterface = Class.forName("com.vehicules.observer.Observer");
            System.out.println("   Interface Observer trouvée");
            
            Class<?> subjectInterface = Class.forName("com.vehicules.observer.Subject");
            System.out.println("   Interface Subject trouvée");
        } catch (Exception e) {
            System.out.println("\n❌ Observer: " + e.getMessage());
        }
        
        // Test complet des 11 patterns
        System.out.println("\n=== VÉRIFICATION DES 11 PATTERNS ===");
        String[][] patterns = {
            {"Abstract Factory", "com.vehicules.patterns.factory.AbstractVehiculeFactory"},
            {"Builder", "com.vehicules.documents.LiasseBuilder"},
            {"Singleton", "com.vehicules.singleton.DocumentViergeSingleton"},
            {"Adapter", "com.vehicules.adapter.PdfAdapter"},
            {"Bridge", "com.vehicules.bridge.Formulaire"},
            {"Composite", "com.vehicules.composite.SocieteClient"},
            {"Decorator", "com.vehicules.decorator.DecoratorOption"},
            {"Observer", "com.vehicules.observer.CatalogueVehicules"},
            {"Iterator", "com.vehicules.iterator.CatalogueIterator"},
            {"Template Method", "com.vehicules.template.CalculCommandeTemplate"},
            {"Command", "com.vehicules.command.CommandeSolder"}
        };
        
        int count = 0;
        for (String[] p : patterns) {
            try {
                Class.forName(p[1]);
                System.out.println("✅ " + p[0]);
                count++;
            } catch (ClassNotFoundException e) {
                System.out.println("❌ " + p[0]);
            }
        }
        
        System.out.println("\nSCORE: " + count + "/11 patterns");
        if (count == 11) {
            System.out.println("\n🎉 SUCCÈS COMPLET ! TOUS LES PATTERNS SONT PRÉSENTS !");
        }
    }
}
