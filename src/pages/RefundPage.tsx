import { useEffect } from 'react';
import { Check, X, Clock } from 'lucide-react';

const refundScenarios = [
  {
    scenario: 'Application not yet submitted to immigration',
    refund: '50% of service fee',
    icon: Clock,
    eligible: true,
  },
  {
    scenario: 'We cannot process your application',
    refund: '100% full refund',
    icon: Check,
    eligible: true,
  },
  {
    scenario: 'Application already submitted to immigration',
    refund: 'No refund',
    icon: X,
    eligible: false,
  },
  {
    scenario: 'Visa extension denied by immigration',
    refund: 'No refund (service was rendered)',
    icon: X,
    eligible: false,
  },
];

const RefundPage = () => {
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
            Refund Policy
          </h1>

          <div className="prose prose-sm max-w-none text-[#6D6D6D]">
            <p className="mb-6">
              Last updated: February 12, 2026
            </p>

            <p className="mb-8">
              At StaySure, we believe in transparent and fair pricing. This Refund Policy 
              outlines when and how you can request a refund for our services.
            </p>

            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-4">Refund Scenarios</h2>
            
            <div className="space-y-4 mb-8">
              {refundScenarios.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border ${
                    item.eligible
                      ? 'bg-green-50 border-green-100'
                      : 'bg-red-50 border-red-100'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        item.eligible ? 'bg-green-100' : 'bg-red-100'
                      }`}
                    >
                      <item.icon
                        className={`w-4 h-4 ${
                          item.eligible ? 'text-green-600' : 'text-red-500'
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-[#111111] font-medium">{item.scenario}</p>
                      <p
                        className={`text-sm ${
                          item.eligible ? 'text-green-700' : 'text-red-600'
                        }`}
                      >
                        Refund: {item.refund}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-4">Non-Refundable Items</h2>
            <p className="mb-4">The following are non-refundable under all circumstances:</p>
            <ul className="list-disc pl-5 mb-6 space-y-2">
              <li>Government fees paid to Thai immigration (1,900 THB)</li>
              <li>Express service upgrades once processing has begun</li>
              <li>Third-party fees (delivery, translation, etc.)</li>
              <li>Applications where fraudulent information was provided</li>
            </ul>

            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-4">How to Request a Refund</h2>
            <p className="mb-4">To request a refund, please:</p>
            <ol className="list-decimal pl-5 mb-6 space-y-2">
              <li>Email us at hello@staysure.co with subject "Refund Request"</li>
              <li>Include your application ID and reason for refund</li>
              <li>Allow 5-7 business days for processing</li>
              <li>Refunds will be issued to the original payment method</li>
            </ol>

            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-4">Processing Time</h2>
            <p className="mb-6">
              Refund requests are typically processed within 5-7 business days. 
              Depending on your payment method, it may take an additional 5-10 business days 
              for the refund to appear in your account.
            </p>

            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about our Refund Policy, please contact us:
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

export default RefundPage;
