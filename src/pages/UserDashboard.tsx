import { useEffect, useState } from 'react';
import { 
  User, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  MessageCircle,
  ArrowRight,
  Calendar,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Download
} from 'lucide-react';
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

interface UserDashboardProps {
  navigate: (page: Page) => void;
}

const statusConfig: Record<string, { label: string; color: string; bgColor: string; icon: React.ElementType }> = {
  pending: { label: 'Pending Review', color: 'text-amber-600', bgColor: 'bg-amber-50', icon: Clock },
  reviewing: { label: 'Under Review', color: 'text-blue-600', bgColor: 'bg-blue-50', icon: FileText },
  submitted: { label: 'Submitted to Immigration', color: 'text-purple-600', bgColor: 'bg-purple-50', icon: CheckCircle },
  approved: { label: 'Approved', color: 'text-green-600', bgColor: 'bg-green-50', icon: CheckCircle },
  completed: { label: 'Completed', color: 'text-[#111111]', bgColor: 'bg-[#D7FF3B]', icon: CheckCircle },
  rejected: { label: 'Rejected', color: 'text-red-600', bgColor: 'bg-red-50', icon: AlertCircle },
};

const paymentStatusConfig: Record<string, { label: string; color: string }> = {
  unpaid: { label: 'Unpaid', color: 'text-red-600' },
  deposit_paid: { label: '50% Deposit Paid', color: 'text-amber-600' },
  fully_paid: { label: 'Fully Paid', color: 'text-green-600' },
};

