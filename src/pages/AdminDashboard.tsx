
import React, { useState } from 'react';
import Header from '@/components/Header';
import AdminStats from '@/components/admin/AdminStats';
import AdminTabs from '@/components/admin/AdminTabs';
import OverviewTab from '@/components/admin/OverviewTab';
import UsersTab from '@/components/admin/UsersTab';
import BookingsTab from '@/components/admin/BookingsTab';
import AnalyticsTab from '@/components/admin/AnalyticsTab';
import SettingsTab from '@/components/admin/SettingsTab';
import { 
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const stats = {
    totalUsers: 1247,
    musicians: 523,
    clients: 724,
    totalBookings: 2156,
    revenue: 'R$ 324.500',
    monthlyGrowth: 12.5
  };

  const mockUsers = [
    { id: 1, name: 'João Silva', type: 'musician', email: 'joao@email.com', status: 'active', joinDate: '2024-01-15', bookings: 12 },
    { id: 2, name: 'Maria Santos', type: 'client', email: 'maria@email.com', status: 'active', joinDate: '2024-02-20', bookings: 5 },
    { id: 3, name: 'Pedro Costa', type: 'musician', email: 'pedro@email.com', status: 'pending', joinDate: '2024-06-10', bookings: 0 },
    { id: 4, name: 'Ana Lima', type: 'client', email: 'ana@email.com', status: 'suspended', joinDate: '2024-03-05', bookings: 3 },
  ];

  const mockBookings = [
    { id: 1, musician: 'João Silva', client: 'Maria Santos', event: 'Casamento', date: '2024-07-15', value: 800, status: 'confirmed' },
    { id: 2, musician: 'Pedro Costa', client: 'Ana Lima', event: 'Festa', date: '2024-07-20', value: 600, status: 'pending' },
    { id: 3, musician: 'Carlos Drum', client: 'João Pereira', event: 'Show', date: '2024-07-25', value: 1200, status: 'completed' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'confirmed':
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'suspended':
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'confirmed':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab mockBookings={mockBookings} getStatusColor={getStatusColor} />;
      case 'users':
        return (
          <UsersTab 
            mockUsers={mockUsers}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            getStatusIcon={getStatusIcon}
            getStatusColor={getStatusColor}
          />
        );
      case 'bookings':
        return <BookingsTab mockBookings={mockBookings} getStatusIcon={getStatusIcon} getStatusColor={getStatusColor} />;
      case 'analytics':
        return <AnalyticsTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <OverviewTab mockBookings={mockBookings} getStatusColor={getStatusColor} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
          <p className="text-gray-600">Gerencie usuários, agendamentos e monitore o sistema</p>
        </div>

        <AdminStats stats={stats} />
        <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
