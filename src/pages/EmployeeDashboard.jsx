import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaSignOutAlt } from 'react-icons/fa';
import AnimatedPage from '../components/AnimatedPage.jsx';
import SearchBar from '../components/SearchBar.jsx';
import VehicleCard from '../components/VehicleCard.jsx';
import { removeVehiclePhoto } from '../services/vehiclePhotos.js';
import { supabase } from '../services/supabase.js';

function friendlyError(error) {
  if (!error) return '';
  if (error.message?.includes('schema cache')) {
    return 'Supabase cannot find public.vehicles yet. Open Supabase > SQL Editor and run supabase-schema.sql, then refresh this page.';
  }
  return error.message;
}

export default function EmployeeDashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: 'idle', text: '' });
  const [statusUpdatingId, setStatusUpdatingId] = useState('');
  const navigate = useNavigate();

  async function loadVehicles() {
    setLoading(true);
    const { data, error } = await supabase
      .from('vehicles')
      .select('id, vehicle_name, vehicle_model, short_description, availability_status, photo_url, updated_by, updated_at, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      setMessage({ type: 'error', text: friendlyError(error) });
    } else {
      setMessage({ type: 'idle', text: '' });
      setVehicles(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadVehicles();
  }, []);

  const filteredVehicles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return vehicles;

    return vehicles.filter((vehicle) => {
      const searchableText = `${vehicle.vehicle_name} ${vehicle.vehicle_model} ${vehicle.short_description}`.toLowerCase();
      return searchableText.includes(normalizedQuery);
    });
  }, [query, vehicles]);

  async function handleToggleStatus(vehicle) {
    setStatusUpdatingId(vehicle.id);
    const nextStatus = vehicle.availability_status === 'available' ? 'unavailable' : 'available';
    const { data: userData } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('vehicles')
      .update({
        availability_status: nextStatus,
        updated_by: userData.user?.email || vehicle.updated_by,
        updated_at: new Date().toISOString(),
      })
      .eq('id', vehicle.id)
      .select('id, vehicle_name, vehicle_model, short_description, availability_status, photo_url, updated_by, updated_at, created_at')
      .single();

    if (error) {
      setMessage({ type: 'error', text: friendlyError(error) });
    } else {
      setVehicles((current) => current.map((item) => (item.id === vehicle.id ? data : item)));
      setMessage({ type: 'success', text: 'Availability status updated.' });
    }

    setStatusUpdatingId('');
  }

  async function handleDelete(vehicle) {
    const confirmed = window.confirm('Are you sure you want to delete this vehicle?');
    if (!confirmed) return;

    const { error } = await supabase.from('vehicles').delete().eq('id', vehicle.id);

    if (error) {
      setMessage({ type: 'error', text: friendlyError(error) });
      return;
    }

    await removeVehiclePhoto(vehicle.photo_url);
    setVehicles((current) => current.filter((item) => item.id !== vehicle.id));
    setMessage({ type: 'success', text: 'Vehicle deleted successfully.' });
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/employee/login', { replace: true });
  }

  return (
    <AnimatedPage>
      <section className="section-pad">
        <div className="container-max">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Employee Dashboard</p>
              <h1 className="mt-3 font-display text-4xl font-extrabold text-charcoal sm:text-5xl">Manage vehicle inventory</h1>
              <p className="mt-4 max-w-2xl leading-8 text-charcoal/70">Add vehicles, update details, replace photos, change availability, and remove sold inventory.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-gold px-5 py-3 font-extrabold text-charcoal transition hover:bg-emeraldDeep hover:text-ivory" to="/employee/vehicle/new">
                <FaPlus />
                Add Vehicle
              </Link>
              <button className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-emeraldDeep/20 px-5 py-3 font-extrabold text-emeraldDeep transition hover:bg-emeraldDeep hover:text-ivory" type="button" onClick={handleLogout}>
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </div>

          <div className="mt-8">
            <SearchBar value={query} onChange={setQuery} />
          </div>

          {message.text ? (
            <p className={`mt-6 rounded-md px-4 py-3 font-bold ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-emeraldDeep/10 text-emeraldDeep'}`}>
              {message.text}
            </p>
          ) : null}

          {loading ? (
            <div className="mt-12 grid place-items-center py-12">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-emeraldDeep/15 border-t-gold" />
            </div>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  admin
                  vehicle={vehicle}
                  onDelete={handleDelete}
                  onToggleStatus={handleToggleStatus}
                  statusUpdating={statusUpdatingId === vehicle.id}
                />
              ))}
            </div>
          )}

          {!loading && filteredVehicles.length === 0 ? (
            <p className="mt-8 rounded-lg border border-emeraldDeep/10 bg-white px-5 py-6 text-center font-bold text-charcoal/60">No vehicles found.</p>
          ) : null}
        </div>
      </section>
    </AnimatedPage>
  );
}

