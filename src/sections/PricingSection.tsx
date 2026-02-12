import { useEffect, useRef } from 'react';
import { Check, ArrowRight } from 'lucide-react';

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

interface PricingSectionProps {
  navigate: (page: Page) => void;
}

const plans = [
  {
    name: 'Standard',
    duration: '7–10 business days',
    price: 'THB 4,500',
    features: [
      'Document review & check',
      'Appointment booking',
      'Application submission',
      'Email updates',
      'Standard support',
    ],
    popular: false,
  },
  {
    name: 'Express',
    duration: '3–5 business days',
    price: 'THB 6,900',
    features: [
      'Priority document review',
      'Fast-track appointment',
      'Application submission',
      'WhatsApp updates',
      'Priority support',
      'Delivery option',
    ],
    popular: true,
  },
];

const PricingSection = ({ navigate }: PricingSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const plansRef = useRef<(HTMLDivElement | null)[]>([]);

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
            
            // Animate plan cards
            plansRef.current.forEach((plan, index) => {
              if (plan) {
                setTimeout(() => {
                  plan.style.opacity = '1';
                  plan.style.transform = 'translateY(0)';
                }, 400 + index * 150);
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
      id="pricing"
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
              src="/pricing_photo.jpg"
              alt="Pricing"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Pricing Card */}
          <div
            ref={rightCardRef}
            className="card-premium p-8 lg:p-12 opacity-0 translate-x-24 transition-all duration-1000"
          >
            <h2
              className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#111111] mb-4"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Simple pricing. No hidden fees.
            </h2>
            
            <p className="text-base text-[#6D6D6D] mb-8">
              One flat fee covers document check, appointment booking, and support.
            </p>

            <div className="space-y-4">
              {plans.map((plan, index) => (
                <div
                  key={plan.name}
                  ref={(el) => { plansRef.current[index] = el; }}
                  className={`relative p-6 rounded-2xl border transition-all duration-600 opacity-0 translate-y-7 ${
                    plan.popular
                      ? 'bg-[#111111] text-white border-[#111111]'
                      : 'bg-[#F6F7F6] text-[#111111] border-[rgba(17,17,17,0.08)]'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-6 px-3 py-1 bg-[#D7FF3B] text-[#111111] text-xs font-semibold rounded-full">
                      Most Popular
                    </span>
                  )}
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{plan.name}</h3>
                      <p className={`text-sm ${plan.popular ? 'text-[#9D9D9D]' : 'text-[#6D6D6D]'}`}>
                        {plan.duration}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold">{plan.price}</span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className={`w-4 h-4 ${plan.popular ? 'text-[#D7FF3B]' : 'text-[#111111]'}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('apply')}
              className="btn-primary inline-flex items-center gap-2 w-full justify-center mt-6"
            >
              Choose your plan
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
