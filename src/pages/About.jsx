import { FaBalanceScale, FaGem, FaHandshake, FaHeart } from 'react-icons/fa';
import AnimatedPage from '../components/AnimatedPage.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';

const values = [
  { title: 'Trust', icon: FaHandshake },
  { title: 'Transparency', icon: FaBalanceScale },
  { title: 'Integrity', icon: FaGem },
  { title: 'Customer Satisfaction', icon: FaHeart },
];

const support = ['Best Financial Support', 'Easy Loan Processing', 'Customer-Friendly Service', 'Flexible Repayment Options'];

export default function About() {
  return (
    <AnimatedPage>
      <section className="emerald-gradient section-pad text-ivory">
        <div className="container-max grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">About Us</p>
            <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-6xl">Reliable finance assistance for confident vehicle ownership.</h1>
            <p className="mt-6 text-lg leading-8 text-ivory/78">
              Sri Adhi Vinayaga Auto Consulting & Finance is dedicated to helping customers achieve vehicle ownership through reliable financial services and expert consultation.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <img
              className="aspect-[4/3] w-full rounded-lg object-cover shadow-glow"
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85"
              alt="Finance consultants discussing documents"
            />
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-max grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Company Story"
              title="Ethical, transparent, and customer-focused"
              text="We provide financing assistance for new vehicles, used vehicles, two wheelers, and cars. Our work blends practical loan consultation with documentation support, insurance guidance, and clear advisory for customers across Erode and Tamil Nadu."
            />
          </Reveal>
          <div className="grid gap-5">
            <Reveal>
              <div className="rounded-lg bg-emeraldDeep p-7 text-ivory shadow-premium">
                <h3 className="text-xl font-extrabold text-gold">Mission</h3>
                <p className="mt-3 leading-8">To make vehicle ownership accessible through ethical, transparent, and customer-focused financial solutions.</p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="rounded-lg border border-emeraldDeep/10 bg-white p-7 shadow-sm">
                <h3 className="text-xl font-extrabold text-emeraldDeep">Vision</h3>
                <p className="mt-3 leading-8 text-charcoal/72">To become the most trusted auto finance and consulting partner in Tamil Nadu.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-pad bg-mist">
        <div className="container-max">
          <SectionHeading eyebrow="Our Values" title="Principles That Shape Every Consultation" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ title, icon: Icon }, index) => (
              <Reveal key={title} delay={index * 0.05}>
                <div className="rounded-lg bg-white p-7 text-center shadow-sm">
                  <Icon className="mx-auto text-3xl text-gold" />
                  <h3 className="mt-4 font-extrabold text-emeraldDeep">{title}</h3>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {support.map((item) => (
              <div key={item} className="rounded-md border border-gold/35 bg-ivory p-5 text-center font-bold text-charcoal">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
}
