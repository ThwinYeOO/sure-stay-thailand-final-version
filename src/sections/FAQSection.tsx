import { useEffect, useRef, useState } from 'react';
import { Plus } from 'lucide-react';

const faqItems = [
  {
    question: 'Can I extend my tourist visa more than once?',
    answer: 'Yes, in most cases you can extend a tourist visa multiple times, subject to immigration approval. Each extension is typically granted for 30 days. We recommend applying early and maintaining valid status throughout your stay.',
  },
  {
    question: 'What documents do I need to upload?',
    answer: 'You will need: 1) Your passport with the current visa page, 2) A completed TM.7 extension form, 3) A recent passport-sized photo (4x6 cm), 4) Proof of accommodation in Thailand, and 5) A copy of your departure ticket (if required). We guide you through each step.',
  },
  {
    question: 'How long does the process take?',
    answer: 'Standard service takes 7–10 business days from document submission to receiving your extension stamp. Express service reduces this to 3–5 business days. Processing times may vary during peak seasons.',
  },
  {
    question: 'What happens if I overstay?',
    answer: 'Overstay fines are 500 THB per day, up to a maximum of 20,000 THB. Overstaying can also result in detention, deportation, and being banned from re-entering Thailand. We strongly recommend applying for an extension before your visa expires.',
  },
  {
    question: 'Can you deliver my passport back to me?',
    answer: 'Yes, our Express plan includes a secure passport delivery service within Bangkok and major cities. For Standard plans, you can pick up your passport from our office or arrange delivery for an additional fee.',
  },
  {
    question: 'Is the payment secure?',
    answer: 'Absolutely. We use industry-standard SSL encryption for all transactions. We accept credit cards, bank transfers, and popular payment methods. Your payment information is never stored on our servers.',
  },
];

const FAQSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
            
            // Animate items
            itemsRef.current.forEach((item, index) => {
              if (item) {
                setTimeout(() => {
                  item.style.opacity = '1';
                  item.style.transform = 'translateY(0)';
                }, 200 + index * 80);
              }
            });
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="w-full py-16 lg:py-24 bg-[#F6F7F6]"
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <h2
          ref={headingRef}
          className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#111111] text-center mb-12 opacity-0 translate-y-8 transition-all duration-700"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Common questions, clear answers.
        </h2>

        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <div
              key={index}
              ref={(el) => { itemsRef.current[index] = el; }}
              className="card-premium overflow-hidden opacity-0 translate-y-8 transition-all duration-500"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full p-5 lg:p-6 flex items-center justify-between text-left hover:bg-[rgba(17,17,17,0.01)] transition-colors"
              >
                <span className="text-base lg:text-lg font-medium text-[#111111] pr-4">
                  {item.question}
                </span>
                <span
                  className={`w-8 h-8 rounded-full bg-[#F6F7F6] flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-45' : ''
                  }`}
                >
                  <Plus className="w-4 h-4 text-[#111111]" />
                </span>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-5 lg:px-6 pb-5 lg:pb-6">
                  <p className="text-sm lg:text-base text-[#6D6D6D] leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
