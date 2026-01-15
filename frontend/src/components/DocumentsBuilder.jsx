import React, { useState, useEffect } from 'react';

// ==================== BUILDER PATTERN ====================

// Produit: Document individuel
class Document {
  constructor(type, contenu) {
    this.type = type;
    this.contenu = contenu;
    this.format = 'HTML'; // Par défaut
    this.dateGeneration = new Date();
    this.reference = `DOC-${type.substring(0, 3).toUpperCase()}-${Date.now()}`;
  }

  setFormat(format) {
    this.format = format;
    return this;
  }

  setContenu(contenu) {
    this.contenu = contenu;
    return this;
  }

  genererContenu(vehicule, client, details) {
    switch (this.type) {
      case 'Demande d\'immatriculation':
        this.contenu = this.genererDemandeImmatriculation(vehicule, client, details);
        break;
      case 'Certificat de cession':
        this.contenu = this.genererCertificatCession(vehicule, client, details);
        break;
      case 'Bon de commande':
        this.contenu = this.genererBonCommande(vehicule, client, details);
        break;
      case 'Contrat de vente':
        this.contenu = this.genererContratVente(vehicule, client, details);
        break;
      case 'Attestation de garantie':
        this.contenu = this.genererAttestationGarantie(vehicule, client, details);
        break;
    }
    return this;
  }

  genererDemandeImmatriculation(vehicule, client, details) {
    return `
      DEMANDE D'IMMATRICULATION
      ==========================
      
      Référence: ${this.reference}
      Date: ${this.dateGeneration.toLocaleDateString()}
      
      INFORMATIONS VÉHICULE:
      ----------------------
      Marque: ${vehicule.marque || 'Non spécifié'}
      Modèle: ${vehicule.modele || 'Non spécifié'}
      Numéro de série: ${vehicule.numeroSerie || 'N/A'}
      Type: ${vehicule.type || 'Non spécifié'}
      Carburant: ${vehicule.carburant || 'Non spécifié'}
      Année: ${vehicule.annee || 'N/A'}
      
      INFORMATIONS CLIENT:
      --------------------
      Nom: ${client.nom || 'Non spécifié'}
      Prénom: ${client.prenom || 'Non spécifié'}
      Adresse: ${client.adresse || 'Non spécifié'}
      Code postal: ${client.codePostal || 'N/A'}
      Ville: ${client.ville || 'Non spécifié'}
      Email: ${client.email || 'Non spécifié'}
      Téléphone: ${client.telephone || 'N/A'}
      
      DÉTAILS DE L'ACQUISITION:
      -------------------------
      Date d'acquisition: ${details.dateAcquisition || new Date().toLocaleDateString()}
      Prix d'achat: ${details.prix || '0'}€
      Mode de paiement: ${details.modePaiement || 'Non spécifié'}
      Lieu de livraison: ${details.lieuLivraison || 'Non spécifié'}
      
      SIGNATURES:
      -----------
      Client: ___________________
      Représentant MMX: ___________________
      
      Cachet et signature:
      [Cachet officiel MMX Véhicules]
    `;
  }

  genererCertificatCession(vehicule, client, details) {
    return `
      CERTIFICAT DE CESSION
      =====================
      
      Référence: ${this.reference}
      Date: ${this.dateGeneration.toLocaleDateString()}
      
      Je soussigné(e), représentant légal de MMX Véhicules,
      
      CERTIFIE avoir cédé le véhicule décrit ci-dessous:
      
      DÉSIGNATION DU VÉHICULE:
      -------------------------
      Marque: ${vehicule.marque || 'Non spécifié'}
      Modèle: ${vehicule.modele || 'Non spécifié'}
      Numéro d'identification: ${vehicule.numeroSerie || 'N/A'}
      Type: ${vehicule.type || 'Non spécifié'}
      Première mise en circulation: ${vehicule.dateMiseCirculation || 'N/A'}
      
      AU PROFIT DE:
      -------------
      ${client.prenom || ''} ${client.nom || 'Non spécifié'}
      ${client.adresse || 'Non spécifié'}
      ${client.codePostal || ''} ${client.ville || ''}
      
      CONDITIONS DE LA CESSION:
      -------------------------
      Date de la cession: ${details.dateAcquisition || new Date().toLocaleDateString()}
      Prix de cession: ${details.prix || '0'}€
      Kilométrage au compteur: ${vehicule.kilometrage || '0'} km
      
      Le véhicule est cédé dans l'état où il se trouve.
      
      Fait à Paris, le ${this.dateGeneration.toLocaleDateString()}
      
      Pour MMX Véhicules,
      Le Directeur Commercial
      
      ___________________
      
      Lu et approuvé,
      L'Acquéreur
      
      ___________________
    `;
  }

