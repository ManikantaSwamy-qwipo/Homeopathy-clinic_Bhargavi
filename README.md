# Dr. Bhargavi Homeopathic Clinic — Vanilla JS Website

A clean, SEO-friendly static website for **Dr. Bhargavi Homeopathic Clinic**, Eluru, Andhra Pradesh.  
Converted from an Angular application to plain HTML, CSS, and JavaScript for easy hosting and better SEO.

---

## Project Structure

```
homeopathy-clinic-vanilla/
├── index.html       # Single-page HTML with all sections
├── styles.css       # All styles (navbar, carousel, sections, responsive)
├── app.js           # All JavaScript logic
├── assets/          # Images used in the carousel and navbar
│   ├── logo.jpeg
│   ├── newDr0.png
│   ├── new1.png ... new4.png
│   ├── newMobile1.png
│   ├── mobile.png ... mobile5.png
│   └── ...
└── README.md
```

---

## Sections

| Section | Description |
|---|---|
| **Navbar** | Sticky top nav with smooth scroll, active link highlight, mobile hamburger menu |
| **Home** | Auto-playing image carousel with desktop/mobile image sets, prev/next arrows, dot indicators, pause button |
| **About** | Clinic info, doctor card, "Why Choose Us" feature grid |
| **Treatments** | 16 treatment cards dynamically rendered from a data array |
| **Appointment** | Booking form with full validation — posts to the backend API |
| **Contact** | Google Maps embed, directions link, doctor details, address, timings |
| **Footer** | Quick links, contact info, developer credit |

---

## Getting Started

### Option 1 — Open directly in browser

Just double-click `index.html`. No build step, no server needed.  
> Note: The appointment form requires the backend to be running to submit bookings.

### Option 2 — Serve locally (recommended)

Using Python:
```bash
python -m http.server 8080
```

Using Node.js (`npx serve`):
```bash
npx serve .
```

Then open `http://localhost:8080` in your browser.

---

## Backend API Configuration

The appointment form POSTs to a backend API. Update the `API_URL` at the top of `app.js` before deploying:

```js
// app.js — line 3
const API_URL = 'https://your-production-api.com/api';

// For local development:
const API_URL = 'http://localhost:5000/api';
```

The form sends a `POST` request to `{API_URL}/appointments` with this JSON body:

```json
{
  "name": "Patient Name",
  "mobile": "9876543210",
  "gender": "Male",
  "date": "2026-06-01",
  "time": "10:00 AM"
}
```

---

## Form Validation Rules

| Field | Rule |
|---|---|
| Name | Letters only, minimum 3 characters |
| Mobile | Indian format — starts with 6–9, exactly 10 digits |
| Gender | Required |
| Date | Cannot be in the past, Sundays are blocked (clinic holiday) |
| Time | Required; past time slots are hidden when today is selected |

---

## Hosting

This is a fully static site — no build tools or frameworks required.

**Recommended free hosting options:**

- **Netlify** — drag and drop the folder at [netlify.com](https://netlify.com)
- **Vercel** — `vercel deploy` from the project folder
- **GitHub Pages** — push to a repo and enable Pages in settings
- **Hostinger / cPanel** — upload via File Manager or FTP

---

## Dependencies (CDN — no install needed)

| Library | Version | Purpose |
|---|---|---|
| Bootstrap | 5.3.3 | Layout, navbar, responsive grid |
| Bootstrap Icons | 1.11.3 | LinkedIn icon in footer |

Both are loaded from CDN in `index.html`. No `node_modules`, no build step.

---

## Browser Support

Works in all modern browsers — Chrome, Firefox, Edge, Safari.  
Requires JavaScript enabled for the carousel, treatments grid, and appointment form.

---

## Clinic Details

- **Doctor:** Dr. N Bhargavi, BHMS
- **Location:** Opposite Peniel Church, Tengellamudi, Lunani Nagar, Eluru, AP – 534005
- **Phone:** +91 9392997720
- **Email:** drbhargavi.homoeo@gmail.com
- **Timings:** Morning 10 AM–1:30 PM | Evening 5 PM–8:30 PM | Sunday: Holiday

---

## Developer

Designed & Developed by [Jupudi Manikanta Swamy](https://www.linkedin.com/in/manikantaswamyjupudi/)
