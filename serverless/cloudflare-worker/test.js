/**
 * Local Test Runner for worker.js
 * Run using: node .\serverless\cloudflare-worker\test.js
 */
import worker from './worker.js';

async function testWorker() {
  console.log('🚀 Testing Olive Gold Worker (Pure JSON API)...\n');

  // Mock Cloudflare Worker event objects
  const mockRequest = new Request('http://localhost:8787/api/rates', {
    method: 'GET',
    headers: { 'Accept': 'application/json' }
  });
  const mockEnv = {
    GOLD_API_KEY: process.env.GOLD_API_KEY || ''
  };
  const mockCtx = { waitUntil: (promise) => promise };

  try {
    const startTime = Date.now();
    const response = await worker.fetch(mockRequest, mockEnv, mockCtx);
    const duration = Date.now() - startTime;
    const json = await response.json();

    console.log(`✅ Status: ${response.status} ${response.statusText || 'OK'} (${duration}ms)`);
    console.log(`🌐 CORS Header: ${response.headers.get('access-control-allow-origin')}`);
    console.log(`📊 API Source: ${json.source}`);
    console.log(`📅 Today's Date: ${json.formattedDate}`);
    console.log(`💎 Live 24K Rate: ₹ ${json.rates['24k'].toLocaleString('en-IN')} / gram`);
    console.log(`💎 Live 22K Rate: ₹ ${json.rates['22k'].toLocaleString('en-IN')} / gram`);
    console.log(`💎 Live 18K Rate: ₹ ${json.rates['18k'].toLocaleString('en-IN')} / gram`);
    console.log('\n--- FULL JSON PAYLOAD ---');
    console.log(JSON.stringify(json, null, 2));
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testWorker();
