import { motion, useReducedMotion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { business, socialLinks, stats } from '../data/siteData.js';

export default function CounterSection() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <section className="border-b border-emeraldDeep/10 bg-white px-5 py-5 sm:px-8 lg:px-12">
        <div className="container-max grid gap-3 text-sm text-emeraldDeep sm:grid-cols-3 sm:gap-6">
          <a className="focus-ring inline-flex items-start gap-3 border-l-2 border-gold px-3 py-1 transition hover:bg-gold/10" href={business.phoneHref}>
            <FaPhoneAlt className="mt-1 shrink-0 text-gold" aria-hidden="true" />
            <span><span className="block text-xs font-bold uppercase tracking-[0.1em] text-charcoal/55">Call for guidance</span>{business.phone}</span>
          </a>
          <a className="focus-ring inline-flex items-start gap-3 border-l-2 border-gold px-3 py-1 transition hover:bg-gold/10" href={socialLinks.whatsapp} target="_blank" rel="noreferrer">
            <FaWhatsapp className="mt-1 shrink-0 text-gold" aria-hidden="true" />
            <span><span className="block text-xs font-bold uppercase tracking-[0.1em] text-charcoal/55">WhatsApp enquiry</span>Message our team</span>
          </a>
          <div className="inline-flex items-start gap-3 border-l-2 border-gold px-3 py-1">
            <FaMapMarkerAlt className="mt-1 shrink-0 text-gold" aria-hidden="true" />
            <span><span className="block text-xs font-bold uppercase tracking-[0.1em] text-charcoal/55">Visit us in</span>Erode, Tamil Nadu</span>
          </div>
        </div>
      </section>

      <section className="bg-emeraldDeep px-5 py-10 text-ivory sm:px-8 lg:px-12" aria-label="Business information">
        <div className="container-max grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="border-l border-ivory/25 px-5 py-1 text-left"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-display text-3xl font-bold text-gold sm:text-4xl">{stat.value.toLocaleString('en-IN')}{stat.suffix}</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-ivory/70">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
