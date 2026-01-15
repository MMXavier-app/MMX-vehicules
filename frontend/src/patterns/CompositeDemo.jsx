import React, { useState } from 'react';

// Composite Pattern - Représentation hiérarchique des sociétés

// Component interface
class CompanyComponent {
  constructor(name, type) {
    this.name = name;
    this.type = type;
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
  
  proposeFleetPurchase(vehiclesCount = 10) {
    throw new Error('Méthode abstraite');
  }
  
  applyGroupDiscount(percentage) {
    throw new Error('Méthode abstraite');
  }
}

// Leaf - Société sans filiales
class Company extends CompanyComponent {
  constructor(name, type, employees, revenue) {
    super(name, type);
    this.employees = employees;
    this.revenue = revenue; // en milliers d'euros
  }
  
  display(indent = 0) {
    const padding = ' '.repeat(indent * 4);
    return `${padding}🏢 ${this.name} (${this.type}) - ${this.employees} employés - ${this.revenue}K€`;
  }
  
  getTotalEmployees() {
    return this.employees;
  }
  
  getTotalRevenue() {
    return this.revenue;
  }
  
  proposeFleetPurchase(vehiclesCount = 10) {
    const estimatedAmount = vehiclesCount * 25; // 25K€ par véhicule
    return `📦 Proposition de flotte envoyée à ${this.name}: ${vehiclesCount} véhicules (≈${estimatedAmount}K€)`;
  }
  
