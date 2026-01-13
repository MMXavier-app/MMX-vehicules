import React, { useState } from 'react';

// Helper pour obtenir les drapeaux
const getFlagEmoji = (country) => {
  const flags = {
    'France': '��🇷',
    'Cameroun': '🇨🇲',
    'Sénégal': '🇸🇳',
    "Côte d'Ivoire": '🇨🇮',
    'Nigeria': '🇳🇬',
    'Afrique du Sud': '🇿🇦',
    'Maroc': '��🇦',
    'Tunisie': '🇹🇳',
    'Algérie': '🇩🇿',
    'Afrique': '🌍'
  };
  return flags[country] || '🏢';
};

// Component interface
const CompanyComponent = ({ company, level = 0, onProposeFleetToAll }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const hasSubsidiaries = company.subsidiaries && company.subsidiaries.length > 0;
  const flag = getFlagEmoji(company.country || 'France');
  
  const indentStyle = {
    marginLeft: `${level * 24}px`,
    borderLeft: level > 0 ? '2px solid #e5e7eb' : 'none',
    paddingLeft: level > 0 ? '16px' : '0',
  };

  const handleFleetPurchase = () => {
    alert(`📦 Proposition de flotte envoyée à ${company.name} (${company.country || 'France'})`);
  };

  const handleFleetToAll = () => {
    if (onProposeFleetToAll && company.id) {
      onProposeFleetToAll(company.id);
    } else {
      alert(`🚀 Proposition de flotte envoyée à TOUTES les filiales de ${company.name}`);
    }
  };

  return (
    <div className="mb-3" style={indentStyle}>
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center mr-3">
            <span className="text-lg">
              {flag}
            </span>
          </div>
          <div>
            <h4 className="font-bold">{company.name}</h4>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{company.type}</span>
              <span className="text-xs px-2 py-1 bg-gray-100 rounded">{company.country || 'France'}</span>
              <span className="text-sm text-gray-500">• {company.employees || 0} employés</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {hasSubsidiaries && (
            <button
              onClick={handleFleetToAll}
              className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all text-sm flex items-center gap-1"
              title="Proposer à toutes les filiales"
            >
              <span>📦</span>
              <span>Toutes</span>
            </button>
          )}
          
          <button
            onClick={handleFleetPurchase}
            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-1"
          >
            <span>🚗</span>
            <span>Flotte</span>
          </button>
          
          {hasSubsidiaries && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              title={isExpanded ? "Réduire" : "Développer"}
            >
              {isExpanded ? '−' : '+'}
            </button>
          )}
        </div>
      </div>
      
      {/* Rendu récursif des filiales */}
      {isExpanded && hasSubsidiaries && (
        <div className="mt-3">
          {company.subsidiaries.map(subsidiary => (
            <CompanyComponent 
              key={subsidiary.id} 
              company={subsidiary} 
              level={level + 1}
              onProposeFleetToAll={onProposeFleetToAll}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Leaf component (sans filiales)
const LeafCompany = ({ company, level = 0 }) => {
  const flag = getFlagEmoji(company.country || 'France');
  
  const indentStyle = {
    marginLeft: `${level * 24}px`,
    borderLeft: level > 0 ? '2px solid #e5e7eb' : 'none',
    paddingLeft: level > 0 ? '16px' : '0',
  };

  const handleFleetPurchase = () => {
    alert(`📦 Proposition de flotte envoyée à ${company.name} (${company.country || 'France'})`);
  };

  return (
    <div className="mb-2" style={indentStyle}>
      <div className="flex items-center justify-between bg-gray-50 p-3 rounded hover:bg-gray-100 transition-colors">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
            <span className="text-sm">{flag}</span>
          </div>
          <div>
            <h4 className="font-semibold">{company.name}</h4>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Feuille •</span>
              <span className="text-xs px-2 py-0.5 bg-gray-200 rounded">{company.country || 'France'}</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleFleetPurchase}
          className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xs"
        >
          Proposer flotte
        </button>
      </div>
    </div>
  );
};

// Composite container
export const CompanyTree = ({ companies, onProposeFleetToAll }) => {
  const [proposeToAllResult, setProposeToAllResult] = useState('');
  
  const handleProposeToAll = (companyId) => {
    // Simuler une API call
    const company = findCompanyById(companies, companyId);
    if (company) {
      const count = countAllSubsidiaries(company);
      setProposeToAllResult(`🚀 Proposition envoyée à ${count} filiales de ${company.name}`);
      
      // Effacer après 3 secondes
      setTimeout(() => setProposeToAllResult(''), 3000);
    }
  };
  
  const findCompanyById = (companies, id) => {
    // Recherche récursive
    for (const company of companies) {
      if (company.id === id) return company;
      if (company.subsidiaries) {
        const found = findCompanyById(company.subsidiaries, id);
        if (found) return found;
      }
    }
    return null;
  };
  
  const countAllSubsidiaries = (company) => {
    let count = 0;
    const traverse = (comp) => {
      if (comp.subsidiaries && comp.subsidiaries.length > 0) {
        comp.subsidiaries.forEach(subs => {
          count++;
          traverse(subs);
        });
      }
    };
    traverse(company);
    return count;
  };
  
  const renderCompany = (company) => {
    if (company.subsidiaries && company.subsidiaries.length > 0) {
      return (
        <CompanyComponent 
          key={company.id} 
          company={company} 
          onProposeFleetToAll={handleProposeToAll}
        />
      );
    } else {
      return <LeafCompany key={company.id} company={company} />;
    }
  };
  
  return (
    <div>
      {proposeToAllResult && (
        <div className="mb-4 p-3 bg-gradient-to-r from-green-100 to-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-green-600">✅</span>
            <span className="text-green-700">{proposeToAllResult}</span>
          </div>
        </div>
      )}
      
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">🏢 Arborescence des sociétés clientes</h3>
          <div className="text-sm text-gray-500">
            {companies.length} groupe(s) • {countAllSubsidiaries({ subsidiaries: companies })} filiale(s)
          </div>
        </div>
        
        <div className="space-y-2">
          {companies.map(company => renderCompany(company))}
        </div>
      </div>
    </div>
  );
};

// Données d'exemple avec sociétés africaines
export const sampleAfricanCompanies = [
  {
    id: 1,
    name: 'Groupe Automobile Afrique',
    type: 'Holding multinational',
    country: 'Afrique',
    employees: 450,
    subsidiaries: [
      {
        id: 2,
        name: 'Afrique de l\'Ouest',
        type: 'Régional',
        country: 'Afrique',
        employees: 220,
        subsidiaries: [
          {
            id: 3,
            name: 'Sénégal Auto',
            type: 'National',
            country: 'Sénégal',
            employees: 85,
            subsidiaries: [
              { id: 4, name: 'Dakar Motors', type: 'Concession', country: 'Sénégal', employees: 45 },
              { id: 5, name: 'Thiès Auto Center', type: 'Concession', country: 'Sénégal', employees: 25 }
            ]
          },
          {
            id: 6,
            name: 'Auto Côte d\'Ivoire',
            type: 'National',
            country: "Côte d'Ivoire",
            employees: 75,
            subsidiaries: [
              { id: 7, name: 'Abidjan Plateau', type: 'Concession', country: "Côte d'Ivoire", employees: 42 },
              { id: 8, name: 'Bouaké Auto', type: 'Concession', country: "Côte d'Ivoire", employees: 18 }
            ]
          }
        ]
      },
      {
        id: 9,
        name: 'Afrique du Nord',
        type: 'Régional',
        country: 'Afrique',
        employees: 180,
        subsidiaries: [
          { id: 10, name: 'Casablanca Motors', type: 'Concession', country: 'Maroc', employees: 65 },
          { id: 11, name: 'Alger Auto Import', type: 'Importateur', country: 'Algérie', employees: 58 },
          { id: 12, name: 'Tunis Auto Distribution', type: 'Distributeur', country: 'Tunisie', employees: 42 }
        ]
      }
    ]
  },
  {
    id: 13,
    name: 'Groupe Automobile Cameroun',
    type: 'Holding national',
    country: 'Cameroun',
    employees: 195,
    subsidiaries: [
      {
        id: 14,
        name: 'Groupe Douala Auto',
        type: 'Distribution',
        country: 'Cameroun',
        employees: 95,
        subsidiaries: [
          { id: 15, name: 'Concession Douala Bonapriso', type: 'Concession', country: 'Cameroun', employees: 42 },
          { id: 16, name: 'Concession Douala Akwa', type: 'Concession', country: 'Cameroun', employees: 38 }
        ]
      },
      {
        id: 17,
        name: 'Yaoundé Motors',
        type: 'Distribution',
        country: 'Cameroun',
        employees: 72,
        subsidiaries: [
          { id: 18, name: 'Concession Yaoundé Centre', type: 'Concession', country: 'Cameroun', employees: 40 },
          { id: 19, name: 'Concession Bafoussam', type: 'Concession', country: 'Cameroun', employees: 22 }
        ]
      }
    ]
  }
];
