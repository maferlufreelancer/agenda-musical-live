import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import { 
  Users, 
  Music, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Eye, 
  Settings, 
  Search,
  Filter,
  Download,
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
          <p className="text-gray-600">Gerencie usuários, agendamentos e monitore o sistema</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Usuários</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Músicos</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.musicians}</p>
                </div>
                <Music className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Clientes</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.clients}</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Agendamentos</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
                </div>
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Receita Total</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.revenue}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Crescimento</p>
                  <p className="text-2xl font-bold text-gray-900">+{stats.monthlyGrowth}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
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
              onClick={() => setActiveTab('users')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Usuários
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
              onClick={() => setActiveTab('analytics')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Configurações
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Novos Cadastros (Últimos 7 dias)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Músicos</span>
                      <span className="font-semibold">23</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Clientes</span>
                      <span className="font-semibold">31</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Total</span>
                      <span className="font-semibold text-blue-600">54</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Agendamentos Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockBookings.slice(0, 3).map(booking => (
                      <div key={booking.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{booking.event}</p>
                          <p className="text-sm text-gray-600">{booking.client}</p>
                        </div>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Ações Administrativas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Relatório Mensal</span>
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Gerenciar Usuários</span>
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Settings className="h-4 w-4" />
                    <span>Configurações</span>
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <span>Analytics</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Buscar usuários..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filtrar por status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos</SelectItem>
                      <SelectItem value="active">Ativos</SelectItem>
                      <SelectItem value="pending">Pendentes</SelectItem>
                      <SelectItem value="suspended">Suspensos</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Limpar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Users Table */}
            <Card>
              <CardHeader>
                <CardTitle>Lista de Usuários</CardTitle>
                <CardDescription>Gerencie todos os usuários da plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUsers.map(user => (
                    <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(user.status)}
                        <div>
                          <h4 className="font-semibold">{user.name}</h4>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {user.type === 'musician' ? 'Músico' : 'Cliente'}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              Desde {user.joinDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold">{user.bookings} agendamentos</p>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status === 'active' ? 'Ativo' : 
                             user.status === 'pending' ? 'Pendente' : 'Suspenso'}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            Ver
                          </Button>
                          <Button size="sm" variant="outline">
                            Editar
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'bookings' && (
          <Card>
            <CardHeader>
              <CardTitle>Todos os Agendamentos</CardTitle>
              <CardDescription>Monitore e gerencie agendamentos da plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockBookings.map(booking => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(booking.status)}
                      <div>
                        <h4 className="font-semibold">{booking.event}</h4>
                        <p className="text-sm text-gray-600">
                          {booking.musician} → {booking.client}
                        </p>
                        <p className="text-sm text-gray-500">{booking.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-semibold">R$ {booking.value}</p>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status === 'confirmed' ? 'Confirmado' :
                           booking.status === 'pending' ? 'Pendente' : 
                           booking.status === 'completed' ? 'Concluído' : booking.status}
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline">
                        Detalhes
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Receita por Mês</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Janeiro</span>
                      <span className="font-semibold">R$ 45.200</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fevereiro</span>
                      <span className="font-semibold">R$ 52.800</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Março</span>
                      <span className="font-semibold">R$ 61.300</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Abril</span>
                      <span className="font-semibold">R$ 58.900</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Músicos por Agendamentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>João Silva</span>
                      <span className="font-semibold">24 shows</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Maria Santos</span>
                      <span className="font-semibold">19 shows</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pedro Costa</span>
                      <span className="font-semibold">16 shows</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ana Lima</span>
                      <span className="font-semibold">14 shows</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações da Plataforma</CardTitle>
                <CardDescription>Gerencie as configurações globais do sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4">Comissões e Taxas</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="commission">Taxa de Comissão (%)</Label>
                      <Input id="commission" placeholder="10" />
                    </div>
                    <div>
                      <Label htmlFor="payment-fee">Taxa de Pagamento (%)</Label>
                      <Input id="payment-fee" placeholder="3.5" />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Políticas</h4>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cancellation">Política de Cancelamento (horas)</Label>
                      <Input id="cancellation" placeholder="24" />
                    </div>
                  </div>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700">
                  Salvar Configurações
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
