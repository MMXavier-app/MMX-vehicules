# INF4067 - Étude de Cas Pratique 2026
## Système de Vente en Ligne de Véhicules

### Description du Projet
Application web complète de vente en ligne de véhicules implémentant 11 design patterns de conception selon les spécifications du sujet INF4067.

### Design Patterns Implémentés
1. **Abstract Factory** - Construction des objets du domaine (automobiles, scooters, essence, électrique)
2. **Builder** - Construction des liasses de documents nécessaires à l'acquisition
3. **Factory Method** - Création des commandes (comptant, crédit)
4. **Singleton** - Gestion de la liasse vierge de documents
5. **Adapter** - Gestion des documents PDF
6. **Bridge** - Implémentation des formulaires HTML/widgets
7. **Composite** - Représentation des sociétés clientes avec filiales
8. **Decorator/Observer** - Affichage du catalogue de véhicules
9. **Iterator** - Navigation séquentielle dans le catalogue
10. **Template Method** - Calcul du montant des commandes avec taxes
11. **Command** - Gestion des soldes des véhicules anciennement en stock

### Technologies Utilisées
- Backend: Java 17, Spring Boot 2.7.0
- Base de données: MySQL 8.0
- Build Tool: Maven 3.8.6
- API: RESTful
- Architecture: MVC, Repository Pattern, JPA/Hibernate

### Installation et Exécution

1. **Prérequis**
   - Java JDK 17 ou supérieur
   - Maven 3.8+
   - MySQL 8.0+
   - Git

2. **Configuration de la base de données**
   ```sql
   CREATE DATABASE vehicules_db;
   CREATE USER 'vehicules_user'@'localhost' IDENTIFIED BY 'password';
   GRANT ALL PRIVILEGES ON vehicules_db.* TO 'vehicules_user'@'localhost';
   FLUSH PRIVILEGES;