  genererBonCommande(vehicule, client, details) {
    const options = details.options || [];
    const prixOptions = options.length * 500;
    const total = (details.prix || 0) + prixOptions;
    const tva = total * 0.20;
    const totalTTC = total + tva;

    return `
      BON DE COMMANDE
      ===============
      
      N° Commande: ${details.numeroCommande || 'CMD-' + Date.now()}
      Référence document: ${this.reference}
      Date: ${this.dateGeneration.toLocaleDateString()}
      
      CLIENT:
      -------
      ${client.civilite || ''} ${client.prenom || ''} ${client.nom || 'Non spécifié'}
      ${client.adresse || 'Non spécifié'}
      ${client.codePostal || ''} ${client.ville || ''}
      Tél: ${client.telephone || 'N/A'}
      Email: ${client.email || 'Non spécifié'}
      
      VÉHICULE COMMANDÉ:
      ------------------
      Référence: ${vehicule.reference || 'N/A'}
      Marque: ${vehicule.marque || 'Non spécifié'}
      Modèle: ${vehicule.modele || 'Non spécifié'}
      Version: ${vehicule.version || 'Standard'}
      Couleur: ${vehicule.couleur || 'Non spécifié'}
      Options de série: ${vehicule.optionsSerie || 'Aucune'}
      
      OPTIONS SUPPLÉMENTAIRES:
      ------------------------
      ${options.length > 0 ? options.map(opt => `• ${opt}`).join('\n') : 'Aucune option supplémentaire'}
      
      DÉTAILS FINANCIERS:
      -------------------
      Prix véhicule de base: ${details.prix || '0'}€
      Options supplémentaires: ${prixOptions}€
      Sous-total: ${total}€
      TVA (20%): ${tva.toFixed(2)}€
      TOTAL TTC: ${(Number(totalTTC) || 0).toFixed(2)}€
      
      CONDITIONS:
      -----------
      Délai de livraison: ${details.delaiLivraison || '4 à 6 semaines'}
      Lieu de livraison: ${details.lieuLivraison || 'Concession MMX Paris'}
      Mode de paiement: ${details.modePaiement || 'À définir'}
      
      Le client accepte les conditions générales de vente de MMX Véhicules.
      
      Signature du client:
      ___________________
      
      Pour MMX Véhicules:
      ___________________
      ${this.dateGeneration.toLocaleDateString()}
    `;
  }

  genererContratVente(vehicule, client, details) {
    return `
      CONTRAT DE VENTE
      ================
      
      ENTRE LES SOUSSIGNÉS:
      
      MMX VÉHICULES SARL
      Au capital de 150 000€
      RCS Paris 123 456 789
      Siège social: 123 Avenue des Champs, 75008 Paris
      Représenté par Monsieur Jean Martin, Directeur
      
      ET
      
      ${client.civilite || ''} ${client.prenom || ''} ${client.nom || 'Non spécifié'}
      Demeurant à ${client.adresse || 'Non spécifié'}
      ${client.codePostal || ''} ${client.ville || ''}
      
      IL A ÉTÉ CONVENU CE QUI SUIT:
      
      ARTICLE 1 - OBJET
      Le présent contrat a pour objet la vente du véhicule suivant:
      
      Description: ${vehicule.marque || ''} ${vehicule.modele || ''}
      Numéro de série: ${vehicule.numeroSerie || 'N/A'}
      Type: ${vehicule.type || 'Non spécifié'}
      Année: ${vehicule.annee || 'N/A'}
      Couleur: ${vehicule.couleur || 'Non spécifié'}
      
      ARTICLE 2 - PRIX ET MODALITÉS DE PAIEMENT
      Le prix de vente est fixé à: ${details.prix || '0'}€ TTC
      Mode de paiement: ${details.modePaiement || 'À définir'}
      
      ARTICLE 3 - LIVRAISON
      Le véhicule sera livré le: ${details.dateLivraison || 'À convenir'}
      Lieu de livraison: ${details.lieuLivraison || 'Concession MMX Paris'}
      
      ARTICLE 4 - GARANTIES
      Le véhicule bénéficie de la garantie constructeur standard.
      Durée: 2 ans ou 100 000 km
      
      Fait à Paris, le ${this.dateGeneration.toLocaleDateString()}
      En deux exemplaires originaux.
      
      Pour MMX Véhicules,
      ___________________
      
      L'Acquéreur,
      ___________________
    `;
  }

