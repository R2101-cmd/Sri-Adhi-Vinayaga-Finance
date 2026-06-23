import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaLock, FaSignInAlt } from 'react-icons/fa';
import AnimatedPage from '../components/AnimatedPage.jsx';
import { supabase } from '../services/supabase.js';

export default function EmployeeLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || '/employee/dashboard';

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate('/employee/dashboard', { replace: true });
    });
  }, [navigate]);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: 'loading', message: 'Signing in...' });

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setStatus({ type: 'error', message: error.message });
      return;
    }

    setStatus({ type: 'success', message: 'Login successful. Opening dashboard...' });
    navigate(redirectTo, { replace: true });
  }

  return (
    <AnimatedPage>
      <section className="section-pad">
        <div className="container-max grid min-h-[62vh] items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Employee Portal</p>
            <h1 className="mt-4 font-display text-4xl font-extrabold text-charcoal sm:text-6xl">Secure vehicle photo updates.</h1>
            <p className="mt-5 max-w-xl leading-8 text-charcoal/70">
              Sign in with your employee account to update gallery vehicle photos, review update history, and keep vehicle listings current.
            </p>
          </div>

          <form className="rounded-lg border border-emeraldDeep/10 bg-white p-6 shadow-premium sm:p-8" onSubmit={handleSubmit}>
            <div className="grid h-12 w-12 place-items-center rounded-md bg-emeraldDeep text-gold">
              <FaLock />
            </div>
            <h2 className="mt-5 text-2xl font-extrabold text-emeraldDeep">Employee Login</h2>
            <div className="mt-6 grid gap-4">
              <label className="grid gap-2 text-sm font-bold text-charcoal/70">
                Email
                <input className="focus-ring rounded-md border border-emeraldDeep/15 px-4 py-3 outline-none" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
              </label>
              <label className="grid gap-2 text-sm font-bold text-charcoal/70">
                Password
                <input className="focus-ring rounded-md border border-emeraldDeep/15 px-4 py-3 outline-none" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
              </label>
            </div>
            {status.message ? (
              <p className={`mt-4 rounded-md px-4 py-3 text-sm font-bold ${status.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-emeraldDeep/10 text-emeraldDeep'}`}>
                {status.message}
              </p>
            ) : null}
            <button className="focus-ring mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-gold px-5 py-3 font-extrabold text-charcoal transition hover:bg-emeraldDeep hover:text-ivory disabled:cursor-not-allowed disabled:opacity-70" type="submit" disabled={status.type === 'loading'}>
              <FaSignInAlt />
              {status.type === 'loading' ? 'Signing In' : 'Login'}
            </button>
          </form>
        </div>
      </section>
    </AnimatedPage>
  );
}

