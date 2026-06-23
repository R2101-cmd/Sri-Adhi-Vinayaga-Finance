import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaEdit, FaTrash } from 'react-icons/fa';
import AvailabilityBadge from './AvailabilityBadge.jsx';

function formatDate(value) {
  if (!value) return 'Not updated yet';
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

export default function VehicleCard({ vehicle, admin = false, onDelete, onToggleStatus, statusUpdating = false }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-emeraldDeep/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-premium">
      <Link to={admin ? `/employee/vehicle/${vehicle.id}/edit` : `/gallery/vehicle/${vehicle.id}`} className="block aspect-[4/3] overflow-hidden bg-mist">
        {vehicle.photo_url ? (
          <img className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src={vehicle.photo_url} alt={vehicle.vehicle_name} />
        ) : (
          <div className="grid h-full place-items-center px-6 text-center text-sm font-bold uppercase tracking-[0.16em] text-charcoal/35">
            No photo
          </div>
        )}
      </Link>
      <div className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-2xl font-extrabold text-emeraldDeep">{vehicle.vehicle_name}</h3>
            <p className="mt-1 text-sm font-bold text-charcoal/55">Model: {vehicle.vehicle_model}</p>
          </div>
          <AvailabilityBadge status={vehicle.availability_status} />
        </div>
        <p className="mt-4 line-clamp-3 leading-7 text-charcoal/68">{vehicle.short_description}</p>
        <div className="mt-4 grid gap-2 text-sm text-charcoal/65">
          <p className="flex items-center gap-2">
            <FaCalendarAlt className="text-gold" />
            {formatDate(vehicle.updated_at)}
          </p>
        </div>
        {admin ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <button className="focus-ring rounded-md border border-emeraldDeep/20 px-3 py-2 text-sm font-extrabold text-emeraldDeep transition hover:bg-emeraldDeep hover:text-ivory disabled:opacity-60" type="button" onClick={() => onToggleStatus?.(vehicle)} disabled={statusUpdating}>
              {vehicle.availability_status === 'available' ? 'Mark Sold' : 'Mark Available'}
            </button>
            <Link className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-emeraldDeep px-3 py-2 text-sm font-extrabold text-ivory transition hover:bg-charcoal" to={`/employee/vehicle/${vehicle.id}/edit`}>
              <FaEdit />
              Edit
            </Link>
            <button className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-red-600 px-3 py-2 text-sm font-extrabold text-white transition hover:bg-red-700" type="button" onClick={() => onDelete?.(vehicle)}>
              <FaTrash />
              Delete
            </button>
          </div>
        ) : (
          <Link className="focus-ring mt-5 inline-flex w-full justify-center rounded-md bg-emeraldDeep px-4 py-3 text-sm font-extrabold text-ivory transition hover:bg-charcoal" to={`/gallery/vehicle/${vehicle.id}`}>
            View Details
          </Link>
        )}
      </div>
    </article>
  );
}
