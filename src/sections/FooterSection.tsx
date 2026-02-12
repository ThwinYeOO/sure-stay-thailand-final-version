import { useEffect, useRef } from 'react';

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

interface FooterSectionProps {
  navigate: (page: Page) => void;
}

const FooterSection = ({ navigate }: FooterSectionProps) => {
  const footerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (cardRef.current) {
              cardRef.current.style.opacity = '1';
              cardRef.current.style.transform = 'translateY(0)';
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const mainLinks: { label: string; page: Page }[] = [
    { label: 'Services', page: 'services/tourist-visa-extension' },
    { label: 'Pricing', page: 'home' },
    { label: 'FAQ', page: 'home' },
  ];

  const legalLinks: { label: string; page: Page }[] = [
    { label: 'Privacy', page: 'privacy' },
    { label: 'Terms', page: 'terms' },
    { label: 'Refund Policy', page: 'refund' },
    { label: 'Disclaimer', page: 'disclaimer' },
  ];

  return (
    <footer
      ref={footerRef}
      className="w-full py-8 lg:py-12 bg-[#111111]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div
          ref={cardRef}
          className="card-premium p-8 lg:p-12 opacity-0 translate-y-12 transition-all duration-700"
        >
          {/* Brand */}
          <div className="text-center mb-8">
            <button
              onClick={() => navigate('home')}
              className="text-3xl lg:text-4xl font-bold text-[#111111]"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              StaySure
            </button>
          </div>

          {/* Main Links */}
          <div className="flex flex-wrap justify-center gap-6 lg:gap-10 mb-8">
            {mainLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => navigate(link.page)}
                className="text-sm font-medium text-[#6D6D6D] hover:text-[#111111] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[rgba(17,17,17,0.08)] mb-6" />

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-4 lg:gap-6 mb-6">
            {legalLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => navigate(link.page)}
                className="text-xs text-[#6D6D6D] hover:text-[#111111] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-center text-xs text-[#6D6D6D]">
            © 2026 StaySure. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
