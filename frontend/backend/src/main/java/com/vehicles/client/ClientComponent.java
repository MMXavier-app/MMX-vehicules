package com.vehicles.client;

import java.util.List;

/**
 * Interface Component pour le pattern Composite
 * Représente un client (individuel ou entreprise)
 */
public interface ClientComponent {
    String getId();
    String getName();
    String getType();
    String getCountry();
    String getCity();
    
    // Méthodes pour la gestion hiérarchique
    void addSubsidiary(ClientComponent subsidiary);
    void removeSubsidiary(ClientComponent subsidiary);
    List<ClientComponent> getSubsidiaries();
    
    // Méthodes métier
    double calculateFleetDiscount();
    boolean isEligibleForFleetPurchase();
    String getHierarchyInfo();
}
