import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { business, navLinks } from '../data/siteData.js';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-bold transition-colors duration-200 ${
      isActive ? 'bg-emeraldDeep text-ivory' : 'text-charcoal/80 hover:bg-gold/15 hover:text-emeraldDeep'
    }`;

  return (
    <header className={`glass-nav sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${scrolled ? 'bg-white shadow-sm' : 'shadow-none'}`}>
      <nav className="container-max flex min-h-20 items-center justify-between px-5 sm:px-8 lg:px-12">
        <NavLink to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-11 w-12 place-items-center overflow-hidden rounded-md bg-white">
            <img src="/logo.png" alt="Sri Adhi Vinayaga Finance logo" className="h-full w-full object-cover" />
          </span>
          <span className="max-w-[210px] text-lg font-black uppercase leading-5 tracking-[0.1em] text-emeraldDeep sm:max-w-none">
            {business.shortName}
          </span>
        </NavLink>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          className="button-motion focus-ring grid h-11 w-11 place-items-center rounded-md bg-emeraldDeep text-ivory active:scale-[0.98] lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-navigation"
            className="origin-top border-t border-emeraldDeep/10 bg-ivory px-5 py-4 shadow-sm lg:hidden"
            initial={reduceMotion ? false : { opacity: 0, scaleY: 0.96 }}
            animate={reduceMotion ? undefined : { opacity: 1, scaleY: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, scaleY: 0.96 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <div className="grid gap-2">
              {navLinks.map((link) => (
                <NavLink key={link.path} to={link.path} className={linkClass} onClick={() => setOpen(false)}>
                  {link.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
