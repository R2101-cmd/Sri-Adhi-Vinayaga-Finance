import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const GOODRETURNS_GOLD_URL = 'https://www.goodreturns.in/gold-rates/erode.html';
const GOODRETURNS_SILVER_URL = 'https://www.goodreturns.in/silver-rates/erode.html';

function parseRupeeValue(value) {
  const parsed = Number(String(value).replace(/[^\d.]/g, ''));
  return Number.isFinite(parsed) ? parsed : null;
}

function extractMetaDescription(html) {
  return html.match(/<meta\s+name="description"\s+content="([^"]+)"/i)?.[1] ?? '';
}

function extractTitleDate(html) {
  return html.match(/Price on ([^-]+?) - Goodreturns/i)?.[1]?.trim() ?? null;
}

function parseGoldPage(html) {
  const description = extractMetaDescription(html);
  const text = `${description} ${html.replace(/\s+/g, ' ')}`;
  const tableMatch = text.match(
    /Today Gold Price Per Gram in Erode \(INR\).*?<tr>\s*<td>\s*1\s*<\/td>\s*<td>\s*(?:₹|&#x20b9;)\s*([\d,]+).*?<\/td>\s*<td>\s*(?:₹|&#x20b9;)\s*([\d,]+).*?<\/td>\s*<td>\s*(?:₹|&#x20b9;)\s*([\d,]+)/i,
  );
  const proseMatch = text.match(
    /(?:gold price in Erode stands at|Today's gold price in Erode stands at)\s*₹\s*([\d,]+)\s*per gram for 24 karat gold.*?₹\s*([\d,]+)\s*per gram for 22 karat gold.*?₹\s*([\d,]+)\s*per gram for 18 karat gold/i,
  );
  const match = tableMatch ?? proseMatch;

  if (!match) {
    throw new Error('Unable to read Goodreturns gold rate');
  }

  return {
    carat24: parseRupeeValue(match[1]),
    carat22: parseRupeeValue(match[2]),
    carat18: parseRupeeValue(match[3]),
  };
}

function parseSilverPage(html) {
  const description = extractMetaDescription(html);
  const text = `${description} ${html.replace(/\s+/g, ' ')}`;
  const tableMatch = text.match(
    /Today Silver Price Per Gram\/Kg in Erode \(INR\).*?<tr>\s*<td>\s*1\s*<\/td>\s*<td>\s*(?:₹|&#x20b9;)\s*([\d,]+).*?<\/td>.*?<tr>\s*<td>\s*1000\s*<\/td>\s*<td>\s*(?:₹|&#x20b9;)\s*([\d,]+)/i,
  );
  const proseMatch = text.match(/price of silver in Erode today is\s*₹\s*([\d,]+)\s*per gram and\s*₹\s*([\d,]+)\s*per kilogram/i);
  const match = tableMatch ?? proseMatch;

  if (!match) {
    throw new Error('Unable to read Goodreturns silver rate');
  }

  return {
    gram: parseRupeeValue(match[1]),
    kilogram: parseRupeeValue(match[2]),
  };
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      Accept: 'text/html,application/xhtml+xml',
    },
  });

  if (!response.ok) {
    throw new Error(`Goodreturns request failed: ${response.status}`);
  }

  return response.text();
}

async function fetchGoldRate() {
  const [goldHtml, silverHtml] = await Promise.all([fetchText(GOODRETURNS_GOLD_URL), fetchText(GOODRETURNS_SILVER_URL)]);
  const gold = parseGoldPage(goldHtml);
  const silver = parseSilverPage(silverHtml);
  const rateDate = extractTitleDate(goldHtml) ?? extractTitleDate(silverHtml);

  return {
    location: 'Erode',
    gold,
    silver,
    rateDate,
    source: 'Goodreturns',
    sourceUrl: GOODRETURNS_GOLD_URL,
    silverSourceUrl: GOODRETURNS_SILVER_URL,
    fetchedAt: new Date().toISOString(),
  };
}

function goldRateMiddleware() {
  return {
    name: 'gold-rate-api',
    configureServer(server) {
      server.middlewares.use('/api/gold-rate', async (req, res) => {
        if (req.method !== 'GET') {
          res.statusCode = 405;
          res.end('Method Not Allowed');
          return;
        }

        try {
          const payload = await fetchGoldRate();
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Cache-Control', 'no-store');
          res.end(JSON.stringify(payload));
        } catch (error) {
          res.statusCode = 502;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: error.message }));
        }
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/gold-rate', async (req, res) => {
        if (req.method !== 'GET') {
          res.statusCode = 405;
          res.end('Method Not Allowed');
          return;
        }

        try {
          const payload = await fetchGoldRate();
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Cache-Control', 'no-store');
          res.end(JSON.stringify(payload));
        } catch (error) {
          res.statusCode = 502;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: error.message }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), goldRateMiddleware()],
});
