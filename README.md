# Solace & Sole — Reflexology & Foot Massage Studio Website

A responsive, multipurpose HTML5 website template designed for a professional reflexology and foot massage studio. Featuring a calming traditional wellness aesthetic, realistic treatment photography, interactive 5-step appointment booking, an interactive foot meridian zone explorer, and a complete light/dark and RTL/LTR system.

> **Important Note:** This website is focused entirely on the public-facing studio experience, services discovery, therapist profiles, and appointment booking. In strict adherence to project specifications, **no Client Dashboard or Admin Dashboard** is included.

---

## 🌿 Design System & Aesthetic

- **Color Palette:**
  - **Sage Green:** `#4A6B5D`, `#2C4238`, `#EAF1ED`
  - **Warm Sand & Cream:** `#FAF8F5` (Base Ivory), `#F6F3EB` (Soft Sand), `#EAE3D2`
  - **Earth & Bark Brown:** `#2D2621`, `#4A3B32`, `#7D6E64`
  - **Accents:** Terracotta (`#C67D5A`) and Muted Luxury Gold (`#C5A059`)
- **Typography:**
  - Headings: *Playfair Display* & *Cormorant Garamond* (Serene, elegant serif)
  - Body: *Plus Jakarta Sans* (Clean, highly legible, modern sans-serif)
- **Imagery:** High-resolution, royalty-free wellness photography covering authentic foot reflexology, herbal cedar foot basins, basalt hot stones, massage suites, tea lounge, and master practitioners.

---

## 📁 Project Structure

```
reflexology-studio/
│
├── index.html                   # Home Page 1 – Traditional Reflexology Studio Landing Page
├── home-2.html                  # Home Page 2 – Premium Foot Massage & Wellness Landing Page
├── about.html                   # About Us – Studio Story, Philosophy, Hygiene Standards
├── services.html                # Services Catalog with live search & category filtering
├── service-details.html         # Service Details with dynamic duration selector & price calc
├── pricing.html                 # Pricing Menu – Single sessions, packages & add-on menu
├── benefits.html                # Benefits & Interactive Foot Reflexology Meridian Map
├── therapists.html              # Therapist Profiles, Certifications & Bio Modals
├── booking.html                 # 5-Step Interactive Appointment Scheduler
├── booking-confirmation.html    # Booking Confirmation Card, Print & Calendar (.ics) export
├── contact.html                 # Contact Details, Opening Hours & Validated Inquiry Form
├── login.html                   # Client Sign In with demo credentials (No Dashboard)
├── register.html                # Client Registration form (No Dashboard)
├── forgot-password.html         # Password recovery form with notification feedback
│
├── assets/
│   ├── images/
│   │   ├── hero/               # home-1-hero.jpg, home-2-hero.jpg
│   │   ├── reflexology/        # Traditional thumb pressure & point treatments
│   │   ├── foot-massage/       # Thai foot massage, herbal baths, hot stone
│   │   ├── body-massage/       # Acupressure, neck & shoulder, full-body
│   │   ├── therapists/         # Practitioner portraits
│   │   ├── spa-interior/       # Lounge, suites, tea corner, reception
│   │   └── gallery/            # Botanical oils, herbal salts, candle atmosphere
│   ├── icons/                  # Scalable SVG wellness icons
│   └── fonts/                  # Web font references
│
├── css/
│   ├── bootstrap.min.css       # Bootstrap 5 responsive layout grid
│   ├── bootstrap.rtl.min.css   # Bootstrap 5 RTL layout stylesheet
│   ├── tailwind.css            # Tailwind-compatible utility classes
│   ├── variables.css           # CSS design tokens, colors, shadows & radii
│   ├── global.css              # Reset, typography baselines, accessible focus states
│   ├── typography.css          # Serif/sans-serif hierarchy and eyebrow tags
│   ├── components.css          # Buttons, cards, toasts, accordions, badges & modals
│   ├── header-footer.css       # Sticky header, top-bar utility, drawer & footer
│   ├── home.css                # Home 1 & Home 2 hero variations & meridian styling
│   ├── services.css            # Live search input, category pills, sticky booking card
│   ├── booking.css             # Multi-step stepper, date scroll, time slot pills
│   ├── forms.css               # Input fields, validation states & auth cards
│   ├── responsive.css          # Breakpoints for mobile, tablet, and desktop
│   ├── themes.css              # Light & Dark mode color tokens & transitions
│   └── rtl.css                 # RTL (Right-to-Left) layout mirroring for Arabic
│
├── js/
│   ├── main.js                 # Global coordinator, year updater, smooth scrolling
│   ├── navigation.js           # Sticky header, active links & mobile off-canvas drawer
│   ├── theme.js                # Light/Dark mode switcher with localStorage persistence
│   ├── language.js             # LTR/RTL switcher with [dir="rtl"] and notification
│   ├── home.js                 # Interactive meridian map & quick booking bar handler
│   ├── services.js             # Service catalog filtering, search & details renderer
│   ├── pricing.js              # Pricing tables, packages and add-on generator
│   ├── therapists.js           # Therapist showcase & interactive bio modal
│   ├── booking.js              # 5-step booking engine, date picker, slot calculation
│   ├── validation.js           # Client-side form validation with accessible feedback
│   ├── authentication.js       # Demo sign in/register (strictly no dashboard)
│   └── notifications.js        # Reusable toast notification system
│
└── data/
    ├── services.json           # Comprehensive treatment database
    ├── therapists.json         # Certified practitioner profiles & specialties
    ├── pricing.json            # Categorized treatment menus & package rates
    └── demo-appointments.json  # Demonstration appointment slots & bookings
```

