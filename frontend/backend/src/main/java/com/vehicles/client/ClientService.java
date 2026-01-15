package com.vehicles.client;

import java.util.*;

/**
 * Service pour gérer la hiérarchie des clients (France + Afrique)
 * Pattern Composite pour la gestion société/filiales
 */
public class ClientService {
    private Map<String, ClientComponent> clients;
    
    public ClientService() {
        this.clients = new HashMap<>();
        initializeMultinationalClients();
    }
    
    private void initializeMultinationalClients() {
        System.out.println("🚀 Initialisation des sociétés clientes...");
        
        // =========================================
        // 1. SOCIÉTÉS FRANÇAISES
        // =========================================
        System.out.println("🇫🇷 Création des sociétés françaises...");
        
        // Groupe France (Holding)
        CorporateClient groupeFrance = new CorporateClient(
            "FR001", 
            "Groupe Automobile France", 
            "France", 
            "552 100 410 00015", 
            "HOLDING",
            "Paris"
        );
        
        // Distribution
        CorporateClient autoDistribution = new CorporateClient(
            "FR002", 
            "Auto Distribution SA", 
            "France", 
            "423 765 987 00022", 
            "DISTRIBUTION",
            "Lyon"
        );
        
        // Concessions françaises
        CorporateClient parisNord = new CorporateClient(
            "FR003", 
            "Concession Paris Nord", 
            "France", 
            "123 456 789 00033", 
            "CONCESSION",
            "Paris 18ème"
        );
        
        CorporateClient lyonSud = new CorporateClient(
            "FR004", 
            "Concession Lyon Sud", 
            "France", 
            "987 654 321 00044", 
            "CONCESSION",
            "Lyon 7ème"
        );
        
        // Location
        CorporateClient fleetSolutions = new CorporateClient(
            "FR005", 
            "Fleet Solutions SARL", 
            "France", 
            "555 666 777 00055", 
            "LOCATION",
            "Marseille"
        );
        
        // =========================================
        // 2. SOCIÉTÉS CAMEROUNAISES
        // =========================================
        System.out.println("🇨🇲 Création des sociétés camerounaises...");
        
        // Groupe Cameroun (Holding)
        CorporateClient groupeCameroun = new CorporateClient(
            "CM001", 
            "Groupe Automobile Cameroun", 
            "Cameroun", 
            "CM-RC-YAO-2024-001", 
            "HOLDING",
            "Yaoundé"
        );
        
        // Distributeurs au Cameroun
        CorporateClient yaoundeAuto = new CorporateClient(
            "CM002", 
            "Yaoundé Auto Distribution", 
            "Cameroun", 
            "CM-RC-YAO-2024-002", 
            "DISTRIBUTION",
            "Yaoundé Centre"
        );
        
        CorporateClient doualaMotors = new CorporateClient(
            "CM003", 
            "Douala Motors SA", 
            "Cameroun", 
            "CM-RC-DLA-2024-003", 
            "DISTRIBUTION",
            "Douala Bonanjo"
        );
        
        // Concessions camerounaises
        CorporateClient concessionYaounde = new CorporateClient(
            "CM004", 
            "Concession Yaoundé Bastos", 
            "Cameroun", 
            "CM-RC-YAO-2024-004", 
            "CONCESSION",
            "Yaoundé Bastos"
        );
        
        CorporateClient concessionDouala = new CorporateClient(
            "CM005", 
            "Concession Douala Akwa", 
            "Cameroun", 
            "CM-RC-DLA-2024-005", 
            "CONCESSION",
            "Douala Akwa"
        );
        
        CorporateClient concessionBafoussam = new CorporateClient(
            "CM006", 
            "Concession Bafoussam", 
            "Cameroun", 
            "CM-RC-BAF-2024-006", 
            "CONCESSION",
            "Bafoussam"
        );
        
        // Location au Cameroun
        CorporateClient cameroonFleet = new CorporateClient(
            "CM007", 
            "Cameroon Fleet Solutions", 
            "Cameroun", 
            "CM-RC-YAO-2024-007", 
            "LOCATION",
            "Yaoundé"
        );
        
        // =========================================
        // 3. SOCIÉTÉS AUTRES PAYS AFRICAINS
        // =========================================
        System.out.println("�� Création des sociétés africaines...");
        
        // Sénégal
        CorporateClient groupeSenegal = new CorporateClient(
            "SN001", 
            "Groupe Automobile Sénégal", 
            "Sénégal", 
            "SN-RC-DKR-2024-001", 
            "HOLDING",
            "Dakar"
        );
        
        CorporateClient dakarAuto = new CorporateClient(
            "SN002", 
            "Dakar Auto Distribution", 
            "Sénégal", 
            "SN-RC-DKR-2024-002", 
            "DISTRIBUTION",
            "Dakar Plateau"
        );
        
        // Côte d'Ivoire
        CorporateClient groupeCIV = new CorporateClient(
            "CI001", 
            "Groupe Auto Côte d'Ivoire", 
            "Côte d'Ivoire", 
            "CI-RC-ABJ-2024-001", 
            "HOLDING",
            "Abidjan"
        );
        
        // Gabon
        CorporateClient groupeGabon = new CorporateClient(
            "GA001", 
            "Groupe Automobile Gabon", 
            "Gabon", 
            "GA-RC-LBV-2024-001", 
            "HOLDING",
            "Libreville"
        );
        
        // =========================================
        // 4. CLIENTS INDIVIDUELS
        // =========================================
        System.out.println("👤 Création des clients individuels...");
        
        // Clients français
        IndividualClient clientFR1 = new IndividualClient(
            "IND001", 
            "Jean Dupont", 
            "France", 
            "jean.dupont@email.com", 
            "+33 6 12 34 56 78",
            "Paris"
        );
        
        IndividualClient clientFR2 = new IndividualClient(
            "IND002", 
            "Marie Martin", 
            "France", 
            "marie.martin@email.com", 
            "+33 6 23 45 67 89",
            "Lyon"
        );
        
        // Clients camerounais
        IndividualClient clientCM1 = new IndividualClient(
            "IND003", 
            "Paul Nkwi", 
            "Cameroun", 
            "paul.nkwi@email.cm", 
            "+237 6 77 12 34 56",
            "Yaoundé"
        );
        
        IndividualClient clientCM2 = new IndividualClient(
            "IND004", 
            "Amina Ousmanou", 
            "Cameroun", 
            "amina.ousmanou@email.cm", 
            "+237 6 99 88 77 66",
            "Douala"
        );
        
        // Client sénégalais
        IndividualClient clientSN1 = new IndividualClient(
            "IND005", 
            "Moussa Diop", 
            "Sénégal", 
            "moussa.diop@email.sn", 
            "+221 77 123 45 67",
            "Dakar"
        );
        
        // =========================================
        // 5. CONSTRUCTION DES HIÉRARCHIES
        // =========================================
        System.out.println("🏗️ Construction des hiérarchies...");
        
        // Hiérarchie française
        autoDistribution.addSubsidiary(parisNord);
        autoDistribution.addSubsidiary(lyonSud);
        groupeFrance.addSubsidiary(autoDistribution);
        groupeFrance.addSubsidiary(fleetSolutions);
        
        // Hiérarchie camerounaise
        yaoundeAuto.addSubsidiary(concessionYaounde);
        doualaMotors.addSubsidiary(concessionDouala);
        groupeCameroun.addSubsidiary(yaoundeAuto);
        groupeCameroun.addSubsidiary(doualaMotors);
        groupeCameroun.addSubsidiary(concessionBafoussam);
        groupeCameroun.addSubsidiary(cameroonFleet);
        
        // Hiérarchie sénégalaise
        groupeSenegal.addSubsidiary(dakarAuto);
        
        // =========================================
        // 6. AJOUT À LA BASE DE DONNÉES
        // =========================================
        System.out.println("💾 Enregistrement des clients...");
        
        // Sociétés françaises
        addClient(groupeFrance);
        addClient(autoDistribution);
        addClient(parisNord);
        addClient(lyonSud);
        addClient(fleetSolutions);
        
        // Sociétés camerounaises
        addClient(groupeCameroun);
        addClient(yaoundeAuto);
        addClient(doualaMotors);
        addClient(concessionYaounde);
        addClient(concessionDouala);
        addClient(concessionBafoussam);
        addClient(cameroonFleet);
        
        // Autres sociétés africaines
        addClient(groupeSenegal);
        addClient(dakarAuto);
        addClient(groupeCIV);
        addClient(groupeGabon);
        
        // Clients individuels
        addClient(clientFR1);
        addClient(clientFR2);
        addClient(clientCM1);
        addClient(clientCM2);
        addClient(clientSN1);
        
        System.out.println("✅ Initialisation terminée : " + clients.size() + " clients créés");
    }
    
