import { useEffect, useState } from 'react';
import AnimatedPage from '../components/AnimatedPage.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import VehicleCard from '../components/VehicleCard.jsx';
import { supabase, supabaseConfigured } from '../services/supabase.js';

export default function Gallery() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(supabaseConfigured);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!supabaseConfigured) return;

    async function loadVehicles() {
      const { data, error } = await supabase
        .from('vehicles')
        .select('id, vehicle_name, vehicle_model, short_description, availability_status, photo_url, updated_at')
        .order('created_at', { ascending: false });

      if (!error) {
        setVehicles(data || []);
      } else {
        setMessage(error.message.includes("schema cache") ? 'Gallery is ready. Please run supabase-schema.sql in Supabase to create the vehicles table.' : error.message);
      }

      setLoading(false);
    }

    loadVehicles();
  }, []);

  return (
    <AnimatedPage>
      <section className="section-pad">
        <div className="container-max">
          <SectionHeading
            eyebrow="Gallery"
            title="Vehicles, consultations, and ownership moments"
            text="A curated visual look at the customer journeys and professional finance environments that shape confident vehicle ownership."
          />
          {loading ? (
            <div className="mb-8 grid place-items-center py-8">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-emeraldDeep/15 border-t-gold" />
            </div>
          ) : null}
          {message ? <p className="mb-8 rounded-md bg-red-50 px-4 py-3 font-bold text-red-700">{message}</p> : null}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((vehicle, index) => (
              <Reveal key={vehicle.id} delay={index * 0.05}>
                <VehicleCard vehicle={vehicle} />
              </Reveal>
            ))}
          </div>
          {!loading && !message && vehicles.length === 0 ? (
            <p className="rounded-lg border border-emeraldDeep/10 bg-white px-5 py-8 text-center font-bold text-charcoal/60">
              No vehicles have been added yet.
            </p>
          ) : null}
        </div>
      </section>
    </AnimatedPage>
  );
}
