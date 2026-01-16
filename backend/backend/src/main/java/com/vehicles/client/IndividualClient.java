package com.vehicles.client;

import java.util.ArrayList;
import java.util.List;

/**
 * Leaf - Client individuel (pas de filiales)
 */
public class IndividualClient implements ClientComponent {
    private String id;
    private String name;
    private String country;
    private String email;
    private String phone;
    
    public IndividualClient(String id, String name, String country, String email, String phone) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.email = email;
        this.phone = phone;
    }
    
    @Override
    public String getId() { return id; }
    
    @Override
    public String getName() { return name; }
    
    @Override
    public String getType() { return "INDIVIDUAL"; }
    
    @Override
    public String getCountry() { return country; }
    
    @Override
    public void addSubsidiary(ClientComponent subsidiary) {
        throw new UnsupportedOperationException("Un client individuel ne peut pas avoir de filiales");
    }
    
    @Override
    public void removeSubsidiary(ClientComponent subsidiary) {
        throw new UnsupportedOperationException("Un client individuel ne peut pas avoir de filiales");
    }
    
    @Override
    public List<ClientComponent> getSubsidiaries() {
        return new ArrayList<>();
    }
    
    @Override
    public double calculateFleetDiscount() {
        return 0.0; // Pas de remise pour les particuliers
    }
    
    @Override
    public boolean isEligibleForFleetPurchase() {
        return false; // Pas éligible à l'achat de flotte
    }
    
    @Override
    public String getHierarchyInfo() {
        return String.format("Client Individuel: %s (%s, %s)", name, email, country);
    }
    
    // Getters supplémentaires
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    
    @Override
    public String toString() {
        return getHierarchyInfo();
    }
}
