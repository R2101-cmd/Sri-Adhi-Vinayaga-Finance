import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import goldRateHandler from './api/gold-rate.js';

function createGoldRateResponse(response) {
  return {
    setHeader: (...args) => response.setHeader(...args),
    status(statusCode) {
      response.statusCode = statusCode;
      return this;
    },
    json(payload) {
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify(payload));
    },
  };
}

function localGoldRateApi() {
  const middleware = (request, response) => goldRateHandler(request, createGoldRateResponse(response));

  return {
    name: 'local-gold-rate-api',
    configureServer(server) {
      server.middlewares.use('/api/gold-rate', middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/gold-rate', middleware);
    },
  };
}

export default defineConfig({
  plugins: [react(), localGoldRateApi()],
});
