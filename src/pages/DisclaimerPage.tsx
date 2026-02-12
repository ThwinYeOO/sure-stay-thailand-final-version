import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

const DisclaimerPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full min-h-screen pt-24 pb-16 bg-[#F6F7F6]">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <div className="card-premium p-8 lg:p-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <h1
              className="text-3xl lg:text-4xl font-bold text-[#111111]"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Disclaimer
            </h1>
          </div>

          <div className="prose prose-sm max-w-none text-[#6D6D6D]">
            <p className="mb-6">
              Last updated: February 12, 2026
            </p>

            <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl mb-8">
              <p className="text-amber-800 text-sm">
                <strong>Important:</strong> Please read this disclaimer carefully before using 
                our services. By using StaySure, you acknowledge and agree to the following terms.
              </p>
            </div>

            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-4">1. Not a Government Agency</h2>
            <p className="mb-4">
              StaySure is a private service provider and is not affiliated with, endorsed by, 
              or a part of the Thai government or immigration authorities. We are a third-party 
              service that assists with visa extension applications.
            </p>

            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-4">2. No Guarantee of Approval</h2>
            <p className="mb-4">
              We do not guarantee that your visa extension application will be approved. 
              The approval of visa extensions is solely at the discretion of Thai immigration 
              authorities. Our service is to assist with the preparation and submission of 
              your application, not to influence the decision.
            </p>

            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-4">3. Information Accuracy</h2>
            <p className="mb-4">
              While we strive to provide accurate and up-to-date information about Thai visa 
              regulations, immigration laws and policies can change without notice. We recommend 
              verifying all information with official Thai immigration sources.
            </p>

            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-4">4. Not Legal Advice</h2>
            <p className="mb-4">
              The information provided on our website and through our services is for general 
              informational purposes only and does not constitute legal advice. For specific 
              legal questions, please consult with a qualified immigration attorney.
            </p>

            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-4">5. User Responsibility</h2>
            <p className="mb-4">
              You are responsible for:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>Providing accurate and truthful information</li>
              <li>Ensuring your passport and documents are valid</li>
              <li>Complying with all Thai laws and immigration regulations</li>
              <li>Understanding the terms and conditions of your visa</li>
              <li>Maintaining valid visa status at all times</li>
            </ul>

            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-4">6. Limitation of Liability</h2>
            <p className="mb-4">
              StaySure shall not be held liable for:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>Visa application rejections or denials</li>
              <li>Overstay fines or penalties</li>
              <li>Deportation or entry bans</li>
              <li>Travel disruptions or missed flights</li>
              <li>Loss of documents during transit</li>
              <li>Changes in immigration policies</li>
            </ul>

            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-4">7. Third-Party Links</h2>
            <p className="mb-4">
              Our website may contain links to third-party websites. We are not responsible 
              for the content, accuracy, or practices of these external sites.
            </p>

            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-4">8. AI Chatbot</h2>
            <p className="mb-4">
              Our AI chatbot provides general information only. It may not always have the 
              most current information and should not be relied upon for critical decisions. 
              For accurate assistance, please contact our support team directly.
            </p>

            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-4">9. Contact</h2>
            <p className="mb-4">
              If you have any questions about this disclaimer, please contact us at:
            </p>
            <p className="mb-4">
              Email: hello@staysure.co<br />
              WhatsApp: +66 xxx xxx xxx
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DisclaimerPage;
