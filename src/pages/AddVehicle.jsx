import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCloudUploadAlt, FaSave } from 'react-icons/fa';
import AnimatedPage from '../components/AnimatedPage.jsx';
import { supabase } from '../services/supabase.js';
import { uploadVehiclePhoto } from '../services/vehiclePhotos.js';

const initialForm = {
  vehicle_name: '',
  vehicle_model: '',
  short_description: '',
  availability_status: 'available',
};

function friendlyError(error) {
  if (!error) return '';
  if (error.message?.includes('schema cache')) {
    return 'Supabase cannot find public.vehicles yet. Open Supabase > SQL Editor and run supabase-schema.sql, then refresh this page.';
  }
  return error.message;
}

export default function AddVehicle() {
  const [form, setForm] = useState(initialForm);
  const [photo, setPhoto] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: 'idle', text: '' });
  const navigate = useNavigate();

  const previewUrl = useMemo(() => (photo ? URL.createObjectURL(photo) : ''), [photo]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setMessage({ type: 'idle', text: '' });

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      navigate('/employee/login', { replace: true });
      return;
    }

    const now = new Date().toISOString();
    const { data: inserted, error: insertError } = await supabase
      .from('vehicles')
      .insert({
        ...form,
        vehicle_name: form.vehicle_name.trim(),
        vehicle_model: form.vehicle_model.trim(),
        short_description: form.short_description.trim(),
        updated_by: userData.user.email,
        updated_at: now,
        created_at: now,
      })
      .select('id')
      .single();

    if (insertError) {
      setSaving(false);
      setMessage({ type: 'error', text: friendlyError(insertError) });
      return;
    }

    if (photo) {
      try {
        const photoUrl = await uploadVehiclePhoto(inserted.id, photo);
        const { error: updateError } = await supabase.from('vehicles').update({ photo_url: photoUrl, updated_at: new Date().toISOString() }).eq('id', inserted.id);

        if (updateError) throw updateError;
      } catch (error) {
        setSaving(false);
        setMessage({ type: 'error', text: friendlyError(error) });
        return;
      }
    }

    navigate('/employee/dashboard', { replace: true });
  }

  return (
    <AnimatedPage>
      <section className="section-pad">
        <div className="container-max">
          <Link className="focus-ring inline-flex items-center gap-2 rounded-md px-3 py-2 font-bold text-emeraldDeep transition hover:bg-gold/15" to="/employee/dashboard">
            <FaArrowLeft />
            Dashboard
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="eyebrow">Add Vehicle</p>
              <h1 className="mt-3 font-display text-4xl font-extrabold text-charcoal sm:text-5xl">Create a showcase listing</h1>
              <div className="mt-6 overflow-hidden rounded-lg border border-emeraldDeep/10 bg-white shadow-sm">
                <div className="aspect-[4/3] bg-mist">
                  {previewUrl ? (
                    <img className="h-full w-full object-cover" src={previewUrl} alt="Vehicle preview" />
                  ) : (
                    <div className="grid h-full place-items-center px-6 text-center text-sm font-bold uppercase tracking-[0.16em] text-charcoal/35">Photo preview</div>
                  )}
                </div>
              </div>
            </div>

            <form className="rounded-lg border border-emeraldDeep/10 bg-white p-6 shadow-premium" onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <label className="grid gap-2 text-sm font-bold text-charcoal/70">
                  Vehicle Name
                  <input className="focus-ring rounded-md border border-emeraldDeep/15 px-4 py-3 outline-none" value={form.vehicle_name} onChange={(event) => updateField('vehicle_name', event.target.value)} required placeholder="Honda Activa" />
                </label>
                <label className="grid gap-2 text-sm font-bold text-charcoal/70">
                  Vehicle Model
                  <input className="focus-ring rounded-md border border-emeraldDeep/15 px-4 py-3 outline-none" value={form.vehicle_model} onChange={(event) => updateField('vehicle_model', event.target.value)} required placeholder="2024" />
                </label>
                <label className="grid gap-2 text-sm font-bold text-charcoal/70">
                  Short Description
                  <textarea className="focus-ring min-h-32 rounded-md border border-emeraldDeep/15 px-4 py-3 outline-none" value={form.short_description} onChange={(event) => updateField('short_description', event.target.value)} required placeholder="Reliable scooter suitable for city travel." />
                </label>
                <label className="grid gap-2 text-sm font-bold text-charcoal/70">
                  Availability
                  <select className="focus-ring rounded-md border border-emeraldDeep/15 px-4 py-3 outline-none" value={form.availability_status} onChange={(event) => updateField('availability_status', event.target.value)}>
                    <option value="available">Available</option>
                    <option value="unavailable">Not Available / Sold Out</option>
                  </select>
                </label>
                <label className="grid cursor-pointer place-items-center rounded-lg border-2 border-dashed border-emeraldDeep/20 bg-ivory px-5 py-8 text-center transition hover:border-gold">
                  <FaCloudUploadAlt className="text-4xl text-gold" />
                  <span className="mt-3 font-extrabold text-emeraldDeep">{photo ? photo.name : 'Upload vehicle photo'}</span>
                  <input className="sr-only" type="file" accept="image/*" onChange={(event) => setPhoto(event.target.files?.[0] || null)} />
                </label>
              </div>

              {message.text ? <p className="mt-5 rounded-md bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{message.text}</p> : null}

              <button className="focus-ring mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-gold px-5 py-3 font-extrabold text-charcoal transition hover:bg-emeraldDeep hover:text-ivory disabled:cursor-not-allowed disabled:opacity-70" type="submit" disabled={saving}>
                <FaSave />
                {saving ? 'Saving Vehicle' : 'Save Vehicle'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
}

