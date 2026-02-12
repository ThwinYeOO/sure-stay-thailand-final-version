import { useEffect } from 'react';

const PrivacyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full min-h-screen pt-24 pb-16 bg-[#F6F7F6]">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <div className="card-premium p-8 lg:p-12">
          <h1
            className="text-3xl lg:text-4xl font-bold text-[#111111] mb-8"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Privacy Policy
          </h1>

          <div className="prose prose-sm max-w-none text-[#6D6D6D]">
            <p className="mb-6">
              Last updated: February 12, 2026
            </p>

            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-4">1. Introduction</h2>
            <p className="mb-4">
              StaySure ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your 
              information when you use our visa extension services.
            </p>

            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-4">2. Information We Collect</h2>
            <p className="mb-4">We collect the following types of information:</p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li><strong>Personal Information:</strong> Name, email address, phone number, nationality</li>
              <li><strong>Passport Information:</strong> Passport number, expiry date, visa details</li>
              <li><strong>Documents:</strong> Passport scans, photos, and other required documents</li>
              <li><strong>Payment Information:</strong> Transaction details (we do not store full card numbers)</li>
              <li><strong>Usage Data:</strong> How you interact with our website and services</li>
            </ul>

            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use your information to:</p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>Process your visa extension application</li>
              <li>Communicate with you about your application status</li>
              <li>Provide customer support</li>
              <li>Improve our services</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-4">4. Information Security</h2>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to protect your 
              personal information. This includes encryption, secure servers, and access controls. 
              However, no method of transmission over the internet is 100% secure.
            </p>

            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-4">5. Data Retention</h2>
            <p className="mb-4">
              We retain your personal information for as long as necessary to fulfill the purposes 
              outlined in this Privacy Policy, unless a longer retention period is required by law. 
              Typically, we retain documents for 2 years after service completion.
            </p>

            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-4">6. Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
              <li>Request a copy of your information</li>
            </ul>

            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-4">7. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mb-4">
              Email: hello@staysure.co<br />
              Address: Bangkok, Thailand
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPage;
