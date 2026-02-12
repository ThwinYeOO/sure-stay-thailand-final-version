import { useEffect, useRef } from 'react';
import { ArrowRight, Check } from 'lucide-react';

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

interface ExpiryWarningSectionProps {
  navigate: (page: Page) => void;
}

const steps = [
  'Check your passport\'s stamp or visa sticker.',
  'Start your extension before the expiry date.',
  'Submit documents online—we handle the rest.',
];

const ExpiryWarningSection = ({ navigate }: ExpiryWarningSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const stepsRef = useRef<(HTMLLIElement | null)[]>([]);

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
            
            // Animate headline
            setTimeout(() => {
              if (headlineRef.current) {
                headlineRef.current.style.opacity = '1';
                headlineRef.current.style.transform = 'translateY(0)';
              }
            }, 300);
            
            // Animate steps
            stepsRef.current.forEach((step, index) => {
              if (step) {
                setTimeout(() => {
                  step.style.opacity = '1';
                  step.style.transform = 'translateY(0)';
                }, 400 + index * 100);
              }
            });
            
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
      id="expiry-warning"
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
              src="/expiry_photo.jpg"
              alt="Thailand visa stamp"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Info Card */}
          <div
            ref={rightCardRef}
            className="card-premium p-8 lg:p-12 flex flex-col justify-center opacity-0 translate-x-24 transition-all duration-1000"
          >
            <span className="micro-label mb-4">AVOID OVERSTAY</span>
            
            <h2
              ref={headlineRef}
              className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#111111] mb-8 opacity-0 translate-y-10 transition-all duration-700"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Visa expiring soon? Here's exactly what to do.
            </h2>

            <ul className="space-y-4 mb-8">
              {steps.map((step, index) => (
                <li
                  key={index}
                  ref={(el) => { stepsRef.current[index] = el; }}
                  className="flex items-start gap-3 opacity-0 translate-y-6 transition-all duration-500"
                >
                  <span className="w-5 h-5 rounded bg-[#D7FF3B] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#111111]" />
                  </span>
                  <span className="text-base text-[#111111]">{step}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => navigate('apply')}
              className="btn-primary inline-flex items-center gap-2 w-fit"
            >
              Start your extension
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpiryWarningSection;
