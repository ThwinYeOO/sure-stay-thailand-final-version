import { useEffect, useRef } from 'react';
import { ArrowRight, Quote } from 'lucide-react';

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

interface TestimonialsSectionProps {
  navigate: (page: Page) => void;
}

const testimonials = [
  {
    quote: "They handled everything—I just showed up to collect my passport.",
    author: 'Alex M.',
    location: 'United Kingdom',
    avatar: 'AM',
  },
  {
    quote: "Clear updates, no surprises. Highly recommend.",
    author: 'Priya K.',
    location: 'India',
    avatar: 'PK',
  },
];

const TestimonialsSection = ({ navigate }: TestimonialsSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const quotesRef = useRef<(HTMLDivElement | null)[]>([]);

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
            
            // Animate quotes
            quotesRef.current.forEach((quote, index) => {
              if (quote) {
                setTimeout(() => {
                  quote.style.opacity = '1';
                  quote.style.transform = 'translateY(0)';
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
      id="testimonials"
      className="w-full py-16 lg:py-24 bg-[#F6F7F6]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Left Testimonials Card */}
          <div
            ref={leftCardRef}
            className="card-premium p-8 lg:p-12 opacity-0 -translate-x-24 transition-all duration-1000"
          >
            <h2
              className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#111111] mb-10"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Travelers trust StaySure.
            </h2>

            <div className="space-y-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.author}
                  ref={(el) => { quotesRef.current[index] = el; }}
                  className="opacity-0 translate-y-6 transition-all duration-600"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#D7FF3B] flex items-center justify-center flex-shrink-0">
                      <Quote className="w-4 h-4 text-[#111111]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-lg text-[#111111] mb-3 leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#F6F7F6] border border-[rgba(17,17,17,0.08)] flex items-center justify-center text-xs font-semibold text-[#111111]">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <span className="text-sm font-medium text-[#111111]">
                            {testimonial.author}
                          </span>
                          <span className="text-sm text-[#6D6D6D] ml-2">
                            {testimonial.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('knowledge')}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#6D6D6D] hover:text-[#111111] transition-colors mt-10"
            >
              View all reviews
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Photo Card */}
          <div
            ref={rightCardRef}
            className="card-premium overflow-hidden min-h-[400px] lg:min-h-[500px] opacity-0 translate-x-24 transition-all duration-1000"
          >
            <img
              src="/testimonials_photo.jpg"
              alt="Happy travelers"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
