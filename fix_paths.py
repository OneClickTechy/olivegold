import os
import re

html_files = []
for root, _, files in os.walk('.'):
    for f in files:
        if f.endswith('.html'):
            html_files.append(os.path.join(root, f))

for filename in html_files:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix CSS
    content = re.sub(r'href=[\"\'\']styles\.min\.css[\"\'\']', 'href=\"/styles.min.css\"', content)
    content = re.sub(r'href=[\"\'\']styles\.css[\"\'\']', 'href=\"/styles.css\"', content)
    
    # Fix JS
    content = re.sub(r'src=[\"\'\']main\.min\.js[\"\'\']', 'src=\"/main.min.js\"', content)
    content = re.sub(r'src=[\"\'\']main\.js[\"\'\']', 'src=\"/main.js\"', content)
    
    # Fix assets
    content = re.sub(r'src=[\"\'\']assets/', 'src=\"/assets/', content)
    content = re.sub(r'href=[\"\'\']assets/', 'href=\"/assets/', content)

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
