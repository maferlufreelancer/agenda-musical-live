
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { Calendar, Clock, Music, Star, TrendingUp, Users, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const MusicianDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const mockBookings = [
    { id: 1, client: 'Maria Silva', event: 'Casamento', date: '2024-07-15', time: '19:00', status: 'confirmed', value: 800 },
    { id: 2, client: 'João Santos', event: 'Aniversário', date: '2024-07-20', time: '20:00', status: 'pending', value: 500 },
    { id: 3, client: 'Empresa ABC', event: 'Evento Corporativo', date: '2024-07-25', time: '18:00', status: 'confirmed', value: 1200 },
    { id: 4, client: 'Ana Costa', event: 'Festa Particular', date: '2024-07-30', time: '21:00', status: 'declined', value: 600 },
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
          <h1 className="text-3xl font-bold text-gray-900">Dashboard do Músico</h1>
          <p className="text-gray-600">Gerencie seus agendamentos e acompanhe sua performance</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Agendamentos</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Este Mês</p>
                  <p className="text-2xl font-bold text-gray-900">R$ 3.500</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avaliação</p>
                  <p className="text-2xl font-bold text-gray-900">4.8</p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Visualizações</p>
                  <p className="text-2xl font-bold text-gray-900">145</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
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
              Agendamentos
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Meu Perfil
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Próximos Agendamentos</CardTitle>
                <CardDescription>Seus eventos confirmados para os próximos dias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBookings.filter(booking => booking.status === 'confirmed').slice(0, 3).map(booking => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Calendar className="h-8 w-8 text-blue-600" />
                        <div>
                          <h4 className="font-semibold">{booking.event}</h4>
                          <p className="text-sm text-gray-600">Cliente: {booking.client}</p>
                          <p className="text-sm text-gray-500">{booking.date} às {booking.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">R$ {booking.value}</p>
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
                  <CardTitle>Estatísticas do Mês</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Agendamentos Confirmados</span>
                      <span className="font-semibold">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Agendamentos Pendentes</span>
                      <span className="font-semibold">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxa de Aprovação</span>
                      <span className="font-semibold">85%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Receita Total</span>
                      <span className="font-semibold text-green-600">R$ 3.500</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ações Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" variant="outline">
                    <Music className="h-4 w-4 mr-2" />
                    Editar Perfil
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Configurar Disponibilidade
                  </Button>
                  <Button className="w-full" variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Ver Relatórios
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <Card>
            <CardHeader>
              <CardTitle>Todos os Agendamentos</CardTitle>
              <CardDescription>Gerencie todos os seus agendamentos e solicitações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockBookings.map(booking => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(booking.status)}
                      <div>
                        <h4 className="font-semibold">{booking.event}</h4>
                        <p className="text-sm text-gray-600">Cliente: {booking.client}</p>
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
                      {booking.status === 'pending' && (
                        <div className="flex space-x-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Aceitar
                          </Button>
                          <Button size="sm" variant="outline">
                            Recusar
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'profile' && (
          <Card>
            <CardHeader>
              <CardTitle>Meu Perfil</CardTitle>
              <CardDescription>Atualize suas informações profissionais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                    alt="Foto do perfil"
                    className="h-24 w-24 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">João Silva</h3>
                    <p className="text-gray-600">Guitarrista • Rock/Blues</p>
                    <p className="text-sm text-gray-500">São Paulo, SP</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Informações Básicas</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>E-mail:</strong> joao@email.com</p>
                      <p><strong>Telefone:</strong> (11) 99999-9999</p>
                      <p><strong>Cidade:</strong> São Paulo, SP</p>
                      <p><strong>Estilo Musical:</strong> Rock, Blues</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Serviços Oferecidos</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Shows</Badge>
                      <Badge variant="secondary">Aulas</Badge>
                      <Badge variant="secondary">Gravações</Badge>
                      <Badge variant="secondary">Casamentos</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Biografia</h4>
                  <p className="text-gray-600 text-sm">
                    Guitarrista profissional com mais de 10 anos de experiência em apresentações ao vivo. 
                    Especializado em rock e blues, com passagem por diversas bandas e eventos corporativos...
                  </p>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700">
                  Editar Perfil
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MusicianDashboard;
