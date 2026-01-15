import React, { useState } from 'react';

// Bridge Pattern Implementation

// ==================== IMPLÉMENTATIONS (Rendering Engines) ====================

// Interface pour les moteurs de rendu
class RenderingEngine {
  renderField(label, type, name, required = false, value = '') {
    throw new Error('Méthode abstraite');
  }
  
  renderSubmitButton(label) {
    throw new Error('Méthode abstraite');
  }
  
  renderFormTitle(title) {
    throw new Error('Méthode abstraite');
  }
  
  getFormWrapper(children) {
    throw new Error('Méthode abstraite');
  }
}

// Implémentation HTML
class HTMLEngine extends RenderingEngine {
  renderField(label, type, name, required = false, value = '') {
    const requiredAttr = required ? 'required' : '';
    const fieldId = `field-${name}`;
    
    if (type === 'textarea') {
      return `
        <div class="form-group mb-4">
          <label for="${fieldId}" class="block text-gray-700 mb-2">${label}${required ? ' *' : ''}</label>
          <textarea 
            id="${fieldId}" 
            name="${name}" 
            ${requiredAttr}
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="3"
          >${value}</textarea>
        </div>
      `;
    }
    
    if (type === 'select') {
      const options = `
        <option value="">Sélectionnez...</option>
        <option value="particulier">Particulier</option>
        <option value="professionnel">Professionnel</option>
        <option value="societe">Société</option>
      `;
      
      return `
        <div class="form-group mb-4">
          <label for="${fieldId}" class="block text-gray-700 mb-2">${label}${required ? ' *' : ''}</label>
          <select 
            id="${fieldId}" 
            name="${name}" 
            ${requiredAttr}
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >${options}</select>
        </div>
      `;
    }
    
    return `
      <div class="form-group mb-4">
        <label for="${fieldId}" class="block text-gray-700 mb-2">${label}${required ? ' *' : ''}</label>
        <input 
          type="${type}" 
          id="${fieldId}" 
          name="${name}" 
          value="${value}"
          ${requiredAttr}
          class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    `;
  }
  
  renderSubmitButton(label) {
    return `
      <button 
        type="submit" 
        class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-bold"
      >
        ${label}
      </button>
    `;
  }
  
  renderFormTitle(title) {
    return `<h3 class="text-xl font-bold text-gray-800 mb-6">${title}</h3>`;
  }
  
  getFormWrapper(children) {
    return `
      <form class="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
        ${children}
      </form>
    `;
  }
}

// Implémentation Widget
class WidgetEngine extends RenderingEngine {
  renderField(label, type, name, required = false, value = '') {
    const requiredIndicator = required ? '<span class="text-red-500">*</span>' : '';
    const widgetClass = this.getWidgetClass(type);
    
    if (type === 'textarea') {
      return `
        <WidgetContainer class="mb-6">
          <WidgetLabel>${label} ${requiredIndicator}</WidgetLabel>
          <TextAreaWidget 
            name="${name}" 
            placeholder="Saisissez ${label.toLowerCase()}..."
            value="${value}"
            ${required ? 'required' : ''}
            class="${widgetClass}"
          />
        </WidgetContainer>
      `;
    }
    
    if (type === 'select') {
      return `
        <WidgetContainer class="mb-6">
          <WidgetLabel>${label} ${requiredIndicator}</WidgetLabel>
          <SelectWidget name="${name}" ${required ? 'required' : ''}>
            <WidgetOption value="">Choisissez...</WidgetOption>
            <WidgetOption value="particulier">👤 Particulier</WidgetOption>
            <WidgetOption value="professionnel">💼 Professionnel</WidgetOption>
            <WidgetOption value="societe">🏢 Société</WidgetOption>
          </SelectWidget>
        </WidgetContainer>
      `;
    }
    
    return `
      <WidgetContainer class="mb-6">
        <WidgetLabel>${label} ${requiredIndicator}</WidgetLabel>
        <InputWidget 
          type="${type}" 
          name="${name}" 
          placeholder="${label}"
          value="${value}"
          ${required ? 'required' : ''}
          class="${widgetClass}"
        />
      </WidgetContainer>
    `;
  }
  
