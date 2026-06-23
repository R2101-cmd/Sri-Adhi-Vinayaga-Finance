import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import ButtonLink from './ButtonLink.jsx';
import GoldRateTicker from './GoldRateTicker.jsx';
import { socialLinks } from '../data/siteData.js';

const heroImage =
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1800&q=85';

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      <img className="absolute inset-0 h-full w-full object-cover" src={heroImage} alt="Professional vehicle finance consultation" />
      <div className="image-overlay absolute inset-0" />
      <div className="container-max relative z-10 flex min-h-[calc(100vh-80px)] items-center px-5 py-16 sm:px-8 lg:px-12">
        <motion.div
          className="max-w-3xl text-ivory"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
        >
          <p className="eyebrow">Auto Consulting & Vehicle Finance</p>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">
            Drive Your Dreams With Trusted Vehicle Finance
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ivory/86 sm:text-xl">
            Quick approvals, transparent financing, expert consultation, and complete support for all your vehicle needs.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex gap-3">
              <a
                className="focus-ring grid h-12 w-12 place-items-center rounded-md border border-ivory/30 bg-ivory/10 text-xl text-ivory transition hover:bg-gold hover:text-charcoal"
                href={socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Open Instagram"
              >
                <FaInstagram />
              </a>
              <a
                className="focus-ring grid h-12 w-12 place-items-center rounded-md border border-ivory/30 bg-ivory/10 text-xl text-ivory transition hover:bg-gold hover:text-charcoal"
                href={socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Open Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                className="focus-ring grid h-12 w-12 place-items-center rounded-md border border-ivory/30 bg-ivory/10 text-xl text-ivory transition hover:bg-gold hover:text-charcoal"
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="Open WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
          <GoldRateTicker />
        </motion.div>
      </div>
    </section>
  );
}
