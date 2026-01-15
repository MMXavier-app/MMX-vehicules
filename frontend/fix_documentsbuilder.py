import re

with open('src/components/DocumentsBuilder.jsx', 'r') as f:
    content = f.read()

# Trouver et corriger la ligne problématique
lines = content.split('\n')
for i, line in enumerate(lines):
    if 'totalTTC.toFixed' in line:
        print(f"Ligne {i+1} à corriger: {line}")
        # Remplacer par une version sécurisée
        lines[i] = line.replace(
            'totalTTC.toFixed(2)',
            '(Number(totalTTC) || 0).toFixed(2)'
        )
        print(f"Corrigée en: {lines[i]}")

# Écrire le fichier corrigé
with open('src/components/DocumentsBuilder.jsx', 'w') as f:
    f.write('\n'.join(lines))

print("✅ Fichier corrigé !")
