
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Calendar, Clock, Users, Star, Plus, Search, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const mockBookings = [
    { id: 1, musician: 'João Silva', service: 'Show Rock', date: '2024-07-15', time: '19:00', status: 'confirmed', value: 800 },
    { id: 2, musician: 'Maria Santos', service: 'Violinista Casamento', date: '2024-07-20', time: '16:00', status: 'pending', value: 1200 },
    { id: 3, musician: 'Pedro Costa', service: 'DJ Festa', date: '2024-07-25', time: '20:00', status: 'confirmed', value: 600 },
    { id: 4, musician: 'Ana Lima', service: 'Cantora MPB', date: '2024-07-30', time: '18:00', status: 'declined', value: 900 },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'declined':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmado';
      case 'pending':
        return 'Pendente';
      case 'declined':
        return 'Recusado';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard do Cliente</h1>
          <p className="text-gray-600">Gerencie suas contratações e encontre músicos</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Agendamentos</p>
                  <p className="text-2xl font-bold text-gray-900">4</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Gasto Total</p>
                  <p className="text-2xl font-bold text-gray-900">R$ 2.400</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Confirmados</p>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pendentes</p>
                  <p className="text-2xl font-bold text-gray-900">1</p>
                </div>
                <AlertCircle className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link to="/musicians">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Search className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Encontrar Músicos</h3>
                    <p className="text-sm text-gray-600">Busque por músicos em sua região</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Plus className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Novo Agendamento</h3>
                  <p className="text-sm text-gray-600">Agende um novo serviço musical</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Visão Geral
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'bookings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Meus Agendamentos
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Histórico
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Próximos Eventos</CardTitle>
                <CardDescription>Seus agendamentos confirmados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBookings.filter(booking => booking.status === 'confirmed').map(booking => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Calendar className="h-8 w-8 text-blue-600" />
                        <div>
                          <h4 className="font-semibold">{booking.service}</h4>
                          <p className="text-sm text-gray-600">Músico: {booking.musician}</p>
                          <p className="text-sm text-gray-500">{booking.date} às {booking.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-blue-600">R$ {booking.value}</p>
                        <Badge className={getStatusColor(booking.status)}>
                          {getStatusLabel(booking.status)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Estatísticas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total de Agendamentos</span>
                      <span className="font-semibold">4</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Eventos Confirmados</span>
                      <span className="font-semibold">2</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Aguardando Resposta</span>
                      <span className="font-semibold">1</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Investimento Total</span>
                      <span className="font-semibold text-green-600">R$ 2.400</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Músicos Favoritos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                        alt="João Silva"
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium">João Silva</p>
                        <p className="text-sm text-gray-600">Guitarrista Rock</p>
                      </div>
                      <Star className="h-4 w-4 text-yellow-500 ml-auto" />
                    </div>
                    <div className="flex items-center space-x-3">
                      <img
                        src="https://images.unsplash.com/photo-1494790108755-2616b612b1c1?w=40&h=40&fit=crop&crop=face"
                        alt="Maria Santos"
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium">Maria Santos</p>
                        <p className="text-sm text-gray-600">Violinista</p>
                      </div>
                      <Star className="h-4 w-4 text-yellow-500 ml-auto" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <Card>
            <CardHeader>
              <CardTitle>Todos os Agendamentos</CardTitle>
              <CardDescription>Gerencie todas as suas contratações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockBookings.map(booking => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(booking.status)}
                      <div>
                        <h4 className="font-semibold">{booking.service}</h4>
                        <p className="text-sm text-gray-600">Músico: {booking.musician}</p>
                        <p className="text-sm text-gray-500">{booking.date} às {booking.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-semibold">R$ {booking.value}</p>
                        <Badge className={getStatusColor(booking.status)}>
                          {getStatusLabel(booking.status)}
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline">
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'history' && (
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Contratações</CardTitle>
              <CardDescription>Todos os seus eventos passados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                    <div>
                      <h4 className="font-semibold">Aniversário de 50 anos</h4>
                      <p className="text-sm text-gray-600">Músico: Carlos Drummond</p>
                      <p className="text-sm text-gray-500">15/06/2024 - Realizado</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-semibold">R$ 1.000</p>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">5.0</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Avaliar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
