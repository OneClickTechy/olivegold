import os
import re

html_files = []
for root, _, files in os.walk('.'):
    for f in files:
        if f.endswith('.html'):
            html_files.append(os.path.join(root, f))

for filename in html_files:
    with open(filename, 'r', encoding='utf-8') as f:
        html = f.read()

    # Fix aria-hidden focus
    html = html.replace('<aside class="mobile-nav-drawer" aria-label="Mobile Navigation" aria-hidden="true">', '<aside class="mobile-nav-drawer" aria-label="Mobile Navigation" aria-hidden="true" inert>')
    
    # Check if inert is already there to avoid duplicates
    wa_search = 'id="ogWaChatWindow" class="og-wa-window" role="dialog" aria-modal="true" aria-label="Olive Gold WhatsApp Concierge Chat" aria-hidden="true"'
    if wa_search in html and 'inert' not in html[html.find('ogWaChatWindow'):html.find('>', html.find('ogWaChatWindow'))]:
        html = html.replace(wa_search, wa_search + ' inert')

    # Fix label-content-name-mismatch
    html = html.replace('aria-label="Call Olive Gold Concierge"', 'aria-label="Call Now - Olive Gold Concierge"')
    html = html.replace('aria-label="Open WhatsApp Live Chat"', 'aria-label="WhatsApp"') 

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'Updated {filename}')
