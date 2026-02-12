import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Check, Upload, Calendar, CreditCard, User, FileText, Lock } from 'lucide-react';
import { toast } from 'sonner';

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
  | 'admin';

interface ApplyPageProps {
  navigate: (page: Page) => void;
}

const steps = [
  { id: 1, name: 'Personal Info', icon: User },
  { id: 2, name: 'Visa Details', icon: FileText },
  { id: 3, name: 'Documents', icon: Upload },
  { id: 4, name: 'Payment', icon: CreditCard },
];

const ApplyPage = ({ navigate }: ApplyPageProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationality: '',
    passportNumber: '',
    visaType: '',
    expiryDate: '',
    serviceType: 'standard',
    passportFile: null as File | null,
    photoFile: null as File | null,
     cardBrand: 'visa',
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: '',
    savePaymentDetails: false,
    termsAccepted: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateFormData = (field: string, value: string | boolean | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
          toast.error('Please fill in all required fields');
          return false;
        }
        if (!formData.email.includes('@')) {
          toast.error('Please enter a valid email address');
          return false;
        }
        return true;
      case 2:
        if (!formData.nationality || !formData.passportNumber || !formData.visaType || !formData.expiryDate) {
          toast.error('Please fill in all required fields');
          return false;
        }
        return true;
      case 3:
        if (!formData.passportFile || !formData.photoFile) {
          toast.error('Please upload all required documents');
          return false;
        }
        return true;
      case 4:  if (
          !formData.cardNumber ||
          !formData.cardHolder ||
          !formData.expiryMonth ||
          !formData.expiryYear ||
          !formData.cvc
        ) {
          toast.error('Please complete your card details');
          return false;
        }
        if (!formData.termsAccepted) {
          toast.error('Please accept the terms and conditions');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < steps.length) {
        setCurrentStep((prev) => prev + 1);
        window.scrollTo(0, 0);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast.success('Application submitted successfully! Check your email for confirmation.');
    setIsSubmitting(false);
    
    // Redirect to track page
    setTimeout(() => {
      navigate('track');
    }, 2000);
  };

  const getPrice = () => {
    return formData.serviceType === 'express' ? 6900 : 4500;
  };

  const getDeposit = () => {
    return Math.round(getPrice() * 0.5);
  };

  return (
    <main className="w-full min-h-screen pt-20 pb-16 bg-[#F6F7F6]">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className="text-3xl lg:text-4xl font-bold text-[#111111] mb-3"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Apply for Visa Extension
          </h1>
          <p className="text-[#6D6D6D]">
            Complete the form below to start your application
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    step.id <= currentStep
                      ? 'bg-[#D7FF3B] text-[#111111]'
                      : 'bg-[#F6F7F6] text-[#6D6D6D] border border-[rgba(17,17,17,0.1)]'
                  }`}
                >
                  {step.id < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-4 h-4" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-full h-1 mx-2 transition-all ${
                      step.id < currentStep ? 'bg-[#D7FF3B]' : 'bg-[rgba(17,17,17,0.1)]'
                    }`}
                    style={{ width: '40px' }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-[#6D6D6D]">
            {steps.map((step) => (
              <span key={step.id} className={step.id === currentStep ? 'text-[#111111] font-medium' : ''}>
                {step.name}
              </span>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="card-premium p-6 lg:p-10">
          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-[#111111] mb-6">Personal Information</h2>
              
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="micro-label block mb-2">First Name *</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    className="w-full px-4 py-3 bg-[#F6F7F6] rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="micro-label block mb-2">Last Name *</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    className="w-full px-4 py-3 bg-[#F6F7F6] rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="micro-label block mb-2">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="w-full px-4 py-3 bg-[#F6F7F6] rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="micro-label block mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className="w-full px-4 py-3 bg-[#F6F7F6] rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all"
                  placeholder="+66 xxx xxx xxx"
                />
              </div>
            </div>
          )}

          {/* Step 2: Visa Details */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-[#111111] mb-6">Visa Details</h2>
              
              <div>
                <label className="micro-label block mb-2">Nationality *</label>
                <select
                  value={formData.nationality}
                  onChange={(e) => updateFormData('nationality', e.target.value)}
                  className="w-full px-4 py-3 bg-[#F6F7F6] rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all"
                >
                  <option value="">Select your nationality</option>
                  <option value="us">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="eu">European Union</option>
                  <option value="au">Australia</option>
                  <option value="ca">Canada</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="micro-label block mb-2">Passport Number *</label>
                <input
                  type="text"
                  value={formData.passportNumber}
                  onChange={(e) => updateFormData('passportNumber', e.target.value)}
                  className="w-full px-4 py-3 bg-[#F6F7F6] rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all"
                  placeholder="Your passport number"
                />
              </div>

              <div>
                <label className="micro-label block mb-2">Current Visa Type *</label>
                <select
                  value={formData.visaType}
                  onChange={(e) => updateFormData('visaType', e.target.value)}
                  className="w-full px-4 py-3 bg-[#F6F7F6] rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all"
                >
                  <option value="">Select visa type</option>
                  <option value="tourist">Tourist Visa (TR)</option>
                  <option value="visa_exempt">Visa Exemption (30 days)</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="micro-label block mb-2">Visa Expiry Date *</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6D6D6D]" />
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => updateFormData('expiryDate', e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-[#F6F7F6] rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="micro-label block mb-2">Service Type</label>
                <div className="grid md:grid-cols-2 gap-4">
                  <label
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.serviceType === 'standard'
                        ? 'border-[#D7FF3B] bg-[#D7FF3B]/10'
                        : 'border-[rgba(17,17,17,0.08)]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="serviceType"
                      value="standard"
                      checked={formData.serviceType === 'standard'}
                      onChange={(e) => updateFormData('serviceType', e.target.value)}
                      className="hidden"
                    />
                    <div className="font-semibold text-[#111111]">Standard</div>
                    <div className="text-sm text-[#6D6D6D]">7–10 business days</div>
                    <div className="text-lg font-bold text-[#111111] mt-2">THB 4,500</div>
                  </label>
                  <label
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.serviceType === 'express'
                        ? 'border-[#D7FF3B] bg-[#D7FF3B]/10'
                        : 'border-[rgba(17,17,17,0.08)]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="serviceType"
                      value="express"
                      checked={formData.serviceType === 'express'}
                      onChange={(e) => updateFormData('serviceType', e.target.value)}
                      className="hidden"
                    />
                    <div className="font-semibold text-[#111111]">Express</div>
                    <div className="text-sm text-[#6D6D6D]">3–5 business days</div>
                    <div className="text-lg font-bold text-[#111111] mt-2">THB 6,900</div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Documents */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-[#111111] mb-6">Upload Documents</h2>
              
              <div>
                <label className="micro-label block mb-2">Passport (Photo Page) *</label>
                <div className="border-2 border-dashed border-[rgba(17,17,17,0.15)] rounded-xl p-8 text-center hover:border-[#D7FF3B] transition-colors">
                  <Upload className="w-10 h-10 text-[#6D6D6D] mx-auto mb-3" />
                  <p className="text-sm text-[#6D6D6D] mb-2">
                    {formData.passportFile ? formData.passportFile.name : 'Drag & drop or click to upload'}
                  </p>
                  <p className="text-xs text-[#6D6D6D]">JPG, PNG or PDF up to 10MB</p>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => updateFormData('passportFile', e.target.files?.[0] || null)}
                    className="hidden"
                    id="passport-upload"
                  />
                  <label
                    htmlFor="passport-upload"
                    className="btn-secondary mt-4 inline-block cursor-pointer"
                  >
                    Select File
                  </label>
                </div>
              </div>

              <div>
                <label className="micro-label block mb-2">Passport Photo *</label>
                <div className="border-2 border-dashed border-[rgba(17,17,17,0.15)] rounded-xl p-8 text-center hover:border-[#D7FF3B] transition-colors">
                  <Upload className="w-10 h-10 text-[#6D6D6D] mx-auto mb-3" />
                  <p className="text-sm text-[#6D6D6D] mb-2">
                    {formData.photoFile ? formData.photoFile.name : 'Drag & drop or click to upload'}
                  </p>
                  <p className="text-xs text-[#6D6D6D]">4x6 cm photo, JPG or PNG</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => updateFormData('photoFile', e.target.files?.[0] || null)}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="btn-secondary mt-4 inline-block cursor-pointer"
                  >
                    Select File
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Payment */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-[#111111] mb-6">Payment</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                  { id: 'mastercard', label: 'Mastercard' },
                  { id: 'visa', label: 'VISA' },
                  { id: 'paypal', label: 'PayPal' },
                  { id: 'cod', label: 'Cash on Delivery' },
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`border rounded-xl px-3 py-4 text-center cursor-pointer transition-all ${
                      formData.cardBrand === method.id
                        ? 'border-[#111111] bg-[#D7FF3B]/20'
                        : 'border-[rgba(17,17,17,0.1)] bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      className="hidden"
                      name="payment-method"
                      value={method.id}
                      checked={formData.cardBrand === method.id}
                      onChange={(e) => updateFormData('cardBrand', e.target.value)}
                    />
                    <div className="text-xs font-medium text-[#111111]">{method.label}</div>
                  </label>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="micro-label block mb-2">Card Number *</label>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => updateFormData('cardNumber', e.target.value)}
                    className="w-full px-4 py-3 bg-[#F6F7F6] rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div>
                  <label className="micro-label block mb-2">Cardholder *</label>
                  <input
                    type="text"
                    value={formData.cardHolder}
                    onChange={(e) => updateFormData('cardHolder', e.target.value)}
                    className="w-full px-4 py-3 bg-[#F6F7F6] rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="micro-label block mb-2">Expiry Date *</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={formData.expiryMonth}
                      onChange={(e) => updateFormData('expiryMonth', e.target.value)}
                      className="w-full px-4 py-3 bg-[#F6F7F6] rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all"
                      placeholder="MM"
                    />
                    <input
                      type="text"
                      value={formData.expiryYear}
                      onChange={(e) => updateFormData('expiryYear', e.target.value)}
                      className="w-full px-4 py-3 bg-[#F6F7F6] rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all"
                      placeholder="YY"
                    />
                  </div>
                </div>
                <div>
                  <label className="micro-label block mb-2">CVC *</label>
                  <input
                    type="text"
                    value={formData.cvc}
                    onChange={(e) => updateFormData('cvc', e.target.value)}
                    className="w-full px-4 py-3 bg-[#F6F7F6] rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all"
                    placeholder="123"
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 text-sm text-[#6D6D6D]">
                <input
                  type="checkbox"
                  checked={formData.savePaymentDetails}
                  onChange={(e) => updateFormData('savePaymentDetails', e.target.checked)}
                  className="w-5 h-5 rounded border-[rgba(17,17,17,0.2)] text-[#D7FF3B] focus:ring-[#D7FF3B]"
                />
                Save my details for future purchases
              </label>

              <div className="bg-[#F6F7F6] rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-[#111111] mb-4">Order Summary</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6D6D6D]">Service Fee ({formData.serviceType === 'express' ? 'Express' : 'Standard'})</span>
                    <span className="text-[#111111]">THB {getPrice().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6D6D6D]">Government Fee</span>
                    <span className="text-[#111111]">THB 1,900</span>
                  </div>
                </div>
                <div className="border-t border-[rgba(17,17,17,0.1)] pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#111111]">Total</span>
                    <span className="font-bold text-[#111111]">THB {(getPrice() + 1900).toLocaleString()}</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-[#D7FF3B]/20 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#111111]">Deposit Due Now (50%)</span>
                    <span className="font-bold text-[#111111]">THB {getDeposit().toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.termsAccepted}
                  onChange={(e) => updateFormData('termsAccepted', e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-[rgba(17,17,17,0.2)] text-[#D7FF3B] focus:ring-[#D7FF3B]"
                />
                <label htmlFor="terms" className="text-sm text-[#6D6D6D]">
                  I agree to the{' '}
                  <button onClick={() => navigate('terms')} className="text-[#111111] underline">Terms of Service</button>
                  {' '}and{' '}
                  <button onClick={() => navigate('privacy')} className="text-[#111111] underline">Privacy Policy</button>
                </label>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#6D6D6D]">
                <Lock className="w-4 h-4" />
                <span>Secure payment processing</span>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[rgba(17,17,17,0.08)]">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                currentStep === 1
                  ? 'text-[#6D6D6D] cursor-not-allowed'
                  : 'text-[#111111] hover:bg-[#F6F7F6]'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={handleNext}
                className="btn-primary flex items-center gap-2"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#111111] border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Pay Deposit THB {getDeposit().toLocaleString()}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ApplyPage;
