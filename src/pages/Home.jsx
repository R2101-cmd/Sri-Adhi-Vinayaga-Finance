import { FaCheckCircle } from 'react-icons/fa';
import AnimatedPage from '../components/AnimatedPage.jsx';
import CounterSection from '../components/CounterSection.jsx';
import HeroSection from '../components/HeroSection.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import Testimonials from '../components/Testimonials.jsx';
import Reveal from '../components/Reveal.jsx';
import { services, testimonials, whyChoose } from '../data/siteData.js';

export default function Home() {
  return (
    <AnimatedPage>
      <HeroSection />
      <CounterSection />

      <section className="section-pad">
        <div className="container-max">
          <SectionHeading
            eyebrow="Our Services"
            title="Complete Vehicle Finance Support Under One Roof"
            text="From loan consultation to ownership transfer, our team helps customers move through the finance journey with clarity and confidence."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard key={service.title} {...service} delay={index * 0.05} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-mist">
        <div className="container-max grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="eyebrow">Why Choose Us</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-charcoal sm:text-5xl">
              Finance guidance built on trust, speed, and transparency.
            </h2>
            <p className="mt-5 leading-8 text-charcoal/70">
              We focus on practical eligibility guidance, clear repayment planning, and customer-friendly support so every applicant knows what to expect before they commit.
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {whyChoose.map((item, index) => (
              <Reveal key={item} delay={index * 0.04}>
                <div className="flex min-h-24 items-center gap-4 rounded-lg border border-emeraldDeep/10 bg-white p-5 shadow-sm">
                  <FaCheckCircle className="shrink-0 text-2xl text-gold" />
                  <span className="font-extrabold text-emeraldDeep">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-max">
          <SectionHeading eyebrow="Customer Voices" title="Trusted By Vehicle Buyers" />
          <Testimonials items={testimonials.slice(0, 3)} />
        </div>
      </section>
    </AnimatedPage>
  );
}
