import { NavLink } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { business, navLinks, services } from '../data/siteData.js';

export default function Footer() {
  return (
    <footer className="bg-charcoal px-5 py-14 text-ivory sm:px-8 lg:px-12">
      <div className="container-max grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-gold">{business.shortName}</h2>
          <p className="mt-4 leading-7 text-ivory/70">
            Trusted auto consulting, vehicle finance, loan consultation, documentation assistance, and insurance guidance in Erode.
          </p>
          <div className="mt-6 flex gap-3">
            {[FaFacebookF, FaInstagram, FaLinkedinIn].map((Icon, index) => (
              <a key={index} className="grid h-10 w-10 place-items-center rounded-md bg-ivory/10 text-gold transition hover:bg-gold hover:text-charcoal" href="#" aria-label="Social media">
                <Icon />
              </a>
            ))}
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
            Enquiry support available at office
          </p>
        </div>
      </div>
      <div className="container-max mt-10 border-t border-ivory/10 pt-6 text-center text-sm text-ivory/55">
        {business.copyright}
      </div>
    </footer>
  );
}
