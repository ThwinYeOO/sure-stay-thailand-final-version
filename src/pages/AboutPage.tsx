import { useEffect } from 'react';
import { ArrowRight, Target, Users, Shield, Heart } from 'lucide-react';

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

interface AboutPageProps {
  navigate: (page: Page) => void;
}

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To make Thailand visa extensions simple, transparent, and stress-free for every traveler.',
  },
  {
    icon: Users,
    title: 'Local Expertise',
    description: 'Our team is based in Thailand with deep knowledge of immigration procedures.',
  },
  {
    icon: Shield,
    title: 'Trust & Security',
    description: 'Your documents are handled with the highest security standards and confidentiality.',
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: 'We prioritize clear communication and support throughout your extension journey.',
  },
];

const AboutPage = ({ navigate }: AboutPageProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full min-h-screen pt-20 pb-16 bg-[#F6F7F6]">
      {/* Hero */}
      <section className="relative w-full py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="micro-label mb-4 block">ABOUT US</span>
              <h1
                className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[#111111] mb-6"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                We're here to help you stay longer.
              </h1>
              <p className="text-lg text-[#6D6D6D] mb-8">
                StaySure was founded with a simple goal: to make Thailand visa extensions 
                accessible, transparent, and stress-free for travelers from around the world.
              </p>
              <button
                onClick={() => navigate('contact')}
                className="btn-primary inline-flex items-center gap-2"
              >
                Get in touch
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="card-premium overflow-hidden">
              <img
                src="/team_photo.jpg"
                alt="StaySure Team"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="w-full py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <h2
            className="text-2xl lg:text-3xl font-bold text-[#111111] mb-6"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Why We Built This
          </h2>
          <p className="text-lg text-[#6D6D6D] mb-6">
            After experiencing the confusion and stress of visa extensions firsthand, 
            we realized there had to be a better way. The process was opaque, 
            time-consuming, and filled with uncertainty.
          </p>
          <p className="text-lg text-[#6D6D6D]">
            So we built StaySure—a service that combines local expertise with modern 
            technology to make visa extensions simple, transparent, and reliable. 
            We've helped hundreds of travelers extend their stay in Thailand, 
            and we're just getting started.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="w-full py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <h2
            className="text-2xl lg:text-3xl font-bold text-[#111111] text-center mb-12"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            What We Stand For
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="card-premium p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-[#D7FF3B] flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-[#111111]" />
                </div>
                <h3 className="text-lg font-semibold text-[#111111] mb-2">{value.title}</h3>
                <p className="text-sm text-[#6D6D6D]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="w-full py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="card-premium p-8 lg:p-12">
            <h2
              className="text-2xl lg:text-3xl font-bold text-[#111111] mb-6"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Transparency
            </h2>
            <div className="space-y-4 text-[#6D6D6D]">
              <p>
                We believe in complete transparency. That means:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#D7FF3B] mt-2 flex-shrink-0" />
                  <span>Clear pricing with no hidden fees</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#D7FF3B] mt-2 flex-shrink-0" />
                  <span>Regular updates on your application status</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#D7FF3B] mt-2 flex-shrink-0" />
                  <span>Honest assessments of your eligibility</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#D7FF3B] mt-2 flex-shrink-0" />
                  <span>Clear refund and cancellation policies</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <h2
            className="text-2xl lg:text-3xl font-bold text-[#111111] mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Ready to extend your stay?
          </h2>
          <p className="text-[#6D6D6D] mb-8">
            Let us handle the paperwork while you enjoy Thailand.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('apply')}
              className="btn-primary inline-flex items-center gap-2"
            >
              Start Your Application
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('contact')}
              className="btn-secondary inline-flex items-center gap-2"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
