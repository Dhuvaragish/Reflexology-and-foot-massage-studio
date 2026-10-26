/**
 * SOLE HARMONY - Central Brand & Studio Configuration
 * All core brand attributes, contact points, hours, and business policies
 * are maintained here for single-source-of-truth management across the application.
 */

const StudioConfig = {
  // Brand Identity
  brandName: "SOLE HARMONY",
  brandNameMixed: "Sole Harmony",
  brandSubtitle: "Traditional Reflexology & Holistic Wellness",
  eyebrow: "TRADITIONAL REFLEXOLOGY & HOLISTIC WELLNESS",
  headline: "Reconnect With Your Natural Balance.",
  tagline: "Harmony Begins at Your Feet",
  description: "Experience time-honored eastern reflexology, therapeutic acupressure, and restorative botanical bodywork in our serene, sanitized sanctuary.",
  
  // Established & Credentials
  establishedYear: 2018,
  facilityType: "Certified Traditional Wellness Sanctuary",
  licenseNotice: "Licensed Wellness Studio & Certified Reflexologists",
  
  // Contact & Studio Location
  contact: {
    phone: "(555) 382-7653",
    phoneRaw: "+15553827653",
    whatsapp: "+1 (555) 382-7653",
    whatsappLink: "https://wa.me/15553827653?text=Hello%20Sole%20Harmony,%20I%20would%20like%20to%20inquire%20about%20a%20treatment",
    email: "appointments@soleharmony.com",
    supportEmail: "info@soleharmony.com",
    address: {
      street: "482 Harmony Way, Suite 100",
      city: "San Francisco",
      state: "CA",
      postalCode: "94102",
      full: "482 Harmony Way, Suite 100, San Francisco, CA 94102"
    },
    parkingInfo: "Complimentary reserved parking is available behind the sanctuary building.",
    transitInfo: "Conveniently located 2 blocks from the Civic Center transit station."
  },

  // Operating Hours
  hours: {
    weekday: "Monday – Friday: 9:00 AM – 9:00 PM",
    saturday: "Saturday: 9:30 AM – 8:30 PM",
    sunday: "Sunday: 10:00 AM – 7:00 PM",
    summary: "Open Daily: 9:00 AM – 9:00 PM",
    todayHours: "9:00 AM – 9:00 PM"
  },

  // Business Policies (Confirmed & Transparent)
  policies: {
    cancellation: "Cancellations or rescheduling require at least 24 hours advance notice. Late cancellations may be subject to a 50% reservation fee.",
    deposit: "Zero advance deposit required. Pay safely at studio reception upon completion of your session.",
    arrival: "Please arrive 10-15 minutes prior to your treatment to check in, decompress, and enjoy our complimentary organic herbal infusion.",
    hygiene: "All private suites undergo hospital-grade UV-C and botanical sanitization between sessions. Linens are strictly 100% single-guest use."
  },

  // Social Channels
  socials: {
    instagram: "https://instagram.com/soleharmonywellness",
    facebook: "https://facebook.com/soleharmonywellness",
    whatsapp: "https://wa.me/15553827653"
  },

  // Currency & Formatting
  currency: {
    symbol: "$",
    code: "USD",
    taxRate: 0.08 // 8% local sales/wellness tax
  },

  // Booking Calendar Window
  bookingWindowDays: 90, // Configurable reservation window (advance days allowed)

  // Proposed Service Categories (Marked for Business Confirmation)
  proposedCategoriesNotice: "Proposed service catalog — All offerings, prices, and durations are subject to business confirmation before live commercial launch."
};

/**
 * Automatically binds StudioConfig values to DOM elements matching data-config attributes.
 * Example: <span data-config="brandName"></span>
 */
function applyStudioConfigToDOM() {
  document.querySelectorAll('[data-config="brandName"]').forEach(el => {
    el.textContent = StudioConfig.brandName;
  });
  document.querySelectorAll('[data-config="brandSubtitle"]').forEach(el => {
    el.textContent = StudioConfig.brandSubtitle;
  });
  document.querySelectorAll('[data-config="tagline"]').forEach(el => {
    el.textContent = StudioConfig.tagline;
  });
  document.querySelectorAll('[data-config="phone"]').forEach(el => {
    el.textContent = StudioConfig.contact.phone;
    if (el.tagName === 'A') el.setAttribute('href', `tel:${StudioConfig.contact.phoneRaw}`);
  });
  document.querySelectorAll('[data-config="email"]').forEach(el => {
    el.textContent = StudioConfig.contact.email;
    if (el.tagName === 'A') el.setAttribute('href', `mailto:${StudioConfig.contact.email}`);
  });
  document.querySelectorAll('[data-config="address"]').forEach(el => {
    el.textContent = StudioConfig.contact.address.full;
  });
  document.querySelectorAll('[data-config="addressShort"]').forEach(el => {
    el.textContent = StudioConfig.contact.address.street;
  });
  document.querySelectorAll('[data-config="todayHours"]').forEach(el => {
    el.textContent = StudioConfig.hours.todayHours;
  });
  document.querySelectorAll('[data-config="hoursSummary"]').forEach(el => {
    el.textContent = StudioConfig.hours.summary;
  });
}

// Auto-run on DOMContentLoaded
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyStudioConfigToDOM);
  } else {
    applyStudioConfigToDOM();
  }
}

// Global export
if (typeof window !== 'undefined') {
  window.StudioConfig = StudioConfig;
  window.applyStudioConfigToDOM = applyStudioConfigToDOM;
}
