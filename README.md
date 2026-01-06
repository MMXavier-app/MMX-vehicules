# INF4067 - Système de Vente de Véhicules

## Progression étape par étape des Design Patterns

### Étape actuelle : Abstract Factory Pattern
- Structure du projet
- Modèles de domaine (Vehicule, Client, Commande)
- Abstract Factory Pattern (VehiculeFactory, EssenceFactory, ElectriqueFactory)
- Prochain : Builder Pattern

### Plan de progression
1. Structure de base
2. Modèles de domaine (Vehicule, Client, Commande)
3. Abstract Factory Pattern
4. Builder Pattern
5. Factory Method Pattern
6. Singleton Pattern
7. Adapter Pattern
8. Bridge Pattern
9. Composite Pattern
10. Decorator Pattern
11.  Observer Pattern
12.  Iterator Pattern
13.  Template Method Pattern
14.  Command Pattern
15.  Interface web
16.  API REST + Base de données

### Détails de l'implémentation
**Abstract Factory Pattern**: Permet de créer des familles d'objets liés sans spécifier leurs classes concrètes.
- `VehiculeFactory`: Interface commune pour la création de véhicules
- `EssenceFactory`: Implémentation pour les véhicules essence
- `ElectriqueFactory`: Implémentation pour les véhicules électriques

**Avantages**:
- Séparation entre création et utilisation
- Extensibilité facile (ajouter une nouvelle factory)
- Cohérence des familles d'objets créés

### Test du pattern
Exécuter: `cd backend && javac -cp . src/main/java/com/vehicules/patterns/factory/*.java src/main/java/com/vehicules/model/*.java src/test/java/com/vehicules/AbstractFactoryDemo.java && java -cp .:src/main/java com.vehicules.AbstractFactoryDemo`

### Dépôt GitHub
https://github.com/MMXavier-app/INF4067_Vehicules_2026
