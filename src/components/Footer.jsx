import { NavLink } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { business, navLinks, services, socialLinks } from '../data/siteData.js';

export default function Footer() {
  return (
    <footer className="bg-charcoal px-5 py-14 text-ivory sm:px-8 lg:px-12">
      <div className="container-max grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-gold">{business.shortName}</h2>
          <p className="mt-4 leading-7 text-ivory/70">
            Trusted auto consulting, vehicle finance, gold finance, loan consultation, documentation assistance and insurance guidance in Erode.
          </p>
          <div className="mt-6 flex gap-3">
            <a className="grid h-10 w-10 place-items-center rounded-md bg-ivory/10 text-gold transition hover:bg-gold hover:text-charcoal" href={socialLinks.facebook} target="_blank" rel="noreferrer" aria-label="Open Facebook">
              <FaFacebookF />
            </a>
            <a className="grid h-10 w-10 place-items-center rounded-md bg-ivory/10 text-gold transition hover:bg-gold hover:text-charcoal" href={socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Open Instagram">
              <FaInstagram />
            </a>
            <a className="grid h-10 w-10 place-items-center rounded-md bg-ivory/10 text-gold transition hover:bg-gold hover:text-charcoal" href={socialLinks.whatsapp} target="_blank" rel="noreferrer" aria-label="Open WhatsApp">
              <FaWhatsapp />
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-gold">Quick Links</h3>
          <div className="mt-4 grid gap-2">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className="text-ivory/72 transition hover:text-gold">
                {link.label}
              </NavLink>
            ))}
            <NavLink to="/employee/login" className="mt-2 inline-flex w-fit items-center rounded-md border border-gold/50 px-4 py-2 text-sm font-extrabold text-gold transition hover:bg-gold hover:text-charcoal">
              Employee Login
            </NavLink>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-gold">Services</h3>
          <div className="mt-4 grid gap-2">
            {services.slice(0, 6).map((service) => (
              <span key={service.title} className="text-ivory/72">
                {service.title}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-gold">Contact</h3>
          <p className="mt-4 flex gap-3 leading-7 text-ivory/72">
            <FaMapMarkerAlt className="mt-1 shrink-0 text-gold" />
            {business.address}
          </p>
          <p className="mt-4 flex gap-3 text-ivory/72">
            <FaPhoneAlt className="text-gold" />
            +91 90428 21165
          </p>
        </div>
      </div>
      <div className="container-max mt-10 border-t border-ivory/10 pt-6 text-center text-sm text-ivory/55">
        {business.copyright}
      </div>
    </footer>
  );
}
