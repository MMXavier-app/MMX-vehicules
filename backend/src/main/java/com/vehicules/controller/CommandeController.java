package com.vehicules.controller;

import com.vehicules.template.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/commandes")
@CrossOrigin(origins = "*")
public class CommandeController {
    
    private List<Map<String, Object>> commandes = new ArrayList<>();
    private int commandeCounter = 1;
    
    // Liste complète des pays supportés
    @GetMapping("/pays")
    public Map<String, Object> getPaysSupportes() {
        Map<String, Object> response = new HashMap<>();
        
        List<Map<String, String>> paysList = new ArrayList<>();
        
        // Europe
        paysList.add(createPays("FR", "France", "Europe", "20%"));
        paysList.add(createPays("DE", "Allemagne", "Europe", "19%"));
        paysList.add(createPays("BE", "Belgique", "Europe", "21%"));
        paysList.add(createPays("ES", "Espagne", "Europe", "21%"));
        paysList.add(createPays("IT", "Italie", "Europe", "22%"));
        paysList.add(createPays("UK", "Royaume-Uni", "Europe", "20%"));
        paysList.add(createPays("CH", "Suisse", "Europe", "7.7%"));
        paysList.add(createPays("NL", "Pays-Bas", "Europe", "21%"));
        
        // Amérique du Nord
        paysList.add(createPays("US", "États-Unis", "Amérique du Nord", "7% (moyenne)"));
        paysList.add(createPays("CA", "Canada", "Amérique du Nord", "13%"));
        paysList.add(createPays("MX", "Mexique", "Amérique du Nord", "16%"));
        
        // Amérique du Sud
        paysList.add(createPays("BR", "Brésil", "Amérique du Sud", "18%"));
        paysList.add(createPays("AR", "Argentine", "Amérique du Sud", "21%"));
        paysList.add(createPays("CL", "Chili", "Amérique du Sud", "19%"));
        paysList.add(createPays("CO", "Colombie", "Amérique du Sud", "19%"));
        paysList.add(createPays("PE", "Pérou", "Amérique du Sud", "18%"));
        
        // Afrique
        paysList.add(createPays("CM", "Cameroun", "Afrique", "19.25%"));
        paysList.add(createPays("CI", "Côte d'Ivoire", "Afrique", "18%"));
        paysList.add(createPays("NG", "Nigeria", "Afrique", "7.5%"));
        paysList.add(createPays("ZA", "Afrique du Sud", "Afrique", "15%"));
        paysList.add(createPays("MA", "Maroc", "Afrique", "20%"));
        paysList.add(createPays("TN", "Tunisie", "Afrique", "19%"));
        
        // Asie
        paysList.add(createPays("CN", "Chine", "Asie", "13%"));
        paysList.add(createPays("JP", "Japon", "Asie", "10%"));
        paysList.add(createPays("IN", "Inde", "Asie", "18%"));
        paysList.add(createPays("SG", "Singapour", "Asie", "7%"));
        paysList.add(createPays("KR", "Corée du Sud", "Asie", "10%"));
        paysList.add(createPays("AU", "Australie", "Océanie", "10%"));
        paysList.add(createPays("NZ", "Nouvelle-Zélande", "Océanie", "15%"));
        
        // Moyen-Orient
        paysList.add(createPays("AE", "Émirats Arabes Unis", "Moyen-Orient", "5%"));
        paysList.add(createPays("SA", "Arabie Saoudite", "Moyen-Orient", "15%"));
        paysList.add(createPays("QA", "Qatar", "Moyen-Orient", "0%"));
        paysList.add(createPays("KW", "Koweït", "Moyen-Orient", "0%"));
        
        response.put("totalPays", paysList.size());
        response.put("pays", paysList);
        response.put("pattern", "Template Method");
        response.put("message", "Taxes et frais calculés différemment selon le pays");
        
        return response;
    }
    
    private Map<String, String> createPays(String code, String nom, String continent, String taxe) {
        Map<String, String> pays = new HashMap<>();
        pays.put("code", code);
        pays.put("nom", nom);
        pays.put("continent", continent);
        pays.put("taxe", taxe);
        return pays;
    }
    
