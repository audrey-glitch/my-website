import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const microcopyRef = useRef<HTMLParagraphElement>(null);

  // Auto-play entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Initial states
      gsap.set([bgRef.current, vignetteRef.current], { opacity: 0 });
      gsap.set(cardRef.current, { opacity: 0, y: 40, scale: 0.98 });
      gsap.set(labelRef.current, { opacity: 0, y: 12 });
      gsap.set(subheadlineRef.current, { opacity: 0, y: 18 });
      gsap.set(ctaRef.current, { opacity: 0, y: 16 });
      gsap.set(microcopyRef.current, { opacity: 0, y: 10 });

      // Animate background and vignette
      tl.to([bgRef.current, vignetteRef.current], {
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
      });

      // Animate card
      tl.to(
        cardRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
        },
        0.2
      );

      // Animate label
      tl.to(
        labelRef.current,
        {
          opacity: 0.85,
          y: 0,
          duration: 0.5,
        },
        0.35
      );

      // Animate headline words
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        gsap.set(words, { opacity: 0, y: 28 });
        tl.to(
          words,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.03,
          },
          0.45
        );
      }

      // Animate subheadline
      tl.to(
        subheadlineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        0.6
      );

      // Animate CTA
      tl.to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        0.75
      );

      // Animate microcopy
      tl.to(
        microcopyRef.current,
        {
          opacity: 0.6,
          y: 0,
          duration: 0.4,
        },
        0.9
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.to([cardRef.current, labelRef.current, subheadlineRef.current, ctaRef.current, microcopyRef.current], {
              opacity: (i) => i === 4 ? 0.6 : (i === 0 ? 1 : (i === 1 ? 0.85 : 1)),
              y: 0,
              duration: 0.3,
            });
            if (headlineRef.current) {
              gsap.to(headlineRef.current.querySelectorAll('.word'), {
                opacity: 1,
                y: 0,
                duration: 0.3,
              });
            }
            gsap.to(bgRef.current, { scale: 1, duration: 0.3 });
            gsap.to(vignetteRef.current, { opacity: 1, duration: 0.3 });
          },
        },
      });

      // EXIT phase (70% - 100%)
      scrollTl.fromTo(
        cardRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1 },
        { scale: 1.06, ease: 'none' },
        0.7
      );

      scrollTl.fromTo(
        vignetteRef.current,
        { opacity: 1 },
        { opacity: 0.85, ease: 'none' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`section-pinned ${className}`}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/hero_hands.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Vignette Overlay */}
      <div ref={vignetteRef} className="absolute inset-0 vignette-overlay" />

      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Content Card */}
      <div
        ref={cardRef}
        className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[min(86vw,1100px)] card-glass p-8 md:p-12 lg:p-16"
      >
        <div className="flex flex-col items-center text-center">
          {/* Label */}
          <span
            ref={labelRef}
            className="label-uppercase text-gold mb-6"
          >
            Senior Living Placement
          </span>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="heading-hero text-offwhite mb-6 max-w-[900px]"
          >
            <span className="word inline-block">Guiding</span>{' '}
            <span className="word inline-block">families</span>{' '}
            <span className="word inline-block">to</span>{' '}
            <span className="word inline-block">the</span>{' '}
            <span className="word inline-block">right</span>{' '}
            <span className="word inline-block">senior</span>{' '}
            <span className="word inline-block">living</span>{' '}
            <span className="word inline-block">choice.</span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadlineRef}
            className="text-lg md:text-xl text-offwhite/80 mb-8 max-w-[600px]"
          >
            Personalized, local expertise—at no cost to you.
          </p>

          {/* CTA Button */}
          <button
            ref={ctaRef}
            onClick={scrollToContact}
            className="btn-primary text-base md:text-lg mb-4"
          >
            Schedule a Free Consultation
          </button>

          {/* Microcopy */}
          <p
            ref={microcopyRef}
            className="text-sm text-offwhite/60"
          >
            Most families hear back within 1 business day.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
