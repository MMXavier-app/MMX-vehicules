import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Véhicules
export const vehiculeService = {
  getAllVehicules: () => api.get('/vehicules'),
  getVehiculeById: (id) => api.get(`/vehicules/${id}`),
  searchVehicules: (keyword) => api.get(`/vehicules/recherche?keyword=${keyword}`),
  getVehiculesAnciens: () => api.get('/vehicules/anciens'),
  getVehiculesByEnergie: (energie) => api.get(`/vehicules/energie/${energie}`),
  createAutomobileEssence: (data) => api.post('/vehicules/automobile/essence', null, { params: data }),
  createAutomobileElectrique: (data) => api.post('/vehicules/automobile/electrique', null, { params: data }),
  deleteVehicule: (id) => api.delete(`/vehicules/${id}`),
};

// Commandes
export const commandeService = {
  getAllCommandes: () => api.get('/commandes'),
  createCommande: (data) => api.post('/commandes', data),
  updateCommandeStatus: (id, status) => api.put(`/commandes/${id}/status`, { status }),
  getCommandeDocuments: (id) => api.get(`/commandes/${id}/documents`),
};

// Clients
export const clientService = {
  getAllClients: () => api.get('/clients'),
  createClient: (data) => api.post('/clients', data),
  getClientSocietes: () => api.get('/clients/societes'),
};

// Intercepteur pour ajouter le token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