  genererAttestationGarantie(vehicule, client, details) {
    const dateFinGarantie = new Date();
    dateFinGarantie.setFullYear(dateFinGarantie.getFullYear() + 2);

    return `
      ATTESTATION DE GARANTIE
      =======================
      
      Référence: ${this.reference}
      Date d'émission: ${this.dateGeneration.toLocaleDateString()}
      
      MMX VÉHICULES certifie que le véhicule décrit ci-dessous
      bénéficie de la garantie constructeur:
      
      VÉHICULE GARANTI:
      -----------------
      Marque/Modèle: ${vehicule.marque || ''} ${vehicule.modele || ''}
      Numéro de série: ${vehicule.numeroSerie || 'N/A'}
      Date de première mise en circulation: ${vehicule.dateMiseCirculation || 'N/A'}
      Kilométrage initial: ${vehicule.kilometrage || '0'} km
      
      BÉNÉFICIAIRE DE LA GARANTIE:
      ----------------------------
      ${client.prenom || ''} ${client.nom || 'Non spécifié'}
      ${client.adresse || 'Non spécifié'}
      
      PÉRIODE DE GARANTIE:
      --------------------
      Début: ${this.dateGeneration.toLocaleDateString()}
      Fin: ${dateFinGarantie.toLocaleDateString()}
      Durée: 24 mois
      Limite kilométrique: 100 000 km
      
      COUVERTURE DE LA GARANTIE:
      --------------------------
      • Moteur et transmission
      • Système électrique
      • Suspension et direction
      • Freinage
      • Climatisation
      
      CONDITIONS:
      -----------
      La garantie est valable sous réserve d'un entretien régulier
      dans le réseau agréé MMX.
      
      Pour MMX Véhicules,
      Le Service Après-Vente
      
      ___________________
      
      Cachet officiel:
      [Cachet Service Après-Vente MMX]
    `;
  }

  toString() {
    return `${this.type} (${this.format}) - ${this.reference}`;
  }
}

// Produit: Liasse de documents
class LiasseDocuments {
  constructor() {
    this.documents = [];
    this.dateCreation = new Date();
    this.reference = `LIASSE-${Date.now()}`;
  }

  ajouterDocument(document) {
    this.documents.push(document);
  }

  getDocuments() {
    return this.documents;
  }

  getDocumentParType(type) {
    return this.documents.find(doc => doc.type === type);
  }

  toString() {
    return `Liasse ${this.reference} - ${this.documents.length} document(s)`;
  }
}

// Builder Interface
class LiasseBuilder {
  constructor() {
    this.liasse = new LiasseDocuments();
  }

  creerDemandeImmatriculation(vehicule, client, details) {
    throw new Error('Méthode abstraite');
  }

  creerCertificatCession(vehicule, client, details) {
    throw new Error('Méthode abstraite');
  }

  creerBonCommande(vehicule, client, details) {
    throw new Error('Méthode abstraite');
  }

  setFormat(format) {
    throw new Error('Méthode abstraite');
  }

  getResultat() {
    return this.liasse;
  }
}

