package com.mmx.observer;

import java.util.ArrayList;
import java.util.List;

class CatalogueVehicule implements Subject {
    private List<Observer> observers = new ArrayList<>();
    private String dernierVehiculeAjoute;
    
    public void ajouterVehicule(String vehicule) {
        this.dernierVehiculeAjoute = vehicule;
        System.out.println("Nouveau véhicule ajouté: " + vehicule);
        notifyObservers();
    }
    
    @Override
    public void registerObserver(Observer observer) {
        observers.add(observer);
    }
    
    @Override
    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }
    
    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update("Nouveau véhicule disponible: " + dernierVehiculeAjoute);
        }
    }
}

class ClientNotifier implements Observer {
    private String nom;
    
    public ClientNotifier(String nom) {
        this.nom = nom;
    }
    
    @Override
    public void update(String message) {
        System.out.println("Notification pour " + nom + ": " + message);
    }
}

class StockManager implements Observer {
    @Override
    public void update(String message) {
        System.out.println("Gestionnaire de stock notifié: " + message);
    }
}
