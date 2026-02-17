import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, Clock, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  className?: string;
}

const ContactSection = ({ className = '' }: ContactSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    phone: '',
    email: '',
    preferredContact: 'phone',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Left content reveal
      gsap.fromTo(
        leftRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: leftRef.current,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 0.4,
          },
        }
      );

      // Form card reveal
      gsap.fromTo(
        formRef.current,
        { y: 40, scale: 0.98, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 0.4,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        relationship: '',
        phone: '',
        email: '',
        preferredContact: 'phone',
        message: '',
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative py-20 md:py-28 ${className}`}
      style={{
        background: '#F6F2EA',
      }}
    >
      {/* Subtle gold vignette at top */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(201, 162, 74, 0.12) 0%, rgba(201, 162, 74, 0) 40%)'
        }}
      />

      <div className="relative w-full px-6 md:px-[6vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-[1200px] mx-auto">
          {/* Left Column */}
          <div ref={leftRef}>
            <span className="label-uppercase text-gold-dark mb-4 block">
              Let's Talk
            </span>
            <h2 className="heading-section text-navy mb-4">
              Let's find the right fit.
            </h2>
            <p className="text-base md:text-lg text-navy/70 mb-8 max-w-[500px]">
              Tell us a little about your situation. We'll follow up within one business day.
            </p>

            {/* Contact Details */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-gold-dark" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm text-navy/60">Phone</p>
                  <p className="text-navy font-medium">(555) 014-2271</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gold-dark" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm text-navy/60">Email</p>
                  <p className="text-navy font-medium">hello@goldenpathfinders.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-gold-dark" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm text-navy/60">Hours</p>
                  <p className="text-navy font-medium">Mon–Fri: 8am–6pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div
            ref={formRef}
            className="bg-white/92 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-card border border-gold/20"
          >
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mb-4">
                  <Send className="w-8 h-8 text-gold-dark" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl text-navy mb-2">
                  Thank you!
                </h3>
                <p className="text-navy/70">
                  We'll be in touch within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-navy/70 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-cream border border-gold/30 text-navy placeholder-navy/40 focus:outline-none focus:border-gold transition-colors"
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-navy/70 mb-1.5">
                      Relationship to Senior
                    </label>
                    <input
                      type="text"
                      name="relationship"
                      value={formData.relationship}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-cream border border-gold/30 text-navy placeholder-navy/40 focus:outline-none focus:border-gold transition-colors"
                      placeholder="Daughter, Son, etc."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-navy/70 mb-1.5">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-cream border border-gold/30 text-navy placeholder-navy/40 focus:outline-none focus:border-gold transition-colors"
                      placeholder="(555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-navy/70 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-cream border border-gold/30 text-navy placeholder-navy/40 focus:outline-none focus:border-gold transition-colors"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-navy/70 mb-1.5">
                    Preferred Contact Method
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="phone"
                        checked={formData.preferredContact === 'phone'}
                        onChange={handleChange}
                        className="w-4 h-4 accent-gold"
                      />
                      <span className="text-navy text-sm">Phone</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="email"
                        checked={formData.preferredContact === 'email'}
                        onChange={handleChange}
                        className="w-4 h-4 accent-gold"
                      />
                      <span className="text-navy text-sm">Email</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-navy/70 mb-1.5">
                    Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-cream border border-gold/30 text-navy placeholder-navy/40 focus:outline-none focus:border-gold transition-colors resize-none"
                    placeholder="Tell us about your situation..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary py-4"
                >
                  Request a call
                </button>

                <p className="text-center text-xs text-navy/50">
                  Your information is kept confidential.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative w-full px-6 md:px-[6vw] mt-20 pt-8 border-t border-gold/20">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-serif text-gold-dark text-lg">
            Golden Pathfinders
          </p>
          <p className="text-navy/50 text-sm">
            © {new Date().getFullYear()} Golden Pathfinders. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
