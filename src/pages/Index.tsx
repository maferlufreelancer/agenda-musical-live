
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import { Music, Users, Calendar, Star, CheckCircle, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Conecte-se com os Melhores Músicos Freelancers
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              A plataforma completa para músicos profissionais e empresas que buscam 
              talento musical para seus eventos. Agende shows, aulas e gravações com facilidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register/musician">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
                  Sou Músico
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/register/client">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3">
                  Contratar Músicos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Por que escolher nossa plataforma?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos as ferramentas mais avançadas para conectar músicos talentosos 
              com oportunidades únicas de trabalho.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <Music className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Para Músicos</h3>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Perfil profissional completo</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Agenda inteligente</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Portfólio multimídia</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Relatórios de performance</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Para Empresas</h3>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Busca avançada por músicos</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Agendamento simplificado</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Histórico de contratações</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Sistema de avaliações</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <Star className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Benefícios</h3>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Pagamentos seguros</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Suporte 24/7</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Interface intuitiva</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Mobile responsivo</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-200">Músicos Cadastrados</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1.2k+</div>
              <div className="text-blue-200">Eventos Realizados</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">300+</div>
              <div className="text-blue-200">Empresas Parceiras</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8★</div>
              <div className="text-blue-200">Avaliação Média</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para começar sua jornada musical?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Junte-se a centenas de músicos e empresas que já transformaram seus negócios conosco.
          </p>
          <Link to="/musicians">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
              Explorar Músicos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Music className="h-6 w-6 text-blue-600" />
                <span className="text-lg font-bold">Músicos Free Lancer</span>
              </div>
              <p className="text-gray-400">
                A plataforma que conecta músicos talentosos com oportunidades incríveis.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Para Músicos</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/register/musician" className="hover:text-white">Cadastre-se</Link></li>
                <li><Link to="/login" className="hover:text-white">Fazer Login</Link></li>
                <li><a href="#" className="hover:text-white">Como Funciona</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Para Empresas</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/register/client" className="hover:text-white">Cadastre-se</Link></li>
                <li><Link to="/musicians" className="hover:text-white">Buscar Músicos</Link></li>
                <li><a href="#" className="hover:text-white">Planos</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white">Contato</a></li>
                <li><a href="#" className="hover:text-white">Termos de Uso</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Músicos Free Lancer. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
