const fs = require('fs');
const path = require('path');

const targetDir = __dirname;

const gaSnippet = `
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-D9BVHQNGMC"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-D9BVHQNGMC');
    </script>
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

    // Inject GA snippet if not exists
    if (!content.includes('G-D9BVHQNGMC') && content.includes('<head>')) {
        content = content.replace('<head>', '<head>\n' + gaSnippet);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log("Added GA to " + file);
    }
});

console.log('Finished injecting GA snippets.');
