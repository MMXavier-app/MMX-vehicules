package com.mmx.model;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "commandes")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type_paiement", discriminatorType = DiscriminatorType.STRING)
public abstract class Commande {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "numero_commande", nullable = false, unique = true)
    private String numeroCommande;
    
    @Column(name = "date_commande", nullable = false)
    private LocalDate dateCommande;
    
    @Column(name = "client_nom", nullable = false)
    private String clientNom;
    
    @Column(name = "client_email")
    private String clientEmail;
    
    @Column(name = "montant_total", nullable = false)
    private double montantTotal;
    
    @Column(name = "statut")
    private String statut = "EN_ATTENTE"; // EN_ATTENTE, VALIDEE, LIVREE
    
    // Relations (simplifiées pour l'exemple)
    @Transient
    private List<Vehicule> vehicules = new ArrayList<>();
    
    // Getters and setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getNumeroCommande() {
        return numeroCommande;
    }
    
    public void setNumeroCommande(String numeroCommande) {
        this.numeroCommande = numeroCommande;
    }
    
    public LocalDate getDateCommande() {
        return dateCommande;
    }
    
    public void setDateCommande(LocalDate dateCommande) {
        this.dateCommande = dateCommande;
    }
    
    public String getClientNom() {
        return clientNom;
    }
    
    public void setClientNom(String clientNom) {
        this.clientNom = clientNom;
    }
    
    public String getClientEmail() {
        return clientEmail;
    }
    
    public void setClientEmail(String clientEmail) {
        this.clientEmail = clientEmail;
    }
    
    public double getMontantTotal() {
        return montantTotal;
    }
    
    public void setMontantTotal(double montantTotal) {
        this.montantTotal = montantTotal;
    }
    
    public String getStatut() {
        return statut;
    }
    
    public void setStatut(String statut) {
        this.statut = statut;
    }
    
    public List<Vehicule> getVehicules() {
        return vehicules;
    }
    
    public void setVehicules(List<Vehicule> vehicules) {
        this.vehicules = vehicules;
    }
    
    public void addVehicule(Vehicule vehicule) {
        this.vehicules.add(vehicule);
    }
    
    public abstract String getTypePaiement();
    public abstract void traiterPaiement();
}
