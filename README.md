# SOLE HARMONY — Premium Reflexology & Foot Massage Studio Website

A complete, premium, responsive website for **SOLE HARMONY**, a traditional Reflexology & Foot Massage Studio. Built using strictly **HTML5**, **CSS3**, **Vanilla JavaScript**, **Bootstrap 5** (for responsive grid layouts, forms, and modals), and selected **Tailwind CSS utility classes**.

The website communicates relaxation, natural wellness, traditional therapeutic practices, hospital-grade hygiene, trust, and premium hospitality.

---

## 🌿 Brand Identity & Design System

- **Brand Name:** `Sole Harmony` (centralized in `js/config.js` for instant updates across all pages, titles, and headers)
- **Tagline:** *Harmony Begins at Your Feet*
- **Business Category:** *Traditional Reflexology & Holistic Wellness*
- **Brand Style:** Elegant, premium, calming, natural, and professional
- **Official Brand Color Palette:**
  - **Forest Green:** `#315B43` (Primary brand accent, botanical highlights, badges)
  - **Deep Green:** `#203D2C` (Deep luxury headers, dark mode surfaces, contrast elements)
  - **Sage Green:** `#879B7A` (Muted organic accents, hover states, secondary badges)
  - **Terracotta:** `#C47A45` (Warm accent, botanical leaf highlight, CTA buttons, borders)
  - **Warm Ivory:** `#FAF9F5` (Primary background canvas for natural serenity)
  - **Champagne Gold:** `#C9AD70` (Refined accents, star ratings, borders, decorative arcs)
- **Typography:**
  - Headings: *Playfair Display* & *Cormorant Garamond* (Serene, classical serif)
  - Body: *Plus Jakarta Sans* (Clean, highly legible sans-serif for optimal readability)
  - Arabic (RTL): *Cairo* font integration with proportional baseline and numerals
