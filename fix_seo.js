const fs = require('fs');
const path = require('path');

const targetDir = __dirname;

function getAllHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            // Ignore node_modules, .git, etc
            if (!file.includes('node_modules') && !file.includes('.git')) {
                results = results.concat(getAllHtmlFiles(file));
            }
        } else {
            if (file.endsWith('.html')) results.push(file);
        }
    });
    return results;
}

const htmlFiles = getAllHtmlFiles(targetDir);

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // 1. Fix Titles
    const titleRegex = /<title>(.*?)<\/title>/;
    const match = content.match(titleRegex);
    if (match) {
        let title = match[1];
        let originalTitle = title;

        if (title.includes('Cash for Gold in Chennai | Sell Gold for Best Value | Olive Gold')) {
            title = 'Sell Gold for Cash in Chennai | Best Value | Olive Gold'; // 55 chars
        } else if (title.includes('Gold Buying &amp; Valuation Services in Chennai | Olive Gold Company')) {
            title = 'Gold Buying &amp; Valuation Services Chennai | Olive Gold'; // 57 chars
        } else if (title.includes('Gold Buying & Valuation Services in Chennai | Olive Gold Company')) {
            title = 'Gold Buying & Valuation Services Chennai | Olive Gold';
        } else if (title.includes('How It Works: 4-Step Transparent Gold Valuation | Olive Gold Company Chennai')) {
            title = '4-Step Transparent Gold Valuation Process | Olive Gold'; // 54 chars
        } else if (title.includes('Contact Olive Gold Company | Pondy Bazaar, T. Nagar, Chennai Flagship')) {
            title = 'Contact Olive Gold | Pondy Bazaar, T. Nagar, Chennai'; // 52 chars
        } else if (title.includes('Sell Old Gold in Chennai | Instant Cash &amp; Best Market Value — Olive Gold')) {
            title = 'Sell Old Gold in Chennai | Instant Cash | Olive Gold'; // 52 chars
        } else if (title.includes('Sell Old Gold in Chennai | Instant Cash & Best Market Value — Olive Gold')) {
            title = 'Sell Old Gold in Chennai | Instant Cash | Olive Gold';
        } else if (title.includes('Sell Broken Gold &amp; Release Pledged Gold in Chennai | Olive Gold Company')) {
            title = 'Sell Broken &amp; Release Pledged Gold Chennai | Olive Gold'; // 59 chars
        } else if (title.includes('Sell Broken Gold & Release Pledged Gold in Chennai | Olive Gold Company')) {
            title = 'Sell Broken & Release Pledged Gold Chennai | Olive Gold';
        } else if (title.includes('Gold Valuation in Chennai | German XRF Laser Purity Testing — Olive Gold')) {
            title = 'Gold Valuation Chennai | German XRF Testing | Olive Gold'; // 56 chars
        } else if (title.includes('Gold Buyers in T Nagar, Chennai | Cash for Gold at Pondy Bazaar — Olive Gold')) {
            title = 'Gold Buyers T Nagar Chennai | Cash for Gold | Olive Gold'; // 56 chars
        } else if (title.includes('Terms &amp; Regulatory Compliance — Olive Gold Company Chennai')) {
            title = 'Terms &amp; Regulatory Compliance | Olive Gold Chennai';
        }

        if (title !== originalTitle) {
            content = content.replace(titleRegex, `<title>${title}</title>`);
            changed = true;
        }
    }

    // 2. Fix missing Twitter Card tags
    // Check if og:title exists but twitter:card is missing
    if (content.includes('og:title') && !content.includes('twitter:card')) {
        console.log(`Adding Twitter cards to ${file}`);
        
        const ogTitleMatch = content.match(/<meta property="og:title" content="(.*?)">/);
        const ogDescMatch = content.match(/<meta property="og:description"\s*content="(.*?)">/s);
        const ogImageMatch = content.match(/<meta property="og:image" content="(.*?)">/);
        
        let twitterTags = `\n    <!-- Twitter Card -->\n    <meta name="twitter:card" content="summary_large_image">\n`;
        if (ogTitleMatch) twitterTags += `    <meta name="twitter:title" content="${ogTitleMatch[1]}">\n`;
        if (ogDescMatch) twitterTags += `    <meta name="twitter:description" content="${ogDescMatch[1]}">\n`;
        if (ogImageMatch) twitterTags += `    <meta name="twitter:image" content="${ogImageMatch[1]}">\n`;
        
        // Insert right after the last og: tag
        const lastOgIndex = content.lastIndexOf('<meta property="og:');
        if (lastOgIndex !== -1) {
            const endOfLine = content.indexOf('>', lastOgIndex) + 1;
            content = content.slice(0, endOfLine) + twitterTags + content.slice(endOfLine);
            changed = true;
        }
    }

    // 3. Find images without width or height
    // We will do a regex to find <img ... > that don't have both width= and height=
    let imgRegex = /<img\s+[^>]*>/g;
    let imgMatches = content.match(imgRegex);
    if (imgMatches) {
        imgMatches.forEach(imgTag => {
            if (!imgTag.includes('width=') || !imgTag.includes('height=')) {
                console.log(`Missing width/height in ${file}: ${imgTag}`);
                // Add default width/height if it's the hero image or icon, just as a placeholder
                // Let's replace the tag by adding width="800" height="600" just to see what they are
                // But better to just log them for now so we can fix them precisely
            }
        });
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});

console.log('Done fixing HTML files.');
