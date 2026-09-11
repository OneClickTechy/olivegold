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
  'terms/index.html',
  'process/index.html',
  'about.html',
  'services.html',
  'contact.html',
  'gallery.html',
  'terms.html',
  'process.html',
  '404.html'
];

let errors = 0;
let jsonLdCount = 0;
let imgCount = 0;

console.log('=== OLIVE GOLD AUDIT & INTEGRITY CHECK ===\n');

files.forEach(relPath => {
  const fullPath = path.resolve(__dirname, relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`[FAIL] MISSING FILE: ${relPath}`);
    errors++;
    return;
  }
  const html = fs.readFileSync(fullPath, 'utf8');

  // Check JSON-LD
  const jsonLdMatches = [...html.matchAll(/<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];
  jsonLdMatches.forEach(m => {
    jsonLdCount++;
    try {
      const parsed = JSON.parse(m[1]);
      if (!parsed['@context'] || !parsed['@graph']) {
        console.warn(`[WARN] ${relPath} JSON-LD missing @context or @graph`);
      }
    } catch (e) {
      console.error(`[FAIL] INVALID JSON-LD in ${relPath}: ${e.message}`);
      errors++;
    }
  });

  // Check canonical
  if (!html.includes('rel="canonical"')) {
    console.warn(`[WARN] No canonical tag found in ${relPath}`);
  }

  // Check images
  const dir = path.dirname(fullPath);
  const imgMatches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)];
  imgMatches.forEach(m => {
    const src = m[1];
    if (src.startsWith('data:') || src.startsWith('http') || src === '') return;
    imgCount++;
    const resolvedImg = path.resolve(dir, src);
    if (!fs.existsSync(resolvedImg)) {
      console.error(`[FAIL] Broken image in ${relPath}: ${src} -> ${resolvedImg}`);
      errors++;
    }
  });

  // Check title and H1 (except 301 redirects)
  if (!relPath.endsWith('.html') || relPath === 'index.html' || relPath === '404.html') {
    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    if (!titleMatch) {
      console.warn(`[WARN] Missing <title> in ${relPath}`);
    }
    if (!h1Match) {
      console.warn(`[WARN] Missing <h1> in ${relPath}`);
    }
  }
});

console.log(`Validated: ${files.length} HTML files`);
console.log(`JSON-LD Blocks Checked: ${jsonLdCount}`);
console.log(`Image References Checked: ${imgCount}`);
console.log(`Total Errors: ${errors}`);

if (errors === 0) {
  console.log('\n>>> ALL CHECKS PASSED PERFECTLY! <<<');
} else {
  process.exit(1);
}
