# Documentation des Patrons de Conception - MMX Véhicules

## 1. Abstract Factory (Patron 1)
**Objectif** : Créer des familles d'objets liés (véhicules essence/électrique)
**Implémentation** : 
- `VehiculeFactory` (interface)
- `EssenceFactory` (créé AutomobileEssence et ScooterEssence)
- `ElectriqueFactory` (créé AutomobileElectrique et ScooterElectrique)
**Emplacement** : `/backend/src/main/java/com/mmx/factory/`

## 2. Builder (Patron 2)
**Objectif** : Construire des objets complexes (liasses de documents)
**Implémentation** :
- `DocumentBuilder` (construit étape par étape)
- `LiasseDocument` (objet complexe final)
**Emplacement** : `/backend/src/main/java/com/mmx/builder/`

## 3. Factory Method (Patron 3)
**Objectif** : Créer des commandes sans spécifier la classe exacte
**Implémentation** :
- `CommandeFactory` (créé CommandeComptant ou CommandeCredit)
**Emplacement** : `/backend/src/main/java/com/mmx/factory/CommandeFactory.java`

## 4. Singleton (Patron 4)
**Objectif** : Assurer qu'une classe n'a qu'une seule instance
**Implémentation** :
- `LiasseVierge` (instance unique de liasse vierge)
**Emplacement** : `/backend/src/main/java/com/mmx/singleton/`

## 5. Adapter (Patron 5)
**Objectif** : Adapter une interface à une autre (documents PDF)
**Implémentation** :
- `PdfAdapter` (interface)
- `PdfAdapterImpl` (adapte PdfLibrary)
**Emplacement** : `/backend/src/main/java/com/mmx/adapter/`

## 6. Bridge (Patron 6)
**Objectif** : Séparer l'abstraction de l'implémentation (formulaires)
**Implémentation** :
- `FormRenderer` (interface)
- `HtmlFormRenderer`, `WidgetFormRenderer` (implémentations)
- `Form` (abstraction)
**Emplacement** : `/backend/src/main/java/com/mmx/bridge/`

## 7. Composite (Patron 7)
**Objectif** : Traiter des sociétés et filiales uniformément
**Implémentation** :
- `SocieteClient` (interface)
- `SocieteSimple`, `SocieteAvecFiliales` (implémentations)
**Emplacement** : `/backend/src/main/java/com/mmx/composite/`

## 8. Decorator (Patron 8)
**Objectif** : Ajouter dynamiquement des fonctionnalités d'affichage
**Implémentation** :
- `VehiculeDisplay` (interface)
- `BasicVehiculeDisplay` (concret)
- `VehiculeWithImage`, `VehiculeWithOptions`, `VehiculeWithAnimation` (décorateurs)
**Emplacement** : `/backend/src/main/java/com/mmx/decorator/`

## 9. Observer (Patron 8)
**Objectif** : Notifier les observateurs des changements
**Implémentation** :
- `Observer`, `Subject` (interfaces)
- `CatalogueVehicule` (sujet observable)
- `ClientNotifier`, `StockManager` (observateurs)
**Emplacement** : `/backend/src/main/java/com/mmx/observer/`

## 10. Iterator (Patron 9)
**Objectif** : Parcourir séquentiellement une collection
**Implémentation** :
- `VehiculeIterator` (interface)
- `CatalogueIterator` (implémentation)
- `CatalogueVehicules` (collection)
**Emplacement** : `/backend/src/main/java/com/mmx/iterator/`

## 11. Template Method (Patron 10)
**Objectif** : Définir le squelette d'un algorithme (calcul taxes)
**Implémentation** :
- `CalculateurTaxe` (classe abstraite avec template)
- `CalculateurTaxeCommande` (implémentation concrète)
**Emplacement** : `/backend/src/main/java/com/mmx/template/`

## 12. Command (Patron 11)
**Objectif** : Encapsuler une requête comme un objet
**Implémentation** :
- `Command` (interface)
- `SoldeVehiculeCommand` (commande concrète)
- `CommandInvoker` (invocateur)
**Emplacement** : `/backend/src/main/java/com/mmx/command/`

## Tests des patrons
Pour tester tous les patrons : `curl http://localhost:8080/api/test/patterns`
