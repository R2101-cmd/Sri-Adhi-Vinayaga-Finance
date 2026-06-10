import Reveal from './Reveal.jsx';

export default function SectionHeading({ eyebrow, title, text, align = 'center' }) {
  return (
    <Reveal className={`mx-auto mb-10 max-w-3xl ${align === 'center' ? 'text-center' : 'text-left'}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 font-display text-3xl font-extrabold text-charcoal sm:text-4xl lg:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-base leading-8 text-charcoal/70 sm:text-lg">{text}</p>}
    </Reveal>
  );
}
