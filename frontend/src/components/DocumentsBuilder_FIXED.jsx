// Version corrigée de DocumentsBuilder.jsx
// Correction de l'erreur: totalTTC.toFixed is not a function

// Cherchons et remplaçons la ligne problématique
echo "Recherche de 'totalTTC.toFixed' dans le fichier..."
grep -n "totalTTC.toFixed" src/components/DocumentsBuilder.jsx

# Si vous voyez la ligne, nous allons la corriger