- **Imagery & Iconography:** 
  - Official brand symbol featuring the organic green footprint, cupping botanical leaves, and terracotta accent leaf.
  - Multi-resolution favicons (`favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `android-chrome-192x192.png`, `android-chrome-512x512.png`).
  - High-resolution, photorealistic wellness photography covering traditional Eastern foot reflexology, soothing herbal foot basins, basalt hot stones, calm private suites, reception, and certified practitioners.

---

## 📁 Project Architecture

```
Reflexology & Foot Massage Studio/
│
├── index.html                   # Homepage – Traditional Reflexology & Holistic Wellness (Full Section 4.A)
├── home-2.html                  # Homepage 2 – Luxury Wellness Sanctuary Variation
├── about.html                   # About Studio – Story, Lineage, Environment & Hygiene Standards
├── services.html                # Services Catalog – 6 Configured Proposed Therapies with Filter & Details
├── service-details.html         # Service Detail View – Steps, Benefits, Precautions & Dynamic Duration Selector
├── pricing.html                 # Pricing Menu – Responsive table (desktop) & stacked cards (mobile) + packages
├── benefits.html                # Benefits & Interactive Foot Reflexology Meridian Map (Zone Explorer)
├── therapists.html              # Certified Master Practitioners – Verified Qualifications & Bio Modals
├── contact.html                 # Contact Page – Working enquiry form, inline confirmation, WhatsApp & Map
├── booking.html                 # 5-Step Multi-Step Booking Interface with preselection & validation
├── booking-confirmation.html    # Booking Confirmation Card – Reference code, summary, print & .ics export
├── login.html                   # Client Sign In – Guest account sign-in
├── register.html                # Guest Registration – Account creation for streamlined booking
├── forgot-password.html         # Password Reset interface with notifications
│
├── assets/
│   ├── icons/                   # Scalable SVG wellness icons & Sole Harmony official brand assets
│   │   ├── favicon.ico          # Multi-size ICO (16x16, 32x32, 48x48)
│   │   ├── favicon-16x16.png    # 16x16 browser tab icon
│   │   ├── favicon-32x32.png    # 32x32 standard icon
│   │   ├── apple-touch-icon.png # 180x180 iOS home screen icon
│   │   ├── android-chrome-192x192.png
│   │   ├── android-chrome-512x512.png
│   │   ├── sole-harmony-symbol.png      # Standalone footprint & leaf symbol (light bg)
│   │   ├── sole-harmony-symbol-dark.png # Standalone symbol (dark bg)
│   │   ├── sole-harmony-logo.png        # Full horizontal wordmark (light bg)
│   │   └── sole-harmony-logo-dark.png   # Full horizontal wordmark (dark bg)
│   │
│   └── images/
│       ├── hero/                # home-1-hero.jpg, home-2-hero.jpg, about-hero.jpg, etc.
│       ├── reflexology/         # Foot reflexology thumb walking, pressure points
│       ├── foot-massage/        # Thai foot massage, herbal foot soaks, hot stone
│       ├── body-massage/        # Full body reflexology, neck & shoulder acupressure
│       ├── spa-interior/        # Reception desk, private suites, zen lounge, tea station
│       ├── therapists/          # Master practitioner portraits
│       └── gallery/             # Botanical oils, herbal salts, candlelit treatment rooms
│
├── css/
│   ├── bootstrap.min.css        # Bootstrap 5 responsive layout grid and utilities
│   ├── tailwind.css             # Tailwind utility classes (margins, padding, flexbox, grid)
│   ├── variables.css            # Central CSS custom properties with exact official hex palette
│   ├── global.css               # Base resets, focus rings, and accessibility standards
│   ├── typography.css           # Type scale, serif headings, and line-height hierarchy
│   ├── components.css           # Buttons, cards, badges, chips, accordions, and toasts
│   ├── header-footer.css        # Sticky navigation, utility top-bar, mobile drawer, footer
│   ├── home.css                 # Hero sections, trust metrics strip, and meridian card
│   ├── services.css             # Service card layout, category pills, duration chips
│   ├── booking.css              # Multi-step progress bar, calendar grid, time pills
│   ├── forms.css                # Accessible inputs, floating labels, validation states
│   ├── responsive.css           # Breakpoints for mobile (<768px), tablet, and desktop
│   ├── themes.css               # Light & Dark theme color variables and card styles
│   └── rtl.css                  # Right-to-Left (RTL) mirroring, Arabic typography & logical margins
│
├── js/
│   ├── config.js                # Central studio brand configuration (StudioConfig)
│   ├── translations.js          # Bilingual translation dictionary (English & Arabic)
│   ├── language.js              # Live bilingual translation and RTL switcher
│   ├── theme.js                 # Light/Dark mode switcher with localStorage persistence
│   ├── navigation.js            # Sticky navbar and mobile off-canvas drawer
│   ├── validation.js            # Client-side form validation with accessible error cues
│   ├── authentication.js        # Client & Admin session manager (localStorage / sessionStorage)
│   ├── services.js              # Services catalog search, category filter, and dynamic details
│   ├── booking.js               # 5-step booking flow, duration recalculation, and appointment saving
│   ├── home.js                  # Interactive foot meridian map and zone preview logic
│   ├── therapists.js            # Practitioner directory and modal profile showcase
│   ├── notifications.js         # Non-intrusive floating toast notification component
│   └── main.js                  # Global coordinator, year updater, config DOM binder
│
├── favicon.ico                  # Root multi-resolution favicon
├── site.webmanifest             # Progressive web app manifest (Sole Harmony)
└── data/
    ├── services.json            # 6 core proposed service categories with durations & benefits
    ├── pricing.json             # Pricing tiers (30/45/60/90m), packages (3/5/10), and studio policies
    ├── therapists.json          # Master practitioner bios, qualifications, and specialties
    └── demo-appointments.json   # Seed appointment records for studio reservation testing
```

---

## 🌟 Key Functionality & Modules

### 1. Central Configuration (`js/config.js`)
All studio details are managed from a single file:
- Studio Brand Name: `Sole Harmony`
- Subtitle & Tagline: `Harmony Begins at Your Feet`
- Business Category: `Traditional Reflexology & Holistic Wellness`
- Contact: `(555) 382-7653`, `appointments@soleharmony.com`
- Location: `482 Harmony Way, Suite 100, San Francisco, CA 94102`
- Opening Hours: Mon–Fri 9am–9pm, Sat 9:30am–8:30pm, Sun 10am–7pm
- Central DOM binding helper (`StudioConfig.bindToDOM()`) automatically binds `data-config` attributes across all pages.

### 2. Dual Language & RTL Support (`js/language.js` & `js/translations.js`)
- Full bilingual English (`en`) and Arabic (`ar` — *سول هارموني | الانسجام يبدأ من قدميك*) support.
- One-click language button in the header switches between English (LTR) and Arabic (RTL).
- Automatically updates `html[dir="rtl"]`, `html[lang="ar"]`, and translates all `[data-i18n]` and `[data-i18n-placeholder]` elements.
- Direction-aware CSS in `css/rtl.css` mirrors navigations, cards, badges, and icons while preserving phone numbers and numeric prices.

### 3. Light & Dark Wellness Themes (`css/themes.css` & `js/theme.js`)
- Default Light Mode: Warm Ivory (`#FAF9F5`), Forest Green (`#315B43`), Terracotta (`#C47A45`), and Soft White (`#FFFFFF`).
- Calming Dark Mode: Deep Forest Green (`#203D2C` / `#16281D`) with champagne gold and sage accents for evening browsing.
- Theme preference is saved in `localStorage` and respected across all public and portal pages.
- Responsive brand logos automatically switch between light and dark versions (`.logo-symbol-light` / `.logo-symbol-dark`).

### 4. Interactive 5-Step Booking Engine (`booking.html` & `js/booking.js`)
- **Step 1: Select Service & Duration** — Dynamic price recalculation based on 30, 45, 60, or 90 minutes. Supports incoming URL preselection (`booking.html?service=traditional-foot-reflexology`).
- **Step 2: Choose Specialist** — Select a preferred practitioner or choose "Any Available Specialist".
- **Step 3: Choose Date & Time** — Interactive date selector and time slot pills (Morning, Afternoon, Evening).
- **Step 4: Customer Details & Preferences** — Name, email, phone, pressure preference (Gentle, Medium, Firm), and wellness notes.
- **Step 5: Review & Confirm** — Itemized fee breakdown ($0 advance card deposit required).
- Generates a persistent booking record in `localStorage.getItem('wellness_studio_bookings')` and forwards to `booking-confirmation.html` with printable summary card and `.ics` calendar export.

### 5. Proposed 6 Core Service Offerings (`data/services.json`)
1. **Traditional Foot Reflexology** — From $45 (30m) / $75 (60m)
2. **Relaxing Foot Massage** — From $40 (30m) / $68 (60m)
3. **Full-Body Reflexology** — From $65 (45m) / $85 (60m)
4. **Head, Neck & Shoulder Massage** — From $38 (30m) / $55 (45m)
5. **Relaxation Massage** — From $70 (60m) / $100 (90m)
6. **Custom Wellness Session** — From $85 (60m) / $120 (90m)

---

## 🔒 Data & Booking Storage

> [!NOTE]
> Appointment records and customer contact inquiries are stored persistently in browser `localStorage`.
> In a production deployment, these records can be dispatched directly to a backend API or cloud database.

---

## 🚀 How to Run the Website Locally

### Option 1: Using Python Built-in HTTP Server (Recommended)
Open PowerShell or Terminal in the project root folder:
```powershell
python -m http.server 8000
```
Open your browser at:
`http://localhost:8000`

### Option 2: Using Node.js `serve` / `http-server`
```bash
npx serve .
```

### Option 3: Direct File Opening
Double-click `index.html` to open directly in Google Chrome, Microsoft Edge, Firefox, or Safari. All scripts include built-in fallback data arrays to ensure complete functionality even over the local `file:///` protocol.

---

## 📋 Compliance & Accessibility
- WCAG AA color contrast ratios across light and dark modes.
- Accessible focus rings and `:focus-visible` styling.
- Responsive design tested from 360px (mobile) to 1440px (desktop).
- Semantic HTML5 landmark structure (`<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`).
- No modern JS framework dependencies (pure HTML5, CSS3, Vanilla JS, Bootstrap 5 & Tailwind utilities).
