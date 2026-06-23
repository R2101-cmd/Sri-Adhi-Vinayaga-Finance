import { supabase } from './supabase.js';

const BUCKET = 'vehicle-photos';

export function getStoragePathFromUrl(url) {
  if (!url) return '';

  const cleanUrl = url.split('?')[0];
  const marker = `/${BUCKET}/`;
  const markerIndex = cleanUrl.indexOf(marker);

  if (markerIndex === -1) return '';
  return decodeURIComponent(cleanUrl.slice(markerIndex + marker.length));
}

export async function uploadVehiclePhoto(vehicleId, file) {
  const extension = file.name.split('.').pop() || 'jpg';
  const filePath = `${vehicleId}/${Date.now()}.${extension}`;
  const { error } = await supabase.storage.from(BUCKET).upload(filePath, file, {
    cacheControl: '3600',
    upsert: true,
  });

  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
  return `${data.publicUrl}?v=${Date.now()}`;
}

export async function removeVehiclePhoto(url) {
  const path = getStoragePathFromUrl(url);
  if (!path) return;
  await supabase.storage.from(BUCKET).remove([path]);
}

