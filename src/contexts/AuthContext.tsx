import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { toast } from 'sonner';

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  createdAt: string;
  role: UserRole;
  isVerified: boolean;
}

export interface VisaApplication {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  visaType: string;
  passportNumber: string;
  expiryDate: string;
  documents: {
    passportFile?: string;
    photoFile?: string;
    additionalDocs?: string[];
  };
  status: 'pending' | 'reviewing' | 'submitted' | 'approved' | 'completed' | 'rejected';
  paymentStatus: 'unpaid' | 'deposit_paid' | 'fully_paid';
  serviceType: 'standard' | 'express';
  amount: number;
  depositAmount: number;
  createdAt: string;
  updatedAt: string;
  adminNotes?: string;
  completionProof?: string;
  auditLog: {
    action: string;
    timestamp: string;
    performedBy: string;
  }[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  verifyEmail: (token: string) => Promise<boolean>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  applications: VisaApplication[];
  userApplications: VisaApplication[];
  submitApplication: (data: ApplicationSubmitData) => Promise<boolean>;
  updateApplicationStatus: (appId: string, status: VisaApplication['status'], notes?: string) => Promise<boolean>;
  uploadDocument: (appId: string, docType: string, file: File) => Promise<boolean>;
  getApplicationById: (appId: string) => VisaApplication | undefined;
}

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  nationality: string;
}

interface ApplicationSubmitData {
  visaType: string;
  passportNumber: string;
  expiryDate: string;
  serviceType: 'standard' | 'express';
  documents: {
    passportFile?: File;
    photoFile?: File;
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const MOCK_USERS: User[] = [
  {
    id: 'admin-001',
    fullName: 'Admin User',
    email: 'admin@staysure.co',
    phone: '+66 123 456 789',
    nationality: 'Thailand',
    createdAt: '2025-01-01',
    role: 'admin',
    isVerified: true,
  },
  {
    id: 'user-001',
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1 555 123 4567',
    nationality: 'United States',
    createdAt: '2026-02-01',
    role: 'user',
    isVerified: true,
  },
];

// Mock applications database
const MOCK_APPLICATIONS: VisaApplication[] = [
  {
    id: 'ST-2026-001234',
    userId: 'user-001',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    visaType: 'Tourist Visa (TR)',
    passportNumber: 'encrypted-passport-001',
    expiryDate: '2026-03-15',
    documents: {
      passportFile: 'passport-john.jpg',
      photoFile: 'photo-john.jpg',
    },
    status: 'reviewing',
    paymentStatus: 'deposit_paid',
    serviceType: 'standard',
    amount: 6400,
    depositAmount: 3200,
    createdAt: '2026-02-10',
    updatedAt: '2026-02-11',
    adminNotes: 'Documents under review',
    auditLog: [
      { action: 'Application submitted', timestamp: '2026-02-10T10:00:00Z', performedBy: 'user-001' },
      { action: 'Deposit payment received', timestamp: '2026-02-10T10:05:00Z', performedBy: 'system' },
      { action: 'Status changed to reviewing', timestamp: '2026-02-11T09:00:00Z', performedBy: 'admin-001' },
    ],
  },
  {
    id: 'ST-2026-001235',
    userId: 'user-002',
    userName: 'Sarah Smith',
    userEmail: 'sarah@example.com',
    visaType: 'Visa Exemption (30 days)',
    passportNumber: 'encrypted-passport-002',
    expiryDate: '2026-02-28',
    documents: {
      passportFile: 'passport-sarah.jpg',
      photoFile: 'photo-sarah.jpg',
    },
    status: 'completed',
    paymentStatus: 'fully_paid',
    serviceType: 'express',
    amount: 8800,
    depositAmount: 4400,
    createdAt: '2026-02-08',
    updatedAt: '2026-02-12',
    completionProof: 'stamp-sarah.jpg',
    auditLog: [
      { action: 'Application submitted', timestamp: '2026-02-08T14:00:00Z', performedBy: 'user-002' },
      { action: 'Deposit payment received', timestamp: '2026-02-08T14:05:00Z', performedBy: 'system' },
      { action: 'Status changed to reviewing', timestamp: '2026-02-09T10:00:00Z', performedBy: 'admin-001' },
      { action: 'Status changed to submitted', timestamp: '2026-02-10T09:00:00Z', performedBy: 'admin-001' },
      { action: 'Status changed to completed', timestamp: '2026-02-12T16:00:00Z', performedBy: 'admin-001' },
      { action: 'Final payment received', timestamp: '2026-02-12T16:30:00Z', performedBy: 'system' },
    ],
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [applications, setApplications] = useState<VisaApplication[]>(MOCK_APPLICATIONS);

  // Check for saved session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('staysure_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(u => u.email === email);
    
    if (foundUser && password === 'password') {
      setUser(foundUser);
      localStorage.setItem('staysure_user', JSON.stringify(foundUser));
      toast.success(`Welcome back, ${foundUser.fullName}!`);
      return true;
    }
    
    toast.error('Invalid email or password');
    return false;
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if email exists
    if (MOCK_USERS.some(u => u.email === userData.email)) {
      toast.error('Email already registered');
      return false;
    }
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      nationality: userData.nationality,
      createdAt: new Date().toISOString(),
      role: 'user',
      isVerified: false,
    };
    
    MOCK_USERS.push(newUser);
    setUser(newUser);
    localStorage.setItem('staysure_user', JSON.stringify(newUser));
    toast.success('Account created! Please verify your email.');
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('staysure_user');
    toast.success('Logged out successfully');
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (MOCK_USERS.some(u => u.email === email)) {
      toast.success('Password reset link sent to your email');
      return true;
    }
    
    toast.error('Email not found');
    return false;
  };

  const verifyEmail = async (_token: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (user) {
      const updatedUser = { ...user, isVerified: true };
      setUser(updatedUser);
      localStorage.setItem('staysure_user', JSON.stringify(updatedUser));
      toast.success('Email verified successfully!');
      return true;
    }
    
    return false;
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('staysure_user', JSON.stringify(updatedUser));
      toast.success('Profile updated successfully');
      return true;
    }
    
    return false;
  };

