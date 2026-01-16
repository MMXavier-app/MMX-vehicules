package com.vehicles.client;

import java.util.ArrayList;
import java.util.List;

/**
 * Composite - Société pouvant avoir des filiales
 */
public class CorporateClient implements ClientComponent {
    private String id;
    private String name;
    private String country;
    private String siret;
    private String businessType; // HOLDING, DISTRIBUTION, LOCATION, SUBSIDIARY
    private List<ClientComponent> subsidiaries;
    
    public CorporateClient(String id, String name, String country, String siret, String businessType) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.siret = siret;
        this.businessType = businessType;
        this.subsidiaries = new ArrayList<>();
    }
    
    @Override
    public String getId() { return id; }
    
    @Override
    public String getName() { return name; }
    
    @Override
    public String getType() { return businessType; }
    
    @Override
    public String getCountry() { return country; }
    
    @Override
    public void addSubsidiary(ClientComponent subsidiary) {
        subsidiaries.add(subsidiary);
    }
    
    @Override
    public void removeSubsidiary(ClientComponent subsidiary) {
        subsidiaries.remove(subsidiary);
    }
    
    @Override
    public List<ClientComponent> getSubsidiaries() {
        return new ArrayList<>(subsidiaries);
    }
    
    @Override
    public double calculateFleetDiscount() {
        // Calcul de remise basé sur le nombre de filiales
        double baseDiscount = 5.0; // 5% de base
        double subsidiaryBonus = subsidiaries.size() * 1.5; // 1.5% par filiale
        return Math.min(baseDiscount + subsidiaryBonus, 25.0); // Max 25%
    }
    
    @Override
    public boolean isEligibleForFleetPurchase() {
        // Éligible si c'est une holding, distribution ou location
        return businessType.equals("HOLDING") || 
               businessType.equals("DISTRIBUTION") || 
               businessType.equals("LOCATION");
    }
    
    @Override
    public String getHierarchyInfo() {
        StringBuilder sb = new StringBuilder();
        sb.append(String.format("Société: %s (%s, %s)\n", name, businessType, country));
        sb.append(String.format("SIRET: %s - %d filiale(s)\n", siret, subsidiaries.size()));
        
        if (!subsidiaries.isEmpty()) {
            sb.append("Filiales:\n");
            for (ClientComponent subsidiary : subsidiaries) {
                String[] lines = subsidiary.getHierarchyInfo().split("\n");
                for (String line : lines) {
                    sb.append("  ").append(line).append("\n");
                }
            }
        }
        
        return sb.toString();
    }
    
    public String getSiret() { return siret; }
    
    public int getTotalSubsidiariesCount() {
        int count = subsidiaries.size();
        for (ClientComponent subsidiary : subsidiaries) {
            if (subsidiary instanceof CorporateClient) {
                count += ((CorporateClient) subsidiary).getTotalSubsidiariesCount();
            }
        }
        return count;
    }
    
    @Override
    public String toString() {
        return String.format("%s [%s] - %d filiale(s)", name, businessType, subsidiaries.size());
    }
}
