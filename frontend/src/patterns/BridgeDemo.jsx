import React, { useState } from 'react';

// Bridge Pattern - Séparation abstraction/implémentation

// Implémentations (rendering engines)
class RenderingEngine {
  renderForm(fields) {
    throw new Error('Méthode abstraite');
  }
}

class HTMLRenderer extends RenderingEngine {
  renderForm(fields) {
    return `
      <form class="vehicle-form">
        ${fields.map(field => `
          <div class="form-group">
            <label>${field.label}</label>
            <input type="${field.type}" name="${field.name}" />
          </div>
        `).join('')}
        <button type="submit">Soumettre</button>
      </form>
    `;
  }
}

class WidgetRenderer extends RenderingEngine {
  renderForm(fields) {
    return `
      <WidgetContainer>
        ${fields.map(field => `
          <WidgetField 
            label="${field.label}"
            type="${field.type}"
            name="${field.name}"
            ${field.required ? 'required="true"' : ''}
          />
        `).join('')}
        <SubmitWidget label="Valider" />
      </WidgetContainer>
    `;
  }
}

// Abstractions (form types)
class Form {
  constructor(renderer) {
    this.renderer = renderer;
    this.fields = [];
  }
  
  addField(label, type, name, required = false) {
    this.fields.push({ label, type, name, required });
  }
  
  render() {
    return this.renderer.renderForm(this.fields);
  }
  
  display() {
    return this.render();
  }
}

class VehicleRegistrationForm extends Form {
  constructor(renderer) {
    super(renderer);
    this.addField('Modèle du véhicule', 'text', 'model', true);
    this.addField('Immatriculation', 'text', 'registration', true);
    this.addField('Date de mise en circulation', 'date', 'circulationDate');
    this.addField('Kilométrage', 'number', 'mileage');
  }
}

class ClientInformationForm extends Form {
  constructor(renderer) {
    super(renderer);
    this.addField('Nom complet', 'text', 'fullName', true);
    this.addField('Email', 'email', 'email', true);
    this.addField('Téléphone', 'tel', 'phone');
    this.addField('Adresse', 'textarea', 'address');
  }
}

export function BridgeDemo() {
  const [formType, setFormType] = useState('vehicle');
  const [rendererType, setRendererType] = useState('html');
  const [renderedForm, setRenderedForm] = useState('');
  
  const generateForm = () => {
    const renderer = rendererType === 'html' 
      ? new HTMLRenderer() 
      : new WidgetRenderer();
    
    let form;
    if (formType === 'vehicle') {
      form = new VehicleRegistrationForm(renderer);
    } else {
      form = new ClientInformationForm(renderer);
    }
    
    setRenderedForm(form.display());
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 p-4 rounded-lg">
        <h3 className="font-bold text-indigo-800 mb-2">Bridge Pattern</h3>
        <p className="text-indigo-700">
          Découple une abstraction de son implémentation pour qu'elles puissent varier indépendamment.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-gray-800 mb-3">Type de formulaire (Abstraction) :</h4>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => setFormType('vehicle')}
                className={`p-3 text-left rounded-lg ${formType === 'vehicle' ? 'bg-indigo-100 text-indigo-700 border-l-4 border-indigo-500' : 'bg-gray-100'}`}
              >
                🚗 Formulaire d'immatriculation véhicule
              </button>
              <button
                onClick={() => setFormType('client')}
                className={`p-3 text-left rounded-lg ${formType === 'client' ? 'bg-indigo-100 text-indigo-700 border-l-4 border-indigo-500' : 'bg-gray-100'}`}
              >
                👤 Formulaire d'information client
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-800 mb-3">Moteur de rendu (Implémentation) :</h4>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => setRendererType('html')}
                className={`p-3 text-left rounded-lg ${rendererType === 'html' ? 'bg-green-100 text-green-700 border-l-4 border-green-500' : 'bg-gray-100'}`}
              >
                📄 Moteur HTML
              </button>
              <button
                onClick={() => setRendererType('widget')}
                className={`p-3 text-left rounded-lg ${rendererType === 'widget' ? 'bg-green-100 text-green-700 border-l-4 border-green-500' : 'bg-gray-100'}`}
              >
                🧩 Moteur Widget
              </button>
            </div>
          </div>
          
          <button
            onClick={generateForm}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Générer le formulaire
          </button>
        </div>
        
        <div>
          <h4 className="font-bold text-gray-800 mb-4">Formulaire généré :</h4>
          
          {renderedForm ? (
            <div className="border rounded-lg p-6 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-bold text-lg">
                  {formType === 'vehicle' ? '🚗 Immatriculation Véhicule' : '👤 Informations Client'}
                </h5>
                <span className={`px-3 py-1 rounded-full text-sm ${rendererType === 'html' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                  {rendererType === 'html' ? 'HTML Renderer' : 'Widget Renderer'}
                </span>
              </div>
              
              <div className="bg-white p-4 rounded border">
                <pre className="text-sm overflow-auto max-h-80 whitespace-pre-wrap">
                  {renderedForm}
                </pre>
              </div>
              
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <span className="font-bold">Pattern Bridge en action :</span> 
                  Le type de formulaire et le moteur de rendu peuvent varier indépendamment.
                  {formType === 'vehicle' && rendererType === 'widget' && ' Combinaison: Formulaire véhicule + Widgets'}
                  {formType === 'vehicle' && rendererType === 'html' && ' Combinaison: Formulaire véhicule + HTML'}
                  {formType === 'client' && rendererType === 'widget' && ' Combinaison: Formulaire client + Widgets'}
                  {formType === 'client' && rendererType === 'html' && ' Combinaison: Formulaire client + HTML'}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-lg">Sélectionnez les options et générez un formulaire</p>
              <p className="text-sm mt-2">Le Bridge pattern permet de combiner librement différents types de formulaires avec différents moteurs de rendu</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-bold text-gray-800 mb-2">Avantages du Bridge :</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white p-3 rounded border">
            <p className="font-bold text-green-600">🎯 Séparation des préoccupations</p>
            <p className="text-gray-600 mt-1">La logique métier (formulaire) est séparée de l'implémentation (rendu)</p>
          </div>
          <div className="bg-white p-3 rounded border">
            <p className="font-bold text-green-600">🔄 Évolutivité</p>
            <p className="text-gray-600 mt-1">Ajouter un nouveau type de formulaire ou un nouveau renderer est facile</p>
          </div>
          <div className="bg-white p-3 rounded border">
            <p className="font-bold text-green-600">🧩 Réutilisabilité</p>
            <p className="text-gray-600 mt-1">Les composants peuvent être réutilisés dans différentes combinaisons</p>
          </div>
        </div>
      </div>
    </div>
  );
}
