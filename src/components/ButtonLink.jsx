import { Link } from 'react-router-dom';

export default function ButtonLink({ to, children, variant = 'primary' }) {
  const styles =
    variant === 'secondary'
      ? 'border border-ivory/45 bg-ivory/10 text-ivory hover:bg-ivory hover:text-emeraldDeep'
      : 'gold-gradient text-charcoal shadow-glow hover:-translate-y-0.5';

  return (
    <Link
      to={to}
      className={`focus-ring inline-flex min-h-12 items-center justify-center rounded-md px-6 py-3 text-sm font-extrabold uppercase tracking-[0.12em] transition ${styles}`}
    >
      {children}
    </Link>
  );
}
