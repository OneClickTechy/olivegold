# Comprehensive SEO, Technical SEO, Performance, Accessibility & Local SEO Audit
**Client:** Olive Gold Company  
**Website:** https://olivegold.co.in/  
**Market:** Chennai, Tamil Nadu, India  
**Audit Date:** September 2026  
**Auditor:** Senior Technical SEO Specialist, SEO Strategist, Web Performance Engineer & Accessibility Specialist  

---

## Executive Summary & Live vs. Local Environment Comparison

A thorough comparative inspection was conducted between the live production website (`https://olivegold.co.in/`) and the local development repository (`revamp_luxury`).

### Critical Environment Findings:
1. **Live Production Status:**
   - The live site is currently serving a legacy/older layout using the `Outfit` font, basic yellow sub-navigation, and rudimentary components.
   - `https://olivegold.co.in/robots.txt` returns **HTTP 404 (Not Found)**.
   - `https://olivegold.co.in/sitemap.xml` returns **HTTP 404 (Not Found)**.
   - Directory paths like `https://olivegold.co.in/about` and `https://olivegold.co.in/about/` return **HTTP 404 (Not Found)**; only direct `.html` endpoints (`about.html`, `services.html`, etc.) resolve.
   - Zero structured data (JSON-LD), zero canonical tags, and zero Open Graph / Twitter card tags are deployed on the live production site.

2. **Local Repository Status (`revamp_luxury`):**
   - Contains an advanced, high-fashion luxury digital atelier redesign utilizing editorial typography (`Cinzel`, `Cormorant Garamond`, `Plus Jakarta Sans`), Deep Forest Green (`#152D1C`) and Royal Champagne Gold (`#D4AF37`) visual identity, Lenis smooth scrolling, GSAP micro-animations, real-time gold calculator, interactive 3D cash-for-gold section, and verified Google customer reviews bento grid.
   - However, the local codebase inherits critical technical SEO deficiencies: missing canonicals, missing `robots.txt`, missing `sitemap.xml`, missing `404.html`, missing schema markup, unoptimized 5.17MB logo asset, missing image dimensions causing CLS, deprecated `<meta name="keywords">`, and missing dedicated search-intent service/location landing pages.

---

## 1. Current Technical SEO Issues

