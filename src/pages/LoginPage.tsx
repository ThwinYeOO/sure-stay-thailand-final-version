import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
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

interface LoginPageProps {
  navigate: (page: Page) => void;
}

const LoginPage = ({ navigate }: LoginPageProps) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    const success = await login(email, password);
    setIsLoading(false);
    
    if (success) {
      // Redirect based on role
      if (email === 'admin@staysure.co') {
        navigate('admin');
      } else {
        navigate('user-dashboard');
      }
    }
  };

  return (
    <main className="w-full min-h-screen pt-20 pb-16 bg-[#F6F7F6]">
      <div className="max-w-md mx-auto px-6 lg:px-10">
        <div className="card-premium p-8 lg:p-10">
          <div className="text-center mb-8">
            <h1
              className="text-2xl lg:text-3xl font-bold text-[#111111] mb-2"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Welcome Back
            </h1>
            <p className="text-[#6D6D6D]">
              Sign in to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="micro-label block mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6D6D6D]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#F6F7F6] rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="micro-label block mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6D6D6D]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-[#F6F7F6] rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6D6D6D] hover:text-[#111111] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-[rgba(17,17,17,0.2)]" />
                <span className="text-sm text-[#6D6D6D]">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => toast.info('Password reset link sent!')}
                className="text-sm text-[#111111] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-[#111111] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#6D6D6D]">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('register')}
                className="text-[#111111] font-medium hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>

          <div className="mt-8 p-4 bg-[#F6F7F6] rounded-xl">
            <p className="text-xs text-[#6D6D6D] text-center mb-2">Demo Credentials</p>
            <div className="space-y-1 text-xs text-[#6D6D6D]">
              <p><strong>Admin:</strong> admin@staysure.co / password</p>
              <p><strong>User:</strong> john@example.com / password</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
