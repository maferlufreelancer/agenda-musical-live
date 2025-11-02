
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { Search, MapPin, Star, Music, Filter } from 'lucide-react';

const SearchMusicians = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const mockMusicians = [
    {
      id: 1,
      name: 'João Silva',
      style: 'Rock/Blues',
      city: 'São Paulo',
      state: 'SP',
      rating: 4.8,
      reviews: 24,
      services: ['Shows', 'Aulas', 'Gravações'],
      price: 'R$ 500-800',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      bio: 'Guitarrista profissional com 10+ anos de experiência',
      verified: true
    },
    {
      id: 2,
      name: 'Maria Santos',
      style: 'Clássica/MPB',
      city: 'Rio de Janeiro',
      state: 'RJ',
      rating: 4.9,
      reviews: 31,
      services: ['Casamentos', 'Eventos', 'Aulas'],
      price: 'R$ 800-1200',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1c1?w=150&h=150&fit=crop&crop=face',
      bio: 'Violinista clássica especializada em eventos elegantes',
      verified: true
    },
    {
      id: 3,
      name: 'Pedro Costa',
      style: 'Eletrônica/Pop',
      city: 'Belo Horizonte',
      state: 'MG',
      rating: 4.7,
      reviews: 18,
      services: ['DJ', 'Festas', 'Corporativo'],
      price: 'R$ 400-600',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      bio: 'DJ e produtor musical especializado em eventos',
      verified: false
    },
    {
      id: 4,
      name: 'Ana Lima',
      style: 'Jazz/Bossa Nova',
      city: 'Salvador',
      state: 'BA',
      rating: 4.6,
      reviews: 15,
      services: ['Shows', 'Bares', 'Hotéis'],
      price: 'R$ 600-900',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      bio: 'Cantora de jazz com repertório internacional',
      verified: true
    },
    {
      id: 5,
      name: 'Carlos Drummond',
      style: 'Sertanejo/Country',
      city: 'Goiânia',
      state: 'GO',
      rating: 4.5,
      reviews: 22,
      services: ['Shows', 'Rodeios', 'Festas'],
      price: 'R$ 700-1000',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      bio: 'Violeiro e cantor sertanejo raiz',
      verified: true
    },
    {
      id: 6,
      name: 'Beatriz Oliveira',
      style: 'Gospel/Worship',
      city: 'Brasília',
      state: 'DF',
      rating: 4.9,
      reviews: 27,
      services: ['Cultos', 'Casamentos', 'Eventos'],
      price: 'R$ 300-500',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      bio: 'Cantora gospel com ministério de adoração',
      verified: true
    },
  ];

  const cities = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Salvador', 'Goiânia', 'Brasília'];
  const styles = ['Rock/Blues', 'Clássica/MPB', 'Eletrônica/Pop', 'Jazz/Bossa Nova', 'Sertanejo/Country', 'Gospel/Worship'];
  const services = ['Shows', 'Aulas', 'Gravações', 'Casamentos', 'Eventos', 'DJ', 'Festas'];

  const filteredMusicians = mockMusicians.filter(musician => {
    const matchesSearch = musician.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         musician.style.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = !selectedCity || musician.city === selectedCity;
    const matchesStyle = !selectedStyle || musician.style.includes(selectedStyle);
    const matchesService = !selectedService || musician.services.some(service => 
      service.toLowerCase().includes(selectedService.toLowerCase())
    );
    
    return matchesSearch && matchesCity && matchesStyle && matchesService;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Encontre Músicos Profissionais</h1>
          <p className="text-muted-foreground">Descubra talentos incríveis para o seu evento - pague apenas por apresentação</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card p-6 rounded-lg shadow-sm mb-8 border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar por nome ou estilo musical..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <SelectValue placeholder="Cidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas as cidades</SelectItem>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedStyle} onValueChange={setSelectedStyle}>
              <SelectTrigger>
                <SelectValue placeholder="Estilo Musical" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os estilos</SelectItem>
                {styles.map(style => (
                  <SelectItem key={style} value={style}>{style}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de Serviço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os serviços</SelectItem>
                {services.map(service => (
                  <SelectItem key={service} value={service}>{service}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              {filteredMusicians.length} músicos encontrados
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setSelectedCity('');
                setSelectedStyle('');
                setSelectedService('');
              }}
            >
              <Filter className="h-4 w-4 mr-2" />
              Limpar Filtros
            </Button>
          </div>
        </div>

        {/* Musicians Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMusicians.map(musician => (
            <Card key={musician.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="relative">
                    <img
                      src={musician.avatar}
                      alt={musician.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    {musician.verified && (
                      <div className="absolute -top-1 -right-1 bg-primary rounded-full p-1">
                        <Music className="h-3 w-3 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-card-foreground">{musician.name}</h3>
                    <p className="text-muted-foreground text-sm">{musician.style}</p>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {musician.city}, {musician.state}
                    </div>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium text-card-foreground">{musician.rating}</span>
                    <span className="text-muted-foreground text-sm">({musician.reviews} avaliações)</span>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{musician.bio}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {musician.services.slice(0, 3).map(service => (
                    <Badge key={service} variant="secondary" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                  {musician.services.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{musician.services.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-primary">{musician.price}</p>
                    <p className="text-xs text-muted-foreground">por evento</p>
                  </div>
                  <Link to={`/musician/${musician.id}`}>
                    <Button size="sm">
                      Ver Perfil
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMusicians.length === 0 && (
          <div className="text-center py-12">
            <Music className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Nenhum músico encontrado</h3>
            <p className="text-muted-foreground">Tente ajustar os filtros de busca ou limpar os critérios.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchMusicians;
