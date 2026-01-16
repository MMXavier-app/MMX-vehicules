package com.mmx.decorator;

class BasicVehiculeDisplay implements VehiculeDisplay {
    private String modele;
    private double prix;
    
    public BasicVehiculeDisplay(String modele, double prix) {
        this.modele = modele;
        this.prix = prix;
    }
    
    @Override
    public String display() {
        return modele + " - " + prix + " €";
    }
}

abstract class DisplayDecorator implements VehiculeDisplay {
    protected VehiculeDisplay decoratedDisplay;
    
    public DisplayDecorator(VehiculeDisplay decoratedDisplay) {
        this.decoratedDisplay = decoratedDisplay;
    }
    
    @Override
    public String display() {
        return decoratedDisplay.display();
    }
}

class VehiculeWithImage extends DisplayDecorator {
    private String imageUrl;
    
    public VehiculeWithImage(VehiculeDisplay decoratedDisplay, String imageUrl) {
        super(decoratedDisplay);
        this.imageUrl = imageUrl;
    }
    
    @Override
    public String display() {
        return super.display() + " [Image: " + imageUrl + "]";
    }
}

class VehiculeWithOptions extends DisplayDecorator {
    private String options;
    
    public VehiculeWithOptions(VehiculeDisplay decoratedDisplay, String options) {
        super(decoratedDisplay);
        this.options = options;
    }
    
    @Override
    public String display() {
        return super.display() + " [Options: " + options + "]";
    }
}

class VehiculeWithAnimation extends DisplayDecorator {
    private String animationUrl;
    
    public VehiculeWithAnimation(VehiculeDisplay decoratedDisplay, String animationUrl) {
        super(decoratedDisplay);
        this.animationUrl = animationUrl;
    }
    
    @Override
    public String display() {
        return super.display() + " [Animation: " + animationUrl + "]";
    }
}
