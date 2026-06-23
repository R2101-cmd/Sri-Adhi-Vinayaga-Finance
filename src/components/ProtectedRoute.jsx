import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '../services/supabase.js';

export default function ProtectedRoute({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setSession(data.session);
        setLoading(false);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="grid min-h-[55vh] place-items-center bg-ivory px-5 text-center">
        <div>
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-emeraldDeep/15 border-t-gold" />
          <p className="mt-4 text-sm font-bold uppercase tracking-[0.16em] text-emeraldDeep">Checking employee access</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/employee/login" replace state={{ from: location }} />;
  }

  return children;
}

