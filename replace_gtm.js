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

    // Replace the old GTM ID with the new one
    if (content.includes('GTM-5RL3DKCZ')) {
        content = content.replaceAll('GTM-5RL3DKCZ', 'GTM-MM34QM6K');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log("Updated GTM ID in " + file);
    }
});

console.log('Finished updating GTM IDs.');
