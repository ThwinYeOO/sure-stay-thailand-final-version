import { useEffect, useState } from 'react';
import { Mail, Clock, MapPin, Send, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll reply within one business day.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <main className="w-full min-h-screen pt-20 pb-16 bg-[#F6F7F6]">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-3xl lg:text-4xl font-bold text-[#111111] mb-3"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Contact Us
          </h1>
          <p className="text-[#6D6D6D] max-w-xl mx-auto">
            Have questions? We're here to help. Reach out through any of the channels below.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-4">
            <div className="card-premium p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#D7FF3B] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#111111]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#111111] mb-1">Email</h3>
                  <a
                    href="mailto:hello@staysure.co"
                    className="text-sm text-[#6D6D6D] hover:text-[#111111] transition-colors"
                  >
                    hello@staysure.co
                  </a>
                </div>
              </div>
            </div>

            <div className="card-premium p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#D7FF3B] flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-[#111111]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#111111] mb-1">WhatsApp</h3>
                  <a
                    href="https://wa.me/66123456789"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#6D6D6D] hover:text-[#111111] transition-colors"
                  >
                    +66 xxx xxx xxx
                  </a>
                </div>
              </div>
            </div>

            <div className="card-premium p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#D7FF3B] flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-[#111111]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#111111] mb-1">LINE</h3>
                  <span className="text-sm text-[#6D6D6D]">@staysure</span>
                </div>
              </div>
            </div>

            <div className="card-premium p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#D7FF3B] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#111111]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#111111] mb-1">Business Hours</h3>
                  <p className="text-sm text-[#6D6D6D]">
                    Mon–Fri: 09:00–18:00 (ICT)
                  </p>
                  <p className="text-sm text-[#6D6D6D]">
                    Sat–Sun: Closed
                  </p>
                </div>
              </div>
            </div>

            <div className="card-premium p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#D7FF3B] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#111111]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#111111] mb-1">Location</h3>
                  <p className="text-sm text-[#6D6D6D]">
                    Bangkok, Thailand
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="card-premium p-6 lg:p-10">
              <h2 className="text-xl font-semibold text-[#111111] mb-6">
                Send us a message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="micro-label block mb-2">Your Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-[#F6F7F6] rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="micro-label block mb-2">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-[#F6F7F6] rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="micro-label block mb-2">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-[#F6F7F6] rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="micro-label block mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-[#F6F7F6] rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all resize-none"
                    placeholder="Tell us more about your question..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  Send Message
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
