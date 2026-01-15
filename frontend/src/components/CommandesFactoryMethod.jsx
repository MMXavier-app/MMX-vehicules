import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';

// ==================== FACTORY METHOD PATTERN ====================

// Classe de base pour les commandes
class Commande {
  constructor(id, client, vehicules, montant, options = {}) {
    this.id = id;
    this.client = client;
    this.vehicules = vehicules;
    this.montant = montant;
    this.dateCreation = new Date();
    this.statut = 'en cours';
    this.type = 'base';
    this.options = options;
  }

  valider() {
    this.statut = 'validée';
    this.dateValidation = new Date();
    return `Commande ${this.id} validée avec succès!`;
  }

  genererFacture() {
    const facture = {
      numero: `FACT-${this.id}-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      client: this.client,
      vehicules: this.vehicules,
      sousTotal: this.montant,
      tva: this.montant * 0.20,
      total: this.montant * 1.20,
      details: this.getDetailsCommande()
    };
    return facture;
  }

  getDetailsCommande() {
    return {
      type: this.type,
      statut: this.statut,
      dateCreation: this.dateCreation.toLocaleString(),
      options: this.options
    };
  }

  toString() {
    return `Commande ${this.id} - ${this.client.nom} - ${this.montant}€ - ${this.statut}`;
  }
}

// Commande Paiement Comptant
class CommandeComptant extends Commande {
  constructor(id, client, vehicules, montant, options = {}) {
    super(id, client, vehicules, montant, options);
    this.type = 'comptant';
    this.modePaiement = 'comptant';
    this.reduction = montant > 30000 ? montant * 0.05 : 0; // 5% réduction si supérieur à 30k€
    this.montantFinal = montant - this.reduction;
  }

  valider() {
    super.valider();
    return `✅ Commande comptant ${this.id} validée! Réduction: ${this.reduction}€`;
  }

  genererFacture() {
    const facture = super.genererFacture();
    facture.typePaiement = 'Comptant';
    facture.reduction = this.reduction;
    facture.montantFinal = this.montantFinal;
    facture.avantages = ['Livraison rapide', 'Réduction immédiate'];
    return facture;
  }
}

// Commande avec Demande de Crédit
class CommandeCredit extends Commande {
  constructor(id, client, vehicules, montant, options = {}) {
    super(id, client, vehicules, montant, options);
    this.type = 'crédit';
    this.modePaiement = 'crédit';
    this.duree = options.duree || 60; // mois
    this.tauxInteret = 0.03; // 3%
    this.mensualite = (montant * (1 + this.tauxInteret)) / this.duree;
  }

  valider() {
    super.valider();
    return `✅ Demande de crédit ${this.id} validée! Mensualité: ${this.mensualite.toFixed(2)}€/mois`;
  }

  genererFacture() {
    const facture = super.genererFacture();
    facture.typePaiement = 'Crédit';
    facture.duree = this.duree;
    facture.tauxInteret = this.tauxInteret * 100;
    facture.mensualite = this.mensualite;
    facture.conditions = ['Étude de dossier requise', 'Délai de traitement: 48h'];
    return facture;
  }
}

// ==================== FACTORY METHOD ====================

// Creator (Factory)
class CommandeFactory {
  creerCommande(type, id, client, vehicules, montant, options) {
    throw new Error('Méthode abstraite - à implémenter dans les sous-classes');
  }
}

// Concrete Factory pour les commandes normales
class CommandeNormaleFactory extends CommandeFactory {
  creerCommande(type, id, client, vehicules, montant, options) {
    switch (type) {
      case 'comptant':
        return new CommandeComptant(id, client, vehicules, montant, options);
      case 'crédit':
        return new CommandeCredit(id, client, vehicules, montant, options);
      default:
        return new Commande(id, client, vehicules, montant, options);
    }
  }
}

// Concrete Factory pour les commandes VIP (pourrait avoir des caractéristiques spéciales)
class CommandeVIPFactory extends CommandeFactory {
  creerCommande(type, id, client, vehicules, montant, options) {
    // Clients VIP ont des avantages supplémentaires
    const vipOptions = {
      ...options,
      avantagesVIP: ['Conseiller dédié', 'Livraison prioritaire', 'Garantie étendue']
    };
    
    switch (type) {
      case 'comptant':
        const commande = new CommandeComptant(id, client, vehicules, montant, vipOptions);
        commande.reduction *= 1.5; // 50% de réduction en plus pour les VIP
        commande.montantFinal = montant - commande.reduction;
        return commande;
      case 'crédit':
        const commandeCredit = new CommandeCredit(id, client, vehicules, montant, vipOptions);
        commandeCredit.tauxInteret = 0.02; // Taux réduit pour VIP
        commandeCredit.mensualite = (montant * (1 + commandeCredit.tauxInteret)) / commandeCredit.duree;
        return commandeCredit;
      default:
        return new Commande(id, client, vehicules, montant, vipOptions);
    }
  }
}

// ==================== COMPOSANT REACT ====================

const CommandesFactoryMethod = () => {
  const { cart, calculateTotal, clearCart } = useCart();
  const [typeCommande, setTypeCommande] = useState('comptant');
  const [typeClient, setTypeClient] = useState('normal');
  const [commandeEnCours, setCommandeEnCours] = useState(null);
  const [commandesValidees, setCommandesValidees] = useState([]);
  const [factureActive, setFactureActive] = useState(null);
  const [clientInfo, setClientInfo] = useState({
    nom: 'Jean Dupont',
    email: 'jean.dupont@email.com',
    telephone: '01 23 45 67 89',
    adresse: '123 Rue de Paris, 75001 Paris'
  });
  const [message, setMessage] = useState('');

  const totalPanier = calculateTotal();
  const tva = totalPanier * 0.20;
  const totalAvecTVA = totalPanier + tva;

  // Initialiser la factory
  const getFactory = () => {
    return typeClient === 'vip' 
      ? new CommandeVIPFactory()
      : new CommandeNormaleFactory();
  };

  const creerCommande = () => {
    if (cart.length === 0) {
      setMessage('❌ Votre panier est vide! Ajoutez des véhicules avant de créer une commande.');
      return;
    }

    const factory = getFactory();
    const id = `CMD-${Date.now()}`;
    const options = {
      duree: 60,
      livraison: 'standard'
    };

    const nouvelleCommande = factory.creerCommande(
      typeCommande,
      id,
      clientInfo,
      [...cart],
      totalPanier,
      options
    );

    setCommandeEnCours(nouvelleCommande);
    setMessage(`🔄 Commande ${id} créée avec le type: ${typeCommande} (Client: ${typeClient})`);
  };

  const validerCommande = () => {
    if (!commandeEnCours) {
      setMessage('❌ Aucune commande en cours à valider.');
      return;
    }

    const messageValidation = commandeEnCours.valider();
    setMessage(messageValidation);
    
    // Mettre à jour la commande avec le nouveau statut
    const commandeValidee = { ...commandeEnCours };
    setCommandeEnCours(commandeValidee);
    
    // Ajouter à l'historique
    setCommandesValidees(prev => [commandeValidee, ...prev]);
    
    // Vider le panier après validation
    setTimeout(() => {
      clearCart();
      setMessage('✅ Panier vidé après validation de la commande.');
    }, 2000);
  };

  const genererFacture = (commande) => {
    const facture = commande.genererFacture();
    setFactureActive(facture);
  };

  const telechargerFacture = () => {
    if (!factureActive) return;
    
    const factureTexte = `
      =================================
                FACTURE MMX VÉHICULES
      =================================
      Numéro: ${factureActive.numero}
      Date: ${factureActive.date}
      
      CLIENT:
      Nom: ${factureActive.client.nom}
      Email: ${factureActive.client.email}
      Téléphone: ${factureActive.client.telephone}
      
      DÉTAILS DE LA COMMANDE:
      Type: ${factureActive.typePaiement || 'Standard'}
      Statut: ${commandeEnCours?.statut || 'validée'}
      
      VÉHICULES COMMANDÉS:
      ${factureActive.vehicules.map(item => `
        • ${item.vehicle.name}
          Prix: ${item.basePrice}€
          Options: ${item.options.length > 0 ? item.options.join(', ') : 'Aucune'}
          Prix options: +${item.optionsPrice}€
          Sous-total: ${item.basePrice + item.optionsPrice}€
      `).join('')}
      
      MONTANTS:
      Sous-total: ${factureActive.sousTotal.toFixed(2)}€
      TVA (20%): ${factureActive.tva.toFixed(2)}€
      ${factureActive.reduction ? `Réduction: -${factureActive.reduction.toFixed(2)}€` : ''}
      ${factureActive.montantFinal ? `Montant final: ${factureActive.montantFinal.toFixed(2)}€` : ''}
      TOTAL: ${factureActive.total.toFixed(2)}€
      
      ${factureActive.mensualite ? `Mensualité: ${factureActive.mensualite.toFixed(2)}€/mois (${factureActive.duree} mois)` : ''}
      
      Merci pour votre achat!
      =================================
    `;
    
    const blob = new Blob([factureTexte], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `facture-${factureActive.numero}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setMessage('📄 Facture téléchargée!');
  };

  const simulerNouveauClient = () => {
    const clients = [
      { nom: 'Marie Martin', email: 'marie.martin@email.com', telephone: '06 12 34 56 78', adresse: '456 Av. des Champs, 75008 Paris' },
      { nom: 'Pierre Dubois', email: 'pierre.dubois@email.com', telephone: '07 87 65 43 21', adresse: '789 Bd Saint-Germain, 75006 Paris' },
      { nom: 'Sophie Bernard (VIP)', email: 'sophie.bernard@entreprise.com', telephone: '01 98 76 54 32', adresse: '1010 Av. Montaigne, 75008 Paris' }
    ];
    
    const clientAleatoire = clients[Math.floor(Math.random() * clients.length)];
    setClientInfo(clientAleatoire);
    setTypeClient(clientAleatoire.nom.includes('VIP') ? 'vip' : 'normal');
    setMessage(`👤 Client changé: ${clientAleatoire.nom}`);
  };

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
        <h2 className="text-2xl font-bold text-purple-800 mb-2">📦 Commandes - Factory Method Pattern</h2>
        <p className="text-purple-700">
          Création de différents types de commandes (comptant/crédit) avec validation et facturation
        </p>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${message.includes('✅') ? 'bg-green-100 text-green-800' : message.includes('❌') ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Colonne 1: Configuration de la commande */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-gray-800 mb-4">Configuration de la commande</h3>
            
            {/* Type de client */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Type de client :
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setTypeClient('normal')}
                  className={`p-3 rounded-lg flex flex-col items-center ${typeClient === 'normal' ? 'bg-blue-100 text-blue-700 border-2 border-blue-300' : 'bg-gray-100'}`}
                >
                  <span className="text-xl">👤</span>
                  <span className="font-medium">Client Normal</span>
                </button>
                <button
                  onClick={() => setTypeClient('vip')}
                  className={`p-3 rounded-lg flex flex-col items-center ${typeClient === 'vip' ? 'bg-purple-100 text-purple-700 border-2 border-purple-300' : 'bg-gray-100'}`}
                >
                  <span className="text-xl">⭐</span>
                  <span className="font-medium">Client VIP</span>
                  <span className="text-xs text-gray-600">Avantages spéciaux</span>
                </button>
              </div>
            </div>

            {/* Type de paiement */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Type de paiement :
              </label>
              <div className="space-y-3">
                <button
                  onClick={() => setTypeCommande('comptant')}
                  className={`w-full p-3 text-left rounded-lg ${typeCommande === 'comptant' ? 'bg-green-100 text-green-700 border-l-4 border-green-500' : 'bg-gray-100'}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold">💵 Paiement Comptant</div>
                      <div className="text-sm text-gray-600">5% de réduction si supérieur à 30.000€</div>
                    </div>
                    {typeCommande === 'comptant' && <span>✅</span>}
                  </div>
                </button>

                <button
                  onClick={() => setTypeCommande('crédit')}
                  className={`w-full p-3 text-left rounded-lg ${typeCommande === 'crédit' ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500' : 'bg-gray-100'}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold">🏦 Demande de Crédit</div>
                      <div className="text-sm text-gray-600">Taux: 3% sur 60 mois</div>
                    </div>
                    {typeCommande === 'crédit' && <span>✅</span>}
                  </div>
                </button>
              </div>
            </div>

            {/* Informations client */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-gray-700">Client actuel :</label>
                <button
                  onClick={simulerNouveauClient}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Changer
                </button>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="font-medium">{clientInfo.nom}</p>
                <p className="text-sm text-gray-600">{clientInfo.email}</p>
                <p className="text-sm text-gray-600">{clientInfo.telephone}</p>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="space-y-3">
              <button
                onClick={creerCommande}
                disabled={cart.length === 0}
                className={`w-full py-3 rounded-lg font-bold transition-colors ${cart.length === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
              >
                Créer la commande ({typeCommande})
              </button>

              <button
                onClick={validerCommande}
                disabled={!commandeEnCours}
                className={`w-full py-3 rounded-lg font-bold transition-colors ${!commandeEnCours ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
              >
                ✅ Finaliser la commande
              </button>

              {commandeEnCours && (
                <button
                  onClick={() => genererFacture(commandeEnCours)}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  📄 Voir votre facture
                </button>
              )}
            </div>
          </div>

          {/* Détails Factory Method */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-gray-800 mb-4">🏭 Factory Method Pattern</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>• <strong>CommandeFactory</strong> : Interface créateur</p>
              <p>• <strong>CommandeNormaleFactory</strong> : Factory pour clients normaux</p>
              <p>• <strong>CommandeVIPFactory</strong> : Factory pour clients VIP</p>
              <p>• <strong>creerCommande()</strong> : Factory Method à implémenter</p>
            </div>
            <div className="mt-4 p-3 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-800">
                💡 La Factory Method délègue la création d'objets aux sous-classes.
                Chaque type de client a sa propre logique de création de commandes.
              </p>
            </div>
          </div>
        </div>

        {/* Colonne 2: Détails de la commande */}
        <div className="space-y-6">
          {/* Commande en cours */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-gray-800 mb-4">
              {commandeEnCours ? '📦 Commande en cours' : 'Aucune commande en cours'}
            </h3>
            
            {commandeEnCours ? (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-lg">{commandeEnCours.id}</h4>
                      <p className="text-sm text-gray-600">Client: {commandeEnCours.client.nom}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${commandeEnCours.statut === 'validée' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {commandeEnCours.statut}
                    </span>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Type:</span>
                      <p className="font-bold">{commandeEnCours.type}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Montant:</span>
                      <p className="font-bold text-lg">{commandeEnCours.montant.toFixed(2)}€</p>
                    </div>
                  </div>
                  
                  {commandeEnCours.reduction > 0 && (
                    <div className="mt-2 p-2 bg-green-100 text-green-800 rounded text-sm">
                      🎉 Réduction: {commandeEnCours.reduction.toFixed(2)}€
                    </div>
                  )}
                  
                  {commandeEnCours.mensualite && (
                    <div className="mt-2 p-2 bg-blue-100 text-blue-800 rounded text-sm">
                      📊 Mensualité: {commandeEnCours.mensualite.toFixed(2)}€/mois
                    </div>
                  )}
                </div>
                
                {/* Véhicules de la commande */}
                <div>
                  <h5 className="font-bold text-gray-700 mb-2">Véhicules commandés :</h5>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {commandeEnCours.vehicules.map((item, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex justify-between">
                          <span className="font-medium">{item.vehicle.name}</span>
                          <span className="font-bold">{item.basePrice}€</span>
                        </div>
                        {item.options.length > 0 && (
                          <div className="mt-1 text-sm text-gray-600">
                            Options: {item.options.join(', ')} (+{item.optionsPrice}€)
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Créez d'abord une commande</p>
                <p className="text-sm mt-2">Le Factory Method créera le type approprié</p>
              </div>
            )}
          </div>

          {/* Historique des commandes */}
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">📜 Historique des commandes</h3>
              <span className="text-sm text-gray-500">{commandesValidees.length} commande(s)</span>
            </div>
            
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {commandesValidees.length > 0 ? (
                commandesValidees.map((commande, index) => (
                  <div key={index} className="border rounded-lg p-3 hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{commande.id}</p>
                        <p className="text-sm text-gray-600">{commande.type} • {commande.client.nom}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{commande.montantFinal ? commande.montantFinal.toFixed(2) : commande.montant.toFixed(2)}€</p>
                        <button
                          onClick={() => genererFacture(commande)}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Voir facture
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-4 text-gray-500">Aucune commande validée</p>
              )}
            </div>
          </div>
        </div>

        {/* Colonne 3: Facture */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-gray-800 mb-4">
              {factureActive ? '🧾 Facture détaillée' : 'Facture non générée'}
            </h3>
            
            {factureActive ? (
              <div className="space-y-6">
                {/* En-tête facture */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-lg">{factureActive.numero}</h4>
                      <p className="text-sm text-gray-600">Date: {factureActive.date}</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                      {factureActive.typePaiement}
                    </span>
                  </div>
                </div>
                
                {/* Client */}
                <div>
                  <h5 className="font-bold text-gray-700 mb-2">Client :</h5>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="font-medium">{factureActive.client.nom}</p>
                    <p className="text-sm text-gray-600">{factureActive.client.email}</p>
                    <p className="text-sm text-gray-600">{factureActive.client.telephone}</p>
                  </div>
                </div>
                
                {/* Détails des véhicules */}
                <div>
                  <h5 className="font-bold text-gray-700 mb-2">Détail des véhicules :</h5>
                  <div className="space-y-3">
                    {factureActive.vehicules.map((item, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-bold">{item.vehicle.name}</p>
                            <p className="text-sm text-gray-600">{item.vehicle.description}</p>
                          </div>
                          <p className="font-bold">{item.basePrice}€</p>
                        </div>
                        
                        {item.options.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">Options :</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {item.options.map((option, optIndex) => (
                                <span key={optIndex} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                                  {option}
                                </span>
                              ))}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              Prix options: +{item.optionsPrice}€
                            </p>
                          </div>
                        )}
                        
                        <div className="mt-2 pt-2 border-t text-right">
                          <p className="font-bold">
                            Sous-total: {(item.basePrice + item.optionsPrice).toFixed(2)}€
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Totaux */}
                <div className="border-t pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Sous-total véhicules :</span>
                      <span>{factureActive.sousTotal.toFixed(2)}€</span>
                    </div>
                    
                    {factureActive.reduction > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Réduction :</span>
                        <span>-{factureActive.reduction.toFixed(2)}€</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span>TVA (20%) :</span>
                      <span>{factureActive.tva.toFixed(2)}€</span>
                    </div>
                    
                    {factureActive.montantFinal && (
                      <div className="flex justify-between">
                        <span>Montant après réduction :</span>
                        <span>{factureActive.montantFinal.toFixed(2)}€</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-lg font-bold pt-2 border-t">
                      <span>TOTAL À PAYER :</span>
                      <span className="text-green-600">{factureActive.total.toFixed(2)}€</span>
                    </div>
                    
                    {factureActive.mensualite && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800 text-center">
                          💳 {factureActive.mensualite.toFixed(2)}€/mois pendant {factureActive.duree} mois
                          <br />
                          <span className="text-xs">Taux d'intérêt: {factureActive.tauxInteret}%</span>
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={telechargerFacture}
                    className="w-full mt-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    📥 Télécharger la facture
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>Générez une facture pour la voir ici</p>
                <p className="text-sm mt-2">La facture inclut tous les détails de la commande</p>
              </div>
            )}
          </div>
          
          {/* Résumé du panier */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-gray-800 mb-4">🛒 Résumé du panier</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Articles :</span>
                <span>{cart.length} véhicule(s)</span>
              </div>
              <div className="flex justify-between">
                <span>Sous-total :</span>
                <span>{totalPanier.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between">
                <span>TVA (20%) :</span>
                <span>{tva.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total :</span>
                <span className="text-green-600">{totalAvecTVA.toFixed(2)}€</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                💡 Le Factory Method créera une commande différente selon le type de paiement et de client.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandesFactoryMethod;
