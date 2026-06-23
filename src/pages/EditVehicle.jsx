import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaCloudUploadAlt, FaSave } from 'react-icons/fa';
import AnimatedPage from '../components/AnimatedPage.jsx';
import { supabase } from '../services/supabase.js';
import { removeVehiclePhoto, uploadVehiclePhoto } from '../services/vehiclePhotos.js';

function friendlyError(error) {
  if (!error) return '';
  if (error.message?.includes('schema cache')) {
    return 'Supabase cannot find public.vehicles yet. Open Supabase > SQL Editor and run supabase-schema.sql, then refresh this page.';
  }
  return error.message;
}

export default function EditVehicle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: 'idle', text: '' });

  const previewUrl = useMemo(() => (photo ? URL.createObjectURL(photo) : ''), [photo]);

  useEffect(() => {
    async function loadVehicle() {
      setLoading(true);
      const { data, error } = await supabase
        .from('vehicles')
        .select('id, vehicle_name, vehicle_model, short_description, availability_status, photo_url, updated_by, updated_at, created_at')
        .eq('id', id)
        .single();

      if (error) {
        setMessage({ type: 'error', text: friendlyError(error) });
      } else {
        setForm(data);
      }

      setLoading(false);
    }

    loadVehicle();
  }, [id]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!form) return;

    setSaving(true);
    setMessage({ type: 'idle', text: '' });

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      navigate('/employee/login', { replace: true });
      return;
    }

    let nextPhotoUrl = form.photo_url;

    try {
      if (photo) {
        nextPhotoUrl = await uploadVehiclePhoto(form.id, photo);
        await removeVehiclePhoto(form.photo_url);
      }

      const { data, error } = await supabase
        .from('vehicles')
        .update({
          vehicle_name: form.vehicle_name.trim(),
          vehicle_model: form.vehicle_model.trim(),
          short_description: form.short_description.trim(),
          availability_status: form.availability_status,
          photo_url: nextPhotoUrl,
          updated_by: userData.user.email,
          updated_at: new Date().toISOString(),
        })
        .eq('id', form.id)
        .select('id, vehicle_name, vehicle_model, short_description, availability_status, photo_url, updated_by, updated_at, created_at')
        .single();

      if (error) throw error;

      setForm(data);
      setPhoto(null);
      setMessage({ type: 'success', text: 'Vehicle updated successfully.' });
    } catch (error) {
      setMessage({ type: 'error', text: friendlyError(error) });
    }

    setSaving(false);
  }

  return (
    <AnimatedPage>
      <section className="section-pad">
        <div className="container-max">
          <Link className="focus-ring inline-flex items-center gap-2 rounded-md px-3 py-2 font-bold text-emeraldDeep transition hover:bg-gold/15" to="/employee/dashboard">
            <FaArrowLeft />
            Dashboard
          </Link>

          {loading ? (
            <div className="grid min-h-[45vh] place-items-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-emeraldDeep/15 border-t-gold" />
            </div>
          ) : form ? (
            <div className="mt-6 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="eyebrow">Edit Vehicle</p>
                <h1 className="mt-3 font-display text-4xl font-extrabold text-charcoal sm:text-5xl">{form.vehicle_name}</h1>
                <div className="mt-6 overflow-hidden rounded-lg border border-emeraldDeep/10 bg-white shadow-sm">
                  <div className="aspect-[4/3] bg-mist">
                    {previewUrl || form.photo_url ? (
                      <img className="h-full w-full object-cover" src={previewUrl || form.photo_url} alt={form.vehicle_name} />
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
                    <input className="focus-ring rounded-md border border-emeraldDeep/15 px-4 py-3 outline-none" value={form.vehicle_name} onChange={(event) => updateField('vehicle_name', event.target.value)} required />
                  </label>
                  <label className="grid gap-2 text-sm font-bold text-charcoal/70">
                    Vehicle Model
                    <input className="focus-ring rounded-md border border-emeraldDeep/15 px-4 py-3 outline-none" value={form.vehicle_model} onChange={(event) => updateField('vehicle_model', event.target.value)} required />
                  </label>
                  <label className="grid gap-2 text-sm font-bold text-charcoal/70">
                    Short Description
                    <textarea className="focus-ring min-h-32 rounded-md border border-emeraldDeep/15 px-4 py-3 outline-none" value={form.short_description} onChange={(event) => updateField('short_description', event.target.value)} required />
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
                    <span className="mt-3 font-extrabold text-emeraldDeep">{photo ? photo.name : 'Replace vehicle photo'}</span>
                    <input className="sr-only" type="file" accept="image/*" onChange={(event) => setPhoto(event.target.files?.[0] || null)} />
                  </label>
                </div>

                {message.text ? (
                  <p className={`mt-5 rounded-md px-4 py-3 text-sm font-bold ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-emeraldDeep/10 text-emeraldDeep'}`}>
                    {message.text}
                  </p>
                ) : null}

                <button className="focus-ring mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-gold px-5 py-3 font-extrabold text-charcoal transition hover:bg-emeraldDeep hover:text-ivory disabled:cursor-not-allowed disabled:opacity-70" type="submit" disabled={saving}>
                  <FaSave />
                  {saving ? 'Saving Changes' : 'Save Changes'}
                </button>
              </form>
            </div>
          ) : (
            <p className="mt-8 rounded-md bg-red-50 px-4 py-3 font-bold text-red-700">{message.text || 'Vehicle not found.'}</p>
          )}
        </div>
      </section>
    </AnimatedPage>
  );
}

