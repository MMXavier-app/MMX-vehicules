package com.mmx.command;

import com.mmx.service.VehiculeService;
import com.mmx.model.Vehicule;

/**
 * Pattern Command pour solder les véhicules
 */
class SoldeVehiculeCommand implements Command {
    private VehiculeService vehiculeService;
    private Long vehiculeId;
    private double ancienPrix;
    private double nouveauPrix;
    private boolean executed = false;
    
    public SoldeVehiculeCommand(VehiculeService vehiculeService, Long vehiculeId, double pourcentageReduction) {
        this.vehiculeService = vehiculeService;
        this.vehiculeId = vehiculeId;
        
        Vehicule vehicule = vehiculeService.getVehiculeById(vehiculeId);
        if (vehicule != null) {
            this.ancienPrix = vehicule.getPrix();
            this.nouveauPrix = ancienPrix * (1 - pourcentageReduction / 100);
        }
    }
    
    @Override
    public void execute() {
        if (!executed) {
            Vehicule vehicule = vehiculeService.getVehiculeById(vehiculeId);
            if (vehicule != null) {
                vehicule.setPrix(nouveauPrix);
                vehiculeService.updateVehicule(vehicule);
                System.out.println("Véhicule " + vehiculeId + " soldé: " + ancienPrix + "€ -> " + nouveauPrix + "€");
            }
            executed = true;
        }
    }
    
    @Override
    public void undo() {
        if (executed) {
            Vehicule vehicule = vehiculeService.getVehiculeById(vehiculeId);
            if (vehicule != null) {
                vehicule.setPrix(ancienPrix);
                vehiculeService.updateVehicule(vehicule);
                System.out.println("Annulation solde véhicule " + vehiculeId + ": " + nouveauPrix + "€ -> " + ancienPrix + "€");
            }
            executed = false;
        }
    }
}

class CommandInvoker {
    private Command command;
    
    public void setCommand(Command command) {
        this.command = command;
    }
    
    public void executeCommand() {
        if (command != null) {
            command.execute();
        }
    }
    
    public void undoCommand() {
        if (command != null) {
            command.undo();
        }
    }
}
