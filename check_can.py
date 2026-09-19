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
        match = re.search(r'<link[^>]*rel="canonical"[^>]*>', content)
        if match:
            print(f'{filename}: {match.group(0)}')
        else:
            print(f'{filename}: MISSING')
