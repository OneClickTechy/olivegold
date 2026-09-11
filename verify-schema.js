const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  'about/index.html',
  'services/index.html',
  'services/old-gold/index.html',
  'services/broken-gold/index.html',
  'services/gold-valuation/index.html',
  'locations/t-nagar/index.html',
  'contact/index.html',
  'gallery/index.html',
  'terms/index.html'
];

console.log('=== OLIVE GOLD SCHEMA.ORG STRUCTURED DATA REPORT ===\n');

files.forEach(f => {
  const html = fs.readFileSync(path.resolve(__dirname, f), 'utf8');
  const match = html.match(/<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
  if (!match) {
    console.log(`[-] ${f}: NO JSON-LD`);
    return;
  }
  const data = JSON.parse(match[1]);
  const types = (data['@graph'] || []).map(item => item['@type']).join(', ');
  console.log(`[+] ${f}`);
  console.log(`    Entities: ${types}`);
});
