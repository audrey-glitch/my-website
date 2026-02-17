import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TestimonialsSectionProps {
  className?: string;
}

const TestimonialsSection = ({ className = '' }: TestimonialsSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.4,
          },
        }
      );

      // Cards reveal
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.testimonial-card');
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 60%',
                scrub: 0.3,
              },
            }
          );

          // Subtle parallax
          gsap.fromTo(
            card,
            { y: 0 },
            {
              y: -18,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const testimonials = [
    {
      quote: 'They made a painful decision feel manageable.',
      text: 'Golden Pathfinders helped us find memory care for Mom in under two weeks. They toured with us and asked questions we didn\'t know to ask.',
      author: 'Jennifer R.',
      location: 'Daughter',
    },
    {
      quote: 'Advocates, not salespeople.',
      text: 'We never felt pushed. They listened, then recommended communities that actually fit Dad\'s personality and budget.',
      author: 'Marcus T.',
      location: 'Son',
    },
    {
      quote: 'Available when we needed them.',
      text: 'Even after move-in, they checked in. That follow-through meant a lot.',
      author: 'Elena S.',
      location: 'Daughter',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className={`relative py-20 md:py-28 bg-navy ${className}`}
    >
      {/* Subtle vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(201, 162, 74, 0.08) 0%, transparent 50%)'
        }}
      />

      <div className="relative w-full px-6 md:px-[6vw]">
        {/* Header */}
        <div ref={headerRef} className="max-w-[920px] mb-12 md:mb-16">
          <span className="label-uppercase text-gold mb-4 block">
            Families We've Helped
          </span>
          <h2 className="heading-section text-offwhite mb-4">
            You don't have to do this alone.
          </h2>
          <p className="text-base md:text-lg text-offwhite/70 max-w-[600px]">
            We've walked hundreds of families through this transition—here's what they say.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card card-glass p-6 md:p-8 flex flex-col"
            >
              <Quote className="w-8 h-8 text-gold/50 mb-4" strokeWidth={1.5} />
              <h3 className="font-serif text-xl md:text-2xl text-offwhite mb-3">
                "{testimonial.quote}"
              </h3>
              <p className="text-sm md:text-base text-offwhite/70 mb-6 flex-grow">
                {testimonial.text}
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-gold/20">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="text-gold font-serif text-lg">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-offwhite font-medium text-sm">
                    {testimonial.author}
                  </p>
                  <p className="text-offwhite/60 text-xs">
                    {testimonial.location}
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

export default TestimonialsSection;