    // =========================================
    // MÉTHODES PUBLIQUES
    // =========================================
    
    public void addClient(ClientComponent client) {
        clients.put(client.getId(), client);
    }
    
    public ClientComponent getClient(String id) {
        return clients.get(id);
    }
    
    public List<ClientComponent> getAllClients() {
        return new ArrayList<>(clients.values());
    }
    
    public List<CorporateClient> getCorporateClients() {
        List<CorporateClient> corps = new ArrayList<>();
        for (ClientComponent client : clients.values()) {
            if (client instanceof CorporateClient) {
                corps.add((CorporateClient) client);
            }
        }
        return corps;
    }
    
    public List<CorporateClient> getFrenchCompanies() {
        List<CorporateClient> frenchCorps = new ArrayList<>();
        for (ClientComponent client : clients.values()) {
            if (client instanceof CorporateClient) {
                CorporateClient corp = (CorporateClient) client;
                if ("France".equals(corp.getCountry())) {
                    frenchCorps.add(corp);
                }
            }
        }
        return frenchCorps;
    }
    
    public List<CorporateClient> getAfricanCompanies() {
        List<CorporateClient> africanCorps = new ArrayList<>();
        for (ClientComponent client : clients.values()) {
            if (client instanceof CorporateClient) {
                CorporateClient corp = (CorporateClient) client;
                if (isAfricanCountry(corp.getCountry())) {
                    africanCorps.add(corp);
                }
            }
        }
        return africanCorps;
    }
    
