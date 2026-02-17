import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DollarSign, Shield, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PromiseSectionProps {
  className?: string;
}

const PromiseSection = ({ className = '' }: PromiseSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const pointsRef = useRef<HTMLDivElement>(null);
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
      // Card entrance from bottom
      scrollTl.fromTo(
        cardRef.current,
        { y: '55vh', scale: 0.97, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'power2.out' },
        0
      );

      // Background scale
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1.07 },
        { scale: 1, ease: 'none' },
        0
      );

      // Headline entrance
      scrollTl.fromTo(
        headlineRef.current,
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.05
      );

      // Body entrance
      scrollTl.fromTo(
        bodyRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.1
      );

      // Points entrance
      if (pointsRef.current) {
        const points = pointsRef.current.querySelectorAll('.point-item');
        scrollTl.fromTo(
          points,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.03, ease: 'power2.out' },
          0.18
        );
      }

      // CTA entrance
      scrollTl.fromTo(
        ctaRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.28
      );

      // SETTLE (30% - 70%) - hold positions

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        cardRef.current,
        { y: 0, opacity: 1 },
        { y: '-14vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1 },
        { scale: 1.04, ease: 'none' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const points = [
    {
      icon: DollarSign,
      title: 'No hidden fees',
    },
    {
      icon: Shield,
      title: 'No pressure to choose',
    },
    {
      icon: Phone,
      title: 'Ongoing follow-up',
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
      id="promise"
      className={`section-pinned ${className}`}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/promise_garden.jpg)',
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
        className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[min(86vw,980px)] card-glass p-8 md:p-12"
      >
        <div className="flex flex-col items-center text-center">
          {/* Label */}
          <span className="label-uppercase text-gold mb-4">
            Our Promise
          </span>

          {/* Headline */}
          <h2
            ref={headlineRef}
            className="heading-section text-offwhite mb-4"
          >
            No cost to families.
          </h2>

          {/* Body */}
          <p
            ref={bodyRef}
            className="text-base md:text-lg text-offwhite/80 mb-8 max-w-[650px]"
          >
            Our service is free because senior living communities compensate us when a resident moves in. You get advocacy without the invoice.
          </p>

          {/* Points */}
          <div
            ref={pointsRef}
            className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-8"
          >
            {points.map((point, index) => (
              <div
                key={index}
                className="point-item flex items-center gap-3"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gold/20">
                  <point.icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
                </div>
                <span className="text-offwhite font-medium">
                  {point.title}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            ref={ctaRef}
            onClick={scrollToContact}
            className="btn-primary"
          >
            Book a free consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default PromiseSection;