    @GetMapping
    public List<Map<String, Object>> getAllCommandes() {
        if (commandes.isEmpty()) {
            // Initialiser avec quelques commandes de démo
            Map<String, Object> cmd1 = new HashMap<>();
            cmd1.put("id", 1);
            cmd1.put("numero", "CMD-0001");
            cmd1.put("client", "Jean Dupont");
            cmd1.put("montant", 28000.0);
            cmd1.put("status", "VALIDEE");
            cmd1.put("dateCreation", "2024-01-03T10:30:00");
            cmd1.put("typePaiement", "comptant");
            cmd1.put("pays", "FR");
            commandes.add(cmd1);
            
            Map<String, Object> cmd2 = new HashMap<>();
            cmd2.put("id", 2);
            cmd2.put("numero", "CMD-0002");
            cmd2.put("client", "Marie Curie");
            cmd2.put("montant", 45000.0);
            cmd2.put("status", "EN_COURS");
            cmd2.put("dateCreation", "2024-01-04T14:45:00");
            cmd2.put("typePaiement", "credit");
            cmd2.put("pays", "US");
            commandes.add(cmd2);
            
            Map<String, Object> cmd3 = new HashMap<>();
            cmd3.put("id", 3);
            cmd3.put("numero", "CMD-0003");
            cmd3.put("client", "MultiCorp International");
            cmd3.put("montant", 120000.0);
            cmd3.put("status", "LIVREE");
            cmd3.put("dateCreation", "2024-01-02T09:15:00");
            cmd3.put("typePaiement", "comptant");
            cmd3.put("pays", "JP");
            commandes.add(cmd3);
        }
        return commandes;
    }
    
    @PostMapping
    public Map<String, Object> createCommande(@RequestBody Map<String, Object> commandeData) {
        Map<String, Object> nouvelleCommande = new HashMap<>(commandeData);
        nouvelleCommande.put("id", commandeCounter++);
        nouvelleCommande.put("numero", "CMD-" + String.format("%04d", commandeCounter));
        nouvelleCommande.put("dateCreation", LocalDateTime.now().toString());
        nouvelleCommande.put("status", "EN_COURS");
        
        // Factory Method simulation
        String typePaiement = (String) commandeData.getOrDefault("typePaiement", "comptant");
        if ("credit".equals(typePaiement)) {
            nouvelleCommande.put("type", "Commande avec crédit");
            nouvelleCommande.put("tauxInteret", "3.5%");
            nouvelleCommande.put("dureeCredit", "36 mois");
        } else {
            nouvelleCommande.put("type", "Commande au comptant");
            nouvelleCommande.put("remise", "2%");
        }
        
        // Template Method avec calcul par pays
        String pays = (String) commandeData.getOrDefault("pays", "FR");
        double montant = ((Number) commandeData.getOrDefault("montant", 0)).doubleValue();
        
        CalculCommandeTemplate calculateur = getCalculateurTaxes(pays);
        double montantFinal = calculateur.calculerMontantFinal(montant, pays);
        
        nouvelleCommande.put("montantBase", montant);
        nouvelleCommande.put("montantFinal", montantFinal);
        nouvelleCommande.put("pays", pays);
        nouvelleCommande.put("continent", getContinent(pays));
        nouvelleCommande.put("calculateur", calculateur.getClass().getSimpleName());
        nouvelleCommande.put("difference", montantFinal - montant);
        
        commandes.add(nouvelleCommande);
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Commande créée avec succès");
        response.put("commande", nouvelleCommande);
        response.put("patterns", Arrays.asList("Factory Method", "Template Method"));
        response.put("details", "Template Method appliqué: calcul spécifique pour " + getNomPays(pays));
        
        return response;
    }
    
    @PutMapping("/{id}/valider")
    public Map<String, Object> validerCommande(@PathVariable int id) {
        for (Map<String, Object> cmd : commandes) {
            if (((Number) cmd.get("id")).intValue() == id) {
                cmd.put("status", "VALIDEE");
                cmd.put("dateValidation", LocalDateTime.now().toString());
                
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Commande validée avec succès");
                response.put("commande", cmd);
                return response;
            }
        }
        
        Map<String, Object> error = new HashMap<>();
        error.put("error", "Commande non trouvée");
        error.put("id", id);
        return error;
    }
    
    @PutMapping("/{id}/livrer")
    public Map<String, Object> livrerCommande(@PathVariable int id) {
        for (Map<String, Object> cmd : commandes) {
            if (((Number) cmd.get("id")).intValue() == id) {
                cmd.put("status", "LIVREE");
                cmd.put("dateLivraison", LocalDateTime.now().toString());
                
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Commande livrée avec succès");
                response.put("commande", cmd);
                return response;
            }
        }
        
        Map<String, Object> error = new HashMap<>();
        error.put("error", "Commande non trouvée");
        error.put("id", id);
        return error;
    }
    
