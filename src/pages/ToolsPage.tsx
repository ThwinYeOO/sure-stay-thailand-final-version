import { useState, useEffect } from 'react';
import { Calculator, CheckCircle, AlertTriangle, ArrowRight, Clock } from 'lucide-react';
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

interface ToolsPageProps {
  navigate: (page: Page) => void;
}

// Overstay Calculator
const OverstayCalculator = () => {
  const [expiryDate, setExpiryDate] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [result, setResult] = useState<{ days: number; fine: number } | null>(null);

  const calculateOverstay = () => {
    if (!expiryDate || !currentDate) {
      toast.error('Please select both dates');
      return;
    }

    const expiry = new Date(expiryDate);
    const current = new Date(currentDate);
    const diffTime = current.getTime() - expiry.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      setResult({ days: 0, fine: 0 });
    } else {
      const fine = Math.min(diffDays * 500, 20000);
      setResult({ days: diffDays, fine });
    }
  };

  return (
    <div className="card-premium p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#D7FF3B] flex items-center justify-center">
          <Calculator className="w-5 h-5 text-[#111111]" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#111111]">Overstay Fine Calculator</h3>
          <p className="text-sm text-[#6D6D6D]">Calculate potential penalties</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="micro-label block mb-2">Visa Expiry Date</label>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="w-full px-4 py-3 bg-[#F6F7F6] rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all"
          />
        </div>

        <div>
          <label className="micro-label block mb-2">Current Date</label>
          <input
            type="date"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            className="w-full px-4 py-3 bg-[#F6F7F6] rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all"
          />
        </div>

        <button
          onClick={calculateOverstay}
          className="btn-primary w-full"
        >
          Calculate Fine
        </button>

        {result && (
          <div className={`mt-4 p-4 rounded-xl ${result.days > 0 ? 'bg-red-50' : 'bg-green-50'}`}>
            {result.days > 0 ? (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <span className="font-semibold text-red-700">Overstay Detected</span>
                </div>
                <p className="text-sm text-red-600 mb-1">
                  Days overstayed: <strong>{result.days}</strong>
                </p>
                <p className="text-lg font-bold text-red-700">
                  Estimated Fine: THB {result.fine.toLocaleString()}
                </p>
                <p className="text-xs text-red-500 mt-2">
                  Maximum fine is THB 20,000. Contact us immediately for assistance.
                </p>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-green-700">No Overstay</span>
                </div>
                <p className="text-sm text-green-600">
                  Your visa is still valid. Remember to apply for extension before expiry!
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Visa Countdown
const VisaCountdown = () => {
  const [expiryDate, setExpiryDate] = useState('');
  const [countdown, setCountdown] = useState<{ days: number; hours: number; minutes: number } | null>(null);

  useEffect(() => {
    if (!expiryDate) return;

    const interval = setInterval(() => {
      const expiry = new Date(expiryDate);
      const now = new Date();
      const diff = expiry.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0 });
        clearInterval(interval);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setCountdown({ days, hours, minutes });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  return (
    <div className="card-premium p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#D7FF3B] flex items-center justify-center">
          <Clock className="w-5 h-5 text-[#111111]" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#111111]">Visa Expiry Countdown</h3>
          <p className="text-sm text-[#6D6D6D]">Track your remaining days</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="micro-label block mb-2">Your Visa Expiry Date</label>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="w-full px-4 py-3 bg-[#F6F7F6] rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all"
          />
        </div>

        {countdown && (
          <div className="mt-4">
            {countdown.days <= 0 ? (
              <div className="p-4 bg-red-50 rounded-xl text-center">
                <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="font-semibold text-red-700">Your visa has expired!</p>
                <p className="text-sm text-red-600">Contact us immediately for assistance.</p>
              </div>
            ) : (
              <div className="p-4 bg-[#F6F7F6] rounded-xl">
                <p className="text-center text-sm text-[#6D6D6D] mb-3">Time remaining</p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className={`text-3xl font-bold ${countdown.days <= 7 ? 'text-red-500' : 'text-[#111111]'}`}>
                      {countdown.days}
                    </div>
                    <div className="text-xs text-[#6D6D6D]">Days</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#111111]">{countdown.hours}</div>
                    <div className="text-xs text-[#6D6D6D]">Hours</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#111111]">{countdown.minutes}</div>
                    <div className="text-xs text-[#6D6D6D]">Minutes</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Eligibility Checker
const EligibilityChecker = () => {
  const [answers, setAnswers] = useState({
    hasValidVisa: null as boolean | null,
    passportValid: null as boolean | null,
    notOverstayed: null as boolean | null,
  });

  const allAnswered = answers.hasValidVisa !== null && answers.passportValid !== null && answers.notOverstayed !== null;
  const isEligible = answers.hasValidVisa && answers.passportValid && answers.notOverstayed;

  return (
    <div className="card-premium p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#D7FF3B] flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-[#111111]" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#111111]">Eligibility Checker</h3>
          <p className="text-sm text-[#6D6D6D]">Check if you qualify</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-[#F6F7F6] rounded-xl">
          <p className="text-sm text-[#111111] mb-3">Do you have a valid Thailand visa or visa exemption?</p>
          <div className="flex gap-3">
            <button
              onClick={() => setAnswers({ ...answers, hasValidVisa: true })}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                answers.hasValidVisa === true
                  ? 'bg-[#D7FF3B] text-[#111111]'
                  : 'bg-white text-[#6D6D6D] border border-[rgba(17,17,17,0.1)]'
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => setAnswers({ ...answers, hasValidVisa: false })}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                answers.hasValidVisa === false
                  ? 'bg-red-100 text-red-700'
                  : 'bg-white text-[#6D6D6D] border border-[rgba(17,17,17,0.1)]'
              }`}
            >
              No
            </button>
          </div>
        </div>

        <div className="p-4 bg-[#F6F7F6] rounded-xl">
          <p className="text-sm text-[#111111] mb-3">Is your passport valid for at least 6 months?</p>
          <div className="flex gap-3">
            <button
              onClick={() => setAnswers({ ...answers, passportValid: true })}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                answers.passportValid === true
                  ? 'bg-[#D7FF3B] text-[#111111]'
                  : 'bg-white text-[#6D6D6D] border border-[rgba(17,17,17,0.1)]'
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => setAnswers({ ...answers, passportValid: false })}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                answers.passportValid === false
                  ? 'bg-red-100 text-red-700'
                  : 'bg-white text-[#6D6D6D] border border-[rgba(17,17,17,0.1)]'
              }`}
            >
              No
            </button>
          </div>
        </div>

        <div className="p-4 bg-[#F6F7F6] rounded-xl">
          <p className="text-sm text-[#111111] mb-3">Have you overstayed your current visa?</p>
          <div className="flex gap-3">
            <button
              onClick={() => setAnswers({ ...answers, notOverstayed: false })}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                answers.notOverstayed === false
                  ? 'bg-red-100 text-red-700'
                  : 'bg-white text-[#6D6D6D] border border-[rgba(17,17,17,0.1)]'
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => setAnswers({ ...answers, notOverstayed: true })}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                answers.notOverstayed === true
                  ? 'bg-[#D7FF3B] text-[#111111]'
                  : 'bg-white text-[#6D6D6D] border border-[rgba(17,17,17,0.1)]'
              }`}
            >
              No
            </button>
          </div>
        </div>

        {allAnswered && (
          <div className={`mt-4 p-4 rounded-xl ${isEligible ? 'bg-green-50' : 'bg-red-50'}`}>
            {isEligible ? (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-green-700">You're Eligible!</span>
                </div>
                <p className="text-sm text-green-600 mb-3">
                  Based on your answers, you qualify for a visa extension.
                </p>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <span className="font-semibold text-red-700">Not Eligible</span>
                </div>
                <p className="text-sm text-red-600">
                  Based on your answers, you may not qualify for a standard extension. 
                  Please contact us for personalized assistance.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ToolsPage = ({ navigate }: ToolsPageProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full min-h-screen pt-20 pb-16 bg-[#F6F7F6]">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className="text-3xl lg:text-4xl font-bold text-[#111111] mb-3"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Free Tools
          </h1>
          <p className="text-[#6D6D6D] max-w-xl mx-auto">
            Useful calculators and checkers to help you plan your stay in Thailand.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <OverstayCalculator />
          <VisaCountdown />
          <EligibilityChecker />
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-[#6D6D6D] mb-4">
            Need help with your visa extension?
          </p>
          <button
            onClick={() => navigate('apply')}
            className="btn-primary inline-flex items-center gap-2"
          >
            Apply Now
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </main>
  );
};

export default ToolsPage;
