
import React from 'react';

interface AdminTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminTabs = ({ activeTab, setActiveTab }: AdminTabsProps) => {
  const tabs = [
    { id: 'overview', label: 'Visão Geral' },
    { id: 'users', label: 'Usuários' },
    { id: 'bookings', label: 'Agendamentos' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'settings', label: 'Configurações' }
  ];

  return (
    <div className="mb-6">
      <nav className="flex space-x-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default AdminTabs;
