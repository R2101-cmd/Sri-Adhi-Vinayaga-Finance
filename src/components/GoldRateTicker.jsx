import { useEffect, useMemo, useState } from 'react';
import { FaCoins, FaGem, FaSyncAlt } from 'react-icons/fa';

const REFRESH_MS = 60_000;
const DEFAULT_GOLD_URL = '/api/gold-rate';

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatUpdatedTime(value) {
  return new Intl.DateTimeFormat('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: 'short',
    timeZone: 'Asia/Kolkata',
  }).format(value);
}

export default function GoldRateTicker() {
  const [rates, setRates] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [status, setStatus] = useState('loading');
  const [rateDate, setRateDate] = useState(null);

  const sourceUrl = useMemo(() => import.meta.env.VITE_GOLD_RATE_API_URL || DEFAULT_GOLD_URL, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadGoldRate() {
      try {
        setStatus((current) => (current === 'ready' ? 'refreshing' : 'loading'));

        const goldResponse = await fetch(sourceUrl, { signal: controller.signal });
        if (!goldResponse.ok) {
          throw new Error('Gold price source did not respond');
        }

        const payload = await goldResponse.json();
        const carat24 = Number(payload?.gold?.carat24);
        const carat22 = Number(payload?.gold?.carat22);
        const silverGram = Number(payload?.silver?.gram);
        const silverKilogram = Number(payload?.silver?.kilogram);

        if (!Number.isFinite(carat24) || !Number.isFinite(carat22) || !Number.isFinite(silverGram)) {
          throw new Error('Gold price source returned invalid data');
        }

        setRates({
          gold: { carat24, carat22 },
          silver: { gram: silverGram, kilogram: silverKilogram },
        });
        setRateDate(payload?.rateDate ?? null);
        setUpdatedAt(payload?.fetchedAt ? new Date(payload.fetchedAt) : new Date());
        setStatus('ready');
      } catch (error) {
        if (error.name !== 'AbortError') {
          setStatus('error');
        }
      }
    }

    loadGoldRate();
    const intervalId = window.setInterval(loadGoldRate, REFRESH_MS);

    return () => {
      controller.abort();
      window.clearInterval(intervalId);
    };
  }, [sourceUrl]);

  return (
    <div className="mt-8 w-full max-w-2xl rounded-lg border border-emerald-800/20 bg-emerald-900/40 p-4 text-ivory shadow-glow backdrop-blur-none sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-gold text-charcoal">
            <FaCoins />
          </span>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-black">Erode Gold & Silver Rate</p>
            <p className="mt-1 text-sm text-black/72">From Goodreturns, refreshes every minute</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-ivory/66">
          <FaSyncAlt className={status === 'refreshing' || status === 'loading' ? 'animate-spin text-gold' : 'text-gold'} />
          {status === 'error' ? 'Update paused' : 'Live update'}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-md bg-ivory/10 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-ivory/60">24K per gram</p>
          <p className="mt-2 text-2xl font-extrabold text-black">{rates ? formatCurrency(rates.gold.carat24) : 'Loading'}</p>
        </div>
        <div className="rounded-md bg-ivory/10 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-ivory/60">22K per gram</p>
          <p className="mt-2 text-2xl font-extrabold text-black">{rates ? formatCurrency(rates.gold.carat22) : 'Loading'}</p>
          {rates?.gold.carat18 ? <p className="mt-1 text-xs font-semibold text-ivory/60">18K: {formatCurrency(rates.gold.carat18)}</p> : null}
        </div>
        <div className="rounded-md bg-ivory/10 p-4">
          <div className="flex items-center gap-2">
            <FaGem className="text-ivory/70" />
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-ivory/60">Silver per gram</p>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-black">{rates ? formatCurrency(rates.silver.gram) : 'Loading'}</p>
          {rates?.silver.kilogram ? <p className="mt-1 text-xs font-semibold text-ivory/60">1 kg: {formatCurrency(rates.silver.kilogram)}</p> : null}
        </div>
      </div>

      <p className="mt-4 text-sm text-ivory/66">
        Rate date: {rateDate ?? 'Today'} | Last updated: {updatedAt ? `${formatUpdatedTime(updatedAt)} IST` : status === 'error' ? 'Unable to fetch now' : 'Fetching latest rate'}
      </p>
    </div>
  );
}
