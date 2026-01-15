import React from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Car,
  Activity,
  DollarSign,
  Package,
  CreditCard
} from 'lucide-react';

const DashboardPage = () => {
  const stats = [
    { 
      title: 'Ventes totales', 
      value: '124,580 €', 
      change: '+12.5%', 
      icon: DollarSign,
      color: 'bg-green-500'
    },
    { 
      title: 'Nouveaux clients', 
      value: '42', 
      change: '+8.2%', 
      icon: Users,
      color: 'bg-blue-500'
    },
    { 
      title: 'Commandes en cours', 
      value: '18', 
      change: '-3.1%', 
      icon: ShoppingCart,
      color: 'bg-orange-500'
    },
    { 
      title: 'Véhicules en stock', 
      value: '56', 
      change: '+5.7%', 
      icon: Car,
      color: 'bg-purple-500'
    },
  ];

  const recentOrders = [
    { id: 1, client: 'Dupont Jean', vehicule: 'Renault Clio', montant: '18,500 €', status: 'Livrée' },
    { id: 2, client: 'Martin Sophie', vehicule: 'Honda SH 125', montant: '4,500 €', status: 'En cours' },
    { id: 3, client: 'Transport Express', vehicule: 'Peugeot 208', montant: '21,000 €', status: 'Validée' },
    { id: 4, client: 'Auto Services', vehicule: 'Tesla Model 3', montant: '45,000 €', status: 'En attente' },
  ];

  const topVehicules = [
    { name: 'Peugeot e-208', ventes: 12, revenue: '420,000 €' },
    { name: 'Renault Clio', ventes: 8, revenue: '148,000 €' },
    { name: 'Honda SH 125', ventes: 6, revenue: '27,000 €' },
    { name: 'Peugeot e-Scooter', ventes: 5, revenue: '17,500 €' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bonjour, Admin MMX 👋</h1>
        <p className="mt-2 text-gray-600">Voici votre tableau de bord pour aujourd'hui</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm font-medium text-green-500">{stat.change}</span>
                  <span className="text-sm text-gray-500 ml-2">vs mois dernier</span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Commandes récentes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="table-header">Client</th>
                  <th className="table-header">Véhicule</th>
                  <th className="table-header">Montant</th>
                  <th className="table-header">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="table-cell">{order.client}</td>
                    <td className="table-cell">{order.vehicule}</td>
                    <td className="table-cell font-medium">{order.montant}</td>
                    <td className="table-cell">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Livrée' ? 'bg-green-100 text-green-800' :
                        order.status === 'Validée' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'En cours' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-200">
            <button className="text-primary-600 hover:text-primary-700 font-medium">
              Voir toutes les commandes →
            </button>
          </div>
        </div>

        {/* Top Véhicules */}
        <div className="bg-white rounded-xl shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Top véhicules</h2>
          </div>
          <div className="p-6">
            {topVehicules.map((vehicule, index) => (
              <div key={index} className="flex items-center justify-between py-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 flex items-center justify-center bg-primary-100 text-primary-700 rounded-lg mr-3">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{vehicule.name}</p>
                    <p className="text-sm text-gray-500">{vehicule.ventes} ventes</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{vehicule.revenue}</p>
                  <p className="text-sm text-green-500">+{Math.floor(Math.random() * 20) + 5}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Package className="w-8 h-8 text-primary-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Ajouter véhicule</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <ShoppingCart className="w-8 h-8 text-primary-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Nouvelle commande</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <CreditCard className="w-8 h-8 text-primary-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Gérer paiements</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Activity className="w-8 h-8 text-primary-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Rapports</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
