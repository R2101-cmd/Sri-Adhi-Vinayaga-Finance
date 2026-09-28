import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { FaArrowRight, FaPhoneAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { business } from '../data/siteData.js';

const heroImage =
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=85';

export default function HeroSection() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 680], [0, reduceMotion ? 0 : 26]);
  const imageScale = reduceMotion ? 1 : 1.035;

  return (
    <section className="relative min-h-[620px] overflow-hidden lg:min-h-[680px]">
      <motion.img
        className="absolute inset-0 h-full w-full object-cover"
        src={heroImage}
        alt="Finance professionals discussing customer documents"
        fetchPriority="high"
        style={{ y: imageY, scale: imageScale }}
        initial={reduceMotion ? false : { scale: 1.015 }}
        animate={reduceMotion ? undefined : { scale: imageScale }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="image-overlay absolute inset-0" />
      <div className="container-max relative z-10 flex min-h-[620px] items-center px-5 py-20 sm:px-8 lg:min-h-[680px] lg:px-12">
        <motion.div
          className="max-w-2xl text-ivory"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="eyebrow"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
          >
            Auto Consulting | Vehicle Finance | Gold Finance
          </motion.p>
          <motion.h1
            className="mt-5 max-w-xl font-display text-4xl font-bold leading-[1.12] sm:text-5xl lg:text-6xl"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            Drive Your Dreams With Trusted Vehicle Finance
          </motion.h1>
          <motion.p
            className="mt-5 max-w-xl text-xl font-semibold leading-8 text-gold sm:text-2xl"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.27, ease: [0.22, 1, 0.36, 1] }}
          >
            Gold &amp; Vehicle Finance, Made Simple
          </motion.p>
          <motion.p
            className="mt-4 max-w-xl text-base leading-8 text-ivory/85 sm:text-lg"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            Sri Adhi Vinayaga Auto Consulting &amp; Finance helps customers in Erode understand vehicle and gold finance options with practical, personal support.
          </motion.p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <motion.a
              className="button-motion focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-gold px-5 py-3 text-sm font-bold text-charcoal transition hover:bg-ivory active:scale-[0.98]"
              href={business.phoneHref}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
            >
              <FaPhoneAlt aria-hidden="true" />
              Call for guidance
            </motion.a>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.54, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link className="button-motion focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-ivory/55 px-5 py-3 text-sm font-bold text-ivory transition hover:bg-ivory hover:text-emeraldDeep active:scale-[0.98]" to="/services">
              View our services
              <FaArrowRight aria-hidden="true" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
