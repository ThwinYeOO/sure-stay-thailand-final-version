import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Shield } from 'lucide-react';
import { useAuth, type User } from '../contexts/AuthContext';

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

interface ChatbotProps {
  currentPage: Page;
  user?: User | null;
  isAdmin?: boolean;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = ({ currentPage, user, isAdmin }: ChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [hasGreeted, setHasGreeted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { userApplications, applications } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Context-aware greeting
  useEffect(() => {
    if (isOpen && !hasGreeted) {
      let greeting = '';
      
      if (isAdmin) {
        // Admin greeting with operational insights
        const pendingCount = applications.filter(a => a.status === 'pending').length;
        const reviewingCount = applications.filter(a => a.status === 'reviewing').length;
        const todayRevenue = applications
          .filter(a => new Date(a.createdAt).toDateString() === new Date().toDateString())
          .reduce((sum, a) => sum + a.depositAmount, 0);
        
        greeting = `Hello Admin! 📊\n\nToday's Summary:\n• ${pendingCount} pending applications\n• ${reviewingCount} under review\n• THB ${todayRevenue.toLocaleString()} revenue today\n\nHow can I assist you?`;
      } else if (user) {
        // Logged-in user greeting with application context
        const activeApps = userApplications.filter(a => a.status !== 'completed' && a.status !== 'rejected');
        
        if (activeApps.length > 0) {
          const latestApp = activeApps[0];
          greeting = `Hi ${user.fullName.split(' ')[0]}! 👋\n\nYour application ${latestApp.id} is currently **${latestApp.status}**.\n\nHow can I help you today?`;
        } else {
          greeting = `Welcome back, ${user.fullName.split(' ')[0]}! 👋\n\nReady to extend your stay in Thailand? I can help you start a new application or answer any questions.`;
        }
      } else {
        // Guest greeting
        if (currentPage === 'home') {
          greeting = "Hi there! When does your visa expire? I can help you check eligibility and guide you through the extension process.";
        } else if (currentPage === 'services/tourist-visa-extension') {
          greeting = "Want to check if you're eligible for a visa extension? I can help assess your situation.";
        } else if (currentPage === 'knowledge') {
          greeting = "Have questions about visa extensions? I'm here to help. Or would you like us to handle your application?";
        } else {
          greeting = "Hello! I'm your AI Visa Assistant. How can I help you today?";
        }
      }
      
      setTimeout(() => {
        addMessage(greeting, 'bot');
        setHasGreeted(true);
      }, 500);
    }
  }, [isOpen, hasGreeted, currentPage, user, isAdmin, userApplications, applications]);

  const addMessage = (text: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const generateResponse = (userMessage: string): string => {
    const lowerMsg = userMessage.toLowerCase();
    
    // Admin-specific responses
    if (isAdmin) {
      if (lowerMsg.includes('pending') || lowerMsg.includes('review')) {
        const pendingCount = applications.filter(a => a.status === 'pending').length;
        const reviewingCount = applications.filter(a => a.status === 'reviewing').length;
        return `📋 Application Status:\n• ${pendingCount} pending review\n• ${reviewingCount} under review\n\nGo to Admin Dashboard to process them.`;
      }
      
      if (lowerMsg.includes('revenue') || lowerMsg.includes('money') || lowerMsg.includes('payment')) {
        const totalRevenue = applications.reduce((sum, a) => sum + (a.paymentStatus === 'fully_paid' ? a.amount : a.depositAmount), 0);
        const pendingPayments = applications.filter(a => a.paymentStatus === 'deposit_paid').length;
        return `💰 Revenue Overview:\n• Total collected: THB ${totalRevenue.toLocaleString()}\n• ${pendingPayments} applications awaiting final payment`;
      }
      
      if (lowerMsg.includes('today') || lowerMsg.includes('summary')) {
        const todayApps = applications.filter(a => new Date(a.createdAt).toDateString() === new Date().toDateString());
        const todayRevenue = todayApps.reduce((sum, a) => sum + a.depositAmount, 0);
        return `📊 Today's Summary:\n• ${todayApps.length} new applications\n• THB ${todayRevenue.toLocaleString()} revenue\n• Check dashboard for details`;
      }
      
      return "I'm here to help with admin tasks. You can ask about:\n• Pending applications\n• Revenue overview\n• Today's summary\n• Or go to the Admin Dashboard for full control.";
    }
    
    // User-specific responses (logged in)
    if (user) {
      if (lowerMsg.includes('status') || lowerMsg.includes('application')) {
        if (userApplications.length > 0) {
          const latest = userApplications[0];
          return `Your latest application **${latest.id}** is currently **${latest.status}**.\n\nYou can view full details in your dashboard.`;
        }
        return "You don't have any active applications. Would you like to start one?";
      }
      
      if (lowerMsg.includes('document') || lowerMsg.includes('upload')) {
        return "You can upload missing documents from your dashboard. Go to 'My Applications' and click on your application to upload files.";
      }
      
      if (lowerMsg.includes('payment') || lowerMsg.includes('pay')) {
        const unpaidApps = userApplications.filter(a => a.paymentStatus !== 'fully_paid' && a.status === 'completed');
        if (unpaidApps.length > 0) {
          const balance = unpaidApps.reduce((sum, a) => sum + (a.amount - a.depositAmount), 0);
          return `You have THB ${balance.toLocaleString()} outstanding balance. Go to your dashboard to complete payment.`;
        }
        return "All your payments are up to date!";
      }
    }
    
    // General responses (guest or user)
    if (lowerMsg.includes('expire') || lowerMsg.includes('expiry') || lowerMsg.includes('date')) {
      return "It's important to apply before your visa expires to avoid overstay penalties. The fine is 500 THB per day for overstaying. Would you like to start your application now?";
    }
    
    if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('fee')) {
      return "Our Standard service is THB 4,500 (7–10 business days) and Express is THB 6,900 (3–5 business days). Both include document check, appointment booking, and full support.";
    }
    
    if (lowerMsg.includes('document') || lowerMsg.includes('need') || lowerMsg.includes('require')) {
      return "You'll need: 1) Passport with valid visa, 2) TM.7 form, 3) Passport photo, 4) Proof of address. We guide you through each step when you apply.";
    }
    
    if (lowerMsg.includes('overstay') || lowerMsg.includes('fine') || lowerMsg.includes('penalty')) {
      return "Overstay fines are 500 THB per day. It's best to apply for an extension before your visa expires. We can help you avoid this—would you like to check your eligibility?";
    }
    
    if (lowerMsg.includes('time') || lowerMsg.includes('long') || lowerMsg.includes('duration')) {
      return "Standard processing takes 7–10 business days. Express service is 3–5 business days. We recommend starting early to avoid any last-minute issues.";
    }
    
    if (lowerMsg.includes('apply') || lowerMsg.includes('start') || lowerMsg.includes('begin')) {
      return user 
        ? "Great! You can apply through your dashboard. Click 'New Application' to get started with a 50% deposit."
        : "Great! You can apply through our secure online form. It takes just a few minutes. Click 'Apply Now' to get started with a 50% deposit.";
    }
    
    if (lowerMsg.includes('contact') || lowerMsg.includes('support') || lowerMsg.includes('help')) {
      return "You can reach us via WhatsApp, LINE, or email at hello@staysure.co. Our team is available Mon–Fri, 9AM–6PM ICT.";
    }
    
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
      return user 
        ? `Hello ${user.fullName.split(' ')[0]}! How can I assist you with your visa extension today?`
        : "Hello! I'm here to help with your Thailand visa extension questions. When does your current visa expire?";
    }
    
    return "For accurate assistance with your specific situation, please contact our support team directly via WhatsApp or email at hello@staysure.co. We're here to help!";
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    addMessage(inputValue, 'user');
    const response = generateResponse(inputValue);
    
    setTimeout(() => {
      addMessage(response, 'bot');
    }, 800);
    
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getAvatar = () => {
    if (isAdmin) return <Shield className="w-5 h-5 text-[#111111]" />;
    return <Bot className="w-5 h-5 text-[#111111]" />;
  };

  const getTitle = () => {
    if (isAdmin) return 'AI Admin Assistant';
    if (user) return 'AI Visa Assistant';
    return 'AI Visa Assistant';
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
          isOpen
            ? 'bg-[#111111] text-white rotate-90'
            : 'bg-[#D7FF3B] text-[#111111] hover:scale-110'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] card-premium overflow-hidden transition-all duration-300 ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-[#111111] text-white p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#D7FF3B] flex items-center justify-center">
            {getAvatar()}
          </div>
          <div>
            <h3 className="font-semibold text-sm">{getTitle()}</h3>
            <p className="text-xs text-[#6D6D6D]">
              {isAdmin ? 'Admin Mode' : user ? `Hello, ${user.fullName.split(' ')[0]}` : 'StaySure Thailand'}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="h-[320px] overflow-y-auto p-4 bg-[#F6F7F6]">
          {messages.length === 0 && (
            <div className="text-center text-[#6D6D6D] text-sm py-8">
              <Bot className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>How can I help you today?</p>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-line ${
                  message.sender === 'user'
                    ? 'bg-[#D7FF3B] text-[#111111] rounded-br-md'
                    : 'bg-white text-[#111111] rounded-bl-md shadow-sm'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-[rgba(17,17,17,0.06)]">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2.5 bg-[#F6F7F6] rounded-full text-sm outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="w-10 h-10 rounded-full bg-[#D7FF3B] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 text-[#111111]" />
            </button>
          </div>
          <p className="text-[10px] text-[#6D6D6D] text-center mt-2">
            AI Assistant • For accurate info, contact support
          </p>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
