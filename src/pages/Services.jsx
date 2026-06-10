import { FaCheckCircle } from 'react-icons/fa';
import AnimatedPage from '../components/AnimatedPage.jsx';
import FinanceCard from '../components/FinanceCard.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { financeFeatures, financeServices } from '../data/siteData.js';

const benefits = ['Fast Processing', 'Flexible EMI Plans', 'Competitive Interest Rates', 'Minimal Paperwork', 'Personalized Consultation'];

export default function Services() {
  return (
    <AnimatedPage>
      <section className="section-pad bg-mist">
        <div className="container-max">
          <SectionHeading
            eyebrow="Finance Services"
            title="Loan consultation for two wheelers, cars, used vehicles, and commercial needs"
            text="Our finance services are designed to simplify approval readiness, repayment planning, document preparation, and vehicle ownership decisions."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {financeServices.map((service, index) => (
              <FinanceCard key={service.title} {...service} delay={index * 0.05} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-max grid gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Benefits</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-5xl">Finance made easier from enquiry to approval.</h2>
            <p className="mt-5 leading-8 text-charcoal/70">
              We help customers compare options, understand EMI commitments, prepare essential documents, and move through loan steps with confidence.
            </p>
          </Reveal>
          <div className="grid gap-4">
            {benefits.map((item, index) => (
              <Reveal key={item} delay={index * 0.04}>
                <div className="flex items-center gap-4 rounded-lg border border-emeraldDeep/10 bg-white p-5 shadow-sm">
                  <FaCheckCircle className="text-gold" />
                  <span className="font-bold text-emeraldDeep">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="emerald-gradient section-pad text-ivory">
        <div className="container-max">
          <SectionHeading eyebrow="Finance Features" title="Transparent structures for real customer needs" text="Inspired by customer-first auto finance practices, our process emphasizes clarity, repayment support, and flexible loan guidance." />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {financeFeatures.map((feature) => (
              <div key={feature} className="rounded-lg border border-ivory/14 bg-ivory/8 p-6 text-center font-extrabold text-ivory">
                {feature}
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
}