    public List<CorporateClient> getCameroonCompanies() {
        List<CorporateClient> cameroonCorps = new ArrayList<>();
        for (ClientComponent client : clients.values()) {
            if (client instanceof CorporateClient) {
                CorporateClient corp = (CorporateClient) client;
                if ("Cameroun".equals(corp.getCountry())) {
                    cameroonCorps.add(corp);
                }
            }
        }
        return cameroonCorps;
    }
    
    private boolean isAfricanCountry(String country) {
        String[] africanCountries = {
            "Cameroun", "Sénégal", "Côte d'Ivoire", "Gabon",
            "Maroc", "Tunisie", "Algérie", "Mali", 
            "Burkina Faso", "Bénin", "Togo", "Ghana",
            "Nigeria", "Congo", "RDC", "Rwanda"
        };
        return Arrays.asList(africanCountries).contains(country);
    }
    
    public Map<String, Object> proposeFleetToGroup(String groupId, int numberOfVehicles) {
        Map<String, Object> response = new HashMap<>();
        ClientComponent group = clients.get(groupId);
        
        if (group == null) {
            response.put("success", false);
            response.put("message", "❌ Groupe non trouvé : " + groupId);
            return response;
        }
        
        if (!group.isEligibleForFleetPurchase()) {
            response.put("success", false);
            response.put("message", "❌ Ce client n'est pas éligible à l'achat de flotte");
            return response;
        }
        
        // Calcul de la remise
        double discount = group.calculateFleetDiscount();
        List<Map<String, Object>> proposals = new ArrayList<>();
        
        // Proposition au groupe principal
        Map<String, Object> mainProposal = new HashMap<>();
        mainProposal.put("clientId", group.getId());
        mainProposal.put("clientName", group.getName());
        mainProposal.put("country", group.getCountry());
        mainProposal.put("city", group.getCity());
        mainProposal.put("vehicles", numberOfVehicles);
        mainProposal.put("discount", discount);
        mainProposal.put("type", "GROUPE PRINCIPAL");
        proposals.add(mainProposal);
        
        // Propositions aux filiales
        if (group instanceof CorporateClient) {
            distributeFleetProposal((CorporateClient) group, numberOfVehicles, 
                                  discount, proposals, 1);
        }
        
        response.put("success", true);
        response.put("groupId", groupId);
        response.put("groupName", group.getName());
        response.put("country", group.getCountry());
        response.put("totalVehicles", numberOfVehicles);
        response.put("baseDiscount", discount);
        response.put("proposals", proposals);
        response.put("totalProposals", proposals.size());
        response.put("message", "✅ Proposition de flotte envoyée avec succès");
        
        return response;
    }
    
