import { useEffect, useRef } from 'react';
import { ArrowRight, Zap } from 'lucide-react';

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

interface HeroSectionProps {
  navigate: (page: Page) => void;
}

const HeroSection = ({ navigate }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-play entrance animation on load
    const card = cardRef.current;
    const headline = headlineRef.current;
    const cta = ctaRef.current;

    if (card && headline && cta) {
      // Initial states
      card.style.opacity = '0';
      card.style.transform = 'translateY(80px)';
      headline.style.opacity = '0';
      cta.style.opacity = '0';
      cta.style.transform = 'translateY(20px)';

      // Animate in
      setTimeout(() => {
        card.style.transition = 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 100);

      setTimeout(() => {
        headline.style.transition = 'opacity 0.7s ease-out';
        headline.style.opacity = '1';
      }, 400);

      setTimeout(() => {
        cta.style.transition = 'all 0.5s ease-out';
        cta.style.opacity = '1';
        cta.style.transform = 'translateY(0)';
      }, 650);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero_bg.jpg"
          alt="Thailand lifestyle"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.4)] via-[rgba(0,0,0,0.2)] to-transparent" />
      </div>

      {/* Hero Card */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div
          ref={cardRef}
          className="card-premium w-full max-w-[1100px] min-h-[500px] lg:min-h-[580px] p-8 lg:p-12 flex flex-col justify-between relative"
        >
          {/* Badge */}
          <div className="absolute top-6 right-6 lg:top-8 lg:right-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#F6F7F6] rounded-full text-xs font-medium text-[#111111]">
              <Zap className="w-3.5 h-3.5 text-[#D7FF3B] fill-[#D7FF3B]" />
              Fast turnaround
            </span>
          </div>

          {/* Content */}
          <div className="mt-8 lg:mt-4">
            <h1
              ref={headlineRef}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#111111] max-w-[90%] lg:max-w-[70%] leading-[0.95]"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Stay longer.<br />
              Stress-free.
            </h1>
            
            <p className="mt-6 lg:mt-8 text-base lg:text-lg text-[#6D6D6D] max-w-[90%] lg:max-w-[55%] leading-relaxed">
              Thailand tourist visa extensions and immigration support—handled online with clear timelines and real human help.
            </p>
          </div>

          {/* CTA Row */}
          <div ref={ctaRef} className="mt-8 lg:mt-0 flex flex-col sm:flex-row items-start gap-4">
            <button
              onClick={() => navigate('apply')}
              className="btn-primary inline-flex items-center gap-2 text-base"
            >
              Check eligibility
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('how-it-works');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#6D6D6D] hover:text-[#111111] transition-colors"
            >
              See how it works
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
