package com.mmx.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "vehicules")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type_vehicule", discriminatorType = DiscriminatorType.STRING)
public abstract class Vehicule {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String marque;
    
    @Column(nullable = false)
    private String modele;
    
    @Column(nullable = false)
    private double prix;
    
    @Column(name = "annee_fabrication")
    private int anneeFabrication;
    
    @Column(name = "couleur")
    private String couleur;
    
    @Column(name = "kilometrage")
    private int kilometrage;
    
    @Column(name = "en_stock")
    private boolean enStock = true;
    
    @Column(name = "stock")
    private int stock = 1;
    
    @Column(name = "date_ajout")
    private LocalDate dateAjout;
    
    // Constructeur par défaut
    public Vehicule() {
        this.dateAjout = LocalDate.now();
    }
    
    // Getters and setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getMarque() {
        return marque;
    }
    
    public void setMarque(String marque) {
        this.marque = marque;
    }
    
    public String getModele() {
        return modele;
    }
    
    public void setModele(String modele) {
        this.modele = modele;
    }
    
    public double getPrix() {
        return prix;
    }
    
    public void setPrix(double prix) {
        this.prix = prix;
    }
    
    public int getAnneeFabrication() {
        return anneeFabrication;
    }
    
    public void setAnneeFabrication(int anneeFabrication) {
        this.anneeFabrication = anneeFabrication;
    }
    
    public String getCouleur() {
        return couleur;
    }
    
    public void setCouleur(String couleur) {
        this.couleur = couleur;
    }
    
    public int getKilometrage() {
        return kilometrage;
    }
    
    public void setKilometrage(int kilometrage) {
        this.kilometrage = kilometrage;
    }
    
    public boolean isEnStock() {
        return enStock;
    }
    
    public void setEnStock(boolean enStock) {
        this.enStock = enStock;
    }
    
    public int getStock() {
        return stock;
    }
    
    public void setStock(int stock) {
        this.stock = stock;
    }
    
    public LocalDate getDateAjout() {
        return dateAjout;
    }
    
    public void setDateAjout(LocalDate dateAjout) {
        this.dateAjout = dateAjout;
    }
    
    // Méthodes abstraites
    public abstract String getType();
    
    public abstract String getDetailsTechniques();
}
