import HeroSection from '../sections/HeroSection';
import TrustSection from '../sections/TrustSection';
import ExpiryWarningSection from '../sections/ExpiryWarningSection';
import HowItWorksSection from '../sections/HowItWorksSection';
import PricingSection from '../sections/PricingSection';
import CounterSection from '../sections/CounterSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import FAQSection from '../sections/FAQSection';
import CTASection from '../sections/CTASection';
import ContactSection from '../sections/ContactSection';
import FooterSection from '../sections/FooterSection';

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

interface HomePageProps {
  navigate: (page: Page) => void;
}

const HomePage = ({ navigate }: HomePageProps) => {
  return (
    <main className="w-full">
      <HeroSection navigate={navigate} />
      <TrustSection />
      <ExpiryWarningSection navigate={navigate} />
      <HowItWorksSection navigate={navigate} />
      <PricingSection navigate={navigate} />
      <CounterSection navigate={navigate} />
      <TestimonialsSection navigate={navigate} />
      <FAQSection />
      <CTASection navigate={navigate} />
      <ContactSection />
      <FooterSection navigate={navigate} />
    </main>
  );
};

export default HomePage;
