#!/bin/bash

echo "=== DÉPLOIEMENT MMX-VÉHICULES ==="
echo "Date: $(date)"
echo ""

# Vérifier la structure
echo "📁 Structure du projet :"
ls -la
echo ""
echo "📁 Backend :"
ls -la backend/
echo ""
echo "📁 Frontend :"
ls -la frontend/

# Ajouter les fichiers
echo -e "\n📦 Ajout des fichiers..."
git add .

# Vérifier les fichiers ajoutés
echo -e "\n📋 Fichiers à commiter :"
git status --short

# Créer le commit
COMMIT_MSG="Application complète MMX-Véhicules - $(date '+%d/%m/%Y %H:%M')"
echo -e "\n💾 Création du commit : $COMMIT_MSG"
git commit -m "$COMMIT_MSG

Détails de l'application :

BACKEND (Java Spring Boot) :
- Architecture MVC complète
- API REST avec endpoints
- Modèles de données véhicules
- Services et repositories
- Configuration Spring Security
- Tests unitaires et d'intégration
- Base de données H2/PostgreSQL

FRONTEND (React + Vite) :
- Application React moderne
- Tailwind CSS pour le styling
- Composants réutilisables
- Gestion d'état React
- Routing avec React Router
- Formulaire de gestion véhicules
- Interface responsive

INFRASTRUCTURE :
- Build Maven pour backend
- Build Vite pour frontend
- Configuration multi-environnements
- Scripts de déploiement
- Documentation complète

FONCTIONNALITÉS :
- Gestion complète des véhicules
- Recherche et filtrage
- CRUD operations
- Interface admin
- Rapports et statistiques"

# Renommer la branche en main si nécessaire
echo -e "\n🌿 Vérification de la branche..."
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "Renommage de '$CURRENT_BRANCH' en 'main'..."
    git branch -M main
fi

# Push vers GitHub
echo -e "\n🚀 Push vers GitHub..."
echo "Dépôt: https://github.com/MMXavier-app/MMX-vehicules"
git push -u origin main

echo -e "\n✅ DÉPLOIEMENT TERMINÉ !"
echo "📊 Accédez à votre dépôt : https://github.com/MMXavier-app/MMX-vehicules"
echo "🔧 Pour cloner : git clone https://github.com/MMXavier-app/MMX-vehicules.git"
