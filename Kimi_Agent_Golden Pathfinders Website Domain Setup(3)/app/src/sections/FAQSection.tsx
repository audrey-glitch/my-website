import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FAQSectionProps {
  className?: string;
}

const FAQSection = ({ className = '' }: FAQSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        headerRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 0.4,
          },
        }
      );

      // FAQ items reveal
      if (itemsRef.current) {
        const items = itemsRef.current.querySelectorAll('.faq-item');
        items.forEach((item) => {
          gsap.fromTo(
            item,
            { y: 18, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                end: 'top 65%',
                scrub: 0.3,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const faqs = [
    {
      question: 'Do you charge families?',
      answer: 'No. Our service is free for families. Communities pay a referral fee when a resident moves in.',
    },
    {
      question: 'Will you only recommend certain communities?',
      answer: 'We prioritize fit over contracts. If a community isn\'t right for your loved one, we won\'t recommend it.',
    },
    {
      question: 'How quickly can we move?',
      answer: 'Some families move in days; others need weeks. We work on your timeline and handle the logistics.',
    },
    {
      question: 'Do you tour with us?',
      answer: 'Yes. We schedule tours, prepare questions, and attend with you as your advocate.',
    },
    {
      question: 'What if we\'re not ready yet?',
      answer: 'That\'s okay. We can outline options now so you\'re prepared when the time comes.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className={`relative py-20 md:py-28 bg-navy ${className}`}
    >
      <div className="relative w-full px-6 md:px-[6vw]">
        <div className="max-w-[860px] mx-auto">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-10 md:mb-14">
            <span className="label-uppercase text-gold mb-4 block">
              Common Questions
            </span>
            <h2 className="heading-section text-offwhite">
              What families ask us
            </h2>
          </div>

          {/* FAQ Items */}
          <div ref={itemsRef} className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="faq-item card-glass overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                >
                  <span className="font-serif text-lg md:text-xl text-offwhite pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center transition-transform duration-300 ${
                      openIndex === index ? 'rotate-45' : ''
                    }`}
                  >
                    <Plus className="w-4 h-4 text-gold" strokeWidth={2} />
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-350 ease-out ${
                    openIndex === index ? 'max-h-48' : 'max-h-0'
                  }`}
                >
                  <div className="px-5 md:px-6 pb-5 md:pb-6">
                    <p className="text-offwhite/70 text-sm md:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
