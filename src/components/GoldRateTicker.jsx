import { motion, useReducedMotion } from 'framer-motion';
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

function RateValue({ value, formatter }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.span
      key={value}
      initial={reduceMotion ? false : { opacity: 0.45, y: 4 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {formatter(value)}
    </motion.span>
  );
}

export default function GoldRateTicker() {
  const [rates, setRates] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [status, setStatus] = useState('loading');
  const [rateDate, setRateDate] = useState(null);
  const reduceMotion = useReducedMotion();
  const sourceUrl = useMemo(() => import.meta.env.VITE_GOLD_RATE_API_URL || DEFAULT_GOLD_URL, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadGoldRate() {
      try {
        setStatus((current) => (current === 'ready' ? 'refreshing' : 'loading'));
        const goldResponse = await fetch(sourceUrl, { signal: controller.signal });
        if (!goldResponse.ok) throw new Error('Gold price source did not respond');

        const payload = await goldResponse.json();
        const carat24 = Number(payload?.gold?.carat24);
        const carat22 = Number(payload?.gold?.carat22);
        const silverGram = Number(payload?.silver?.gram);
        const silverKilogram = Number(payload?.silver?.kilogram);
        if (!Number.isFinite(carat24) || !Number.isFinite(carat22) || !Number.isFinite(silverGram)) {
          throw new Error('Gold price source returned invalid data');
        }

        setRates({ gold: { carat24, carat22 }, silver: { gram: silverGram, kilogram: silverKilogram } });
        setRateDate(payload?.rateDate ?? null);
        setUpdatedAt(payload?.fetchedAt ? new Date(payload.fetchedAt) : new Date());
        setStatus('ready');
      } catch (error) {
        if (error.name !== 'AbortError') setStatus('error');
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
    <motion.section
      className="border-y border-emeraldDeep/10 bg-white px-5 py-10 sm:px-8 lg:px-12"
      aria-labelledby="gold-rate-heading"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container-max">
        <div className="flex flex-col gap-3 border-b border-emeraldDeep/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Market information</p>
            <h2 id="gold-rate-heading" className="mt-2 font-display text-2xl font-bold text-charcoal sm:text-3xl">Erode gold and silver rates</h2>
            <p className="mt-2 text-sm text-charcoal/65">Indicative rates from Goodreturns, refreshed every minute.</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-charcoal/55">
            <FaSyncAlt className={status === 'refreshing' || status === 'loading' ? 'animate-spin text-gold' : 'text-gold'} aria-hidden="true" />
            {status === 'error' ? 'Update paused' : status === 'loading' ? 'Loading rates' : 'Live update'}
          </div>
        </div>

        <div className="grid divide-y divide-emeraldDeep/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="py-5 sm:pr-6">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-charcoal/55">24K per gram</p>
            <p className="mt-2 text-2xl font-bold text-emeraldDeep">{rates ? <RateValue value={rates.gold.carat24} formatter={formatCurrency} /> : 'Loading'}</p>
          </div>
          <div className="py-5 sm:px-6">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-charcoal/55">22K per gram</p>
            <p className="mt-2 text-2xl font-bold text-emeraldDeep">{rates ? <RateValue value={rates.gold.carat22} formatter={formatCurrency} /> : 'Loading'}</p>
          </div>
          <div className="py-5 sm:pl-6">
            <div className="flex items-center gap-2">
              <FaGem className="text-gold" aria-hidden="true" />
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-charcoal/55">Silver per gram</p>
            </div>
            <p className="mt-2 text-2xl font-bold text-emeraldDeep">{rates ? <RateValue value={rates.silver.gram} formatter={formatCurrency} /> : 'Loading'}</p>
          </div>
        </div>

        <p className="mt-2 text-xs text-charcoal/55">
          Rate date: {rateDate ?? 'Today'} | Last updated: {updatedAt ? `${formatUpdatedTime(updatedAt)} IST` : status === 'error' ? 'Unable to fetch now' : 'Fetching latest rate'}
        </p>
      </div>
    </motion.section>
  );
}
