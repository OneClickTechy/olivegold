const fs = require('fs');
const path = require('path');

const targetDir = __dirname;

const headSnippet = `
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-5RL3DKCZ');</script>
    <!-- End Google Tag Manager -->
`;

const bodySnippet = `
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5RL3DKCZ"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
`;

function getAllHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
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

    // Inject head snippet if not exists
    if (!content.includes('GTM-5RL3DKCZ') && content.includes('<head>')) {
        content = content.replace('<head>', '<head>\n' + headSnippet);
        changed = true;
    }

    // Inject body snippet if not exists
    if (content.includes('<body>') && !content.includes('<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5RL3DKCZ"')) {
        // match <body ...> in case of classes
        content = content.replace(/(<body[^>]*>)/i, '$1\n' + bodySnippet);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log("Added GTM to " + file);
    }
});

console.log('Finished injecting GTM snippets.');
