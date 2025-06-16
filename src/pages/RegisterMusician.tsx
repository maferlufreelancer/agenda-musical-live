
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import { Music } from 'lucide-react';

const RegisterMusician = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    state: '',
    musicalStyle: '',
    biography: '',
    instagram: '',
    youtube: '',
    soundcloud: '',
    services: [] as string[],
    portfolioLinks: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const musicalStyles = [
    'Rock', 'Pop', 'Jazz', 'Blues', 'Country', 'Clássica', 'MPB', 'Samba', 
    'Bossa Nova', 'Reggae', 'Funk', 'Hip Hop', 'Eletrônica', 'Folk', 'Gospel'
  ];

  const serviceTypes = [
    'Shows e Apresentações', 'Aulas de Música', 'Gravação em Estúdio', 
    'Trilha Sonora', 'Casamentos', 'Eventos Corporativos', 'Festas Particulares'
  ];

  const brazilianStates = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 
    'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const handleServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, service]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        services: prev.services.filter(s => s !== service)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || formData.services.length === 0) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    const success = await register(formData, 'musician');
    
    if (success) {
      toast({
        title: "Sucesso!",
        description: "Cadastro realizado com sucesso! Bem-vindo!",
      });
      navigate('/dashboard/musician');
    } else {
      toast({
        title: "Erro",
        description: "Erro ao realizar cadastro. Tente novamente.",
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Music className="h-12 w-12 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Cadastro de Músico</CardTitle>
              <CardDescription>
                Crie seu perfil profissional e comece a receber agendamentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Informações Básicas */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Informações Básicas</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Seu nome completo"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="password">Senha *</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        placeholder="Mínimo 6 caracteres"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">Cidade</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                        placeholder="Sua cidade"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="state">Estado</Label>
                      <Select value={formData.state} onValueChange={(value) => setFormData(prev => ({ ...prev, state: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {brazilianStates.map(state => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Informações Profissionais */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Informações Profissionais</h3>
                  
                  <div>
                    <Label htmlFor="musicalStyle">Estilo Musical Principal</Label>
                    <Select value={formData.musicalStyle} onValueChange={(value) => setFormData(prev => ({ ...prev, musicalStyle: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione seu estilo principal" />
                      </SelectTrigger>
                      <SelectContent>
                        {musicalStyles.map(style => (
                          <SelectItem key={style} value={style}>{style}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="biography">Biografia</Label>
                    <Textarea
                      id="biography"
                      value={formData.biography}
                      onChange={(e) => setFormData(prev => ({ ...prev, biography: e.target.value }))}
                      placeholder="Conte um pouco sobre você, sua experiência musical e trajetória..."
                      className="min-h-[100px]"
                    />
                  </div>
                </div>

                {/* Serviços Oferecidos */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Serviços Oferecidos *</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {serviceTypes.map(service => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={service}
                          checked={formData.services.includes(service)}
                          onCheckedChange={(checked) => handleServiceChange(service, checked as boolean)}
                        />
                        <Label htmlFor={service} className="text-sm">{service}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Redes Sociais */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Redes Sociais e Portfólio</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        id="instagram"
                        value={formData.instagram}
                        onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
                        placeholder="@seuusuario"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="youtube">YouTube</Label>
                      <Input
                        id="youtube"
                        value={formData.youtube}
                        onChange={(e) => setFormData(prev => ({ ...prev, youtube: e.target.value }))}
                        placeholder="Link do canal"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="soundcloud">SoundCloud</Label>
                      <Input
                        id="soundcloud"
                        value={formData.soundcloud}
                        onChange={(e) => setFormData(prev => ({ ...prev, soundcloud: e.target.value }))}
                        placeholder="Link do perfil"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="portfolioLinks">Links do Portfólio</Label>
                    <Textarea
                      id="portfolioLinks"
                      value={formData.portfolioLinks}
                      onChange={(e) => setFormData(prev => ({ ...prev, portfolioLinks: e.target.value }))}
                      placeholder="Adicione links de vídeos, músicas, apresentações... (um por linha)"
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                  {isLoading ? 'Criando conta...' : 'Criar Conta de Músico'}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Já tem uma conta?{' '}
                  <Link to="/login" className="text-blue-600 hover:underline">
                    Fazer login
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterMusician;
