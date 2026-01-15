package com.vehicles.client;

import java.util.*;

public class CorporateClient implements ClientComponent {
    private String id;
    private String name;
    private String country;
    private String city;
    private String siret;
    private String businessType;
    private List<ClientComponent> subsidiaries;
    
    public CorporateClient(String id, String name, String country, 
                          String siret, String businessType, String city) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.city = city;
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
    public String getCity() { return city; }
    
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
        double baseDiscount = 5.0;
        double sizeBonus = Math.min(subsidiaries.size() * 2.0, 15.0);
        
        // Bonus pour les sociétés africaines
        double africanBonus = isAfricanCompany() ? 8.0 : 0.0;
        
        // Bonus spécial Cameroun
        double cameroonBonus = "Cameroun".equals(country) ? 5.0 : 0.0;
        
        return Math.min(baseDiscount + sizeBonus + africanBonus + cameroonBonus, 35.0);
    }
    
    @Override
    public boolean isEligibleForFleetPurchase() {
        return businessType.equals("HOLDING") || 
               businessType.equals("DISTRIBUTION") || 
               businessType.equals("LOCATION") ||
               businessType.equals("CONCESSION");
    }
    
    @Override
    public String getHierarchyInfo() {
        StringBuilder sb = new StringBuilder();
        String flag = getCountryFlag(country);
        String emoji = getBusinessTypeEmoji(businessType);
        
        sb.append(String.format("%s %s %s\n", flag, emoji, name));
        sb.append(String.format("   📍 %s, %s\n", city, country));
        sb.append(String.format("   📄 %s\n", siret));
        sb.append(String.format("   🏷️  Type: %s\n", businessType));
        sb.append(String.format("   👥 %d filiale(s) directe(s)\n", subsidiaries.size()));
        
        if (!subsidiaries.isEmpty()) {
            sb.append("   └── 📋 Filiales :\n");
            for (int i = 0; i < subsidiaries.size(); i++) {
                ClientComponent sub = subsidiaries.get(i);
                String prefix = (i == subsidiaries.size() - 1) ? "       └── " : "       ├── ";
                
                if (sub instanceof CorporateClient) {
                    CorporateClient corpSub = (CorporateClient) sub;
                    String subFlag = getCountryFlag(corpSub.getCountry());
                    String subEmoji = getBusinessTypeEmoji(corpSub.getType());
                    
                    sb.append(String.format("%s%s %s %s\n",
                        prefix, subFlag, subEmoji, corpSub.getName()));
                    sb.append(String.format("           📍 %s, %s\n",
                        corpSub.getCity(), corpSub.getCountry()));
                }
            }
        }
        
        return sb.toString();
    }
    
    private boolean isAfricanCompany() {
        String[] africanCountries = {
            "Cameroun", "Sénégal", "Côte d'Ivoire", "Gabon",
            "Maroc", "Tunisie", "Algérie", "Mali", 
            "Burkina Faso", "Bénin", "Togo", "Ghana",
            "Nigeria", "Congo", "RDC", "Rwanda"
        };
        return Arrays.asList(africanCountries).contains(country);
    }
    
    private String getCountryFlag(String country) {
        switch(country) {
            case "France": return "🇫🇷";
            case "Cameroun": return "🇨🇲";
            case "Sénégal": return "🇸🇳";
            case "Côte d'Ivoire": return "🇨🇮";
            case "Gabon": return "🇬🇦";
            case "Maroc": return "🇲🇦";
            case "Tunisie": return "🇹🇳";
            case "Algérie": return "🇩🇿";
            default: return "🌍";
        }
    }
    
    private String getBusinessTypeEmoji(String type) {
        switch(type) {
            case "HOLDING": return "🏢";
            case "DISTRIBUTION": return "🚛";
            case "LOCATION": return "📋";
            case "CONCESSION": return "🏪";
            case "SUBSIDIARY": return "🏣";
            default: return "🏛️";
        }
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
        String flag = getCountryFlag(country);
        String emoji = getBusinessTypeEmoji(businessType);
        return String.format("%s %s %s [%s, %s] - %d filiale(s)", 
            flag, emoji, name, city, country, subsidiaries.size());
    }
}
