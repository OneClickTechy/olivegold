import re

# 1. Update CSS
css_files = ['styles.css', 'styles.min.css']
for css_file in css_files:
    try:
        with open(css_file, 'r', encoding='utf-8') as f:
            content = f.read()
        content = content.replace('#737D77', '#5A655F') # text-muted
        content = content.replace('#9A7B20', '#806419') # gold-dark
        with open(css_file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {css_file}')
    except FileNotFoundError:
        pass

# 2. Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Fix aria-hidden focus
html = html.replace('<aside class="mobile-nav-drawer" aria-label="Mobile Navigation" aria-hidden="true">', '<aside class="mobile-nav-drawer" aria-label="Mobile Navigation" aria-hidden="true" inert>')
html = html.replace('id="ogWaChatWindow" class="og-wa-window" role="dialog" aria-modal="true" aria-label="Olive Gold WhatsApp Concierge Chat" aria-hidden="true"', 'id="ogWaChatWindow" class="og-wa-window" role="dialog" aria-modal="true" aria-label="Olive Gold WhatsApp Concierge Chat" aria-hidden="true" inert')

# Fix aria-prohibited-attr (span with aria-label without role)
html = html.replace('<span class="bento-expand-circle" aria-label="Expand image">', '<span class="bento-expand-circle" aria-hidden="true">')

# Fix aria-required-children (gallery filter bar)
html = html.replace('class="gallery-filter-btn active"', 'class="gallery-filter-btn active" role="tab" aria-selected="true"')
html = html.replace('class="gallery-filter-btn"', 'class="gallery-filter-btn" role="tab" aria-selected="false"')

# Fix label-content-name-mismatch
html = html.replace('aria-label="Call Olive Gold Concierge"', 'aria-label="Call Now - Olive Gold Concierge"')
html = html.replace('aria-label="Step 1: Visible Evaluation"', 'aria-label="01 Visible Evaluation - Step 1"')
html = html.replace('aria-label="Step 2: German XRF Assay"', 'aria-label="02 German XRF Assay - Step 2"')
html = html.replace('aria-label="Step 3: Live Rate Formula"', 'aria-label="03 Live Rate Formula - Step 3"')
html = html.replace('aria-label="Step 4: Instant Cashout"', 'aria-label="04 Instant Cashout - Step 4"')
html = html.replace('aria-label="Open WhatsApp Live Chat"', 'aria-label="WhatsApp"') 

# Fix performance - Video preload
html = html.replace('preload="metadata"', 'preload="none"') 

# Make sure LCP image is not lazy loaded. It was fetchpriority="high" already.
html = re.sub(r'(<img[^>]*src="assets/images/hero-lookbook-gold\.webp"[^>]*)loading="lazy"', r'\1', html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Updated index.html')

# 3. Update main.js
js_files = ['main.js', 'main.min.js']
for js_file in js_files:
    try:
        with open(js_file, 'r', encoding='utf-8') as f:
            js = f.read()
        js = js.replace("mobileDrawer.setAttribute('aria-hidden', 'false');", "mobileDrawer.setAttribute('aria-hidden', 'false');\n    mobileDrawer.removeAttribute('inert');")
        js = js.replace("mobileDrawer.setAttribute('aria-hidden', 'true');", "mobileDrawer.setAttribute('aria-hidden', 'true');\n    mobileDrawer.setAttribute('inert', '');")
        
        js = js.replace("chatWindow.setAttribute('aria-hidden', 'false');", "chatWindow.setAttribute('aria-hidden', 'false');\n    chatWindow.removeAttribute('inert');")
        js = js.replace("chatWindow.setAttribute('aria-hidden', 'true');", "chatWindow.setAttribute('aria-hidden', 'true');\n    chatWindow.setAttribute('inert', '');")
        with open(js_file, 'w', encoding='utf-8') as f:
            f.write(js)
        print(f'Updated {js_file}')
    except FileNotFoundError:
        pass
