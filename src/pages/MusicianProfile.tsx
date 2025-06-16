
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Header from '@/components/Header';
import { useToast } from '@/hooks/use-toast';
import { Star, MapPin, Music, Calendar, Clock, Phone, Mail, Instagram, CheckCircle, ExternalLink } from 'lucide-react';

const MusicianProfile = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    eventType: '',
    location: '',
    duration: '',
    message: ''
  });

  // Mock musician data - in real app, fetch by ID
  const musician = {
    id: 1,
    name: 'João Silva',
    style: 'Rock/Blues',
    city: 'São Paulo',
    state: 'SP',
    rating: 4.8,
    reviews: 24,
    services: ['Shows ao Vivo', 'Aulas de Guitarra', 'Gravações em Estúdio', 'Casamentos', 'Eventos Corporativos'],
    priceRange: 'R$ 500-800',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    bio: 'Guitarrista profissional com mais de 10 anos de experiência em apresentações ao vivo. Especializado em rock e blues, com passagem por diversas bandas renomadas e eventos corporativos de grande porte. Formado em música pela UNESP, oferece um repertório diversificado e adaptável para qualquer ocasião.',
    verified: true,
    experience: '10+ anos',
    completedGigs: 156,
    instruments: ['Guitarra Elétrica', 'Violão', 'Baixo'],
    portfolio: [
      { type: 'video', title: 'Show Rock in Rio 2023', url: 'https://www.youtube.com/watch?v=example1' },
      { type: 'audio', title: 'Single "Noite de Blues"', url: 'https://soundcloud.com/example1' },
      { type: 'video', title: 'Performance Casamento', url: 'https://www.youtube.com/watch?v=example2' },
    ],
    contact: {
      phone: '(11) 99999-9999',
      email: 'joao.silva@email.com',
      instagram: '@joaosilva_music',
      youtube: 'João Silva Music',
      soundcloud: 'joaosilva'
    },
    availability: ['Segunda', 'Terça', 'Quarta', 'Sábado', 'Domingo'],
    photos: [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=400&h=300&fit=crop'
    ]
  };

  const reviews = [
    {
      id: 1,
      client: 'Maria Santos',
      rating: 5,
      comment: 'Excelente profissional! Fez um show incrível no meu casamento. Muito pontual e carismático.',
      date: '2024-06-15',
      event: 'Casamento'
    },
    {
      id: 2,
      client: 'Empresa XYZ',
      rating: 5,
      comment: 'Perfeito para nosso evento corporativo. Soube ler bem o público e criar o ambiente ideal.',
      date: '2024-06-10',
      event: 'Evento Corporativo'
    },
    {
      id: 3,
      client: 'Carlos Lima',
      rating: 4,
      comment: 'Muito bom guitarrista, repertório variado. Recomendo!',
      date: '2024-05-28',
      event: 'Aniversário'
    }
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bookingData.date || !bookingData.time || !bookingData.eventType) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    console.log('Booking data:', bookingData);
    
    toast({
      title: "Solicitação Enviada!",
      description: "Sua solicitação de agendamento foi enviada. O músico responderá em breve.",
    });
    
    setIsBookingOpen(false);
    setBookingData({
      date: '',
      time: '',
      eventType: '',
      location: '',
      duration: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <img
                src={musician.avatar}
                alt={musician.name}
                className="h-32 w-32 rounded-full object-cover"
              />
              {musician.verified && (
                <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-2">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{musician.name}</h1>
                  <p className="text-xl text-gray-600">{musician.style}</p>
                  <div className="flex items-center text-gray-500 mt-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {musician.city}, {musician.state}
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2 mt-4 md:mt-0">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-semibold text-lg">{musician.rating}</span>
                    <span className="text-gray-500">({musician.reviews} avaliações)</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{musician.priceRange}</p>
                  <p className="text-sm text-gray-500">por evento</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{musician.experience}</p>
                  <p className="text-sm text-gray-600">Experiência</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{musician.completedGigs}</p>
                  <p className="text-sm text-gray-600">Shows Realizados</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{musician.rating}</p>
                  <p className="text-sm text-gray-600">Nota Média</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">98%</p>
                  <p className="text-sm text-gray-600">Taxa Aprovação</p>
                </div>
              </div>
              
              <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Calendar className="h-5 w-5 mr-2" />
                    Agendar Show
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Agendar com {musician.name}</DialogTitle>
                    <DialogDescription>
                      Preencha os detalhes do seu evento para solicitar um agendamento.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date">Data *</Label>
                        <Input
                          id="date"
                          type="date"
                          value={bookingData.date}
                          onChange={(e) => setBookingData(prev => ({ ...prev, date: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="time">Horário *</Label>
                        <Input
                          id="time"
                          type="time"
                          value={bookingData.time}
                          onChange={(e) => setBookingData(prev => ({ ...prev, time: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="eventType">Tipo de Evento *</Label>
                      <Select value={bookingData.eventType} onValueChange={(value) => setBookingData(prev => ({ ...prev, eventType: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="show">Show/Apresentação</SelectItem>
                          <SelectItem value="wedding">Casamento</SelectItem>
                          <SelectItem value="corporate">Evento Corporativo</SelectItem>
                          <SelectItem value="birthday">Aniversário</SelectItem>
                          <SelectItem value="private">Festa Particular</SelectItem>
                          <SelectItem value="lesson">Aula de Música</SelectItem>
                          <SelectItem value="recording">Gravação</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="location">Local do Evento</Label>
                      <Input
                        id="location"
                        value={bookingData.location}
                        onChange={(e) => setBookingData(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="Endereço ou local do evento"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="duration">Duração</Label>
                      <Select value={bookingData.duration} onValueChange={(value) => setBookingData(prev => ({ ...prev, duration: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Duração estimada" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1h">1 hora</SelectItem>
                          <SelectItem value="2h">2 horas</SelectItem>
                          <SelectItem value="3h">3 horas</SelectItem>
                          <SelectItem value="4h">4 horas</SelectItem>
                          <SelectItem value="custom">Personalizado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Mensagem Adicional</Label>
                      <Textarea
                        id="message"
                        value={bookingData.message}
                        onChange={(e) => setBookingData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Descreva detalhes do evento, repertório desejado, etc."
                        rows={3}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      Enviar Solicitação
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>Sobre</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{musician.bio}</p>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle>Serviços Oferecidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {musician.services.map(service => (
                    <div key={service} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Portfolio */}
            <Card>
              <CardHeader>
                <CardTitle>Portfólio</CardTitle>
                <CardDescription>Confira alguns trabalhos recentes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {musician.portfolio.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Music className="h-6 w-6 text-blue-600" />
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-gray-600 capitalize">{item.type}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Ver
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Photos */}
            <Card>
              <CardHeader>
                <CardTitle>Galeria de Fotos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {musician.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Foto ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Avaliações ({reviews.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviews.map(review => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-medium">{review.client}</p>
                          <p className="text-sm text-gray-600">{review.event}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                      <p className="text-sm text-gray-500 mt-2">{review.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span>{musician.contact.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span>{musician.contact.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Instagram className="h-5 w-5 text-gray-400" />
                  <span>{musician.contact.instagram}</span>
                </div>
              </CardContent>
            </Card>

            {/* Instruments */}
            <Card>
              <CardHeader>
                <CardTitle>Instrumentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {musician.instruments.map(instrument => (
                    <Badge key={instrument} variant="secondary" className="mr-2 mb-2">
                      {instrument}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle>Disponibilidade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'].map(day => (
                    <div key={day} className="flex items-center justify-between">
                      <span className="text-sm">{day}</span>
                      {musician.availability.includes(day) ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <div className="h-4 w-4 rounded-full bg-gray-300" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Booking */}
            <Card>
              <CardHeader>
                <CardTitle>Agendamento Rápido</CardTitle>
                <CardDescription>
                  Entre em contato diretamente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => setIsBookingOpen(true)}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Agendar Agora
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Ligar Agora
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Enviar E-mail
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicianProfile;
