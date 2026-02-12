import { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

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

interface NavigationProps {
  currentPage: Page;
  navigate: (page: Page) => void;
}

const Navigation = ({ currentPage, navigate }: NavigationProps) => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: Page }[] = [
    { label: 'Services', page: 'services/tourist-visa-extension' },
    { label: 'Pricing', page: 'home' },
    { label: 'FAQ', page: 'home' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: Page) => {
    navigate(page);
    setIsMobileMenuOpen(false);
    setShowUserMenu(false);
  };

  const handleLogout = () => {
    logout();
    navigate('home');
    setShowUserMenu(false);
  };

  const isActive = (page: Page) => currentPage === page;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="text-xl lg:text-2xl font-bold text-[#111111]"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              StaySure
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.page)}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.page)
                      ? 'text-[#111111]'
                      : 'text-[#6D6D6D] hover:text-[#111111]'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              {/* Auth Buttons */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F6F7F6] hover:bg-[#E5E6E5] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#D7FF3B] flex items-center justify-center">
                      <User className="w-4 h-4 text-[#111111]" />
                    </div>
                    <span className="text-sm font-medium text-[#111111]">{user?.fullName.split(' ')[0]}</span>
                    <ChevronDown className={`w-4 h-4 text-[#6D6D6D] transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {/* User Dropdown */}
                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-48 card-premium py-2 shadow-lg">
                      {isAdmin && (
                        <button
                          onClick={() => handleNavClick('admin')}
                          className="w-full px-4 py-2 text-left text-sm text-[#111111] hover:bg-[#F6F7F6] transition-colors"
                        >
                          Admin Dashboard
                        </button>
                      )}
                      <button
                        onClick={() => handleNavClick('user-dashboard')}
                        className="w-full px-4 py-2 text-left text-sm text-[#111111] hover:bg-[#F6F7F6] transition-colors"
                      >
                        My Applications
                      </button>
                      <button
                        onClick={() => handleNavClick('apply')}
                        className="w-full px-4 py-2 text-left text-sm text-[#111111] hover:bg-[#F6F7F6] transition-colors"
                      >
                        New Application
                      </button>
                      <div className="border-t border-[rgba(17,17,17,0.08)] my-1" />
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleNavClick('login')}
                    className="text-sm font-medium text-[#6D6D6D] hover:text-[#111111] transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleNavClick('apply')}
                    className="btn-primary text-sm"
                  >
                    Check eligibility
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-[rgba(17,17,17,0.04)] transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#111111]" />
              ) : (
                <Menu className="w-6 h-6 text-[#111111]" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-transform duration-300 lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 pt-20">
          {/* User Info (if logged in) */}
          {isAuthenticated && (
            <div className="text-center mb-4">
              <div className="w-16 h-16 rounded-full bg-[#D7FF3B] flex items-center justify-center mx-auto mb-2">
                <User className="w-8 h-8 text-[#111111]" />
              </div>
              <p className="font-semibold text-[#111111]">{user?.fullName}</p>
              <p className="text-sm text-[#6D6D6D]">{user?.email}</p>
            </div>
          )}

          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.page)}
              className={`text-2xl font-medium transition-colors ${
                isActive(link.page)
                  ? 'text-[#111111]'
                  : 'text-[#6D6D6D] hover:text-[#111111]'
              }`}
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {link.label}
            </button>
          ))}

          {/* Auth Buttons Mobile */}
          {isAuthenticated ? (
            <>
              {isAdmin && (
                <button
                  onClick={() => handleNavClick('admin')}
                  className="text-xl font-medium text-[#111111]"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Admin Dashboard
                </button>
              )}
              <button
                onClick={() => handleNavClick('user-dashboard')}
                className="text-xl font-medium text-[#111111]"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                My Applications
              </button>
              <button
                onClick={handleLogout}
                className="text-xl font-medium text-red-600 flex items-center gap-2"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleNavClick('login')}
                className="text-xl font-medium text-[#111111]"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Sign In
              </button>
              <button
                onClick={() => handleNavClick('apply')}
                className="btn-primary text-lg mt-4"
              >
                Start your extension
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navigation;
