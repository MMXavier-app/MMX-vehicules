package com.mmx.controller;

import com.mmx.builder.DocumentBuilder;
import com.mmx.builder.LiasseDocument;
import com.mmx.singleton.LiasseVierge;
import com.mmx.service.LiasseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/liasse")
@CrossOrigin(origins = "http://localhost:5173")
public class LiasseController {
    
    @Autowired
    private LiasseService liasseService;
    
    @PostMapping("/generer")
    public ResponseEntity<?> genererLiasse(@RequestBody LiasseRequest request) {
        try {
            System.out.println("Génération de liasse pour la commande: " + request.getOrderId());
            
            // Utiliser le service
            LiasseDocument liasse = liasseService.genererLiasseComplete(
                request.getOrderId(),
                request.getClientName(),
                request.getVehicleModel(),
                request.getPrice(),
                request.getOptions(),
                request.getFormat()
            );
            
            // Générer un résumé
            String resume = liasseService.genererResumeLiasse(liasse);
            
            // Préparer la réponse
            LiasseResponse response = new LiasseResponse(
                resume,
                request.getOrderId(),
                liasse.getFormat(),
                new java.util.Date().toString(),
                3,
                liasse.getDemandeImmatriculation().substring(0, Math.min(150, liasse.getDemandeImmatriculation().length())),
                liasse.getCertificatCession().substring(0, Math.min(150, liasse.getCertificatCession().length())),
                liasse.getBonCommande().substring(0, Math.min(150, liasse.getBonCommande().length()))
            );
            
            System.out.println("✅ Liasse générée avec succès pour la commande " + request.getOrderId());
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de la génération: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("Erreur: " + e.getMessage()));
        }
    }
    
    @GetMapping("/test")
    public ResponseEntity<String> testLiasse() {
        try {
            // Test du Singleton
            LiasseVierge liasseVierge1 = LiasseVierge.getInstance();
            LiasseVierge liasseVierge2 = LiasseVierge.getInstance();
            
            // Test du Builder
            DocumentBuilder builder = new DocumentBuilder();
            builder.setDemandeImmatriculation("Test d'immatriculation")
                   .setCertificatCession("Test de cession")
                   .setBonCommande("Test de commande")
                   .setFormat("PDF");
            
            LiasseDocument liasse = builder.build();
            
            return ResponseEntity.ok(
                "✅ Test réussi!\n" +
                "Singleton: " + (liasseVierge1 == liasseVierge2 ? "OK" : "ERREUR") + "\n" +
                "Builder: Liasse créée au format " + liasse.getFormat() + "\n" +
                "Documents générés: 3"
            );
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body("❌ Test échoué: " + e.getMessage());
        }
    }
    
    // Classes pour les requêtes et réponses
    public static class LiasseRequest {
        private Long orderId;
        private String clientName;
        private String vehicleModel;
        private double price;
        private String format = "PDF";
        private String[] options;
        
        // Getters et Setters
        public Long getOrderId() { return orderId; }
        public void setOrderId(Long orderId) { this.orderId = orderId; }
        
        public String getClientName() { return clientName; }
        public void setClientName(String clientName) { this.clientName = clientName; }
        
        public String getVehicleModel() { return vehicleModel; }
        public void setVehicleModel(String vehicleModel) { this.vehicleModel = vehicleModel; }
        
        public double getPrice() { return price; }
        public void setPrice(double price) { this.price = price; }
        
        public String getFormat() { return format; }
        public void setFormat(String format) { this.format = format; }
        
        public String[] getOptions() { return options; }
        public void setOptions(String[] options) { this.options = options; }
    }
    
    public static class LiasseResponse {
        private String message;
        private Long orderId;
        private String format;
        private String generationDate;
        private int documentCount;
        private String demandePreview;
        private String certificatPreview;
        private String bonPreview;
        
        public LiasseResponse(String message, Long orderId, String format, 
                             String generationDate, int documentCount,
                             String demandePreview, String certificatPreview, 
                             String bonPreview) {
            this.message = message;
            this.orderId = orderId;
            this.format = format;
            this.generationDate = generationDate;
            this.documentCount = documentCount;
            this.demandePreview = demandePreview;
            this.certificatPreview = certificatPreview;
            this.bonPreview = bonPreview;
        }
        
        // Getters
        public String getMessage() { return message; }
        public Long getOrderId() { return orderId; }
        public String getFormat() { return format; }
        public String getGenerationDate() { return generationDate; }
        public int getDocumentCount() { return documentCount; }
        public String getDemandePreview() { return demandePreview; }
        public String getCertificatPreview() { return certificatPreview; }
        public String getBonPreview() { return bonPreview; }
    }
    
    public static class ErrorResponse {
        private String error;
        
        public ErrorResponse(String error) {
            this.error = error;
        }
        
        public String getError() { return error; }
    }
}