    @GetMapping("/template/{pays}")
    public Map<String, Object> testTemplateMethod(@PathVariable String pays, 
                                                 @RequestParam(defaultValue = "10000") double montant) {
        CalculCommandeTemplate calculateur = getCalculateurTaxes(pays);
        double montantFinal = calculateur.calculerMontantFinal(montant, pays);
        
        Map<String, Object> response = new HashMap<>();
        response.put("pattern", "Template Method");
        response.put("pays", getNomPays(pays));
        response.put("code", pays);
        response.put("continent", getContinent(pays));
        response.put("montantBase", montant);
        response.put("montantFinal", montantFinal);
        response.put("difference", montantFinal - montant);
        response.put("classe", calculateur.getClass().getSimpleName());
        response.put("message", "Calcul avec Template Method Pattern");
        
        return response;
    }
    
    private CalculCommandeTemplate getCalculateurTaxes(String pays) {
        String continent = getContinent(pays);
        
        switch (continent) {
            case "Europe":
                if ("FR".equalsIgnoreCase(pays)) return new CalculCommandeFrance();
                if ("DE".equalsIgnoreCase(pays)) return new CalculCommandeAllemagne();
                if ("BE".equalsIgnoreCase(pays)) return new CalculCommandeBelgique();
                return new CalculCommandeEurope();
                
            case "Afrique":
                return new CalculCommandeAfrique();
                
            case "Amérique du Nord":
                return new CalculCommandeAmeriqueNord();
                
            case "Amérique du Sud":
                return new CalculCommandeAmeriqueSud();
                
            case "Asie":
            case "Océanie":
                return new CalculCommandeAsie();
                
            case "Moyen-Orient":
                return new CalculCommandeMoyenOrient();
                
            default:
                return new CalculCommandeEurope(); // Par défaut Europe
        }
    }
    
    private String getContinent(String paysCode) {
        // Europe
        if (Arrays.asList("FR", "DE", "BE", "ES", "IT", "UK", "CH", "NL", "PT", "AT", "DK", "SE", "NO", "FI").contains(paysCode.toUpperCase())) {
            return "Europe";
        }
        // Amérique du Nord
        if (Arrays.asList("US", "CA", "MX").contains(paysCode.toUpperCase())) {
            return "Amérique du Nord";
        }
        // Amérique du Sud
        if (Arrays.asList("BR", "AR", "CL", "CO", "PE", "UY", "VE", "EC", "BO", "PY").contains(paysCode.toUpperCase())) {
            return "Amérique du Sud";
        }
        // Afrique
        if (Arrays.asList("CM", "CI", "NG", "ZA", "MA", "TN", "EG", "KE", "GH", "SN", "DZ").contains(paysCode.toUpperCase())) {
            return "Afrique";
        }
        // Asie
        if (Arrays.asList("CN", "JP", "IN", "SG", "KR", "TH", "VN", "MY", "ID", "PH").contains(paysCode.toUpperCase())) {
            return "Asie";
        }
        // Océanie
        if (Arrays.asList("AU", "NZ").contains(paysCode.toUpperCase())) {
            return "Océanie";
        }
        // Moyen-Orient
        if (Arrays.asList("AE", "SA", "QA", "KW", "BH", "OM", "JO", "LB", "IL").contains(paysCode.toUpperCase())) {
            return "Moyen-Orient";
        }
        
        return "Europe"; // Par défaut
    }
    
    private String getNomPays(String code) {
        Map<String, String> pays = new HashMap<>();
        pays.put("FR", "France");
        pays.put("DE", "Allemagne");
        pays.put("BE", "Belgique");
        pays.put("ES", "Espagne");
        pays.put("IT", "Italie");
        pays.put("UK", "Royaume-Uni");
        pays.put("CH", "Suisse");
        pays.put("NL", "Pays-Bas");
        pays.put("US", "États-Unis");
        pays.put("CA", "Canada");
        pays.put("MX", "Mexique");
        pays.put("BR", "Brésil");
        pays.put("AR", "Argentine");
        pays.put("CL", "Chili");
        pays.put("CO", "Colombie");
        pays.put("PE", "Pérou");
        pays.put("CM", "Cameroun");
        pays.put("CI", "Côte d'Ivoire");
        pays.put("NG", "Nigeria");
        pays.put("ZA", "Afrique du Sud");
        pays.put("MA", "Maroc");
        pays.put("TN", "Tunisie");
        pays.put("CN", "Chine");
        pays.put("JP", "Japon");
        pays.put("IN", "Inde");
        pays.put("SG", "Singapour");
        pays.put("KR", "Corée du Sud");
        pays.put("AU", "Australie");
        pays.put("NZ", "Nouvelle-Zélande");
        pays.put("AE", "Émirats Arabes Unis");
        pays.put("SA", "Arabie Saoudite");
        pays.put("QA", "Qatar");
        pays.put("KW", "Koweït");
        
        return pays.getOrDefault(code.toUpperCase(), code);
    }
}
