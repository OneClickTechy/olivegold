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

let linkErrors = 0;
let totalLinks = 0;

console.log('=== OLIVE GOLD LINK INTEGRITY CHECK ===\n');

files.forEach(relPath => {
  const fullPath = path.resolve(__dirname, relPath);
  const dir = path.dirname(fullPath);
  const html = fs.readFileSync(fullPath, 'utf8');

  const linkMatches = [...html.matchAll(/<a[^>]+href=["']([^"']+)["']/gi)];
  linkMatches.forEach(m => {
    const href = m[1];
    totalLinks++;

    // Ignore external, tel, mailto, whatsapp, javascript, hashes
    if (href.startsWith('http://') || href.startsWith('https://') || 
        href.startsWith('tel:') || href.startsWith('mailto:') || 
        href.startsWith('#') || href.startsWith('javascript:')) {
      return;
    }

    const cleanHref = href.split('#')[0];
    if (cleanHref === '') return;

    // Resolve file target
    let resolved;
    if (cleanHref.startsWith('/')) {
      resolved = path.resolve(__dirname, '.' + cleanHref);
    } else {
      resolved = path.resolve(dir, cleanHref);
    }

    let exists = fs.existsSync(resolved);
    if (!exists && fs.existsSync(path.join(resolved, 'index.html'))) {
      exists = true;
    }
    if (!exists && fs.existsSync(resolved + '.html')) {
      exists = true;
    }

    if (!exists) {
      console.error(`[LINK ERROR] In ${relPath}: broken link href="${href}" -> ${resolved}`);
      linkErrors++;
    }
  });
});

console.log(`Total Internal Links Analyzed: ${totalLinks}`);
console.log(`Link Errors: ${linkErrors}`);

if (linkErrors === 0) {
  console.log('\n>>> ZERO BROKEN INTERNAL LINKS! ALL LINKS RESOLVE TO EXISTING DESTINATIONS! <<<');
} else {
  process.exit(1);
}
