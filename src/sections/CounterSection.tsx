import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

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

interface CounterSectionProps {
  navigate: (page: Page) => void;
}

const CounterSection = ({ navigate }: CounterSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoCardRef = useRef<HTMLDivElement>(null);
  const statCardRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const targetCount = 300;
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            
            // Animate photo card
            if (photoCardRef.current) {
              photoCardRef.current.style.opacity = '1';
              photoCardRef.current.style.transform = 'translateY(0)';
            }
            
            // Animate stat card
            setTimeout(() => {
              if (statCardRef.current) {
                statCardRef.current.style.opacity = '1';
                statCardRef.current.style.transform = 'scale(1)';
              }
            }, 200);
            
            // Animate counter
            const duration = 2000;
            const steps = 60;
            const increment = targetCount / steps;
            let current = 0;
            
            const timer = setInterval(() => {
              current += increment;
              if (current >= targetCount) {
                setCount(targetCount);
                clearInterval(timer);
              } else {
                setCount(Math.floor(current));
              }
            }, duration / steps);
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
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
        {/* Full-width Photo Card */}
        <div
          ref={photoCardRef}
          className="card-premium overflow-hidden relative min-h-[400px] lg:min-h-[500px] opacity-0 translate-y-24 transition-all duration-1000"
        >
          <img
            src="/counter_bg.jpg"
            alt="Thailand landscape"
            className="w-full h-full object-cover absolute inset-0"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] via-[rgba(0,0,0,0.2)] to-transparent" />
          
          {/* Centered Stat Card */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div
              ref={statCardRef}
              className="card-premium p-8 lg:p-12 text-center max-w-md opacity-0 scale-90 transition-all duration-700"
            >
              <div
                className="text-6xl lg:text-7xl xl:text-8xl font-bold text-[#111111] mb-4"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {count}+
              </div>
              <p className="text-base lg:text-lg text-[#6D6D6D] mb-6">
                Tourist visa extensions completed across Thailand.
              </p>
              <button
                onClick={() => navigate('home')}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#111111] hover:text-[#6D6D6D] transition-colors"
              >
                Read real stories
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
