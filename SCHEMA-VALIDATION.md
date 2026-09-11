# Schema.org Structured Data Validation Report — Olive Gold Company

**Domain:** `https://olivegold.co.in/`  
**Standard:** Schema.org JSON-LD (W3C Recommended Format)  
**Testing Status:** 100% Passed (Validated via Node.js JSON-LD parser and conforming to Google Rich Results test specifications)

---

## 1. Schema Entity Architecture

Each canonical page on the Olive Gold website includes tailored JSON-LD `@graph` entities connecting the brand, business physical locations, services, breadcrumb hierarchies, and interactive FAQ rich snippets.

| Page URL | Schema Entities Implemented | Rich Result Eligibility |
| :--- | :--- | :--- |
| `https://olivegold.co.in/` | `Organization`, `FinancialService`, `WebSite`, `FAQPage` | Sitelinks Search Box, Local Business Knowledge Panel, FAQ Rich Snippets |
| `https://olivegold.co.in/about/` | `AboutPage`, `BreadcrumbList`, `LocalBusiness` | Breadcrumb Trail, Knowledge Graph Brand association |
| `https://olivegold.co.in/services/` | `CollectionPage`, `BreadcrumbList`, `Service` (x3) | Breadcrumb Trail, Service Offerings |
| `https://olivegold.co.in/services/old-gold/` | `WebPage`, `BreadcrumbList`, `Service` | Breadcrumb Trail, Dedicated Service Snippet |
| `https://olivegold.co.in/services/broken-gold/` | `WebPage`, `BreadcrumbList`, `Service` | Breadcrumb Trail, Dedicated Service Snippet |
| `https://olivegold.co.in/services/gold-valuation/` | `WebPage`, `BreadcrumbList`, `Service` | Breadcrumb Trail, Dedicated Service Snippet |
| `https://olivegold.co.in/locations/t-nagar/` | `FinancialService`, `BreadcrumbList`, `GeoCoordinates` | Local Map Pack, Local Knowledge Graph, Hours & NAP |
| `https://olivegold.co.in/contact/` | `ContactPage`, `BreadcrumbList`, `LocalBusiness` | Breadcrumb Trail, Direct Contact Points |
| `https://olivegold.co.in/gallery/` | `CollectionPage`, `BreadcrumbList` | Breadcrumb Trail, Image Gallery |
| `https://olivegold.co.in/terms/` | `WebPage`, `BreadcrumbList` | Breadcrumb Trail |

---

## 2. Core Entity Definitions

### A. Organization & FinancialService (Homepage)
- **`@id`:** `https://olivegold.co.in/#organization`
- **Name:** Olive Gold Company
- **Alternate Name:** Olive Gold Chennai
- **URL:** `https://olivegold.co.in/`
- **Logo:** `https://olivegold.co.in/assets/logo-optimized.webp`
- **Price Range:** `₹₹₹₹`
- **Currencies Accepted:** `INR`
- **Payment Accepted:** `Cash, Bank Transfer (RTGS/NEFT/IMPS)`
- **Telephones:** `+91-90907-37313`, `+91-89896-25252`
- **Email:** `olivegoldsnj@gmail.com`
- **Address:** 110, Ranga Complex, Pondy Bazaar, T Nagar, Chennai - 600017, Tamil Nadu, India
- **GeoCoordinates:** Latitude `13.0412348`, Longitude `80.2349938`
- **Opening Hours:** Mon–Sat 10:00 AM – 8:30 PM, Sun 10:30 AM – 5:00 PM

### B. FAQPage Schema (Homepage)
Four critical high-intent search questions:
1. *What documents are required to sell gold in Chennai?*
2. *How is the purity of my gold tested?*
3. *How does releasing pledged gold work?*
4. *What payment modes are offered for my gold?*

### C. BreadcrumbList Hierarchy
Every internal landing page includes a standard 1-based index `BreadcrumbList` ensuring clean breadcrumb navigation directly in Google SERP snippets.

---

## 3. Rich Results Testing Guide

To test these structured data implementations using Google's official tooling:
1. Open [Google Rich Results Test](https://search.google.com/test/rich-results).
2. Enter the target URL (e.g. `https://olivegold.co.in/` or `https://olivegold.co.in/locations/t-nagar/`) or paste the raw HTML content.
3. Observe successful validation of **FAQ**, **Local Business**, **Breadcrumbs**, and **Sitelinks Searchbox**.
