# Recommended Production Security & Performance Headers — Olive Gold Company

To protect brand reputation, user trust, and maximize Lighthouse / Core Web Vitals performance scores, configure the following response headers on your production web server or CDN (e.g., Apache, Nginx, Cloudflare, Netlify, or AWS CloudFront).

---

## 1. Security Headers Configuration

### A. HTTP Strict Transport Security (HSTS)
Enforces HTTPS communication and protects against SSL stripping attacks:
```http
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

### B. Content Security Policy (CSP)
Prevents cross-site scripting (XSS) and unauthorized code execution:
```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://unpkg.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: https:; frame-src 'self' https://www.google.com; connect-src 'self'; object-src 'none'; base-uri 'self';
```

### C. X-Content-Type-Options
Prevents MIME-sniffing:
```http
X-Content-Type-Options: nosniff
```

### D. X-Frame-Options
Protects against clickjacking attacks:
```http
X-Frame-Options: SAMEORIGIN
```

### E. Referrer-Policy
Controls referrer information sent to external sites:
```http
Referrer-Policy: strict-origin-when-cross-origin
```

### F. Permissions-Policy
Restricts access to hardware sensors and features:
```http
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
```

---

## 2. Asset Caching & Compression Rules

### A. Immutable Static Assets (Images, Fonts, CSS, JS)
Cache static media for 1 year with public availability:
```http
# Target: .webp, .png, .jpg, .jpeg, .woff2, .css, .js
Cache-Control: public, max-age=31536000, immutable
```

### B. HTML Documents
Always revalidate HTML to ensure immediate delivery of updates:
```http
# Target: .html, clean endpoints
Cache-Control: public, max-age=0, must-revalidate
```

### C. Gzip / Brotli Compression
Enable Brotli (`br`) and Gzip on:
- `text/html`
- `text/css`
- `application/javascript`
- `application/json`
- `image/svg+xml`

---

## 3. Server Configuration Examples

### Nginx (`nginx.conf` or site block):
```nginx
server {
    listen 443 ssl http2;
    server_name olivegold.co.in www.olivegold.co.in;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;

    # Static Caching
    location ~* \.(webp|png|jpg|jpeg|svg|css|js|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
        access_log off;
    }

    # Clean URL Directory Routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Apache (`.htaccess`):
```apache
<IfModule mod_headers.c>
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
</IfModule>

<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```