  renderSubmitButton(label) {
    return `
      <WidgetContainer class="mt-8">
        <SubmitWidget 
          label="${label}" 
          icon="✓"
          variant="primary"
          size="large"
        />
      </WidgetContainer>
    `;
  }
  
  renderFormTitle(title) {
    return `
      <WidgetHeader>
        <WidgetTitle>${title}</WidgetTitle>
        <WidgetSubtitle>Remplissez les champs ci-dessous</WidgetSubtitle>
      </WidgetHeader>
    `;
  }
  
  getFormWrapper(children) {
    return `
      <WidgetForm theme="modern" layout="vertical" spacing="comfortable">
        ${children}
      </WidgetForm>
    `;
  }
  
  getWidgetClass(type) {
    const classes = {
      text: 'widget-input-text',
      email: 'widget-input-email',
      tel: 'widget-input-tel',
      date: 'widget-input-date',
      number: 'widget-input-number',
      textarea: 'widget-textarea'
    };
    return classes[type] || 'widget-input-default';
  }
}

// ==================== ABSTRACTIONS (Form Types) ====================

// Classe de base pour les formulaires
class Form {
  constructor(renderingEngine) {
    this.renderingEngine = renderingEngine;
    this.fields = [];
    this.title = '';
    this.submitLabel = 'Soumettre';
  }
  
  addField(label, type, name, required = false) {
    this.fields.push({ label, type, name, required });
  }
  
  setTitle(title) {
    this.title = title;
  }
  
  setSubmitLabel(label) {
    this.submitLabel = label;
  }
  
  render() {
    let formContent = '';
    
    // Titre
    formContent += this.renderingEngine.renderFormTitle(this.title);
    
    // Champs
    this.fields.forEach(field => {
      formContent += this.renderingEngine.renderField(
        field.label,
        field.type,
        field.name,
        field.required
      );
    });
    
    // Bouton de soumission
    formContent += this.renderingEngine.renderSubmitButton(this.submitLabel);
    
    // Wrapper
    return this.renderingEngine.getFormWrapper(formContent);
  }
}

// Formulaires concrets
class VehicleRegistrationForm extends Form {
  constructor(renderingEngine) {
    super(renderingEngine);
    this.setTitle('📝 Immatriculation de véhicule');
    this.setSubmitLabel('Enregistrer le véhicule');
    
    this.addField('Numéro de série', 'text', 'serialNumber', true);
    this.addField('Marque', 'text', 'brand', true);
    this.addField('Modèle', 'text', 'model', true);
    this.addField('Année', 'number', 'year', true);
    this.addField('Type de carburant', 'select', 'fuelType', true);
    this.addField('Kilométrage', 'number', 'mileage');
    this.addField('Date première immatriculation', 'date', 'firstRegistration', true);
    this.addField('Observations', 'textarea', 'observations');
  }
}

class ClientInformationForm extends Form {
  constructor(renderingEngine) {
    super(renderingEngine);
    this.setTitle('👤 Informations client');
    this.setSubmitLabel('Enregistrer le client');
    
    this.addField('Civilité', 'select', 'title', true);
    this.addField('Nom', 'text', 'lastName', true);
    this.addField('Prénom', 'text', 'firstName', true);
    this.addField('Email', 'email', 'email', true);
    this.addField('Téléphone', 'tel', 'phone', true);
    this.addField('Adresse', 'textarea', 'address', true);
    this.addField('Code postal', 'text', 'postalCode', true);
    this.addField('Ville', 'text', 'city', true);
    this.addField('Type de client', 'select', 'clientType', true);
  }
}

