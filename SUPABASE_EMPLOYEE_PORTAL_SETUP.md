# Vehicle Showcase & Inventory Setup

## 1. Supabase Environment

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

Restart Vite after editing `.env`.

## 2. Fix The Missing Table Error

If you see this:

```text
Could not find the table 'public.vehicles' in the schema cache
```

Open Supabase > SQL Editor, paste the full contents of `supabase-schema.sql`, and click Run.

## 3. Database Table

The app uses `public.vehicles`:

- `id`
- `vehicle_name`
- `vehicle_model`
- `short_description`
- `availability_status`: `available` or `unavailable`
- `photo_url`
- `updated_by`
- `updated_at`
- `created_at`

## 4. Storage Bucket

The SQL creates a public Supabase Storage bucket:

```text
vehicle-photos
```

Images are uploaded into this bucket. The public gallery reads `photo_url` from the database, so when an employee changes a photo, the gallery shows the new image.

## 5. Authentication

1. Open Supabase > Authentication > Providers.
2. Keep Email enabled.
3. Open Authentication > Users.
4. Add employee users with email and password.

Only authenticated employees can create, update, delete, or upload vehicle photos.

## 6. Routes

- `/gallery`: public vehicle showcase.
- `/gallery/vehicle/:id`: public vehicle details.
- `/employee/login`: employee login.
- `/employee/dashboard`: protected inventory dashboard.
- `/employee/vehicle/new`: protected add vehicle form.
- `/employee/vehicle/:id/edit`: protected edit vehicle form.

## 7. Employee Workflow

1. Login at `/employee/login`.
2. Open `/employee/dashboard`.
3. Click Add Vehicle.
4. Enter vehicle name, model, description, status, and photo.
5. Save the vehicle.
6. The vehicle appears on `/gallery`.
7. Use Edit to update details or replace the photo.
8. Use Mark Sold / Mark Available to change status.
9. Use Delete to permanently remove the vehicle and its stored photo.

