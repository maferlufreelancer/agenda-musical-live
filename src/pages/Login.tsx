
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import { Music } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    const success = await login(email, password);
    
    if (success) {
      toast({
        title: "Sucesso!",
        description: "Login realizado com sucesso.",
      });
      navigate('/musicians');
    } else {
      toast({
        title: "Erro",
        description: "Credenciais inválidas.",
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Music className="h-12 w-12 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Entrar na sua conta</CardTitle>
            <CardDescription>
              Acesse seu dashboard e gerencie seus agendamentos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
            
            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-gray-600">
                Não tem uma conta?
              </p>
              <div className="flex flex-col space-y-2">
                <Link to="/register/musician">
                  <Button variant="outline" size="sm" className="w-full">
                    Cadastrar como Músico
                  </Button>
                </Link>
                <Link to="/register/client">
                  <Button variant="outline" size="sm" className="w-full">
                    Cadastrar como Cliente
                  </Button>
                </Link>
              </div>
              
              <div className="mt-4 p-3 bg-gray-100 rounded-lg text-xs text-gray-600">
                <p><strong>Dica:</strong> Crie uma conta nova para testar!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
