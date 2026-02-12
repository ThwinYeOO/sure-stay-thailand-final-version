import { useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight, FileText, Building, Stamp } from 'lucide-react';

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

interface HowItWorksSectionProps {
  navigate: (page: Page) => void;
}

const steps = [
  {
    number: '01',
    title: 'Book online',
    description: 'Choose your service and upload documents.',
    icon: FileText,
  },
  {
    number: '02',
    title: 'We handle the visit',
    description: 'Our team submits your application.',
    icon: Building,
  },
  {
    number: '03',
    title: 'Receive your stamp',
    description: 'Pick up your passport or get it delivered.',
    icon: Stamp,
  },
];

const HowItWorksSection = ({ navigate }: HowItWorksSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

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
            }, 150);
            
            // Animate steps
            stepsRef.current.forEach((step, index) => {
              if (step) {
                setTimeout(() => {
                  step.style.opacity = '1';
                  step.style.transform = 'translateY(0)';
                }, 300 + index * 120);
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
      id="how-it-works"
      className="w-full py-16 lg:py-24 bg-[#F6F7F6]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Left Steps Card */}
          <div
            ref={leftCardRef}
            className="card-premium p-8 lg:p-12 opacity-0 -translate-x-24 transition-all duration-1000"
          >
            <h2
              className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#111111] mb-10"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Three steps to a longer stay.
            </h2>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  ref={(el) => { stepsRef.current[index] = el; }}
                  className="flex items-start gap-4 opacity-0 translate-y-8 transition-all duration-600"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#F6F7F6] border border-[rgba(17,17,17,0.06)] flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-5 h-5 text-[#111111]" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-[#D7FF3B] bg-[#111111] px-2 py-0.5 rounded">
                        {step.number}
                      </span>
                      <h3 className="text-lg font-semibold text-[#111111]">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm text-[#6D6D6D]">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowUpRight className="w-5 h-5 text-[#6D6D6D] hidden lg:block" />
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('services/tourist-visa-extension')}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#6D6D6D] hover:text-[#111111] transition-colors mt-10"
            >
              See full process
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Photo Card */}
          <div
            ref={rightCardRef}
            className="card-premium overflow-hidden min-h-[400px] lg:min-h-[500px] opacity-0 translate-x-24 transition-all duration-1000"
          >
            <img
              src="/process_photo.jpg"
              alt="Document handling process"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
