import re
with open('about.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace styles.css with styles.min.css
content = content.replace('href="styles.css"', 'href="styles.min.css"')

# 2. Replace main.js with main.min.js
content = content.replace('src="main.js"', 'src="main.min.js"')

# 3. Preload font-awesome and lenis
content = content.replace('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">', '<link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" as="style" onload="this.onload=null;this.rel=\'stylesheet\'"><noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"></noscript>')

content = content.replace('<link rel="stylesheet" href="https://unpkg.com/lenis@1.1.18/dist/lenis.css">', '<link rel="preload" href="https://unpkg.com/lenis@1.1.18/dist/lenis.css" as="style" onload="this.onload=null;this.rel=\'stylesheet\'"><noscript><link rel="stylesheet" href="https://unpkg.com/lenis@1.1.18/dist/lenis.css"></noscript>')

# 4. Remove loading="lazy" and add fetchpriority="high" to hero image
content = content.replace('<img src="assets/images/Olive-image-3.webp" alt="Olive Gold Company Founders and Atelier" width="1200" height="1600" loading="lazy" decoding="async">', '<img src="assets/images/Olive-image-3.webp" alt="Olive Gold Company Founders and Atelier" width="1200" height="1600" fetchpriority="high" decoding="async">')

with open('about.html', 'w', encoding='utf-8') as f:
    f.write(content)
