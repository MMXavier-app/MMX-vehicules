#!/bin/bash

echo "=== PUSH VERS GITHUB ==="
cd ~/MMX-vehicules

echo "1. Ajout de tous les fichiers..."
git add -A

echo "2. Commit..."
git commit -m "Application complète MMX-Véhicules" || echo "Déjà commité"

echo "3. Fusion avec GitHub..."
# Essayer rebase d'abord
if git pull origin main --rebase; then
    echo "✅ Rebase réussi"
else
    echo "⚠️  Rebase échoué, tentative fusion normale..."
    git pull origin main --allow-unrelated-histories --strategy-option=ours
fi

echo "4. Push..."
git push origin main

echo "🎉 DÉPLOIEMENT RÉUSSI !"
echo "👉 https://github.com/MMXavier-app/MMX-vehicules"
