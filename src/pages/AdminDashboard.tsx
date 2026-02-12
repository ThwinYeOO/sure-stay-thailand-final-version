import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  Search,
  Filter,
  CheckCircle,
  Clock,
  DollarSign,
  ChevronDown,
  Download,
  Edit,
  Eye,
  X
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth, type VisaApplication } from '../contexts/AuthContext';

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

interface AdminDashboardProps {
  navigate: (page: Page) => void;
}

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: 'bg-amber-50', text: 'text-amber-600', label: 'Pending' },
  reviewing: { bg: 'bg-blue-50', text: 'text-blue-600', label: 'Reviewing' },
  submitted: { bg: 'bg-purple-50', text: 'text-purple-600', label: 'Submitted' },
  approved: { bg: 'bg-green-50', text: 'text-green-600', label: 'Approved' },
  completed: { bg: 'bg-[#D7FF3B]', text: 'text-[#111111]', label: 'Completed' },
  rejected: { bg: 'bg-red-50', text: 'text-red-600', label: 'Rejected' },
};

const AdminDashboard = ({ navigate }: AdminDashboardProps) => {
  const { 
    user, 
    logout, 
    applications, 
    updateApplicationStatus
  } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApp, setSelectedApp] = useState<VisaApplication | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState<VisaApplication['status']>('pending');
  const [adminNote, setAdminNote] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!user || user.role !== 'admin') {
      navigate('login');
    }
  }, [user, navigate]);

  const filteredApplications = applications.filter((app) => {
    const matchesSearch = app.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.userEmail?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stats calculations
  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    reviewing: applications.filter(a => a.status === 'reviewing').length,
    submitted: applications.filter(a => a.status === 'submitted').length,
    completed: applications.filter(a => a.status === 'completed').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
    revenue: applications.reduce((sum, a) => sum + (a.paymentStatus === 'fully_paid' ? a.amount : a.depositAmount), 0),
    pendingPayment: applications.filter(a => a.paymentStatus === 'deposit_paid' && a.status === 'completed').length,
  };

  const handleStatusUpdate = async () => {
    if (!selectedApp) return;
    
    const success = await updateApplicationStatus(selectedApp.id, newStatus, adminNote);
    if (success) {
      setShowStatusModal(false);
      setAdminNote('');
      setSelectedApp(null);
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'User', 'Email', 'Visa Type', 'Status', 'Payment', 'Amount', 'Created'];
    const rows = filteredApplications.map(app => [
      app.id,
      app.userName,
      app.userEmail,
      app.visaType,
      app.status,
      app.paymentStatus,
      app.amount,
      new Date(app.createdAt).toLocaleDateString(),
    ]);
    
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `applications-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    toast.success('CSV exported successfully');
  };

  const SidebarItem = ({ id, label, icon: Icon }: { id: string; label: string; icon: React.ElementType }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
        activeTab === id
          ? 'bg-[#D7FF3B] text-[#111111]'
          : 'text-[#6D6D6D] hover:bg-[#F6F7F6]'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );

  if (!user || user.role !== 'admin') return null;

  return (
    <main className="w-full min-h-screen pt-20 pb-16 bg-[#F6F7F6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="card-premium p-4 sticky top-24">
              <div className="mb-6 px-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#D7FF3B] flex items-center justify-center">
                    <span className="font-bold text-[#111111]">{user.fullName.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#111111]">{user.fullName}</p>
                    <p className="text-xs text-[#6D6D6D]">Administrator</p>
                  </div>
                </div>
              </div>

              <nav className="space-y-1">
                <SidebarItem id="dashboard" label="Dashboard" icon={LayoutDashboard} />
                <SidebarItem id="applications" label="Applications" icon={FileText} />
                <SidebarItem id="customers" label="Customers" icon={Users} />
                <SidebarItem id="settings" label="Settings" icon={Settings} />
              </nav>

              <div className="mt-6 pt-6 border-t border-[rgba(17,17,17,0.08)]">
                <button
                  onClick={() => { logout(); navigate('home'); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-[#6D6D6D] hover:bg-[#F6F7F6] transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-[#111111]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    Dashboard
                  </h1>
                  <span className="text-sm text-[#6D6D6D]">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div className="card-premium p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-[#111111]">{stats.total}</p>
                    <p className="text-sm text-[#6D6D6D]">Total Applications</p>
                  </div>
                  
                  <div className="card-premium p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-amber-600" />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-[#111111]">{stats.pending + stats.reviewing}</p>
                    <p className="text-sm text-[#6D6D6D]">Pending Review</p>
                  </div>
                  
                  <div className="card-premium p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-[#111111]">{stats.completed}</p>
                    <p className="text-sm text-[#6D6D6D]">Completed</p>
                  </div>
                  
                  <div className="card-premium p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-purple-600" />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-[#111111]">{(stats.revenue / 1000000).toFixed(1)}M</p>
                    <p className="text-sm text-[#6D6D6D]">Revenue (THB)</p>
                  </div>
                </div>

                {/* Status Breakdown */}
                <div className="card-premium p-6">
                  <h2 className="text-lg font-semibold text-[#111111] mb-4">Status Breakdown</h2>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                    {Object.entries(statusColors).map(([status, config]) => (
                      <div key={status} className="text-center p-3 rounded-xl bg-[#F6F7F6]">
                        <p className="text-2xl font-bold text-[#111111]">
                          {applications.filter(a => a.status === status).length}
                        </p>
                        <p className={`text-xs ${config.text}`}>{config.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Applications */}
                <div className="card-premium p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-[#111111]">Recent Applications</h2>
                    <button
                      onClick={() => setActiveTab('applications')}
                      className="text-sm text-[#6D6D6D] hover:text-[#111111] transition-colors"
                    >
                      View all
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-xs text-[#6D6D6D] border-b border-[rgba(17,17,17,0.08)]">
                          <th className="pb-3 font-medium">ID</th>
                          <th className="pb-3 font-medium">Customer</th>
                          <th className="pb-3 font-medium">Status</th>
                          <th className="pb-3 font-medium">Date</th>
                          <th className="pb-3 font-medium text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {applications.slice(0, 5).map((app) => (
                          <tr key={app.id} className="border-b border-[rgba(17,17,17,0.04)] last:border-0">
                            <td className="py-3 text-sm text-[#111111]">{app.id}</td>
                            <td className="py-3 text-sm text-[#111111]">{app.userName}</td>
                            <td className="py-3">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[app.status].bg} ${statusColors[app.status].text}`}>
                                {statusColors[app.status].label}
                              </span>
                            </td>
                            <td className="py-3 text-sm text-[#6D6D6D]">{new Date(app.createdAt).toLocaleDateString()}</td>
                            <td className="py-3 text-sm text-[#111111] text-right">
                              THB {app.amount.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-[#111111]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    Applications
                  </h1>
                  <button
                    onClick={handleExportCSV}
                    className="btn-secondary inline-flex items-center gap-2 text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </button>
                </div>

                {/* Filters */}
                <div className="card-premium p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6D6D6D]" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name, ID, or email..."
                        className="w-full pl-10 pr-4 py-2 bg-[#F6F7F6] rounded-lg text-sm text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6D6D6D]" />
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="pl-10 pr-8 py-2 bg-[#F6F7F6] rounded-lg text-sm text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all appearance-none"
                      >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="reviewing">Reviewing</option>
                        <option value="submitted">Submitted</option>
                        <option value="approved">Approved</option>
                        <option value="completed">Completed</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6D6D6D] pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Applications Table */}
                <div className="card-premium overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#F6F7F6]">
                        <tr className="text-left text-xs text-[#6D6D6D]">
                          <th className="p-4 font-medium">ID</th>
                          <th className="p-4 font-medium">Customer</th>
                          <th className="p-4 font-medium">Service</th>
                          <th className="p-4 font-medium">Status</th>
                          <th className="p-4 font-medium">Payment</th>
                          <th className="p-4 font-medium">Date</th>
                          <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredApplications.map((app) => (
                          <tr key={app.id} className="border-b border-[rgba(17,17,17,0.04)] last:border-0 hover:bg-[#F6F7F6] transition-colors">
                            <td className="p-4 text-sm text-[#111111] font-medium">{app.id}</td>
                            <td className="p-4">
                              <p className="text-sm text-[#111111]">{app.userName}</p>
                              <p className="text-xs text-[#6D6D6D]">{app.userEmail}</p>
                            </td>
                            <td className="p-4 text-sm text-[#111111]">{app.serviceType}</td>
                            <td className="p-4">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[app.status].bg} ${statusColors[app.status].text}`}>
                                {statusColors[app.status].label}
                              </span>
                            </td>
                            <td className="p-4">
                              <span className={`text-xs ${app.paymentStatus === 'fully_paid' ? 'text-green-600' : 'text-amber-600'}`}>
                                {app.paymentStatus === 'fully_paid' ? 'Paid' : 'Deposit'}
                              </span>
                            </td>
                            <td className="p-4 text-sm text-[#6D6D6D]">{new Date(app.createdAt).toLocaleDateString()}</td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => { setSelectedApp(app); setShowDetailModal(true); }}
                                  className="p-2 rounded-lg hover:bg-[#F6F7F6] text-[#6D6D6D] hover:text-[#111111] transition-colors"
                                  title="View Details"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => { setSelectedApp(app); setNewStatus(app.status); setShowStatusModal(true); }}
                                  className="p-2 rounded-lg hover:bg-[#F6F7F6] text-[#6D6D6D] hover:text-[#111111] transition-colors"
                                  title="Update Status"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {filteredApplications.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-[#6D6D6D]">No applications found</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Other tabs placeholder */}
            {(activeTab === 'customers' || activeTab === 'settings') && (
              <div className="card-premium p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#F6F7F6] flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-[#6D6D6D]" />
                </div>
                <h2 className="text-xl font-semibold text-[#111111] mb-2">Coming Soon</h2>
                <p className="text-[#6D6D6D]">This feature is under development.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="card-premium w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-[rgba(17,17,17,0.08)] flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#111111]">Application Details</h2>
              <button onClick={() => setShowDetailModal(false)} className="p-2 hover:bg-[#F6F7F6] rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[#6D6D6D] mb-1">Application ID</p>
                  <p className="font-medium text-[#111111]">{selectedApp.id}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6D6D6D] mb-1">Status</p>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[selectedApp.status].bg} ${statusColors[selectedApp.status].text}`}>
                    {statusColors[selectedApp.status].label}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-[#6D6D6D] mb-1">Customer</p>
                  <p className="font-medium text-[#111111]">{selectedApp.userName}</p>
                  <p className="text-sm text-[#6D6D6D]">{selectedApp.userEmail}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6D6D6D] mb-1">Visa Type</p>
                  <p className="font-medium text-[#111111]">{selectedApp.visaType}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6D6D6D] mb-1">Service</p>
                  <p className="font-medium text-[#111111]">{selectedApp.serviceType === 'express' ? 'Express' : 'Standard'}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6D6D6D] mb-1">Amount</p>
                  <p className="font-medium text-[#111111]">THB {selectedApp.amount.toLocaleString()}</p>
                </div>
              </div>

              {/* Audit Log */}
              <div>
                <p className="text-sm font-semibold text-[#111111] mb-3">Activity Log</p>
                <div className="space-y-2 max-h-48 overflow-auto">
                  {selectedApp.auditLog.map((log, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm p-2 bg-[#F6F7F6] rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-[#D7FF3B] mt-1.5 flex-shrink-0" />
                      <div>
                        <p className="text-[#111111]">{log.action}</p>
                        <p className="text-xs text-[#6D6D6D]">{new Date(log.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Admin Notes */}
              {selectedApp.adminNotes && (
                <div className="p-4 bg-amber-50 rounded-xl">
                  <p className="text-sm font-semibold text-amber-800 mb-1">Admin Notes</p>
                  <p className="text-sm text-amber-700">{selectedApp.adminNotes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Status Update Modal */}
      {showStatusModal && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="card-premium w-full max-w-md">
            <div className="p-6 border-b border-[rgba(17,17,17,0.08)] flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#111111]">Update Status</h2>
              <button onClick={() => setShowStatusModal(false)} className="p-2 hover:bg-[#F6F7F6] rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="micro-label block mb-2">New Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as VisaApplication['status'])}
                  className="w-full px-4 py-3 bg-[#F6F7F6] rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all"
                >
                  <option value="pending">Pending</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="submitted">Submitted to Immigration</option>
                  <option value="approved">Approved</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div>
                <label className="micro-label block mb-2">Admin Notes (optional)</label>
                <textarea
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-[#F6F7F6] rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all resize-none"
                  placeholder="Add notes about this status change..."
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="flex-1 py-3 px-4 rounded-full border border-[rgba(17,17,17,0.15)] text-[#111111] font-medium hover:bg-[#F6F7F6] transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStatusUpdate}
                  className="flex-1 btn-primary"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default AdminDashboard;
