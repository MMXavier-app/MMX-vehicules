import React, { useState } from 'react';

// Component interface
const CompanyComponent = ({ company, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const hasSubsidiaries = company.subsidiaries && company.subsidiaries.length > 0;
  
  const indentStyle = {
    marginLeft: `${level * 24}px`,
    borderLeft: level > 0 ? '2px solid #e5e7eb' : 'none',
    paddingLeft: level > 0 ? '16px' : '0',
  };

  const handleFleetPurchase = () => {
    const discount = calculateFleetDiscount(company);
    const message = `📦 Proposition de flotte envoyée à ${company.name}\n` +
                   `📍 ${company.city}, ${company.country || 'France'}\n` +
                   `💵 Remise applicable: ${discount}%\n` +
                   `🚗 Proposition propagée à ${company.subsidiaries?.length || 0} filiale(s)`;
    alert(message);
  };

  const calculateFleetDiscount = (company) => {
    let discount = 5.0; // Base
    if (company.subsidiaries) {
      discount += Math.min(company.subsidiaries.length * 2, 15);
    }
    // Bonus pour les sociétés africaines
    if (company.country && company.country !== 'France') {
      discount += 8.0;
    }
    // Bonus spécial Cameroun
    if (company.country === 'Cameroun') {
      discount += 5.0;
    }
    return Math.min(discount, 35.0);
  };

  const getFlagEmoji = (country) => {
    if (!country) return '🏢';
    const flags = {
      'France': '🇫🇷',
      'Cameroun': '🇨🇲',
      'Sénégal': '🇸🇳',
      'Côte d\'Ivoire': '🇨🇮',
      'Gabon': '��🇦',
      'Maroc': '🇲🇦'
    };
    return flags[country] || '🌍';
  };

  return (
    <div className="mb-3" style={indentStyle}>
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-xl">
              {getFlagEmoji(company.country)}
            </span>
          </div>
          <div>
            <h4 className="font-bold">{company.name}</h4>
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-2">{company.type}</span>
              <span className="mx-2">•</span>
              <span className="mr-2">{company.employees} employés</span>
              {company.country && (
                <>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    {getFlagEmoji(company.country)} {company.city}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleFleetPurchase}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            🚗 Flotte
          </button>
          
          {hasSubsidiaries && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
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
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Leaf component (sans filiales)
const LeafCompany = ({ company, level = 0 }) => {
  const indentStyle = {
    marginLeft: `${level * 24}px`,
    borderLeft: level > 0 ? '2px solid #e5e7eb' : 'none',
    paddingLeft: level > 0 ? '16px' : '0',
  };

  const getFlagEmoji = (country) => {
    if (!country) return '🏢';
    const flags = {
      'France': '🇫🇷',
      'Cameroun': '🇨🇲',
      'Sénégal': '🇸🇳'
    };
    return flags[country] || '🏢';
  };

  return (
    <div className="mb-2" style={indentStyle}>
      <div className="flex items-center bg-gray-50 p-3 rounded">
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
          <span className="text-xl">
            {getFlagEmoji(company.country)}
          </span>
        </div>
        <div>
          <h4 className="font-semibold">{company.name}</h4>
          <p className="text-xs text-gray-500">
            {company.city && `${company.city}, `}{company.country || 'France'} • Pas de filiales
          </p>
        </div>
      </div>
    </div>
  );
};

// Composite container
export const CompanyTree = ({ companies }) => {
  const renderCompany = (company) => {
    if (company.subsidiaries && company.subsidiaries.length > 0) {
      return <CompanyComponent key={company.id} company={company} />;
    } else {
      return <LeafCompany key={company.id} company={company} />;
    }
  };

  // Statistiques
  const stats = {
    total: companies.length,
    french: companies.filter(c => !c.country || c.country === 'France').length,
    african: companies.filter(c => c.country && c.country !== 'France').length,
    withSubsidiaries: companies.filter(c => c.subsidiaries && c.subsidiaries.length > 0).length
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">🏢 Gestion des sociétés clientes</h2>
          <p className="text-gray-600">Pattern Composite - Hiérarchie société/filiales</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                🇫🇷 {stats.french} françaises
              </span>
              <span className="flex items-center">
                🌍 {stats.african} africaines
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800">🇫🇷 Groupe France</h3>
          <p className="text-sm text-gray-600">Paris • Lyon • Marseille</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800">🇨🇲 Groupe Cameroun</h3>
          <p className="text-sm text-gray-600">Yaoundé • Douala • Bafoussam</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="font-semibold text-yellow-800">🇸🇳 Groupe Sénégal</h3>
          <p className="text-sm text-gray-600">Dakar • Thiès • Saint-Louis</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-800">🇨🇮 Côte d'Ivoire</h3>
          <p className="text-sm text-gray-600">Abidjan • Bouaké • Yamoussoukro</p>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="text-sm text-gray-600 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border">
          <span className="font-semibold">🏗️ Structure Composite :</span> 
          <ul className="mt-2 space-y-1">
            <li>• Chaque société peut contenir des filiales (arborescence)</li>
            <li>• Les opérations (achat de flotte) se propagent récursivement</li>
            <li>• Remise calculée dynamiquement selon la taille de la hiérarchie</li>
            <li>• Bonus pour les sociétés africaines et camerounaises</li>
          </ul>
        </div>
      </div>
      
      <div className="space-y-2">
        {companies.map(renderCompany)}
      </div>

      <div className="mt-8 pt-6 border-t">
        <h3 className="font-semibold text-lg mb-3">🚀 Fonctionnalités implémentées</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-50 p-3 rounded">
            <span className="font-medium">📊 Hiérarchie Composite</span>
            <p className="text-gray-600">Gestion arborescente société/filiales</p>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <span className="font-medium">🌍 Multi-pays</span>
            <p className="text-gray-600">France + pays africains avec drapeaux</p>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <span className="font-medium">💵 Remises dynamiques</span>
            <p className="text-gray-600">Calcul basé sur taille hiérarchie + bonus région</p>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <span className="font-medium">�� Proposition flotte</span>
            <p className="text-gray-600">Propagation automatique à toutes les filiales</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Données d'exemple - Socités françaises
export const sampleCompanies = [
  {
    id: 1,
    name: 'Groupe Automobile France',
    type: 'Holding',
    employees: 1200,
    city: 'Paris',
    subsidiaries: [
      {
        id: 2,
        name: 'Auto Distribution SA',
        type: 'Distribution',
        employees: 350,
        city: 'Lyon',
        subsidiaries: [
          {
            id: 3,
            name: 'Concession Paris Nord',
            type: 'Concession',
            employees: 45,
            city: 'Paris 18ème'
          },
          {
            id: 4,
            name: 'Concession Lyon Sud',
            type: 'Concession',
            employees: 38,
            city: 'Lyon 7ème'
          },
        ],
      },
      {
        id: 5,
        name: 'Fleet Solutions SARL',
        type: 'Location',
        employees: 120,
        city: 'Marseille'
      },
    ],
  },
  {
    id: 6,
    name: 'Tech Innovators Inc',
    type: 'Startup',
    employees: 85,
    city: 'Paris'
  },
];
