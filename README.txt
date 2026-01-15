MMX VENTE EN LIGNE DES VÉHICULES
================================

DESCRIPTION
-----------
Application web complète de vente en ligne de véhicules (automobiles et scooters)
implémentant les patrons de conception vus en cours.

ARCHITECTURE
------------
- Backend: Java Spring Boot (Port: 8080)
- Frontend: React.js avec Tailwind CSS (Port: 3000)
- Base de données: MySQL (Port: 3306)
- Patrons de conception: Abstract Factory, Builder, Factory Method, Singleton,
  Adapter, Bridge, Composite, Decorator, Observer, Iterator, Template Method, Command

PRÉREQUIS
---------
1. Java 17 ou supérieur
2. Node.js 18 ou supérieur
3. MySQL 8.0 ou supérieur
4. Maven 3.8 ou supérieur

INSTALLATION
------------

1. BASE DE DONNÉES
------------------
$ mysql -u root -p
> CREATE DATABASE mmx_vehicules;
> USE mmx_vehicules;
> source database/schema.sql;
> exit

2. BACKEND (Spring Boot)
------------------------
$ cd backend
$ mvn clean install
$ mvn spring-boot:run

Le backend sera disponible sur: http://localhost:8080
API Documentation: http://localhost:8080/api/vehicules

3. FRONTEND (React)
-------------------
$ cd frontend
$ npm install
$ npm run dev

Le frontend sera disponible sur: http://localhost:3000

TEST DE L'APPLICATION
---------------------

1. Accéder à http://localhost:3000
2. Identifiants par défaut: admin / admin123
3. Fonctionnalités disponibles:
   - Catalogue des véhicules
   - Recherche et filtrage
   - Gestion des commandes
   - Gestion des clients
   - Génération de documents
   - Système de panier

PATRONS IMPLÉMENTÉS
-------------------

1. Abstract Factory: Création des véhicules (essence/électrique)
2. Builder: Construction des liasses de documents
3. Factory Method: Création des commandes (comptant/crédit)
4. Singleton: Liasse vierge de documents
5. Adapter: Gestion des documents PDF
6. Bridge: Formulaires HTML/widgets
7. Composite: Sociétés clientes avec filiales
8. Decorator: Affichage des véhicules avec options
9. Observer: Mises à jour du catalogue
10. Iterator: Parcours séquentiel du catalogue
11. Template Method: Calcul des taxes
12. Command: Solder les véhicules anciens

STRUCTURE DES DONNÉES
---------------------
- Véhicules: automobiles, scooters (essence/électrique)
- Clients: particuliers, sociétés
- Commandes: comptant, crédit
- Documents: PDF, HTML
- Options: sièges cuir, toit ouvrant, etc.

CONTACT ET SUPPORT
------------------
Pour toute question ou problème, consulter la documentation technique
dans le dossier /docs.

Bon développement !
