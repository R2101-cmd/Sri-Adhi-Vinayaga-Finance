export default function AvailabilityBadge({ status }) {
  const available = status === 'available';

  return (
    <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] ${available ? 'bg-emeraldDeep/10 text-emeraldDeep' : 'bg-red-50 text-red-700'}`}>
      {available ? 'Available' : 'Not Available'}
    </span>
  );
}

