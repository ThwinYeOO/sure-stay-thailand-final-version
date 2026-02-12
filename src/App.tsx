import { useState } from 'react';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import ServicePage from './pages/ServicePage';
import ApplyPage from './pages/ApplyPage';
import TrackPage from './pages/TrackPage';
import KnowledgeCenter from './pages/KnowledgeCenter';
import ToolsPage from './pages/ToolsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import RefundPage from './pages/RefundPage';
import DisclaimerPage from './pages/DisclaimerPage';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/UserDashboard';
import Chatbot from './components/Chatbot';
import Navigation from './components/Navigation';

type Page = 
  | 'home' 
  | 'services/tourist-visa-extension' 
  | 'apply' 
  | 'track' 
  | 'knowledge' 
  | 'tools' 
  | 'about' 
  | 'contact' 
  | 'privacy' 
  | 'terms' 
  | 'refund' 
  | 'disclaimer' 
  | 'admin' 
  | 'login' 
  | 'register' 
  | 'dashboard' 
  | 'user-dashboard';

// Protected Route Component
function ProtectedRoute({ 
  children, 
  requireAdmin = false,
  navigate 
}: { 
  children: React.ReactNode; 
  requireAdmin?: boolean;
  navigate: (page: Page) => void;
}) {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    navigate('login');
    return null;
  }
  
  if (requireAdmin && !isAdmin) {
    navigate('home');
    return null;
  }
  
  return <>{children}</>;
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { user, isAdmin } = useAuth();
  
  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigate={navigate} />;
      case 'services/tourist-visa-extension':
        return <ServicePage navigate={navigate} />;
      case 'apply':
        return <ApplyPage navigate={navigate} />;
      case 'track':
        return <TrackPage />;
      case 'knowledge':
        return <KnowledgeCenter navigate={navigate} />;
      case 'tools':
        return <ToolsPage navigate={navigate} />;
      case 'about':
        return <AboutPage navigate={navigate} />;
      case 'contact':
        return <ContactPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      case 'refund':
        return <RefundPage />;
      case 'disclaimer':
        return <DisclaimerPage />;
      case 'admin':
        return (
          <ProtectedRoute requireAdmin navigate={navigate}>
            <AdminDashboard navigate={navigate} />
          </ProtectedRoute>
        );
      case 'login':
        return <LoginPage navigate={navigate} />;
      case 'register':
        return <RegisterPage navigate={navigate} />;
      case 'user-dashboard':
        return (
          <ProtectedRoute navigate={navigate}>
            <UserDashboard navigate={navigate} />
          </ProtectedRoute>
        );
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F7F6]">
      <div className="grain-overlay" />
      <Navigation currentPage={currentPage} navigate={navigate} />
      {renderPage()}
      <Chatbot currentPage={currentPage} user={user} isAdmin={isAdmin} />
      <Toaster position="top-center" richColors />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
