import { useState, useEffect } from 'react';
import { Search, Mail, Calendar, CheckCircle, Clock, AlertCircle, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface ApplicationStatus {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'reviewing' | 'submitted' | 'approved' | 'completed';
  submittedDate: string;
  estimatedCompletion: string;
  progress: number;
  updates: {
    date: string;
    message: string;
  }[];
}

// Mock data for demonstration
const mockApplications: Record<string, ApplicationStatus> = {
  '1234': {
    id: 'ST-2026-001234',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'reviewing',
    submittedDate: '2026-02-10',
    estimatedCompletion: '2026-02-18',
    progress: 40,
    updates: [
      { date: '2026-02-10', message: 'Application received and payment confirmed' },
      { date: '2026-02-11', message: 'Documents under review' },
    ],
  },
  '5678': {
    id: 'ST-2026-005678',
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'submitted',
    submittedDate: '2026-02-08',
    estimatedCompletion: '2026-02-16',
    progress: 70,
    updates: [
      { date: '2026-02-08', message: 'Application received and payment confirmed' },
      { date: '2026-02-09', message: 'Documents approved' },
      { date: '2026-02-12', message: 'Application submitted to immigration' },
    ],
  },
};

const statusConfig = {
  pending: { label: 'Pending Review', color: 'text-amber-600', bgColor: 'bg-amber-50', icon: Clock },
  reviewing: { label: 'Under Review', color: 'text-blue-600', bgColor: 'bg-blue-50', icon: FileText },
  submitted: { label: 'Submitted to Immigration', color: 'text-purple-600', bgColor: 'bg-purple-50', icon: CheckCircle },
  approved: { label: 'Approved', color: 'text-green-600', bgColor: 'bg-green-50', icon: CheckCircle },
  completed: { label: 'Completed', color: 'text-[#111111]', bgColor: 'bg-[#D7FF3B]', icon: CheckCircle },
};

const TrackPage = () => {
  const [email, setEmail] = useState('');
  const [passportLast4, setPassportLast4] = useState('');
  const [application, setApplication] = useState<ApplicationStatus | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !passportLast4) {
      toast.error('Please enter both email and passport last 4 digits');
      return;
    }

    setIsSearching(true);
    setHasSearched(false);

    // Simulate API call
    setTimeout(() => {
      const mockData = mockApplications[passportLast4];
      if (mockData) {
        setApplication(mockData);
        toast.success('Application found!');
      } else {
        setApplication(null);
        toast.error('No application found with those details');
      }
      setIsSearching(false);
      setHasSearched(true);
    }, 1500);
  };

  const getStatusConfig = (status: string) => {
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  };

  return (
    <main className="w-full min-h-screen pt-20 pb-16 bg-[#F6F7F6]">
      <div className="max-w-2xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className="text-3xl lg:text-4xl font-bold text-[#111111] mb-3"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Track Your Application
          </h1>
          <p className="text-[#6D6D6D]">
            Enter your details to check your application status
          </p>
        </div>

        {/* Search Form */}
        <div className="card-premium p-6 lg:p-8 mb-8">
          <form onSubmit={handleSearch} className="space-y-5">
            <div>
              <label className="micro-label block mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6D6D6D]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#F6F7F6] rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="micro-label block mb-2">Passport Last 4 Digits</label>
              <input
                type="text"
                value={passportLast4}
                onChange={(e) => setPassportLast4(e.target.value.slice(0, 4))}
                maxLength={4}
                className="w-full px-4 py-3 bg-[#F6F7F6] rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all"
                placeholder="XXXX"
              />
            </div>

            <button
              type="submit"
              disabled={isSearching}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSearching ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#111111] border-t-transparent rounded-full animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Track Application
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        {hasSearched && application && (
          <div className="space-y-6 animate-fade-in-up">
            {/* Status Card */}
            <div className="card-premium p-6 lg:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="micro-label block mb-1">Application ID</span>
                  <span className="text-lg font-semibold text-[#111111]">{application.id}</span>
                </div>
                <div className={`px-4 py-2 rounded-full ${getStatusConfig(application.status).bgColor}`}>
                  <span className={`text-sm font-medium ${getStatusConfig(application.status).color} flex items-center gap-2`}>
                    {(() => {
                      const StatusIcon = getStatusConfig(application.status).icon;
                      return <StatusIcon className="w-4 h-4" />;
                    })()}
                    {getStatusConfig(application.status).label}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#6D6D6D]">Progress</span>
                  <span className="text-[#111111] font-medium">{application.progress}%</span>
                </div>
                <div className="h-2 bg-[#F6F7F6] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#D7FF3B] rounded-full transition-all duration-500"
                    style={{ width: `${application.progress}%` }}
                  />
                </div>
              </div>

              {/* Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#F6F7F6] flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-[#111111]" />
                  </div>
                  <div>
                    <span className="text-xs text-[#6D6D6D] block">Submitted</span>
                    <span className="text-sm text-[#111111]">{application.submittedDate}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#F6F7F6] flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#111111]" />
                  </div>
                  <div>
                    <span className="text-xs text-[#6D6D6D] block">Est. Completion</span>
                    <span className="text-sm text-[#111111]">{application.estimatedCompletion}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Updates */}
            <div className="card-premium p-6 lg:p-8">
              <h3 className="text-lg font-semibold text-[#111111] mb-4">Application Updates</h3>
              <div className="space-y-4">
                {application.updates.map((update, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#D7FF3B] mt-2 flex-shrink-0" />
                    <div>
                      <span className="text-xs text-[#6D6D6D] block">{update.date}</span>
                      <span className="text-sm text-[#111111]">{update.message}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Reminder */}
            {application.status !== 'completed' && (
              <div className="card-premium p-6 border-l-4 border-l-[#D7FF3B]">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-[#111111] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[#111111] mb-1">Payment Reminder</h4>
                    <p className="text-sm text-[#6D6D6D]">
                      The remaining 50% balance is due upon completion of your extension.
                      We'll notify you when it's time to pay.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* No Results */}
        {hasSearched && !application && (
          <div className="card-premium p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#F6F7F6] flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#6D6D6D]" />
            </div>
            <h3 className="text-lg font-semibold text-[#111111] mb-2">No Application Found</h3>
            <p className="text-sm text-[#6D6D6D]">
              We couldn't find an application with those details. Please check your email and passport number.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default TrackPage;
