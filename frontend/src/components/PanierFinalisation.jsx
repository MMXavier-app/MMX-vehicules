import React, { useState } from 'react';

const PanierFinalisation = ({ panier, onCommandeFinalisee }) => {
    const [loading, setLoading] = useState(false);
    const [clientInfo, setClientInfo] = useState({
        nom: 'Jean Dupont',
        email: 'jean.dupont@email.com',
        telephone: '0612345678',
        adresse: '123 Rue de Paris',
        ville: 'Paris',
        codePostal: '75000'
    });
    const [paiement, setPaiement] = useState('carte');
    const [apiStatus, setApiStatus] = useState('Non testé');
    
    const calculerTotal = () => {
        if (!panier?.items?.length) return 0;
        return panier.items.reduce((total, item) => {
            return total + (Number(item.prix) || 0) * (Number(item.quantite) || 1);
        }, 0);
    };
    
    const calculerTVA = () => calculerTotal() * 0.20;
    const calculerTotalTTC = () => calculerTotal() + calculerTVA();
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClientInfo(prev => ({ ...prev, [name]: value }));
    };
    
    const testerAPI = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/commandes/test');
            const text = await response.text();
            setApiStatus(`✅ ${text}`);
            alert(`API Commandes: ${text}`);
        } catch (error) {
            setApiStatus(`❌ ${error.message}`);
            alert(`Erreur API: ${error.message}`);
        }
    };
    
    const finaliserCommande = async () => {
        if (!panier?.items?.length) {
            alert('Votre panier est vide !');
            return;
        }
        
        setLoading(true);
        
        // Préparer les données
        const commandeData = {
            client: clientInfo,
            items: panier.items.map(item => ({
                id: item.id || Date.now(),
                nom: item.nom || item.vehicule || 'Article',
                prix: Number(item.prix) || 0,
                quantite: Number(item.quantite) || 1,
                options: item.options || []
            })),
            totalHT: calculerTotal(),
            tva: calculerTVA(),
            totalTTC: calculerTotalTTC(),
            modePaiement: paiement
        };
        
        console.log('Envoi de la commande:', commandeData);
        
        try {
            // Essayer d'appeler l'API backend
            const response = await fetch('http://localhost:8080/api/commandes', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(commandeData)
            });
            
            console.log('Statut réponse:', response.status);
            
            if (response.ok) {
                const data = await response.json();
                console.log('Réponse API:', data);
                
                // Ajouter la date si manquante
                if (!data.date) {
                    data.date = new Date().toISOString();
                }
                if (!data.reference) {
                    data.reference = `CMD-${Date.now().toString().slice(-6)}`;
                }
                
                if (onCommandeFinalisee) {
                    onCommandeFinalisee(data);
                }
                
                alert(`✅ Commande #${data.reference} confirmée !\nTotal: ${data.totalTTC.toFixed(2)} €`);
                
            } else {
                const errorText = await response.text();
                console.error('Erreur API:', errorText);
                throw new Error(`API: ${response.status} - ${errorText}`);
            }
            
        } catch (error) {
            console.log('Simulation locale:', error.message);
            
            // Simulation si l'API échoue
            const commandeSimulee = {
                ...commandeData,
                id: Date.now(),
                reference: `CMD-${Date.now().toString().slice(-6)}`,
                date: new Date().toISOString(),
                statut: 'CONFIRMÉE'
            };
            
            if (onCommandeFinalisee) {
                onCommandeFinalisee(commandeSimulee);
            }
            
            alert(`✅ Commande #${commandeSimulee.reference} simulée !\nTotal: ${commandeSimulee.totalTTC.toFixed(2)} €\n\n(Note: API non disponible, simulation locale)`);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Finalisation de la commande</h2>
                <button
                    onClick={testerAPI}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                >
                    Tester API
                </button>
            </div>
            
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm">
                    <span className="font-semibold">Statut API:</span> {apiStatus}
                </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Colonne gauche : Formulaire */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Informations client</h3>
                    
                    <div className="space-y-3">
                        <input type="text" name="nom" placeholder="Nom complet" value={clientInfo.nom} 
                            onChange={handleInputChange} className="w-full p-3 border rounded-lg" />
                        
                        <input type="email" name="email" placeholder="Email" value={clientInfo.email} 
                            onChange={handleInputChange} className="w-full p-3 border rounded-lg" />
                        
                        <input type="tel" name="telephone" placeholder="Téléphone" value={clientInfo.telephone} 
                            onChange={handleInputChange} className="w-full p-3 border rounded-lg" />
                        
                        <input type="text" name="adresse" placeholder="Adresse" value={clientInfo.adresse} 
                            onChange={handleInputChange} className="w-full p-3 border rounded-lg" />
                        
                        <div className="grid grid-cols-2 gap-3">
                            <input type="text" name="codePostal" placeholder="Code postal" value={clientInfo.codePostal} 
                                onChange={handleInputChange} className="p-3 border rounded-lg" />
                            <input type="text" name="ville" placeholder="Ville" value={clientInfo.ville} 
                                onChange={handleInputChange} className="p-3 border rounded-lg" />
                        </div>
                    </div>
                    
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-3">Mode de paiement</h3>
                        <div className="space-y-2">
                            <label className="flex items-center cursor-pointer">
                                <input type="radio" name="paiement" value="carte" checked={paiement === 'carte'} 
                                    onChange={(e) => setPaiement(e.target.value)} className="mr-2" />
                                💳 Carte bancaire
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input type="radio" name="paiement" value="virement" checked={paiement === 'virement'} 
                                    onChange={(e) => setPaiement(e.target.value)} className="mr-2" />
                                🏦 Virement bancaire
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input type="radio" name="paiement" value="especes" checked={paiement === 'especes'} 
                                    onChange={(e) => setPaiement(e.target.value)} className="mr-2" />
                                💶 Espèces à la livraison
                            </label>
                        </div>
                    </div>
                </div>
                
                {/* Colonne droite : Récapitulatif */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Récapitulatif</h3>
                    
                    <div className="mb-4 max-h-60 overflow-y-auto border rounded-lg p-2">
                        {panier.items?.map((item, idx) => (
                            <div key={idx} className="flex justify-between py-3 border-b last:border-b-0">
                                <div className="flex-1">
                                    <p className="font-medium">{item.nom || item.vehicule || 'Article'}</p>
                                    {item.options?.length > 0 && (
                                        <p className="text-sm text-gray-600">
                                            Options: {item.options.join(', ')}
                                        </p>
                                    )}
                                    <p className="text-sm text-gray-500">
                                        Quantité: {item.quantite || 1}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">
                                        {((Number(item.prix) || 0) * (Number(item.quantite) || 1)).toFixed(2)} €
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between py-2">
                            <span>Total HT:</span>
                            <span>{calculerTotal().toFixed(2)} €</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span>TVA (20%):</span>
                            <span>{calculerTVA().toFixed(2)} €</span>
                        </div>
                        <div className="flex justify-between py-2 border-t font-bold text-lg">
                            <span>Total TTC:</span>
                            <span className="text-green-600">{calculerTotalTTC().toFixed(2)} €</span>
                        </div>
                    </div>
                    
                    <button 
                        onClick={finaliserCommande}
                        disabled={loading}
                        className={`w-full mt-6 py-4 rounded-lg font-bold text-white transition-colors ${
                            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                        }`}
                    >
                        {loading ? '⏳ Traitement en cours...' : '✅ Confirmer la commande'}
                    </button>
                    
                    <p className="mt-3 text-sm text-gray-500 text-center">
                        En cliquant, vous acceptez nos conditions générales de vente.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PanierFinalisation;
