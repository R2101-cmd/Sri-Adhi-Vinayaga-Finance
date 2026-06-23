import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import AnimatedPage from '../components/AnimatedPage.jsx';
import AvailabilityBadge from '../components/AvailabilityBadge.jsx';
import { supabase, supabaseConfigured } from '../services/supabase.js';

export default function VehicleDetails() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(supabaseConfigured);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!supabaseConfigured) return;

    async function loadVehicle() {
      const { data, error } = await supabase
        .from('vehicles')
        .select('id, vehicle_name, vehicle_model, short_description, availability_status, photo_url, updated_at, created_at')
        .eq('id', id)
        .single();

      if (error) {
        setMessage(error.message.includes('schema cache') ? 'Please run supabase-schema.sql in Supabase to create the vehicles table.' : error.message);
      } else {
        setVehicle(data);
      }

      setLoading(false);
    }

    loadVehicle();
  }, [id]);

  return (
    <AnimatedPage>
      <section className="section-pad">
        <div className="container-max">
          <Link className="focus-ring inline-flex items-center gap-2 rounded-md px-3 py-2 font-bold text-emeraldDeep transition hover:bg-gold/15" to="/gallery">
            <FaArrowLeft />
            Gallery
          </Link>

          {loading ? (
            <div className="grid min-h-[45vh] place-items-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-emeraldDeep/15 border-t-gold" />
            </div>
          ) : vehicle ? (
            <div className="mt-6 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
              <div className="overflow-hidden rounded-lg border border-emeraldDeep/10 bg-white shadow-sm">
                <div className="aspect-[4/3] bg-mist">
                  {vehicle.photo_url ? (
                    <img className="h-full w-full object-cover" src={vehicle.photo_url} alt={vehicle.vehicle_name} />
                  ) : (
                    <div className="grid h-full place-items-center px-6 text-center text-sm font-bold uppercase tracking-[0.16em] text-charcoal/35">Photo coming soon</div>
                  )}
                </div>
              </div>

              <div>
                <p className="eyebrow">Vehicle Details</p>
                <h1 className="mt-3 font-display text-4xl font-extrabold text-charcoal sm:text-5xl">{vehicle.vehicle_name}</h1>
                <div className="mt-5">
                  <AvailabilityBadge status={vehicle.availability_status} />
                </div>
                <dl className="mt-7 grid gap-4">
                  <div className="rounded-lg bg-white p-5 shadow-sm">
                    <dt className="text-xs font-extrabold uppercase tracking-[0.16em] text-gold">Model</dt>
                    <dd className="mt-2 text-2xl font-extrabold text-emeraldDeep">{vehicle.vehicle_model}</dd>
                  </div>
                  <div className="rounded-lg bg-white p-5 shadow-sm">
                    <dt className="text-xs font-extrabold uppercase tracking-[0.16em] text-gold">Description</dt>
                    <dd className="mt-2 leading-8 text-charcoal/72">{vehicle.short_description}</dd>
                  </div>
                </dl>
              </div>
            </div>
          ) : (
            <p className="mt-8 rounded-md bg-red-50 px-4 py-3 font-bold text-red-700">{message || 'Vehicle not found.'}</p>
          )}
        </div>
      </section>
    </AnimatedPage>
  );
}

