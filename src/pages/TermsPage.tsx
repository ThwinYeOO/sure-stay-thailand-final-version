import { useEffect } from 'react';

const TermsPage = () => {
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
            Terms of Service
          </h1>

          <div className="prose prose-sm max-w-none text-[#6D6D6D]">
            <p className="mb-6">
              Last updated: February 12, 2026
            </p>

            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing or using StaySure's services, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our services.
            </p>

            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-4">2. Our Services</h2>
            <p className="mb-4">
              StaySure provides visa extension assistance services in Thailand. We help prepare and 
              submit your application to Thai immigration authorities. We are not a government agency 
              and do not guarantee approval of your visa extension.
            </p>

            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-4">3. User Responsibilities</h2>
            <p className="mb-4">You agree to:</p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Submit genuine and valid documents</li>
              <li>Notify us of any changes to your circumstances</li>
              <li>Comply with all Thai immigration laws and regulations</li>
              <li>Pay all fees as agreed</li>
            </ul>

            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-4">4. Fees and Payment</h2>
            <p className="mb-4">
              Our service fees are clearly displayed on our website. A 50% deposit is required to 
              begin processing your application. The remaining balance is due upon completion. 
              Government fees are separate and non-refundable.
            </p>

            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-4">5. No Guarantee of Approval</h2>
            <p className="mb-4">
              While we strive to provide the best service possible, we cannot guarantee that your 
              visa extension will be approved. Approval is at the sole discretion of Thai immigration 
              authorities. We do not provide illegal workarounds or guarantee specific outcomes.
            </p>

            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-4">6. Limitation of Liability</h2>
            <p className="mb-4">
              StaySure shall not be liable for any indirect, incidental, special, consequential, 
              or punitive damages arising from your use of our services. This includes but is not 
              limited to overstay fines, deportation, or travel disruptions.
            </p>

            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-4">7. Refund Policy</h2>
            <p className="mb-4">Please refer to our <a href="/refund" className="text-[#111111] underline">Refund Policy</a> for details on cancellations and refunds.</p>

            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-4">8. Intellectual Property</h2>
            <p className="mb-4">
              All content on our website, including text, graphics, logos, and images, is the 
              property of StaySure and protected by copyright laws. You may not reproduce, 
              distribute, or create derivative works without our permission.
            </p>

            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-4">9. Governing Law</h2>
            <p className="mb-4">
              These Terms shall be governed by and construed in accordance with the laws of Thailand. 
              Any disputes shall be resolved in the courts of Bangkok, Thailand.
            </p>

            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-4">10. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these Terms at any time. Changes will be effective 
              immediately upon posting to our website. Your continued use of our services constitutes 
              acceptance of the modified Terms.
            </p>

            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-4">11. Contact</h2>
            <p className="mb-4">
              For questions about these Terms, please contact us at hello@staysure.co
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TermsPage;
