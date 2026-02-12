import { useEffect, useRef } from 'react';
import { MapPin, Shield, CreditCard, Headphones } from 'lucide-react';

const trustItems = [
  {
    icon: MapPin,
    label: 'Based in Thailand',
  },
  {
    icon: Shield,
    label: 'Secure document handling',
  },
  {
    icon: CreditCard,
    label: 'Clear pricing',
  },
  {
    icon: Headphones,
    label: 'Human support',
  },
];

const TrustSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate heading
            if (headingRef.current) {
              headingRef.current.style.opacity = '1';
              headingRef.current.style.transform = 'translateY(0)';
            }
            
            // Animate items with stagger
            itemsRef.current.forEach((item, index) => {
              if (item) {
                setTimeout(() => {
                  item.style.opacity = '1';
                  item.style.transform = 'translateY(0)';
                }, index * 100);
              }
            });
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 lg:py-20 bg-[#F6F7F6]"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <h2
          ref={headingRef}
          className="text-2xl lg:text-3xl font-bold text-center text-[#111111] mb-12 lg:mb-16 opacity-0 translate-y-8 transition-all duration-700"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Trusted by travelers. Backed by experience.
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trustItems.map((item, index) => (
            <div
              key={item.label}
              ref={(el) => { itemsRef.current[index] = el; }}
              className="flex flex-col items-center text-center opacity-0 translate-y-10 transition-all duration-700"
            >
              <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-white border border-[rgba(17,17,17,0.06)] flex items-center justify-center mb-4 shadow-sm">
                <item.icon className="w-6 h-6 lg:w-7 lg:h-7 text-[#111111]" strokeWidth={1.5} />
              </div>
              <span className="text-sm lg:text-base font-medium text-[#111111]">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
