import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/Header';
import { Search, MapPin, Star, Music, Filter, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const SearchMusicians = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedService, setSelectedService] = useState('');

  // Fetch musicians from Supabase
  const { data: musicians, isLoading, error } = useQuery({
    queryKey: ['musicians'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('musicians')
        .select('*')
        .order('rating', { ascending: false });
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Erro ao carregar músicos",
          description: error.message
        });
        throw error;
      }
      
      return data;
    }
  });

  // Extract unique values for filters
  const { cities, styles, services } = useMemo(() => {
    if (!musicians) return { cities: [], styles: [], services: [] };
    
    const citiesSet = new Set<string>();
    const stylesSet = new Set<string>();
    const servicesSet = new Set<string>();
    
    musicians.forEach(musician => {
      citiesSet.add(musician.city);
      musician.musical_styles?.forEach((style: string) => stylesSet.add(style));
      musician.services?.forEach((service: string) => servicesSet.add(service));
    });
    
    return {
      cities: Array.from(citiesSet).sort(),
      styles: Array.from(stylesSet).sort(),
      services: Array.from(servicesSet).sort()
    };
  }, [musicians]);

  const filteredMusicians = useMemo(() => {
    if (!musicians) return [];
    
    return musicians.filter(musician => {
      const matchesSearch = musician.stage_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           musician.musical_styles?.some((style: string) => 
                             style.toLowerCase().includes(searchTerm.toLowerCase())
                           );
      const matchesCity = !selectedCity || musician.city === selectedCity;
      const matchesStyle = !selectedStyle || musician.musical_styles?.includes(selectedStyle);
      const matchesService = !selectedService || musician.services?.includes(selectedService);
      
      return matchesSearch && matchesCity && matchesStyle && matchesService;
    });
  }, [musicians, searchTerm, selectedCity, selectedStyle, selectedService]);

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

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <Card key={n}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex gap-2 mb-4">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <Music className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Erro ao carregar músicos</h3>
            <p className="text-muted-foreground mb-4">Tente novamente mais tarde.</p>
            <Button onClick={() => window.location.reload()}>
              Recarregar
            </Button>
          </div>
        )}

        {/* Musicians Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMusicians.map(musician => (
              <Card key={musician.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="relative">
                      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                        <Music className="h-8 w-8 text-muted-foreground" />
                      </div>
                      {musician.verified && (
                        <div className="absolute -top-1 -right-1 bg-primary rounded-full p-1">
                          <Music className="h-3 w-3 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-card-foreground">{musician.stage_name}</h3>
                      <p className="text-muted-foreground text-sm">
                        {musician.musical_styles?.join(', ') || 'Vários estilos'}
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {musician.city}, {musician.state}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium text-card-foreground">
                        {musician.rating ? Number(musician.rating).toFixed(1) : '0.0'}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        ({musician.total_reviews || 0} avaliações)
                      </span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {musician.bio || 'Músico profissional'}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {musician.services?.slice(0, 3).map((service: string) => (
                      <Badge key={service} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                    {musician.services && musician.services.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{musician.services.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-primary">
                        R$ {musician.price_min}-{musician.price_max}
                      </p>
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
        )}

        {!isLoading && !error && filteredMusicians.length === 0 && (
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
