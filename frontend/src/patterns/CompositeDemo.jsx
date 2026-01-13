import React, { useState } from 'react';

// Composite Pattern - Représentation hiérarchique des sociétés

// Component interface
class CompanyComponent {
  constructor(name, type, country = 'France') {
    this.name = name;
    this.type = type;
    this.country = country;
  }
  
  display(indent = 0) {
    throw new Error('Méthode abstraite');
  }
  
  getTotalEmployees() {
    throw new Error('Méthode abstraite');
  }
  
  getTotalRevenue() {
    throw new Error('Méthode abstraite');
  }
  
  getCountry() {
    return this.country;
  }
  
  proposeFleetPurchase(vehiclesCount = 10) {
    throw new Error('Méthode abstraite');
  }
  
  applyGroupDiscount(percentage) {
    throw new Error('Méthode abstraite');
  }
  
  // Nouvelle méthode : proposer une flotte à toutes les filiales
  proposeFleetToAllSubsidiaries(vehiclesCount = 10) {
    throw new Error('Méthode abstraite');
  }
}

// Leaf - Société sans filiales
class Company extends CompanyComponent {
  constructor(name, type, employees, revenue, country = 'France') {
    super(name, type, country);
    this.employees = employees;
    this.revenue = revenue; // en milliers d'euros
  }
  
  display(indent = 0) {
    const padding = ' '.repeat(indent * 4);
    const flag = this.getFlagEmoji();
    return `${padding}${flag} ${this.name} (${this.type}) - ${this.employees} employés - ${this.revenue}K€ - ${this.country}`;
  }
  
  getFlagEmoji() {
    const flags = {
      'France': '🇫🇷',
      'Cameroun': '🇨🇲',
      'Sénégal': '🇸🇳',
      "Côte d'Ivoire": '🇨🇮',
      'Nigeria': '🇳🇬',
      'Afrique du Sud': '🇿🇦',
      'Maroc': '🇲🇦',
      'Tunisie': '🇹🇳',
      'Algérie': '🇩🇿'
    };
    return flags[this.country] || '🏢';
  }
  
  getTotalEmployees() {
    return this.employees;
  }
  
  getTotalRevenue() {
    return this.revenue;
  }
  
  proposeFleetPurchase(vehiclesCount = 10) {
    const estimatedAmount = vehiclesCount * 25; // 25K€ par véhicule
    return `📦 ${this.getFlagEmoji()} Proposition de flotte à ${this.name} (${this.country}): ${vehiclesCount} véhicules (≈${estimatedAmount}K€)`;
  }
  
  proposeFleetToAllSubsidiaries(vehiclesCount = 10) {
    // Pour une feuille, c'est la même chose que proposeFleetPurchase
    return [this.proposeFleetPurchase(vehiclesCount)];
  }
  
  applyGroupDiscount(percentage) {
    const discount = this.revenue * (percentage / 100);
    return `🎁 ${this.getFlagEmoji()} Remise de ${percentage}% à ${this.name}: -${discount}K€`;
  }
}

// Composite - Société avec filiales
class CompanyGroup extends CompanyComponent {
  constructor(name, type, country = 'France') {
    super(name, type, country);
    this.children = [];
  }
  
  add(component) {
    this.children.push(component);
  }
  
  remove(component) {
    const index = this.children.indexOf(component);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }
  
  getChildren() {
    return this.children;
  }
  
  display(indent = 0) {
    const padding = ' '.repeat(indent * 4);
    const flag = this.getFlagEmoji();
    let result = `${padding}${flag} ${this.name} (${this.type}) [Groupe] - ${this.country}`;
    
    this.children.forEach(child => {
      result += '\n' + child.display(indent + 1);
    });
    
    return result;
  }
  
  getFlagEmoji() {
    const flags = {
      'France': '🇫🇷',
      'Cameroun': '🇨🇲',
      'Sénégal': '��🇳',
      "Côte d'Ivoire": '🇨🇮',
      'Nigeria': '🇳🇬',
      'Afrique du Sud': '🇿🇦',
      'Maroc': '🇲🇦',
      'Tunisie': '🇹🇳',
      'Algérie': '🇩🇿'
    };
    return flags[this.country] || '🏛️';
  }
  
  getTotalEmployees() {
    return this.children.reduce((total, child) => total + child.getTotalEmployees(), 0);
  }
  
  getTotalRevenue() {
    return this.children.reduce((total, child) => total + child.getTotalRevenue(), 0);
  }
  