// Concrete Builder pour la liasse standard
class LiasseStandardBuilder extends LiasseBuilder {
  creerDemandeImmatriculation(vehicule, client, details) {
    const document = new Document('Demande d\'immatriculation', '')
      .genererContenu(vehicule, client, details);
    this.liasse.ajouterDocument(document);
    return this;
  }

  creerCertificatCession(vehicule, client, details) {
    const document = new Document('Certificat de cession', '')
      .genererContenu(vehicule, client, details);
    this.liasse.ajouterDocument(document);
    return this;
  }

  creerBonCommande(vehicule, client, details) {
    const document = new Document('Bon de commande', '')
      .genererContenu(vehicule, client, details);
    this.liasse.ajouterDocument(document);
    return this;
  }

  setFormat(format) {
    this.liasse.documents.forEach(doc => doc.setFormat(format));
    return this;
  }
}

// Concrete Builder pour la liasse complète (avec documents supplémentaires)
class LiasseCompleteBuilder extends LiasseBuilder {
  creerDemandeImmatriculation(vehicule, client, details) {
    const document = new Document('Demande d\'immatriculation', '')
      .genererContenu(vehicule, client, details);
    this.liasse.ajouterDocument(document);
    return this;
  }

  creerCertificatCession(vehicule, client, details) {
    const document = new Document('Certificat de cession', '')
      .genererContenu(vehicule, client, details);
    this.liasse.ajouterDocument(document);
    return this;
  }

  creerBonCommande(vehicule, client, details) {
    const document = new Document('Bon de commande', '')
      .genererContenu(vehicule, client, details);
    this.liasse.ajouterDocument(document);
    return this;
  }

  creerContratVente(vehicule, client, details) {
    const document = new Document('Contrat de vente', '')
      .genererContenu(vehicule, client, details);
    this.liasse.ajouterDocument(document);
    return this;
  }

  creerAttestationGarantie(vehicule, client, details) {
    const document = new Document('Attestation de garantie', '')
      .genererContenu(vehicule, client, details);
    this.liasse.ajouterDocument(document);
    return this;
  }

  setFormat(format) {
    this.liasse.documents.forEach(doc => doc.setFormat(format));
    return this;
  }
}

// Director (facultatif mais utile pour standardiser les constructions)
class LiasseDirector {
  constructor(builder) {
    this.builder = builder;
  }

  construireLiasseStandard(vehicule, client, details) {
    return this.builder
      .creerDemandeImmatriculation(vehicule, client, details)
      .creerCertificatCession(vehicule, client, details)
      .creerBonCommande(vehicule, client, details)
      .getResultat();
  }

  construireLiasseComplete(vehicule, client, details) {
    if (this.builder instanceof LiasseCompleteBuilder) {
      return this.builder
        .creerDemandeImmatriculation(vehicule, client, details)
        .creerCertificatCession(vehicule, client, details)
        .creerBonCommande(vehicule, client, details)
        .creerContratVente(vehicule, client, details)
        .creerAttestationGarantie(vehicule, client, details)
        .getResultat();
    }
    return this.construireLiasseStandard(vehicule, client, details);
  }
}

// ==================== COMPOSANT REACT ====================

