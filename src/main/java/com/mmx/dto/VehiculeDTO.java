package com.mmx.dto;

public class VehiculeDTO {
    private Long id;
    private String modele;
    private String marque;
    private double prix;
    private int stock;
    private String energie;
    private String description;
    private String imageUrl;
    private String typeVehicule;
    
    // Constructeurs
    public VehiculeDTO() {}
    
    public VehiculeDTO(Long id, String modele, String marque, double prix, int stock, 
                      String energie, String description, String typeVehicule) {
        this.id = id;
        this.modele = modele;
        this.marque = marque;
        this.prix = prix;
        this.stock = stock;
        this.energie = energie;
        this.description = description;
        this.typeVehicule = typeVehicule;
    }
    
    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getModele() { return modele; }
    public void setModele(String modele) { this.modele = modele; }
    
    public String getMarque() { return marque; }
    public void setMarque(String marque) { this.marque = marque; }
    
    public double getPrix() { return prix; }
    public void setPrix(double prix) { this.prix = prix; }
    
    public int getStock() { return stock; }
    public void setStock(int stock) { this.stock = stock; }
    
    public String getEnergie() { return energie; }
    public void setEnergie(String energie) { this.energie = energie; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    
    public String getTypeVehicule() { return typeVehicule; }
    public void setTypeVehicule(String typeVehicule) { this.typeVehicule = typeVehicule; }
}
