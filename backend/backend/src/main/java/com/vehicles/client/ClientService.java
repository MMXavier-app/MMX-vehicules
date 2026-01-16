package com.vehicles.client;

import java.util.HashMap;
import java.util.Map;

/**
 * Service pour gérer la hiérarchie des clients
 */
public class ClientService {
    private Map<String, ClientComponent> clients;
    
    public ClientService() {
        this.clients = new HashMap<>();
        initializeSampleClients();
    }
    
    private void initializeSampleClients() {
        // === SOCIÉTÉS FRANÇAISES ===
        // Holding
        CorporateClient groupeFrance = new CorporateClient(
            "FR001", 
            "Groupe Automobile France", 
            "France", 
            "552 100 410 00015", 
            "HOLDING"
        );
        
        // Distribution
        CorporateClient autoDistribution = new CorporateClient(
            "FR002", 
            "Auto Distribution SA", 
            "France", 
            "423 765 987 00022", 
            "DISTRIBUTION"
        );
        
        // Concessions (filiales de Auto Distribution)
        CorporateClient parisNord = new CorporateClient(
            "FR003", 
            "Concession Paris Nord", 
            "France", 
            "123 456 789 00033", 
            "SUBSIDIARY"
        );
        
        CorporateClient lyonSud = new CorporateClient(
            "FR004", 
            "Concession Lyon Sud", 
            "France", 
            "987 654 321 00044", 
            "SUBSIDIARY"
        );
        
        // Location
        CorporateClient fleetSolutions = new CorporateClient(
            "FR005", 
            "Fleet Solutions SARL", 
            "France", 
            "555 666 777 00055", 
            "LOCATION"
        );
        
        // === SOCIÉTÉS AFRICAINES ===
        CorporateClient groupeAfrique = new CorporateClient(
            "AF001", 
            "Groupe Automobile Afrique", 
            "Sénégal", 
            "SN001-2024-12345", 
            "HOLDING"
        );
        
        CorporateClient dakarAuto = new CorporateClient(
            "AF002", 
            "Dakar Auto Distribution", 
            "Sénégal", 
            "SN002-2024-54321", 
            "DISTRIBUTION"
        );
        
        CorporateClient abidjanFleet = new CorporateClient(
            "AF003", 
            "Abidjan Fleet Solutions", 
            "Côte d'Ivoire", 
            "CI003-2024-67890", 
            "LOCATION"
        );
        
        // === CLIENTS INDIVIDUELS ===
        IndividualClient client1 = new IndividualClient(
            "IND001", 
            "Jean Dupont", 
            "France", 
            "jean.dupont@email.com", 
            "+33 6 12 34 56 78"
        );
        
        IndividualClient client2 = new IndividualClient(
            "IND002", 
            "Fatou Diop", 
            "Sénégal", 
            "fatou.diop@email.sn", 
            "+221 77 123 45 67"
        );
        
        // === CONSTRUCTION DE LA HIÉRARCHIE ===
        
        // Hiérarchie française
        autoDistribution.addSubsidiary(parisNord);
        autoDistribution.addSubsidiary(lyonSud);
        
        groupeFrance.addSubsidiary(autoDistribution);
        groupeFrance.addSubsidiary(fleetSolutions);
        
        // Hiérarchie africaine
        groupeAfrique.addSubsidiary(dakarAuto);
        groupeAfrique.addSubsidiary(abidjanFleet);
        
        // Ajout à la base de données
        clients.put(groupeFrance.getId(), groupeFrance);
        clients.put(autoDistribution.getId(), autoDistribution);
        clients.put(parisNord.getId(), parisNord);
        clients.put(lyonSud.getId(), lyonSud);
        clients.put(fleetSolutions.getId(), fleetSolutions);
        
        clients.put(groupeAfrique.getId(), groupeAfrique);
        clients.put(dakarAuto.getId(), dakarAuto);
        clients.put(abidjanFleet.getId(), abidjanFleet);
        
        clients.put(client1.getId(), client1);
        clients.put(client2.getId(), client2);
    }
    
    public ClientComponent getClient(String id) {
        return clients.get(id);
    }
    
    public void addClient(ClientComponent client) {
        clients.put(client.getId(), client);
    }
    
    public void proposeFleetToGroup(String groupId, int numberOfVehicles) {
        ClientComponent group = clients.get(groupId);
        if (group != null && group.isEligibleForFleetPurchase()) {
            double discount = group.calculateFleetDiscount();
            System.out.println("=== PROPOSITION DE FLOTTE ===");
            System.out.println("Destinataire: " + group.getName());
            System.out.println("Nombre de véhicules: " + numberOfVehicles);
            System.out.println("Remise applicable: " + discount + "%");
            System.out.println("Hiérarchie concernée:");
            System.out.println(group.getHierarchyInfo());
            
            // Propager la proposition aux filiales
            if (group instanceof CorporateClient) {
                proposeToSubsidiaries((CorporateClient) group, numberOfVehicles, discount);
            }
        } else {
            System.out.println("Ce client n'est pas éligible à l'achat de flotte");
        }
    }
    
    private void proposeToSubsidiaries(CorporateClient parent, int numberOfVehicles, double discount) {
        for (ClientComponent subsidiary : parent.getSubsidiaries()) {
            System.out.println("\nProposition à la filiale: " + subsidiary.getName());
            System.out.println("Nombre de véhicules alloués: " + (numberOfVehicles / (parent.getSubsidiaries().size() + 1)));
            System.out.println("Remise: " + discount + "%");
            
            if (subsidiary instanceof CorporateClient) {
                proposeToSubsidiaries((CorporateClient) subsidiary, 
                    numberOfVehicles / (parent.getSubsidiaries().size() + 1), 
                    discount * 0.8); // Réduction de remise pour les sous-filiales
            }
        }
    }
    
    public void displayAllClients() {
        System.out.println("=== LISTE DE TOUS LES CLIENTS ===");
        for (ClientComponent client : clients.values()) {
            System.out.println(client);
        }
    }
    
    public void displayHierarchy(String clientId) {
        ClientComponent client = clients.get(clientId);
        if (client != null) {
            System.out.println("=== HIÉRARCHIE CLIENT ===");
            System.out.println(client.getHierarchyInfo());
        }
    }
}