class OrderForm extends Form {
  constructor(renderingEngine) {
    super(renderingEngine);
    this.setTitle('🛒 Commande de véhicule');
    this.setSubmitLabel('Confirmer la commande');
    
    this.addField('Référence commande', 'text', 'orderReference', true);
    this.addField('Date de livraison souhaitée', 'date', 'deliveryDate', true);
    this.addField('Adresse de livraison', 'textarea', 'deliveryAddress', true);
    this.addField('Mode de paiement', 'select', 'paymentMethod', true);
    this.addField('Numéro de carte (optionnel)', 'text', 'cardNumber');
    this.addField('Commentaires', 'textarea', 'comments');
    this.addField('Souhaitez-vous un essai ?', 'select', 'testDrive');
  }
}

// ==================== COMPOSANT REACT ====================

const FormulairesBridge = () => {
  const [formType, setFormType] = useState('vehicle');
  const [rendererType, setRendererType] = useState('html');
  const [renderedForm, setRenderedForm] = useState('');
  const [formData, setFormData] = useState({});
  const [submissionResult, setSubmissionResult] = useState(null);

  const renderForm = () => {
    // Choisir le moteur de rendu
    const engine = rendererType === 'html' 
      ? new HTMLEngine() 
      : new WidgetEngine();
    
    // Choisir le type de formulaire
    let form;
    switch (formType) {
      case 'client':
        form = new ClientInformationForm(engine);
        break;
      case 'order':
        form = new OrderForm(engine);
        break;
      default:
        form = new VehicleRegistrationForm(engine);
    }
    
    // Rendre le formulaire
    setRenderedForm(form.render());
    setSubmissionResult(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Simuler la soumission
    const result = {
      success: true,
      message: `Formulaire ${formType} soumis avec succès!`,
      timestamp: new Date().toLocaleString(),
      renderer: rendererType === 'html' ? 'HTML Engine' : 'Widget Engine',
      formType: getFormTypeLabel(formType),
      data: { ...formData }
    };
    
    setSubmissionResult(result);
    
    // Simuler un enregistrement
    setTimeout(() => {
      alert(`✅ Formulaire soumis avec le moteur ${rendererType.toUpperCase()}`);
    }, 100);
  };

  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const getFormTypeLabel = (type) => {
    const labels = {
      vehicle: 'Immatriculation véhicule',
      client: 'Informations client',
      order: 'Commande de véhicule'
    };
    return labels[type] || type;
  };

  const getRendererLabel = (type) => {
    return type === 'html' ? 'Moteur HTML' : 'Moteur Widget';
  };

  // Initialiser le premier rendu
  React.useEffect(() => {
    renderForm();
  }, [formType, rendererType]);

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
        <h2 className="text-2xl font-bold text-indigo-800 mb-2">🎨 Formulaires - Pattern Bridge</h2>
        <p className="text-indigo-700">
          Séparation de l'abstraction (type de formulaire) et de l'implémentation (moteur de rendu)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Colonne 1: Configuration */}
        <div className="space-y-6">
          {/* Sélection du formulaire */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-gray-800 mb-4">Type de formulaire (Abstraction) :</h3>
            <div className="space-y-3">
              <button
                onClick={() => setFormType('vehicle')}
                className={`w-full p-4 text-left rounded-lg transition-all ${
                  formType === 'vehicle' 
                    ? 'bg-indigo-100 text-indigo-700 border-l-4 border-indigo-500' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">📝</span>
                  <div>
                    <div className="font-bold">Immatriculation véhicule</div>
                    <div className="text-sm text-gray-600">Données techniques du véhicule</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setFormType('client')}
                className={`w-full p-4 text-left rounded-lg transition-all ${
                  formType === 'client' 
                    ? 'bg-indigo-100 text-indigo-700 border-l-4 border-indigo-500' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">👤</span>
                  <div>
                    <div className="font-bold">Informations client</div>
                    <div className="text-sm text-gray-600">Données personnelles et contact</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setFormType('order')}
                className={`w-full p-4 text-left rounded-lg transition-all ${
                  formType === 'order' 
                    ? 'bg-indigo-100 text-indigo-700 border-l-4 border-indigo-500' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🛒</span>
                  <div>
                    <div className="font-bold">Commande de véhicule</div>
                    <div className="text-sm text-gray-600">Processus d'achat et livraison</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Sélection du moteur de rendu */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-gray-800 mb-4">Moteur de rendu (Implémentation) :</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setRendererType('html')}
                className={`p-4 rounded-lg flex flex-col items-center justify-center transition-all ${
                  rendererType === 'html' 
                    ? 'bg-green-100 text-green-700 border-2 border-green-300' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <span className="text-2xl mb-2">📄</span>
                <span className="font-bold">HTML</span>
                <span className="text-xs text-gray-600 mt-1">Balises standards</span>
              </button>

              <button
                onClick={() => setRendererType('widget')}
                className={`p-4 rounded-lg flex flex-col items-center justify-center transition-all ${
                  rendererType === 'widget' 
                    ? 'bg-blue-100 text-blue-700 border-2 border-blue-300' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <span className="text-2xl mb-2">🧩</span>
                <span className="font-bold">Widgets</span>
                <span className="text-xs text-gray-600 mt-1">Composants UI avancés</span>
              </button>
            </div>

            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                💡 Changez librement entre HTML et Widgets - même formulaire, rendu différent!
              </p>
            </div>
          </div>

          {/* Bouton de rendu */}
          <button
            onClick={renderForm}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-bold"
          >
            🔄 Re-générer le formulaire
          </button>

          {/* Code du pattern */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold text-gray-700 mb-2">Structure du Bridge :</h4>
            <pre className="text-xs bg-gray-800 text-gray-100 p-3 rounded overflow-auto max-h-40">
{`// Abstraction
class Form {
  constructor(engine) {
    this.engine = engine; // ← Bridge
  }
}

// Implémentations
class HTMLEngine { /* ... */ }
class WidgetEngine { /* ... */ }

// Usage :
new VehicleForm(new HTMLEngine());
new ClientForm(new WidgetEngine());`}
            </pre>
          </div>
        </div>

        {/* Colonne 2 & 3: Formulaire rendu */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* En-tête du formulaire */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {getFormTypeLabel(formType)} - {getRendererLabel(rendererType)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Combinaison: {formType} × {rendererType}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 text-xs rounded-full ${
                    rendererType === 'html' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {rendererType === 'html' ? 'HTML Engine' : 'Widget Engine'}
                  </span>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                    Bridge Pattern
                  </span>
                </div>
              </div>
            </div>

            {/* Zone de rendu du formulaire */}
            <div className="p-6">
              {rendererType === 'html' ? (
                <div 
                  dangerouslySetInnerHTML={{ __html: renderedForm }}
                  onClick={(e) => {
                    // Gérer les interactions avec le formulaire HTML
                    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
                      const fieldName = e.target.name;
                      const value = e.target.value;
                      handleInputChange(fieldName, value);
                    }
                    
                    if (e.target.type === 'submit') {
                      handleFormSubmit(e);
                    }
                  }}
                  onChange={(e) => {
                    if (e.target.name) {
                      handleInputChange(e.target.name, e.target.value);
                    }
                  }}
                />
              ) : (
                <div className="space-y-4">
                  {/* Simulation de widgets avec style spécifique */}
                  <div className="border-2 border-dashed border-blue-300 bg-blue-50 p-8 rounded-xl">
                    <div className="text-center mb-6">
                      <div className="text-3xl mb-2">🧩</div>
                      <h4 className="text-xl font-bold text-blue-800">Simulation de Widgets</h4>
                      <p className="text-blue-600 text-sm">Interface composants avancés</p>
                    </div>
                    
                    <div 
                      className="space-y-6"
                      dangerouslySetInnerHTML={{ __html: renderedForm }}
                    />
                    
                    <div className="mt-8 p-4 bg-blue-100 rounded-lg">
                      <p className="text-sm text-blue-800">
                        💡 Les Widgets utilisent des composants UI avancés avec validation intégrée,
                        icônes, et comportements interactifs.
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleFormSubmit}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold"
                  >
                    Soumettre le formulaire Widget
                  </button>
                </div>
              )}
            </div>

            {/* Résultat de soumission */}
            {submissionResult && (
              <div className="border-t">
                <div className="p-6 bg-green-50">
                  <h4 className="font-bold text-green-800 mb-2">✅ Soumission réussie</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>Type: {submissionResult.formType}</p>
                    <p>Moteur: {submissionResult.renderer}</p>
                    <p>Heure: {submissionResult.timestamp}</p>
                    <p>Message: {submissionResult.message}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Explication du pattern */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <h5 className="font-bold text-indigo-700 mb-2">🎯 Séparation des préoccupations</h5>
              <p className="text-sm text-gray-600">
                La logique métier (formulaire) est indépendante du rendu (HTML/Widgets)
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border">
              <h5 className="font-bold text-indigo-700 mb-2">🔄 Évolutivité</h5>
              <p className="text-sm text-gray-600">
                Ajoutez de nouveaux formulaires ou moteurs de rendu indépendamment
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border">
              <h5 className="font-bold text-indigo-700 mb-2">🧩 Réutilisabilité</h5>
              <p className="text-sm text-gray-600">
                Moteurs de rendu réutilisables avec différents types de formulaires
              </p>
            </div>
          </div>

          {/* Avantages du Bridge */}
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <h4 className="font-bold text-purple-800 mb-3">🏗️ Avantages du Pattern Bridge :</h4>
            <ul className="text-sm text-purple-700 space-y-2">
              <li>• <strong>Découplage fort</strong> : Les formulaires et les moteurs de rendu évoluent séparément</li>
              <li>• <strong>Flexibilité</strong> : Mélangez librement n'importe quel formulaire avec n'importe quel moteur</li>
              <li>• <strong>Maintenabilité</strong> : Modifiez un moteur sans affecter les formulaires</li>
              <li>• <strong>Évolutivité</strong> : Ajoutez un nouveau moteur (ex: React Native, PDF) facilement</li>
              <li>• <strong>Testabilité</strong> : Testez les moteurs et formulaires indépendamment</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Exemples de combinaisons */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-bold text-gray-800 mb-4">🎨 Exemples de combinaisons possibles :</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className={`p-3 rounded-lg text-center ${formType === 'vehicle' && rendererType === 'html' ? 'bg-green-100 border-2 border-green-300' : 'bg-gray-100'}`}>
            <div className="font-bold">📝 Véhicule × HTML</div>
            <div className="text-xs text-gray-600">Formulaire classique web</div>
          </div>
          
          <div className={`p-3 rounded-lg text-center ${formType === 'vehicle' && rendererType === 'widget' ? 'bg-green-100 border-2 border-green-300' : 'bg-gray-100'}`}>
            <div className="font-bold">📝 Véhicule × Widgets</div>
            <div className="text-xs text-gray-600">Interface moderne</div>
          </div>
          
          <div className={`p-3 rounded-lg text-center ${formType === 'client' && rendererType === 'html' ? 'bg-green-100 border-2 border-green-300' : 'bg-gray-100'}`}>
            <div className="font-bold">👤 Client × HTML</div>
            <div className="text-xs text-gray-600">Simple et accessible</div>
          </div>
          
          <div className={`p-3 rounded-lg text-center ${formType === 'client' && rendererType === 'widget' ? 'bg-green-100 border-2 border-green-300' : 'bg-gray-100'}`}>
            <div className="font-bold">👤 Client × Widgets</div>
            <div className="text-xs text-gray-600">Expérience utilisateur riche</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormulairesBridge;