  proposeFleetPurchase(vehiclesCount = 50) {
    const totalEmployees = this.getTotalEmployees();
    if (totalEmployees === 0) return "Aucune filiale avec des employés";
    
    const proposals = [`📦 ${this.getFlagEmoji()} Propositions de flotte pour ${this.name} (${this.country}) :`];
    
    this.children.forEach(child => {
      const employeeRatio = child.getTotalEmployees() / totalEmployees;
      const assignedVehicles = Math.round(vehiclesCount * employeeRatio);
      if (assignedVehicles > 0) {
        proposals.push(`  ${child.proposeFleetPurchase(assignedVehicles)}`);
      }
    });
    
    return proposals.join('\n');
  }
  
  proposeFleetToAllSubsidiaries(vehiclesCount = 10) {
    const proposals = [`🚀 ${this.getFlagEmoji()} Proposition de flotte à TOUTES les filiales de ${this.name} (${this.country}) :`];
    let totalVehicles = 0;
    
    // Parcourir récursivement toutes les filiales
    const traverse = (component, baseCount = vehiclesCount) => {
      if (component instanceof Company) {
        // C'est une feuille
        const proposal = component.proposeFleetPurchase(baseCount);
        proposals.push(`  ${proposal}`);
        totalVehicles += baseCount;
      } else if (component instanceof CompanyGroup) {
        // C'est un composite, parcourir ses enfants
        component.getChildren().forEach(child => {
          traverse(child, baseCount);
        });
      }
    };
    
    // Démarrer la traversée depuis ce groupe
    this.children.forEach(child => {
      traverse(child, vehiclesCount);
    });
    
    proposals.push(`\n📊 TOTAL: ${totalVehicles} véhicules proposés à ${this.countAllSubsidiaries()} filiales`);
    return proposals;
  }
  
  countAllSubsidiaries() {
    let count = 0;
    const traverse = (component) => {
      if (component instanceof Company) {
        count++;
      } else if (component instanceof CompanyGroup) {
        component.getChildren().forEach(child => {
          traverse(child);
        });
      }
    };
    
    this.children.forEach(child => {
      traverse(child);
    });
    return count;
  }
  
  applyGroupDiscount(percentage) {
    const discounts = [`🎁 ${this.getFlagEmoji()} Remises de groupe ${this.name} (${percentage}%) :`];
    let totalDiscount = 0;
    
    this.children.forEach(child => {
      const discountResult = child.applyGroupDiscount(percentage);
      discounts.push(`  ${discountResult}`);
      
      // Calculer le montant total de la remise
      const revenue = child.getTotalRevenue();
      totalDiscount += revenue * (percentage / 100);
    });
    
    discounts.push(`\n💰 Total des remises accordées : ${totalDiscount.toFixed(1)}K€`);
    return discounts.join('\n');
  }
}