const UserDashboard = ({ navigate }: UserDashboardProps) => {
  const { user, userApplications, uploadDocument } = useAuth();
  const [expandedApp, setExpandedApp] = useState<string | null>(null);
  const [, setUploadingFor] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!user) {
      navigate('login');
    }
  }, [user, navigate]);

  const handleFileUpload = async (appId: string, docType: string, file: File) => {
    setUploadingFor(appId);
    await uploadDocument(appId, docType, file);
    setUploadingFor(null);
  };

  const getStatusProgress = (status: string) => {
    const statuses = ['pending', 'reviewing', 'submitted', 'approved', 'completed'];
    const index = statuses.indexOf(status);
    return ((index + 1) / statuses.length) * 100;
  };

  if (!user) return null;

  return (
    <main className="w-full min-h-screen pt-20 pb-16 bg-[#F6F7F6]">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Welcome Section */}
        <div className="card-premium p-6 lg:p-8 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#D7FF3B] flex items-center justify-center">
                <User className="w-7 h-7 text-[#111111]" />
              </div>
              <div>
                <h1
                  className="text-2xl lg:text-3xl font-bold text-[#111111]"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Welcome, {user.fullName}
                </h1>
                <p className="text-[#6D6D6D]">
                  {user.email} • {user.nationality}
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('apply')}
              className="btn-primary inline-flex items-center gap-2"
            >
              New Application
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="card-premium p-5">
            <p className="text-3xl font-bold text-[#111111]">{userApplications.length}</p>
            <p className="text-sm text-[#6D6D6D]">Total Applications</p>
          </div>
          <div className="card-premium p-5">
            <p className="text-3xl font-bold text-[#111111]">
              {userApplications.filter(a => a.status === 'pending' || a.status === 'reviewing').length}
            </p>
            <p className="text-sm text-[#6D6D6D]">In Progress</p>
          </div>
          <div className="card-premium p-5">
            <p className="text-3xl font-bold text-[#111111]">
              {userApplications.filter(a => a.status === 'completed').length}
            </p>
            <p className="text-sm text-[#6D6D6D]">Completed</p>
          </div>
          <div className="card-premium p-5">
            <p className="text-3xl font-bold text-[#111111]">
              THB {userApplications.reduce((sum, a) => sum + (a.paymentStatus === 'fully_paid' ? 0 : a.depositAmount), 0).toLocaleString()}
            </p>
            <p className="text-sm text-[#6D6D6D]">Balance Due</p>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[#111111]">Your Applications</h2>
          
          {userApplications.length === 0 ? (
            <div className="card-premium p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-[#F6F7F6] flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-[#6D6D6D]" />
              </div>
              <h3 className="text-lg font-semibold text-[#111111] mb-2">No applications yet</h3>
              <p className="text-[#6D6D6D] mb-4">Start your visa extension journey today</p>
              <button
                onClick={() => navigate('apply')}
                className="btn-primary inline-flex items-center gap-2"
              >
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            userApplications.map((app) => {
              const status = statusConfig[app.status];
              const StatusIcon = status.icon;
              const isExpanded = expandedApp === app.id;
              
              return (
                <div key={app.id} className="card-premium overflow-hidden">
                  {/* Header */}
                  <button
                    onClick={() => setExpandedApp(isExpanded ? null : app.id)}
                    className="w-full p-5 lg:p-6 flex items-center justify-between hover:bg-[rgba(17,17,17,0.01)] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg ${status.bgColor} flex items-center justify-center`}>
                        <StatusIcon className={`w-5 h-5 ${status.color}`} />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-[#111111]">{app.id}</p>
                        <p className="text-sm text-[#6D6D6D]">{app.visaType}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.color}`}>
                        {status.label}
                      </span>
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-[#6D6D6D]" /> : <ChevronDown className="w-5 h-5 text-[#6D6D6D]" />}
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="px-5 lg:px-6 pb-6 border-t border-[rgba(17,17,17,0.06)]">
                      {/* Progress Bar */}
                      <div className="py-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-[#6D6D6D]">Application Progress</span>
                          <span className="text-[#111111] font-medium">{Math.round(getStatusProgress(app.status))}%</span>
                        </div>
                        <div className="h-2 bg-[#F6F7F6] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#D7FF3B] rounded-full transition-all"
                            style={{ width: `${getStatusProgress(app.status)}%` }}
                          />
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-[#6D6D6D]" />
                          <div>
                            <p className="text-xs text-[#6D6D6D]">Submitted</p>
                            <p className="text-sm text-[#111111]">{new Date(app.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-[#6D6D6D]" />
                          <div>
                            <p className="text-xs text-[#6D6D6D]">Payment</p>
                            <p className={`text-sm font-medium ${paymentStatusConfig[app.paymentStatus].color}`}>
                              {paymentStatusConfig[app.paymentStatus].label}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-[#6D6D6D]" />
                          <div>
                            <p className="text-xs text-[#6D6D6D]">Service</p>
                            <p className="text-sm text-[#111111]">{app.serviceType === 'express' ? 'Express (3-5 days)' : 'Standard (7-10 days)'}</p>
                          </div>
                        </div>
                      </div>

                      {/* Documents */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-[#111111] mb-3">Documents</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 bg-[#F6F7F6] rounded-lg">
                            <div className="flex items-center gap-3">
                              <FileText className="w-4 h-4 text-[#6D6D6D]" />
                              <span className="text-sm text-[#111111]">Passport</span>
                            </div>
                            {app.documents.passportFile ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <label className="text-sm text-[#111111] hover:underline cursor-pointer">
                                Upload
                                <input
                                  type="file"
                                  className="hidden"
                                  onChange={(e) => e.target.files?.[0] && handleFileUpload(app.id, 'passportFile', e.target.files[0])}
                                />
                              </label>
                            )}
                          </div>
                          <div className="flex items-center justify-between p-3 bg-[#F6F7F6] rounded-lg">
                            <div className="flex items-center gap-3">
                              <FileText className="w-4 h-4 text-[#6D6D6D]" />
                              <span className="text-sm text-[#111111]">Photo</span>
                            </div>
                            {app.documents.photoFile ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <label className="text-sm text-[#111111] hover:underline cursor-pointer">
                                Upload
                                <input
                                  type="file"
                                  className="hidden"
                                  onChange={(e) => e.target.files?.[0] && handleFileUpload(app.id, 'photoFile', e.target.files[0])}
                                />
                              </label>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Audit Log */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-[#111111] mb-3">Recent Activity</h4>
                        <div className="space-y-2">
                          {app.auditLog.slice(-3).map((log, idx) => (
                            <div key={idx} className="flex items-start gap-3 text-sm">
                              <div className="w-2 h-2 rounded-full bg-[#D7FF3B] mt-1.5 flex-shrink-0" />
                              <div>
                                <p className="text-[#111111]">{log.action}</p>
                                <p className="text-xs text-[#6D6D6D]">{new Date(log.timestamp).toLocaleString()}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3">
                        {app.paymentStatus !== 'fully_paid' && app.status === 'completed' && (
                          <button
                            onClick={() => toast.info('Payment processing...')}
                            className="btn-primary inline-flex items-center gap-2"
                          >
                            <CreditCard className="w-4 h-4" />
                            Pay Balance (THB {(app.amount - app.depositAmount).toLocaleString()})
                          </button>
                        )}
                        {app.completionProof && (
                          <button
                            onClick={() => toast.info('Downloading...')}
                            className="btn-secondary inline-flex items-center gap-2"
                          >
                            <Download className="w-4 h-4" />
                            Download Stamp
                          </button>
                        )}
                        <button
                          onClick={() => navigate('contact')}
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#6D6D6D] hover:text-[#111111] transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Contact Support
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
};

export default UserDashboard;
