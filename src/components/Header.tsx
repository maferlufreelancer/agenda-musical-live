
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Music, User, Calendar } from 'lucide-react';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardPath = () => {
    if (!user) return '/login';
    return `/dashboard/${user.type}`;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Music className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Músicos Free Lancer</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/musicians" className="text-gray-700 hover:text-blue-600 font-medium">
              Encontrar Músicos
            </Link>
            {!isAuthenticated ? (
              <>
                <Link to="/register/musician" className="text-gray-700 hover:text-blue-600 font-medium">
                  Sou Músico
                </Link>
                <Link to="/register/client" className="text-gray-700 hover:text-blue-600 font-medium">
                  Sou Cliente
                </Link>
              </>
            ) : null}
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <>
                <Link to={getDashboardPath()}>
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Button>
                </Link>
                <div className="flex items-center space-x-2">
                  <img 
                    src={user.avatar || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face`}
                    alt={user.name}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <Link to="/login">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <User className="h-4 w-4 mr-2" />
                  Entrar
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
