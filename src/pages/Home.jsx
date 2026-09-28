import { FaCheckCircle } from 'react-icons/fa';
import AnimatedPage from '../components/AnimatedPage.jsx';
import CounterSection from '../components/CounterSection.jsx';
import GoldRateTicker from '../components/GoldRateTicker.jsx';
import HeroSection from '../components/HeroSection.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import { services, whyChoose } from '../data/siteData.js';

export default function Home() {
  const supportingServices = services.filter((service) => ['Documentation Support', 'Insurance Guidance', 'Customer Support'].includes(service.title));

  return (
    <AnimatedPage>
      <HeroSection />
      <CounterSection />
      <GoldRateTicker />

      <section className="section-pad bg-ivory">
        <div className="container-max">
          <SectionHeading
            align="left"
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

      <section className="border-y border-emeraldDeep/10 bg-white px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="container-max">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeading
              align="left"
              eyebrow="Additional Support"
              title="Useful help beyond the loan enquiry"
              text="Our team can also assist with the practical details that surround vehicle ownership and finance."
            />
            <div className="grid border-t border-emeraldDeep/15 sm:grid-cols-2">
              {supportingServices.map((service, index) => (
                <ServiceCard key={service.title} {...service} delay={index * 0.05} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-mist">
        <div className="container-max grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <p className="eyebrow">Our Approach</p>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-bold leading-tight text-charcoal sm:text-4xl">A clear path from enquiry to informed decision.</h2>
            <p className="mt-5 max-w-xl leading-8 text-charcoal/70">Start with a conversation about your vehicle or gold finance requirement. We explain the next steps, documents, and repayment considerations in plain language.</p>
          </Reveal>
          <div className="grid border-t border-emeraldDeep/15 sm:grid-cols-2">
            {whyChoose.map((item) => (
              <div key={item} className="flex items-start gap-3 border-b border-emeraldDeep/15 py-4 sm:px-4">
                <FaCheckCircle className="mt-1 shrink-0 text-gold" aria-hidden="true" />
                <span className="text-sm font-bold text-emeraldDeep">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
}
