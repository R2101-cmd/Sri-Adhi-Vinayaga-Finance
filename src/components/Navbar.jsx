import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { business, navLinks } from '../data/siteData.js';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-bold transition ${
      isActive ? 'bg-emeraldDeep text-ivory' : 'text-charcoal/80 hover:bg-gold/15 hover:text-emeraldDeep'
    }`;

  return (
    <header className="glass-nav sticky top-0 z-50">
      <nav className="container-max flex min-h-20 items-center justify-between px-5 sm:px-8 lg:px-12">
        <NavLink to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-11 w-12 place-items-center rounded-md bg-white overflow-hidden">
            <img src="/logo.png" alt="Logo" className="h-full w-full object-cover" />
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
          className="focus-ring grid h-11 w-11 place-items-center rounded-md bg-emeraldDeep text-ivory lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-emeraldDeep/10 bg-ivory px-5 py-4 shadow-premium lg:hidden">
          <div className="grid gap-2">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className={linkClass} onClick={() => setOpen(false)}>
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