const DocumentsBuilder = () => {
  const [typeLiasse, setTypeLiasse] = useState('standard');
  const [formatDocument, setFormatDocument] = useState('HTML');
  const [liasseGeneree, setLiasseGeneree] = useState(null);
  const [documentSelectionne, setDocumentSelectionne] = useState(null);
  const [historiqueLiasse, setHistoriqueLiasse] = useState([]);

  // Données de démo
  const vehiculeDemo = {
    marque: 'Tesla',
    modele: 'Model 3',
    type: 'Berline électrique',
    carburant: 'Électrique',
    annee: '2024',
    numeroSerie: 'TSLA-M3-2024-00123',
    couleur: 'Rouge',
    version: 'Performance',
    dateMiseCirculation: '15/03/2024',
    kilometrage: '150',
    optionsSerie: 'Autopilot, Toit panoramique, Sièges chauffants',
    reference: 'TES-M3-PERF-2024'
  };

  const clientDemo = {
    civilite: 'Monsieur',
    nom: 'Dupont',
    prenom: 'Jean',
    adresse: '123 Rue de Paris',
    codePostal: '75001',
    ville: 'Paris',
    email: 'jean.dupont@email.com',
    telephone: '01 23 45 67 89'
  };

  const detailsDemo = {
    prix: '52 500',
    modePaiement: 'Crédit sur 60 mois',
    dateAcquisition: new Date().toLocaleDateString(),
    lieuLivraison: 'Concession MMX Paris Centre',
    delaiLivraison: '3 semaines',
    numeroCommande: 'CMD-2024-00123',
    dateLivraison: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    options: ['GPS Premium', 'Sièges en cuir', 'Système audio haut de gamme', 'Jantes 19"']
  };

  const genererLiasse = () => {
    let builder;
    
    if (typeLiasse === 'complete') {
      builder = new LiasseCompleteBuilder();
    } else {
      builder = new LiasseStandardBuilder();
    }
    
    const director = new LiasseDirector(builder);
    
    let liasse;
    if (typeLiasse === 'complete') {
      liasse = director.construireLiasseComplete(vehiculeDemo, clientDemo, detailsDemo);
    } else {
      liasse = director.construireLiasseStandard(vehiculeDemo, clientDemo, detailsDemo);
    }
    
    // Appliquer le format
    liasse.documents.forEach(doc => doc.setFormat(formatDocument));
    
    setLiasseGeneree(liasse);
    setDocumentSelectionne(liasse.documents[0]);
    
    // Ajouter à l'historique
    setHistoriqueLiasse(prev => [liasse, ...prev.slice(0, 4)]);
  };

  const telechargerDocument = (document) => {
    const contenu = document.contenu;
    const blob = new Blob([contenu], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${document.type.replace(/\s+/g, '_')}_${document.reference}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const telechargerLiasseComplete = () => {
    if (!liasseGeneree) return;
    
    const contenu = liasseGeneree.documents.map(doc => 
      `=== ${doc.type} (${doc.format}) ===\n${doc.contenu}\n\n`
    ).join('\n\n');
    
    const blob = new Blob([contenu], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Liasse_${liasseGeneree.reference}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getDocumentIcon = (type) => {
    switch (type) {
      case 'Demande d\'immatriculation': return '📝';
      case 'Certificat de cession': return '📄';
      case 'Bon de commande': return '🛒';
      case 'Contrat de vente': return '📑';
      case 'Attestation de garantie': return '🔧';
      default: return '📋';
    }
  };

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl border border-green-200">
        <h2 className="text-2xl font-bold text-green-800 mb-2">📑 Documents - Builder Pattern</h2>
        <p className="text-green-700">
          Construction de liasses de documents nécessaires pour l'acquisition d'un véhicule
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Colonne 1: Configuration */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-gray-800 mb-4">Configuration de la liasse</h3>
            
            {/* Type de liasse */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Type de liasse :
              </label>
              <div className="space-y-3">
                <button
                  onClick={() => setTypeLiasse('standard')}
                  className={`w-full p-4 text-left rounded-lg ${typeLiasse === 'standard' ? 'bg-green-100 text-green-700 border-l-4 border-green-500' : 'bg-gray-100'}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold">📋 Liasse Standard</div>
                      <div className="text-sm text-gray-600">3 documents essentiels</div>
                    </div>
                    {typeLiasse === 'standard' && <span>✅</span>}
                  </div>
                </button>

                <button
                  onClick={() => setTypeLiasse('complete')}
                  className={`w-full p-4 text-left rounded-lg ${typeLiasse === 'complete' ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500' : 'bg-gray-100'}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold">📚 Liasse Complète</div>
                      <div className="text-sm text-gray-600">5 documents (tous inclus)</div>
                    </div>
                    {typeLiasse === 'complete' && <span>✅</span>}
                  </div>
                </button>
              </div>
            </div>

            {/* Format des documents */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Format des documents :
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setFormatDocument('HTML')}
                  className={`p-3 rounded-lg flex flex-col items-center ${formatDocument === 'HTML' ? 'bg-green-100 text-green-700 border-2 border-green-300' : 'bg-gray-100'}`}
                >
                  <span className="text-xl">🌐</span>
                  <span className="font-medium">HTML</span>
                  <span className="text-xs text-gray-600 mt-1">Affichage web</span>
                </button>

                <button
                  onClick={() => setFormatDocument('PDF')}
                  className={`p-3 rounded-lg flex flex-col items-center ${formatDocument === 'PDF' ? 'bg-red-100 text-red-700 border-2 border-red-300' : 'bg-gray-100'}`}
                >
                  <span className="text-xl">📊</span>
                  <span className="font-medium">PDF</span>
                  <span className="text-xs text-gray-600 mt-1">Impression</span>
                </button>
              </div>
            </div>

            {/* Documents inclus */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Documents inclus :
              </label>
              <div className="space-y-2">
                {[
                  { type: 'Demande d\'immatriculation', included: true },
                  { type: 'Certificat de cession', included: true },
                  { type: 'Bon de commande', included: true },
                  { type: 'Contrat de vente', included: typeLiasse === 'complete' },
                  { type: 'Attestation de garantie', included: typeLiasse === 'complete' }
                ].map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <span>{getDocumentIcon(doc.type)}</span>
                      <span className="text-sm">{doc.type}</span>
                    </div>
                    {doc.included ? (
                      <span className="text-green-600 text-sm">✓ Inclus</span>
                    ) : (
                      <span className="text-gray-400 text-sm">-</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Bouton de génération */}
            <button
              onClick={genererLiasse}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-bold"
            >
              🏗️ Construire la liasse
            </button>

            {liasseGeneree && (
              <button
                onClick={telechargerLiasseComplete}
                className="w-full mt-3 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                📥 Télécharger toute la liasse
              </button>
            )}
          </div>

          {/* Détails du pattern Builder */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-gray-800 mb-4">🏗️ Builder Pattern</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>• <strong>LiasseBuilder</strong> : Interface Builder</p>
              <p>• <strong>LiasseStandardBuilder</strong> : Builder pour liasse standard</p>
              <p>• <strong>LiasseCompleteBuilder</strong> : Builder pour liasse complète</p>
              <p>• <strong>LiasseDirector</strong> : Director pour orchestrer la construction</p>
              <p>• <strong>Document</strong> : Produit individuel</p>
              <p>• <strong>LiasseDocuments</strong> : Produit final (liasse complète)</p>
            </div>
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                💡 Le Builder Pattern permet de construire des objets complexes étape par étape.
                Différents builders peuvent créer différentes représentations du même produit.
              </p>
            </div>
          </div>
        </div>

        {/* Colonne 2: Liste des documents */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-gray-800 mb-4">
              {liasseGeneree ? `📚 Liasse générée (${liasseGeneree.documents.length} documents)` : 'Aucune liasse générée'}
            </h3>
            
            {liasseGeneree ? (
              <div className="space-y-4">
                {/* En-tête de la liasse */}
                <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-lg">{liasseGeneree.reference}</h4>
                      <p className="text-sm text-gray-600">
                        Type: {typeLiasse === 'standard' ? 'Standard' : 'Complète'} • Format: {formatDocument}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded">
                      {liasseGeneree.documents.length} docs
                    </span>
                  </div>
                </div>
                
                {/* Liste des documents */}
                <div className="space-y-3">
                  {liasseGeneree.documents.map((doc, index) => (
                    <button
                      key={index}
                      onClick={() => setDocumentSelectionne(doc)}
                      className={`w-full p-4 text-left rounded-lg border transition-colors ${documentSelectionne === doc ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{getDocumentIcon(doc.type)}</span>
                          <div>
                            <p className="font-medium">{doc.type}</p>
                            <p className="text-sm text-gray-600">{doc.reference}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs rounded ${doc.format === 'PDF' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                            {doc.format}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              telechargerDocument(doc);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            📥
                          </button>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>Configurez et générez une liasse de documents</p>
                <p className="text-sm mt-2">Le Builder construira la liasse étape par étape</p>
              </div>
            )}
          </div>

          {/* Historique des liasses */}
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">📜 Historique des liasses</h3>
              <span className="text-sm text-gray-500">{historiqueLiasse.length} liasse(s)</span>
            </div>
            
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {historiqueLiasse.length > 0 ? (
                historiqueLiasse.map((liasse, index) => (
                  <div key={index} className="border rounded-lg p-3 hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{liasse.reference}</p>
                        <p className="text-sm text-gray-600">
                          {liasse.documents.length} documents • {liasse.documents[0]?.format || 'HTML'}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setLiasseGeneree(liasse);
                          setDocumentSelectionne(liasse.documents[0]);
                        }}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Recharger
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-4 text-gray-500">Aucune liasse dans l'historique</p>
              )}
            </div>
          </div>
        </div>

        {/* Colonne 3: Aperçu du document */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow overflow-hidden">
            {/* En-tête du document */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-gray-800">
                    {documentSelectionne ? documentSelectionne.type : 'Aperçu document'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {documentSelectionne ? documentSelectionne.reference : 'Sélectionnez un document'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {documentSelectionne && (
                    <span className={`px-3 py-1 text-sm rounded ${documentSelectionne.format === 'PDF' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {documentSelectionne.format}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Contenu du document */}
            <div className="p-6">
              {documentSelectionne ? (
                <div className="space-y-6">
                  {/* Métadonnées */}
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Format: {documentSelectionne.format}</span>
                    <span>Date: {documentSelectionne.dateGeneration.toLocaleDateString()}</span>
                  </div>
                  
                  {/* Contenu formaté */}
                  <div className={`border rounded-lg p-4 max-h-[500px] overflow-y-auto ${formatDocument === 'PDF' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                    <pre className="whitespace-pre-wrap font-mono text-sm">
                      {documentSelectionne.contenu}
                    </pre>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex justify-between">
                    <button
                      onClick={() => documentSelectionne && telechargerDocument(documentSelectionne)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      📥 Télécharger ce document
                    </button>
                    
                    <div className="text-sm text-gray-600">
                      {formatDocument === 'PDF' ? 'Prêt pour impression' : 'Format web optimisé'}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p>Sélectionnez un document dans la liste</p>
                  <p className="text-sm mt-2">Le contenu s'affichera ici</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Informations sur le véhicule et client */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-gray-800 mb-4">📋 Données utilisées</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-700 mb-2">Véhicule :</h4>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-medium">{vehiculeDemo.marque} {vehiculeDemo.modele}</p>
                  <p className="text-sm text-gray-600">{vehiculeDemo.type}</p>
                  <p className="text-sm text-gray-600">Référence: {vehiculeDemo.reference}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-700 mb-2">Client :</h4>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-medium">{clientDemo.civilite} {clientDemo.prenom} {clientDemo.nom}</p>
                  <p className="text-sm text-gray-600">{clientDemo.adresse}, {clientDemo.codePostal} {clientDemo.ville}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-700 mb-2">Acquisition :</h4>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm">Prix: {detailsDemo.prix}€</p>
                  <p className="text-sm">Mode de paiement: {detailsDemo.modePaiement}</p>
                  <p className="text-sm">Livraison: {detailsDemo.lieuLivraison}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Avantages du Builder */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h4 className="font-bold text-green-700 mb-3">🏗️ Construction étape par étape</h4>
          <p className="text-sm text-gray-600">
            Le Builder permet de construire des objets complexes en plusieurs étapes,
            avec la possibilité de sauter certaines étapes si nécessaire.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow">
          <h4 className="font-bold text-green-700 mb-3">🎯 Différentes représentations</h4>
          <p className="text-sm text-gray-600">
            Différents builders (Standard/Complet) peuvent créer différentes
            représentations du même produit (liasse de documents).
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow">
          <h4 className="font-bold text-green-700 mb-3">🔧 Code réutilisable</h4>
          <p className="text-sm text-gray-600">
            La logique de construction est encapsulée dans les builders,
            permettant une réutilisation facile pour différents scénarios.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DocumentsBuilder;