    private void distributeFleetProposal(CorporateClient parent, int vehicles, 
                                        double discount, List<Map<String, Object>> proposals, int level) {
        List<ClientComponent> subsidiaries = parent.getSubsidiaries();
        if (subsidiaries.isEmpty()) return;
        
        // Calcul du nombre de véhicules par filiale
        int vehiclesPerSubsidiary = Math.max(1, vehicles / (subsidiaries.size() + 1));
        
        for (ClientComponent sub : subsidiaries) {
            double subDiscount = discount * (1.0 - (level * 0.1));
            subDiscount = Math.max(subDiscount, 5.0); // Minimum 5%
            
            Map<String, Object> proposal = new HashMap<>();
            proposal.put("clientId", sub.getId());
            proposal.put("clientName", sub.getName());
            proposal.put("country", sub.getCountry());
            proposal.put("city", getCity(sub));
            proposal.put("vehicles", vehiclesPerSubsidiary);
            proposal.put("discount", subDiscount);
            proposal.put("type", "FILIALE Niveau " + level);
            proposal.put("parent", parent.getName());
            proposals.add(proposal);
            
            // Propagation aux sous-filiales
            if (sub instanceof CorporateClient) {
                distributeFleetProposal((CorporateClient) sub, vehiclesPerSubsidiary, 
                                      subDiscount, proposals, level + 1);
            }
        }
    }
    
    private String getCity(ClientComponent client) {
        if (client instanceof CorporateClient) {
            return ((CorporateClient) client).getCity();
        } else if (client instanceof IndividualClient) {
            return ((IndividualClient) client).getCity();
        }
        return "Inconnu";
    }
    
    public Map<String, Object> getClientHierarchy(String clientId) {
        Map<String, Object> result = new HashMap<>();
        ClientComponent client = clients.get(clientId);
        
        if (client == null) {
            result.put("error", "Client non trouvé");
            return result;
        }
        
        result.put("id", client.getId());
        result.put("name", client.getName());
        result.put("type", client.getType());
        result.put("country", client.getCountry());
        result.put("city", getCity(client));
        result.put("hierarchy", client.getHierarchyInfo());
        result.put("eligibleForFleet", client.isEligibleForFleetPurchase());
        result.put("fleetDiscount", client.calculateFleetDiscount());
        
        if (client instanceof CorporateClient) {
            CorporateClient corp = (CorporateClient) client;
            result.put("siret", corp.getSiret());
            result.put("subsidiariesCount", corp.getSubsidiaries().size());
            result.put("totalSubsidiaries", corp.getTotalSubsidiariesCount());
            
            // Détail des filiales
            List<Map<String, Object>> subsDetails = new ArrayList<>();
            for (ClientComponent sub : corp.getSubsidiaries()) {
                Map<String, Object> subMap = new HashMap<>();
                subMap.put("id", sub.getId());
                subMap.put("name", sub.getName());
                subMap.put("type", sub.getType());
                subMap.put("country", sub.getCountry());
                subMap.put("city", getCity(sub));
                subsDetails.add(subMap);
            }
            result.put("subsidiaries", subsDetails);
        }
        
        return result;
    }
    
    public Map<String, Object> getStatistics() {
        Map<String, Object> stats = new HashMap<>();
        
        int totalClients = clients.size();
        int corporateClients = 0;
        int individualClients = 0;
        int frenchClients = 0;
        int africanClients = 0;
        int cameroonClients = 0;
        
        for (ClientComponent client : clients.values()) {
            if (client instanceof CorporateClient) {
                corporateClients++;
            } else {
                individualClients++;
            }
            
            String country = client.getCountry();
            if ("France".equals(country)) {
                frenchClients++;
            } else if (isAfricanCountry(country)) {
                africanClients++;
                if ("Cameroun".equals(country)) {
                    cameroonClients++;
                }
            }
        }
        
        stats.put("totalClients", totalClients);
        stats.put("corporateClients", corporateClients);
        stats.put("individualClients", individualClients);
        stats.put("frenchClients", frenchClients);
        stats.put("africanClients", africanClients);
        stats.put("cameroonClients", cameroonClients);
        stats.put("otherAfricanClients", africanClients - cameroonClients);
        
        return stats;
    }
    
    public void displayAllClients() {
        System.out.println("\n📋 LISTE COMPLÈTE DES CLIENTS");
        System.out.println("=" .repeat(50));
        
        for (ClientComponent client : clients.values()) {
            System.out.println(client);
        }
    }
    
    public void displayHierarchy(String clientId) {
        ClientComponent client = clients.get(clientId);
        if (client != null) {
            System.out.println("\n🏢 HIÉRARCHIE DE : " + client.getName());
            System.out.println("=" .repeat(50));
            System.out.println(client.getHierarchyInfo());
        } else {
            System.out.println("❌ Client non trouvé : " + clientId);
        }
    }
}