| URL / File | Problem | Severity | Why It Matters | Recommended Solution | Implementation Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/*` (Sitewide) | Missing `robots.txt` | **CRITICAL** | Crawlers (Googlebot, Bingbot) have no crawl directives, crawl delay instructions, or pointers to `sitemap.xml`, leading to inefficient crawl budget and indexation delays. | Create a standardized `robots.txt` at root allowing full crawl and specifying `sitemap.xml`. | Pending Implementation |
| `/*` (Sitewide) | Missing `sitemap.xml` | **CRITICAL** | Search engines cannot discover newly published or deeply linked pages systematically, hampering crawl discovery and ranking indexing. | Generate a standards-compliant XML sitemap listing canonical HTTPS 200 URLs with accurate lastmod dates. | Pending Implementation |
| All HTML Files | Missing `<link rel="canonical">` | **CRITICAL** | Risk of content dilution and duplicate content penalties between HTTP/HTTPS, trailing slash vs non-trailing slash, and `.html` vs clean URLs. | Add self-referencing absolute HTTPS canonical tags to every indexable page following a unified trailing-slash convention. | Pending Implementation |
| `index.html` | Deprecated `<meta name="keywords">` present | **MEDIUM** | Ignored by Google since 2009; presence signals outdated SEO hygiene and exposes internal keyword targeting to competitors. | Remove `<meta name="keywords">` tag entirely from `index.html` and any templates. | Pending Implementation |
| All HTML Files | Missing Open Graph & Twitter Social Metadata | **HIGH** | When shared on WhatsApp, Facebook, LinkedIn, X, or iMessage, URLs render without rich image previews, titles, or descriptions, severely damaging CTR. | Add complete Open Graph (`og:type`, `og:title`, `og:description`, `og:image`, `og:url`, `og:locale`, `og:site_name`) and Twitter card tags. | Pending Implementation |
| All HTML Files | Missing Schema.org JSON-LD Structured Data | **CRITICAL** | Prevents Google from establishing rich entity graph understanding, local pack relevance, and rich snippets (LocalBusiness, Organization, BreadcrumbList). | Inject validated JSON-LD `@graph` containing `LocalBusiness`, `Organization`, `WebSite`, and `Service` schemas. | Pending Implementation |
| `/*` (Sitewide) | Missing custom `404.html` | **HIGH** | Broken or mistyped links lead to generic server error pages, causing immediate user bounce with no brand retention or navigation path. | Create a luxury-branded, helpful `404.html` with direct links back to core services, contact desk, and phone CTAs. | Pending Implementation |
| Architecture | Flat root `.html` files without clean directory routes | **HIGH** | Subpages exist only as `services.html`, `about.html`, etc. Missing clean hierarchical directories (`/services/`, `/services/old-gold/`, `/locations/t-nagar/`). | Implement clean static directory architecture (`folder/index.html`) while preserving backwards-compatibility redirects for root `.html` files. | Pending Implementation |

---

## 2. Current On-Page SEO Analysis

### A. Homepage (`index.html`)
- **Current Title:** `Olive Gold Company — Sovereign Gold Liquidity & Market Valuation | Chennai`  
  *Issue:* Misses primary commercial search term "Cash for Gold in Chennai".  
  *Recommended Title:* `Cash for Gold in Chennai | Sell Gold for Best Value | Olive Gold`
- **Current Meta Description:** `Chennai's premier gold buyer. Highest market value, 100% non-destructive German XRF testing, instant cash or RTGS settlement, and pledged gold release.`  
  *Issue:* Good, but can be sharpened for local click-through intent.  
  *Recommended Description:* `Sell your old gold in Chennai with Olive Gold. Get transparent gold valuation, XRF purity testing, and quick payment at our Pondy Bazaar, T Nagar branch.`
- **Current H1:** `<h1 class="hero-editorial-headline">Your Precious Gold, Our Royal Valuation.</h1>`  
  *Issue:* Poetic and editorial, but completely devoid of primary target search keyword and city name.  
  *Recommended H1:* `Cash for Gold in Chennai – Get the Best Value for Your Gold`
- **Current H2/H3 Structure:**
  - `H2: Our Happy Customers` -> Can be semantically grouped under real customer liquidation moments.
  - `H2: Live Valuation Calculator` -> Strong interactive utility.
  - `H2: Sovereign Precious Metals Offerings` -> Good, can be refined to `Gold Buying Services in Chennai`.
  - `H2: Why Olive Gold Stands Apart` (Comparison table) -> Strong trust signal.
  - `H2: What Our Customers Say On Google` -> Excellent proof.
  - `H2: Instant Cash For Gold in 15 Minutes` -> Good CTA section.
  - `H2: Everything You Need to Know` -> FAQ heading, should be explicit: `Frequently Asked Questions About Selling Gold`.
- **Target Keyword:** `cash for gold Chennai`
- **Search Intent:** Commercial Investigation / Transactional
- **Canonical:** Missing (Target: `https://olivegold.co.in/`)
- **Indexability:** Indexable

### B. About Us Page (`about.html` / `about/index.html`)
- **Current Title:** `About Us — Olive Gold Company | Heritage of Royal Trust & Transparency`
- **Current Meta Description:** `Discover the legacy of trust, ethical values, and technological precision that makes Olive Gold Company Chennai's premier destination for gold valuation.`
- **Current H1:** `Architected on Trust, Purity & Goodwill`
- **Target Keyword:** `gold selling company Chennai`, `trusted gold buyers Chennai`
- **Search Intent:** Informational / Navigational / Brand Trust

### C. Services Portfolio (`services.html` / `services/index.html`)
- **Current Title:** `Our Services — Olive Gold Company | Instant Cash for Gold, Pledged Gold Release & XRF Testing`
- **Current Meta Description:** `Explore our full portfolio of services: Instant spot cash for gold, releasing pledged gold from banks, German XRF laser purity testing, fine silver buying, and private doorstep appraisals.`
- **Current H1:** `Sovereign Precious Metals Valuation`
- **Target Keyword:** `gold buyers in Chennai`
- **Search Intent:** Commercial Overview

### D. Missing Dedicated High-Intent Landing Pages:
1. **Sell Old Gold in Chennai (`/services/old-gold/index.html`)**
   - *Target Keyword:* `sell old gold Chennai`, `sell old gold in Chennai`
   - *Search Intent:* High-intent transactional
   - *Content Needed:* What constitutes old gold, zero melting loss explanation, weighing standards, instant RTGS/cash payout process.
2. **Sell Broken Gold in Chennai (`/services/broken-gold/index.html`)**
   - *Target Keyword:* `sell broken gold Chennai`, `scrap gold buyer Chennai`
   - *Search Intent:* Transactional
   - *Content Needed:* Valuation of broken ornaments, single earrings, damaged chains without melting penalty.
3. **Gold Valuation in Chennai (`/services/gold-valuation/index.html`)**
   - *Target Keyword:* `gold valuation Chennai`, `gold purity testing Chennai`
   - *Search Intent:* Informational / Commercial Investigation
   - *Content Needed:* Non-destructive German XRF spectrometry, karat verification (24K, 22K, 18K), digital scale precision to 0.001g.
4. **Local Hub: T Nagar Flagship (`/locations/t-nagar/index.html`)**
   - *Target Keyword:* `gold buyers T Nagar`, `cash for gold near me`, `gold buyers Pondy Bazaar`
   - *Search Intent:* High-intent Local / Geo-targeted
   - *Content Needed:* Physical address (110, Ranga Complex, Pondy Bazaar), landmarks (Naidu Hall, Panagal Park), parking details, public transport access, branch hours, Google Map, phone numbers.

---

## 3. Web Performance & Core Web Vitals (CWV)

### A. Largest Contentful Paint (LCP) Risks:
1. **Unoptimized Logo (`assets/logo.png`):**
   - File size: **5,179,341 bytes (5.17 MB)**.
   - Resolution: **8000 x 3611 pixels**.
   - Display size: Rendered at **38px height** in navigation dock and footer!
   - Impact: Catastrophic mobile bandwidth waste and network queue blocking.
   - Solution: Generate an optimized WebP / compressed Retina PNG asset (~20-40 KB at 500px width), saving **>5.1 MB per page load**.
2. **Hero Image Candidate (`assets/images/hero-lookbook-gold.png`):**
   - File size: **1,497 KB (1.5 MB)** uncompressed PNG.
   - Missing `fetchpriority="high"`.
   - Missing `<link rel="preload" as="image" href="...">`.
   - Missing `loading="eager"` and explicit `width="1402"` `height="1122"`.
   - Solution: Convert to optimized WebP (~120 KB), preload in `<head>`, add `fetchpriority="high"`, and supply explicit dimensions.
3. **Render-Blocking External Fonts:**
   - 3 separate Google Font stylesheets (`Cinzel`, `Cormorant Garamond`, `Plus Jakarta Sans`) requested over network without `font-display: swap` inline or preload.
   - Solution: Add `<link rel="preconnect">` for Google Fonts domains, consolidate query parameters, and ensure `font-display: swap`.

### B. Cumulative Layout Shift (CLS) Risks:
1. **Missing Image Dimensions:**
   - Virtually all `<img>` tags across `index.html`, `about.html`, `services.html`, `gallery.html`, and `contact.html` lack explicit HTML `width` and `height` attributes.
   - As images load asynchronously, the browser reflows content, causing jarring visual jumps.
   - Solution: Hardcode precise width and height attributes on every `<img>` element alongside CSS `aspect-ratio` and `height: auto`.
2. **Dynamic Live Gold Rates Ticker & Dates:**
   - Numbers and dates updated asynchronously from JS could push elements if height is not reserved.
   - Solution: Container styling must preserve height with placeholder skeleton values.

### C. Interaction to Next Paint (INP) & Main-Thread Risks:
1. **Multiple Mousemove Event Listeners:**
   - Global interactive cursor, ambient glow tracker, 3D card tilt listeners, and magnetic button physics run on mousemove.
   - While guarded by `(pointer: fine)`, on low-powered desktops these can cause main-thread contention.
   - Solution: Debounce, use `requestAnimationFrame` / `gsap.quickTo`, and ensure passive listeners are utilized.

---

## 4. Accessibility (a11y) Audit

1. **Mobile Drawer Navigation:**
   - `.mobile-toggle-btn` has `aria-label="Toggle navigation menu"`, but lacks dynamic `aria-expanded="false|true"`.
   - Lacks keyboard `Escape` key close handler.
   - Lacks focus trapping inside the drawer while open.
2. **FAQ Accordion Semantics:**
   - Currently implemented using generic `<div class="faq-card">` with JS class toggling.
   - Solution: Upgrade to native HTML5 `<details>` and `<summary>` elements with exclusive group name (`name="faq"`). This guarantees native keyboard navigation (`Tab`, `Space`, `Enter`), native browser "Find in Page" support (`search-hidden-content`), and zero JS reliance for screen readers.
3. **Contact Form Accessibility (`contact.html`):**
   - Inputs and select dropdowns lack unique `id` attributes linked to their corresponding `<label for="...">` tags.
   - Missing `autocomplete` attributes (`name`, `tel`, `email`).
4. **Color Contrast:**
   - Hairline borders and subtle meta tags (`rgba(255,255,255,0.7)` on dark backgrounds, or `var(--text-muted)` on light canvas) require verified 4.5:1 WCAG AA contrast compliance.
5. **Keyboard Focus Outlines:**
   - Custom cursor implementation hides system cursor; must ensure all interactive elements display an unmistakable, high-contrast `:focus-visible` outline for keyboard navigation.

---

## 5. Local SEO & NAP Consistency Audit

1. **Name, Address, Phone (NAP) Consistency:**
   - **Business Name:** Olive Gold Company
   - **Address:** 110, Ranga Complex, Pondy Bazaar, T. Nagar, Chennai - 600017, Tamil Nadu, India
   - **Primary Hotline:** +91 90907 37313 (Desk: +91 89896 25252)
   - **Email:** olivegoldsnj@gmail.com
   - **Operating Hours:** Mon – Sat: 10:00 AM – 8:30 PM, Sun: 10:30 AM – 5:00 PM
   - *Status:* Verified consistent across code files; needs to be encapsulated in structured `LocalBusiness` schema and wrapped in semantic `<address>` tags in footers and contact pages.
2. **Local Landing Page:**
   - T Nagar is Chennai's primary gold trade district. The website currently lacks a dedicated `/locations/t-nagar/` page.
   - Creating `/locations/t-nagar/` with authentic landmarks (Naidu Hall, Panagal Park), parking accessibility, local directions, and direct call actions will strongly anchor local pack rankings.
3. **Google Business Profile Integration:**
   - Real Place ID link (`0x3a5267e0e533ef0b:0xe9a4dab9b2b6d0f2`) is present and links directly to verified Google Reviews.
   - Real Google Maps iframe embed is present on `contact.html`.

---

## 6. Action Plan & Files to Modify / Create

### Files to Create:
1. `robots.txt` — Standard crawl directives pointing to sitemap.
2. `sitemap.xml` — Canonical sitemap index with all valid 200 URLs.
3. `404.html` — Branded luxury 404 page.
4. `services/index.html` — Clean services hub directory.
5. `services/old-gold/index.html` — Dedicated landing page for "sell old gold Chennai".
6. `services/broken-gold/index.html` — Dedicated landing page for "sell broken gold Chennai".
7. `services/gold-valuation/index.html` — Dedicated landing page for "gold valuation Chennai".
8. `locations/t-nagar/index.html` — Dedicated local landing page for "gold buyers T Nagar".
9. `about/index.html` — Clean about directory page.
10. `contact/index.html` — Clean contact directory page.
11. `gallery/index.html` — Clean gallery directory page.
12. `terms/index.html` — Clean terms directory page.
13. `SCHEMA-VALIDATION.md` — Full documentation of implemented schema entities.
14. `SECURITY-HEADERS.md` — Production server configuration guidelines.
15. `SEO-IMPLEMENTATION.md` — Implementation report with completed changes.

### Files to Update:
1. `index.html` — Homepage SEO overhaul (Title, H1, Meta, Canonical, LCP image optimization, WebP, dimensions, `<details>` FAQ, JSON-LD schema, accessibility).
2. `about.html`, `services.html`, `contact.html`, `gallery.html`, `terms.html` — Updated with proper metadata, canonicals, schema, and backwards-compatible redirect / navigation sync.
3. `styles.css` — Styles for `<details>` / `<summary>` native accordion, focus-visible outlines, WebP responsive image containers, and 404 styling.
4. `main.js` — Accessibility enhancements (mobile drawer Escape / aria-expanded, native details accordion support, optimized image handling).
5. Image Assets — Create WebP variants and optimized logo asset.
