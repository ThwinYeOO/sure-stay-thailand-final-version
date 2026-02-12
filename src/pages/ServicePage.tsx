import { useEffect, useRef } from 'react';
import { ArrowRight, Check, X, Clock, FileText, AlertTriangle, Shield, RefreshCw } from 'lucide-react';

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

interface ServicePageProps {
  navigate: (page: Page) => void;
}

const whoCanApply = [
  'Tourists with a valid Thailand visa',
  'Visitors with a visa exemption stamp',
  'Those with at least 7 days remaining on current visa',
  'Passport valid for at least 6 months',
];

const whoCannotApply = [
  'Those who have already overstayed',
  'Passport holders from restricted countries',
  'Visitors with a previous deportation record',
  'Those with pending legal issues in Thailand',
];

const requiredDocuments = [
  { name: 'Passport', description: 'Original passport with current visa page' },
  { name: 'TM.7 Form', description: 'Completed extension application form' },
  { name: 'Passport Photo', description: '4x6 cm photo taken within 6 months' },
  { name: 'Proof of Address', description: 'Hotel booking or rental agreement' },
  { name: 'Departure Ticket', description: 'Flight out of Thailand (if required)' },
  { name: 'Application Fee', description: '1,900 THB government fee' },
];

const ServicePage = ({ navigate }: ServicePageProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = contentRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="w-full pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative w-full min-h-[50vh] lg:min-h-[60vh]">
        <div className="absolute inset-0">
          <img
            src="/service_hero.jpg"
            alt="Thailand Immigration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.6)] via-[rgba(0,0,0,0.4)] to-transparent" />
        </div>
        
        <div className="relative z-10 w-full h-full min-h-[50vh] lg:min-h-[60vh] flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
            <span className="inline-block px-3 py-1 bg-[#D7FF3B] text-[#111111] text-xs font-semibold rounded-full mb-4">
              Most Popular Service
            </span>
            <h1
              className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 max-w-2xl"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Tourist Visa Extension
            </h1>
            <p className="text-lg text-white/80 max-w-xl mb-8">
              Extend your stay in Thailand for an additional 30 days with our hassle-free service.
            </p>
            <button
              onClick={() => navigate('apply')}
              className="btn-primary inline-flex items-center gap-2"
            >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section ref={contentRef} className="w-full py-16 lg:py-24 bg-[#F6F7F6]">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          {/* Who Can Apply */}
          <div className="reveal opacity-0 translate-y-8 transition-all duration-700 mb-16">
            <h2
              className="text-2xl lg:text-3xl font-bold text-[#111111] mb-6"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Who Can Apply
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {whoCanApply.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[rgba(17,17,17,0.06)]"
                >
                  <Check className="w-5 h-5 text-[#D7FF3B] flex-shrink-0" />
                  <span className="text-[#111111]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Who Cannot Apply */}
          <div className="reveal opacity-0 translate-y-8 transition-all duration-700 mb-16">
            <h2
              className="text-2xl lg:text-3xl font-bold text-[#111111] mb-6"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Who Cannot Apply
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {whoCannotApply.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[rgba(17,17,17,0.06)]"
                >
                  <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <span className="text-[#111111]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents */}
          <div className="reveal opacity-0 translate-y-8 transition-all duration-700 mb-16">
            <h2
              className="text-2xl lg:text-3xl font-bold text-[#111111] mb-6"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Required Documents
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {requiredDocuments.map((doc, index) => (
                <div
                  key={index}
                  className="p-5 bg-white rounded-xl border border-[rgba(17,17,17,0.06)]"
                >
                  <FileText className="w-6 h-6 text-[#D7FF3B] mb-3" />
                  <h3 className="font-semibold text-[#111111] mb-1">{doc.name}</h3>
                  <p className="text-sm text-[#6D6D6D]">{doc.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Processing Timeline */}
          <div className="reveal opacity-0 translate-y-8 transition-all duration-700 mb-16">
            <h2
              className="text-2xl lg:text-3xl font-bold text-[#111111] mb-6"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Processing Timeline
            </h2>
            <div className="card-premium p-6 lg:p-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#D7FF3B] flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-5 h-5 text-[#111111]" />
                  </div>
                  <h3 className="font-semibold text-[#111111] mb-1">Day 1</h3>
                  <p className="text-sm text-[#6D6D6D]">Submit application & documents</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#F6F7F6] flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-5 h-5 text-[#111111]" />
                  </div>
                  <h3 className="font-semibold text-[#111111] mb-1">Day 2-5</h3>
                  <p className="text-sm text-[#6D6D6D]">Document review & appointment</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#F6F7F6] flex items-center justify-center mx-auto mb-3">
                    <RefreshCw className="w-5 h-5 text-[#111111]" />
                  </div>
                  <h3 className="font-semibold text-[#111111] mb-1">Day 6-10</h3>
                  <p className="text-sm text-[#6D6D6D]">Receive your extension stamp</p>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Explanation */}
          <div className="reveal opacity-0 translate-y-8 transition-all duration-700 mb-16">
            <h2
              className="text-2xl lg:text-3xl font-bold text-[#111111] mb-6"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Understanding the Risks
            </h2>
            <div className="card-premium p-6 lg:p-8 border-l-4 border-l-[#D7FF3B]">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-[#111111] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#111111] mb-2">Overstay Penalties</h3>
                  <p className="text-[#6D6D6D] mb-4">
                    Overstaying your visa in Thailand results in a fine of <strong>500 THB per day</strong>, 
                    up to a maximum of 20,000 THB. Serious overstays can lead to detention, deportation, 
                    and being banned from re-entering Thailand.
                  </p>
                  <p className="text-[#6D6D6D]">
                    We strongly recommend applying for an extension at least 7 days before your visa expires 
                    to avoid any penalties and ensure a smooth process.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Refund Policy */}
          <div className="reveal opacity-0 translate-y-8 transition-all duration-700 mb-16">
            <h2
              className="text-2xl lg:text-3xl font-bold text-[#111111] mb-6"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Refund Policy
            </h2>
            <div className="card-premium p-6 lg:p-8">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#D7FF3B] flex-shrink-0 mt-0.5" />
                  <span className="text-[#111111]">Full refund if we cannot process your application</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#D7FF3B] flex-shrink-0 mt-0.5" />
                  <span className="text-[#111111]">50% refund if you cancel before we submit to immigration</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#D7FF3B] flex-shrink-0 mt-0.5" />
                  <span className="text-[#111111]">No refund once application is submitted to immigration</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="reveal opacity-0 translate-y-8 transition-all duration-700 text-center">
            <h2
              className="text-2xl lg:text-3xl font-bold text-[#111111] mb-4"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Ready to extend your visa?
            </h2>
            <p className="text-[#6D6D6D] mb-6">
              Start your application today and avoid overstay penalties.
            </p>
            <button
              onClick={() => navigate('apply')}
              className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4"
            >
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicePage;
