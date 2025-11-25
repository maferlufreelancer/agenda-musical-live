
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import RegisterMusician from "./pages/RegisterMusician";
import RegisterClient from "./pages/RegisterClient";
import MusicianDashboard from "./pages/MusicianDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SearchMusicians from "./pages/SearchMusicians";
import MusicianProfile from "./pages/MusicianProfile";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/register/musician" element={<RegisterMusician />} />
            <Route path="/register/client" element={<RegisterClient />} />
            <Route path="/musicians" element={<ProtectedRoute><SearchMusicians /></ProtectedRoute>} />
            <Route path="/musician/:id" element={<ProtectedRoute><MusicianProfile /></ProtectedRoute>} />
            <Route path="/dashboard/musician" element={<ProtectedRoute><MusicianDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/client" element={<ProtectedRoute><ClientDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