---

## 🌟 Key Features

### 1. Two Complete Homepage Variations
- **Home Page 1 (`index.html`):** Traditional Eastern Reflexology Studio focusing on meridian pathways, cedar basin herbal foot soaks, 4 holistic pillars, and TCM master lineage.
- **Home Page 2 (`home-2.html`):** Premium Modern Foot Massage Sanctuary focusing on zero-gravity recliners, sensory relaxation, couples VIP suites, and relief for modern desk workers & runners.

### 2. Interactive 5-Step Appointment Booking Engine (`booking.html`)
- **Step 1:** Select Treatment & Duration (dynamic price preview).
- **Step 2:** Select Specialist (or choose "Any Available Specialist").
- **Step 3:** Interactive Date & Time Picker (Morning, Afternoon, Evening slots).
- **Step 4:** Guest Details & Pressure Preference (Gentle, Medium, Firm) with medical notes.
- **Step 5:** Itemized Review & Confirmation.
- Generates a unique booking reference code (e.g., `REF-84912`), triggers a success toast, and redirects to `booking-confirmation.html`.
- Confirmation page includes:
  - Complete printable summary card.
  - One-click `.ics` Calendar event download.
  - Payment upon arrival notice (no credit card barrier).
  - **Zero dashboard redirection.**

### 3. Interactive Foot Reflexology Map (`benefits.html`)
- Click through 5 primary foot meridian reflex zones:
  1. *Head, Brain & Pituitary Gland* (Toes)
  2. *Solar Plexus & Diaphragm* (Upper Sole)
  3. *Spinal Column Ridge* (Medial Arch)
  4. *Digestive & Abdominal Organs* (Midfoot Hollow)
  5. *Pelvic & Sciatic Nerve* (Heel Pad)
- Dynamically displays physiological effects, corresponding organs, and recommended studio treatments.

### 4. Services Discovery & Dynamic Details
- **`services.html`:** Real-time search query matching and instant category filtering (All, Foot Reflexology, Relaxation Foot, Body Reflexology, Full Body, Signature Combined).
- **`service-details.html`:** In-depth treatment journey steps, clinical benefits, preparation guidance, aftercare instructions, health contraindications, and an interactive duration toggle that updates price on the fly.

### 5. Multi-Language & RTL Layout Support
- Includes full **RTL (Right-to-Left)** support for languages such as Arabic.
- Clicking the language button toggles `dir="rtl"` / `dir="ltr"` on the root document, activates `css/rtl.css`, mirrors layouts, navigations, sidebars, and input icons seamlessly.
- Remembers user choice in `localStorage`.

### 6. Light Mode & Dark Mode Themes
- Built-in theme switcher (`css/themes.css` & `js/theme.js`).
- Light theme features a calming cream and ivory palette with sage accents.
- Dark theme features a soothing deep forest pine/charcoal palette (`#121614` / `#1B221E`) designed to minimize eye strain.
- Remembers preference across page visits.

### 7. Client Authentication (Without Dashboard)
- Includes clean `login.html`, `register.html`, and `forgot-password.html`.
- Demo credentials provided: `guest@wellness.com` / `peace123`.
- After sign-in, the user's name is saved in `localStorage`, displayed in the top header, and user is redirected directly to `booking.html` for instant checkout.
- **Strictly decoupled from any dashboard or analytics portal.**

---

## 🚀 How to Run the Website

### Option 1: Direct File Opening
Double-click `index.html` (or any other `.html` file) in your file explorer to open it directly in your web browser (`Chrome`, `Edge`, `Safari`, `Firefox`). The template includes embedded fallback data to ensure full functionality even under local `file:///` restrictions.

### Option 2: Local HTTP Server (Recommended)
Using Python (pre-installed on most systems):
```bash
# Navigate to the project directory
cd "c:\Users\Dhuvaragish\Desktop\Reflexology & Foot Massage Studio"

# Start a local HTTP server
python -m http.server 8000
```
Then open your browser at:
```
http://localhost:8000/index.html
```

---

## 🔒 Hygiene & Sanitation Compliance
Highlighted extensively throughout `about.html` and `services.html`:
- Hospital-grade autoclave and UV sterilization for tools and basalt stones.
- Biodegradable single-use basin liners for all foot soaks.
- High-temperature laundry sanitization (75°C / 167°F) with organic detergents.
- True HEPA-13 air filtration in all private treatment suites.

---

## 📄 License & Credits
- **Frameworks:** Bootstrap 5, Tailwind CSS utilities.
- **Icons:** Inline SVG feather/lucide inspired icons.
- **Photography:** Curated royalty-free imagery from Unsplash.
