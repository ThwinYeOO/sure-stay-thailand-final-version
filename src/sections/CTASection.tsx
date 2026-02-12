import { useEffect, useRef } from 'react';
import { ArrowRight, Lock } from 'lucide-react';

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

interface CTASectionProps {
  navigate: (page: Page) => void;
}

const CTASection = ({ navigate }: CTASectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate left card
            if (leftCardRef.current) {
              leftCardRef.current.style.opacity = '1';
              leftCardRef.current.style.transform = 'translateX(0) rotate(0deg)';
            }
            
            // Animate right card
            setTimeout(() => {
              if (rightCardRef.current) {
                rightCardRef.current.style.opacity = '1';
                rightCardRef.current.style.transform = 'translateX(0)';
              }
            }, 150);
            
            // Animate CTA button
            setTimeout(() => {
              if (ctaRef.current) {
                ctaRef.current.style.opacity = '1';
                ctaRef.current.style.transform = 'translateY(0) scale(1)';
              }
            }, 400);
            
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

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 lg:py-24 bg-[#F6F7F6]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Left Photo Card */}
          <div
            ref={leftCardRef}
            className="card-premium overflow-hidden min-h-[400px] lg:min-h-[500px] opacity-0 -translate-x-24 -rotate-2 transition-all duration-1000"
          >
            <img
              src="/cta_photo.jpg"
              alt="Happy customer with passport"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right CTA Card */}
          <div
            ref={rightCardRef}
            className="card-premium p-8 lg:p-12 flex flex-col justify-center opacity-0 translate-x-24 transition-all duration-1000"
          >
            <h2
              className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#111111] mb-6"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Ready to extend your stay?
            </h2>
            
            <p className="text-base lg:text-lg text-[#6D6D6D] mb-4">
              Get a clear timeline and real support.
            </p>
            <p className="text-sm text-[#6D6D6D] mb-8">
              Most applications start within 24 hours.
            </p>

            <div
              ref={ctaRef}
              className="opacity-0 translate-y-6 scale-95 transition-all duration-500"
            >
              <button
                onClick={() => navigate('apply')}
                className="btn-primary inline-flex items-center gap-2 text-base lg:text-lg px-8 py-4"
              >
                Start your extension
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-2 mt-4 text-xs text-[#6D6D6D]">
                <Lock className="w-3.5 h-3.5" />
                <span>Secure checkout • Human support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
