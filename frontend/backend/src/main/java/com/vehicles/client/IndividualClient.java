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
    private String city;
    private String email;
    private String phone;
    
    public IndividualClient(String id, String name, String country, 
                          String email, String phone, String city) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.city = city;
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
    public String getCity() { return city; }
    
    @Override
    public void addSubsidiary(ClientComponent subsidiary) {
        throw new UnsupportedOperationException("❌ Un client individuel ne peut pas avoir de filiales");
    }
    
    @Override
    public void removeSubsidiary(ClientComponent subsidiary) {
        throw new UnsupportedOperationException("❌ Un client individuel ne peut pas avoir de filiales");
    }
    
    @Override
    public List<ClientComponent> getSubsidiaries() {
        return new ArrayList<>();
    }
    
    @Override
    public double calculateFleetDiscount() {
        return 0.0;
    }
    
    @Override
    public boolean isEligibleForFleetPurchase() {
        return false;
    }
    
    @Override
    public String getHierarchyInfo() {
        String flag = getCountryFlag(country);
        return String.format("%s 👤 %s - Client Individuel\n" +
                           "   📍 %s, %s\n" +
                           "   📧 %s\n" +
                           "   📞 %s", 
            flag, name, city, country, email, phone);
    }
    
    private String getCountryFlag(String country) {
        switch(country) {
            case "France": return "🇫🇷";
            case "Cameroun": return "🇨🇲";
            case "Sénégal": return "🇸🇳";
            case "Côte d'Ivoire": return "🇨��";
            case "Gabon": return "🇬🇦";
            default: return "👤";
        }
    }
    
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    
    @Override
    public String toString() {
        String flag = getCountryFlag(country);
        return String.format("%s 👤 %s [%s, %s]", flag, name, city, country);
    }
}
