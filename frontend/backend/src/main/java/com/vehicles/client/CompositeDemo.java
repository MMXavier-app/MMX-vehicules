package com.vehicles.client;

public class CompositeDemo {
    public static void main(String[] args) {
        System.out.println("🚗🚗🚗 DÉMONSTRATION PATTERN COMPOSITE 🚗🚗🚗");
        System.out.println("Gestion des sociétés clientes (France + Afrique)");
        System.out.println("=" .repeat(60) + "\n");
        
        ClientService clientService = new ClientService();
        
        // 1. Afficher les statistiques
        System.out.println("📊 STATISTIQUES DES CLIENTS");
        System.out.println("-".repeat(40));
        var stats = clientService.getStatistics();
        stats.forEach((key, value) -> {
            System.out.printf("%-20s : %s%n", key, value);
        });
        
        // 2. Afficher la hiérarchie française
        System.out.println("\n��🇷 HIÉRARCHIE FRANÇAISE");
        System.out.println("-".repeat(40));
        clientService.displayHierarchy("FR001");
        
        // 3. Afficher la hiérarchie camerounaise
        System.out.println("\n🇨🇲 HIÉRARCHIE CAMEROUNAISE");
        System.out.println("-".repeat(40));
        clientService.displayHierarchy("CM001");
        
        // 4. Proposer une flotte au groupe français
        System.out.println("\n📦 PROPOSITION DE FLOTTE - GROUPE FRANCE");
        System.out.println("-".repeat(40));
        var fleetProposalFR = clientService.proposeFleetToGroup("FR001", 50);
        displayFleetProposal(fleetProposalFR);
        
        // 5. Proposer une flotte au groupe camerounais
        System.out.println("\n📦 PROPOSITION DE FLOTTE - GROUPE CAMEROUN");
        System.out.println("-".repeat(40));
        var fleetProposalCM = clientService.proposeFleetToGroup("CM001", 30);
        displayFleetProposal(fleetProposalCM);
        
        // 6. Afficher tous les clients
        System.out.println("\n📋 LISTE DE TOUS LES CLIENTS");
        System.out.println("-".repeat(40));
        clientService.displayAllClients();
    }
    
    private static void displayFleetProposal(java.util.Map<String, Object> proposal) {
        if ((boolean) proposal.get("success")) {
            System.out.println("✅ " + proposal.get("message"));
            System.out.println("📌 Groupe : " + proposal.get("groupName"));
            System.out.println("🌍 Pays : " + proposal.get("country"));
            System.out.println("🚗 Véhicules totaux : " + proposal.get("totalVehicles"));
            System.out.println("💵 Remise de base : " + proposal.get("baseDiscount") + "%");
            System.out.println("📨 Propositions envoyées : " + proposal.get("totalProposals"));
            
            var proposals = (java.util.List<java.util.Map<String, Object>>) proposal.get("proposals");
            System.out.println("\n📄 Détail des propositions :");
            for (var prop : proposals) {
                System.out.printf("   • %s : %s véhicules (remise: %.1f%%)%n",
                    prop.get("clientName"), prop.get("vehicles"), prop.get("discount"));
            }
        } else {
            System.out.println("❌ " + proposal.get("message"));
        }
    }
}
