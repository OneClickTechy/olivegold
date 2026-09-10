/**
 * Native Local Development Server for worker.js (Zero Dependencies)
 * 
 * Why this exists:
 * Wrangler uses a C++ binary (workerd.exe) which can throw `spawn EFTYPE` on Windows.
 * This script runs worker.js directly in Node.js on `http://localhost:8787`.
 * 
 * Usage:
 *   node .\serverless\cloudflare-worker\dev-server.js
 */

import http from 'node:http';
import worker from './worker.js';

const PORT = process.env.PORT || 8787;

const server = http.createServer(async (req, res) => {
  // Construct Web standard Request object
  const fullUrl = `http://${req.headers.host || `localhost:${PORT}`}${req.url}`;
  
  let bodyBuffer = null;
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    bodyBuffer = Buffer.concat(chunks);
  }

  const workerReq = new Request(fullUrl, {
    method: req.method,
    headers: req.headers,
    body: bodyBuffer
  });

  // Mock Cloudflare Worker environment & execution context
  const env = {
    // Optional: override in .env or process.env
    GOLD_API_KEY: process.env.GOLD_API_KEY,
    MANUAL_22K_RATE: process.env.MANUAL_22K_RATE
  };
  const ctx = {
    waitUntil: (promise) => promise
  };

  try {
    const startTime = Date.now();
    const workerRes = await worker.fetch(workerReq, env, ctx);
    const duration = Date.now() - startTime;

    // Send HTTP headers
    const responseHeaders = Object.fromEntries(workerRes.headers.entries());
    res.writeHead(workerRes.status, responseHeaders);

    // Send response body
    const bodyText = await workerRes.text();
    res.end(bodyText);

    // Log request
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url} -> ${workerRes.status} (${duration}ms)`);
  } catch (err) {
    console.error('Server error:', err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: err.message }));
  }
});

server.listen(PORT, () => {
  console.log('\n======================================================');
  console.log('💎 Olive Gold Live Rate Dev Server Started!');
  console.log(`🚀 URL: http://localhost:${PORT}/api/rates`);
  console.log('⚡ Powered by: Yahoo Finance Pure JSON API');
  console.log('🛑 Press Ctrl+C to stop');
  console.log('======================================================\n');
});
