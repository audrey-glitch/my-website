import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, ListChecks, MapPin, Package } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProcessSectionProps {
  className?: string;
}

const ProcessSection = ({ className = '' }: ProcessSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      // Card entrance with slide from right
      scrollTl.fromTo(
        cardRef.current,
        { x: '55vw', rotate: 1, opacity: 0 },
        { x: 0, rotate: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      // Background scale
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1.06 },
        { scale: 1, ease: 'none' },
        0
      );

      // Headline entrance
      scrollTl.fromTo(
        headlineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.05
      );

      // Body entrance
      scrollTl.fromTo(
        bodyRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.1
      );

      // Steps entrance
      if (stepsRef.current) {
        const steps = stepsRef.current.querySelectorAll('.step-item');
        scrollTl.fromTo(
          steps,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.025, ease: 'power2.out' },
          0.15
        );
      }

      // CTA entrance
      scrollTl.fromTo(
        ctaRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.25
      );

      // SETTLE (30% - 70%) - hold positions

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        cardRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1 },
        { scale: 1.05, ease: 'none' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      icon: Search,
      number: '1',
      title: 'Discover',
      description: 'We learn about health, lifestyle, and budget.',
    },
    {
      icon: ListChecks,
      number: '2',
      title: 'Recommend',
      description: 'We shortlist communities that fit.',
    },
    {
      icon: MapPin,
      number: '3',
      title: 'Tour',
      description: 'We schedule visits and go with you.',
    },
    {
      icon: Package,
      number: '4',
      title: 'Move',
      description: 'We coordinate paperwork and transition.',
    },
  ];

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="process"
      className={`section-pinned ${className}`}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/process_table.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Vignette Overlay */}
      <div className="absolute inset-0 vignette-overlay" />

      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Content Card */}
      <div
        ref={cardRef}
        className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[min(88vw,1120px)] card-glass p-8 md:p-12"
      >
        <div className="flex flex-col items-center text-center">
          {/* Label */}
          <span className="label-uppercase text-gold mb-4">
            Our Process
          </span>

          {/* Headline */}
          <h2
            ref={headlineRef}
            className="heading-section text-offwhite mb-4"
          >
            From first call to move-in day
          </h2>

          {/* Body */}
          <p
            ref={bodyRef}
            className="text-base md:text-lg text-offwhite/80 mb-8 max-w-[600px]"
          >
            We handle the research, scheduling, and details—so you can focus on your family.
          </p>

          {/* Steps */}
          <div
            ref={stepsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full mb-8"
          >
            {steps.map((step, index) => (
              <div
                key={index}
                className="step-item flex flex-col items-center p-4 md:p-5 rounded-xl bg-navy/40 border border-gold/20"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gold/20 mb-3">
                  <step.icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
                </div>
                <span className="text-gold text-xs font-medium mb-1">
                  {step.number}
                </span>
                <h3 className="font-serif text-lg text-offwhite mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-offwhite/70 text-center">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            ref={ctaRef}
            onClick={scrollToContact}
            className="btn-primary"
          >
            Get started
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