  applyGroupDiscount(percentage) {
    const discount = this.revenue * (percentage / 100);
    return `🎁 Remise de ${percentage}% appliquée à ${this.name}: -${discount}K€`;
  }
}

// Composite - Société avec filiales
class CompanyGroup extends CompanyComponent {
  constructor(name, type) {
    super(name, type);
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
  
  display(indent = 0) {
    const padding = ' '.repeat(indent * 4);
    let result = `${padding}🏛️ ${this.name} (${this.type}) [Groupe]`;
    
    this.children.forEach(child => {
      result += '\n' + child.display(indent + 1);
    });
    
    return result;
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
    
    const proposals = ["📦 Propositions de flotte pour le groupe :"];
    
    this.children.forEach(child => {
      const employeeRatio = child.getTotalEmployees() / totalEmployees;
      const assignedVehicles = Math.round(vehiclesCount * employeeRatio);
      if (assignedVehicles > 0) {
        proposals.push(child.proposeFleetPurchase(assignedVehicles));
      }
    });
    
    return proposals.join('\n');
  }
  
  applyGroupDiscount(percentage) {
    const discounts = [`🎁 Remises de groupe (${percentage}%) :`];
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
  const [fleetCount, setFleetCount] = useState(50);
  const [discountPercentage, setDiscountPercentage] = useState(10);
  
  const buildCompanyStructure = () => {
    // Créer la structure hiérarchique
    const holding = new CompanyGroup('Groupe Automobile France', 'Holding');
    
    const distribution = new CompanyGroup('Auto Distribution SA', 'Distribution');
    distribution.add(new Company('Concession Paris Nord', 'Concession', 45, 1200));
    distribution.add(new Company('Concession Lyon Sud', 'Concession', 38, 950));
    distribution.add(new Company('Concession Marseille Est', 'Concession', 32, 800));
    
    const fleetSolutions = new CompanyGroup('Fleet Solutions SARL', 'Location');
    fleetSolutions.add(new Company('Location Paris', 'Agence', 25, 600));
    fleetSolutions.add(new Company('Location Lyon', 'Agence', 20, 500));
    
    const logistics = new Company('LogiTrans Express', 'Logistique', 15, 300);
    
    holding.add(distribution);
    holding.add(fleetSolutions);
    holding.add(logistics);
    
    setCompanyStructure(holding);
    setDisplayText(holding.display());
  };
  
  const calculateTotalEmployees = () => {
    if (companyStructure) {
      const total = companyStructure.getTotalEmployees();
      setActionResult(`👥 Total des employés dans toute la hiérarchie : ${total} employés`);
    }
  };
  
  const calculateTotalRevenue = () => {
    if (companyStructure) {
      const total = companyStructure.getTotalRevenue();
      setActionResult(`💰 Chiffre d'affaires total du groupe : ${total}K€ (${(total * 1000).toLocaleString()} €)`);
    }
  };
  
  const proposeFleetToAll = () => {
    if (companyStructure) {
      const proposals = companyStructure.proposeFleetPurchase(fleetCount);
      setActionResult(proposals);
    }
  };
  
  const applyGroupDiscount = () => {
    if (companyStructure) {
      const discounts = companyStructure.applyGroupDiscount(discountPercentage);
      setActionResult(discounts);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-teal-50 p-4 rounded-lg">
        <h3 className="font-bold text-teal-800 mb-2">Composite Pattern</h3>
        <p className="text-teal-700">
          Permet de traiter des objets individuels et des compositions d'objets de manière uniforme.
          Idéal pour représenter les sociétés avec leurs filiales.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <button
            onClick={buildCompanyStructure}
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors"
          >
            🏗️ Construire la structure des sociétés
          </button>
          
          {companyStructure && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-2">
                <button
                  onClick={calculateTotalEmployees}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  👥 Calculer le total des employés
                </button>
                
                <button
                  onClick={calculateTotalRevenue}
                  className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  💰 Calculer le chiffre d'affaires
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={fleetCount}
                    onChange={(e) => setFleetCount(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm font-semibold">{fleetCount} véhicules</span>
                </div>
                <button
                  onClick={proposeFleetToAll}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  🚗 Proposer une flotte ({fleetCount} véhicules)
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="5"
                    max="30"
                    value={discountPercentage}
                    onChange={(e) => setDiscountPercentage(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm font-semibold">{discountPercentage}%</span>
                </div>
                <button
                  onClick={applyGroupDiscount}
                  className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  🎁 Appliquer remise de groupe
                </button>
              </div>
            </div>
          )}
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-2">Structure Composite :</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• <span className="font-semibold">Component</span>: Interface commune pour toutes les sociétés</li>
              <li>• <span className="font-semibold">Leaf</span>: Société sans filiales (feuille)</li>
              <li>• <span className="font-semibold">Composite</span>: Société avec filiales (conteneur)</li>
              <li>• <span className="font-semibold">Transparence</span>: Mêmes opérations pour Leaf et Composite</li>
              <li>• <span className="font-semibold">Récursivité</span>: Opérations appliquées à toute la hiérarchie</li>
            </ul>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-gray-800 mb-4">Structure des sociétés :</h4>
          
          {displayText ? (
            <div className="space-y-4">
              <div className="bg-white border rounded-lg p-4 max-h-96 overflow-y-auto">
                <pre className="text-sm font-mono whitespace-pre-wrap">
                  {displayText}
                </pre>
              </div>
              
              {actionResult && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <pre className="text-sm whitespace-pre-wrap">{actionResult}</pre>
                </div>
              )}
              
              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="text-sm text-yellow-800">
                  💡 <span className="font-semibold">Avantages du Composite :</span><br/>
                  1. <strong>Traitement uniforme</strong> : Mêmes méthodes pour sociétés individuelles et groupes<br/>
                  2. <strong>Extensibilité</strong> : Ajout facile de nouvelles opérations<br/>
                  3. <strong>Hiérarchie naturelle</strong> : Représente fidèlement la structure entreprise/filiales<br/>
                  4. <strong>Réutilisation</strong> : Code commun pour toutes les sociétés
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-lg mb-2">Construisez d'abord la structure des sociétés</p>
              <p className="text-sm">Le Composite pattern permet de gérer les hiérarchies société/filiales de manière transparente</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h5 className="font-bold text-teal-700 mb-2">🏢 Leaf</h5>
          <p className="text-gray-600">Société individuelle sans filiales. Ex: "Concession Paris Nord"</p>
          <div className="mt-2 text-xs text-teal-600 bg-teal-50 p-1 rounded">
            Opérations locales
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h5 className="font-bold text-teal-700 mb-2">🏛️ Composite</h5>
          <p className="text-gray-600">Groupe contenant d'autres sociétés. Ex: "Auto Distribution SA"</p>
          <div className="mt-2 text-xs text-teal-600 bg-teal-50 p-1 rounded">
            Délègue aux enfants
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h5 className="font-bold text-teal-700 mb-2">🔄 Transparence</h5>
          <p className="text-gray-600">Client utilise Component sans connaître Leaf/Composite</p>
          <div className="mt-2 text-xs text-teal-600 bg-teal-50 p-1 rounded">
            Interface unique
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h5 className="font-bold text-teal-700 mb-2">📊 Récursivité</h5>
          <p className="text-gray-600">Opérations appliquées à toute l'arborescence</p>
          <div className="mt-2 text-xs text-teal-600 bg-teal-50 p-1 rounded">
            Traversée hiérarchique
          </div>
        </div>
      </div>
    </div>
  );
}
