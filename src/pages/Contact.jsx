import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import AnimatedPage from '../components/AnimatedPage.jsx';
import ContactForm from '../components/ContactForm.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { business } from '../data/siteData.js';

const mapSrc =
  'https://www.google.com/maps?q=183%20Pappathikadu%20II%20Street%20Municipal%20Colony%20Main%20Road%20Erode%20Tamil%20Nadu%20638004&output=embed';

export default function Contact() {
  return (
    <AnimatedPage>
      <section className="section-pad">
        <div className="container-max">
          <SectionHeading
            eyebrow="Contact"
            title="Start your vehicle finance enquiry"
            text="Share your requirement and our team will guide you through consultation, documentation, finance options, and the next steps."
          />
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <div className="rounded-lg bg-emeraldDeep p-7 text-ivory shadow-premium">
                <h1 className="font-display text-3xl font-extrabold text-gold">{business.name}</h1>
                <div className="mt-7 grid gap-5">
                  <p className="flex gap-4 leading-8 text-ivory/82">
                    <FaMapMarkerAlt className="mt-1 shrink-0 text-gold" />
                    {business.address}
                  </p>
                  <p className="flex gap-4 text-ivory/82">
                    <FaPhoneAlt className="text-gold" />
                    Visit our office for mobile enquiry details
                  </p>
                  <p className="flex gap-4 text-ivory/82">
                    <FaEnvelope className="text-gold" />
                    Customer finance consultation available
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8 lg:px-12 lg:pb-24">
        <div className="container-max overflow-hidden rounded-lg border border-emeraldDeep/10 shadow-premium">
          <iframe
            title="Sri Adhi Vinayaga Auto Consulting & Finance map"
            src={mapSrc}
            className="h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </AnimatedPage>
  );
}