export function CompositeDemo() {
  const [companyStructure, setCompanyStructure] = useState(null);
  const [displayText, setDisplayText] = useState('');
  const [actionResult, setActionResult] = useState('');
  const [fleetCount, setFleetCount] = useState(10);
  const [discountPercentage, setDiscountPercentage] = useState(10);
  const [selectedGroup, setSelectedGroup] = useState('france');
  
  const buildCompanyStructure = (region = 'france') => {
    if (region === 'france') {
      // Structure française (existante)
      const holding = new CompanyGroup('Groupe Automobile France', 'Holding', 'France');
      
      const distribution = new CompanyGroup('Auto Distribution SA', 'Distribution', 'France');
      distribution.add(new Company('Concession Paris Nord', 'Concession', 45, 1200, 'France'));
      distribution.add(new Company('Concession Lyon Sud', 'Concession', 38, 950, 'France'));
      
      const location = new Company('Fleet Solutions SARL', 'Location', 25, 800, 'France');
      
      holding.add(distribution);
      holding.add(location);
      
      setCompanyStructure(holding);
      setDisplayText(holding.display());
      setSelectedGroup('france');
      
    } else if (region === 'cameroun') {
      // Structure camerounaise
      const cameroonHolding = new CompanyGroup('Groupe Automobile Cameroun', 'Holding', 'Cameroun');
      
      const doualaGroup = new CompanyGroup('Groupe Douala Auto', 'Distribution', 'Cameroun');
      doualaGroup.add(new Company('Concession Douala Bonapriso', 'Concession', 32, 850, 'Cameroun'));
      doualaGroup.add(new Company('Concession Douala Akwa', 'Concession', 28, 720, 'Cameroun'));
      doualaGroup.add(new Company('Atelier Yaoundé Bastos', 'Service', 15, 350, 'Cameroun'));
      
      const yaoundeGroup = new CompanyGroup('Yaoundé Motors', 'Distribution', 'Cameroun');
      yaoundeGroup.add(new Company('Concession Yaoundé Centre', 'Concession', 40, 1100, 'Cameroun'));
      yaoundeGroup.add(new Company('Concession Bafoussam', 'Concession', 22, 580, 'Cameroun'));
      
      const locationCameroon = new Company('Location Express Cameroun', 'Location', 18, 650, 'Cameroun');
      
      cameroonHolding.add(doualaGroup);
      cameroonHolding.add(yaoundeGroup);
      cameroonHolding.add(locationCameroon);
      
      setCompanyStructure(cameroonHolding);
      setDisplayText(cameroonHolding.display());
      setSelectedGroup('cameroun');
      
    } else if (region === 'afrique') {
      // Structure panafricaine
      const africaHolding = new CompanyGroup('Groupe Automobile Afrique', 'Holding multinational', 'Afrique');
      
      // Sous-groupe Afrique de l'Ouest
      const westAfrica = new CompanyGroup('Afrique de l\'Ouest', 'Régional', 'Afrique');
      
      const senegalGroup = new CompanyGroup('Sénégal Auto', 'National', 'Sénégal');
      senegalGroup.add(new Company('Dakar Motors', 'Concession', 35, 920, 'Sénégal'));
      senegalGroup.add(new Company('Thiès Auto Center', 'Concession', 20, 480, 'Sénégal'));
      
      const coteIvoireGroup = new CompanyGroup('Auto Côte d\'Ivoire', 'National', "Côte d'Ivoire");
      coteIvoireGroup.add(new Company('Abidjan Plateau', 'Concession', 42, 1150, "Côte d'Ivoire"));
      coteIvoireGroup.add(new Company('Bouaké Auto', 'Concession', 18, 420, "Côte d'Ivoire"));
      
      const nigeriaGroup = new Company('Lagos Mega Dealer', 'Megaconcession', 85, 2500, 'Nigeria');
      
      westAfrica.add(senegalGroup);
      westAfrica.add(coteIvoireGroup);
      westAfrica.add(nigeriaGroup);
      
      // Sous-groupe Afrique du Nord
      const northAfrica = new CompanyGroup('Afrique du Nord', 'Régional', 'Afrique');
      
      const marocGroup = new Company('Casablanca Motors', 'Concession', 55, 1450, 'Maroc');
      const algerieGroup = new Company('Alger Auto Import', 'Importateur', 48, 1300, 'Algérie');
      const tunisieGroup = new Company('Tunis Auto Distribution', 'Distributeur', 30, 880, 'Tunisie');
      
      northAfrica.add(marocGroup);
      northAfrica.add(algerieGroup);
      northAfrica.add(tunisieGroup);
      
      // Sous-groupe Afrique Australe
      const southAfrica = new Company('Johannesburg Fleet Solutions', 'Location flotte', 65, 1800, 'Afrique du Sud');
      
      africaHolding.add(westAfrica);
      africaHolding.add(northAfrica);
      africaHolding.add(southAfrica);
      
      setCompanyStructure(africaHolding);
      setDisplayText(africaHolding.display());
      setSelectedGroup('afrique');
    }
    
    setActionResult('');
  };
  
  const handleProposeFleetToAll = () => {
    if (!companyStructure) {
      setActionResult('⚠️ Veuillez d\'abord construire une structure de sociétés');
      return;
    }
    
    const proposals = companyStructure.proposeFleetToAllSubsidiaries(fleetCount);
    setActionResult(Array.isArray(proposals) ? proposals.join('\n') : proposals);
  };
  
  const handleProposeFleet = () => {
    if (!companyStructure) {
      setActionResult('⚠️ Veuillez d\'abord construire une structure de sociétés');
      return;
    }
    
    const proposal = companyStructure.proposeFleetPurchase(fleetCount);
    setActionResult(proposal);
  };
  
  const handleApplyDiscount = () => {
    if (!companyStructure) {
      setActionResult('⚠️ Veuillez d\'abord construire une structure de sociétés');
      return;
    }
    
    const discount = companyStructure.applyGroupDiscount(discountPercentage);
    setActionResult(discount);
  };
  
  const handleDisplayStructure = () => {
    if (!companyStructure) {
      setActionResult('⚠️ Veuillez d\'abord construire une structure de sociétés');
      return;
    }
    
    setDisplayText(companyStructure.display());
    setActionResult('Structure affichée');
  };
  
  return (
    <div className="p-6 bg-gray-50 rounded-xl">
      <h2 className="text-2xl font-bold mb-6">🏢 Gestion des sociétés clientes</h2>
      <p className="text-gray-600 mb-6">
        Pattern Composite pour la hiérarchie société/filiales
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contrôles gauche */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">🌍 Sélectionner une région</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => buildCompanyStructure('france')}
                className={`px-4 py-2 rounded-lg ${selectedGroup === 'france' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                🇫🇷 France
              </button>
              <button
                onClick={() => buildCompanyStructure('cameroun')}
                className={`px-4 py-2 rounded-lg ${selectedGroup === 'cameroun' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                🇨🇲 Cameroun
              </button>
              <button
                onClick={() => buildCompanyStructure('afrique')}
                className={`px-4 py-2 rounded-lg ${selectedGroup === 'afrique' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                🌍 Afrique
              </button>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">⚙️ Paramètres</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de véhicules par filiale: {fleetCount}
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={fleetCount}
                  onChange={(e) => setFleetCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pourcentage de remise: {discountPercentage}%
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={discountPercentage}
                  onChange={(e) => setDiscountPercentage(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1%</span>
                  <span>25%</span>
                  <span>50%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">🚀 Actions</h3>
            <div className="space-y-3">
              <button
                onClick={handleProposeFleetToAll}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
              >
                <span className="text-lg">📦</span>
                Proposer une flotte à TOUTES les filiales
              </button>
              
              <button
                onClick={handleProposeFleet}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <span className="text-lg">🚗</span>
                Proposer une flotte (répartition)
              </button>
              
              <button
                onClick={handleApplyDiscount}
                className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <span className="text-lg">🎁</span>
                Appliquer remise de groupe
              </button>
              
              <button
                onClick={handleDisplayStructure}
                className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Afficher la structure
              </button>
            </div>
          </div>
        </div>
        
        {/* Résultats droite */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">🏛️ Structure hiérarchique</h3>
            {displayText ? (
              <div className="bg-gray-50 p-4 rounded font-mono text-sm whitespace-pre">
                {displayText}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-3">🏢</div>
                <p>Sélectionnez une région pour construire la structure</p>
              </div>
            )}
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">📋 Résultat des actions</h3>
            {actionResult ? (
              <div className="bg-blue-50 p-4 rounded font-mono text-sm whitespace-pre">
                {actionResult}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-3">📄</div>
                <p>Cliquez sur une action pour voir le résultat</p>
              </div>
            )}
          </div>
          
          {companyStructure && (
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">📊 Statistiques</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded text-center">
                  <div className="text-2xl font-bold text-blue-600">{companyStructure.getTotalEmployees()}</div>
                  <div className="text-sm text-gray-600">Employés totaux</div>
                </div>
                <div className="bg-gray-50 p-4 rounded text-center">
                  <div className="text-2xl font-bold text-green-600">{companyStructure.getTotalRevenue()}K€</div>
                  <div className="text-sm text-gray-600">Chiffre d'affaires</div>
                </div>
                <div className="bg-gray-50 p-4 rounded text-center">
                  <div className="text-2xl font-bold text-purple-600">{companyStructure.countAllSubsidiaries()}</div>
                  <div className="text-sm text-gray-600">Filiales totales</div>
                </div>
                <div className="bg-gray-50 p-4 rounded text-center">
                  <div className="text-2xl font-bold text-yellow-600">{selectedGroup === 'france' ? '🇫🇷' : selectedGroup === 'cameroun' ? '🇨🇲' : '🌍'}</div>
                  <div className="text-sm text-gray-600">Région</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <h4 className="font-bold text-blue-800 mb-2">ℹ️ Explication du Composite</h4>
        <p className="text-blue-700">
          Le patron Composite permet de traiter uniformément des sociétés individuelles et des groupes de sociétés.
          La nouvelle fonction <code>proposeFleetToAllSubsidiaries()</code> parcourt récursivement toutes les filiales
          d'un groupe pour proposer une flotte de véhicules à chacune d'entre elles.
        </p>
      </div>
    </div>
  );
}
