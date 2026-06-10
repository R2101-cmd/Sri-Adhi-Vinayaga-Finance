import { FaQuoteLeft } from 'react-icons/fa';
import { starArray } from '../data/siteData.js';
import Reveal from './Reveal.jsx';

export default function Testimonials({ items }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <Reveal key={item.name} delay={index * 0.05} className="h-full">
          <article className="h-full rounded-lg border border-emeraldDeep/10 bg-white p-7 shadow-sm">
            <FaQuoteLeft className="text-2xl text-gold" />
            <div className="mt-5 flex gap-1 text-gold">
              {starArray.map(({ id, icon: Star }) => (
                <Star key={id} />
              ))}
            </div>
            <p className="mt-5 leading-8 text-charcoal/76">"{item.quote}"</p>
            <div className="mt-7 border-t border-emeraldDeep/10 pt-5">
              <p className="font-extrabold text-emeraldDeep">{item.name}</p>
              <p className="text-sm text-charcoal/58">{item.role}</p>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
