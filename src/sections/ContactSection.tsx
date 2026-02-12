import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, Clock, Send } from 'lucide-react';
import { toast } from 'sonner';

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate left card
            if (leftCardRef.current) {
              leftCardRef.current.style.opacity = '1';
              leftCardRef.current.style.transform = 'translateX(0)';
            }
            
            // Animate right card
            setTimeout(() => {
              if (rightCardRef.current) {
                rightCardRef.current.style.opacity = '1';
                rightCardRef.current.style.transform = 'translateX(0)';
              }
            }, 200);
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll reply within one business day.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="w-full py-16 lg:py-24 bg-[#111111]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Contact Card */}
          <div
            ref={leftCardRef}
            className="card-premium p-8 lg:p-12 opacity-0 -translate-x-12 transition-all duration-1000"
          >
            <h2
              className="text-3xl lg:text-4xl font-bold text-[#111111] mb-4"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              We're here to help.
            </h2>
            
            <p className="text-base text-[#6D6D6D] mb-8">
              Send a message and we'll reply within one business day.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F6F7F6] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#111111]" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="micro-label block mb-1">Email</span>
                  <a
                    href="mailto:hello@staysure.co"
                    className="text-base text-[#111111] hover:text-[#6D6D6D] transition-colors"
                  >
                    hello@staysure.co
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F6F7F6] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#111111]" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="micro-label block mb-1">WhatsApp</span>
                  <a
                    href="https://wa.me/66123456789"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-[#111111] hover:text-[#6D6D6D] transition-colors"
                  >
                    +66 xxx xxx xxx
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F6F7F6] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#111111]" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="micro-label block mb-1">Business Hours</span>
                  <p className="text-base text-[#111111]">
                    Mon–Fri 09:00–18:00 (ICT)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div
            ref={rightCardRef}
            className="card-premium p-8 lg:p-12 opacity-0 translate-x-12 transition-all duration-1000"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="micro-label block mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-[#F6F7F6] rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="micro-label block mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-[#F6F7F6] rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="micro-label block mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-[#F6F7F6] rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all resize-none"
                  placeholder="How can we help?"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full inline-flex items-center justify-center gap-2"
              >
                Send message
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
