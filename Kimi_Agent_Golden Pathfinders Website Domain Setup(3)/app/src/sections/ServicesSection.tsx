import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Home, Heart, Brain, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServicesSectionProps {
  className?: string;
}

const ServicesSection = ({ className = '' }: ServicesSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const blocksRef = useRef<HTMLDivElement>(null);
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
      // Card entrance
      scrollTl.fromTo(
        cardRef.current,
        { y: '60vh', scale: 0.96, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'power2.out' },
        0
      );

      // Background scale
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1.08 },
        { scale: 1, ease: 'none' },
        0
      );

      // Headline entrance
      scrollTl.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.05
      );

      // Body entrance
      scrollTl.fromTo(
        bodyRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.1
      );

      // Service blocks entrance
      if (blocksRef.current) {
        const blocks = blocksRef.current.querySelectorAll('.service-block');
        scrollTl.fromTo(
          blocks,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.03, ease: 'power2.out' },
          0.12
        );
      }

      // CTA entrance
      scrollTl.fromTo(
        ctaRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.2
      );

      // SETTLE (30% - 70%) - hold positions

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        cardRef.current,
        { y: 0, opacity: 1 },
        { y: '-16vh', opacity: 0, ease: 'power2.in' },
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

  const services = [
    {
      icon: Home,
      title: 'Independent Living',
      description: 'Maintenance-free living with social connection.',
    },
    {
      icon: Heart,
      title: 'Assisted Living',
      description: 'Daily support with dignity and privacy.',
    },
    {
      icon: Brain,
      title: 'Memory Care',
      description: 'Safe, structured care for Alzheimer\'s and dementia.',
    },
  ];

  const scrollToProcess = () => {
    const element = document.querySelector('#process');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className={`section-pinned ${className}`}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/services_walk.jpg)',
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
            What We Help With
          </span>

          {/* Headline */}
          <h2
            ref={headlineRef}
            className="heading-section text-offwhite mb-4 max-w-[800px]"
          >
            Independent Living · Assisted Living · Memory Care
          </h2>

          {/* Body */}
          <p
            ref={bodyRef}
            className="text-base md:text-lg text-offwhite/80 mb-8 max-w-[700px]"
          >
            We match your loved one's needs, budget, and location to the right community—then tour with you.
          </p>

          {/* Service Blocks */}
          <div
            ref={blocksRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-8"
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="service-block flex flex-col items-center p-6 rounded-xl bg-navy/40 border border-gold/20"
              >
                <service.icon className="w-8 h-8 text-gold mb-4" strokeWidth={1.5} />
                <h3 className="font-serif text-xl text-offwhite mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-offwhite/70 text-center">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            ref={ctaRef}
            onClick={scrollToProcess}
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light text-sm font-medium transition-colors duration-200 group"
          >
            See how we choose communities
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
