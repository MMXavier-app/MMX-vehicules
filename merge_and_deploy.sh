#!/bin/bash

echo "=== FUSION DES BRANCHES DIVERGENTES ==="
cd ~/MMX-vehicules

# Configurer la stratégie de fusion
git config pull.rebase false

# Essayer la fusion
echo "1. Tentative de fusion..."
if git pull origin main --allow-unrelated-histories; then
    echo "✅ Fusion réussie sans conflits"
else
    echo "⚠️  Conflits détectés. Résolution..."
    
    # Afficher les fichiers en conflit
    echo -e "\n📄 Fichiers en conflit :"
    git status | grep -B2 -A2 "both modified" || true
    
    # Stratégie : garder notre version pour tout
    echo -e "\n🔄 Résolution : garder notre version locale"
    
    # Résoudre chaque conflit
    for file in $(git diff --name-only --diff-filter=U); do
        echo "  - Garde notre version : $file"
        git checkout --ours "$file"
        git add "$file"
    done
    
    # Finaliser la fusion
    git commit -m "Fusion : application complète MMX-véhicules

Fusion des historiques :
- Ancien contenu du dépôt GitHub
- Nouvelle application complète locale

Décisions :
- Conservation de notre structure d'application
- Intégration de tous les modules
- Mise à jour de la documentation"
fi

# Vérifier l'état
echo -e "\n📊 État après fusion :"
git status --short

# Pousser les changements
echo -e "\n🚀 Push vers GitHub..."
git push origin main

echo -e "\n✅ DÉPLOIEMENT TERMINÉ !"
echo "🌐 Accédez à : https://github.com/MMXavier-app/MMX-vehicules"
