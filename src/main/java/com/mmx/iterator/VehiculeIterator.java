package com.mmx.iterator;

import java.util.List;

public interface VehiculeIterator {
    boolean hasNext();
    Object next();
    void reset();
}

class CatalogueIterator implements VehiculeIterator {
    private List<String> vehicules;
    private int position = 0;
    
    public CatalogueIterator(List<String> vehicules) {
        this.vehicules = vehicules;
    }
    
    @Override
    public boolean hasNext() {
        return position < vehicules.size();
    }
    
    @Override
    public Object next() {
        if (hasNext()) {
            return vehicules.get(position++);
        }
        return null;
    }
    
    @Override
    public void reset() {
        position = 0;
    }
}

class CatalogueVehicules {
    private List<String> vehicules;
    
    public CatalogueVehicules(List<String> vehicules) {
        this.vehicules = vehicules;
    }
    
    public VehiculeIterator createIterator() {
        return new CatalogueIterator(vehicules);
    }
    
    public void addVehicule(String vehicule) {
        vehicules.add(vehicule);
    }
}