  const submitApplication = async (data: ApplicationSubmitData): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (!user) {
      toast.error('Please login to submit application');
      return false;
    }
    
    const serviceFee = data.serviceType === 'express' ? 6900 : 4500;
    const totalAmount = serviceFee + 1900; // + government fee
    
    const newApplication: VisaApplication = {
      id: `ST-2026-${String(applications.length + 1).padStart(6, '0')}`,
      userId: user.id,
      userName: user.fullName,
      userEmail: user.email,
      visaType: data.visaType,
      passportNumber: `encrypted-${data.passportNumber}`,
      expiryDate: data.expiryDate,
      documents: {
        passportFile: data.documents.passportFile?.name,
        photoFile: data.documents.photoFile?.name,
      },
      status: 'pending',
      paymentStatus: 'deposit_paid',
      serviceType: data.serviceType,
      amount: totalAmount,
      depositAmount: Math.round(totalAmount * 0.5),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      auditLog: [
        {
          action: 'Application submitted',
          timestamp: new Date().toISOString(),
          performedBy: user.id,
        },
        {
          action: 'Deposit payment received',
          timestamp: new Date().toISOString(),
          performedBy: 'system',
        },
      ],
    };
    
    setApplications(prev => [newApplication, ...prev]);
    toast.success('Application submitted successfully!');
    return true;
  };

  const updateApplicationStatus = async (
    appId: string,
    status: VisaApplication['status'],
    notes?: string
  ): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!user || user.role !== 'admin') {
      toast.error('Unauthorized');
      return false;
    }
    
    setApplications(prev =>
      prev.map(app =>
        app.id === appId
          ? {
              ...app,
              status,
              adminNotes: notes || app.adminNotes,
              updatedAt: new Date().toISOString(),
              auditLog: [
                ...app.auditLog,
                {
                  action: `Status changed to ${status}`,
                  timestamp: new Date().toISOString(),
                  performedBy: user.id,
                },
              ],
            }
          : app
      )
    );
    
    toast.success(`Application ${appId} status updated to ${status}`);
    return true;
  };

  const uploadDocument = async (appId: string, docType: string, file: File): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (!user) {
      toast.error('Please login to upload documents');
      return false;
    }
    
    setApplications(prev =>
      prev.map(app =>
        app.id === appId && app.userId === user.id
          ? {
              ...app,
              documents: {
                ...app.documents,
                [docType]: file.name,
              },
              updatedAt: new Date().toISOString(),
              auditLog: [
                ...app.auditLog,
                {
                  action: `Document uploaded: ${docType}`,
                  timestamp: new Date().toISOString(),
                  performedBy: user.id,
                },
              ],
            }
          : app
      )
    );
    
    toast.success('Document uploaded successfully');
    return true;
  };

  const getApplicationById = (appId: string) => {
    return applications.find(app => app.id === appId);
  };

  const userApplications = user
    ? applications.filter(app => app.userId === user.id)
    : [];

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        resetPassword,
        verifyEmail,
        updateProfile,
        applications,
        userApplications,
        submitApplication,
        updateApplicationStatus,
        uploadDocument,
        getApplicationById,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
