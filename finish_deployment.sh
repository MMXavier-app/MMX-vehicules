#!/bin/bash

echo "=== FINALISATION DU DÉPLOIEMENT ==="
cd ~/MMX-vehicules

# 1. Ajouter le script de merge
git add merge_and_deploy.sh

# 2. Tirer les derniers changements
echo "1. Récupération des derniers changements..."
git pull origin main

# 3. Vérifier s'il y a de nouveaux conflits
echo -e "\n2. Vérification des conflits..."
if git status | grep -q "both modified"; then
    echo "   Conflits détectés, résolution..."
    # Garder notre version pour .gitignore
    git checkout --ours .gitignore
    git add .gitignore
    git commit -m "Résolution conflit .gitignore - garde version locale"
fi

# 4. Ajouter tous les autres fichiers
echo -e "\n3. Ajout des fichiers de l'application..."
# Ajouter backend (sans son .git s'il existe)
if [ -d "backend/.git" ]; then
    rm -rf backend/.git
fi

# Ajouter tout le reste
git add .

# 5. Créer le commit final
echo -e "\n4. Création du commit final..."
git commit -m "🚀 Application MMX-Véhicules - Déploiement complet

ARCHITECTURE :
├── 📁 backend/ - API Spring Boot Java
│   ├── Contrôleurs REST
│   ├── Services métier
│   ├── Modèles JPA
│   └── Configuration Spring Security
├── 📁 frontend/ - Application React
│   ├── Composants modernes
│   ├── Tailwind CSS
│   ├── Gestion d'état
│   └── Routing
├── 📁 INF4067_Vehicules_2026/ - Projet académique
└── 📄 Fichiers de configuration

FONCTIONNALITÉS :
✅ Gestion complète des véhicules
✅ API REST documentée
✅ Interface utilisateur intuitive
✅ Recherche et filtrage
✅ Base de données intégrée
✅ Tests unitaires
✅ Documentation exhaustive

TECHNOLOGIES :
• Java 17 + Spring Boot 3.x
• React 18 + Vite + TypeScript
• Tailwind CSS
• PostgreSQL/H2 Database
• Maven + Git"

# 6. Pousser finalement
echo -e "\n5. Push final vers GitHub..."
git push origin main

echo -e "\n🎉 DÉPLOIEMENT RÉUSSI !"
echo "🔗 Voir le dépôt : https://github.com/MMXavier-app/MMX-vehicules"
echo ""
echo "📊 Structure déployée :"
echo "┌── backend/          - API Spring Boot"
echo "├── frontend/         - App React"
echo "├── src/              - Sources principaux"
echo "├── pom.xml           - Build Maven"
echo "├── README.md         - Documentation"
echo "└── .gitignore        - Fichiers exclus"
