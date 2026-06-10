import Reveal from './Reveal.jsx';

export default function ServiceCard({ icon: Icon, title, text, delay = 0 }) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="group h-full rounded-lg border border-emeraldDeep/10 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-gold/60 hover:shadow-premium">
        <div className="grid h-14 w-14 place-items-center rounded-md bg-emeraldDeep text-2xl text-gold transition group-hover:bg-gold group-hover:text-charcoal">
          <Icon />
        </div>
        <h3 className="mt-6 text-xl font-extrabold text-charcoal">{title}</h3>
        <p className="mt-3 leading-7 text-charcoal/68">{text}</p>
      </article>
    </Reveal>
  );
}
