import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, Globe, ArrowRight, Check } from 'lucide-react';
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

interface RegisterPageProps {
  navigate: (page: Page) => void;
}

const RegisterPage = ({ navigate }: RegisterPageProps) => {
  const { register } = useAuth();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    nationality: '',
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields');
      return false;
    }
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.phone || !formData.nationality) {
      toast.error('Please fill in all fields');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep2()) return;
    
    setIsLoading(true);
    const success = await register({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      nationality: formData.nationality,
    });
    setIsLoading(false);
    
    if (success) {
      toast.success('Please check your email to verify your account');
      navigate('login');
    }
  };

  const passwordStrength = () => {
    const { password } = formData;
    if (password.length >= 12 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
      return { label: 'Strong', color: 'bg-green-500' };
    }
    if (password.length >= 8 && (/[A-Z]/.test(password) || /[0-9]/.test(password))) {
      return { label: 'Medium', color: 'bg-yellow-500' };
    }
    if (password.length > 0) {
      return { label: 'Weak', color: 'bg-red-500' };
    }
    return { label: '', color: 'bg-gray-200' };
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
              Create Account
            </h1>
            <p className="text-[#6D6D6D]">
              Join thousands of travelers extending their stay
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 1 ? 'bg-[#D7FF3B] text-[#111111]' : 'bg-[#F6F7F6] text-[#6D6D6D]'
            }`}>
              {step > 1 ? <Check className="w-4 h-4" /> : '1'}
            </div>
            <div className={`w-12 h-1 rounded-full ${step >= 2 ? 'bg-[#D7FF3B]' : 'bg-[#F6F7F6]'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 2 ? 'bg-[#D7FF3B] text-[#111111]' : 'bg-[#F6F7F6] text-[#6D6D6D]'
            }`}>
              2
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {step === 1 && (
              <>
                <div>
                  <label className="micro-label block mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6D6D6D]" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-[#F6F7F6] rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="micro-label block mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6D6D6D]" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
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
                      value={formData.password}
                      onChange={(e) => updateField('password', e.target.value)}
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
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-[#F6F7F6] rounded-full overflow-hidden">
                          <div className={`h-full ${passwordStrength().color} transition-all`} 
                               style={{ width: formData.password.length >= 8 ? '100%' : '50%' }} />
                        </div>
                        <span className="text-xs text-[#6D6D6D]">{passwordStrength().label}</span>
                      </div>
                      <p className="text-xs text-[#6D6D6D] mt-1">
                        Min 8 chars, include uppercase, number & symbol
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="micro-label block mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6D6D6D]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => updateField('confirmPassword', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-[#F6F7F6] rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className="micro-label block mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6D6D6D]" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-[#F6F7F6] rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all"
                      placeholder="+66 xxx xxx xxx"
                    />
                  </div>
                </div>

                <div>
                  <label className="micro-label block mb-2">Nationality</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6D6D6D]" />
                    <select
                      value={formData.nationality}
                      onChange={(e) => updateField('nationality', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-[#F6F7F6] rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all appearance-none"
                    >
                      <option value="">Select your nationality</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Canada">Canada</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Japan">Japan</option>
                      <option value="South Korea">South Korea</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input type="checkbox" id="terms" className="mt-1 w-4 h-4 rounded" required />
                  <label htmlFor="terms" className="text-sm text-[#6D6D6D]">
                    I agree to the{' '}
                    <button type="button" onClick={() => navigate('terms')} className="text-[#111111] underline">Terms of Service</button>
                    {' '}and{' '}
                    <button type="button" onClick={() => navigate('privacy')} className="text-[#111111] underline">Privacy Policy</button>
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 px-4 rounded-full border border-[rgba(17,17,17,0.15)] text-[#111111] font-medium hover:bg-[#F6F7F6] transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-[#111111] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#6D6D6D]">
              Already have an account?{' '}
              <button
                onClick={() => navigate('login')}
                className="text-[#111111] font-medium hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
